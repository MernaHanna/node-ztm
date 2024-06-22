//async await
// async function fetchUsers() {
//     const resp = await fetch('https://jsonplaceholder.typicode.com/users');
//     const data = await resp.json();
//     console.log(data);
// }

// fetch('https://jsonplaceholder.typicode.com/users')
// .then(resp => resp.json())
// .then(console.log)

const urls = [
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/albums'
];

// Promise.all(urls.map(url => {
//     return fetch(url).then(resp=> resp.json())
// })).then(results => {
//     console.log('users', results[0]);
//     console.log('posts', results[1]);
//     console.log('albums', results[2]);
// }).catch(() => console.log('error'));

const getData = async function(){
    try {
        const [users, posts, albums] = await Promise.all(urls.map(url => {
            return fetch(url).then(resp=> resp.json())
        }));
        console.log('users', users);
        console.log('posts', posts);
        console.log('albums', albums);
    } catch(err) {
        console.log('oops');
    }
}