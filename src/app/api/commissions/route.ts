import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { title, clientId, note } = data;
    if (!title || !clientId) {
      return NextResponse.json({ error: 'Title and clientId are required' }, { status: 400 });
    }
    const commission = await prisma.commission.create({
      data: {
        title,
        status: 'pending',
        price: 0,
        client: { connect: { id: clientId } },
      },
    });
    // If a note is provided, attach it to the client as a note (commission-specific notes not in schema yet)
    if (note) {
      await prisma.note.create({
        data: {
          content: note,
          clientId,
        },
      });
    }
    return NextResponse.json(commission, { status: 201 });
  } catch (error) {
    console.error('Error creating commission:', error);
    return NextResponse.json({ error: 'Failed to create commission' }, { status: 500 });
  }
}