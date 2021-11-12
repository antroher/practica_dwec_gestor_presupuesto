//Importar los programas

import * as GestPresWeb from './gestionPresupuestoWeb.js';
import * as GestPres from './gestionPresupuesto.js';

//Función mostrarDatoenId

function mostrarDatoEnId(idElemento, valor){
    var elem = document.getElementById(idElemento);
    elem.textContent = valor;
}

//Función mostrarGastoWeb
function mostrarGastoWeb(idElemento, gastos){       
    let elem = document.getElementById(idElemento);

    for(let gasto of gastos){
        let cadena = "";
        for(let i of gasto.etiquetas){
            cadena += 
            `<span class="gasto-etiquetas-etiqueta">
                     ${i}
            </span>`
        }
    
        elem.innerHTML += `<div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div> 
            <div class="gasto-etiquetas">
               ${cadena};
            </div> 
        </div>`
    }
}

//Función mostrarGastosAgrupadosWeb
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    var elem = document.getElementById(idElemento);

    let elemento = ""
    for (let [clave, valor] of Object.entries(agrup)) {
        elemento += 
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${clave}</span>
            <span class="agrupacion-dato-valor">${valor}</span>
        </div>`
    };

    elem.innerHTML += 
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${elemento}
    </div>
    `
}

//Función repintar
function repintar(){
    GestPres.mostrarDatoEnId('presupuesto', GestPres.mostrarPresupuesto());
    GestPres.mostrarDatoEnId('gastos-totales', GestPres.calcularTotalGastos());
    GestPres.mostrarDatoEnId('balance-total', GestPres.calcularBalance());
    document.getElementById('listado-gastos-completo').innerHTML = "";
    GestPres.mostrarGastoWeb('listado-gastos-completo', GestPres.listarGastos());
}

//Función actualizarPresupuestoWeb y botón actualizarpresupuesto

function actualizarPresupuestoWeb(){
    let nuevoPres = parseFloat(prompt('Inserta el nuevo presupuesto'));
    GestPresWeb.actualizarPresupuesto(nuevoPres); 
    repintar();
}


//Los exports 
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}