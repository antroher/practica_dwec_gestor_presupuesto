// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

var presupuesto='0';
function actualizarPresupuesto(valor) {
    // TODO
    if(valor>0)
    {
        presupuesto=valor;
    }
    else{
        console.log("Error,ha introducido un valor negativo")
        valor= -1;
    } 
    return presupuesto;
}
function mostrarPresupuesto() {
    // TODO
    alert('Tu presupuesto es de '+ presupuesto+	'\u20AC')
}


function CrearGasto(descrip,valid) {
    // TODO

    {
       if(detectarNegat(val)==false)
         {
            val=0;
        }
        
        let gasto={
            descripcion:descrip,
            valor: valid,
        }
        return gasto;
        }

    };
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
