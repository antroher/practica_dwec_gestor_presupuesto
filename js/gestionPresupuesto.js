// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
var presupuesto = 0;
// TODO: Variable global


function actualizarPresupuesto(valores) {
    let DevolverValor = 0;
    if(valores < 0 || isNaN(valores))
    {
        console.log("Error numero negativo");
        DevolverValor = -1;        
    }
    else
    {
        presupuesto = valores;
        DevolverValor = presupuesto;
    }
    return DevolverValor;
}

function mostrarPresupuesto() {  
     console.log(`Tu presupuesto actual es de ${presupuesto} €`)
     return(`Tu presupuesto actual es de ${presupuesto} €` )

}

function CrearGasto(descripcionIn,valorIn) {
        if(valorIn < 0 || isNaN(valorIn)){
            valorIn = 0;
        }
    let gasto = {
        descripcion:descripcionIn,
        valor:parseFloat(valorIn),
    

         mostrarGasto() {
            console.log(`Gasto correspondiente a ${gasto.descripcion} con valor ${gasto.valor} €`);
            return(`Gasto correspondiente a ${gasto.descripcion} con valor ${gasto.valor} €`);
        },

        actualizarDescripcion(NewDescripcion){
            gasto.descripcion = NewDescripcion;
        },
        actualizarValor(NewValor){
            if(NewValor >= 0)
            {
                gasto.valor= NewValor;
            }
        }
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
