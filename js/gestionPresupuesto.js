"use strict";

var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(valor) {
    let valorDevuelto = 0;

    if (valor < 0 || isNaN(valor)) {
        console.log("El valor introducido es negativo e incorrecto.");
        valorDevuelto = -1;
    }
    else {
        presupuesto = valor;
        valorDevuelto = valor;
    }

    return valorDevuelto;
}

function mostrarPresupuesto() {
    console.log(`Tu presupuesto actual es de ${presupuesto} €`);
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcionEntrante, valorEntrante, fechaEntrante, etiquetasEntrante) {
    if (valorEntrante < 0 || isNaN(valorEntrante)) {
        valorEntrante = 0;
    }
    if (etiquetasEntrante === "") {
        etiquetasEntrante = []
    }
    if (fechaEntrante === "") {
        let fechaObjeto = new Date();
        let fechaActual = fechaObjeto.getDate() + "/" + (fechaObjeto.getMonth() + 1) + "/" + fechaObjeto.getFullYear() + "T" + 
            fechaObjeto.getHours() + ":" + fechaObjeto.getMinutes();
        fechaEntrante = Date.parse(fechaActual);
    }
    else if (isNaN(Date.parse(fechaEntrante))){
        let fechaObjeto = new Date();
        let fechaActual = fechaObjeto.getDate() + "/" + (fechaObjeto.getMonth() + 1) + "/" + fechaObjeto.getFullYear() + "T" + 
            fechaObjeto.getHours() + ":" + fechaObjeto.getMinutes();
        fechaEntrante = Date.parse(fechaActual);
    }
    else {
        fechaEntrante = Date.parse(fechaEntrante);
    }
    
    let gasto = {
        descripcion: descripcionEntrante,
        valor: parseFloat(valorEntrante),
        etiquetas: etiquetasEntrante,
        fecha: fechaEntrante,

        mostrarGasto() {
            console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        },

        actualizarDescripcion(nuevaDescripcion) {
            this.descripcion = nuevaDescripcion;
        },

        actualizarValor(nuevoValor) {
            if (nuevoValor >= 0) {
                this.valor = nuevoValor;
            }
        }
    };

    return gasto;
} 

function listarGastos() {
    return gastos;
}

function anyadirGasto() {

}

function borrarGasto() {}

function calcularTotalGastos() {}

function calcularBalance() {}

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
