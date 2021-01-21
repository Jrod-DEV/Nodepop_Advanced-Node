'use strict';

const User = require('../../models/User');
const bcrypt = require('bcrypt');

class authController {
  /**
   * POST /api/adverts
   */
  async post(req, res, next) {
    try {
      // Collect values from the database
      const email = req.body.email;
      const password = req.body.password;
      console.log(email, password);

      // Search user in the database
      const user = await User.findOne({ email: email });

      // If the user does not exist or the password does not match, we show an error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.locals.error = res.__('Invalid credentials');
      }

      // If the user exists and the password is correct, we redirect it to the requested URL
      res.send('ok')

      res.send('ok');
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new authController();
