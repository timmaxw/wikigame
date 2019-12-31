import {readFileSync} from 'fs';
const assert = require('assert');

const makeGameplay = new Function(`
  const window = {addEventListener: () => {}};
  ${readFileSync('public/gameplay.js', 'utf8')}
  return {AbstractEntity, key};
`);

describe('gameplay.js', () => {
  beforeEach(() => {
    this.gameplay = makeGameplay();
    class MyEntity extends this.gameplay.AbstractEntity {
      draw(ctx) {}
    };
    this.MyEntity = MyEntity;
    class MySubEntity extends MyEntity {
    };
    this.MySubEntity = MySubEntity;
  });

  it('x and y work', () => {
    const e = new this.MyEntity({x: 1, y: 2});
    assert.equal(1, e.x);
    assert.equal(2, e.y);
  });

  it('instance() works', () => {
    assert.equal(null, this.MyEntity.instance());
    assert.equal(null, this.MySubEntity.instance());

    const e = new this.MyEntity({x: 1, y: 2});
    assert.equal(e, this.MyEntity.instance());
    assert.equal(null, this.MySubEntity.instance());

    const e2 = new this.MySubEntity({x: 3, y: 4});
    assert.throws(() => {this.MyEntity.instance()});
    assert.equal(e2, this.MySubEntity.instance());

    e.destroy();
    assert.equal(e2, this.MyEntity.instance());
    assert.equal(e2, this.MySubEntity.instance());

    e2.destroy();
    assert.equal(null, this.MyEntity.instance());
    assert.equal(null, this.MySubEntity.instance());
  });

  it('instances() works', () => {
    assert.deepStrictEqual([], Array.from(this.MyEntity.instances()));
    assert.deepStrictEqual([], Array.from(this.MySubEntity.instances()));

    const e = new this.MyEntity({x: 1, y: 2});
    assert.deepStrictEqual([e], Array.from(this.MyEntity.instances()));
    assert.deepStrictEqual([], Array.from(this.MySubEntity.instances()));

    const e2 = new this.MySubEntity({x: 3, y: 4});
    assert.equal(2, Array.from(this.MyEntity.instances()).length);
    assert.deepStrictEqual([e2], Array.from(this.MySubEntity.instances()));

    e.destroy();
    assert.deepStrictEqual([e2], Array.from(this.MyEntity.instances()));
    assert.deepStrictEqual([e2], Array.from(this.MySubEntity.instances()));

    e2.destroy();
    assert.deepStrictEqual([], Array.from(this.MyEntity.instances()));
    assert.deepStrictEqual([], Array.from(this.MySubEntity.instances()));
  });

  it('destroy() and destroyed() work', () => {
    const e = new this.MyEntity({x: 1, y: 2});
    assert.equal(false, e.destroyed, "should not be destroyed");
    e.destroy();
    assert.equal(true, e.destroyed, "should be destroyed");
    e.destroy(); /* should not error */
  });
});
