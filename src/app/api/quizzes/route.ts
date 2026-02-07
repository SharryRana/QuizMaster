import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Quiz from '@/models/Quiz';

export async function GET() {
  try {
    await dbConnect();
    const quizzes = await Quiz.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ quizzes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { category, questions, isCustom, createdBy } = await request.json();

    if (!category || !questions || questions.length === 0) {
      return NextResponse.json(
        { error: 'Category and questions are required' },
        { status: 400 }
      );
    }

    const quiz = await Quiz.create({
      category,
      questions,
      isCustom: isCustom || false,
      createdBy,
    });

    return NextResponse.json({ quiz });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
