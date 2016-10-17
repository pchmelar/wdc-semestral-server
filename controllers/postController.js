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
        Post.findOne({ _id: req.params.postid, blogid: req.params.blogid }, function(err, post) {
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

        // user authorization
        if (req.token.user === blog.email) {

          // create a new object
          var newPost = Post({
            title: req.body.title,
            content: req.body.content,
            location: {
              description: req.body.location.description,
              lat: req.body.location.lat,
              lng: req.body.location.lng
            },
            blogid: req.params.blogid
          });

          // save the object
          newPost.save(function(err) {
            if (err) throw err;
            res.statusCode = 201;
            res.json(true);
          });

        } else {
          res.statusCode = 401;
          res.send('Error 401: Unauthorized')
        }
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
        Post.findOne({ _id: req.params.postid, blogid: req.params.blogid }, function(err, post) {
          if (err) throw err;
          if (post == null) {
            res.statusCode = 404;
            res.send('Error 404: Post with specified ID not found');
          } else {

            // user authorization
            if (req.token.user === blog.email) {

              // update the object
              if (req.body.hasOwnProperty('title')) post.title = req.body.title;
              if (req.body.hasOwnProperty('content')) post.content = req.body.content;
              if (req.body.hasOwnProperty('location')) {
                post.location.description = req.body.location.description;
                post.location.lat = req.body.location.lat;
                post.location.lng = req.body.location.lng;
              }

              // save the object
              post.save(function(err) {
                if (err) throw err;
                res.json(true);
              });

            } else {
              res.statusCode = 401;
              res.send('Error 401: Unauthorized')
            }
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
        Post.findOne({ _id: req.params.postid, blogid: req.params.blogid }, function(err, post) {
          if (err) throw err;
          if (post == null) {
            res.statusCode = 404;
            res.send('Error 404: Post with specified ID not found');
          } else {

            // user authorization
            if (req.token.user === blog.email) {

              // remove the object
              post.remove(function(err) {
                if (err) throw err;
                res.json(true);
              });

            } else {
              res.statusCode = 401;
              res.send('Error 401: Unauthorized')
            }
          }
        });
      } else {
        res.statusCode = 400;
        res.send('Error 400: Invalid ID');
      }
    }
  });
};
