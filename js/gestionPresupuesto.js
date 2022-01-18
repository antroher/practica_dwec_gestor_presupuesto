"use strict"

var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(newPresupuesto) {
    let newValor;

    if (newPresupuesto >= 0) {
        presupuesto = newPresupuesto;
        newValor = presupuesto;
    } else {
        console.log("Error. Valor introducido no valido.");
        newValor = -1;
    }
    return newValor;
}

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {  
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === id) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {
    let result = 0;
    gastos.forEach((x) => {
        result = result + x.valor;
    })
    return result;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}){
    let gastosFiltrados;
    gastosFiltrados = gastos.filter(function(gasto){
     let exist = true;
     if(fechaDesde){
         if(gasto.fecha < Date.parse(fechaDesde)) exist = false;
     }
     if(fechaHasta){
         if(gasto.fecha > Date.parse(fechaHasta)) exist = false;
     }
     if(valorMinimo){
         if(gasto.valor < valorMinimo) exist = false;
     }
     if(valorMaximo){
         if(gasto.valor > valorMaximo) exist = false;
     }
     if(descripcionContiene){
             if(!gasto.descripcion.includes(descripcionContiene)) exist = false;
     }
     if(etiquetasTiene){
         let inside = false;                   
             for (let i = 0; i < gasto.etiquetas.length; i++) {                   
                 for (let j= 0; j < etiquetasTiene.length; j++) {
                     if(gasto.etiquetas[i] == etiquetasTiene[j]) inside = true;                  
                 }
             }
        if(inside == false) exist = false;
     }
         return exist;
    });
return gastosFiltrados;  
}


function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {
    let filtrador = {etiquetasTiene : etiquetas, fechaDesde : fechaDesde, fechaHasta : fechaHasta}
    let returnFiltrarGastos = filtrarGastos(filtrador);
    let groupBy =
            returnFiltrarGastos.reduce((acc, item) => {
                let periodoReduce = item.obtenerPeriodoAgrupacion(periodo);
                if (acc[periodoReduce] == null)
                    acc[periodoReduce] = item.valor;
                else 
                    acc[periodoReduce] += item.valor;
                return acc;
            }, {});
    return groupBy;
}


export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
    
}