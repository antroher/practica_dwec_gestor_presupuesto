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

function CrearGasto(desc, val, fec = Date.now(), ...eti) {
    if (parseFloat(val) < 0 || isNaN(val)) {
        val = 0;
    }

    if (eti === "") {
        this.etiqueta = [];
    }

    if (fec === "") {
        this.fecha = getDate();
    }

    let gasto = {
	    descripcion: desc,
        valor : val,
        fecha : fec,
        etiqueta : eti,
         
        mostrarGasto : function (){
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
            
        },

        actualizarDescripcion : function(descr) {
            this.descripcion = descr;
        },

        actualizarValor : function(vall) {
            if (parseFloat(vall) >= 0)
            {
                this.valor = parseFloat(vall);
            }
        },

        actualizarFecha : function(fech) {
            this.fecha = Date.parse(fech);
        },

        actualizarEtiqueta : function(etiq) {
            this.etiqueta = etiq;
        }
    };
    return gasto;
}

function listarGastos() {
   return gastos;
}


function anyadirGasto(gast) {
    gast.id = idGasto;
    idGasto += 1;
    gastos.push(gast);
}

function borrarGasto() {
    for (let i = 0; i < gastos.length; i++)
    {
        if(gastos[i].id === id) {
            gastos.splice(i, 1);
        }
    }
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
