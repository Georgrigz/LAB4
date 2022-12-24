import {MiniMaple} from './miniMaple.js'

window.onload = function() {
    document.querySelector('input#variable').value = "";
    document.querySelector('input#equation').value = "";
}

const maple = new MiniMaple();

calculate.onclick = function() {
    let answer = document.querySelector("div.answer");
    answer.removeChild(answer.firstChild);

    let variable = document.getElementById('variable').value;
    let equation = document.getElementById('equation').value;

    let res = '';
    if(!variable.match(/[a-z]/)){
        res = 'Error';
    }
    else{
        res = maple.diffFunc(equation, variable);
    }

    let node = document.createTextNode("Результат: " + res);
    answer.appendChild(node);
};