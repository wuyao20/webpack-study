// import _ from 'lodash';
//
// const element = document.createElement('div');
// element.innerHTML = _.join(['dell', 'lee'], "--");
// document.body.appendChild(element);


// async function getComponent() {
//     const _ = await import(/* webpackChunkName: "lodash"*/'lodash');
//     const element = document.createElement('div');
//     element.innerHTML = _.join(['dell', 'lee'], "--");
//     return element;
// };
//
// document.addEventListener('click', ()=> {
//     getComponent().then(element => {
//         document.body.appendChild(element);
//     });
// })

document.addEventListener('click', () => {
    import(/* webpackPrefetch: true */'./click').then( ({ default: click }) => {
        click();
    })
});


