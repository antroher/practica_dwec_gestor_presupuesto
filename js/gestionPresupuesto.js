// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
var presupuesto = 0;
// TODO: Variable global


function actualizarPresupuesto(valores) {
    let DevolverValor;
    if(valores > 0)
    {
        presupuesto = valores;
        DevolverValor = presupuesto;
    }
    else
    {
        alert("Error numero negativo")
        DevolverValor = -1;
    }
    return DevolverValor;
    }

function mostrarPresupuesto() {
    alert(`Tu presupuesto actual es de: ${presupuesto}`)
}

function CrearGasto(descripcion,valor) {
        if(valor < 0){
            valor = 0;
        }
    let gasto = {
        descripcion:descripcion,
        valor:parseFloat(valor)
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
