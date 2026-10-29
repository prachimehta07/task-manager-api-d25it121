
const request = require("supertest");
const app = require("../server");

describe("API", () => {
  test("GET /tasks without a token returns 401", async () => {
    const res = await request(app).get("/tasks");

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe("No token provided");
  });

  test("GET /unknown-route returns 404", async () => {
    const res = await request(app).get("/unknown-route");

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Route not found");
  });

  test("POST /auth/login with empty body returns 400", async () => {
    const res = await request(app)
      .post("/auth/login")
      .set("Content-Type", "application/json")
      .send({});

    expect(res.statusCode).toBe(400);
  });
});
