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
    let presupuesto = parseFloat(prompt('Introduzca un presupuesto'));
    gestionPresupuesto.actualizarPresupuesto(presupuesto);
    repintar();    
}

const btnActualizarPresupuesto = document.getElementById("actualizar presupuesto");
btnActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    let descripcion = prompt('Describa el objeto que acaba de adquirir');
    let valor = parseFloat(prompt('¿Cuál ha sido el valor de su adquisición?'));
    let fecha = prompt('En formato yyyy-mm-dd, indique la fecha');
    let etiquetas = prompt('Escriba las etiquetas separadas por comas (,)');

    let arrayEtiquetas = etiquetas.split(",");

    let gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...arrayEtiquetas);

    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}

const btnNuevoGasto = document.getElementById("nuevo gasto");
btnNuevoGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle() {
    this.handleEvent = function(e) {
        let descripcion = prompt('Nueva descripción del gasto');
        let fecha = prompt('En formato yyyy-mm-dd, actualice la fecha');
        let valor = parseFloat(prompt('Indique el nuevo valor'));
        let etiquetas = prompt('Escriba las etiquetas separadas por comas (,)');
        
        let arrayEtiquetas = etiquetas.split(",");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarfecha(fecha);
        this.gasto.actualizarEtiquetas(...arrayEtiquetas);
        repintar();
    }
}

function BorarHnadle(){
    this.handleEvent = function(e) {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorarEtiquetasHnadle(){
    this.handleEvent = function(e) {
        gestionPresupuesto.borrarEtiquetas(this.etiquetas);
        repintar();
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}