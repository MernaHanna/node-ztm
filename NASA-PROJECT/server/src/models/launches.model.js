const launches = new Map();

// a state to keep track of the latest flight number
let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explore IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
}    

launches.set(launch.flightNumber, launch);

// launches.get(100) === launch
// launches.get returns the corresponding launch object to the flightNumber 100

// keep the map as an internal implementation and instead return the data in the formate needed - converted into array
function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    // using launch.flightNumber as key is not api friendly.. we should auto increment the value here
    // use Object.assign to assign out latestFlightNumber value to the launch object and replace any other flightNumber value that may be present on the launch object
    // customer - upcoming - success are not sent by the client
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            flightNumber: latestFlightNumber,
            customer: ['ZTM', 'NASA'],
            upcoming: true,
            success: true,
        })
    );
}

module.exports = {
    getAllLaunches,
    addNewLaunch
};