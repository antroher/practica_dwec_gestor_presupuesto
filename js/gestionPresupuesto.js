'use strict'

var presupuesto = 0;
let gastos = [];
let idgasto = 0;

//Presupuestos
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

//Gastos
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    let valor1 = parseFloat(valor);

    if (valor1 < 0 || isNaN(valor1)) {
        valor1 = 0;
    }

    let gasto = {
	    descripcion: descripcion,
        valor : valor1,
        etiquetas : [...etiquetas],
        fecha : (typeof fecha == 'string') ? Date.parse(fecha) : fecha,
        

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
        },

        mostrarGastoCompleto() {
            return this.mostrarGasto() + "\n " + this.actualizarFecha() + "\n";
        },

        actualizarFecha(fecha) {
            this.fecha = fecha;
        },

        anyadirEtiquetas() {

        },

        borrarEtiquetas() {

        }
    };

    return gasto;
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idgasto; 

    idgasto++;

    gastos.push(gasto);
}

function borrarGasto(id) {
    for(let i = 0; i < gastos.length; i++) {
        if(gastos[i].id === id) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {
    var suma = 0;
    for(let i = 0; i < gastos.length; i++) {
        suma += gastos[i].valor;   
    }
    return suma;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
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
    calcularBalance,

}
