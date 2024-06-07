import { exec } from "@/app/utils";
import { NextRequest } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cwd } from "node:process";
import prisma from "@/lib/prisma";
import { TrashType } from "@prisma/client";

fs.mkdir(path.join(process.cwd(), "uploads/"), { recursive: true });

/**
 * Saves the file on the server and return
 * the saved file filepath
 */
async function saveFile(file: File) {
  const filepath = `./uploads/${file.name}`;
  const fullpath = `${cwd()}/uploads/${file.name}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");

  await fs.writeFile(filepath, buffer);
  return { filepath, fullpath, base64 };
}

export async function POST(request: NextRequest) {
  try {
    const binId = new URL(request.url).searchParams.get("binId");
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!binId) {
      throw new Error("Missing bin id");
    }
    if (!file) {
      throw new Error("Failed to parse the form");
    }
    if (
      file.type !== "application/octet-stream" &&
      !file.type.includes("image/")
    ) {
      throw new Error("An image file is needed to process your request");
    }

    const { fullpath, base64 } = await saveFile(file);
    const { stdout: result } = await exec(
      `python ../ai/predict.py ${fullpath}`
    );

    await prisma.trash.create({
      data: {
        binId,
        trashType:
          result.trim() === "organic"
            ? ("trash" as TrashType)
            : (result.trim() as TrashType),
        image: base64,
      },
    });
    console.log(result);
    return Response.json({
      message: "Successfully found the trash type",
      type: result.trim(),
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "An error occured",
        error:
          error instanceof Error
            ? (error as any).stdout || error.message
            : "Unknown error message",
        instance: error instanceof Error ? error.name : "GenericError",
      },
      { status: 400 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
