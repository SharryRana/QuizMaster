import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Score from '@/models/Score';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (username) {
      const scores = await Score.find({ username }).sort({ createdAt: -1 }).limit(10);
      return NextResponse.json({ scores });
    } else {
      const scores = await Score.find({}).sort({ score: -1, createdAt: -1 }).limit(10);
      return NextResponse.json({ scores });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { username, category, score, totalQuestions } = await request.json();

    if (!username || !category || score === undefined || !totalQuestions) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const percentage = Math.round((score / totalQuestions) * 100);

    // Save score
    const newScore = await Score.create({
      username,
      category,
      score,
      totalQuestions,
      percentage,
    });

    // Update user stats
    const user = await User.findOne({ username });
    if (user) {
      user.totalQuizzes += 1;
      user.totalScore += score;
      if (score > user.bestScore) {
        user.bestScore = score;
      }
      await user.save();
    }

    return NextResponse.json({ score: newScore });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
