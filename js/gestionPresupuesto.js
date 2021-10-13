// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict"
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(val) {
    if (val >= 0) {
        presupuesto = val;
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

function CrearGasto(des, val, eti, fec) {
    if (parseFloat(val) < 0 || isNaN(val)) {
        val = 0;
    }

    if (eti == "") {
        this.etiquetas = [];
    }

    if (fec == "") {
        this.fecha = getDate();
    }

    let gasto = {
        descripcion: des,
        valor: val,
        fecha: fec,
        etiquetas: eti,

        mostrarGasto() {
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        } ,

        actualizarDescripcion(des) {
            this.descripcion = des;
        } ,

        actualizarValor(val) {
            if (parseFloat(val) >= 0) {
                this.valor = parseFloat(val);
            }
        } ,

        actualizarFecha(fec) {
            this.fecha = fec;
        } ,

        actualizarEtiqueta(eti) {
            this.etiquetas = eti;
        }
    };
    return gasto;
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gas) {
    gas.id = idGasto;
    idGasto += 1;
    gastos.push(gas);
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