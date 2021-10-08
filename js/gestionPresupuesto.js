// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
"use strict"
var presupuesto = 0;

function actualizarPresupuesto(newPresupuesto) {
    if(newPresupuesto >= 0){
        presupuesto = newPresupuesto;
    } else {
        console.log("Error presupuesto negativo ");
        return -1;
    }
    return presupuesto;
}

function mostrarPresupuesto() {
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion, valor) {
    if(valor < 0 || isNaN(valor)){
        valor = 0;
    }
    let gasto = {
        valor : valor,
        descripcion : descripcion,
        mostrarGasto : function() {
            return(`Gasto correspondiente a ${this.descripcion} con valor ${valor} €`);
        },

        actualizarDescripcion : function(descripcion) {
            this.descripcion = descripcion;
        },

        actualizarValor : function(valor) {
            if(valor > 0) {
                this.valor = valor;
            }
        }
    }

    return gasto;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
