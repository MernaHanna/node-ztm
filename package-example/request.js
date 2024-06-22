const axios = require('axios');

axios.get('https://www.wikipedia.org')
.then((response) => {
    console.log(response);
})
.catch((err) => {
    console.log(err);
})
.then(()=>{
    // will execute whether there was an error or not
    console.log('All done!');
});
