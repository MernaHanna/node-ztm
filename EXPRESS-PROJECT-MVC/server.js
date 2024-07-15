// when naming the file server.js this is a special case for npm start to work without adding any script to package.json
const express = require('express');
const path = require('path');
const messagesRouter = require('./routes/messages.router');
const friendsRouter = require('./routes/friends.router');
const app = express();

// to tell express that we will use handlebars as the template engine / view engine
app.set('view engine', 'hbs');
// set the path of the templates / views
// we need to use static path
app.set('views', path.join(__dirname, 'views'));

const PORT = 3000;

// use() => registers middleware to express
// has next argument => the function that controls the flow of our middlewares
app.use((req, res, next) => {
  const start = Date.now();
  // console.log(`${req.method} ${req.url}`);
  next(); // without call to next the request will time out (express hangs) and response is never set in our handlers
  // actions after response goes here after the next
  const delta = Date.now() - start; //measuring only the amount of time the processing in node took for that req without measuring the time the http protocol was passing the data over
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
  // baseUrl => '/friends/' url => ''=> may hold anything else after the baseUrl
});

// to serve static files eg html from public
// the path is static to where we start our node application
// if we try to run the server from the routes folder by using node ../server.js it won't find the path public therefore we use the built in path variable
// mounted to /site instead of being available at the root
// this is not restful.. we are not using collections here
// instead we tell the browser to render whatever in the public folder
// it is better to deliver these files not from node but instead from a content delivery network (cdn)
// eg: Akamai and Amazon cloudfront
// they provide local servers so that users are served the website in the quickest possible way
// and node can focus on RESTFUL APIs
// only host in node in small sized applications
// app.use('/site', express.static('public'));
app.use('/site', express.static(path.join(__dirname, 'public')));
// express.json automatically detects if the request has a content type json header and thus parse the body of the request
// without this step we cannot access the body of the request
app.use(express.json());

// to set the root url to use our hbs template index
// the variables are sent in the object (second argument of render function - the first is the name of the hbs template)
app.get('/', (req, res) => {
    res.render('index', {
        title: 'My Friends are VERYY Clever',
        caption: 'Let\'s go skiing!'
    });
})

// to use the middleware (router)
// mounting the friends router on the app object
app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
