
function mostrarDatoEnId (idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement("p");
    parrafo.textContent = valor;
    elemento.appendChild("p");
}

function mostrarGastoWeb (idElemento, gasto) {
    let elemento = document.getElementById(idElemento);
    for (let gasto of gastos) {
        let data = "";

        for(let etiqueta of gasto.etiquetas) {
            data += `<span class="gasto-etiquetas-etiqueta">${etiqueta}</span>
        }
    }

}

function mostrarGastosAgrupadosWeb () {
    
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}