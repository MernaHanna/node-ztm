// Workers can be used to create new threads from the main thread
// var worker = new Worker('worker.js')
// worker.postMessage('Helloooooo')
// addEventListener('message');

// child_process comes with node
// used to create more processes to utilise all the cores of the server (all CPUs)
const { spawn } = require('child_process')

spawn('git', ['stuff'])
