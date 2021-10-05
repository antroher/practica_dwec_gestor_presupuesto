// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict"


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
    return `Tu presupuesto actual es de ${presupuesto}€`;
}

function CrearGasto(v, d) {
    let gasto = new Object();
        if (parseFloat(v) >= 0) {
        let gasto = {
            valor: `${v}`,
            descripcion: `${d}`
            }
        } else {
            let gasto = {
                valor: 0,
                descripcion: `${d}`
            }
        }
}

function mostrarGasto() {
    console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor}€`);
}

function actualizarDescripcion(d) {
    this.descripcion = d;
}

function actualizarValor(v) {
    if (parseFloat(v) >= 0) {
        this.valor = v;
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