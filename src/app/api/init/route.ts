import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Quiz from '@/models/Quiz';
import { defaultQuestions } from '@/data/questions';

export async function POST() {
  try {
    await dbConnect();

    // Check if default quizzes already exist
    const existingQuizzes = await Quiz.countDocuments({ isCustom: false });
    
    if (existingQuizzes > 0) {
      return NextResponse.json({ message: 'Default quizzes already initialized' });
    }

    // Insert default quizzes
    const quizzes = Object.entries(defaultQuestions).map(([category, questions]) => ({
      category,
      questions,
      isCustom: false,
    }));

    await Quiz.insertMany(quizzes);

    return NextResponse.json({ message: 'Default quizzes initialized successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
