// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;

function actualizarPresupuesto(valores) {

    if(parseFloat(valores) > 0)
    {
        presupuesto = valores;
        return valores;
    }else{
        console.log("ha introducido un numero negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    console.log("Tu presupuesto actual es de "+ presupuesto +"€");
}

function CrearGasto(Valor, Descripcion) {
    let gasto = {
        valor: Valor,
        descripcion: Descripcion
    };
    gasto.mostrarGasto= function (){
        console.log("Gasto correspondiente a "+descripcion+ " con valor VALOR "+ valor +"€")
        }
    gasto.actualizarDescripcion = function(actualizarDescripcion){
        gasto.descripcion = actualizarDescripcion;
        }
    gasto.actualizarValor = function (actualizarValor){
        gasto.valor = actualizarValor;
        }
    if(parseFloat(valor) > 0)
    {
        gasto = valor;
        return valor;
    }else{
        valor = 0;
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
