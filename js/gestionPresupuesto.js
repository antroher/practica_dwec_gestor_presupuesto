// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict"
class Gasto {
    constructor (d, v) {
        this.descripcion = d;
        this.valor = v;
    }

    function mostrarGasto() {
        console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }
    
    function actualizarDescripcion(d) {
        this.descripcion = d;
    }
    
    function actualizarValor(v) {
        if (parseFloat(v) >= 0) {
            this.valor = v;
        }
    }
}

// TODO: Variable global
var presupuesto = 0;

function actualizarPresupuesto(pres) {
    if (pres > 0){
        presupuesto = pres;
    } else {
        console.log("¡ERROR! Valor no válido");
        return -1;
    }
}

function mostrarPresupuesto() {
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(d, v) {
    let gasto = new Gasto();
    if (parseFloat(v) >= 0) {
        Gasto(d, v);
        }
         else {
            gasto(d, 0);
            }        
    return (this.gasto);
}







// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}