import * as gestionPresupuesto from './gestionPresupuesto.js';
import { parse } from 'querystring';

function mostrarDatoEnId(idElemento, valor){

    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement('p');
    parrafo.textContent = valor;
    elemento.appendChild(parrafo);

}

function mostrarGastoWeb(idElemento, gasto){
    let bloque = `<div class="gasto">
                            <div class="gasto-descripcion"> ${gasto.descripcion} </div>
                            <div class="gasto-fecha"> ${gasto.fecha} </div>
                            <div class="gasto-valor"> ${gasto.valor} </div>
                            <div class="gasto-etiquetas">`;
    for(let etiqueta of gasto.etiquetas) 
    {    
        bloque += `<span class="gasto-etiquetas-etiqueta"> ${etiqueta} </span>` 
    } 
    bloque += `</div>
                </div>`;
    document.getElementById(idElemento).innerHTML += bloque;
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let bloque = `<div class="agrupacion">
                        <h1>Gastos agrupados por ${periodo}</h1>`
    
    for(let elemento in agrup)
    {
        bloque += `<div class="agrupacion-dato">
                        <span class="agrupacion-dato-clave">${elemento} </span>
                        <span class="agrupacion-dato-valor">${agrup[elemento]}</span>
                        </div> `;
    }
    bloque += `</div>`;
    document.getElementById(idElemento).innerHTML += bloque;
}

function repintar(){
let presupuesto = gestionPresupuesto.mostrarPresupuesto();
mostrarDatoEnId("presupuesto", presupuesto);

let gastos_totales = gestionPresupuesto.calcularTotalGastos();
mostrarDatoEnId("gastos-totales", gastos_totales) ;

let balance_total = gestionPresupuesto.calcularBalance()
mostrarDatoEnId("balance-total", balance_total)

document.getElementById("listado-gastos-completo").innerHTML = "";
let listado_gastos_completo = gestionPresupuesto.listarGastos()
for(let gasto of listado_gastos_completo){
    mostrarGastoWeb("listado-gastos-completo", gasto)
}
}

function actualizarPresupuestoWeb(){
    let presupuesto = parseFloat(prompt("Introduce un presupuesto"))
    gestionPresupuesto.actualizarPresupuesto(presupuesto)
    repintar()
}

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb
}