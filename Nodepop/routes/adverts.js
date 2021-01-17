const express = require('express');
const router = express.Router();

const Advert = require('../models/Advert');

/* GET adverts page. */
router.get('/', async function (req, res, next) {
  try {
    const arrayAdvertsDB = await Advert.find();
    console.log(arrayAdvertsDB);

    const name = req.query.name;
    const onsale = req.query.onsale;
    const price = req.query.price;
    const tag = req.query.tag;

    const limit = parseInt(req.query.limit || 10);
    const skip = parseInt(req.query.skip);
    const sort = req.query.sort || '_id';

    // Search filters
    const filter = {};

    if (typeof name !== 'undefined') {
      filter.name = new RegExp('^' + name, 'i');
    }

    if (typeof price !== 'undefined' && price !== '-') {
      if (price.indexOf('-') !== -1) {
        filter.price = {};
        let range = price.split('-');
        if (range[0] !== '') {
          filter.price.$gte = range[0];
        }
        if (range[1] !== '') {
          filter.price.$lte = range[1];
        }
      } else {
        filter.price = price;
      }
    }

    if (typeof tag !== 'undefined') {
      filter.tags = tag;
    }

    if (typeof onsale !== 'undefined') {
      filter.onsale = onsale;
    }

    const adverts = await Advert.list(filter, limit, skip, sort);

    res.render('adverts', {
      /* arrayAdvertsDB: arrayAdvertsDB */
      adverts: adverts,
      title: 'Nodepop',
    });
  } catch (err) {
    {
      return res.next(err);
    }
  }
});

module.exports = router;
