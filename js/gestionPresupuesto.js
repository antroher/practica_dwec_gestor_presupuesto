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

//******Práctica 2****** */
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

//Función constructora
function CrearGasto(descripcion, valor) {
    if (isNaN(valor) || valor < 0) {
        valor = 0;
    }

    const gasto = {
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
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}