"use strict"

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
class Gasto {
    constructor (descripcion, valor) {
        this.descripcion = descripcion;
        this.valor = valor;
    }

    mostrarGasto () {
        console.log(`Gasto correspondiente a ${descripcion} con valor ${valor} €`);
    }

    actualizarDescripcion (param1) {
        this.descripcion = param1;
    }

    actualizarValor (newValor) {
        if (newValor > 0) {
            this.valor = newValor;
        }
    }
}
// TODO: Variable global
var presupuesto = 0;

function actualizarPresupuesto(presupuesto1) {
    if (presupuesto1 > 0) {
        presupuesto = presupuesto1;
        return presupuesto;
    } else {
        console.log("Error, el valor es negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion, valor) {
    if (parseFloat(valor) < 0) {
        valor = 0;
    }

    this.valor = valor;
    this.descripcion = descripcion;

    this.mostrarGasto = function() {
        console.log(`Gasto correspondiente a ${descripcion} con valor ${valor} €`);
    }

    this.actualizarDescripcion = function(descripcion) {
        this.descripcion = descripcion;
    }

    this.actualizarValor = function(newValor) {
        if (newValor > 0) {
            this.valor = newValor;
        }
    }
    // return CrearGasto;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
