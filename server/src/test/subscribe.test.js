const request = require("supertest");
const app = require("../subscribe.js");
const User = require("../models/User");

jest.mock("../models/User");

describe("POST /subscribe", () => {
  const user = {
    _id: "fakeUserId",
    email: "testuser@example.com",
    password: "password123",
    subscribedTo: [],
  };
  const accessToken = "fakeAccessToken";

  beforeAll(async () => {
    User.deleteMany.mockResolvedValue({});
    User.findById.mockResolvedValue(user);
    user.save = jest.fn().mockResolvedValue(user);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should subscribe a user to an employer", async () => {
    user.subscribedTo = [];
    const employerName = "Employer1";

    const response = await request(app)
      .patch(`/subscribe/${user._id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        subscribedTo: [employerName],
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual("Employer Name(s) added successfully");
    expect(User.findById).toHaveBeenCalledTimes(1);
    expect(User.findById).toHaveBeenCalledWith(user._id);
    expect(user.subscribedTo).toEqual([employerName]);
    expect(user.save).toHaveBeenCalledTimes(1);
  });

  test("should not subscribe user to an already subscribed employer", async () => {
    const employerName = "Employer1";
    user.subscribedTo = [employerName];

    const response = await request(app)
      .patch(`/subscribe/${user._id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        subscribedTo: [employerName],
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual("Name(s) already exist");
    expect(User.findById).toHaveBeenCalledTimes(1);
    expect(User.findById).toHaveBeenCalledWith(user._id);
    expect(user.subscribedTo).toEqual([employerName]);
    expect(user.save).not.toHaveBeenCalled();
  });

  test("should send an email to the user", async () => {
    const email = "testuser@example.com";
    const sendEmailMock = jest.fn().mockResolvedValue({});

    const response = await request(app)
      .post("/subscribe")
      .send({
        email,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual("Email sent succesfuly");
    expect(sendEmailMock).toHaveBeenCalledTimes(1);
    expect(sendEmailMock).toHaveBeenCalledWith(email);
  });

  test("should return 500 if an error occurs while sending email", async () => {
    const email = "invalidemail";
    const sendEmailMock = jest.fn().mockRejectedValue(new Error("An error has occured"));

    const response = await request(app)
      .post("/subscribe")
      .send({
        email,
      });

    expect(response.status).toBe(500);
    expect(response.body.message).toEqual("An error has occured");
    expect(sendEmailMock).toHaveBeenCalledTimes(1);
    expect(sendEmailMock).toHaveBeenCalledWith(email);
  });
});
