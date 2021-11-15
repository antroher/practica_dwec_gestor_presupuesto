import * as gestionPresupuesto from './gestionPresupuesto.js';
'use strict'

function mostrarDatoEnId(idElemento, valor) {

    let elem = document.getElementById(idElemento);

    let p = document.createElement('p');
    p.textContent = valor; // para modificar parte del texto del Dom, no meter codigo html nuevo

    elem.append(p); // añade un hijo al elemento que han pasado por ID
}

function mostrarGastoWeb(idElemento,gasto) {

    // creacrión elemento <div class="gasto">
    let divG = document.createElement('div');
    divG.className += 'gasto';
    // <div class="gasto-descripcion">
    let divGD = document.createElement('div');
    divGD.className += 'gasto-descripcion';
    divGD.textContent += `${gasto.descripcion}`; // ==>  <div class="gasto-descripcion"> ${gasto.descripcion} </div>
    // <div class="gasto-fecha"
    let divGF = document.createElement('div');
    divGF.className = 'gasto-fecha';
    divGF.textContent = `${gasto.fecha}`;
    // <div class="gasto-valor">
    let divGV = document.createElement('div');
    divGV.className = 'gasto-valor';
    divGV.textContent = `${gasto.valor}`;
    // <div class="gasto-etiquetas">
    let divGE = document.createElement('div');
    divGE.className = 'gasto-etiquetas';

    let span;
    for (let eti of gasto.etiquetas){
        span = document.createElement('span');
        span.className += 'gasto-etiquetas-etiqueta';
        span.textContent += `${eti} `;
        divGE.append(span);
    }

    // Insertar en el DOM
    let elemento = document.getElementById(idElemento);
    elemento.append(divG);
    divG.append(divGD,divGF,divGV,divGE);
    divGE.append(span);
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo) {  // agrup = { "2021-09": 5, "2021-10": 39}

    let elemento = document.getElementById(idElemento);

    let divAg = document.createElement('div');
    divAg.className += 'agrupacion';

    let h1 = document.createElement('h1');
    h1.textContent += `Gastos agrupado por ${periodo}`;

    divAg.append(h1);                                                        

    let divAD, span1, span2;
    for (let propiedad in agrup) {
        divAD = document.createElement('div');
        divAD.className += 'agrupacion-dato';

        span1 = document.createElement('span');
        span1.className += 'agrupacion-dato-clave';
        span1.textContent += `${propiedad}`;

        span2 = document.createElement('span');
        span2.className += 'agrupacion-dato-valor';
        span2.textContent += `${agrup[propiedad]}`;

        divAD.append(span1);
        divAD.append(span2);

        divAg.append(divAD);
    }

    elemento.append(divAg);
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