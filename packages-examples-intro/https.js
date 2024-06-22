const request = require('./request');
// require by default looks into js files and thus request is equivilant to request.js
// require looks for the following extensions in order: .js / .json / .node (binary file-addon may be written in c++ and imported as node module)
// const response = require('./response');
// response exports object only points to one function which is read
const read = require('./response');

function makeRequest(url, data) {
    request.send(url, data);
    // return response.read();
    return read();
}

const responseData = makeRequest('https://google.com', 'hello');
console.log(responseData);