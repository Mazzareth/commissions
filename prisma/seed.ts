import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.note.deleteMany();
  await prisma.commission.deleteMany();
  await prisma.character.deleteMany();
  await prisma.client.deleteMany();

  // Create clients
  const client1 = await prisma.client.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-123-4567',
    },
  });

  const client2 = await prisma.client.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '555-987-6543',
    },
  });

  const client3 = await prisma.client.create({
    data: {
      name: 'Alex Johnson',
      email: 'alex@example.com',
      phone: '555-456-7890',
    },
  });

  // Create commissions
  await prisma.commission.create({
    data: {
      title: 'Fantasy Portrait',
      description: 'Full-color fantasy portrait with detailed background',
      price: 150.0,
      status: 'completed',
      startDate: new Date('2025-05-01'),
      dueDate: new Date('2025-05-15'),
      completedAt: new Date('2025-05-14'),
      clientId: client1.id,
    },
  });

  await prisma.commission.create({
    data: {
      title: 'Character Design',
      description: 'Original character design with concept art',
      price: 200.0,
      status: 'in-progress',
      startDate: new Date('2025-06-01'),
      dueDate: new Date('2025-06-30'),
      clientId: client1.id,
    },
  });

  await prisma.commission.create({
    data: {
      title: 'Book Cover',
      description: 'Fantasy book cover illustration',
      price: 300.0,
      status: 'pending',
      startDate: new Date('2025-06-15'),
      dueDate: new Date('2025-07-15'),
      clientId: client2.id,
    },
  });

  // Create characters
  await prisma.character.create({
    data: {
      name: 'Elara',
      description: 'Elven sorceress with silver hair and blue eyes',
      imageUrl: '/characters/elara.jpg',
      clientId: client1.id,
    },
  });

  await prisma.character.create({
    data: {
      name: 'Thorne',
      description: 'Battle-scarred warrior with a magical greatsword',
      imageUrl: '/characters/thorne.jpg',
      clientId: client1.id,
    },
  });

  await prisma.character.create({
    data: {
      name: 'Luna',
      description: 'Shapeshifting wolf with mystical powers',
      imageUrl: '/characters/luna.jpg',
      clientId: client2.id,
    },
  });

  // Create notes
  await prisma.note.create({
    data: {
      content: 'Prefers fantasy style with vibrant colors',
      clientId: client1.id,
    },
  });

  await prisma.note.create({
    data: {
      content: 'Always pays on time, great to work with',
      clientId: client1.id,
    },
  });

  await prisma.note.create({
    data: {
      content: 'Looking for a series of book covers in the future',
      clientId: client2.id,
    },
  });

  await prisma.note.create({
    data: {
      content: 'New client, first commission pending',
      clientId: client3.id,
    },
  });

  console.log('Database has been seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });