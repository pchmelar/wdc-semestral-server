'use strict'

module.exports = (function() {

  let router = require('express').Router();
  let blog = require('../controllers/blogController');
  let post = require('../controllers/postController');

  router.get('/', blog.list);
  router.get('/:blogid', blog.view);
  router.post('/', blog.create);
  router.put('/:blogid', blog.update);
  router.delete('/:blogid', blog.delete);

  router.get('/:blogid/post/', post.list);
  router.get('/:blogid/post/:postid', post.view);
  router.post('/:blogid/post/', post.create);
  router.post('/:blogid/post/:postid', post.update);
  router.delete('/:blogid/post/:postid', post.delete);

  return router;

})();
