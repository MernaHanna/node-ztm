const express = require('express');

//separate built in imports from imports in application (code optimization)
const friendsController = require('../controllers/friends.controller');

// add router to application
const friendsRouter = express.Router();

// this is a dedicated middleware to this route
friendsRouter.use((req, res, next) => {
  // req.ip => ip address of the machine making the request
  console.log('ip address:', req.ip);
  next();
});

// route handlers
// adding routes
// strings are automatically html => the header is set text/html
friendsRouter.post('/', friendsController.postFriend);
friendsRouter.get('/', friendsController.getFriends);
friendsRouter.get('/:friendId', friendsController.getFriend);

module.exports = friendsRouter;
