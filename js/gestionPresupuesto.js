import { strict } from "assert";

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
'use strict'

var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(valor) {
    if (valor >= 0) {
        presupuesto = valor;
    } else {
       console.log('Error. Presupuesto negativo');
       valor = -1;
    }
    return valor;
}

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(desc, val, fech, eti ) {
    if (val < 0 || isNaN(val)) {
        val = 0;
    }

    let gasto = {
	    descripcion: desc,
        valor : val,
        fecha : fech,
        etiqueta : eti,
         
        mostrarGasto : function (){
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
            
        },

        actualizarDescripcion : function(descr) {
            this.descripcion = descr;
        },

        actualizarValor : function(vall) {
            if (vall >= 0)
            {
                this.valor = vall;
            }
        }
    };
    return gasto;
}

function listarGastos() {
    console.log(gastos);
}


function anyadirGasto() {
    
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
