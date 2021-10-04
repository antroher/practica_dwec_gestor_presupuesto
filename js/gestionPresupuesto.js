'use strict'

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;


function actualizarPresupuesto(num) {
    // TODO
    if (num >= 0)
    {
        presupuesto = num;
        return num;
    }
    else
    {
        alert('Error. No se puede introducir valores negativos.');
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    alert('Tu presupuesto actual es de ' + presupuesto);
}

function CrearGasto(des, v) {
    // TODO
    let gasto = new Object();
    let gasto = {
        descripcion: des,
        valor: v,
    };
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
