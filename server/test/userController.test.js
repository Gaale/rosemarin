const request = require('supertest');

const baseUrl = 'http://localhost:3001';

const mockUser = {
  name: 'string',
  email: 'string@string.com',
  password: 'string',
};

let agent;
describe('User endpoint', () => {
  it('should get a cookie with sid in the header & return a 201 status code', async () => {
    const response = await request(baseUrl).post('/login').send(mockUser);
    console.log('agentlog /&/&/%&/&%%&/%&/%/&/&&/&///////////', response);
    expect(response.statusCode).toBe(200);
    expect(response.header).toHaveProperty('set-cookie');
    agent = response;

    expect(response.text).toEqual('Ok');
  });

  it('should get user & return a 200 status code', async () => {
    const response = await request(baseUrl)
      .get('/me')
      .set('Cookie', [`${agent.header['set-cookie'][0]}`]);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
  });

  it('should destroy the cookie & return a 200 status code', async () => {
    const response = await request(baseUrl)
      .get('/logout')
      .set('Cookie', [`${agent.header['set-cookie'][0]}`]);

    expect(
      response.header['set-cookie'] === agent.header['set-cookie']
    ).toBeFalsy();

    expect(response.statusCode).toBe(200);
  });
});
