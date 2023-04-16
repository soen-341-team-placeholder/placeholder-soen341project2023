const request = require('supertest');
const app = require('../app');

describe('Posting endpoints', () => {
  let token;
  let postingId;

  // Get token for authentication
  beforeAll(async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'adminpassword'
      });

    token = response.body.token;
  });

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

    // Add more tests for error cases and edge cases
  });

  describe('GET /postings/:id', () => {
    it('should return a posting by id', async () => {
      const response = await request(app)
        .get(`/postings/${postingId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id', postingId);
      expect(response.body).toHaveProperty('title', 'New Posting');
      expect(response.body).toHaveProperty('description', 'This is a new posting');
      expect(response.body).toHaveProperty('employerId', '123');
      expect(response.body).toHaveProperty('startDate', '2022-01-01');
      expect(response.body).toHaveProperty('endDate', '2022-01-31');
      expect(response.body).toHaveProperty('location', 'New York');
    });

    it('should return a 404 error if posting is not found', async () => {
      const response = await request(app)
        .get(`/postings/invalid-id`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('message: Posting not found');
    })
})
})
