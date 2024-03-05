import { createMocks } from "node-mocks-http";
import { POST as POSTHandler } from "../api/check/route";

describe("/api/check", () => {
  test("Make sure the route is only a POST", async () => {
    const { req, res } = createMocks({ method: "GET" });
    // @ts-ignore
    const response = await POSTHandler(req);

    console.log(response);
    expect(1).toBe(0);
    // expect({}).toBe(200)
    // expect(await response.json()).toEqual([
    //   { id: 1, name: 'Alice' },
    //   { id: 2, name: 'Bob' },
    // ])
  });
});
