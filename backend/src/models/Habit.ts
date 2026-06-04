import mongoose, { Schema, Document } from 'mongoose';

export interface IHabit extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  emoji: string;
  createdAt: Date;
}

const HabitSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  emoji: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IHabit>('Habit', HabitSchema);
