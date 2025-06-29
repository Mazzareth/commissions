import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params?.id || '');
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid commission ID' }, { status: 400 });
    }
    const commission = await prisma.commission.findUnique({
      where: { id },
    });
    if (!commission) {
      return NextResponse.json({ error: 'Commission not found' }, { status: 404 });
    }
    return NextResponse.json(commission);
  } catch (error) {
    console.error('Error fetching commission:', error);
    return NextResponse.json({ error: 'Failed to fetch commission details' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params?.id || '');
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid commission ID' }, { status: 400 });
    }
    const data = await request.json();
    const updated = await prisma.commission.update({
      where: { id },
      data: { ...data },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating commission:', error);
    return NextResponse.json({ error: 'Failed to update commission' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params?.id || '');
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid commission ID' }, { status: 400 });
    }
    await prisma.commission.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting commission:', error);
    return NextResponse.json({ error: 'Failed to delete commission' }, { status: 500 });
  }
}