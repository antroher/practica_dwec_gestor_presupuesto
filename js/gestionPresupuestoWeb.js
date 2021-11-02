import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {

    let div = document.createElement("div");
    let elemento = document.getElementById(idElemento);

    div.textContent = valor;
    elemento.appendChild(div);

}

function mostrarGastoWeb() {

}

function mostrarGastoAgrupadosWeb() {

}