import { NextRequest, NextResponse } from 'next/server';
import { isRateLimited } from '@/lib/rate-limit';
import { compareBitcoinAnswer } from '@/lib/ai-demo';

const MAX_QUESTION_LENGTH = 300;

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  if (isRateLimited(`ai-demo:${ip}`)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  let body: { question?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const question = body.question?.trim();
  if (!question || question.length > MAX_QUESTION_LENGTH) {
    return NextResponse.json(
      { error: `question is required (max ${MAX_QUESTION_LENGTH} characters).` },
      { status: 400 }
    );
  }

  try {
    const result = await compareBitcoinAnswer(question);
    return NextResponse.json(result);
  } catch (error) {
    console.error('AI demo request failed:', error);
    return NextResponse.json(
      { error: 'The demo model is waking up or unavailable — please try again in a moment.' },
      { status: 502 }
    );
  }
}
