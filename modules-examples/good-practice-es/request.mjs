const REQUEST_TIMEOUT = 500;

function encrypt(data) {
    return 'encrypted data';    
}

function send (url, data) {
    const encryptedData = encrypt(data);
    console.log(`sending ${encryptedData}`);
}

// this gives a clear interface
// exports is an ES6 feature same as import
export {
    REQUEST_TIMEOUT,
    send,
}

// this will be printed once even if we import the module twice due to module caching
console.log('Hello from request.js');
