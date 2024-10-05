import {prisma} from '@/lib/prisma';
import {NextResponse} from 'next/server';

export const GET = async (req: Request) => {
  try {
    const {searchParams} = new URL(req.url);
    const search = searchParams.get('search')?.toString();
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      {message: 'Error retrieving products'},
      {status: 500},
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const {productId, name, price, rating, stockQuantity} = await req.json();
    const product = await prisma.products.create({
      data: {
        productId,
        name,
        price,
        rating,
        stockQuantity,
      },
    });
    return NextResponse.json(product, {status: 201});
  } catch (error) {
    return NextResponse.json(
      {message: 'Error creating product'},
      {status: 500},
    );
  }
};
