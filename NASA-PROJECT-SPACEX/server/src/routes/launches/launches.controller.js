const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require('../../models/launches.model');

const { getPagination } = require('../../services/query');

// to handle the naming conflict between function getAllLaunches in controller and model we have two options
// option one is to require the model itself with destructuring and access the function using launchesModel.getAllLaunches
// option two to rename the controller functions handling requests and responses by adding http to their names
async function httpGetAllLaunches(req, res) {
  // to get query params
  // console.log(req.query);
  const { skip, limit } = getPagination(req.query);

  // maps are not json objects
  // launches.values will return iterator object but this is not json as well
  // we use array.from to convert an iterator object to a javascript object or array
  // return res.status(200).json(Array.from(launches.values()));
  // the controller should handle the request only and not convert data from the model. this should be abstracted
  // the called getAllLaunches function here is called a data access function from the model
  const launches = await getAllLaunches(skip, limit);
  return res.status(200).json(launches);
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    // we use 400 for client errors when none of the other status codes is valid
    return res.status(400).json({
      error: 'Missing required launch property',
    });
  }

  launch.launchDate = new Date(launch.launchDate); // to convert launchDate string to js date object => date is sent as string to the api
  // the date function returns 'Invalid Date' if the passed string was not actually a valid date
  // if (launch.launchDate.toString() === 'Invalid Date') {
  // we may use isNan => not a number - date is first assigned to a number (unix timestamp)
  // when passing isNan(date) => js will automatically call isNan(date.valueOf()) to convert the date to number and then isNan will return true or false whether the value is a number or not
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date',
    });
  }
  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  // params are strings => need to be converted to number
  const launchId = Number(req.params.id);

  // if launch doesn't exist
  const existsLaunch = await existsLaunchWithId(launchId);
  if (!existsLaunch) {
    return res.status(404).json({
      error: 'Launch not found',
    });
  }

  // if launch does exist
  const aborted = abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: 'Launch not aborted',
    });
  }
  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
