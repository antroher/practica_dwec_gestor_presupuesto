// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;

function actualizarPresupuesto(actualizar) {
    let devolverValor;
    if(actualizar>=0)
    {
        presupuesto = actualizar;
        devolverValor=presupuesto;
    }
    else
    {
        console.log("Es inferior a 0");
        devolverValor= -1;
    }
    return devolverValor; 
}

function mostrarPresupuesto() {
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto() {
    // CrearGasto - Función constructora que se encargará de crear un objeto gasto. Esta función devolverá un objeto 
    //de tipo gasto. Deberá comprobar que el valor introducido sea un núḿero no negativo; en caso contrario, asignará a la 
    //propiedad valor el valor 0.
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
