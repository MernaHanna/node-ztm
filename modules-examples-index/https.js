// const internals = require('./internals');
const {send, read} = require('./internals');
// const request = require('./internals/request');
// const read = require('./internals/response');

function makeRequest(url, data) {
    send(url, data);
    // return response.read();
    return read();
}

const responseData = makeRequest('https://google.com', 'hello');
console.log(responseData);