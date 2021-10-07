// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
"use strict"
var presupuesto = 0;

function actualizarPresupuesto(presupuesto1) {
    // TODO
    let number = 0;
    if(presupuesto1 >= 0) {
        presupuesto = presupuesto1;
        number = presupuesto;
    } else {
        console.log("Los presupuestos son negativos");
        number = -1;
    }
    return number;
}

function mostrarPresupuesto() {
    // TODO
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(valor, descripcion) {
    // TODO
    if(isNaN(valor) || valor < 0 ){
        valor = 0;
    }    

    let gasto = {
        descripcion : descripcion,
        valor : valor,

        mostrarGasto : function(){
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        },
        actualizarDescripcion : function(descripcion1){
            this.descripcion = descripcion1;
        },
        actualizarValor : function(valor1){
            if(valor >= 0 ) {
                this.valor = valor1;
            }    
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
