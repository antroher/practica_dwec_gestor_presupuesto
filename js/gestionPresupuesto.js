"use strict"

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
// class Gasto {
//     constructor (descripcion, valor) {
//         this.descripcion = descripcion;
//         this.valor = valor;
//     }

//     mostrarGasto () {
//         console.log(`Gasto correspondiente a ${descripcion} con valor ${valor} €`);
//     }

//     actualizarDescripcion (param1) {
//         this.descripcion = param1;
//     }

//     actualizarValor (newValor) {
//         if (newValor > 0) {
//             this.valor = newValor;
//         }
//     }
// }
// TODO: Variable global
var presupuesto = 0;

function actualizarPresupuesto(newPresupuesto) {
    let newValor;

    if (newPresupuesto >= 0) {
        presupuesto = parseFloat(newPresupuesto);
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

function CrearGasto(descripcion, valor) {
    if (isNaN(valor) || valor < 0) {
        valor = 0;
    }

    let gasto = {
        valor : valor,
        descripcion : descripcion,

        mostrarGasto : function() {
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        },

        actualizarDescripcion : function(newDescripcion) {
            this.descripcion = newDescripcion;
        },

        actualizarValor : function(newValor) {
            if (newValor >= 0) {
                this.valor = newValor;
            }
        }
    };
    
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

