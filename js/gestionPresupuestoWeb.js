"use strict";

import * as gP from './gestionPresupuesto.js';

document.getElementById("actualizarpresupuesto").addEventListener('click', actualizarPresupuestoWeb());
document.getElementById("anyadirgasto").addEventListener('click', nuevoGastoWeb());

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
                `<span class="gasto-etiquetas-etiqueta">
                    ${etiqueta}
                </span>`;
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
    let element = document.getElementById(idElemento);
    let keys =  Object.keys(agrup);
    let values = Object.values(agrup);
    let agrupDato = "";
    let periodoString = "";

    switch (periodo) {
        case "dia":
            periodoString = "día";
            break;
        case "mes":
            periodoString = "mes";
            break;
        case "anyo":
            periodoString = "año";
            break;
    }

    keys.forEach((key, index) => {
        agrupDato += 
            `<div class="agrupacion-dato">
                <span class="agrupacion-dato-clave">${key}</span>
                <span class="agrupacion-dato-valor">${values[index]}</span>
             </div>`;
    });

    element.innerHTML += 
        `<div class="agrupacion">
            <h1>Gastos agrupados por ${periodoString}</h1>
            ${agrupDato}
        </div>`;
}

function repintar () {
    //Mostrar los datos en el div correspondiente.
    mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gP.calcularBalance());

    //Borrado de elementos en el div#listado-gastos-completo y su impresion de nuevo.
    document.getElementById("listado-gastos-completo").innerHTML = "";
    mostrarGastoWeb("listado-gastos-completo", gP.listarGastos());
}

function actualizarPresupuestoWeb() {
    //Actualizar el presupuesto.
    gP.actualizarPresupuesto(parseFloat(prompt("Introduce un nuevo presupuesto:")));

    //Volver a imprimir los datos con el nuevo presupuesto.
    repintar();
} 

function nuevoGastoWeb() {
    //Pedida de datos para la creación del gasto.
    let descripcion = prompt("Introduzca la descripción del nuevo gasto: ");
    let valor = parseFloat(prompt("Introduzca el valor del nuevo gasto: "));
    let fecha = Date.parse(prompt("Introduzca la fecha del nuevo gasto: "));
    let etiquetas = prompt("Introduzca las etiquetas del nuevo gasto separadas por , : ").split(', ')

    //Creación y adición del gasto creado a la lista de gastos.
    gP.anyadirGasto(gP.CrearGasto(descripcion,valor,fecha,etiquetas));

    //Volver a imprimir los datos con el nuevo objeto.
    repintar();

}

//Funciones a exportar para el test.
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb, 
    repintar
}