import { app } from "./app";
import { createGame } from "./database";
const assert = require('assert');
const request = require('supertest');

describe('index page', () => {
  it('has a title', async () => {
    const page = await request(app).get('/');
    assert.equal(page.statusCode, 200);
    assert(page.text.includes("WikiGame"));
  });
});

describe('game index page', () => {
  it('has an iframe with the gid', async () => {
    const game = await createGame({
      code: 'sample game code',
      instructions: 'sample game instructions',
    });
    const page = await request(app).get(`/game/${game.gid}`);
    assert.equal(page.statusCode, 200);
    assert(page.text.includes("iframe"));
    assert(page.text.includes(`/game/${game.gid}/play`));
    assert(page.text.includes(game.instructions));
  });
});
