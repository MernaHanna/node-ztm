// const planets = [];

// module.exports = planets;

const fs = require('fs');
const path = require('path');

const { parse } = require('csv-parse');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

/* 
  const promise = new Promise( (resolve, reject) => {
    resolve(42);
  });
  promise.then((result) => {
  });
  // alternatively
  const result = await promise;
  console.log(result);
*/

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')
    )
      .pipe(
        parse({
          comment: '#', // treat lines that start with this character as comment
          columns: true, // return each object in csv file as a js object with (key: value) pairs rather than just as an array of values
        })
      )
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', () => {
        // console.log(
        //   habitablePlanets.map((planet) => {
        //     return planet['kepler_name'];
        //   })
        // );
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve();
        // we don't return data in the resolve here because we are exporting and using the habitable planets directly
        // this is just to tell us that the promise finished executing and the data is ready
      });
  });
}

function getAllPlanets() {
  return habitablePlanets;
}

// module.exports = {
//   loadPlanetsData,
//   planets: habitablePlanets,
// };

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
