import express, { Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { db } from '../utils/firebase';

const router = express.Router();

router.get('/', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    
    const notesSnapshot = await db.ref('notes').orderByChild('userId').equalTo(userId).once('value');
    const notesVal = notesSnapshot.val() || {};
    const notes = Object.keys(notesVal).map(key => ({ id: key, ...notesVal[key] }));
    
    // Sort in memory
    notes.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    
    const { content } = req.body;
    if (!content) {
      res.status(400).json({ message: 'Content is required' });
      return;
    }
    
    const newNoteRef = db.ref('notes').push();
    const newNote = {
      userId,
      content,
      createdAt: new Date().toISOString(),
    };
    
    await newNoteRef.set(newNote);
    res.status(201).json({ id: newNoteRef.key, ...newNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    
    const noteId = req.params.id as string;
    const noteRef = db.ref(`notes/${noteId}`);
    const noteSnapshot = await noteRef.once('value');
    const noteData = noteSnapshot.val();
    
    if (noteData && noteData.userId === userId) {
      await noteRef.remove();
      res.json({ message: 'Note deleted' });
    } else {
      res.status(404).json({ message: 'Note not found or unauthorized' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
