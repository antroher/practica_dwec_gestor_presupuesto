"use strict";

var presupuesto = 0;

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
    console.log(`Tu presupuesto actual es de ${presupuesto} €.`);
    return `Tu presupuesto actual es de ${presupuesto} €.`;
}

function CrearGasto(descripcionEntrante, valorEntrante) {
    if (valorEntrante < 0 || isNaN(valorEntrante)) {
        valorEntrante = 0;
    }
    
    let gasto = {
        descripcion: descripcionEntrante,
        valor: parseFloat(valorEntrante),

        mostrarGasto() {
            console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.`);
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.`;
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

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
