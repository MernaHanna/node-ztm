const http = require('http');
const app = require('./app');

// another common way to start our express server
// helps to make the code more organized by removing all express code and logic to app.js
// this allows us to respond to http requests and other typres of communications eg web sockets
const server = http.createServer(app);

// in package.json we may change the start script to => "start": "PORT=5000 node src/server.js"
// or in windows use "start": "set PORT=5000&& node src/server.js"
// or use cross-env npm package which works on all platforms
// this is a way to set env variables
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
});