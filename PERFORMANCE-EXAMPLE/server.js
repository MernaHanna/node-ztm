const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Performance example');
});

app.get('/timer', (req, res) => {
  //
});
