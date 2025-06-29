import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    
    return NextResponse.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, handle, note } = data;
    if (!name || !handle) {
      return NextResponse.json({ error: 'Name and handle are required' }, { status: 400 });
    }
    const client = await prisma.client.create({
      data: {
        name,
        email: handle, // We'll store handle in email for now (as per requirements)
      },
    });
    // If a note is provided, attach it
    if (note) {
      await prisma.note.create({
        data: {
          content: note,
          clientId: client.id,
        },
      });
    }
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
  }
}