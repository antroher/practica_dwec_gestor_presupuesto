let presupuesto = 0;
function actualizarPresupuesto(presupuesto1) 
{

  if (presupuesto1 == presupuesto)
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

function CrearGasto() {
    // TODO
    
    let gasto = 
    {descripcion:'',

    valor:0}
        
       
        return gasto; 
    function mostrarGasto()
    {
        return 'Gasto correspondiente a '+ gasto.descripcion + 'con valor: ' + gasto.valor;
    }

    function actualizarDescripcion(descripcion)
    {
        gasto.descripcion = descripcion;
        return gasto.descripcion;
    }
    
    function actualizarValor(valor)
        {
            gasto.valor = valor;
            return valor;
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