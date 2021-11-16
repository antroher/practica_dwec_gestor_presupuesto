
"use strict";
// Variables globales   -------------------------------------------------------------------------------
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

// Funciones        -----------------------------------------------------------------------------------
function actualizarPresupuesto(value){
    
    if(isNaN(value) || value < 0){
        console.error("Error. Número no válido");
        return -1;
    }else{
        presupuesto = value;
        return presupuesto;
    }
}

function mostrarPresupuesto(){
    
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, valor){
    
    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? valor : 0;
    this.mostrarGasto = function(){
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    };
    this.actualizarDescripcion = function(desc){
        this.descripcion = desc;
    };
    this.actualizarValor = function(value){
        if(value >= 0){
            this.valor = value;      
        }
    };
    
    
}

function listarGastos(){
    return gastos;
}



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
