export async function GET(request: Request) {
  return Response.json({
    message:
      "Welcome to the Smart Bin API, documentation can be found at /documentation",
    version: 1,
  });
}
