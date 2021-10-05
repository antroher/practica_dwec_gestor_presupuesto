// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;

function actualizarPresupuesto() {
    // TODO
    let num = parseFloat(prompt('Introduce el presupuesto para actualizar'));
    let retorno = 0;

    if(isNaN(num))
    {
        console.log('El dato introducido no es un numero');
        retorno = -1;
    }
    else
    {
        if(num < 0)
        {
            console.log('El dato introducido tiene que ser positivo');
            retorno -1;
        }
        else
        {
            presupuesto = num;
            retorno = presupuesto;
        }
    }
    return retorno;
}

function mostrarPresupuesto() {
    // TODO
    let texto = 'Tu presupuesto actual es de: ' + presupuesto + ' €';
    return texto;
}

function CrearGasto() {
    // TODO
    let desintro = prompt("Introduce la descripcion del gasto");
    let valorintro = parseFloat(prompt("Introduce el gasto"));

    if(valorintro < 0)
    {
        valorintro = 0;
    }

    
    let gasto =
    {
        description: desintro,
        valor: valorintro
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
