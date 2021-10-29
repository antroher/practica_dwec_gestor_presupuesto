"use strict";

function mostrarDatoEnId(idElemento, valor) {
    let element = document.getElementById(idElemento);
    element.innerHTML(`<p>${valor}</p>`) 
}

function mostrarGastoWeb(idElemento, gasto) {

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

}

//Funciones a exportar para el test.
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}