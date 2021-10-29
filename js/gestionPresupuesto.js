// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;


function actualizarPresupuesto(presupuesto) {
    // TODO
    if(isNaN(presupuesto) || presupuesto < 0){
        console.error("Error. Número no válido");
        return -1;
    }else{
        return presupuesto;
    }
}

function mostrarPresupuesto() {
    // TODO
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, valor) {
    // TODO
    this.descripcion = descripcion,
    this.valor = (valor >= 0) ? valor : 0,
    this.mostrarGasto = function(){
        console.log("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €");
    },
    this.actualizarDescripcion = function(desc){
        this.descripcion = desc;
    },
    this.actualizarValor = function(value){
        if(value >= 0){
            this.valor = value;      
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
