// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

var presupuesto;

// TODO: Variable global


function actualizarPresupuesto(num) {
    let ret;

    if( (is_numeric(num)) && (num > 0) )
    {
        presupuesto = num; 
        ret = num;
    }
    else
    {
        console.log("El valor introducido no es valido");
        ret = -1;
    }

    return ret;
}

function mostrarPresupuesto() {
    console.log("Tu presupuesto actual es de " + presupuesto + "€")
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
