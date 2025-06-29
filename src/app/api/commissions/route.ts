import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/commissions
export async function GET(req: NextRequest) {
  try {
    const clientId = req.nextUrl.searchParams.get('clientId');
    let commissions;
    if (clientId) {
      commissions = await prisma.commission.findMany({
        where: { clientId: Number(clientId) },
        orderBy: { startDate: 'desc' },
      });
    } else {
      commissions = await prisma.commission.findMany({
        orderBy: { startDate: 'desc' },
      });
    }
    return NextResponse.json(commissions, { status: 200 });
  } catch (error) {
    console.error('Error fetching commissions:', error);
    return NextResponse.json({ error: 'Failed to fetch commissions' }, { status: 500 });
  }
}

// POST /api/commissions
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    let {
      title,
      description,
      price,
      status,
      startDate,
      dueDate,
      completedAt,
      clientId,
      note,
    } = data;

    // Validation
    if (!title || !clientId) {
      return NextResponse.json(
        { error: 'Title and clientId are required' },
        { status: 400 }
      );
    }

    // Defaults
    if (typeof price !== 'number') price = 0;
    if (!status) status = 'pending';
    if (!startDate) startDate = new Date().toISOString();

    // Prepare commission data
    const commissionData: any = {
      title,
      description: description || null,
      price,
      status,
      startDate: new Date(startDate),
      dueDate: dueDate ? new Date(dueDate) : null,
      completedAt: completedAt ? new Date(completedAt) : null,
      client: { connect: { id: Number(clientId) } },
    };

    // Remove fields if null (Prisma will error on undefined for non-nullable fields)
    Object.keys(commissionData).forEach(
      (k) => commissionData[k] === null && delete commissionData[k]
    );

    const commission = await prisma.commission.create({
      data: commissionData,
    });

    // If a note is provided, attach to client (not commission-specific)
    if (note && typeof note === 'string' && note.trim().length > 0) {
      await prisma.note.create({
        data: {
          content: note,
          clientId: Number(clientId),
        },
      });
    }

    return NextResponse.json(commission, { status: 201 });
  } catch (error) {
    console.error('Error creating commission:', error);
    return NextResponse.json(
      { error: 'Failed to create commission' },
      { status: 500 }
    );
  }
}