import {prisma} from '@/lib/prisma';
import {NextResponse} from 'next/server';

export const GET = async () => {
  try {
    const users = await prisma.users.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      {message: 'Error retrieving users'},
      {status: 500},
    );
  }
};
