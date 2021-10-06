'use strict'
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto=0;


function actualizarPresupuesto(presup) 
{
    
    if(detectarNegat(parseFloat(presup)) == false)
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

function mostrarPresupuesto(presup) 
{
    return `Tu presupuesto actual es de: ${this.presupuesto}€`;
}

function CrearGasto(desc, val)
{
    if(detectarNegat(val) == true)
    {
        val=0;
    }

  let gasto={
      descripcion:desc,
      valor: val,
      mostrarGasto()
      {
          return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
      }

    
  };
  return gasto;
}

function detectarNegat(num)
{
    if(num>=0)
    {
        return false;
    }
    else
        return true;
}

function actualizarDescripcion(desc)
{
    gasto.descripcion=desc;
}

function actualizarValor()
{
    if(detectarNegat(val)==true)
    {
        gasto.valor=v;
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

