'use strict'
let presupuesto = 0;
let gastos = [];
let idGasto = 0; 
function actualizarPresupuesto(presupuesto1) 
{

  if (presupuesto1 === presupuesto)
  {
        return 0;
  }
    
  else
  {
    if (isNaN(presupuesto1))
    {
        return -1;

    }
    else
    {
        if (presupuesto1>0)
        {
            presupuesto = presupuesto1;
            return presupuesto;

            
        }
    
       
        else if (presupuesto1 <0)
        {
            
            return -1;
        }
    }
  }

   


}

function mostrarPresupuesto() {
    
   return 'Tu presupuesto actual es de '+ presupuesto + ' €'
    
}

function CrearGasto(descripcion, valor,fecha,...etiquetas) 
{
    // TODO
    this.descripcion=descripcion;
    if(valor > 0)
    {
       this.valor=valor;
    }
    else
    {
        this.valor = 0;
    }
    
    if (etiquetas.length === 0)
    {
            this.etiquetas = new Array();
    }
    else
    {
            this.etiquetas = etiquetas;
    }
    if (fecha)
    {
        this.fecha = Date.parse(fecha)
    }
    else
    {
        this.fecha = Date.now(fecha);
    }
    

       
       this.mostrarGasto = function(){
        return 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €' ;
       }

       this.mostrarGastoCompleto = function()
        {
            let fecha2 = new Date(this.fecha).toLocaleString();
            let almacen_etiquetas = "";
            for (let i = 0; i<etiquetas.length; i++)
            {
                almacen_etiquetas += `- ` + this.etiquetas[i]+'\n';
            }
            return 'Gasto correspondiente a ' + this.descripcion+ ' con valor ' + valor+' €.\n'+
            'Fecha: '+ fecha2+'\n'+
            'Etiquetas:\n' + almacen_etiquetas;


        }    
       
       this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
        return this.descripcion;
       }
       this.actualizarValor = function(valor)
       {
        if (isNaN(valor)){
            return this.valor;
           }
          
           else if(valor<0)
           {
            return this.valor;   
           }
           else
           {
            this.valor = valor;
            return this.valor;
           }

       }
       this.actualizarFecha = function(fecha_nueva) 
    {
        if (Date.parse(fecha_nueva))
        {
            fecha = Date.parse(fecha_nueva)
            this.fecha = fecha;
        }
    }

       this.anyadirEtiquetas = function(...nuevaetiqueta) 
    {

        for (let i = 0; i < nuevaetiqueta.length; i++)
        {
            let encontrado = this.etiquetas.includes(nuevaetiqueta[i]) 

            if(encontrado == false)
            {
                this.etiquetas.push(nuevaetiqueta[i]);
            }
        }
    }

        this.borrarEtiquetas = function(...borraretiqueta)
        {
            for (let i = 0; i < borraretiqueta.length; i++)
            {
                let pos = this.etiquetas.indexOf(borraretiqueta[i])
    
                if (pos >= 0) 
                {
                    this.etiquetas.splice(pos, 1)
                }
            }
        }
        
        this.obtenerPeriodoAgrupacion = function(Periodo){

            let  nueva_fecha= new Date(fecha).toISOString();
            let fecha_agrupada = "";
    
            if(Periodo == "dia"){
                fecha_agrupada = nueva_fecha.substr(0,10);
            }else if(Periodo == "mes"){
                fecha_agrupada = nueva_fecha.substr(0,7);
            }else if(Periodo == "anyo"){
                fecha_agrupada = nueva_fecha.substr(0,4);
            }
            return fecha_agrupada;
        }
    }
        
        
}

       

    
    

function listarGastos()
{
     
    
    return gastos;
    
    
    
}

function anyadirGasto(gasto)
{
    gasto.id = idGasto;

    idGasto = idGasto + 1;

    gastos.push(gasto);
}

function borrarGasto(id)
{
    let posicion = gastos.findIndex(gasto => gasto.id === id)
    if (posicion >= 0)
    {
        gastos.splice(posicion, 1)
    }
}

function calcularTotalGastos()
{
    let totalgastos = 0;

    for (let i = 0; i < gastos.length; i++)
    {
        totalgastos = totalgastos + gastos[i].valor;
    }
    return totalgastos;
}
function calcularBalance()
{
    let balance;

    balance = presupuesto - calcularTotalGastos();

    return balance;
} 
function filtrarGastos()
{

} 
function agruparGastos()
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
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
}