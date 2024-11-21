// const planets = [];

// module.exports = planets;

const fs = require('fs');
const path = require('path');

const { parse } = require('csv-parse');
const planets = require('./planets.mongo');

// const habitablePlanets = [];

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
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          // create operation is asynchronous
          // TODO: Replace below create with upsert
          // upsert => insert + update
          // await planets.create({
          //   keplerName: data.kepler_name,
          // });
          savePlanet(data);
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', async () => {
        // console.log(
        //   habitablePlanets.map((planet) => {
        //     return planet['kepler_name'];
        //   })
        // );
        // console.log(`${habitablePlanets.length} habitable planets found!`);
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found!`);
        resolve();
        // we don't return data in the resolve here because we are exporting and using the habitable planets directly
        // this is just to tell us that the promise finished executing and the data is ready
      });
  });
}

async function getAllPlanets() {
  // the first argument is a filter if not set then mongo will return all the data without any filters
  // eg => {keplerName: 'Kepler-62 f'}
  // the second argument is the projection => the list of fields included in the result
  // projection can be: {'keplerName': 0} => not included
  // or: {'keplerName': 1} => included
  // or: 'keplerName anotherField' => to include multiple fields as a string
  // or: '-keplerName anotherField' => add - before the field name to exclude it
  // return await planets.find(
  //   {
  //     keplerName: 'Kepler-62 f',
  //   },
  //   {
  //     keplerName: 0,
  //   }
  // );
  return await planets.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save planet ${err}`);
  }
}

// module.exports = {
//   loadPlanetsData,
//   planets: habitablePlanets,
// };

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
