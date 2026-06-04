import express, { Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import Log from '../models/Log';

const router = express.Router();

router.post('/:habitId', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { habitId } = req.params;
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

    const existingLog = await Log.findOne({
      habitId,
      userId,
      date: dateStr
    });

    if (existingLog) {
      await existingLog.deleteOne();
      res.json({ message: 'Log removed', logged: false });
    } else {
      const newLog = new Log({
        habitId,
        userId,
        date: dateStr
      });
      await newLog.save();
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
    const logs = await Log.find({
      habitId: req.params.habitId,
      userId
    }).sort({ date: -1 }).limit(7);
    
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;
