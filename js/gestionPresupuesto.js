// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto=0;

function actualizarPresupuesto(valor) {
    if(parseInt(valor)>0){
        presupuesto=valor;
        return presupuesto;
    }else{
        alert("ERROR -> Valor negativo.")
        return -1;
    } 
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de "+presupuesto+" €"
}

function CrearGasto(desc , datoValor) {
    let v=datoValor;
    if(parseFloat(valor)<0)v=0;
    let gasto={
        descripcion:desc+"",
        valor:parseFloat(v),
        mostrarGasto:function(){
            return "Gasto correspondiente a "+this.descripcion+" con valor "+this.valor+" €.";
        },
        actualizarDescripcion:function(desc){
            if(desc !=null && desc !="") this.descripcion=desc;
        },
        actualizarValor:function(dato){
            if(parseFloat(dato)>0)this.valor=dato;
        }
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
