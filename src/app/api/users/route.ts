import {prisma} from '@/lib/prisma';
import {NextResponse} from 'next/server';

export const GET = async () => {
  try {
    const users = await prisma.users.findMany();
    return NextResponse.json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {message: error.message || 'Error retrieving products'},
        {status: 500},
      );
    }
  }
};
