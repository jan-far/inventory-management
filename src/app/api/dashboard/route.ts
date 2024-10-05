import {prisma} from '@/lib/prisma';
import {NextResponse} from 'next/server';

export const GET = async (req: Request) => {
  try {
    const popularProducts = await prisma.products.findMany({
      take: 15,
      orderBy: {
        stockQuantity: 'desc',
      },
    });

    const salesSummary = await prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: 'desc',
      },
    });

    const purchaseSummary = await prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: 'desc',
      },
    });

    const expenseSummary = await prisma.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: 'desc',
      },
    });

    const expenseByCategoryRaw = await prisma.expenseByCategory.findMany({
      take: 5,
      orderBy: {
        date: 'desc',
      },
    });

    const expenseByCategorySummary = expenseByCategoryRaw.map(item => ({
      ...item,
      amount: item.amount.toString(),
    }));

    return NextResponse.json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary,
    });
  } catch (error) {
    return NextResponse.json(
      {message: 'Error retrieving dashboard metrics'},
      {status: 500},
    );
  }
};
