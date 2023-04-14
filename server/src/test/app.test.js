const app = require("../app.js");
const request = require("supertest");

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

    // Add other test cases for the /users route here
  });

  describe("POST /login", () => {
    // Add test cases for the /login route here
  });

  describe("POST /token", () => {
    // Add test cases for the /token route here
  });

  describe("POST /postings", () => {
    // Add test cases for the /postings route here
  });

  describe("POST /subscribe", () => {
    // Add test cases for the /subscribe route here
  });

  describe("GET /backend-url", () => {
    test("should respond with the backend URL", async () => {
      const response = await request(app).get("/backend-url");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("backendUrl");
    });
  });
});
