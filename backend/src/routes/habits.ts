import express, { Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { db } from '../utils/firebase';
import { calculateStreak } from '../utils/streakLogic';

const router = express.Router();

router.get('/stats', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    
    const habitsSnapshot = await db.ref('habits').orderByChild('userId').equalTo(userId).once('value');
    const habitsVal = habitsSnapshot.val() || {};
    const habits = Object.keys(habitsVal).map(key => ({ id: key, ...habitsVal[key] }));
    const totalHabits = habits.length;
    
    let longestStreak = 0;
    let totalLogs = 0;

    for (const habit of habits) {
      const logsSnapshot = await db.ref('logs').orderByChild('habitId').equalTo(habit.id).once('value');
      const logsVal = logsSnapshot.val() || {};
      const logs = Object.keys(logsVal).map(key => ({ date: logsVal[key].date }));
      
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
    
    const habitsSnapshot = await db.ref('habits').orderByChild('userId').equalTo(userId).once('value');
    const habitsVal = habitsSnapshot.val() || {};
    const habits = Object.keys(habitsVal).map(key => ({ id: key, ...habitsVal[key] }));
    
    // Sort by createdAt desc in memory
    habits.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));

    // For each habit, calculate the streak
    const habitsWithStreaks = await Promise.all(habits.map(async (habit) => {
      const logsSnapshot = await db.ref('logs').orderByChild('habitId').equalTo(habit.id).once('value');
      const logsVal = logsSnapshot.val() || {};
      const logs = Object.keys(logsVal).map(key => ({ date: logsVal[key].date }));
      
      const streak = calculateStreak(logs);
      return { ...habit, streak };
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
    const newHabitRef = db.ref('habits').push();
    const newHabit = {
      userId,
      name,
      emoji,
      createdAt: new Date().toISOString()
    };
    await newHabitRef.set(newHabit);
    res.json({ id: newHabitRef.key, ...newHabit, streak: 0 });
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
    const habitId = req.params.id as string;
    const habitRef = db.ref(`habits/${habitId}`);
    const habitSnapshot = await habitRef.once('value');
    const habitData = habitSnapshot.val();
    
    if (!habitData) {
      res.status(404).json({ message: 'Habit not found' });
      return;
    }
    if (habitData.userId !== userId) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }
    await habitRef.remove();

    // Delete associated logs
    const logsSnapshot = await db.ref('logs').orderByChild('habitId').equalTo(habitId).once('value');
    const logsVal = logsSnapshot.val() || {};
    const updates: any = {};
    Object.keys(logsVal).forEach(key => {
      updates[`/logs/${key}`] = null;
    });
    if (Object.keys(updates).length > 0) {
      await db.ref().update(updates);
    }

    res.json({ message: 'Habit removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;
