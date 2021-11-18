import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId (idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement("p");
    parrafo.textContent = valor;
    elemento.appendChild(parrafo);
}

function mostrarGastoWeb (idElemento, gastos) {
    let elemento = document.getElementById(idElemento);
    for (let gasto of gastos) {
        let data = "";

        for(let etiqueta of gasto.etiquetas) {
            data +=
            `<span class="gasto-etiquetas-etiqueta">
            ${etiqueta}
            </span>`
        }
        elemento.innerHTML += 
        `<div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div> 
            <div class="gasto-etiquetas">
                ${data}`;
    }

}

function mostrarGastosAgrupadosWeb (idElemento, agrup, periodo) {
    const elemento = document.getElementById(idElemento);
    let datos = ""
    for (let [clave, valor] of Object.entries(agrup)) {
        datos += 
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${clave}</span>
            <span class="agrupacion-dato-valor">${valor}</span>
        </div>`
    };
    elemento.innerHTML += 
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${datos}
    `
}

function repintar () {
    let presupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId('presupuesto', presupuesto);

    let gastosTotales = gestionPresupuesto.calcularTotalGastos().toFixed(2);
    mostrarDatoEnId("gastos-totales", gastosTotales);

    let balanceTotal = gestionPresupuesto.calcularBalance().toFixed(2);
    mostrarDatoEnId('balance-total', balanceTotal);

    document.getElementById('listado-gastos-completo').innerHTML = " " ;

    let listarGastos = gestionPresupuesto.listarGastos();
    for (const x of listarGastos) {
        mostrarGastoWeb("listado-gastos-completo", x);
    }
}

function actualizarPresupuestoWeb () {
    let valor = parseFloat ( promt ("Introduzaca un presupuesto: "));
    gestionPresupuesto.actualizarPresupuesto(valor);
    reprintar();
}

function nuevoGastoWeb (){
    let descripcion = promt('Descirba el objrto a adquirir: ');
    let valor = parseFloat(promt('Indique el valor de la adquisición: '));
    let fecha = promt('Indique la fecha utilizando un formato (yyyy-mm-dd): ');
    let etiquetas =  promt('Indique las etiquetas separándolas por comas: ');

    let ArrayEtiquetas = etiquetas.split(',');

    let gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...ArrayEtiquetas);
    
    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}

function editarHandle() {
    this.handleEvennt = function(e) {
        let descripcion = promt('Indique la nueva descripción del gasto: ');
        let valor = parseFloat(promt('Indique el nuevo valor: '));
        let fecha = promt('Inqdique la nueva fecha en formato (yyyy-mm-dd): ');
        let etiquetas = promt('Indique las etiquetas separadas por comas: ');
        
        let ArrayEtiquetas = etiquetas.split(',');
        
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...arrayEtiquetas);  
        repintar();
    }
}

function BorrarHandle(){
    this.handleEvennt = function(e){
        
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    editarHandle
}