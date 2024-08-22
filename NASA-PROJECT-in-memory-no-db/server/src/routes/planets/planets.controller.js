// const { planets } = require('../../models/planets.model');
const { getAllPlanets } = require('../../models/planets.model');

function httpGetAllPlanets(req, res) {
  // the return is to make sure that the function stops executing
  // return is not used by express
  return res.status(200).json(getAllPlanets());
}

module.exports = {
  httpGetAllPlanets,
};
