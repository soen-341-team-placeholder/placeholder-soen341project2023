const request = require('supertest');
const app = require('../app');

describe('Posting endpoints', () => {
  let token;
  let studentToken;
  let postingId;

  // Get tokens for authentication
  beforeAll(async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'adminpassword'
      });

    token = response.body.token;

    const studentResponse = await request(app)
      .post('/auth/login')
      .send({
        email: 'student@test.com',
        password: 'studentpassword'
      });

    studentToken = studentResponse.body.token;
  });
})
  describe('POST /postings', () => {
    it('should create a new posting', async () => {
      const newPosting = {
        title: 'New Posting',
        description: 'This is a new posting',
        employerId: '123',
        startDate: '2022-01-01',
        endDate: '2022-01-31',
        location: 'New York'
      };

      const response = await request(app)
        .post('/postings')
        .set('Authorization', `Bearer ${token}`)
        .send(newPosting);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('title', 'New Posting');
      expect(response.body).toHaveProperty('description', 'This is a new posting');
      expect(response.body).toHaveProperty('employerId', '123');
      expect(response.body).toHaveProperty('startDate', '2022-01-01');
      expect(response.body).toHaveProperty('endDate', '2022-01-31');
      expect(response.body).toHaveProperty('location', 'New York');
      expect(response.body).toHaveProperty('_id');

      postingId = response.body._id;
    });

    it('should return a 403 Forbidden error when a student tries to create a new posting', async () => {
      const newPosting = {
        title: 'New Posting',
        description: 'This is a new posting',
        employerId: '456',
        startDate: '2022-01-01',
        endDate: '2022-01-31',
        location: 'Los Angeles'
      };

      const response = await request(app)
        .post('/postings')
        .set('Authorization', `Bearer ${studentToken}`)
        .send(newPosting);

      expect(response.statusCode).toBe(403);
      expect(response.text).toBe('message: Forbidden (You are a student, you cannot perform this action)');
    });

    it('should return a 401 Unauthorized error when no token is provided', async () => {
      const newPosting = {
        title: 'New Posting',
        description: 'This is a new posting',
        employerId: '123',
        startDate: '2022-01-01',
        endDate: '2022-01-31',
        location: 'New York'
      };

      const response = await request(app)
        .post('/postings')
        .send(newPosting);

      expect(response.statusCode).toBe(401);
      expect(response.text).toBe('message: Unauthorized (No token provided)');
    });
  })
