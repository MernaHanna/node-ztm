function encrypt(data) {
    return 'encrypted data';    
}

function send (url, data) {
    const encryptedData = encrypt(data);
    console.log(`sending ${encryptedData}`);
}

// functions and variables in a module are private to that module
// we can't access them from other modules unless we export them first
// module is a global built-in that contains the data related to the current module

// console.log(module);

// module.exports = {
//     send: send, //export the function send with the name send => name to export as: name of function
// }
// as both names are the same we may use only one send
module.exports = {
    send,
}