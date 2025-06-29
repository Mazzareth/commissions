import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, clientId, note } = data;
    if (!name || !clientId) {
      return NextResponse.json({ error: 'Name and clientId are required' }, { status: 400 });
    }
    const character = await prisma.character.create({
      data: {
        name,
        client: { connect: { id: clientId } },
      },
    });
    // If a note is provided, attach it to the client as a note (character-specific notes not in schema yet)
    if (note) {
      await prisma.note.create({
        data: {
          content: note,
          clientId,
        },
      });
    }
    return NextResponse.json(character, { status: 201 });
  } catch (error) {
    console.error('Error creating character:', error);
    return NextResponse.json({ error: 'Failed to create character' }, { status: 500 });
  }
}