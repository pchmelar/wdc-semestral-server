// express
var express = require('express');
var app = express();
app.set('json spaces', 4);

// bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongoDB
var mongoose = require('mongoose');
mongoose.connect(process.env.PROD_MONGODB || 'mongodb://localhost/wdc');

// routes
var post = require('./routes/postRouter');
app.use('/post', post);

app.get('/', function(req, res) {
  res.type('text/plain'); // set content-type
  res.send('Simple server and REST API for WDC semestral project'); // send text response
});

app.listen(process.env.PORT || 8080);
