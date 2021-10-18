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

function CrearGasto(descripcionR, gastoR, fechaR = Date.now(), ...etiquetasR) {
    // TODO  Deberá comprobar que el valor introducido sea un núḿero no negativo; en caso contrario, asignará a la propiedad valor el valor 0.
    
    if (isNaN(Date.parse(fechaR)))
    {
      fechaR=Date.now();
    }

    let gasto = {
      descripcion: descripcionR ,  
      valor: (gastoR==undefined) ? 0:parseFloat(gastoR),
      fecha:fechaR,
      etiquetas:[...etiquetasR]

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
    gasto.mostrarGastoCompleto=function()
    {
      let string= "Gasto correspondiente a descripción del gasto con valor "+gasto.valor+" €.\nFecha: "+new Date(gasto.fecha).toLocaleString()+"\nEtiquetas:\n";
      gasto.etiquetas.forEach(etiqueta => {
        string +="- "+etiqueta+"\n";
        
      });
      return string;
    }
    gasto.actualizarFecha=function(fechaR)
    {
        if(!isNaN(Date.parse(fechaR)))
        {
          gasto.fecha=Date.parse(fechaR);
        }
    }
    gasto.borrarEtiquetas=function(...parametros)
    {
      /*Función de un número indeterminado de parámetros que recibirá uno o varios nombres de etiquetas y procederá a eliminarlas 
      (si existen) de la propiedad etiquetas del objeto.*/ 
      gasto.etiquetas.forEach(et => {
        if(et==gasto.id)
        {
          gasto.etiquetas.splice(gasto.etiquetas.indexOf(et),1);
        }
      });
    }
    //comprobar fecha con Date.parse si es numero bien sino gg
    let aEtiquetas= new Array();
    if(etiquetasR==undefined)
  {
    gasto.etiquetas=aEtiquetas;
  }else{
    gasto.etiquetas=etiquetasR;
  }
  if(fechaR==undefined)
  {
    gasto.fecha=Date.now().toString();
  }else
  {
    if(isNaN(Date.parse(fechaR)))
    {
      console.log("error fecha is not a number")
    }else
    {
      gasto.fecha=Date.parse(fechaR);
    }
  }

    if(gastoR>=0)
    {
       
    }else gastoR=0;
    


   return gasto;

    

}


//Enunciados 2

function listarGastos() {
  // TODO
  return gastos;
}
function anyadirGasto(gasto)
{
  /*Función de 1 parámetro que realizará tres tareas:
Añadir al objeto gasto pasado como parámetro una propiedad id cuyo valor será el valor actual de la variable global idGasto.
Incrementar el valor de la variable global idGasto.
Añadir el objeto gasto pasado como parámetro a la variable global gastos. El gasto se debe añadir al final del array.*/
gasto.id=idGasto;
idGasto++;
gastos.push(gasto);
}

function borrarGasto(id)
{
  //Función de 1 parámetro que eliminará de la variable global gastos el objeto gasto cuyo id haya sido pasado como parámetro. Si no existe un gasto con el id proporcionado, no hará nada.
  if(id==undefined)
  {

  }else
  {
   gastos.forEach(gasto => {
     if(gasto.id==id)
     {
       gastos.splice(gastos.indexOf(gasto),1);
     }
   });
    
  }
  
}

function calcularBalance()
{
//Función sin paràmetros que devuelva el balance (presupuesto - gastos totales) disponible.
// De momento no lo obtendremos por período temporal (lo haremos en sucesivas prácticas). Puede utilizar a su vez la función calcularTotalGastos.
return presupuesto-calcularTotalGastos();
  

}

function calcularTotalGastos()
{
  //Función sin parámetros que devuelva la suma de todos los gastos creados en la variable global gastos. De momento no los agruparemos por período temporal (lo haremos en sucesivas prácticas).
  let sumaGastos=0;
  for (let index = 0; index < gastos.length; index++) {
    
    sumaGastos+=gastos[index].valor;
    
  }
  return sumaGastos;
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
