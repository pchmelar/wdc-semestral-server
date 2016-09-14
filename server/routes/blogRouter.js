'use strict'

module.exports = (function() {

  let mongoose = require('mongoose');
  let router = require('express').Router();
  let Blog = require('../models/blog');
  let bcrypt = require('bcrypt');

  router.get('/', function(req, res) {
    Blog.find({}, { 'email': false, 'pass': false }, function(err, blogs) {
      if (err) throw err;
      res.json(blogs);
    });
  });

  router.get('/:id', function(req, res) {
    Blog.findOne({ blogid: req.params.id }, { 'email': false, 'pass': false }, function(err, blog) {
      if (err) throw err;
      if (blog === null) {
        res.statusCode = 404;
        res.send('Error 404: Blog with specified ID not found');
      } else res.json(blog);
    });
  });

  router.post('/', function(req, res) {

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
                  res.json(true);
                });
              });

            }
          });
        }
      });
    }
  });

  router.put('/:id', function(req, res) {
    Blog.findOne({ blogid: req.params.id }, function(err, blog) {
      if (err) throw err;
      if (blog == null) {
        res.statusCode = 404;
        res.send('Error 404: Blog with specified ID not found');
      } else {

        // update the object
        if (req.body.hasOwnProperty('title')) blog.title = req.body.title;
        if (req.body.hasOwnProperty('about')) blog.about = req.body.about;

        // save the object
        blog.save(function(err) {
          if (err) throw err;
          res.json(true);
        });
      }
    });
  });

  router.delete('/:id', function(req, res) {
    Blog.findOne({ blogid: req.params.id }, function(err, blog) {
      if (err) throw err;
      if (blog == null) {
        res.statusCode = 404;
        res.send('Error 404: Blog with specified ID not found');
      } else {
        blog.remove(function(err) {
          if (err) throw err;
          res.json(true);
        });
      }
    });
  });

  return router;

})();
