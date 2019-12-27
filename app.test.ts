import { app } from "./app";
const assert = require('assert');
const request = require('supertest');

describe('test the app', () => {
  it('index works', async () => {
    const response = await request(app).get('/');
    assert.equal(response.statusCode, 200);
    assert(response.text.includes("Hello Tim"));
  });
});
