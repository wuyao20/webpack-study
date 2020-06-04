import _ from 'lodash';
import jquery from 'jquery';
console.log(_.join(['a', 'b', 'c', 'd'], '***'));


/*function getComponent() {
    return import(/!* webpackChunkName: "lodash"*!/'lodash').then( _ => {
        const element = document.createElement('div');
        element.innerHTML = _.join(['dell', 'lee'], "--");
        return element;
    })
};

getComponent().then(element => {
    document.body.appendChild(element);
});*/

// import { test } from './test';
//
// console.log(test.name)
