import {send} from './request.mjs';
import {read} from './response.mjs';
// this makes it clear as to what exactly we are using and from which module

function makeRequest(url, data) {
    send(url, data);
    return read();
}

const responseData = makeRequest('https://google.com', 'hello');
console.log(responseData);