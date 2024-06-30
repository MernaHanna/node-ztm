// when naming the file server.js this is a special case for npm start to work without adding any script to package.json
const express = require('express');

const app = express();

const PORT = 3000;

const friends = [{
        id: 0,
        name: 'Albert Einstein'
    },{
        id: 1,
        name: 'Sir Isaac Newton'
    }
];

// adding routes
// strings are automatically html => the header is set text/html
app.get('/friends', (req, res) => {
    // res.send('Heeeellooooo');
    // res.send(friends);
    res.json(friends); // same as res.send but in this case data will for sure be treated as json
});

app.get('/friends/:friendId', (req, res) => {
    const friendId = Number(req.params.friendId);
    const friend = friends[friendId];
    if(friend) {
        // res.json(friend);
        // express defaults to 200
        res.status(200).json(friend);
    } else {
        // res.sendStatus(404);
        // better practice
        res.status(404).json({
            error: "Friend does not exist"
        })
    }
})

app.get('/messages', (req, res) => {
    res.send('<ul><li>Helloo Albert!</li></ul>');
});

app.post('/messages', (req, res) => {
    res.send('Updating messages...');
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});