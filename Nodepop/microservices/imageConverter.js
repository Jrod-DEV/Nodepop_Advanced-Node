'use strict';
const cote = require('cote');
const jimp = require('jimp');

/**
 * Image resizing service
 **/

// Declaring the microservice
const responder = new cote.Responder({ name: 'Thumbnail responder' });

// Logic of microservice
responder.on('convert', async (req, done) => {
  console.log(`Creating thumbnail...${req.name}`, req.name, Date.now());

  // We obtain the result
  const fileName = '../../public/images' + req.name;
  console.log(fileName);
  const image = await jimp.read(fileName);
  console.log(image);
  const result = await image.resize(100, 100).write(fileName);
  done(result);
});


/* import jimp from 'jimp';

async function main() {
	// Read the image.
	const image = await jimp.read('test/image.png');

	// Resize the image to width 150 and auto height.
	await image.resize(150, jimp.AUTO);

	// Save and overwrite the image
	await image.writeAsync('test/image.png');
} */