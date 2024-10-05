import {prisma} from '@/lib/prisma';
import {NextResponse} from 'next/server';

export const GET = async () => {
  try {
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany(
      {
        orderBy: {
          date: 'desc',
        },
      },
    );
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map(item => ({
      ...item,
      amount: item.amount.toString(),
    }));

    return NextResponse.json(expenseByCategorySummary);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {message: 'Error retrieving expenses by category'},
        {status: 500},
      );
    }
  }
};
