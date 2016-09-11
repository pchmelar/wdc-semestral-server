module.exports = (function() {

  var mongoose = require('mongoose');
  var router = require('express').Router();
  var Post = require('../models/post');

  router.get('/', function(req, res) {
    Post.find({}, function(err, posts) {
      if (err) throw err;
      res.json(posts);
    });
  });

  return router;

})();