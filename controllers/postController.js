'use strict'

let mongoose = require('mongoose');
let Blog = require('../models/blog');
let Post = require('../models/post');

exports.list = function(req, res) {
  Blog.findOne({ blogid: req.params.blogid }, function(err, blog) {
    if (err) throw err;
    if (blog === null) {
      res.statusCode = 404;
      res.send('Error 404: Blog with specified ID not found');
    } else {
      Post.find({ blogid: req.params.blogid }, function(err, posts) {
        if (err) throw err;
        res.json(posts);
      });
    }
  });
};

exports.view = function(req, res) {
  Blog.findOne({ blogid: req.params.blogid }, function(err, blog) {
    if (err) throw err;
    if (blog === null) {
      res.statusCode = 404;
      res.send('Error 404: Blog with specified ID not found');
    } else {
      if (mongoose.Types.ObjectId.isValid(req.params.postid)) {
        Post.findById(req.params.postid, function(err, post) {
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
    }
  });
};

exports.create = function(req, res) {
  Blog.findOne({ blogid: req.params.blogid }, function(err, blog) {
    if (err) throw err;
    if (blog === null) {
      res.statusCode = 404;
      res.send('Error 404: Blog with specified ID not found');
    } else {
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
    }
  });
};

exports.update = function(req, res) {
  Blog.findOne({ blogid: req.params.blogid }, function(err, blog) {
    if (err) throw err;
    if (blog === null) {
      res.statusCode = 404;
      res.send('Error 404: Blog with specified ID not found');
    } else {
      if (mongoose.Types.ObjectId.isValid(req.params.postid)) {
        Post.findById(req.params.postid, function(err, post) {
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
    }
  });
};

exports.delete = function(req, res) {
  Blog.findOne({ blogid: req.params.blogid }, function(err, blog) {
    if (err) throw err;
    if (blog === null) {
      res.statusCode = 404;
      res.send('Error 404: Blog with specified ID not found');
    } else {
      if (mongoose.Types.ObjectId.isValid(req.params.postid)) {
        Post.findById(req.params.postid, function(err, post) {
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
    }
  });
};
