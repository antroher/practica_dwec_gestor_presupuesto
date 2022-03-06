"use strict";

import * as gestionP from "./gestionPresupuesto.js";




// localStorage.user = JSON.stringify({ name: "John" });
// console.log(localStorage.user);
// let user = JSON.parse(localStorage.user);
// console.log(user.name);

// alert(`${key}: ${localStorage.getItem(key)}`);


var formulario = document.querySelector('#formpeliculas');
formulario.addEventListener('submit', function(){

    var titulo = document.querySelector('#addpelicula').value;

    if (titulo.length >= 1){
        localStorage.setItem(titulo, titulo);
    }         
});

let ul = document.querySelector('ul');
for (let i in localStorage) {
    if (typeof localStorage[i] == 'string') {
        console.log(localStorage[i]);
        let li = document.createElement('li');
        li.append(localStorage[i]);
        ul.append(li);
    }

} 
