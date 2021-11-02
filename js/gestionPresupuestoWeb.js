'use strict'

function mostrarDatoEnId(idElemento, valor) {

    let elem = document.getElementById(idElemento);
    let p = document.createElement('p');

    p.textContent = valor; // para modificar parte del texto del Dom, no meter codigo html nuevo

    elem.appendChild(p); // añade un hijo al elemento que han pasado por ID
}

function mostrarGastoWeb(idElemento,gasto) {

}

function mostrarGastosAgrupadosWeb() {

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}