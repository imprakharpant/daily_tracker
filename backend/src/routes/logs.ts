import express, { Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { db } from '../utils/firebase';

const router = express.Router();

router.post('/:habitId', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const habitId = req.params.habitId as string;
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    
    // Get today's date in local YYYY-MM-DD
    const dateObj = new Date();
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const logsSnapshot = await db.ref('logs').orderByChild('habitId').equalTo(habitId).once('value');
    const logsVal = logsSnapshot.val() || {};
    const logs = Object.keys(logsVal).map(key => ({ id: key, ...logsVal[key] }));
    
    const existingLog = logs.find(log => log.userId === userId && log.date === dateStr);

    if (existingLog) {
      await db.ref(`logs/${existingLog.id}`).remove();
      res.json({ message: 'Log removed', logged: false });
    } else {
      const newLogRef = db.ref('logs').push();
      const newLog = {
        habitId,
        userId,
        date: dateStr,
        completedAt: new Date().toISOString()
      };
      await newLogRef.set(newLog);
      res.json({ message: 'Log added', logged: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/:habitId', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const habitId = req.params.habitId as string;
    const logsSnapshot = await db.ref('logs').orderByChild('habitId').equalTo(habitId).once('value');
    const logsVal = logsSnapshot.val() || {};
    
    // Filter by userId and map to array
    const logs = Object.keys(logsVal)
      .map(key => ({ id: key, ...logsVal[key] }))
      .filter(log => log.userId === userId);
    
    // Sort and limit in memory
    logs.sort((a, b) => b.date.localeCompare(a.date));
    const limitedLogs = logs.slice(0, 7);
    
    res.json(limitedLogs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;
