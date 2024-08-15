const { isMainThread, workerData, Worker } = require('worker_threads');

// this code will create workers until our machine can no longer create workers without checking if it is the main thread (loop)
if (isMainThread) {
  console.log(`Main Thread! Process ID: ${process.pid}`);
  // worker takes a parameter that points to some file that contains js code to be excuted by that worker
  // __filename points to the path of the current file (threads.js)
  // the second parameter of the worker constructor accepts data
  //  after defining workerData we can import and use it in the worker
  new Worker(__filename, {
    workerData: [7, 6, 2, 3],
  });
  new Worker(__filename, {
    workerData: [1, 3, 4, 3],
  });
} else {
  console.log(`Worker! Process ID: ${process.pid}`);
  // sort is a blocking js function
  // [7, 6, 2, 3].sort()
  // the two arrays will be sorted in parallel
  console.log(`${workerData} sorted is ${workerData.sort()}`);
}
