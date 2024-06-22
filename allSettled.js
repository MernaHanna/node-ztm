// ES2020 feature
const promiseOne = new Promise((resolve, reject) => 
    setTimeout(resolve, 3000)
);

const promiseTwo = new Promise((resolve, reject) => 
    setTimeout(reject, 3000)
);

// promise.all must have all promises fulfilled and we have to use catch to handle the rejected
// it returns error if one fails
Promise.all([promiseOne, promiseTwo]).then(data => console.log(data))
.catch(e=> console.log('something failed', e));


// promise.allSettled returns all promises fulfilled or rejected
// it will wait for all of the promises to return whether fulfilled or rejected
Promise.allSettled([promiseOne, promiseTwo]).then(data => console.log(data))
.catch(e=> console.log('something failed', e));