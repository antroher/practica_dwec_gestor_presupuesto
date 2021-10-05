// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    let valorDevolver;
    if(valor >= 0){
        presupuesto = valor;
        valorDevolver = presupuesto;
    }
    else{
        console.log("Error. Valor introducido no valido.")
        valorDevolver = -1;
    }
return valorDevolver;
}

function mostrarPresupuesto() {
    // TODO
    console.log(`Tu presupuesto actual es de ${presupuesto}€`)
}

function CrearGasto(descripcion, valor) {
    // TODO
    if(valor < 0){
        valor = 0;
    }

    let gasto = {
        descripcion: descripcion,
        valor: parseFloat(valor)
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
