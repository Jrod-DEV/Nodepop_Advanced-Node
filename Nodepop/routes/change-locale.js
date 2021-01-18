'use strict';

const express = require('express');
const router = express.Router();

/* GET /change-locale/:locale */
router.get('/:locale', function (req, res, next) {
  // We recover the locale that they pass to us.
  const locale = req.params.locale;

  // We save the page where the user came from.
  const backTo = req.get('referer');

  // We set the cookie in the response with the new locale.
  res.cookie('nodepop-locale', locale, { maxAge: 1000 * 60 * 60 * 24 * 20 });

  // We redirect the user to where he came.
  res.redirect(backTo);
});

module.exports = router;
