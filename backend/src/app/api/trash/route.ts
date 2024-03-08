import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const trashData = await prisma.trash.findMany();
    return NextResponse.json(trashData);
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!request.body) {
      return NextResponse.error();
    }

    const { binId, trashType } = await request.json();

    if (binId && trashType) {
      const trashData = await prisma.trash.create({
        data: {
          binId,
          trashType,
        },
      });
      return NextResponse.json(trashData);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
