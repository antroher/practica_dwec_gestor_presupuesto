// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;


function actualizarPresupuesto(valor) {
    // TODO
    if(presupuesto < 0)
    {
        console.log("Error, el presupuesto no puede ser menor que 0");
        return -1;
    }
    else
    {
        presupuesto = valor;
        return presupuesto;
    }
}

function mostrarPresupuesto() {
    console.log("Tu presupuesto actual es de " + presupuesto + " €");
}

function CrearGasto(midescripcion, mivalor) {
    let gasto = {
    descripcion : midescripcion,
    valor : parseFloat(mivalor),
    
    MostrarGasto(){
        console.log("Gasto correspondiente a "+ descripcion + " con valor " + valor + " €")
    },

    actualizarDescripcion(ladescripcion){
        descripcion = ladescripcion;
    },
    actualizarValor(elvalor)
    {
        if(elvalor >= 0)
        {
        valor = elvalor;
        }
    }
    };
    
    if(gasto.valor < 0){
        gasto.valor = 0;

    }
    else{
        gasto.valor = valor;
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
