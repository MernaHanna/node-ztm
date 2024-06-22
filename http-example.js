// const http = require('http');
// const https = require('https');
const {request, get} = require('https');
// ES syntax to destructure the object that we get back from our require call
// curly braces and passing in the name of the object that we are using hence request
// we can then access this using request() function instead of https.request()

// const req = https.request('https://www.google.com', (res) => {
const req = request('https://www.google.com', (res) => {
    res.on('data', (chunk)=> {
        console.log(`Data chunk: ${chunk}`);
    });
    res.on('end', () => {
        console.log('No more data');
    });
});
// we may receive more than one data event if the size of the response from our server is very large
// end event is sent when there is no more data from the request

req.end(); // end function will cause the request to be sent


// get does te same functionality as request but with the get method only
get('https://www.google.com', (getRes) => {
    getRes.on('data', (chunk)=> {
        console.log(`Data chunk: ${chunk}`);
    });
    getRes.on('end', () => {
        console.log('No more data');
    });
});
// we don't need to call the end function. it is called directly by get