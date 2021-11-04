
import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId (idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement("p");
    parrafo.textContent = valor;
    elemento.appendChild("p");
}

function mostrarGastoWeb (idElemento, gastos) {
    let elemento = document.getElementById(idElemento);
    for (let gasto of gastos) {
        let data = "";

        for(let etiqueta of gasto.etiquetas) {
            data += `<span class="gasto-etiquetas-etiqueta">${etiqueta}</span>`
        }
        elemento.innerHTML += 
        `<div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div> 
            <div class="gasto-etiquetas">
                ${data}
            </div> 
        </div>`;
    }

}

function mostrarGastosAgrupadosWeb () {
    
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}