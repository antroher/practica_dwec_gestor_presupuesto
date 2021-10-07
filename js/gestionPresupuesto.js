// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;


function actualizarPresupuesto(NewValu) {
let devolver = 0;
    if(presupuesto >= NewValue)
    {
        presupuesto = NewValue;
        devolver = presupuesto;
    }
    else
    {
        console.log("Error, NewValue negativo invalido");
        devolver = -1;
    }
    return devolver;
}

function mostrarPresupuesto() {
    console.log ("Tu presupuesto actual es de" + presupuesto + "€");
    return ("Tu presupuesto actual es de" + presupuesto + "€");
}

function CrearGasto(NewValu,NewDescriptio) {
    if(NewValue < 0 || isNaN(NewValue)){
        NewValue = 0;
    }
    let gasto = {
        descripcion: NewDescription,
        valor: NewValue,

        mostrarGasto(){
            console.log("Gasto correspondiente a "+ descripcion + "con " + NewValue +" €");
            return ("Gasto correspondiente a "+ descripcion + "con " + NewValue +" €")
        },
        actualizarDescripcion(NewDescription){
            this.descripcion = NewDescription;
        },
        actualizarValor(NewValue){
            let devolver;
            if(NewValue >= 0)
            {
                this.valor = NewValue;
            }
        }
    }
    return gasto;
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
