'use strict'

module.exports = (function() {

  let mongoose = require('mongoose');
  let router = require('express').Router();
  let Post = require('../models/post');

  router.get('/', function(req, res) {
    Post.find({ blogid: req.params.blogid }, function(err, posts) {
      if (err) throw err;
      res.json(posts);
    });
  });

  router.get('/:id', function(req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      Post.findById(req.params.id, function(err, post) {
        if (err) throw err;
        if (post == null) {
          res.statusCode = 404;
          res.send('Error 404: Post with specified ID not found');
        } else res.json(post);
      });
    } else {
      res.statusCode = 400;
      res.send('Error 400: Invalid ID');
    }
  });

  router.post('/', function(req, res) {

    if (!req.body.hasOwnProperty('title') ||
      !req.body.hasOwnProperty('content') ||
      !req.body.hasOwnProperty('location')) {
      res.statusCode = 400;
      res.send('Error 400: POST syntax incorrect.');
    } else {

      // create a new object
      var newPost = Post({
        title: req.body.title,
        content: req.body.content,
        location: req.body.location,
        blogid: req.params.blogid
      });

      // save the object
      newPost.save(function(err) {
        if (err) throw err;
        res.statusCode = 201;
        res.json(true);
      });
    }
  });

  router.put('/:id', function(req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      Car.findById(req.params.id, function(err, post) {
        if (err) throw err;
        if (post == null) {
          res.statusCode = 404;
          res.send('Error 404: Post with specified ID not found');
        } else {

          // update the object
          if (req.body.hasOwnProperty('title')) post.title = req.body.title;
          if (req.body.hasOwnProperty('content')) post.content = req.body.content;
          if (req.body.hasOwnProperty('location')) post.location = req.body.location;

          // save the object
          post.save(function(err) {
            if (err) throw err;
            res.json(true);
          });
        }
      });
    } else {
      res.statusCode = 400;
      res.send('Error 400: Invalid ID');
    }
  });

  router.delete('/:id', function(req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      Car.findById(req.params.id, function(err, post) {
        if (err) throw err;
        if (post == null) {
          res.statusCode = 404;
          res.send('Error 404: Post with specified ID not found');
        } else {
          post.remove(function(err) {
            if (err) throw err;
            res.json(true);
          });
        }
      });
    } else {
      res.statusCode = 400;
      res.send('Error 400: Invalid ID');
    }
  });

  return router;

})();
