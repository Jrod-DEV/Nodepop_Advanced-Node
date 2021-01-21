'use strict';

const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class authController {
  /**
   * POST /api/authentication
   */
  async postJWT(req, res, next) {
    try {
      // Collect values from the database
      const email = req.body.email;
      const password = req.body.password;
      console.log(email, password);

      // Search user in the database
      const user = await User.findOne({ email: email });

      // If the user does not exist or the password does not match, we show an error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        // Responding to an authentication error in JSON
        const error = new Error('Invalid credentials');
        error.status = 401;
        return next(error);
      }
      // If the user exists and the password is correct, we create a JWT
      jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '2d' },
        (err, tokenJWT) => {
          if (err) {
            return next(err);
          }
          // Answer
          res.json({ tokenJWT: tokenJWT });
        }
      );
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new authController();
