"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    it('Just the Auth to get the cookie', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(baseUrl).post('/login').send(mockUser);
        agent = response;
        expect(response.text).toEqual('Ok');
    }));
    it('Should get all shopping list items and return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(baseUrl)
            .get('/items')
            .set('Cookie', [`${agent.header['set-cookie'][0]}`]);
        currentShoppingListSize = response.body.length;
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        // agent = response;
    }));
    it('Should create Shopping List Items and return status 201', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(baseUrl)
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
        const getResponse = yield request(baseUrl)
            .get('/items')
            .set('Cookie', [`${agent.header['set-cookie'][0]}`]);
        expect(getResponse.body.length).toBeGreaterThan(currentShoppingListSize);
        currentShoppingListSize++;
    }));
    it('Should Delete Shopping List Items and return status 201', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(baseUrl)
            .delete('/items')
            .set('Cookie', [`${agent.header['set-cookie'][0]}`])
            .send({ id: lastAddedID });
        // console.log(response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual('Item has been successfully deleted');
        const getResponse = yield request(baseUrl)
            .get('/items')
            .set('Cookie', [`${agent.header['set-cookie'][0]}`]);
        expect(getResponse.body.length).toBeLessThan(currentShoppingListSize);
        currentShoppingListSize--;
    }));
});
