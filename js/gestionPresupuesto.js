// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
'use strict';
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

function CrearGasto(descripcionR, gastoR=0, fechaR = Date.now(), ...etiquetasR) {
    // TODO  Deberá comprobar que el valor introducido sea un núḿero no negativo; en caso contrario, asignará a la propiedad valor el valor 0.
    
    if (isNaN(Date.parse(fechaR)))
    {
      fechaR=Date.now();
    }
    if(isNaN(gastoR) || (parseFloat(gastoR))<0 || parseFloat(gastoR)==undefined )
    {
      gastoR=0;
    }

    
      this.descripcion= descripcionR ;
      this.valor=parseFloat(gastoR);
      this.fecha=fechaR;
      this.etiquetas=[...etiquetasR];

    
    
    //Metodos del objeto
    this.mostrarGasto = function() {
      return 'Gasto correspondiente a '+this.descripcion+' con valor '+this.valor+' €';
    };
  
    this.actualizarDescripcion=function(parametro)
    {
          this.descripcion=parametro;
    };
    this.actualizarValor=function(parametro){
  
      if(parseFloat(parametro)>0)
      {
        this.valor=parametro;
      }
      
  
    }
    this.mostrarGastoCompleto=function()
    {
      let string= "Gasto correspondiente a descripción del gasto con valor "+this.valor+" €.\nFecha: "+new Date(this.fecha).toLocaleString()+"\nEtiquetas:\n";
      this.etiquetas.forEach(etiqueta => {
        string +="- "+etiqueta+"\n";
        
      });
      return string;
    }
    this.actualizarFecha=function(fechaR)
    {
        if(!isNaN(Date.parse(fechaR)))
        {
          this.fecha=Date.parse(fechaR);
        }
    }
    this.borrarEtiquetas=function(...parametros)
    {
    
      parametros.forEach(et => {
        if(this.etiquetas.includes(et))
        {
          this.etiquetas.splice(this.etiquetas.indexOf(et),1);
        }
      } );
    }
    this.anyadirEtiquetas=function(...parametros)
    {
        /*Función de un *número indeterminado de parámetros* que añadirá las etiquetas pasadas como parámetro a la propiedad ~etiquetas~ del objeto.
         *Deberá comprobar que no se creen duplicados*.*/ 
        parametros.forEach(et => {
          if(!this.etiquetas.includes(et))
          {
           this.etiquetas.push(et);
          }
        } );

    }
    this.obtenerPeriodoAgrupacion=function(parametro)
    {
      /*Función de un parámetro que devolverá el período de agrupación correspondiente al parámetro periodo de la función y a la fecha del gasto. Si el período a agrupar es dia,
     el período de agrupación tendrá el formato aaaa-mm-dd; si es mes, tendrá el formato aaaa-mm; y si es anyo, tendrá el formato aaaa*/ 
        let fecha=new Date(this.fecha);
        let dia,mes,año;
        dia=fecha.getDate()<10 ? "0"+(fecha.getDate()):fecha.getDate() ;
        mes=fecha.getMonth()<9 ? "0"+(fecha.getMonth()+1):fecha.getMonth()+1 ;
        año=fecha.getFullYear();

        switch(parametro)
        {
          case "dia":
            return año+"-"+mes+"-"+dia;
            case "mes":
                return año+"-"+mes;
              case "anyo":
                  return año;
                default:
                  return "error";
        }
    }
    //comprobar fecha con Date.parse si es numero bien sino gg
    let aEtiquetas= new Array();
    if(etiquetasR==undefined)
  {
    this.etiquetas=aEtiquetas;
  }else{
    this.etiquetas=etiquetasR;
  }
  if(fechaR==undefined)
  {
    this.fecha=Date.now().toString();
  }else
  {
    if(isNaN(Date.parse(fechaR)))
    {
      console.log("error fecha is not a number")
    }else
    {
      this.fecha=Date.parse(fechaR);
    }
  }

    if(gastoR>=0)
    {
       
    }else gastoR=0;
    


   //return gasto;

    

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

//Enunciados 3
function filtrarGastos(parametro)
{
  /*Función de un parámetro que devolverá un subconjunto de los gastos existentes (variable global gastos). Se deberá utilizar la función filter.
   El parámetro será un objeto que podrá tener las siguientes propiedades:

fechaDesde - Fecha mínima de creación del gasto. Su valor deberá ser un string con formato válido que pueda entender la función Date.parse.
fechaHasta - Fecha máxima de creación del gasto. Su valor deberá ser un string con formato válido que pueda entender la función Date.parse.
valorMinimo - Valor mínimo del gasto.
valorMaximo - Valor máximo del gasto.
descripcionContiene - Trozo de texto que deberá aparecer en la descripción.
etiquetasTiene - Array de etiquetas: si un gasto contiene alguna de las etiquetas indicadas en este parámetro, se deberá devolver en el resultado.*/ 
var fechaD,fechaH,valorM,valorm,descripcionC,etiquetasT;
var  gastosFiltrados=[];


if(parametro==null || parametro==undefined || Object.entries(parametro)==0 )
{
  return gastos;
}

if (parametro.hasOwnProperty('fechaDesde'))
{
  
  if(typeof parametro.fechaDesde==='string')
  {
    
    if(Date.parse(parametro.fechaDesde))
    {
      fechaD=parametro.fechaDesde;
    }
  }
}
if (parametro.hasOwnProperty('fechaHasta'))
{
  
  if(typeof parametro.fechaHasta==='string')
  {
    
    if(Date.parse(parametro.fechaHasta))
    {
      fechaH=parametro.fechaHasta;
    }
  }
}
if (parametro.hasOwnProperty('valorMinimo'))
{
  valorm=parametro.valorMinimo;
  
}
if (parametro.hasOwnProperty('valorMaximo'))
{
  valorM=parametro.valorMaximo;
  
}
if (parametro.hasOwnProperty('descripcionContiene'))
{
  descripcionC=parametro.descripcionContiene;
  
}
if (parametro.hasOwnProperty('etiquetasTiene'))
{
  etiquetasT=parametro.etiquetasTiene;
  
}



gastosFiltrados=gastos.filter(function(item){
  let devuelve = true;
  let latiene=true;

  if(typeof fechaD !== 'undefined')
  {
    
    if(item.fecha<Date.parse(fechaD))
    {
     
      devuelve=false;
    }
  }
  
  if(typeof fechaH !== 'undefined')
  {
    if(item.fecha>Date.parse(fechaH))
    {
      devuelve=false;
    }
  }
  if(typeof valorm!=='undefined')
  {
   
    if(valorm>item.valor)
    {
      devuelve=false;
    }
  }
  if(typeof valorM!=='undefined')
  {
   
    if(valorM<item.valor)
    {
      devuelve=false;
    }
  }
  if(typeof descripcionC!=='undefined')
  {
    if(!item.descripcion.includes(descripcionC))
    {
      devuelve=false;
    }
    
  }
  if(etiquetasT!==undefined  && etiquetasT.length!==0 ) 
  {
    latiene=false;
      for (let index = 0; index < etiquetasT.length; index++) {
        if(item.etiquetas.includes(etiquetasT[index]))
        {
          
          latiene=true;
        }
        
      }
      
  }
 
  
  if(devuelve && latiene)
  {
   
    return item;
  }

});
return gastosFiltrados;

}




function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {

/*Función de cuatro parámetros que devolverá un objeto con los resultados de realizar una agrupación por período temporal. Los parámetros son:

periodo - Período utilizado para hacer la agrupación. Podrá ser uno de estos tres valores: dia, mes y anyo. El valor por defecto será mes.
etiquetas - Array de etiquetas. Solo se seleccionarán los gastos que contengan alguna de esas etiquetas. Si no se indica o es un array vacío, se considerarán todos los gastos.
fechaDesde - Fecha mínima de creación del gasto. Su valor deberá ser un string con formato válido que pueda entender la función Date.parse. Si no se indica se considerarán todos los gastos independientemente de su fecha.
fechaHasta - Fecha máxima de creación del gasto. Su valor deberá ser un string con formato válido que pueda entender la función Date.parse. Si no se indica se considerará la fecha actual.
La función realizará los siguientes pasos:

En primer lugar se llamará a filtrarGastos para obtener el subconjunto de gastos creados entre las fechas indicadas y que tengan alguna de las etiquetas proporcionadas en el parámetro correspondiente.
Ejecutar reduce sobre el conjunto de gastos filtrados. El valor inicial del acumulador de reduce será un objeto vacío. Dentro del cuerpo de la función de reduce, para cada gasto se obtendrá su período de agrupación (a través del método obtenerPeriodoAgrupacion del gasto y el parámetro periodo), que se utilizará para identificar la propiedad del acumulador sobre la que se sumará su valor. Así, si periodo = mes, un gasto con fecha 2021-11-01 tendrá un período de agrupación 2021-11, por lo que su valor se sumará a acc["2021-11"] (siempre que la variable del acumulador haya recibido el nombre acc en la llamada a reduce). Tienes una pista sobre cómo proceder en la siguiente pregunta de Stack Overflow.
El resultado de reduce será el valor de vuelta de la función agruparGastos.*/
  var filtro = {etiquetasTiene : etiquetas, fechaDesde, fechaHasta}

  var returnFiltrarGastos = filtrarGastos(filtro);
  
  var agrupacion =
          returnFiltrarGastos.reduce((acc, item, index, returnFiltrarGastos) => {
             
              var reduce = item.obtenerPeriodoAgrupacion(periodo);
              if (acc[reduce] == null)
              {
                acc[reduce] = item.valor;
              }else 
              {
                acc[reduce] += item.valor;
              }
              return acc;
          }, {});
  return agrupacion;
}


//Regex
function transformarListadoEtiquetas(etiqueta){

  return etiqueta.match(/\w+/g);
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
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas
}
