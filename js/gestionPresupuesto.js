// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;


function actualizarPresupuesto(presuspuesto) {
    // TODO
    if(presupuesto < 0)
    {
        console.log("Error, el presupuesto no puede ser menor que 0");
        return -1;
    }
    else
    {
        presupuesto = presupuesto;
        return presupuesto;
    }
}

function mostrarPresupuesto() {
    console.log("Tu presupuesto actual es de " + presupuesto + " €");
}

function CrearGasto(descripcion, valor) {
    var gasto = new Object();
    gasto.descripcion = descripcion;
    gasto.valor = valor;
    
    if(gasto.valor < 0){
        gasto.valor = 0;

    }
    else{
        gasto.valor = valor;
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
