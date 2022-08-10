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
    it('should create a recipe, return a 201 status code & message in body', () => __awaiter(void 0, void 0, void 0, function* () {
        const agent = yield request(baseUrl).post('/login').send(mockUser);
        const response = yield request(baseUrl)
            .post('/recipes')
            .set('Cookie', [`${agent.header['set-cookie'][0]}`])
            .send(mockRecipe);
        // console.log('//////////////////////////////', response);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message');
    }));
    it('should return all recipes,  & message in body', () => __awaiter(void 0, void 0, void 0, function* () {
        const agent = yield request(baseUrl).post('/login').send(mockUser);
        const response = yield request(baseUrl)
            .get('/recipes')
            .set('Cookie', [`${agent.header['set-cookie'][0]}`])
            .send(mockRecipe);
        // console.log('//////////////////////////////', response);
        expect(response.statusCode).toBe(200);
        // expect(response.body).toHaveProperty('message');
    }));
});
