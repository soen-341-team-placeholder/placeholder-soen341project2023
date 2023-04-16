const request = require('supertest');
const app = require('../app'); // assuming your Express app is exported from a file called app.js

describe('POST /login', () => {
  it('should return 404 if user is not found', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'nonexistentuser@example.com', password: 'password' });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  it('should return 400 if password is incorrect', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'existinguser@example.com', password: 'wrongpassword' });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Password is incorrect');
  });

  it('should return 200 with access and refresh tokens if user is found and password is correct', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'existinguser@example.com', password: 'correctpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
  });

  it('should return 500 if server error occurs', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // mock console.error to prevent output during test
    jest.spyOn(MongoClient, 'connect').mockRejectedValueOnce(new Error('connection error')); // mock MongoClient.connect to simulate a connection error

    const response = await request(app)
      .post('/login')
      .send({ email: 'existinguser@example.com', password: 'correctpassword' });

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Server error');

    jest.restoreAllMocks(); // restore the mocked functions to their original implementations
  });
});
