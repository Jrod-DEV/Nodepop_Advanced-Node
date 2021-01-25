'use strict';

const cote = require('cote');
const fs = require('fs');

const requester = new cote.Requester({ name: 'currency client' });

fs.watch('public/images', { persistent: true }, function (event, filename) {
  const request = { type: 'convert', name: filename };
  requester.send(request, (err, res) => {
    console.log(res);
  });
});
