var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'Torneio')));
app.set('views', path.join(__dirname, 'Torneio'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.listen(2002, () => {
  console.log('Server rodando em http://localhost:2002');
});