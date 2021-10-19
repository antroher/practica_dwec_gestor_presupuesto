// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    let valorfinal;
    if(valor < 0 || isNaN(valor))
    {
        console.log("Error, el presupuesto no puede ser menor que 0");
        valorfinal = -1;
    }
    else
    {
        presupuesto = valor;
        valorfinal = presupuesto;
    }
    return valorfinal;
}

function listarGastos(){
    return gastos;
}

function mostrarPresupuesto() {
    console.log("Tu presupuesto actual es de " + presupuesto + " €");
    return ("Tu presupuesto actual es de " + presupuesto + " €");
}

function CrearGasto(midescripcion, mivalor, mifecha = Date.now(), ...misetiquetas) {
    if(mivalor < 0 || isNaN(mivalor))
    {
        mivalor = 0;
    }
    
    let gasto = {
    descripcion: midescripcion,
    valor: parseFloat(mivalor),
    
    mostrarGasto() {
        console.log("Gasto correspondiente a "+ gasto.descripcion + " con valor " + gasto.valor + " €")
        return ("Gasto correspondiente a "+ gasto.descripcion + " con valor " + gasto.valor + " €");
    },

    actualizarDescripcion(ladescripcion) {
        this.descripcion = ladescripcion;
    },
    actualizarValor(elvalor) 
    {
        if(elvalor >= 0)
        {
         this.valor = elvalor;
        }
    }
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
