"use strict";

function mostrarDatoEnId(idElemento, valor) {
    let element = document.getElementById(idElemento);
    element.innerHTML += `<p>${valor}</p>` 
}

function mostrarGastoWeb(idElemento, gastos) {
    let element = document.getElementById(idElemento);
    
    gastos.forEach((gasto) => {
        let etiquetas = "";
        gasto.etiquetas.forEach((etiqueta) => {
            etiquetas += 
                `<div class="gasto-etiquetas-etiqueta">
                    ${etiqueta}
                </div>`;
        });    

        element.innerHTML +=
            `<div class="gasto">
                <div class="gasto-descripcion">${gasto.descripcion}</div>
                <div class="gasto-fecha">${gasto.fecha}</div> 
                <div class="gasto-valor">${gasto.valor}</div> 
                <div class="gasto-etiquetas">
                    ${etiquetas}
                </div>
            </div>`;
    });
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    
}

//Funciones a exportar para el test.
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}