# Commission Client Dashboard

A Next.js application with Prisma and SQLite for managing commission clients, their characters, and projects.

## Features

- Client management with contact information
- Commission tracking with status and pricing
- Character database for each client
- Client notes for important information

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Mazzareth/commissions.git
cd commissions
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following content:
```
DATABASE_URL="file:./prisma/dev.db"
```

4. Set up the database:
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `/prisma` - Database schema and migrations
- `/src/app` - Next.js application routes
- `/src/components` - React components
- `/src/lib` - Utility functions and libraries

## Database Schema

- **Client** - Stores client information
- **Commission** - Tracks commission projects
- **Character** - Stores character information
- **Note** - Client-specific notes

## Troubleshooting

### Database URL Not Found

If you encounter an error about the DATABASE_URL environment variable not being found:

1. Make sure you have a `.env` file in the root directory with the correct DATABASE_URL
2. Try running the seed command with the DATABASE_URL explicitly:
   ```bash
   npx cross-env DATABASE_URL="file:./prisma/dev.db" prisma db seed
   ```
3. You may need to install cross-env first:
   ```bash
   npm install -D cross-env
   ```

## License

This project is licensed under the MIT License.
