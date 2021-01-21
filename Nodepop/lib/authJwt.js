'use strict';
const jwt = require('jsonwebtoken');
//Function that returns an authentication middleware with JWT

module.exports = function () {
  return (req, res, next) => {
    // Check that we have the Authorization header with a valid JWT

    // Collect token
    const tokenJWT = req.get('Authorization') || req.query.token || req.body.token;

    // If there is no token we do not allow access to the route
    if (!tokenJWT) {
      const error = new Error('No token provided');
      error.status = 401;
      return next(error);
    }

    // We verify the token
    jwt.verify(tokenJWT, process.env.JWT_SECRET, (err, payload) => {
      if (err) return next(err);
      // If any middleware needs the ID of the user
      req.apiAuthUserID = payload._id;
      next();
    })
  };
};
