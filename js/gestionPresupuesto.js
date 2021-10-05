// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;


function actualizarPresupuesto(Numero) {
let devolver = 0;
    if(presupuesto >= Numero)
    {
        presupuesto = Numero;
        devolver = presupuesto;
    }
    else
    {
        console.log("Error, Numero negativo invalido");
        devolver = -1;
    }
    return devolver;
}

function mostrarPresupuesto() {
    console.log("Tu presupuesto actual es de" + presupuesto + "€");
    return ( "siendo" + presupuesto + " el Numero de la variable global presupuesto");
}

function CrearGasto(Numero,Cadena) {
    let gasto = {
        descripcion: Cadena,
        valor: Numero,

        mostrarGasto(){
            console.log("Gasto correspondiente a "+ descripcion 
                +"con " + Numero+" €");
        },
        actualizarDescripcion(descripcion){
            descripcion = descripcion;
            return descripcion;
        },
        actualizarValor(valor){
            let devolver;
            if(valor >= 0)
            {
                devolver = valor;
            }
            return devolver;
        }
    }
}


/*tres metodos internos de gastos objeto gasto definido con export{}
esa funcion devulve dicho objeto */

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
