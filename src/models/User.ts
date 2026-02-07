import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  username: string;
  totalQuizzes: number;
  totalScore: number;
  bestScore: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    totalQuizzes: {
      type: Number,
      default: 0,
    },
    totalScore: {
      type: Number,
      default: 0,
    },
    bestScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>('User', UserSchema);

export default User;
