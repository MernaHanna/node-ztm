// const { launches } = require('../../models/launches.model');
const { getAllLaunches } = require('../../models/launches.model');

// to handle the naming conflict between function getAllLaunches in controller and model we have two options
// option one is to require the model itself with destructuring and access the function using launchesModel.getAllLaunches
// option two to rename the controller functions handling requests and responses by adding http to their names
function httpGetAllLaunches(req, res) {
    // maps are not json objects
    // launches.values will return iterator object but this is not json as well
    // we use array.from to convert an iterator object to a javascript object or array
    // return res.status(200).json(Array.from(launches.values()));
    // the controller should handle the request only and not convert data from the model. this should be abstracted
    // the called getAllLaunches function here is called a data access function from the model
    return res.status(200).json(getAllLaunches());
}

module.exports = {
    httpGetAllLaunches
}