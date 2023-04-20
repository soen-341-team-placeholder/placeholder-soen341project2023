const app = require("../client.js");
const request = require("supertest");

//trivial test
describe("GET /", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
  });
});

describe("POST /users", () => {
  describe("when the username and password is missing", () => {
    test("should respond with a 400 status code", async () => {
      const response = await request(app).post("/users").send({
        email: "",
        password: "",
      });
      expect(response.statusCode).toBe(400);
    });
  });
});

//POST /login:
describe("POST /login", () => {
  test("responds with 200 and token on valid credentials", async () => {
    const response = await request(app).post("/login").send({
      email: process.env.VALID_EMAIL,
      password: process.env.VALID_PASSWORD,
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test("responds with 401 on invalid credentials", async () => {
    const response = await request(app).post("/login").send({
      email: process.env.INVALID_EMAIL,
      password: process.env.INVALID_PASSWORD,
    });
    expect(response.status).toBe(401);
  });

  test("responds with 400 on missing email or password", async () => {
    const response = await request(app).post("/login").send({});
    expect(response.status).toBe(400);
  });

  test("responds with 400 on invalid email or password", async () => {
    const response = await request(app).post("/login").send({
      email: process.env.INVALID_EMAIL,
      password: process.env.INVALID_PASSWORD,
    });
    expect(response.status).toBe(400);
  });
});

//POST /token:
describe("POST /token", () => {
  test("responds with 200 and new token on valid token", async () => {
    const response = await request(app)
      .post("/token")
      .set("Authorization", `Bearer ${process.env.VALID_TOKEN}`);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test("responds with 401 on invalid token", async () => {
    const response = await request(app)
      .post("/token")
      .set("Authorization", `Bearer ${process.env.INVALID_TOKEN}`);
    expect(response.status).toBe(401);
  });

  test("responds with 400 on missing or invalid token", async () => {
    const response = await request(app).post("/token");
    expect(response.status).toBe(400);
  });
});

// POST /postings:
describe("POST /postings", () => {
  test("responds with 200 and creates new posting on valid data", async () => {
    const response = await request(app)
      .post("/postings")
      .set("Authorization", `Bearer ${process.env.VALID_TOKEN}`)
      .send({ title: "New posting", description: "Posting description" });
    expect(response.status).toBe(200);
    expect(response.body.posting).toBeDefined();
  });

  test("responds with 400 on missing or invalid data", async () => {
    const response = await request(app)
      .post("/postings")
      .set("Authorization", `Bearer ${process.env.VALID_TOKEN}`)
      .send({});
    expect(response.status).toBe(400);
  });

  test("responds with 401 when user is not authorized", async () => {
    const response = await request(app)
      .post("/postings")
      .set("Authorization", `Bearer ${process.env.INVALID_TOKEN}`)
      .send({ title: "New posting", description: "Posting description" });
    expect(response.status).toBe(401);
  });
});

describe("POST /subscribe", () => {
  it("should respond with a 200 status code and a success message", async () => {
    const response = await request(app).post("/subscribe").send({
      email: "test@example.com",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Subscription successful");
  });

  it("should respond with a 400 status code and an error message if email is missing", async () => {
    const response = await request(app).post("/subscribe").send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required");
  });
});
