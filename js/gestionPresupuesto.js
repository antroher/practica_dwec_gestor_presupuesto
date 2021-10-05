// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;


function actualizarPresupuesto(presupuesto) {
    // TODO
    let a = prompt("Introduzca el valor del presupuesto: ");

    if(isNaN(a))
    {
        console.log("ERROR El valor introducido no es un número");
        return -1;
    }
    else
    {
        if (a > 0)
        {
            presupuesto = a;
            return presupuesto;
        }
        else
        {
            console.log("ERROR El valor introducido es negativo");
            return -1;
        }
    }
}

function mostrarPresupuesto() {
    // TODO
    let mensaje = ("Tu presupuesto actual es de " + presupuesto + " €");
    return mensaje;
}

function CrearGasto() {
    // TODO
    let gasto = new Object();
    let valor = 0;

    if(gasto < 0)
        valor = gasto;
    else
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
