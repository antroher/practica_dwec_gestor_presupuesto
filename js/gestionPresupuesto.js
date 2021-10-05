"use strict";

var presupuesto = 0;

function actualizarPresupuesto(valor) {
    if (valor < 0) {
        console.log("El valor introducido es negativo e incorrecto.");
        return -1;
    }
    else {
        presupuesto = valor;
        return presupuesto;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €.`;
}

function CrearGasto(descripcion, valor) {
    if (valor < 0) {
        valor = 0;
    }
    
    let gasto = {
        descripcion: descripcion,
        valor: parseFloat(valor),

        mostrarGasto() {
            console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.`);
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

let gasto = CrearGasto("Tintoreria", 4500);

gasto.mostratGasto() 

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
