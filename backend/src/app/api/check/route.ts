import { exec } from "@/app/utils";
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

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      throw new Error("Failed to parse the form");
    }
    if (!file.type.includes("image/")) {
      throw new Error("An image file is needed to process your request");
    }

    const { filepath, fullpath } = await saveFile(file);
    const { stdout: result } = await exec(
      `python3 ../ai/predict.py ${fullpath}`
    );

    await fs.unlink(filepath);
    return Response.json({
      message: "Successfully found the trash type",
      type: result.trim(),
    });
  } catch (error) {
    return Response.json({
      message: "An error occured",
      error:
        error instanceof Error
          ? (error as any).stdout || error.message
          : "Unknown error message",
      instance: error instanceof Error ? error.name : "GenericError",
    });
  }
}
