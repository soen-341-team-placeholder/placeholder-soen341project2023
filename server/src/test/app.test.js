const app = require("../app.js");
const request = require("supertest");

//trivial test
describe("GET /", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
  });
});


describe("POST /users", () => {
  // describe("when the username and password is missing", function () {
  //   test("should respond with a 400 status code", async () => {
  //     const response = await request(app).post("/users").send({
  //       email: "",
  //       password: "",
  //     });
  //     expect(response.statusCode).toBe(400);
  //   });
  // });
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
  // insert test case here
});
