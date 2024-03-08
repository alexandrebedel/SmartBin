import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(route: { params: { binId: string } }) {
  try {
    const binId = route.params.binId;

    if (!binId) {
      return NextResponse.error();
    }

    const trashData = await prisma.trash.findMany({
      where: {
        binId: binId.toString(),
      },
    });
    console.log(trashData);

    return NextResponse.json(trashData);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
