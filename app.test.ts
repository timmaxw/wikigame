import { app } from "./app";
const request = require('supertest');

describe('test the app', () => {
  it('index works', async () => {
    console.log('hi this is test()');
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
