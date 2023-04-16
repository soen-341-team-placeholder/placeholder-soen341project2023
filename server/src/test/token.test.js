const request = require('supertest');
const app = require('../app');

describe('POST /refresh', () => {
  test('it should return a new access token when a valid refresh token is provided', async () => {
    const refreshToken = 'valid.refresh.token';

    const response = await request(app)
      .post('/refresh')
      .send({ refreshToken: refreshToken })
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
  });

  test('it should return a 403 error when an invalid refresh token is provided', async () => {
    const refreshToken = 'invalid.refresh.token';

    await request(app)
      .post('/refresh')
      .send({ refreshToken: refreshToken })
      .expect(403);
  });
});
