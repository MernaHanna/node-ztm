const express = require('express');
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
// :id is express syntax to pass a parameter called id
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter;
