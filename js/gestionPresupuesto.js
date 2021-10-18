'use strict'
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto=0;
var gastos=[];
var idGasto=0;


function actualizarPresupuesto(presup) 
{
    
    if(presup>=0)
    {
        presupuesto=presup;
        return presupuesto;       
    }
    else
    {      
        console.log(`El dato introducido es erroneo.`);
        return -1;  
    }
    
}

function mostrarPresupuesto() 
{
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(desc, val, fec = Date.now(), ...etiq=[])
{
    if(parseFloat(val)<0 || isNaN(val))
    {
        val=0;
    }
    Date.parse(fec);
    
  let gasto={
      descripcion:desc,
      valor: val,
      etiquetas: [...etiq],
      fecha: (typeof fec === 'string') ? Date.parse(fec) : fec,
    mostrarGasto()
      {
          return(`Gasto correspondiente a ${gasto.descripcion} con valor ${gasto.valor} €`);
      },

    actualizarDescripcion(desc)
        {
            gasto.descripcion=desc;
        },

    actualizarValor(val)
            {
            if(parseFloat(val)>0)
                {
                     gasto.valor=val;
                }
            }
        } 
  return gasto;
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(){

}

function borrarGasto(){

}

function calcularTotalGastos(){

}
function calcularBalance(){

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
    calcularBalance,

}

