const request = require('supertest');

const baseUrl = 'http://localhost:3001';

const mockUser = {
  name: 'string',
  email: 'string@string.com',
  password: 'string',
};

let agent;
describe('User endpoint', () => {
  it('should create a new user & return a 201 status code', async () => {
    const response = await request(baseUrl).post('/login').send(mockUser);
    expect(response.statusCode).toBe(200);
    agent = response;
    expect(response.text).toEqual('Ok');
  });
  it('should get user & return a 200 status code', async () => {
    console.log('Response log##########################', agent.header);
    const response = await request(baseUrl).get('/me');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name');
  });
});
