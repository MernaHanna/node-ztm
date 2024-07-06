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

// use() => registers middleware to express
// has next argument => the function that controls the flow of our middlewares
app.use((req, res, next) => {
    const start = Date.now();
    // console.log(`${req.method} ${req.url}`);
    next(); // without call to next the request will time out (express hangs) and response is never set in our handlers
    // actions after response goes here after the next
    const delta = Date.now() - start;//measuring only the amount of time the processing in node took for that req without measuring the time the http protocol was passing the data over
    console.log(`${req.method} ${req.url} ${delta}ms`);
});

// express.json automatically detects if the request has a content type json header and thus parse the body of the request
// without this step we cannot access the body of the request
app.use(express.json());

// adding routes
// strings are automatically html => the header is set text/html
app.post('/friends', (req, res) => {
    // req.body is always set by the express.json() middleware => if there is something wrong it will set an empty body object
    if(!req.body.name) {
        // bad request is used for validation error
        // return is added to make sure that the code doesn't procceed
        return res.status(400).json({
            error: 'Missing friend name'
        });
    }

    const newFriend = {
        name: req.body.name,
        id: friends.length
    };
    friends.push(newFriend);

    res.json(newFriend);
});

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

// route handler
app.post('/messages', (req, res) => {
    res.send('Updating messages...');
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});