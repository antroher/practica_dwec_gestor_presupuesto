"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(cantidad) {
    // TODO
    if (cantidad > -1){
        presupuesto = cantidad;
    }else{
        alert("Error: el presupuesto no puede ser negativo.")
        presupuesto = -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    alert("Tu presupuesto actual es de " + presupuesto + "€.")
}

function CrearGasto(descr, val) {
    // TODO
    let Gasto = new Object();
    Gasto = {
        descipcion = descr,
        valor = val,
    }

    //METODOS OBJETO GASTO
    Gasto.mostrarGasto = function(){
        alert("Gasto correspondiente a " + Gasto.descipcion + "con valor " + Gasto.valor +"€")
    }
    Gasto.actualizarDescripcion = function(descr){
        Gasto.descipcion = descr;
    } 
    Gasto.actualizarValor = function(val){
        if (valor >= 0){
        Gasto.valor = val;
        }
    } 

   return Gasto;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
