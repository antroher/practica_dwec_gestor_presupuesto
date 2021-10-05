// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

var presupuesto = 0;

function actualizarPresupuesto(numero) {
    if(numero >= 0)
        return numero;
    else
        console.log("ERROR. Valor no valido");
        return -1;
}

function mostrarPresupuesto() {
    return ("Tu presupuesto actual es de "+presupuesto+" €");
}

function CrearGasto(valor, descripcion) {
    let gasto = {
        _valor=valor,
        _descripcion=descripcion
    }
    
    if(actualizarPresupuesto(valor) != -1)
    {
        _valor = 0;
        _descripcion = descripcion;
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
