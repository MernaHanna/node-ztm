const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

fs.createReadStream('kepler_data.csv')
.pipe(parse({
    comment: '#', // treat lines that start with this character as comment
    columns: true, // return each object in csv file as a js object with (key: value) pairs rather than just as an array of values
}))
.on('data', (data) => {
    if(isHabitablePlanet(data)) {
        habitablePlanets.push(data);
    }    
})
.on('error', (err) => {
    console.log(err);
})
.on('end', () => {
    console.log(habitablePlanets.map((planet) => {
        return planet['kepler_name'];
    }));
    console.log(`${habitablePlanets.length} habitable planets found!`);
    console.log('done');
});
// parse();