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

function CrearGasto(desc, val, fec = Date.now(), ...etiq)
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
            this.descripcion=desc;
        },

    actualizarValor(val)
        {
            if(parseFloat(val)>0)
                {
                     this.valor=val;
                }
            }
        }

    anyadirEtiquetas(...etiq)
        {
            for(let elem of etiq)
            {
                if(!this.etiquetas.includes(elem))
                {
                    this.etiquetas.push(elem);
                }
            }
        }

    actualizarFecha(fec)
        {
            fec=date.parse(fec);
            if(fec!=NaN)
            {
                fec=fecha;
            }
        }
    borrarEtiquetas(...etiq)
        {
            for(let elem of etiq)
            {
                {
                    if(this.etiquetas.includes(etiq))
                    {
                        this.etiquetas.splice(this.etiquetas.indexOf(elem),1)
                    }
                }
            }
        }
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id=idGasto;
    idGasto += 1;
    gastos.push(gasto);
}

function borrarGasto(iden)
{
   for(let i=0; i <gastos.length; i++)
   {
       if(iden == gastos[i].id)
       {
           gastos.splice(i,1);
       }
   }
}

function calcularTotalGastos(){
    let total=0;
    for(let i=0; i < gastos.length;i++)
    {
        total= total + gastos[i].valor;
    }
    return total;
}
function calcularBalance(){
    let balance= presupuesto- calcularTotalGastos();
    return balance;
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

