"Use strict"
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;

function actualizarPresupuesto(valor) {
    if(parseFloat(valor) > 0){
        presupuesto = valor;
        return valor;
    }else{
        console.log("El valor introducido es un n\xfamero negativo.")
        return -1;
    }
}

function mostrarPresupuesto() {
    alert("Tu presupuesto actual es de " +presupuesto + " €." )
}

function CrearGasto(desc, val) {
    let gasto
    if(parseFloat(valor) > 0){
        gasto = {
            descripcion : desc,
            valor : val
        } 
    }else{
        gasto = {
            descripcion : desc,
            valor : 0
        }
    }
    

    gasto.mostrarGasto = function() {
        alert("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.")
    }
    gasto.actualizarDescripcion = function(nuevaDesc){
        this.descripcion = nuevaDesc;
    }

    gasto.actualizarValor = function(nuevoValor){
        if(parseFloat(nuevoValor) > 0){
            this.valor = nuevoValor;
        }
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
