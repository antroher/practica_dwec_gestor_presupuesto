'use strict'
/* 
    var --> declarar variable global
    let --> variable ámbito local
    const --> constante
*/

/* shift + alt + a   para comentarios de varias líneas */
// control + } para comentarios de un línea

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// Variables globales
var presupuesto = 0;
var idGasto = 0;
var gastos = new Array();

function actualizarPresupuesto(nuevoValor) {

    if(parseFloat(valor) > 0){
        presupuesto = valor;
        return presupuesto;
    }else {
        console.log("Error. Número negativo");
        return -1;
    }
}

function mostrarPresupuesto() {

    return "Tu presupuesto actual es de "+presupuesto+" €";
}

function CrearGasto(desc, valor, fechaCreacion , ...etiqueta) {

    let gasto={
        descripcion : desc,
        etiquetas : new Array(),
        valor : null,
        fecha : null
    }

    if(parseFloat(valor) > 0){
        gasto.valor = valor;
    }else{
        gasto.valor = 0;
    }

    if(fechaCreacion === undefined || isNaN(Date.parse(fechaCreacion))){  // typeof === "string"
        gasto.fecha = new Date(Date.now()).toISOString().substring(0,16); // "2021-10-06T13:10" 16-char
    }else{
        gasto.fecha = Date.parse(fechaCreacion);
    }

    if(etiqueta !== undefined){
        gasto.etiquetas = etiqueta;
    }

    // MÉTODOS del objeto gasto

    gasto.mostrarGastoCompleto = function(){
        let respuesta = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
            Fecha: ${new Date(this.fecha).toLocaleString()} 
            Etiquetas:\n`;
        
        for(let i = 0; i < this.etiquetas.length; i++){  // Recorre y muestra los valores del Array
            respuesta += "- " + this.etiquetas[i]+`\n`
        }

        return respuesta;
    }

    gasto.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    gasto.actualizarDescripcion = function(nuevaDesc){
        this.descripcion = nuevaDesc;
    }

    gasto.actualizarValor = function(nuevoValor){
        if(parseFloat(nuevoValor) > 0){
            this.valor = nuevoValor;
        }
    }

    gasto.actualizarFecha = function(nuevaFecha){
        if(!isNaN(Date.parse(nuevaFecha))){
            this.fecha = Date.parse(nuevaFecha);
        }
    }

    gasto.anyadirEtiquetas = function(...nuevasEtiquetas){
        nuevasEtiquetas.forEach(e => {
            if(!this.etiquetas.includes(e)){
                this.etiquetas.push(e);
            }
        });
    }

    gasto.borrarEtiquetas = function(...etiquetasABorrar){
        etiquetasABorrar.forEach(b => {
            if(this.etiquetas.includes(b)){
                this.etiquetas.splice(this.etiquetas.indexOf(b),1)
            }
        });
    }
    return gasto;
    }

function listarGastos() {
    return gastos;      // o recorrer el array con un bucle
}

function anyadirGasto(gastoAnyadir){
    if(gastoAnyadir !== undefined && gastoAnyadir !== null){
        gastoAnyadir.id = idGasto;
        gastos.push(gastoAnyadir);
        idGasto++;
    }
}

function borrarGasto(idBorrar){
    gastos.forEach(g => {
        if(g.id == idBorrar){
            gastos.splice(gastos.indexOf(g),1);
        }
    });

}
/* function borrarGasto(idGasto) {
    for (let i = 0; i < gastos.length; i++)
    {
        if (gastos[i].id == idGasto)
        {
            gastos.pop(gastos[i]);
        }
    }
} */

function calcularTotalGastos() {
    let totalGasto = 0;
    for (let i = 0; i < gastos.length; i++){
        totalGasto += gastos[i].valor
    }
    return totalGasto;
}
/*
function calcularTotalGastos(){
    let totalGastos = 0;
    gastos.forEach(g => {
        totalGastos += g.valor;
    });
    return totalGastos;
}
*/

function calcularBalance() {
    let totalGasto = calcularTotalGastos();

    let balance = presupuesto - totalGasto;

    return balance;  // no se si es esto o tengo que devovlerlo en string
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
