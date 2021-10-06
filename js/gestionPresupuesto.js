'use strict'

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;

function comprobarNumNegativo(num){
    let negativo = false;

    if (num >= 0)
    {
        negativo = false;
    }
    else
    {
        negativo = true;
    }   
    return negativo;
}
function actualizarPresupuesto(num) {
    // TODO
    let valor;

    if (comprobarNumNegativo(num))
    {
        console.log('Error. No se puede introducir valores negativos.');
        valor = -1;
    }
    else
    {
        presupuesto = num;
        valor = presupuesto;
    }
    return valor;
}

function mostrarPresupuesto() {
    // TODO
    let texto = 'Tu presupuesto actual es de ' + presupuesto + ' €';
    return texto;
}

function CrearGasto(des, v) {
    // TODO
    let gasto = new Object();

    if (comprobarNumNegativo(v)){
        v = 0;
    }
    else {
        let gasto = {
            descripcion: des,
            valor: v,

            mostrarGasto(){
                console.log('Gasto correspondiente a ' + this.descripcion + 
                ' con valor ' + this.valor + ' €');
            },

            actualizarDescripcion(newDes){
                this.descripcion = newDes;
            },

            actualizarValor(newV){
                if (!comprobarNumNegativo(newV)){
                    this.valor = newV;
                }
            }
        };
    }
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
