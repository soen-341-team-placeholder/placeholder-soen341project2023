const app = require("../app.js");
const request = require("supertest");

describe("GET /backend-url", () => {
  test("should respond with the backend URL", async () => {
    const response = await request(app).get("/backend-url");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("backendUrl");
  });
});

describe("User Routes", () => {
  describe("POST /users", () => {
    describe("when the username and password are missing", () => {
      test("should respond with a 400 status code", async () => {
        const response = await request(app).post("/users").send({
          email: "",
          password: "",
        });
        expect(response.statusCode).toBe(400);
      });
    });

    // Additional test case for POST /users
    describe("when the email and password are provided", () => {
      test("should respond with a 201 status code", async () => {
        const response = await request(app).post("/users").send({
          email: "user@example.com",
          password: "password123",
        });
        expect(response.statusCode).toBe(201);
      });
    });
  });

  describe("POST /login", () => {
    describe("when the email and password are correct", () => {
      test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/login").send({
          email: "user@example.com",
          password: "password123",
        });
        expect(response.statusCode).toBe(200);
      });
    });

    describe("when the email or password are incorrect", () => {
      test("should respond with a 401 status code", async () => {
        const response = await request(app).post("/login").send({
          email: "user@example.com",
          password: "wrongpassword",
        });
        expect(response.statusCode).toBe(401);
      });
    });
  });

  describe("POST /token", () => {
    describe("when the refresh token is valid", () => {
      test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/token").send({
          refreshToken: "valid-refresh-token",
        });
        expect(response.statusCode).toBe(200);
      });
    });

    describe("when the refresh token is invalid", () => {
      test("should respond with a 401 status code", async () => {
        const response = await request(app).post("/token").send({
          refreshToken: "invalid-refresh-token",
        });
        expect(response.statusCode).toBe(401);
      });
    });
  });

  describe("POST /postings", () => {
    describe("when a valid posting is created", () => {
      test("should respond with a 201 status code", async () => {
        const response = await request(app).post("/postings").send({
          title: "Job Title",
          description: "Job Description",
          // Include other necessary fields
        });
        expect(response.statusCode).toBe(201);
      });
    });

    describe("when a required field is missing", () => {
      test("should respond with a 400 status code", async () => {
        const response = await request(app).post("/postings").send({
          title: "",
          description: "Job Description",
          // Include other necessary fields
        });
        expect(response.statusCode).toBe(400);
      });
    });
  });

  describe("POST /subscribe", () => {
    describe("when a valid email is provided", () => {
      test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/subscribe").send({
          email: "user@example.com",
        });
        expect(response.statusCode).toBe(200);
      });
    });

    describe("when an invalid email is provided", () => {
      test("should respond with a 400 status code", async () => {
        const response = await request(app).post("/subscribe").send({
          email: "invalid-email",
        });
        expect(response.statusCode).toBe(400);
      });
    });
  });
});
