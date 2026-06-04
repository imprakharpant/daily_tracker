import express, { Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import Habit from '../models/Habit';
import Log from '../models/Log';
import { calculateStreak } from '../utils/streakLogic';

const router = express.Router();

router.get('/stats', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    
    const habits = await Habit.find({ userId });
    const totalHabits = habits.length;
    
    let longestStreak = 0;
    let totalLogs = 0;

    for (const habit of habits) {
      const logs = await Log.find({ habitId: habit._id }).select('date -_id');
      const streak = calculateStreak(logs);
      if (streak > longestStreak) {
        longestStreak = streak;
      }
      totalLogs += logs.length;
    }

    res.json({
      totalHabits,
      longestStreak,
      totalLogs
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const habits = await Habit.find({ userId }).sort({ createdAt: -1 });
    
    // For each habit, calculate the streak
    const habitsWithStreaks = await Promise.all(habits.map(async (habit) => {
      const logs = await Log.find({ habitId: habit._id }).select('date -_id');
      const streak = calculateStreak(logs);
      return { ...habit.toObject(), streak };
    }));

    res.json(habitsWithStreaks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const { name, emoji } = req.body;
    const newHabit = new Habit({
      userId,
      name,
      emoji
    });
    const habit = await newHabit.save();
    res.json({ ...habit.toObject(), streak: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      res.status(404).json({ message: 'Habit not found' });
      return;
    }
    if (habit.userId.toString() !== userId) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }
    await habit.deleteOne();
    await Log.deleteMany({ habitId: req.params.id });
    res.json({ message: 'Habit removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;
