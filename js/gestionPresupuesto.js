'use strict'

var presupuesto = 0;
let gastos = [];
idgasto = 0;

function actualizarPresupuesto(valor) {
    let val = parseFloat(valor);

    if (val >= 0) {
        presupuesto = val;
    }

    else {
       console.log('Error. Presupuesto negativo');
       val = -1;
    }
    return val;
}

function mostrarPresupuesto() {

    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion, valor) {

    let valor1 = parseFloat(valor);

    if (valor1 < 0 || isNaN(valor1)) {
        valor1 = 0;
    }

    let gasto = {
	    descripcion: descripcion,
        valor : valor1,

        mostrarGasto() {
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        },

        actualizarDescripcion(newDescripcion) {

            this.descripcion = newDescripcion;
        },

        actualizarValor(newValor) {

            let value = parseFloat(newValor);

            if (value >= 0)
            {
                this.valor = value;
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
