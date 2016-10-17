'use strict'

module.exports = (function() {

  let router = require('express').Router();
  let blog = require('../controllers/blogController');
  let post = require('../controllers/postController');
  let jwt = require('jsonwebtoken');

  router.get('/', blog.list);
  router.post('/', blog.create);
  router.get('/:blogid', blog.view);
  router.get('/:blogid/post/', post.list);
  router.get('/:blogid/post/:postid', post.view);

  // route middleware to verify a token (user authentication)
  router.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, (process.env.PROD_JWTKEY || 'secretKey'), function(err, decoded) {
        if (err) {
          res.statusCode = 401;
          res.send('Error 401: Failed to authenticate token')
        } else {
          // save to request for use in other routes
          req.token = decoded;
          next();
        }
      });
    } else {
      res.statusCode = 401;
      res.send('Error 401: No token provided')
    }
  });

  router.put('/:blogid', blog.update);
  router.delete('/:blogid', blog.delete);
  router.post('/:blogid/post/', post.create);
  router.put('/:blogid/post/:postid', post.update);
  router.delete('/:blogid/post/:postid', post.delete);

  return router;

})();
