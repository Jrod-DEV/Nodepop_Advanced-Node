'use strict';
const cote = require('cote');
const jimp = require('jimp');
const path = require('path');

/**
 * Image resizing service
 **/

// Declaring the microservice
const responder = new cote.Responder({ name: 'Thumbnail responder' });

// Logic of microservice
responder.on('convert', async (req, done) => {
  console.log(`Creating thumbnail...${req.name}`, req.name, Date.now());

  // We obtain the result
  const fileName = path.join(__dirname, '../public/images/' + req.name)
  console.log(fileName);
  const image = await jimp.read(fileName);
  console.log(image);
  const result = await image.resize(100, 100).write(path.join(__dirname, '../public/images/thumbnails/' + req.name));
  done(result);
});