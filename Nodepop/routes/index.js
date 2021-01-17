const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  try {
    res.render('index', { title: 'Nodepop - Home' });
  } catch (err) {
    {
      return res.next(err);
    }
  }
});

module.exports = router;
