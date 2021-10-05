// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;

function actualizarPresupuesto(precio) {
    let devuelveValor;
    if (precio >= 0)
    {
        presupuesto = precio;
        devuelveValor = presupuesto;
    }
    else
    {
        console.log('Es un error');
        devuelveValor = -1;
    }
    return devuelveValor;
}

function mostrarPresupuesto() {
    var X = presupuesto;
    return `Tu presupuesto actual es de ${X}€` 
}

function CrearGasto() {
    // TODO
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
