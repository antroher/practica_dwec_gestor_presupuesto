// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    let valorDevolver;

    if(valor >= 0){
        presupuesto = parseFloat(valor);
        valorDevolver = presupuesto;
    }
    else{
        console.log("Error. Valor introducido no valido.")
        valorDevolver = -1;
    }
return valorDevolver;
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha = Date.now(), ...etiquetas) {
    // TODO
    if(valor < 0 || isNaN(valor)){
        valor = 0;
    }
    if(etiquetas.length == 0){
        etiquetas = [];
    }
    
    let gasto = {
        descripcion: descripcion,
        valor: valor,
        fecha: (typeof fecha === "string") ? Date.parse(fecha) : fecha,
        etiquetas: [...etiquetas],
        id: idGasto,
        

        mostrarGasto(){
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        },

        actualizarDescripcion(nuevaDescripcion){
            this.descripcion = nuevaDescripcion;
        },

        actualizarValor(nuevoValor){
            let valorDevuelto

            if(nuevoValor >= 0){
                this.valor = nuevoValor;
            }
        },

        anyadirEtiquetas(etiquetas){

        }
    };

    return gasto;
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.idGasto = idGasto;
    idGasto++
    gastos.push(gasto);
}

function borrarGasto(id){
    for(let i = 0; i < gastos.length; i++){
        if(gastos[i].id === id){
            gastos.splice(i, 1);
        }
    }
}

function calcularBalance(){

}

function calcualarTotalGasto(){

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
    calcularTotalGasto,
    calcularBalance
}
