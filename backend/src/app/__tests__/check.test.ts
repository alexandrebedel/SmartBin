/**
 * @jest-environment node
 */
import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "../api/check/route";

const errorKeys = ["message", "error", "instance"] as const;

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

  // const form = new FormData();

  // form.append('image', '');
  // const res = await fetch({ method: "POST", body: for });

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
});
