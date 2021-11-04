import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {

    let p = document.createElement("p");
    let elemento = document.getElementById(idElemento);

    p.textContent = valor;
    elemento.appendChild(p);

}

function mostrarGastoWeb(idElemento, valor) {
    
    let elemento = document.getElementById(idElemento);

    for(let i = 0; i < gastos.length; i++) {

        let etiquetas = "";

        for(let j = 0; j < gasto.etiquetas; j++) {

            etiquetas += `<span class="gasto-etiquetas-etiqueta"> ${j} </span>`;

        }

        elemento.innerHTML +=
        `<div class="gasto"
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div>
            <div class="gasto-valor">${gasto.valor}</div>
            <div class="gasto-etiquetas">${data}</div>
        `;

    }
    
}

function mostrarGastoAgrupadosWeb() {

}



export {
    mostrarDatoEnId,
    mostrarGastoAgrupadosWeb,
    mostrarGastoWeb
}