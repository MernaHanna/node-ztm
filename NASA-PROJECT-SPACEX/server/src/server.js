const http = require('http');
// const mongoose = require('mongoose');
// the only function that we need from the dotenv library
// this function populates the process.env with the variables in the .env file
// must be imported before the rest to make sure that all the variables are populated before running those files
require('dotenv').config();

const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model');

// in package.json we may change the start script to => "start": "PORT=5000 node src/server.js"
// or in windows use "start": "set PORT=5000&& node src/server.js"
// or use cross-env npm package which works on all platforms
// this is a way to set env variables
const PORT = process.env.PORT || 8000;

// another common way to start our express server
// helps to make the code more organized by removing all express code and logic to app.js
// this allows us to respond to http requests and other typres of communications eg web sockets
const server = http.createServer(app);

// because await can only be called in async function
async function startServer() {
  // start mongoose before listening on the server
  await mongoConnect();

  // to populate data on startup
  await loadPlanetsData();

  // to populate spacex data
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

// nothing happens after start therefore we don't need to use await
startServer();
