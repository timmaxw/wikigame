const express = require('express');
const app = express();
const port = 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.get('/', (req, res) => {
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

app.listen(port, () => console.log(`Listening on port ${port}`));

