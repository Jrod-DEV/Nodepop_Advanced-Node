'use strict';

const express = require('express');
const multer = require('multer');
const router = express.Router();
const Advert = require('../../models/Advert');

// const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    const myFilename = `${file.originalname}`;
    cb(null, myFilename);
  },
});
const upload = multer({ storage: storage });

/* Get /api/adverts */
router.get('/', async function (req, res, next) {
  try {
    console.log('The logged in user has the _id:', req.apiAuthUserID)

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
    res.json(adverts);
  } catch (err) {
    next(err);
  }
});

/* GET /api/adverts/<_id> */
router.get('/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id;

    const advert = await Advert.findOne({ _id: _id });

    res.json({ result: advert });
  } catch (err) {
    next(err);
  }
});

// POST /api/adverts
router.post('/', async (req, res, next) => {
  try {
    const advertData = req.body;

    // We create document un memory
    const advert = new Advert(advertData);

    // We save the document in the database
    const advertSaved = await advert.save();

    res.json({ result: advertSaved });
  } catch (err) {
    next(err);
  }
});

/* PUT /api/addverts/:_id */
router.put('/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id;
    const advertData = req.body;

    const advertSaved = await Advert.findOneAndUpdate(
      { _id: _id },
      advertData,
      { new: true, useFindAndModify: false }
    );
    res.json({ result: advertSaved });
  } catch (err) {
    next(err);
  }
});

/* DELETE /api/adverts/:_id */
router.delete('/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id;

    await Advert.deleteOne({ _id: _id });

    res.send('Advert deleted succesfully!');
  } catch (err) {
    next(err);
  }
});

// Upload images : http:localhost:3000/api/adverts/upload
router.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send('File uploaded successfully!');
});

module.exports = router;
