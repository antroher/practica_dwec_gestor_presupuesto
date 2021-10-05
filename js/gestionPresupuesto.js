// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;

actualizarPresupuesto(presupuesto);

function actualizarPresupuesto(valor) {
    // TODO
    if(valor >= 0){
        presupuesto = valor;
        return presupuesto;
    }
    else{
        alert("Error. Valor introducido no valido.")
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    alert(`Tu presupuesto actual es de ${presupuesto}€`)
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
