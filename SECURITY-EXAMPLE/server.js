const fs = require('fs');
const path = require('path');
// const http = require('http');
const https = require('https');
const express = require('express');

const PORT = 3000;

const app = express();

app.get('/secret', (req, res) => {
  res.send('Your personal secret value is 42!');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}...`);
// });

// same but more flexible
// http and https are both built in node modules
// http.createServer().listen(PORT, () => {
//   console.log(`Listening on port ${PORT}...`);
// });

// cert is path to certificate
// key is a secret string used to encrypt our data
// use opernssl to create a certificate
//https accepts two arguments - the key and certificate + the request listener
https
  .createServer(
    {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
