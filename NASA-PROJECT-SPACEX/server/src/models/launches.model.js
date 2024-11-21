const launchesDatabase = require('./launches.mongo');
//we are in a data access layer and thus we need to access lower level layers and hence mongo files and not model files
const planets = require('./planets.mongo');
const axios = require('axios');

const DEFAULT_FLIGHT_NUMBER = 100;

// a state to keep track of the latest flight number
// let latestFlightNumber = 100;

// const launch = {
//   flightNumber: 100, //flight_number
//   mission: 'Kepler Exploration X', //name
//   rocket: 'Explore IS1', //rocket.name
//   launchDate: new Date('December 27, 2030'), //date_local
//   target: 'Kepler-442 b', //not applicable
//   customers: ['ZTM', 'NASA'], //payload.customers for each payload
//   upcoming: true, //upcoming
//   success: true, //success
// };

// // launches.set(launch.flightNumber, launch);
// saveLaunch(launch);

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function populateLaunches() {
  console.log('Downloading launch data...');
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      // page: 2,
      // limit: 20,
      pagination: false,
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1,
          },
        },
        {
          path: 'payloads',
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  // handle if the response was not successful
  if (response.status !== 200) {
    console.error('Problem downloading launch data');
    throw new Error('Launch data download failed');
    // return;
  }

  // the response of the api is an array called "docs" which is an array of launches
  const launchDocs = response.data.docs;

  // we want to combine an array of array of customers into a single array
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc['payloads'];
    // const customers = payloads.flatMap((payload) => payload['customers']);
    // or
    const customers = payloads.flatMap((payload) => {
      return payload['customers'];
    });
    const launch = {
      flightNumber: launchDoc['flight_number'],
      mission: launchDoc['name'],
      rocket: launchDoc['rocket']['name'],
      launchDate: launchDoc['date_local'],
      upcoming: launchDoc['upcoming'],
      success: launchDoc['success'],
      customers, // the same as customers: customers
    };

    console.log(`${launch.flightNumber} ${launch.mission}`);

    // populate launches collection...
    await saveLaunch(launch);
  }
}
async function loadLaunchData(launch) {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat',
  });
  if (firstLaunch) {
    console.log('Launch data already loaded!');
  } else {
    await populateLaunches();
  }
}

async function findLaunch(filter) {
  return await launchesDatabase.findOne(filter);
}

// launches.get(100) === launch
// launches.get returns the corresponding launch object to the flightNumber 100

async function existsLaunchWithId(launchId) {
  // we may use launchesDatabase.findById but then will find by mongoId not flightnumber
  // return await launchesDatabase.findOne({ flightNumber: launchId });
  return await findLaunch({ flightNumber: launchId });
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
async function getAllLaunches(skip, limit) {
  // sort by flightNumber ascending
  // sort({ flightNumber: 1 })
  // sort by flightNumber descending
  // sort({ flightNumber: -1 })

  return await launchesDatabase
    .find(
      {},
      {
        _id: 0,
        __v: 0,
      }
    )
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
}

async function saveLaunch(launch) {
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
  loadLaunchData,
};
