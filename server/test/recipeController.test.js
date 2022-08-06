const request = require('supertest');
const url = require('url');

const baseUrl = 'http://localhost:3001';

const mockUser = {
  name: 'string',
  email: 'string@string.com',
  password: 'string',
};

const mockRecipe = {
  title: 'myRecipe',
  description: 'A description of my recipe',
  img_url: '/url',
  img_data: url.pathToFileURL('test/Group 2.png'),
  img_alt_text: 'Some image',
  total_time: 21,
  id_tasty: 8,
  ingredients: [{ name: 'first ingredient' }],
  instructions: [{ text: 'instruction 1' }],
};

describe('Recipe endpoint', () => {
  it('should create a recipe, return a 201 status code & message in body', async () => {
    const agent = await request(baseUrl).post('/login').send(mockUser);
    const response = await request(baseUrl)
      .post('/recipes')
      .set('Cookie', [`${agent.header['set-cookie'][0]}`])
      .send(mockRecipe);

    // console.log('//////////////////////////////', response);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message');
  });
  it('should return all recipes,  & message in body', async () => {
    const agent = await request(baseUrl).post('/login').send(mockUser);
    const response = await request(baseUrl)
      .get('/recipes')
      .set('Cookie', [`${agent.header['set-cookie'][0]}`])
      .send(mockRecipe);

    // console.log('//////////////////////////////', response);
    expect(response.statusCode).toBe(200);
    // expect(response.body).toHaveProperty('message');
  });
});
