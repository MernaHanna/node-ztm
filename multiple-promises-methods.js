// 3 different ways to run multiple promises
// parallel (they all run parallel and wait for the result of them all)
// sequencial (they run in a sequence one after another)
// race ( they all run parallel but whichever returns first is the answer and ignore the rest)

const promisify = (item, delay) =>
    new Promise((resolve) =>
    setTimeout(() => 
    resolve(item), delay));

const a = () => promisify('a', 100);
const b = () => promisify('b', 5000);
const c = () => promisify('c', 3000);

async function parallel() {
    const promises = [a(), b(), c()];
    const [output1, output2, output3] = await Promise.all(promises);
    return `parallel is done: ${output1} ${output2} ${output3}`;
}

// parallel().then(console.log);

async function race() {
    const promises = [a(), b(), c()];
    const output1 = await Promise.race(promises);
    return `race is done:  ${output1}`;
}

// race().then(console.log);

async function sequence() {
    const output1 = await a();
    const output2 = await b();
    const output3 = await c();
    return `sequence is done  ${output1} ${output2} ${output3}`;
}

// sequence().then(console.log);

// the order doesn't matter as they are all async.. the first one to return will be consoled first
// race is first with 100 ms then parallel with 5000 ms then sequence with 8100 ms
// parallel().then(console.log);
// sequence().then(console.log);
// race().then(console.log);