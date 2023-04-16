const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

jest.mock('../models/User');

describe('POST /login', () => {
  beforeEach(() => {
    User.mockClear();
  });

  it('should return 404 if user is not found', async () => {
    User.findOne.mockResolvedValueOnce(null);

    const response = await request(app)
      .post('/login')
      .send({ email: 'nonexistentuser@example.com', password: 'password' });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  it('should return 400 if password is incorrect', async () => {
    User.findOne.mockResolvedValueOnce({
      email: 'existinguser@example.com',
      password: 'password',
    });

    const response = await request(app)
      .post('/login')
      .send({ email: 'existinguser@example.com', password: 'wrongpassword' });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Password is incorrect');
  });

  it('should return 200 with access and refresh tokens if user is found and password is correct', async () => {
    User.findOne.mockResolvedValueOnce({
      email: 'existinguser@example.com',
      password: 'correctpassword',
    });

    const response = await request(app)
      .post('/login')
      .send({ email: 'existinguser@example.com', password: 'correctpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
  });

  it('should return 500 if server error occurs', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    User.findOne.mockRejectedValueOnce(new Error('connection error'));

    const response = await request(app)
      .post('/login')
      .send({ email: 'existinguser@example.com', password: 'correctpassword' });

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Server error');

    jest.restoreAllMocks();
  });
});
