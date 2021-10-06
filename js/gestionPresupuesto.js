// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
"use strict"
var presupuesto = 0;
function actualizarPresupuesto(valores) {

    if (parseFloat(valores) >= 0) {
        presupuesto = valores;
        return valores;
    } else {
        console.log("ha introducido un numero negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    return 'Tu presupuesto actual es de ' + presupuesto + ' €';
}

function CrearGasto(descr, val) {

    let gasto;

    if (parseFloat(val) >= 0) {
        gasto = {
            descripcion: descr,
            valor: val           
        };
    }

    else {

        gasto = {
            descripcion: descr,
            valor: 0
        };
    }

    gasto.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    gasto.actualizarDescripcion = function (newDescr) {
        this.descripcion = newDescr;
    };

    gasto.actualizarValor = function (v1) {
        if (parseFloat(v1) >= 0) {
            this.valor = v1;
        } 
    };

    
    return gasto;
}




// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
