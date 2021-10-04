// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
'use strict'
var presupuesto=0;

function actualizarPresupuesto(parametro) {
    // TODO
    if(parametro>=0)
    {
            presupuesto+=parametro;
            return presupuesto;
    }else
    {
        alert("Error parametro menor de 0");
        return -1;
    }
    
   
}

function mostrarPresupuesto() {
    // TODO
    return "Tu presupuesto actual es de" +presupuesto+ "€";
}

function CrearGasto() {
    // TODO  Deberá comprobar que el valor introducido sea un núḿero no negativo; en caso contrario, asignará a la propiedad valor el valor 0.
    let gasto = {     // un objeto
        descripcion: "John",  // En la clave "name" se almacena el valor "John"
        valor: 30        // En la clave "age" se almacena el valor 30
      }
    if(gasto>=0)
    {
        return gasto;
    }else gasto.valor=0;

    

}




// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
