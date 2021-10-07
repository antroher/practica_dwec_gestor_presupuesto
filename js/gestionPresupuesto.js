// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global


function actualizarPresupuesto() {
    // TODO
}

function mostrarPresupuesto() {
    // TODO
}

function CrearGasto() {
    // TODO
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}

let presupuesto = 0;
let presupuesto1 =

function actualizarPresupuesto(presupuesto1)
{
    if (presupuesto<0)
    {
        alert('EL numero que has introducido no es valido');
        return -1;
    }

    else
    {
        presupuesto = presupuesto1;
        return presupuesto;
    }

}

function mostrarPresupuesto()
{
    return 'Tu presupuesto actual es de ' + presupuesto;
}

function CrearGasto(descripcion, valor )
{
    if (valor<0)
    {
        valor=0;
    }
    let gasto = 
    {}
        obj.descripcion = descripcion;
        obj.valor = valor;

        return gasto;
        
    
    
}

function mostrarGasto()
{
    return 'Gasto correspondiente a '+ gasto.descripcion + ''  
}

