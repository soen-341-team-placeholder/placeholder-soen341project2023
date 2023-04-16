const request = require('supertest');
const app = require('./app'); // assuming that the app is exported from a file called app.js

describe('Test all endpoints', () => {
  // Test for GET / endpoint
  it('GET / should return status code 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });

  // Test for GET /users endpoint
  it('GET /users should return status code 200', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
  });

  // Test for POST /users endpoint
  it('POST /users should create a new user and return status code 201', async () => {
    const user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };
    const res = await request(app).post('/users').send(user);
    expect(res.statusCode).toEqual(201);
  });

  // Test for GET /users/:id endpoint
  it('GET /users/:id should return status code 200 and user object', async () => {
    // Assuming that there is a user with id = 1 in the database
    const res = await request(app).get('/users/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('email');
  });

  // Test for PUT /users/:id endpoint
  it('PUT /users/:id should update the user object and return status code 200', async () => {
    // Assuming that there is a user with id = 1 in the database
    const updatedUser = {
      name: 'John Doe Updated',
      email: 'john.doe.updated@example.com',
    };
    const res = await request(app).put('/users/1').send(updatedUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual(updatedUser.name);
    expect(res.body.email).toEqual(updatedUser.email);
  });

  // Test for DELETE /users/:id endpoint
  it('DELETE /users/:id should delete the user object and return status code 204', async () => {
    // Assuming that there is a user with id = 1 in the database
    const res = await request(app).delete('/users/1');
    expect(res.statusCode).toEqual(204);
  });
});

