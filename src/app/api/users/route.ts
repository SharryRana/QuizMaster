import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    let user = await User.findOne({ username });

    if (!user) {
      user = await User.create({ username, totalQuizzes: 0, totalScore: 0, bestScore: 0 });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    let user = await User.findOne({ username });

    if (!user) {
      user = await User.create({ username, totalQuizzes: 0, totalScore: 0, bestScore: 0 });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const { username, totalQuizzes, totalScore, bestScore } = await request.json();

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const user = await User.findOneAndUpdate(
      { username },
      { totalQuizzes, totalScore, bestScore },
      { new: true, upsert: true }
    );

    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
