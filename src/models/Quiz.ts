import mongoose, { Schema, model, models } from 'mongoose';

export interface IQuestion {
  q: string;
  options: string[];
  answer: string;
}

export interface IQuiz {
  category: string;
  questions: IQuestion[];
  isCustom: boolean;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    q: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const QuizSchema = new Schema<IQuiz>(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    questions: {
      type: [QuestionSchema],
      required: true,
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = models.Quiz || model<IQuiz>('Quiz', QuizSchema);

export default Quiz;
