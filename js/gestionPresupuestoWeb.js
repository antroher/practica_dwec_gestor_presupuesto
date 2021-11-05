import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {

    let p = document.createElement("p");
    let elemento = document.getElementById(idElemento);

    p.textContent = valor;
    elemento.appendChild(p);

}

function mostrarGastoWeb(idElemento, gastos) {
    
    let elemento = document.getElementById(idElemento);

    for(let gasto of gastos) {

        let etiquetas = "";

        for(let etiquetaObj of gasto.etiquetas) {

            etiquetas += `<span class="gasto-etiquetas-etiqueta"> ${etiquetaObj} </span>`;

        }

        elemento.innerHTML +=
        `<div class="gasto"
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div>
            <div class="gasto-valor">${gasto.valor}</div>
            <div class="gasto-etiquetas">${etiquetas}</div>
        </div>
        `;

    }
    
}

function mostrarGastoAgrupadosWeb(idElemento, periodo, agrup) {

    let elemento = document.getElementById(idElemento);

    let codeHTML = "";

    for(let [key, value] of Object.entries(agrup)) {
 
        codeHTML +=
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${key}</span>
            <span class="agrupacion-dato-valor">${value}</span>
        </div>
        `;

    };
    elemento.innerHTML +=
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${datos}
    </div>`;

}



export {
    mostrarDatoEnId,
    mostrarGastoAgrupadosWeb,
    mostrarGastoWeb
}