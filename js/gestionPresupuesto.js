'use strict'
/* 
    var --> declarar variable global
    let --> variable ámbito local
    const --> constante
*/

/* shift + alt + a   para comentarios de varias líneas */
// control + } para comentarios de un línea

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;

function actualizarPresupuesto(nuevoValor) {

    if (nuevoValor >= 0)
    {
        presupuesto = nuevoValor;
        return presupuesto;
    }
    else 
    {
        console.log("Error. Número negativo");
        return -1;
    }
}

function mostrarPresupuesto() {

    return "Tu presupuesto actual es de "+presupuesto+" €";
}

function CrearGasto(descripcion, valor) {

    this.descripcion = descripcion;

    if (valor >= 0)
    {
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
    }

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function(nuevoValor){
        if (nuevoValor >= 0 )
        {
            this.valor = nuevoValor;
        }
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
