const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

// in package.json we may change the start script to => "start": "PORT=5000 node src/server.js"
// or in windows use "start": "set PORT=5000&& node src/server.js"
// or use cross-env npm package which works on all platforms
// this is a way to set env variables
const PORT = process.env.PORT || 8000;

// mongoose credentials
// nasa-api
// Mdm1gtB9eC3U0Ixe

// mongodb+srv://nasa-api:<password>@nasacluster.5gznv.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster
const MONGO_URL =
  'mongodb+srv://nasa-api:Mdm1gtB9eC3U0Ixe@nasacluster.5gznv.mongodb.net/?retryWrites=true&w=majority&appName=nasa';

// another common way to start our express server
// helps to make the code more organized by removing all express code and logic to app.js
// this allows us to respond to http requests and other typres of communications eg web sockets
const server = http.createServer(app);

// we can but these event handlers any line in the code (before or after any function) as long as we have required mongoose module
// mongoose connection is an event emiiter that emits an event when the connection is ready and succeeded or when there are errors
// open event will only be triggered once the first time the connection is ready
// therefore we can use once instead of on which will trigger the callback once the first time it is executed
mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  // lets the console know that this is not a normal log but instead an error
  console.error(err);
});

// because await can only be called in async function
async function startServer() {
  // start mongoose before listening on the server

  // older versions of mongoose
  // optional parameters may be set when connecting to a url, however these 4 options should be set or lse we will receive depricated error
  // useNewUrlParser => determines how mongoose parses the connection string (MONGO_URL)
  // useFindAndModify => disables the outdated way of updated mongo data using findAndModify function
  // useCreateIndex => will use createIndex function rather than the old insertIndex function
  // useUnifiedTopology => this way mongoose will use the updated way of talking to clusters of mongo databases uses unifiedTopology approach
  // all of these are options in mongodb driver that mongoose uses to connect to the database (mongodb driver is the official api that node uses to connect to mongo databases - by the company that created mongodb)
  // await mongoose.connect(MONGO_URL, {
  //   useNewUrlParser: true,
  //   useFindAndModify: false,
  //   useCreateIndex: true,
  //   useUnifiedTopology: true,
  // });

  // newer versions of mongoose
  await mongoose.connect(MONGO_URL);

  // to populate data on startup
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

// nothing happens after start therefore we don't need to use await
startServer();
