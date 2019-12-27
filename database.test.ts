const assert = require('assert');
import { db, createGame, findGame, updateGame } from './database';

/* This hook will run after all of the tests are finished running, in both this
file and all the other test files. It will clean up the DB connection pool so
that the Node process can exit. */
after(async () => {
  await db.end();
});

describe('the database', () => {
  it('write then read', async () => {
    const game1 = await createGame({
      code: 'code A',
      instructions: 'instructions A',
    });
    assert.equal('code A', game1.code);
    assert.equal('instructions A', game1.instructions);

    const game2 = await findGame(game1.gid);
    assert.equal('code A', game2.code);
    assert.equal('instructions A', game2.instructions);

    const game3 = await updateGame(game1.gid, {
      code: 'code B',
      instructions: 'instructions B',
    });
    assert.equal('code B', game3.code);
    assert.equal('instructions B', game3.instructions);

    const game4 = await findGame(game1.gid);
    assert.equal('code B', game4.code);
    assert.equal('instructions B', game4.instructions);
  });
});
