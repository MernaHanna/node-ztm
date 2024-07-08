// use named function instead of an arrow function (even if named arrow function)
// use this when defining functions in top level.. this function is not just an argument passed in another function
// when debugging application and an error occurs node will log the named function in its logs.. that is not the case in arrow functions even if assigned to a variable
function getMessages(req, res) {
    res.send('<ul><li>Helloo Albert!</li></ul>');
}

function postMessage(req, res) {
    res.send('Updating messages...');
}

module.exports = {
    getMessages,
    postMessage
}