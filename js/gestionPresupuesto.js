"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
//COMENTARIO PARA PRIMER COMMIT Y COMPROBAR VERSIONES
function actualizarPresupuesto(valor) {
    //TODO
    let retorno = 0;
    if(valor < 0 ||isNaN(valor)){
        console.log("Error, es un número negativo")
        retorno = -1;
    
    }else{
        presupuesto = value;
        retorno = presupuesto;
    }
    return retorno;

}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

let valor1 = 0;
let descripcion1 = 0;

function CrearGasto(descripcion1, valor1) {
    // TODO
    if(valor1 < 0 || isNaN(valor1)){

        valor1 = 0;
    }//Con esto comprobamos que value1 no sea negativo ni sea un string

    

    let gasto = { //ESTAR ATENTO CON LOS = CUANDO SE DECLARAN CONSTRUCTORES
        valor: valor1, 
        descripcion: descripcion1, //Esto hace referencia a las propiedades que tiene el objeto y se le asignan por parametro una vez recurrimos al constructor
        
        //A continuación los métodos que van ligados al constructor
        mostrarGasto(){
            console.log `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.`
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.`;
        },
        actualizarDescripcion(nuevaDesc){
            this.descripcion = nuevaDesc;
        },
        actualizarValor(nuevoValor){
            if(nuevoValor < 0 || isNaN(nuevoValor)){

                console.log("Error, es un número negativo")

            }else{
                this.valor = nuevoValor;
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
