'use strict'

module.exports = (function() {

  let mongoose = require('mongoose');
  let router = require('express').Router();
  let Blog = require('../models/blog');
  let bcrypt = require('bcrypt');
  let jwt = require('jsonwebtoken');

  router.post('/', function(req, res) {

    if (!req.body.hasOwnProperty('email') ||
      !req.body.hasOwnProperty('pass')) {
      res.statusCode = 400;
      res.send('Error 400: POST syntax incorrect.');
    } else {
      Blog.findOne({ email: req.body.email }, function(err, blog) {
        if (err) throw err;
        if (blog === null) {
          res.statusCode = 403;
          res.send('Error 403: Wrong email or password');
        } else {
          // compare the password with bcrypt hash
          bcrypt.compare(req.body.pass, blog.pass, function(err, bcryptRes) {
            if (bcryptRes == true) {

              // create a token
              let token = jwt.sign({user: req.body.email}, (process.env.PROD_JWTKEY || 'secretKey'), {
                expiresIn: '24h'
              });

              res.json({
                'blogid': blog.blogid,
                'token': token
              });
            } else {
              res.statusCode = 403;
              res.send('Error 403: Wrong email or password')
            }
          });
        }
      });
    }
  });

  return router;

})();
