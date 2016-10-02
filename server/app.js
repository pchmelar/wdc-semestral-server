'use strict'

// express
let express = require('express');
let app = express();
app.set('json spaces', 4);

// bodyParser
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongoDB
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.PROD_MONGODB || 'mongodb://localhost/wdc');

// routes
app.use('/blog', require('./routes/blogRouter'));
app.use('/login', require('./routes/loginRouter'));

app.get('/', function(req, res) {
  res.type('text/plain'); // set content-type
  res.send('Simple server and REST API for WDC semestral project'); // send text response
});

app.listen(process.env.PORT || 8080);
