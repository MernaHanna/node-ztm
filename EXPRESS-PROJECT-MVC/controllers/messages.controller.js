// built in module
// work with paths handling all different ways different operationg systems handle paths
// linux and macos /folder/files.jpg
// windows \folders\files.jpg
// use join from path to solve this issue
const path = require('path');

// use named function instead of an arrow function (even if named arrow function)
// use this when defining functions in top level.. this function is not just an argument passed in another function
// when debugging application and an error occurs node will log the named function in its logs.. that is not the case in arrow functions even if assigned to a variable
function getMessages(req, res) {
    res.render('messages', {
        title: 'Messages to my Friends!',
        friend: 'Elon Musk'
    })
    // res.send('<ul><li>Helloo Albert!</li></ul>');
    // res.sendFile(path.join(__dirname, '..', 'public', 'images', 'skimountain.jpg'));
    // built in function that send a gile in the response
    // needs absolute path of the file (from the roots of the system)
    // __dirname is a built in variable in node global builtins to get the name of the folder where the current file lives in this case controllers folder
    // therefore we need to go up one level and thus use ..
    // express will automatically set the content type based on the extension of our file
}

function postMessage(req, res) {
    res.send('Updating messages...');
}

module.exports = {
    getMessages,
    postMessage
}