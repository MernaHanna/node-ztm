const path = require('path');
const express = require('express');
const cors = require('cors');

const planetsRouter = require('./routes/planets/planets.router');

const app = express();

// app.listen();
// to whitelist multiple origins => see the npm package documentation
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public'))); //to serve our static built files in public folder

app.use(planetsRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); // to route to the frontend without including the port in the url => to view launch page by default
});

module.exports = app;
