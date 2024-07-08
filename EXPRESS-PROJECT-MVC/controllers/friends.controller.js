const model = require('../models/friends.model')

function postFriend(req, res) {
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
        id: model.length
    };
    model.push(newFriend);

    res.json(newFriend);
}

function getFriends(req, res) {
    // res.send('Heeeellooooo');
    // res.send(friends);
    res.json(model); // same as res.send but in this case data will for sure be treated as json
}

function getFriend(req, res) {
    const friendId = Number(req.params.friendId);
    const friend = model[friendId];
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
}

module.exports = {
    postFriend,
    getFriends,
    getFriend
}