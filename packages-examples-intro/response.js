function decrypt(data) {
    return 'decrypted data';
}

// we only have one exported function and thus module.exports might directly point to that function
module.exports = function read() {
    return decrypt('data');
}

// module.exports = {
//     read,
// }