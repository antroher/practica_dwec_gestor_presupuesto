import {mostrarPresupuesto}    from './gestionPresupuesto.js';
import {CrearGasto} from './gestionPresupuesto.js';
import {listarGastos} from './gestionPresupuesto.js';
import {anyadirGasto} from './gestionPresupuesto.js';
import {borrarGasto} from './gestionPresupuesto.js';
import {calcularTotalGastos} from './gestionPresupuesto.js';
import {calcularBalance} from './gestionPresupuesto.js';
import {filtrarGastos} from './gestionPresupuesto.js';
import {agruparGastos} from './gestionPresupuesto.js';
import {actualizarPresupuesto} from './gestionPresupuesto.js';



function mostrarDatoEnId(idElemento,valor){
    let elemento = document.getElementById(idElemento);
    elemento.append(valor);

}

function mostrarGastoWeb(idElemento,gastos)
{
    let elemento = document.getElementById(idElemento);
    for (let g of gastos) {
        let datos = "";

        for(let i of g.etiquetas) {
            datos +=
            `<span class="gasto-etiquetas-etiqueta">
            ${i}
            </span>`
        }
        elemento.innerHTML += 
        `<div class="gasto">
            <div class="gasto-descripcion">${g.descripcion}</div>
            <div class="gasto-fecha">${g.fecha}</div> 
            <div class="gasto-valor">${g.valor}</div> 
            <div class="gasto-etiquetas">
                ${datos}`;
    }



}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento);
 

}
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}