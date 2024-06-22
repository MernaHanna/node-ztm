// const REQUEST_TIMEOUT = 500;

// function encrypt(data) {
//     return 'encrypted data';    
// }

// function send (url, data) {
//     const encryptedData = encrypt(data);
//     console.log(`sending ${encryptedData}`);
// }

// // functions and variables in a module are private to that module
// // we can't access them from other modules unless we export them first
// // module is a global built-in that contains the data related to the current module

// // console.log(module);

// // module.exports = {
// //     send: send, //export the function send with the name send => name to export as: name of function
// // }
// // as both names are the same we may use only one send
// // we may export variables as well
// module.exports = {
//     REQUEST_TIMEOUT,
//     send,
// }

// another method for export

module.exports.REQUEST_TIMEOUT = 500;
// or we may use
exports.REQUEST_TIMEOUT = 500;

function encrypt(data) {
    return 'encrypted data';    
}

exports.send = function(url, data) {
    const encryptedData = encrypt(data);
    console.log(`sending ${encryptedData}`);
}