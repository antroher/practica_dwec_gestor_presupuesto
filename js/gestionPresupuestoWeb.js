"use strict"

function mostrarDatoEnId (idElemento, valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML += `<p>${valor}</p>`;
    
}

function mostrarGastoWeb (idElemento, listaGasto){

}

function mostrarGastosAgrupadosWeb (idElemento, agrup, periodo){

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}