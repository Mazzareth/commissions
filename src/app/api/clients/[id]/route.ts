import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Ensure params is awaited before accessing its properties
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
        commissions: {
          orderBy: {
            startDate: 'desc',
          },
        },
        characters: {
          orderBy: {
            name: 'asc',
          },
        },
        notes: {
          orderBy: {
            createdAt: 'desc',
          },
        },
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