import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { BinInfo, Trash, Stats } from "@/types";


export async function GET() {
  try {
    const trashData: Trash[] = await prisma.trash.findMany();
    const totalTrash: number = trashData.length;

    const bins: BinInfo[] = [];
    const binsDict: { [binId: string]: { createdAt: Date, trashCount: { [trashType: string]: number } } } = {};

    trashData.forEach(trash => {
      const { binId, createdAt, trashType } = trash;

      if (!binsDict[binId]) {
        binsDict[binId] = {
          createdAt: new Date(createdAt),
          trashCount: {
            [trashType]: 1
          }
        };
      } else {
        const parsedCreatedAt = new Date(createdAt);
        if (parsedCreatedAt < binsDict[binId].createdAt) {
          binsDict[binId].createdAt = parsedCreatedAt;
        }
        binsDict[binId].trashCount[trashType] = (binsDict[binId].trashCount[trashType] || 0) + 1;
      }
    });

    for (const binId in binsDict) {
      const trashCount = binsDict[binId].trashCount;
      const totalTrash = Object.values(trashCount).reduce((acc, count) => acc + count, 0);

      let mostTypeTrash = '';
      let maxTrashCount = 0;
      for (const trashType in trashCount) {
        if (trashCount[trashType] > maxTrashCount) {
          mostTypeTrash = trashType;
          maxTrashCount = trashCount[trashType];
        }
      }

      bins.push({
        id: binId,
        createdAt: binsDict[binId].createdAt,
        mostTypeTrash,
        totalTrash
      });
    }

    const responseData = {
      trashData: trashData,
      totalTrash: totalTrash,
      stats: {
        totalTrashByBin: {},
        totalTrashByType: {
          recyclable: 0,
          trash: 0,
          glass: 0
        },
        bins: bins
      } as Stats
    };

    trashData.forEach(trash => {
      const { binId, trashType } = trash;

      if (responseData.stats.totalTrashByBin[binId]) responseData.stats.totalTrashByBin[binId]++;
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
