import mongoose, { Schema, model, models } from 'mongoose';

export interface IScore {
  username: string;
  category: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  createdAt: Date;
}

const ScoreSchema = new Schema<IScore>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    score: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
ScoreSchema.index({ username: 1, createdAt: -1 });
ScoreSchema.index({ score: -1, createdAt: -1 });

const Score = models.Score || model<IScore>('Score', ScoreSchema);

export default Score;
