// const launches = require('./launches.mongo');

const launches = new Map();

// a state to keep track of the latest flight number
let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explore IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

// launches.get(100) === launch
// launches.get returns the corresponding launch object to the flightNumber 100

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

// keep the map as an internal implementation and instead return the data in the formate needed - converted into array
function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  // using launch.flightNumber as key is not api friendly.. we should auto increment the value here
  // use Object.assign to assign out latestFlightNumber value to the launch object and replace any other flightNumber value that may be present on the launch object
  // customers - upcoming - success are not sent by the client
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ['ZTM', 'NASA'],
      upcoming: true,
      success: true,
    })
  );
}

function abortLaunchById(launchId) {
  // hard delete
  // launch.delete(launchId);

  // soft delete (mark as aborted)
  // althoush object is const we can change its properties
  // it is always better to check if a map actually has the value before getting it and that is why separating the two functions is better
  // also separating them gives us a new function to check if a launch exist first to be used anywhere else in the code and routing
  // this is not an expensive process too
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

// it is a good practice to define the export in the same order of the functions definition
module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};
