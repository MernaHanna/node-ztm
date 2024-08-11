const express = require('express');

const app = express();

// naive function
function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // event loop is blocked...
  }
}

app.get('/', (req, res) => {
  res.send('Performance example');
});

app.get('/timer', (req, res) => {
  //delay the response
  delay(9000); // the server can't process any other code while delay is processing
  res.send('Ding ding ding!');
});

app.listen(3000);
