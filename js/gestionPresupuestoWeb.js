import * as gestionPresupuesto from './gestionPresupuesto.js';
'use strict'

function mostrarDatoEnId(idElemento, valor) {

    let elem = document.getElementById(idElemento);
    let p = document.createElement('p');

    p.textContent = valor; // para modificar parte del texto del Dom, no meter codigo html nuevo

    elem.appendChild(p); // añade un hijo al elemento que han pasado por ID
}

function mostrarGastoWeb(idElemento,gasto) {
    let strGasto = `<div class="gasto">
                    <div class="gasto-descripcion">${gasto.descripcion}</div>
                    <div class="gasto-fecha">${gasto.fecha}</div> 
                    <div class="gasto-valor">${gasto.valor}</div> 
                    <div class="gasto-etiquetas">`;

    for (let eti of gasto.etiquetas){
        strGasto += `<span class="gasto-etiquetas-etiqueta">${eti}</span>`;
    }

    strGasto += `</div></div>`;

    document.getElementById(idElemento).innerHTML += strGasto;
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo) {  // agrup = { "2021-09": 5, "2021-10": 39}
    let textoHTML =                                                         
    `
    <div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
    `;
    for (let propiedad in agrup) {
        textoHTML +=
         `
        <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${propiedad}</span>
            <span class="agrupacion-dato-valor">${agrup[propiedad]}</span>
        </div>
        `;
    }
    textoHTML += "</div>"
    document.getElementById(idElemento).innerHTML = textoHTML;
}

function repintar() {
    // Mostrar presupuesto
    document.getElementById('presupuesto').innerHTML = " ";
    mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto());
    // Mostrar gastos totales
    document.getElementById('gastos-totales').innerHTML = " ";
    mostrarDatoEnId('gastos-totales',gestionPresupuesto.calcularTotalGastos());
    // Mostrar balance total
    document.getElementById('balance-total').innerHTML = " ";
    mostrarDatoEnId('balance-total',gestionPresupuesto.calcularBalance());
    // Borrar el contenito de #listado-gastos-completo
    document.getElementById('listado-gastos-completo').innerHTML = " ";
    // Mostrar listado de gastos
    for (let list of gestionPresupuesto.listarGastos()) {
        mostrarGastoWeb("listado-gastos-completo",list);
    }
}
// función manejadora de evento click de #actualizarpresupuesto
function actualizarPresupuestoWeb(){
    let nuevoPre = parseFloat(prompt("Introduce un presupuesto"));
    gestionPresupuesto.actualizarPresupuesto(nuevoPre);
    
    repintar();
    // obtener en elemento del botón actualizar
    let botonActualizar = document.getElementById('actualizarpresupuesto');
    // addEventListener para que sea función manejadora de eventos --> se llama sin ();
    botonActualizar.addEventListener('click', actualizarPresupuestoWeb);
}
// manejadora del evento click del boton anyadirgasto
function nuevoGastoWeb() {
    let descN = prompt('Introduce descripción del gasto');
    let valorN = parseFloat(prompt('Introduce valor del gasto'));
    let fechaN = new Date (prompt('Introduce fecha en formato AAAA-MM-DD'));
    let etiqN = prompt('Introduce etiquetas separadas por comas');

    // todo convertir cadena de etiquetas separadas por comas a un array
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}