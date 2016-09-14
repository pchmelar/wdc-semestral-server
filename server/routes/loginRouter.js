'use strict'

module.exports = (function() {

  let mongoose = require('mongoose');
  let router = require('express').Router();
  let Blog = require('../models/blog');
  let bcrypt = require('bcrypt');

  router.post('/', function(req, res) {

    if (!req.body.hasOwnProperty('email') ||
      !req.body.hasOwnProperty('pass')) {
      res.statusCode = 400;
      res.send('Error 400: POST syntax incorrect.');
    } else {
      Blog.findOne({ email: req.body.email }, function(err, blog) {
        if (err) throw err;
        if (blog === null) {
          res.statusCode = 404;
          res.send('Error 404: User with specified email not found');
        } else {
          // compare the password with bcrypt hash
          bcrypt.compare(req.body.pass, blog.pass, function(err, bcryptRes) {
            if (bcryptRes == true) {
              res.json({
                'blogid': blog.blogid,
                'title': blog.title,
                'about': blog.about
              });
            } else {
              res.statusCode = 403;
              res.send('Error 403: Wrong password')
            }
          });
        }
      });
    }
  });

  return router;

})();