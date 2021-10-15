// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

var presupuesto='0';
var gastos=[];
var idGasto='0';


function actualizarPresupuesto(canti) {
    // TODO
    if (canti > -1)
    {
        return presupuesto = canti;
    }
    else
    {
        console.log("Error: ha introducido un valor negativo")
         return -1;
    }
}
function mostrarPresupuesto() {
    // TODO
    let x = "Tu presupuesto actual es de " + presupuesto + " €";
    return x;
}


function CrearGasto(descri, v1) {
    // TODO
    v1 = parseFloat(v1)
    if (v1 < 0 || isNaN(v1)){
    v1 = 0;
    }
     let gasto = {
        descripcion: descri + "" ,
        valor: v1
    };

    //METODOS OBJETO GASTO
    gasto.mostrarGasto = function(){
       return "Gasto correspondiente a " + gasto.descripcion + " con valor " + gasto.valor +" €";
    };
    gasto.actualizarDescripcion = function(description){
        gasto.descripcion = description;
    }; 
    gasto.actualizarValor = function(v2){
        if (v2 >= 0){
        gasto.valor = v2;
        }
    }; 

   return gasto;
}
function listarGastos() 
{
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);


}
function borrarGasto(id)
{
    let ind = gastos.findIndex(gasto => gasto.id == id);
    if(ind !== -1){
        gastos.splice(ind, 1);
    }

}

function calcularTotalGastos()
{
    let totalgas = 0;

    for (let i = 0; i < gastos.length; i++) 
    {
        
        totalgas = totalgas + gastos[i].valor;
    }
    return totalgas;

}

function calcularBalance()
{
    let gTotales = calcularTotalGastos();
    let bal = presupuesto - gTotales;
    return bal;


}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
