/**
 * @jest-environment node
 */
import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "../api/check/route";
import { readFile } from "fs/promises";
import path from "path";

const CHECK_TIMEOUT = 10 * 1000;

const errorKeys = ["message", "error", "instance"] as const;

const setupFormData = async (filepath: string) => {
  const form = new FormData();

  try {
    const file = await readFile(filepath);
    const blob = new Blob([file]);

    form.append("image", blob, "image.jpg");
    return form;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

describe("/api/check", () => {
  test("Make sure the route is only a POST", async () => {
    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const res = await fetch({ method: "GET" });

        expect(res.status).toBe(405);
        expect(res.statusText).toBe("Method Not Allowed");
      },
    });
  });

  test("Should return an error if there's no POST body", async () => {
    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const res = await fetch({ method: "POST" });
        const body = await res.json();

        expect(res.status).toBe(400);
        expect(Object.keys(body)).toEqual(expect.arrayContaining(errorKeys));
      },
    });
  });

  test("Should return an error if this is not an image on the form data", async () => {
    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const form = new FormData();

        form.append("image", "");
        const res = await fetch({ method: "POST", body: form });
        const body = await res.json();

        expect(res.status).toBe(400);
        expect(Object.keys(body)).toEqual(expect.arrayContaining(errorKeys));
      },
    });
  });

  test(
    "Should predict that the image is a metal can",
    async () => {
      await testApiHandler({
        appHandler,
        async test({ fetch }) {
          const form = await setupFormData(
            path.join(
              path.dirname(process.cwd()),
              "ai/test-images/metal-can.jpeg"
            )
          );
          const res = await fetch({ method: "POST", body: form });
          const body = await res.json();

          expect(res.status).toBe(200);
          expect(body).toBe({
            message: "Successfully found the trash type",
            type: "metal",
          });
        },
      });
    },
    CHECK_TIMEOUT
  );
});
