
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto= 0;

function actualizarPresupuesto(valor) {
    // TODO     
    if(valor<0){
         
        console.log("Error al introducir el valor")
        return -1;  
             
    }
    else{
        return presupuesto = valor;
    }
    

}

function mostrarPresupuesto() {
    
    let res = "Tu presupuesto actual es de " + presupuesto + " €";
    return res;
}

function CrearGasto(descrip, valoR) {
    // TODO
    valoR = parseFloat(valoR)
    if (valoR < 0 || isNaN(valoR)){
    valoR = 0;
    }
     let gasto = {
        descripcion: descrip + "" ,
        valor: valoR
    };

    gasto.mostrarGasto = function(){
       return "Gasto correspondiente a " + gasto.descripcion + " con valor " + gasto.valor +" €";
    };
    gasto.actualizarValor = function(val){
        
        if (val >= 0){
        gasto.valor = val;
        }
    };
    gasto.actualizarDescripcion = function(descrip){
        gasto.descripcion = descrip;
    }; 
     
    
    

   return gasto;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
