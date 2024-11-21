const launchesDatabase = require('./launches.mongo');
//we are in a data access layer and thus we need to access lower level layers and hence mongo files and not model files
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

// a state to keep track of the latest flight number
// let latestFlightNumber = 100;

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

// launches.set(launch.flightNumber, launch);
saveLaunch(launch);

// launches.get(100) === launch
// launches.get returns the corresponding launch object to the flightNumber 100

async function existsLaunchWithId(launchId) {
  // we may use launchesDatabase.findById but then will find by mongoId not flightnumber
  return await launchesDatabase.findOne({ flightNumber: launchId });
}

async function getLatestFlightNumber() {
  // flightNumber to sort ascending
  // -flightNumber to sort descending
  const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber');
  console.log(latestLaunch);

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

// keep the map as an internal implementation and instead return the data in the formate needed - converted into array
async function getAllLaunches() {
  return await launchesDatabase.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function saveLaunch(launch) {
  // findone returns a javascript object matching the criteria
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    // here we don't have access to requests nor responses
    // therefore we signal errors by returning invalid objects like null or undefined
    // but preferably throw an error (this is a built in node function)
    // new is to make sure that we are returning a new instance of the Error object
    throw new Error('No matching planet found');
  }

  // use findOneAndUpdate instead of updateOne to prevent setting "$setOnInsert" property on the saved object
  // which will cause a security vulnerability because it reveals to hackers that the database used is mongo
  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

// instead of addNewLaunch
async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['ZTM', 'NASA'],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.modifiedCount === 1;
}

// it is a good practice to define the export in the same order of the functions definition
module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
};
