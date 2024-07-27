const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');

const app = express();

// app.listen();
// to whitelist multiple origins => see the npm package documentation
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
// morgan should be called as high as possible after security middlewares
// combined is the default
app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public'))); //to serve our static built files in public folder

app.use(planetsRouter);
app.use(launchesRouter);

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); // to route to the frontend without including the port in the url => to view launch page by default
// });

// adding asterisk tells express to match anything after the slash if it was not found as an endpoint above
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); // to route to the frontend without including the port in the url => to view launch page by default
});

module.exports = app;
