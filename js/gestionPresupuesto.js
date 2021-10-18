// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
"use strict"
var presupuesto = 0;
var gastos = new Array();
var idGasto = 0;

function actualizarPresupuesto(newPresupuesto) {
    if(newPresupuesto >= 0){
        presupuesto = newPresupuesto;
    } 
    else {
        console.log("Error presupuesto negativo ");
        return -1;
    }
    return presupuesto;
}

function mostrarPresupuesto() {
    return (`Tu presupuesto actual es de ${presupuesto}€`);
}

function listarGastos(){
    return gastos;
}

function CrearGasto(descripcion, valor, fecha, etiquetas){
    if(valor < 0 || isNaN(valor)){
        valor = 0;
    }
    if(Date.parse (fecha) <0)
    {
        fecha = date.now();
    }
    if(etiquetas == null){
        etiquetas = new Array();
    }
    let gasto = {
        valor : valor,
        descripcion : descripcion,
        etiquetas : etiquetas,
        fecha : fecha,

        mostrarGasto : function() {
            return(`Gasto correspondiente a ${this.descripcion} con valor ${valor} €`);
        },

        actualizarDescripcion : function(descripcion) {
            this.descripcion = descripcion;
        },

        actualizarValor : function(valor) {
            if(valor > 0) {
                this.valor = valor;
            }
        }
    }

    return gasto;
}



function anyadirGasto(idGasto){
    gasto.id = idGasto;
    idGasto = +1;
    gasto.push(gasto);
}

function borrarGasto(idGasto){
    for(let i = 0; i < gastos.length; i++)
    {
        if(gasto[i].id==idGasto)
        {
            gasto.splice(i,1);
        }
    }
}

function calcularTotalGastos(){
    let total = 0;
    for(let i=0; i<gastos.length;i++)
    {
        total = total + gasto[i].valor;
    }
    return total;
}

function calcularBalance(){
    return presupuesto - calcularTotalGastos();
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
    calcularBalance
}
