var presupuesto = 0;

function actualizarPresupuesto(valor) {
    if (valor < 0) {
        alert("El valor introducido es negativo e incorrecto.");
        return -1;
    }
    else {
        presupuesto = valor;
        return presupuesto;
    }
}

function mostrarPresupuesto() {
    alert(`Tu presupuesto actual es de ${presupuesto} €.`);
}

function CrearGasto(descripcion, valor) {
    if (valor < 0) {
        valor = 0;
    }
    
    return gasto = {
        descripcion: descripcion,
        valor: valor
    };
} 

let gasto = CrearGasto("Tintoreria", 4500);


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
