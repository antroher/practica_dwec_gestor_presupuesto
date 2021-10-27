'use strict'

function mostrarDatoEnId(valor,idElemento) {

    let idHtml = document.cfreateElement(`${idElemento}`);

    let valorHtml = toString(valor);

    idHtml.append("\""+valorHtml+"\"");
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