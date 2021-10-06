
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto=0;

function actualizarPresupuesto(cantidad) {
    // TODO 
    if(valor<0){
        cantidad=-1; 
        console.log("Error al introducir el valor")       
    }
    else{
        presupuesto=cantidad;
    }
    return presupuesto;

}

function mostrarPresupuesto() {
    let x = presupesto;
    console.log("Tu presupuesto actual es: " + x + "€")
}

function CrearGasto() {
    // TODO
    let gasto = {
        descripcion: " ",
        valor: 0,
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
