
function mostrarDatoEnId (idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement("p");
    parrafo.textContent = valor;
    elemento.appendChild("p");
}

function mostrarGastoWeb (idElemento, gasto) {
    let elemento = document.getElementById(idElemento)
}

function mostrarGastosAgrupadosWeb () {
    
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}