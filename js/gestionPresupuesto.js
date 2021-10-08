"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var budget = 0;
//COMENTARIO PARA PRIMER COMMIT Y COMPROBAR VERSIONES

function actualizarPresupuesto(value) {
    //TODO
    let comeBack = 0;
    if(value < 0){
        console.log("ERROR, es un número negativo");
        comeBack = -1;
    }
    else if(isNaN(value))
    {
        console.log("ERROR, carácter invalido");
        comeBack = -1;
    }else{
        budget = value;
        comeBack = buget;
    }
    return comeBack;
    
}

function mostrarPresupuesto() {
    // TODO
}

function CrearGasto() {
    // TODO
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
