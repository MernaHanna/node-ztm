const mongoose = require('mongoose');

// mongoose credentials
// nasa-api
// Mdm1gtB9eC3U0Ixe

// mongodb+srv://nasa-api:<password>@nasacluster.5gznv.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster
const MONGO_URL =
  'mongodb+srv://nasa-api:Mdm1gtB9eC3U0Ixe@nasacluster.5gznv.mongodb.net/?retryWrites=true&w=majority&appName=nasa';

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

async function mongoConnect(params) {
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
  mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
