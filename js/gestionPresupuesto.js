// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict"
var presupuesto = 0;


function actualizarPresupuesto(valor) {
    let val = parseFloat(valor);
    if (val >= 0) {
        presupuesto = val;
    }

    else {
       console.log('Error. Presupuesto negativo');
       val = -1;
    }
    return val;
}

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descr, val) {
    let val_ = parseFloat(val);
    if (val_ < 0 || isNaN(val_)) {
        val_ = 0;
    }

let gasto = {
	descripcion: descr,
    valor : val_,

    mostrarGasto() {
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    },

    actualizarDescripcion(nuevaDes) {
        this.descripcion = nuevaDes;
    },

    actualizarValor(nuevoValor) {
        let value = parseFloat(nuevoValor);
        if (value >= 0) {
            this.valor = value;
        }
    }
};
    return gasto;
}

/*function gasto(d,v) {
    
    this.descripcion = d;
    if (this.valor >=0)
    {
        this.valor = v;
    }
    else
    this.valor = 0;
}*/



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}