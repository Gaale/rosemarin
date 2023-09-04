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
    name: 'string',
    email: 'string@string.com',
    password: 'string',
};
let agent;
describe('User endpoint', () => {
    it('should get a cookie with sid in the header & return a 201 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(baseUrl).post('/login').send(mockUser);
        console.log('agentlog /&/&/%&/&%%&/%&/%/&/&&/&///////////', response);
        expect(response.statusCode).toBe(200);
        expect(response.header).toHaveProperty('set-cookie');
        agent = response;
        expect(response.text).toEqual('Ok');
    }));
    it('should get user & return a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(baseUrl)
            .get('/me')
            .set('Cookie', [`${agent.header['set-cookie'][0]}`]);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
    }));
    it('should destroy the cookie & return a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(baseUrl)
            .get('/logout')
            .set('Cookie', [`${agent.header['set-cookie'][0]}`]);
        expect(response.header['set-cookie'] === agent.header['set-cookie']).toBeFalsy();
        expect(response.statusCode).toBe(200);
    }));
});
