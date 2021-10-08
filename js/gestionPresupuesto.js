// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict";


var presupuesto = 0; // TODO: Variable global


function actualizarPresupuesto(num) {
    let num = parseInt(prompt("Introduce un valor positivo"));
    if (num < 0) {
        num = -1;
        alert(`ERROR. El valor debe ser positivo`);
    }
    else
        presupuesto = num;
    return actualizarPresupuesto(num);
}

function mostrarPresupuesto() {
    let x = presupuesto;
    let mensaje = `Tu presupuesto actual es de ${x}€`;
    alert(mensaje);
}

function CrearGasto() {
    // TODO
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
