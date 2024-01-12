import { exec } from "@/app/utils";

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

    // Gets the result from the python script
    const { stdout: result } = await exec("echo 'trash'");

    return Response.json({
      message: "Successfully found the trash type",
      type: result,
    });
  } catch (error) {
    return Response.json({
      message: "An error occured",
      error: error instanceof Error ? error.message : "Unknown error message",
      instance: error instanceof Error ? error.name : "GenericError",
    });
  }
}
