const request = require('supertest');

const baseUrl = 'http://localhost:3001';

const mockUser = {
  // id: 1,
  name: 'string',
  email: 'string@string.com',
  password: 'string',
};

const mockShoppingListItem = {
  name: 'Test Item',
  unit: 'unit',
  quantity: 'quantity',
  // userId: 1,
};

let agent;
let currentShoppingListSize;
let lastAddedID;

describe('Recipe List endpoint', () => {
  it('Just the Auth to get the cookie', async () => {
    const response = await request(baseUrl).post('/login').send(mockUser);

    agent = response;
    expect(response.text).toEqual('Ok');
  });
  it('Should get all shopping list items and return status 200', async () => {
    const response = await request(baseUrl)
      .get('/items')
      .set('Cookie', [`${agent.header['set-cookie'][0]}`]);

    currentShoppingListSize = response.body.length;
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    // agent = response;
  });
  it('Should create Shopping List Items and return status 201', async () => {
    const response = await request(baseUrl)
      .post('/items')
      .set('Cookie', [`${agent.header['set-cookie'][0]}`])
      .send(mockShoppingListItem);

    // console.log(response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toEqual(mockShoppingListItem.name);
    expect(response.body.email).toEqual(mockShoppingListItem.email);
    expect(response.body.quantity).toEqual(mockShoppingListItem.quantity);
    expect(response.body).toHaveProperty('UserId');

    lastAddedID = response.body.id;

    const getResponse = await request(baseUrl)
      .get('/items')
      .set('Cookie', [`${agent.header['set-cookie'][0]}`]);

    expect(getResponse.body.length).toBeGreaterThan(currentShoppingListSize);
    currentShoppingListSize++;
  });
  it('Should Delete Shopping List Items and return status 201', async () => {
    const response = await request(baseUrl)
      .delete('/items')
      .set('Cookie', [`${agent.header['set-cookie'][0]}`])
      .send({ id: lastAddedID });

    // console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Item has been successfully deleted');

    const getResponse = await request(baseUrl)
      .get('/items')
      .set('Cookie', [`${agent.header['set-cookie'][0]}`]);

    expect(getResponse.body.length).toBeLessThan(currentShoppingListSize);
    currentShoppingListSize--;
  });
});
