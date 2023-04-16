const request = require("supertest");
const app = require("../subscribe.js");
const User = require("../models/User");

describe("POST /subscribe", () => {
  beforeAll(async () => {
    await User.deleteMany();
    const user = new User({
      email: "testuser@example.com",
      password: "password123",
      subscribedTo: [],
    });
    await user.save();
  });

  afterAll(async () => {
    await User.deleteMany();
  });

  test("should subscribe a user to an employer", async () => {
    const response = await request(app)
      .patch(`/subscribe/${user._id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        subscribedTo: ["Employer1"],
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual("Emplyer Name(s) added successfully");
  });

  test("should not subscribe user to an already subscribed employer", async () => {
    const response = await request(app)
      .patch(`/subscribe/${user._id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        subscribedTo: ["Employer1"],
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual("Name(s) already exist");
  });

  test("should send an email to the user", async () => {
    const response = await request(app)
      .post("/subscribe")
      .send({
        email: "testuser@example.com",
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual("Email sent succesfuly");
  });

  test("should return 500 if an error occurs while sending email", async () => {
    const response = await request(app)
      .post("/subscribe")
      .send({
        email: "invalidemail",
      });
    expect(response.status).toBe(500);
    expect(response.body.message).toEqual("An error has occured");
  });
});
