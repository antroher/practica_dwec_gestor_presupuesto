"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;

function actualizarPresupuesto(cantidad) {
    // TODO
    if (cantidad > -1){
        return presupuesto = cantidad;
    }else{
        console.log("Error: el presupuesto no puede ser negativo")
         return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    let texto = "Tu presupuesto actual es de " + presupuesto + " €";
    return texto;
}

function CrearGasto(descr, val) {
    // TODO
    val = parseFloat(val)
    if (val < 0 || isNaN(val)){
    val = 0;
    }
     let gasto = {
        descripcion: descr + "" ,
        valor: val
    };

    //METODOS OBJETO GASTO
    gasto.mostrarGasto = function(){
       return "Gasto correspondiente a " + gasto.descripcion + " con valor " + gasto.valor +" €";
    };
    gasto.actualizarDescripcion = function(descrip){
        gasto.descripcion = descrip;
    }; 
    gasto.actualizarValor = function(valo){
        if (valo >= 0){
        gasto.valor = valo;
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
