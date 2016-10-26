'use strict'

let mongoose = require('mongoose');
let Blog = require('../models/blog');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

exports.list = function(req, res) {
  Blog.find({}, { 'email': false, 'pass': false }, function(err, blogs) {
    if (err) throw err;
    res.json(blogs);
  });
};

exports.view = function(req, res) {
  Blog.findOne({ blogid: req.params.blogid }, { 'email': false, 'pass': false }, function(err, blog) {
    if (err) throw err;
    if (blog === null) {
      res.statusCode = 404;
      res.send('Error 404: Blog with specified ID not found');
    } else res.json(blog);
  });
};

exports.create = function(req, res) {
  if (!req.body.hasOwnProperty('blogid') ||
    !req.body.hasOwnProperty('email') ||
    !req.body.hasOwnProperty('pass') ||
    !req.body.hasOwnProperty('title') ||
    !req.body.hasOwnProperty('about')) {
    res.statusCode = 400;
    res.send('Error 400: POST syntax incorrect.');
  } else {

    // check if blogid is unique
    Blog.findOne({ blogid: req.body.blogid }, function(err, blog) {
      if (err) throw err;
      if (blog !== null) {
        res.statusCode = 409;
        res.send('Error 409: Blog with specified ID already exists');
      } else {

        // check if email is unique
        Blog.findOne({ email: req.body.email }, function(err, blog) {
          if (err) throw err;
          if (blog !== null) {
            res.statusCode = 409;
            res.send('Error 409: Blog with specified email already exists');
          } else {

            // hash the password with bcrypt
            bcrypt.hash(req.body.pass, 10, function(err, hash) {

              // create a new object
              var newBlog = Blog({
                blogid: req.body.blogid,
                email: req.body.email,
                pass: hash,
                title: req.body.title,
                about: req.body.about
              });

              // save the object
              newBlog.save(function(err) {
                if (err) throw err;
                res.statusCode = 201;

                // create a token
                let token = jwt.sign({ user: req.body.email }, (process.env.PROD_JWTKEY || 'secretKey'), {
                  expiresIn: '24h'
                });

                res.json({
                  'blogid': req.body.blogid,
                  'email': req.body.email,
                  'token': token
                });

              });
            });

          }
        });
      }
    });
  }
};

exports.update = function(req, res) {
  Blog.findOne({ blogid: req.params.blogid }, function(err, blog) {
    if (err) throw err;
    if (blog == null) {
      res.statusCode = 404;
      res.send('Error 404: Blog with specified ID not found');
    } else {

      // user authorization
      if (req.token.user === blog.email) {

        // update the object
        if (req.body.hasOwnProperty('title')) blog.title = req.body.title;
        if (req.body.hasOwnProperty('about')) blog.about = req.body.about;

        // save the object
        blog.save(function(err) {
          if (err) throw err;
          res.json(true);
        });

      } else {
        res.statusCode = 401;
        res.send('Error 401: Unauthorized')
      }
    }
  });
};

exports.delete = function(req, res) {
  Blog.findOne({ blogid: req.params.blogid }, function(err, blog) {
    if (err) throw err;
    if (blog == null) {
      res.statusCode = 404;
      res.send('Error 404: Blog with specified ID not found');
    } else {

      // user authorization
      if (req.token.user === blog.email) {

        // delete the object
        blog.remove(function(err) {
          if (err) throw err;
          res.json(true);
        });

      } else {
        res.statusCode = 401;
        res.send('Error 401: Unauthorized')
      }
    }
  });
};
