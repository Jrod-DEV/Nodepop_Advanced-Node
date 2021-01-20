' use strict';

require('dotenv').config();

const readLine = require('readline');
const conn = require('./lib/connectMongoose');
const Advert = require('./models/Advert');
const User = require('./models/User');

conn.once('open', async () => {
  try {
    const response = await askUser(
      'Are you sure you want to start the database with initial data?(no)'
    );

    if (response.toLowerCase() !== 'yes') {
      console.log('Process aborted!');
      return process.exit(0);
    }
    await initAdverts();
    await initUsers();
    // ..
    conn.close();
  } catch (err) {
    console.log('An error has occurred');
    process.exit(1);
  }
});

/**
 * Init adrverts on DB
*/
async function initAdverts() {
  // Delete existing documents in the collection
  console.log('Emptying adverts collection...');
  await Advert.deleteMany();

  // Upload inital documents
  console.log('Loading adverts...');
  const result = await Advert.insertMany([
    {
      name: 'IphoneX',
      onsale: true,
      price: 850,
      photo: 'iphoneX.jpg',
      tags: ['mobile', 'work'],
    },
    {
      name: 'Snowboard',
      onsale: false,
      price: 200,
      photo: 'snowboard.jpg',
      tags: ['lifestyle'],
    },
    {
      name: 'Super Bike',
      onsale: true,
      price: 5000,
      photo: 'superbike.jpg',
      tags: ['motor', 'lifestyle'],
    },
    {
      name: 'Mustang GT',
      onsale: true,
      price: 32000,
      photo: 'mustang.jpg',
      tags: ['motor', 'lifestyle'],
    },
  ]);
  console.log(`${result.length} adverts has been created succesfully!`);
}

/**  
*Init users on DB
*/
async function initUsers() {
  // Delete existing documents in the collection
  console.log('Emptying users collection...');
  await User.deleteMany();

  // Upload inital documents
  console.log('Loading users...');
  const result = await User.insertMany([
    {
      email: 'user@example.com',
      password: 1234,
    },
    {
      email: 'user@nodepop.com',
      password: 4321,
    },
  ]);
  console.log(`${result.length} users has been created succesfully!`);
}

//
function askUser(textQuestion) {
  return new Promise((resolve, reject) => {
    const rl = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(textQuestion, (asnswer) => {
      rl.close();
      resolve(asnswer);
    });
  });
}
