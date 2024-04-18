import { exec } from "@/app/utils";
import { NextRequest } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cwd } from "node:process";

fs.mkdir(path.join(process.cwd(), "uploads/"), { recursive: true });

/**
 * Saves the file on the server and return
 * the saved file filepath
 */
async function saveFile(file: File) {
  const filepath = `./uploads/${file.name}`;
  const fullpath = `${cwd()}/uploads/${file.name}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await fs.writeFile(filepath, buffer);
  return { filepath, fullpath };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      throw new Error("Failed to parse the form");
    }
    if (
      file.type !== "application/octet-stream" &&
      !file.type.includes("image/")
    ) {
      throw new Error("An image file is needed to process your request");
    }

    const { fullpath } = await saveFile(file);
    const { stdout: result } = await exec(
      `python ../ai/predict.py ${fullpath}`
    );

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
  }
}
