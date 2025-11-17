import prisma from '../../../../../lib/prisma';

import { NextResponse } from 'next/server';

export async function POST(req) {
  const { userId, messages } = await req.json();

  try {
    const thread = await prisma.chatThread.upsert({
      where: { userId },
      update: { messages },
      create: { userId, messages },
    });

    return NextResponse.json({ success: true, thread });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
