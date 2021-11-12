import * as gestionPresupuesto from './gestionPresupuesto.js';


function mostrarDatoEnId(idElemento, valor) {
    let div = document.getElementById(idElemento);
    let p = document.createElement('p');
    p.textContent = valor;
    div.append(p);
    
}

function mostrarGastoWeb(idElemento, gastos) {
    const div = document.getElementById(idElemento);

    for(let gasto of gastos) {
        let storage = "";
        for(let i = 0; gasto.etiquetas.length > i; i++) {
            storage +=  `
            <span class="gasto-etiquetas-etiqueta">
            ${gasto.etiquetas[i]}
          </span>`
        }

        div.innerHTML +=
        `<div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div>
            <div class="gasto-etiquetas">
                ${storage}
            `
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const div = document.getElementById(idElemento);

    let storage = "";
    for (let [clave, valor] of Object.entries(agrup)) {
        storage += 
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${clave}</span>
            <span class="agrupacion-dato-valor">${valor}</span>
        </div>`
    };
        div.innerHTML += ` 
    <div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${storage}
    `
}

function repintar() {
    let presupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId('presupuesto', presupuesto);

    let gastosTotales = gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId('gastos-totales', gastosTotales);

    let balanceTotal = gestionPresupuesto.calcularBalance();
    mostrarDatoEnId('balance-total', balanceTotal);

    let borrarContenido = document.getElementById('listado-gastos-completo').innerHTML("");

    let listarGastos = gestionPresupuesto.listarGastos();
    mostrarGastoWeb('listado-gastos-completo', listarGastos);
}

function actualizarPresupuestoWeb() {
    
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}