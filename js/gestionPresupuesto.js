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

    if (nuevoValor >= 0)
    {
        presupuesto = nuevoValor;
        return presupuesto;
    }
    else 
    {
        console.log("Error. Número negativo");
        return -1;
    }
}

function mostrarPresupuesto() {

    return "Tu presupuesto actual es de "+presupuesto+" €";
}

function CrearGasto(descripcion, valor, fecha = Date.now(),...etiq = []) {

    if(isNaN(valor) || valor <= 0 ){
        this.valor = 0
    }else {
        this.valor = valor;
    }
    
    let gasto = {
        descripcion: descripcion + "",
        valor: parseFloat(this.valor),
        fecha: (typeof fecha === "string") ? Date.parse(fecha) : fecha,
        etiquetas: [...etiq],
    mostrarGasto(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    },
    actualizarDescripcion(descripcion){
        this.descripcion = descripcion;
    },
    actualizarValor(nuevoValor){
        if (nuevoValor >= 0 )
        {
            this.valor = nuevoValor;
        }
    },
    mostrarGastoCompleto(){
        let gastoCompleto = " ";
    },
    actualizarFecha(stringfecha){
        if (typeof stringfecha === "string"){
            this.fecha = Date.parse(stringfecha);
        }
        
    },
    anyadirEtiquetas(){

    },
    borrarEtiquetas(){

    }
    }

}
// TODO
function listarGastos() {
    return gastos;
}

function anyadirGasto(gastoAnyadir){
    if(gastoAnyadir !== undefined && gastoAnyadir !== null){
        gastoAnyadir.id = idGasto;
        gastos.push(gastoAnyadir);
        idGasto++;
    }
}

function borrarGasto(idGasto) {
    for (let i = 0; i < gastos.length; i++)
    {
        if (gastos[i].id == idGasto)
        {
            gastos.pop(gastos[i]);
        }
    }
}

function calcularTotalGastos() {
    let totalGasto = 0;
    for (let i = 0; i < gastos.length; i++){
        totalGasto += gastos[i].valor
    }
    return totalGasto;
}

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
