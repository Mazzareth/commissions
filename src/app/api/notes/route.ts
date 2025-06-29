import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { content, clientId } = data;
    if (!content || !clientId) {
      return NextResponse.json({ error: 'Content and clientId are required' }, { status: 400 });
    }
    const note = await prisma.note.create({
      data: {
        content,
        client: { connect: { id: clientId } },
      },
    });
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
  }
}