const app = require('./app.js');
const request = require('supertest');

describe('POST /users', () => {

    describe('when the username and password is missing', function () {

        test('should respond with a 400 status code', async () => {
            const response = await request(app).post('/users').send({
                email: '',
                password: ''
            });
            expect(response.statusCode).toBe(400);
        });
    });
});
