'use strict';

const mongoose = require('mongoose');

// Schema
const advertSchema = mongoose.Schema({
  name: { type: String, index: true },
  price: { type: Number, index: true },
  onsale: { type: Boolean, index: true },
  photo: String,
  tags: { type: [String], index: true },
});

// Methods
advertSchema.statics.list = function (filter, limit, skip, sort) {
  const query = Advert.find(filter);
  query.limit(limit);
  query.skip(skip);
  query.sort(sort);
  return query.exec();
};
// Model
const Advert = mongoose.model('Advert', advertSchema, 'adverts');

// Export model
module.exports = Advert;
