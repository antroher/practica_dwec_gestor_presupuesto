// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict"
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(v) {
    if (v >= 0) {
        presupuesto = v;
        return presupuesto;
    }

    else {
       console.log('¡ERROR! El presupuesto no puede ser negativo.');
       return -1;
    }
    
}

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(d, v) {
    if (parseFloat(v) < 0 || isNaN(v)) {
        v = 0;
    }

    let gasto = {
        descripcion: d,
        valor : v,

        mostrarGasto() {
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        },

        actualizarDescripcion(des) {
            this.descripcion = des;
        },

        actualizarValor(val) {
            if (parseFloat(val) >= 0) {
                this.valor = parseFloat(val);
            }
        }
    };
    return gasto;
}

function listarGastos() {
    return 
}

function anyadirGasto() {

}

function borrarGasto() {

}

function calcularTotalGastos() {

}

function calcularBalance() {

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