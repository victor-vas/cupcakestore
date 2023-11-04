import prisma from "@/app/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const body = await request.json();

  const {
    id,
    name,
    description,
    batter,
    filling,
    top,
    size,
    price,
    images,
    userId,
  } = body;

  try {
    const updateProduct = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        id,
        name,
        description,
        batter,
        filling,
        top,
        size,
        price,
        images,
        userId,
      },
    });

    return NextResponse.json(updateProduct);
  } catch (error) {
    console.log("Error updating product", error);
    return NextResponse.error();
  }
}
