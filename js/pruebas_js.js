"use strict";

import * as gestionP from "./gestionPresupuesto.js";


// const gasto1 = new gestionP.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
// const gasto2 = new gestionP.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");



// let gasto = {id: 12};
// console.log(gasto);

// let btnEditForm = document.createElement("button");
// btnEditForm.className = 'gasto-editar-formulario';
// btnEditForm.id = `gasto-editar-formulario-${gasto.id}`;
// btnEditForm.textContent = 'Editar (Formulario)';

// aplicacion.append(btnEditForm);


/*
let formulario = document.querySelector('#controlesprincipales');
formulario.querySelector("button.cancelar").addEventListener('click', cancelarHandler);

function cancelarHandler(e){
    alert("hola");
}
*/



/*
var presupuesto = 0;
var gastos = [];
var idGasto = 0;
const gasto1 = new gestionP.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
const gasto2 = new gestionP.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");

function anyadirGasto(gasto) {
    if (typeof (gasto) === "object") {
        gasto.id = idGasto;
        gastos.push(gasto);
        idGasto++;
    }
}

anyadirGasto(gasto1);
anyadirGasto(gasto2);
console.log(gasto1);
console.log(gasto2);
*/

localStorage.user = JSON.stringify({ name: "John" });
console.log(localStorage.user);
let user = JSON.parse(localStorage.user);
console.log(user.name);