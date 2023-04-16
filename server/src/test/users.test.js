const request = require('supertest');
const app = require('./app');

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
    const mockUser = { name: 'John Doe', email: 'johndoe@example.com', password: 'password123' };
    const createUser = jest.fn().mockResolvedValue(mockUser);
    const app = require('./app'); // Assuming that the app is exported from a file called app.js
    app.locals.users = { createUser };

    const res = await request(app).post('/users').send(mockUser);

    expect(res.statusCode).toEqual(201);
    expect(createUser).toHaveBeenCalledWith(mockUser);
  });

  // Test for GET /users/:id endpoint
  it('GET /users/:id should return status code 200 and user object', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'johndoe@example.com' };
    const getUserById = jest.fn().mockResolvedValue(mockUser);
    const app = require('./app'); // Assuming that the app is exported from a file called app.js
    app.locals.users = { getUserById };

    const res = await request(app).get('/users/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockUser);
    expect(getUserById).toHaveBeenCalledWith(1);
  });

  // Test for PUT /users/:id endpoint
  it('PUT /users/:id should update the user object and return status code 200', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'johndoe@example.com' };
    const updatedMockUser = { id: 1, name: 'John Doe Updated', email: 'johndoeupdated@example.com' };
    const updateUser = jest.fn().mockResolvedValue(updatedMockUser);
    const getUserById = jest.fn().mockResolvedValue(mockUser);
    const app = require('./app'); // Assuming that the app is exported from a file called app.js
    app.locals.users = { updateUser, getUserById };

    const res = await request(app).put('/users/1').send(updatedMockUser);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(updatedMockUser);
    expect(getUserById).toHaveBeenCalledWith(1);
    expect(updateUser).toHaveBeenCalledWith(mockUser.id, updatedMockUser);
  });

  // Test for DELETE /users/:id endpoint
  it('DELETE /users/:id should delete the user object and return status code 204', async () => {
    const deleteUser = jest.fn().mockResolvedValue();
    const app = require('./app'); // Assuming that the app is exported from a file called app.js
    app.locals.users = { deleteUser };

    const res = await request(app).delete('/users/1');

    expect(res.statusCode).toEqual(204);
    expect(deleteUser).toHaveBeenCalledWith(1);
  });
});


