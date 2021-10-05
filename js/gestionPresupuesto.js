// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
"use strict"
var presupuesto = 0;

function actualizarPresupuesto(presupuesto) {
    // TODO
    let number = 0;
    if(presupuesto >= 0)
    {
        number = presupuesto;
    }
    else
    {
        console.log("Los presupuestos son negativos");
        number = -1;
    }
    return number;
}

function mostrarPresupuesto() {
    // TODO
    return("Tu presupuesto actual es de " + presupuesto + "€");
}

function CrearGasto(valor) {
    // TODO
    let gasto = new Object();

    if(valor >= 0)
    {
        return gasto;
    }
    else{
        valor = 0;
    }
    
    let gasto = {
        descipcion
    }
    
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
