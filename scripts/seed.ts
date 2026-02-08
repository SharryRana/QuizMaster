import mongoose from 'mongoose';
import { defaultQuestions } from '../src/data/questions.js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

interface IQuestion {
  q: string;
  options: string[];
  answer: string;
}

interface IQuiz {
  category: string;
  questions: IQuestion[];
  isCustom: boolean;
  createdBy?: string;
}

const QuestionSchema = new mongoose.Schema<IQuestion>(
  {
    q: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const QuizSchema = new mongoose.Schema<IQuiz>(
  {
    category: { type: String, required: true, trim: true },
    questions: { type: [QuestionSchema], required: true },
    isCustom: { type: Boolean, default: false },
    createdBy: { type: String, trim: true },
  },
  { timestamps: true }
);

const Quiz = mongoose.models.Quiz || mongoose.model<IQuiz>('Quiz', QuizSchema);

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI as string);
    console.log('Connected to MongoDB successfully!');

    // Check if quizzes already exist
    const existingQuizzes = await Quiz.countDocuments({ isCustom: false });
    
    if (existingQuizzes > 0) {
      console.log(`Found ${existingQuizzes} existing default quizzes. Skipping seed.`);
      await mongoose.connection.close();
      return;
    }

    console.log('Seeding default quizzes...');

    const quizzes = Object.entries(defaultQuestions).map(([category, questions]) => ({
      category,
      questions,
      isCustom: false,
    }));

    await Quiz.insertMany(quizzes);

    console.log(`✅ Successfully seeded ${quizzes.length} quizzes!`);
    console.log('Categories:', Object.keys(defaultQuestions).join(', '));

    await mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
