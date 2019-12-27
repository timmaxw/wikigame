import { Pool } from 'pg';
export const db = new Pool();

export async function createGame({code, instructions}) {
  const res = await db.query('INSERT INTO games (code, instructions) VALUES ($1::text, $2::text) RETURNING *', [code, instructions]);
  return res.rows[0];
}

export async function findGame(gid) {
  const res = await db.query('SELECT * FROM games WHERE gid=$1::integer', [gid]);
  return res.rows[0];
}

export async function updateGame(gid, {code, instructions}) {
  const res = await db.query('UPDATE games SET code=$1::text, instructions=$2::text WHERE gid=$3::integer RETURNING *', [code, instructions, gid]);
  return res.rows[0];
}
