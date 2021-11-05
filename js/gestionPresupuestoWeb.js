"use strict";

function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elemento.appendChild(p);
}

function mostrarGastoWeb(idElemento, gastos) {
    let elemento = document.getElementById(idElemento);
    for (let gasto of gastos) {
        let data = "";
        for (let i of gasto.etiquetas) {
            data +=
            `<div class="gasto-etiquetas-etiqueta">
            <span class="gasto-etiquetas-etiqueta">
                ${i}
            </div>
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

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const elemento = document.getElementById(idElemento);
    let data = ""
    for (let [key, value] of Object.entries(agrup)) {
        data += 
        `<div class="agrupacion-dato">
            <div class="agrupacion-dato-clave">${key}</div>
            <div class="agrupacion-dato-valor">${value}</div>
            <span class="agrupacion-dato-clave">${key}</span>
            <span class="agrupacion-dato-valor">${value}</span>
        </div>`
    };
    elemento.innerHTML += 
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${data}`
}

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}