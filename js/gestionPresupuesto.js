// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict"
var presupuesto = 0;


function actualizarPresupuesto(v) {
    let v1 = parseFloat(v);
    if (v1 >= 0) {
        presupuesto = v1;
        return presupuesto;
    }

    else {
       console.log('¡ERROR! El presupuesto no puede ser negativo.');
       return -1;
    }
    
}

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(d, v1) {
    let v2 = parseFloat(v1);
    if (v2 < 0 || isNaN(v2)) {
        v2 = 0;
    }

    let gasto = {
        descripcion: d,
        valor : v2,

        mostrarGasto() {
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        },

        actualizarDescripcion(des) {
            this.descripcion = des;
        },

        actualizarValor(val) {
            let value = parseFloat(val);
            if (value >= 0) {
                this.valor = value;
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