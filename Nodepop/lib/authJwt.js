'use strict';

const jwt = require('jsonwebtoken');

function authJwt() {
  // If there is no user, we return an error through a middleware.
  return function (req, res, next) {
    const token =
      req.body.token || req.query.token || req.get('x-access-token');

    if (!token) {
      const err = new Error('No token provided');
      err.status = 401;
      return next(err);
    }
    // If the token exists
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(err);
      }
      // We save the user id in request so that the following middlewares can use it
      req.userId = decoded._id;
      next();
    });
  };
}

module.exports = authJwt;
