import prisma from "@/app/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    name,
    size,
    batter,
    filling,
    top,
    price,
    description,
    images,
    userId,
  } = body;

  try {
    const product = await prisma.product.create({
      data: {
        name,
        size,
        batter,
        filling,
        top,
        price,
        description,
        images,
        userId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("Error creating the product", error);
    return NextResponse.error();
  }
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { productId, userId } = body;

  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId,
        userId: userId,
      },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product", error);
    return NextResponse.error();
  }
}
