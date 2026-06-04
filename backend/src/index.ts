import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import habitRoutes from './routes/habits';
import logRoutes from './routes/logs';
import noteRoutes from './routes/notes';
import './utils/firebase'; // Ensure Firebase is initialized

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} with Firebase Firestore database`);
});
