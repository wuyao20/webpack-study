/*
import './style.css'

const btn = document.createElement('button');
btn.innerHTML = 'click';
document.body.append(btn);

btn.onclick = function () {
    const div = document.createElement('div');
    div.innerHTML = 'item';
    document.body.append(div)
}
*/
import counter from "./counter";
import number from "./number";

counter();
number();

if(module.hot) {
    module.hot.accept('./number', () => {
        document.body.removeChild(document.getElementById('number'));
        number();
    })
}
