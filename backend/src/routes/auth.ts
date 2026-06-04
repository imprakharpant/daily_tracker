import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../utils/firebase';
import { IUser } from '../models/User';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists by email query
    const userSnapshot = await db.ref('users').orderByChild('email').equalTo(email).once('value');
    const usersVal = userSnapshot.val();
    
    if (usersVal) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUserRef = db.ref('users').push();
    const newUser = {
      name,
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    await newUserRef.set(newUser);
    const userId = newUserRef.key;

    const payload = { userId };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'supersecretkey_change_in_production', { expiresIn: '7d' });

    res.json({ token, user: { id: userId, name: newUser.name, email: newUser.email } });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const userSnapshot = await db.ref('users').orderByChild('email').equalTo(email).once('value');
    const usersVal = userSnapshot.val();
    
    if (!usersVal) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const userId = Object.keys(usersVal)[0];
    const userData = usersVal[userId] as IUser;

    const isMatch = await bcrypt.compare(password, userData.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = { userId };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'supersecretkey_change_in_production', { expiresIn: '7d' });

    res.json({ token, user: { id: userId, name: userData.name, email: userData.email } });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;
