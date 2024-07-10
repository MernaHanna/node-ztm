// when naming the file server.js this is a special case for npm start to work without adding any script to package.json
const express = require('express');
const messagesRouter = require('./routes/messages.router');
const friendsRouter = require('./routes/friends.router');
const app = express();

const PORT = 3000;

// use() => registers middleware to express
// has next argument => the function that controls the flow of our middlewares
app.use((req, res, next) => {
  const start = Date.now();
  // console.log(`${req.method} ${req.url}`);
  next(); // without call to next the request will time out (express hangs) and response is never set in our handlers
  // actions after response goes here after the next
  const delta = Date.now() - start; //measuring only the amount of time the processing in node took for that req without measuring the time the http protocol was passing the data over
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
  // baseUrl => '/friends/' url => ''=> may hold anything else after the baseUrl
});

// express.json automatically detects if the request has a content type json header and thus parse the body of the request
// without this step we cannot access the body of the request
app.use(express.json());

// to use the middleware (router)
// mounting the friends router on the app object
app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
