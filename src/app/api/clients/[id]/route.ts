import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params?.id || '');
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid client ID' },
        { status: 400 }
      );
    }
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        commissions: { orderBy: { startDate: 'desc' } },
        characters: { orderBy: { name: 'asc' } },
        notes: { orderBy: { createdAt: 'desc' } },
      },
    });
    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(client);
  } catch (error) {
    console.error('Error fetching client:', error);
    return NextResponse.json(
      { error: 'Failed to fetch client details' },
      { status: 500 }
    );
  }
}

// PUT: update name/discordId
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params?.id || '');
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid client ID' }, { status: 400 });
    }
    const data = await request.json();
    const { name, discordId } = data;
    if (!name || !discordId) {
      return NextResponse.json({ error: 'Name and Discord ID are required' }, { status: 400 });
    }
    const updated = await prisma.client.update({
      where: { id },
      data: { name, discordId },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating client:', error);
    return NextResponse.json({ error: 'Failed to update client' }, { status: 500 });
  }
}

// DELETE: cascade delete client
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params?.id || '');
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid client ID' }, { status: 400 });
    }
    // Prisma cascade deletes via relations if set up (ON DELETE CASCADE)
    await prisma.client.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting client:', error);
    return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 });
  }
}