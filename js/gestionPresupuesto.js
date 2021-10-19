// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
'use strict'

var presupuesto = 0;
 var gastos = [];
var  idGasto = 0; 


function actualizarPresupuesto(valor) {

    let val1 = parseFloat(valor);

    if (val1 >= 0) {

        presupuesto = val1;

    }

    else {
       console.log('Error. Presupuesto negativo');
       val1 = -1;

    }

    return val1;
}

function mostrarPresupuesto() {

    return(`Tu presupuesto actual es de ${presupuesto} €`);

}

function CrearGasto(descrip, val, fec = Date.now(), ...etiq) {

    let val_ = parseFloat(val);

    if (val_ < 0 || isNaN(val_)) {

        val_ = 0;
    }

    let gasto = {

	descripcion: descrip,

        valor : val_,
        etiquetas : [...etiq],
        fecha : (typeof fec ===`string`) ? Date.parse(fec) : fec,


        mostrarGasto() {

            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);

        },

        actualizarDescripcion(newDes) {

            this.descripcion = newDes;

        },

        actualizarValor(newValor) {

            let value = parseFloat(newValor);

            if (value >= 0)
            {
                this.valor = value;
            }

        }

    };

    return gasto;
}

function listarGastos()
{
    return gastos;
}

function anyadirGasto(gasto)
{
    gasto.id = idGasto;
    idGasto ++;
    gastos.push(gasto);
}

function borrarGasto()
{
    for (let i = 0; i < gastos.length; i++) 
    {
        if (gastos[i].id === id) 
        {
            gastos.splice(i, 1);
        }
    }

}

function calcularTotalGastos()
{
    let suma = 0;
    for (let i = 0; i < gastos.length; i++)
    {
        suma += gastos[i].valor;
    }
    return suma;

}

function calcularBalance(){

    let result = 0;
    let totalGastos = calcularTotalGastos();

    result = presupuesto - totalGastos;
    return result;

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
    calcularBalance,
  
}
