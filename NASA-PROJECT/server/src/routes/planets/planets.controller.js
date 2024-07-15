const planets = require('../../models/planets.model');

function getAllPlanets(req, res) {
    // the return is to make sure that the function stops executing
    // return is not used by express
    return res.status(200).json(planets);
}

module.exports = {
    getAllPlanets,
}