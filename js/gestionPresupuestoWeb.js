import * as gestionPresupuesto from './gestionPresupuesto.js';
import { prependListener } from 'cluster';
 
 function mostrarDatoEnId(idElemento, valor) {
    let elem = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elem.appendChild(p);
 }

function mostrarGastoWeb(idElemento, gastos) {
    let div = document.getElementById(idElemento);
    for (let gasto of gastos) {
        let aux = "";
        for (let etiq of gasto.etiquetas) {
            aux += `
            <span class="gasto-etiquetas-etiqueta">
                ${etiq}
            </span>`
        }
        div.innerHTML += 
            `<div class="gasto">
                <div class="gasto-descripcion">${gasto.descripcion}</div>
                <div class="gasto-fecha">${gasto.fecha}</div> 
                <div class="gasto-valor">${gasto.valor}</div> 
                <div class="gasto-etiquetas">
                ${aux}`;
    }

    let btnEditar = document.createElement("button");
    btnEditar.className = 'gasto-editar';
    btnEditar.textContent = "Editar";
    btnEditar.type = "button";

    let btnBorrar = document.createElement("button");
    btnBorrar.className = 'gasto-borrar';
    btnBorrar.textContent = "Borrar";
    btnBorrar.type = "button"
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const elemen = document.getElementById(idElemento);
    let datos = ""
    for (let [llave, val] of Object.entries(agrup)) {
        datos += 
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${llave}</span>
            <span class="agrupacion-dato-valor">${val}</span>
        </div>`
    };
    elemen.innerHTML += 
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${datos}
    `
}

function repintar() {
    let presp = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId("Presupuesto", presp);

    let gstoTotal = gestionPresupuesto.calcularTotalGastos().toFixed(2);
    mostrarDatoEnI("Gastos-Totales", gstoTotal);

    let balanceTotal = gestionPresupuesto.calcularBalance().toFixed(2);
    mostrarDatoEnId("Balance-Total", balanceTotal);

    let borrarDatos = document.getElementById("listadoGastosCompleto").innerHTML = "";

    let matrizGastos = gestionPresupuesto.listarGastos();
    for (const x of matrizGastos) {
        mostrarGastoWeb("gastosCompletos", x);
    }
}

function actualizarPresupuestoWeb () {
    let presp = parseFloat(prompt(`Introduce el presupuesto gastado`));
    gestionPresupuesto.actualizarPresupuesto(presp);
    repintar();
}

function nuevoGastoWeb () {
    let descr = prompt(`Escribe la descripcion del nuevo gasto`);
    let vlr = parseFloat(prompt(`Escribe el valor`));
    let fecha = prompt(`Escriba la fecha del gastos (yyyy-mm-dd)`);
    let etiq = prompt(`Introduce una etiqueta y si son varias añade una coma detras`);
    let etiqArray = etiq.split(`,`);
    
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}