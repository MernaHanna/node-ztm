const http = require('http');

const PORT = 3000;

// creates a server that responds to request
// has callback function that takes a request and returns corresponding response
// req => headers and data that where passed infrom the client
// res => headers and data that we write and send back to the client
// req and res are both streams
// req => readable stream we can use req.on() to listen to req for data
// res => writable stream we can use res.writehead() to write headers
// const server = http.createServer((request, response) => {
//     response.writeHead(200, {
//         'Content-Type': 'text/plain',
//     });
//     // signals that the response is ready to be sent back
//     // include the plain text as a response
//     response.end('Hello! Sir Isaac Newton is your friend!');
// });

// server is a request listener.. writing these lines is similar to writing server.on('request', (req,res)=>{})
// different urls with different http methods is called endpoints
// const server = http.createServer((request, response) => {
//     response.writeHead(200, {
//         'Content-Type': 'application/json',
//     });

//     // response receives string and thus we need to stringify the json object
//     response.end(JSON.stringify({
//         id: 1,
//         name: 'Sir Isaac Newton'
//     }));
// });

const server = http.createServer();

// parameterized end point or router => is a route with a parameter eg id
const friends = [
    {
        id: 0,
        name: 'NiKola Tesla'
    },
    {
        id: 1,
        name: 'Sir Isaac Newton'
    },
    {
        id: 2,
        name: 'Albert Einstein'
    },
]
server.on('request', (req, res) => {
    const items = req.url.split('/');
    // /friends/2 => ['', 'friends', '2']
    if(req.method === 'POST' && items[1] === 'friends') {
        // data is passed as node buffer object (raw bytes)
        req.on('data', (data) => {
            const friend = data.toString();
            console.log('Request:', friend);
            friends.push(JSON.parse(friend));
            // pipe the request data to the response so that we are sending back in the response the same data we receives in the request
            // readable.pipe(writable);
            // req is readable stream while response is writable stream
            // if the pipe is placed here it will cause an error because it is still processing part of the request and therefore we are piping an incomplete request
            // req.pipe(res);
        });
        // no need to run res.end when we pipe because the res ends whenever the req ends
        req.pipe(res);

    // if (req.url === '/friends') {
    } else if (req.method === 'GET' && items[1] === 'friends') {
        // res.writeHead(200, {
        //     'Content-Type': 'application/json',
        // });

        // or instead of writeHead
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
    
        // response receives string and thus we need to stringify the json object
        // res.end(JSON.stringify({
        //     id: 1,
        //     name: 'Sir Isaac Newton'
        // }));
        
        if (items.length === 3) {
            // we can use + or Number() to convert the string from the url to a number
            const friendIndex = Number(items[2]);
            res.end(JSON.stringify(friends[friendIndex]));
        } else {
            res.end(JSON.stringify(friends));
        }
    // } else if (req.url === '/messages') {
    } else if (req.method === 'GET' && items[1] === 'messages') {
        res.setHeader('Content-Type', 'text/html');
        // html can be long therefore we use the write function to write html code piece by piece to our stream
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello Isaac!</li>');
        res.write('<li>What are your thoughts on astronomy?</li>');
        res.write('</ul>');
        res.write('</body');
        res.write('</html>');
        res.end();
        // by default the status code is set to 200
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
}); //localhost is already set up but we need to pass a port