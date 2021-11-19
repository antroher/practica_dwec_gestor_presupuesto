import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {
    let div = document.getElementById(idElemento);

    div.textContent = valor;
}

function mostrarGastoWeb(idElemento, gastos){
  let elemento = document.getElementById(idElemento);
    for (let gasto of gastos) {
        let grpetiquetas = "";
        for (let etiquetai of gasto.etiquetas) {
            grpetiquetas += `<span class="gasto-etiquetas-etiqueta">${etiquetai}</span>`
        }
        elemento.innerHTML +=`<div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div>
            <div class="gasto-valor">${gasto.valor}</div> 
            <div class="gasto-etiquetas">
            ${grpetiquetas}`;
    }
}


function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    const elemento = document.getElementById(idElemento);
    let data = ""
    for (let [key, value] of Object.entries(agrup)){
        data += `<div class="agrupacion-dato">
                    <span class="agrupacion-dato-clave">${key}</span>
                    <span class="agrupacion-dato-valor">${value}</span>
                </div>`
    };
    elemento.innerHTML += 
    `<div class="agrupacion"><h1>Gastos agrupados por ${periodo}</h1>${data}`
}



function repintar(){
    let presupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto)

    let gastosTotales = gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gastosTotales)

    let balanceTotal = gestionPresupuesto.calcularBalance();
    mostrarDatoEnId("balance-total", balanceTotal)

    let listadoGastosCompleto = innerHTML

}


function actualizarPresupuestoWeb(){
    let presupuesto = parsefloat.prompt("Introduce el presupuesto")
    gestionPresupuesto.actualizarPresupuesto(presupuesto)
    repintar()
}


function nuevoGastoWeb(){
    let descripcion = prompt ("Introudzca la descripción")
    let valor = prompt ("Introudzca el valor")
    let fecha = prompt ("Introudzca la fecha")
    let etiquetas = prompt ("Introudzca las etiquetas")

    valor = parsefloat(this.valor)

    let etiquetasArray = etiquetas.split(',')

    const gasto = gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetasArray)
    gestionPresupuesto.anyadirGasto(gasto)

    repintar()
}


function EditarHandle(){
    this.handleEvent = function(e){
        let descripcion = prompt(`Nueva descripción del gasto`);
        let valor1 = parseFloat(prompt(`Indique el valor`))
        let fecha = prompt(`Actualice la fecha`)
        let etiquetas = prompt(`Escriba las etiquetas`)

        let arrayEtiquetas =etiquetas.split(`,`);

        this.gasto.actualizarValor(valor1);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...arrayEtiquetas);  
        repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function(e) {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}


function BorrarEtiquetasHandle(){
    this.handleEvent = function(e) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}


const btnActualizarPresupuesto = document.getElementById("actualizarPresupuesto");
btnActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb)

const btnNuevoGasto = document.getElementById("anyadirgasto");
btnNuevoGasto.addEventListener("click", nuevoGastoWeb);

const btnNuevoGastoFormulario = document.getElementById("anyadirgasto-formulario");
btnActualizarPresupuesto.addEventListener("click", nuevoGastoWebFormulario);


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
}