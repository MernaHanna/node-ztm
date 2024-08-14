const express = require('express');
// cluster is a built in node module
const cluster = require('cluster');
const os = require('os');

// for clustering to work in windows
// doesn't need to be included if on mac or linux
cluster.schedulingPolicy = cluster.SCHED_RR;

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
  res.send(`Ding ding ding! ${process.pid}`);
});

// server.js will run with the master process as well as the worker processes.. the only difference is the isMaster condition
console.log('Running server.js...');

// to differentiate between master and worker use the boolean flag isMaster
if (cluster.isMaster) {
  console.log('Master has been started...');
  // to maximize the performance to our server we need to take the amount of LOGICAL CORES of our operating system
  // os.cpus() => give us the logical cores
  const NUM_WORKERS = os.cpus().length;
  console.log(NUM_WORKERS);
  for (let i = 0; i < NUM_WORKERS; i++) {
    // fork creates a worker
    // we can call the fork function however many times we like
    cluster.fork();
    // cluster.fork();
  }
} else {
  console.log('Worker has been started...');
  // it doesn't matter wheather we run our application using node barebones or express.. node cluster module understands the listen function
  // we only want workers to listen to http requests and respond to them
  // all workers will listen on port 3000.. node http server will divide incoming requests between workers
  app.listen(3000);
}
