import prisma from "@/app/prismadb";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export async function GET(request: Request) {
  try {
    const searchParams = new URLSearchParams(request.url);

    const sizes = searchParams.getAll("size[]");

    const minPrice = parseInt(searchParams.get("price[min]") || "0");
    const maxPrice = parseInt(searchParams.get("price[max]") || "100000");

    const products = await prisma.product.findMany({
      where: {
        price: { gte: minPrice, lte: maxPrice },
        AND: [...sizes.map((size) => ({ size: { contains: size } }))],
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error selecting product", error);
    return NextResponse.error();
  }
}
