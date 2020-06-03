function getComponent() {
    return import(/* webpackChunkName: "lodash"*/'lodash').then( _ => {
        const element = document.createElement('div');
        element.innerHTML = _.join(['dell', 'lee'], "--");
        return element;
    })
};

getComponent().then(element => {
    document.body.appendChild(element);
});
