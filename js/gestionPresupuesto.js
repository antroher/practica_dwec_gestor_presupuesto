"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var budget = 0;
//COMENTARIO PARA PRIMER COMMIT Y COMPROBAR VERSIONES

function actualizarPresupuesto(value) {
    //TODO
    let comeBack = 0;
    if(value < 0){
        console.log("ERROR, es un número negativo");
        comeBack = -1;
    }
    else if(isNaN(value))
    {
        console.log("ERROR, carácter invalido");
        comeBack = -1;
    }else{
        budget = value;
        comeBack = buget;
    }
    return comeBack;

}

function mostrarPresupuesto() {
    // TODO
    console.log(`Presupuesto actual: ${budget}€`);
    return (`Presupuesto actual: ${budget}€`);
}

function CrearGasto(value, description) {
    // TODO
    if(value1 < 0 || isNaN(value1)){

        value1 = 0;
    }//Con esto comprobamos que value1 no sea negativo ni sea un string
    
    let expenditure = { //ESTAR ATENTO CON LOS = CUANDO SE DECLARAN CONSTRUCTORES
        value: value, 
        description: description, //Esto hace referencia a las propiedades que tiene el objeto y se le asignan por parametro una vez recurrimos al constructor
        
        //A continuación los métodos que van ligados al constructor
        mostrarGasto(){
            console.log (`Gasto correspondiente a ${this.description} con valor ${this.value} €.`);
            return (`Gasto correspondiente a ${this.description} con valor ${this.value} €.`);
        },
        actualizarDescripcion(nDescription){
            this.description = nDescription;
        },
        actualizarValor(nValue){
            if(value1 < 0 || isNaN(value1)){

                console.log("El valor introducido no es correcto, introduzca un numero positivo");

            }else{
                this.value = nValue;
            }
        }
        
    };
    return expenditure
} 

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
