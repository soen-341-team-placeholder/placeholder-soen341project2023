const app = require("../app.js");
const request = require("supertest");

//trivial test
describe("GET /", () => {
  describe("when the endpoint is called", () => {
    test("should respond with a 200 status code", async () => {
      const res = await request(app).get("/");
      expect(res.statusCode).toBe(200);
    }, 10000); // Set a timeout of 10 seconds
  });
});

describe("POST /users", () => {
  describe("when the username and password is missing", function () {
    test("should respond with a 400 status code", async () => {
      const response = await request(app).post("/users").send({
        email: "",
        password: "",
      });
      expect(response.statusCode).toBe(400);
    }, 10000); // Set a timeout of 10 seconds
  });
});

describe("POST /login", () => {
  // Add test cases for the /login route here
}, 10000); // Set a timeout of 10 seconds

describe("POST /token", () => {
  // Add test cases for the /token route here
}, 10000); // Set a timeout of 10 seconds

describe("POST /postings", () => {
  // Add test cases for the /postings route here
}, 10000); // Set a timeout of 10 seconds

describe("POST /subscribe", () => {
  // Add test cases for the /subscribe route here
}, 10000); // Set a timeout of 10 seconds

describe("GET /backend-url", () => {
  // insert test case here
}, 10000); // Set a timeout of 10 seconds
