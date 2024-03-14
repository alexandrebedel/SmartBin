import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export type TrashType = "recyclable" | "trash" | "glass";
export interface Trash {
  id: number;
  binId: string;
  trashType: TrashType;
  createdAt: Date;
  updatedAt: Date;
}

export interface Stats {
  totalTrashByBin: { [binId: string]: number };
  totalTrashByType: { [trashType: string]: number };
}

export async function GET() {
  try {
    const trashData: Trash[] = await prisma.trash.findMany();
    const totalTrash: number = trashData.length;

    const responseData = {
      trashData: trashData,
      totalTrash: totalTrash,
      stats: {
        totalTrashByBin: {},
        totalTrashByType: {
          recyclable: 0,
          trash: 0,
          glass: 0
        }
      } as Stats
    };

    trashData.forEach(trash => {
      const { binId, trashType } = trash;

      if (responseData.stats.totalTrashByBin[binId]) responseData.stats.totalTrashByBin[binId]++
      else responseData.stats.totalTrashByBin[binId] = 1;

      if (trashType in responseData.stats.totalTrashByType) responseData.stats.totalTrashByType[trashType]++;
    });

    return NextResponse.json(responseData);
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
