const express = require('express');
export const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.get('/', (req, res) => {
  console.log('hi this is app.get');
  throw new Error('broken');
  res.render('index', {name: 'Tim'});
});

app.get('/game/:gid', (req, res) => {
  // res.render('game/index', {gid: req.params.gid});
});

app.get('/game/:gid/play', (req, res) => {
});

app.get('/game/:gid/code', (req, res) => {
});

app.post('/game/:gid/code/change', (req, res) => {
});

app.post('/game/:gid/code/fork', (req, res) => {
});


