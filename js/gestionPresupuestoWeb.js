/*utilidades necesarias para mostrar los datos de la aplicación*/
"use strict";
function mostrarDatoEnId(idElemento, valor) {
    let Elemento = document.getElementById(idElemento); //selecciona el elemento
    let parrafo = document.createElement("p");//crea el elemento
    parrafo.textContent = valor;//modifica el contenido del elemento p
    Elemento.appendChild(parrafo);//añade el contenido del texto al párrafo (lo añade al html)
}

function mostrarGastoWeb(idElemento, gastos) {
    let elemento = document.getElementById(idElemento);
    let gastoEtiquetas ="";  
    for (let etiqueta of gastos.etiquetas) {
        gastoEtiquetas += `
        <span class="gasto-etiquetas-etiqueta">
            ${etiqueta}
        </span>`
    }
    elemento.innerHTML += `
  <div class="gasto">
  <div class="gasto-descripcion">${gastos.descripcion}</div>
  <div class="gasto-fecha">${gastos.fecha}</div>
  <div class="gasto-valor">${gastos.valor}</div>
  <div class="gasto-etiquetas">
  ${gastoEtiquetas}
  </div>
  </div>
  `;
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    
    let agrupacion = '';

    let element = document.getElementById(idElemento);


    for (let [param,value] of Object.entries(agrup)) {
        agrupacion += `
        <div class="agrupacion-dato">
        <span class="agrupacion-dato-clave">${param}</span>
        <span class="agrupacion-dato-valor">${value}</span>
        </div>`
    }

    element.innerHTML += `
    <div class="agrupacion">
    <h1>Gastos agrupados por ${periodo}</h1>
    ${agrupacion}
    `
}

function repintar() {
    //Mostrar el presupuesto 
    let presupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId('presupuesto',presupuesto);

    //Mostrar los gastos totales
    let Calculogastos = gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId(gastos-totales,Calculogastos);

    //Mostrar el balance total
    let BalancePresupuesto = gestionPresupuesto.calcularBalance();
    mostrarDatoEnId('balance-total',BalancePresupuesto);

    //Borrar el contenido de div#listado-gastos-completo --> innerHTML para borrar el contenido de dicha capa
    document.getElementById("listado-gastos-completo").innerHTML = "";
    let listaGastos = gestionPresupuesto.listarGastos();
    mostrarGastoWeb("listado-gastos-completo", listaGastos);

    //Mostrar el listado completo de gastos
    let Listagastos = gestionPresupuesto.listarGastos();
    mostrarGastoWeb('listado-gastos-completo',Listagastos);
}

//manejadora de eventos del botón actualizarpresupuesto del código HTML
function actualizarPresupuestoWeb() {
    let solicitudPresupuesto = parseFloat(prompt('introduzca un presupuesto'));
    gestionPresupuesto.actualizarPresupuesto(solicitudPresupuesto);
    repintar();
    let click = getElementById();
}
/*cuando el usuario haga clcik en el boton de actualizarpresupuesto, 
estese diríge a la función actualizarPresupuestoWeb()*/
let btnActualizarPres = document.getElementById('actualizarpresupuesto')
btnActualizarPres.addEventListener('click',actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    EtiquetaGasto = [...etiq];
    let Descripcion = prompt('Inserta la descripción del gasto');
    let valueGasto = parseFloat(prompt('Inserta el valor correspondiente al gasto'));
    let fechaGato =  prompt('Inserta la fecha del gasto');
    let EtiquetaGasto = prompt('Inserta la etiqueta correspondiente al gasto');
    EtiquetaGasto.split(', ');
    let valueGasto = parseFloat(prompt('Inserta el valor correspondiente al gasto'));
    //Crear un nuevo gasto
    let NewGasto = gestionPresupuesto.CrearGasto(Descripcion,valueGasto,fechaGato,EtiquetaGasto);
    //Añadir el gasto a la lista
    gestionPresupuesto.anyadirGasto(NewGasto);
    repintar();
}
let btnAnyadirgasto = document.getElementById('anyadirgasto');
btnAnyadirgasto = addEventListener('click',nuevoGastoWeb);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb
}
import * as gestionPresupuesto from "./gestionPresupuesto.js";
