// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
'use strict'
var presupuesto=0;
var gastos = new Array();
var idGasto=0;

function actualizarPresupuesto(parametro) {
    // TODO
    if(parametro>=0)
    {
            presupuesto=parametro;
            return presupuesto;
    }else
    {
       console.log("No es un número positivo");
        return -1;
    }
    
   
}

function mostrarPresupuesto() {
    // TODO
    return "Tu presupuesto actual es de " +presupuesto+ " €";
}

function CrearGasto(descripcionR,gastoR,fechaR,...etiquetasR) {
    // TODO  Deberá comprobar que el valor introducido sea un núḿero no negativo; en caso contrario, asignará a la propiedad valor el valor 0.
 
    //comprobar fecha con Date.parse si es numero bien sino gg
    let aEtiquetas= new Array();
    if(etiquetasR==undefined)
  {
    gasto.etiquetas=aEtiquetas;
  }else{
    gasto.etiquetas=etiquetasR;
  }
  if(fecha==undefined)
  {
    gasto.fecha=Date.now().toString();
  }else
  {
    if(Date.parse(fechaR).isNaN())
    {
      console.log("error fecha is not a number")
    }else
    {
      gasto.fecha=Data.parse(fechaR);
    }
  }

    if(gastoR>=0)
    {
       
    }else gastoR=0;
    let gasto = {
        descripcion: descripcionR,  
        valor: gastoR   ,
        fecha:1,
        etiquetas: ""

      }
      //Metodos del objeto
      gasto.mostrarGasto = function() {
        return 'Gasto correspondiente a '+gasto.descripcion+' con valor '+gasto.valor+' €';
      };
    
      gasto.actualizarDescripcion=function(parametro)
      {
            gasto.descripcion=parametro;
      };
      gasto.actualizarValor=function(parametro){
    
        if(parseFloat(parametro)>0)
        {
          gasto.valor=parametro;
        }
        
    
      }


   return gasto;

    

}


//Enunciados 2

function listarGastos() {
  // TODO
  return gastos;
}
function anyadirGasto(gasto)
{

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
     calcularTotalGastos ,
      calcularBalance
}
