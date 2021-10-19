// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = new Array();
var idGasto = 0;

function actualizarPresupuesto(nuevopresupuesto) {
    // TODO
    if(nuevopresupuesto > 0) {
        presupuesto = nuevopresupuesto;
    } else {
        console.log("Error");
        return -1;
    }
    return presupuesto;
}

function mostrarPresupuesto() {
    // TODO
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion, valor, fecha, etiquetas) {
    // TODO
    if(valor < 0 || isNaN(valor)){
       valor = 0;
    }   
    let gasto = {
        valor : valor,
        descripcion : descripcion,
        fecha : fecha,
        etiquetas : [...etiquetas],

        mostrarGasto : function() {
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        },
        actualizarDescripcion : function(descripcion) {
            this.descripcion  = descripcion;
        },
        actualizarValor : function(valor) {
            if(valor > 0){
                this.valor = valor;
            }            
        }



    }
    return gasto;
}

function listarGastos(){
    return gastos;

}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto+=1;
    gastos.push(gasto);
}

function borrarGasto(id){
    for(let i = 0; i < gastos.length; i++) {
        if(id === gastos[i].id){
            gastos.splice(i, 1);
         }
    }
}

function calcularTotalGastos(){
    
}

function calcularBalance(){
    
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
