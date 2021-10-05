// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;

function actualizarPresupuesto(presupuesto) {
    let res;
    if(detectarNegativo(presupuesto))
    {
        res= presupuesto;
    }
    else
    {
        console.log("El presupuesto introducido no es válido.");
        res= -1;
    }
    return res;
}

function mostrarPresupuesto(presupuesto) {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function crearGasto(des, v){
    if(!detectarNegativo(v))
        v=0;

    let gasto = {
        descripcion=des,
        valor=v,

        mostrarGasto(){
            console.log(`Gasto correspondiente a ${gasto.descripcion} con valor ${gasto.valor} €`);
        },
        actualizarDescripcion(des){
            gasto.descripcion=des;
        },
        actualizarValor(v){
            if(detectarNegativo(v))
                gasto.valor=v;
        }
      };
    return gasto;
}

function detectarNegativo(num){
    if(num>=0)
        return true;
    else
        return false;
}




// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    crearGasto
}

