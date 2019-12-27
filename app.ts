import {createGame, findGame, updateGame} from './database';
const express = require('express');
const bodyParser = require('body-parser');
export const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', {});
});

app.get('/game/:gid(\\d+)', async (req, res) => {
  const game = await findGame(req.params.gid);
  res.render('game/index', {game: game});
});

app.get('/game/:gid(\\d+)/play', async (req, res) => {
  const game = await findGame(req.params.gid);
  res.render('game/play', {game: game});
});

app.get('/game/:gid(\\d+)/code', async (req, res) => {
  const game = await findGame(req.params.gid);
  res.render('game/code', {game: game});
});

app.post('/game/:gid(\\d+)/code', async (req, res) => {
  let game = await findGame(req.params.gid);
  game = await updateGame(req.params.gid, {
    code: req.body.code || game.code,
    instructions: req.body.instructions || game.instructions,
  });
  res.render('game/code', {game: game});
});

app.post('/game/:gid(\\d+)/code/copy', async (req, res) => {
  const game = await findGame(req.params.gid);
  const gameCopy = await createGame({
    code: game.code,
    instructions: game.instructions,
  });
  res.redirect(303, `/game/${gameCopy.gid}/code`);
});

