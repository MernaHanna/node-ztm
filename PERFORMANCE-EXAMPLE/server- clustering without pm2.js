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
  // pid get the id of the current process running
  res.send(`Performance example ${process.pid}`);
});

app.get('/timer', (req, res) => {
  //delay the response
  delay(9000); // the server can't process any other code while delay is processing
  res.send(`Beep beep beep! ${process.pid}`);
});

console.log('Running server.js...');
console.log('Worker has been started...');
app.listen(3000);
