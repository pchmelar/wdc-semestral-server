'use strict'

module.exports = (function() {

  let mongoose = require('mongoose');
  let router = require('express').Router();
  let Post = require('../models/post');

  router.get('/', function(req, res) {
    Post.find({}, function(err, posts) {
      if (err) throw err;
      res.json(posts);
    });
  });

  return router;

})();