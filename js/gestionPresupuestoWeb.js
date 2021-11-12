import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId (idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement("p");
    parrafo.textContent = valor;
    elemento.appendChild(parrafo);
}

function mostrarGastoWeb (idElemento, gastos) {
    let elemento = document.getElementById(idElemento);
    for (let gasto of gastos) {
        let data = "";

        for(let etiqueta of gasto.etiquetas) {
            data +=
            `<span class="gasto-etiquetas-etiqueta">
            ${etiqueta}
            </span>`
        }
        elemento.innerHTML += 
        `<div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div> 
            <div class="gasto-etiquetas">
                ${data}`;
    }

}

function mostrarGastosAgrupadosWeb (idElemento, agrup, periodo) {
    const elemento = document.getElementById(idElemento);
    let datos = ""
    for (let [clave, valor] of Object.entries(agrup)) {
        datos += 
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${clave}</span>
            <span class="agrupacion-dato-valor">${valor}</span>
        </div>`
    };
    elemento.innerHTML += 
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${datos}
    `
}

function reprintar (mostrarPresupuesto) {

}

function actualizarPresupuestoWeb () {
    let valor = parseFloat ( promt ("Introduzaca un presupuesto: "));
    gestionPresupuesto.actualizarPresupuesto(valor);
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    reprintar,
    actualizarPresupuestoWeb,
}