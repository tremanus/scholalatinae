// app/api/quiz/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import * as quizLogic from '@/utils/quizLogic';

export async function GET(request) {
  try {
    console.log('GET request received');

    const session = await getServerSession(authOptions);
    console.log('Session:', session);

    if (!session?.user?.email) {
      console.log('No valid session found');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;
    console.log('User Email:', userEmail);

    const question = await quizLogic.getNextQuestion(userEmail);

    return NextResponse.json(question);
  } catch (error) {
    console.error('Error getting next question:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;
    const body = await request.json();
    const { questionId, isCorrect, answerGiven } = body;

    await quizLogic.recordAnswer(userEmail, questionId, isCorrect, answerGiven);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error recording answer:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}