const request = require('supertest');
const app = require('../app');
jest.mock('../models/User');

describe('POST /refresh', () => {
  const validRefreshToken = 'valid.refresh.token';
  const invalidRefreshToken = 'invalid.refresh.token';
  const accessToken = 'valid.access.token';

  beforeEach(() => {
    jest.resetModules();
  });

  test('it should return a new access token when a valid refresh token is provided', async () => {
    jest.mock('../services/tokenService', () => ({
      generateAccessToken: jest.fn(() => accessToken),
      verifyRefreshToken: jest.fn(() => ({ userId: '123' })),
    }));

    const response = await request(app)
      .post('/refresh')
      .send({ refreshToken: validRefreshToken })
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
    expect(response.body.accessToken).toEqual(accessToken);
  });

  test('it should return a 403 error when an invalid refresh token is provided', async () => {
    jest.mock('../services/tokenService', () => ({
      verifyRefreshToken: jest.fn(() => {
        throw new Error('Invalid refresh token');
      }),
    }));

    await request(app)
      .post('/refresh')
      .send({ refreshToken: invalidRefreshToken })
      .expect(403);
  });
});
