//index.js allows node to treat a folder as a module
// preferrably not to use as it complicates the module loading system and added special cases

// module.exports = {
//     request: require('./request'), // will return the export object of the module
//     response: require('./response')
// }


// const request = require('./request');
// const response = require('./response');

// module.exports = {
//     send: request.send,
//     REQUEST_TIMEOUT: request.REQUEST_TIMEOUT,
//     read: response.read
// }

module.exports = {
    ...require('./request'),
    ...require('./response')
}