import "@babel/polyfill"

const arr = [
    new Promise((resolve, reject) => {
        resolve('hello');
    }),
    new Promise((resolve, reject) => {
        resolve('world')
    })
];

arr.map( item => {
    console.log(item.then(e => {
        console.log(e);
    }));
})
