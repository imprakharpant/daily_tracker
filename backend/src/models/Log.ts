import mongoose, { Schema, Document } from 'mongoose';

export interface ILog extends Document {
  habitId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  date: string; // YYYY-MM-DD
  completedAt: Date;
}

const LogSchema: Schema = new Schema({
  habitId: { type: Schema.Types.ObjectId, ref: 'Habit', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  completedAt: { type: Date, default: Date.now },
});

// A user can only log a habit once per day
LogSchema.index({ habitId: 1, userId: 1, date: 1 }, { unique: true });

export default mongoose.model<ILog>('Log', LogSchema);
