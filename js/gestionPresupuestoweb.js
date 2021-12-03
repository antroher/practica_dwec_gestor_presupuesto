"use strict"
import * as gestionP from "./gestionPresupuesto.js";


// FUNCIONES

function mostrarDatoEnId(idElemento,valor){
    let item = document.getElementById(idElemento);
    item.innerHTML = `<p>${valor}</p>`  
}


