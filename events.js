const EventEmitter = require('events');

const celebrity = new EventEmitter();

//subscribe to celebrity for observer 1
celebrity.on('race', (result) => {
    if (result === 'win') {
        console.log('Congratulations! You are the best!');
    }
});

//subscribe to celebrity for observer 2
celebrity.on('race', (result) => {
    if (result === 'win') {
        console.log('Boo I could have done better than that!');
    }
});

// process can be used as an event emitter as well
process.on('exit', (code) => {
    console.log('Process exit event with code: ', code);
});

celebrity.emit('race', 'win');
celebrity.emit('race', 'lost');
celebrity.emit('race win');