// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
'use strict'
var presupuesto=0, idGasto=0;
var gastos=[];


function actualizarPresupuesto(pre){
   
    if(pre>=0)
    {
        presupuesto= pre;
        return presupuesto;
    }
    else
    {
        console.log("El presupuesto introducido no es válido.");
        return -1;
    }
   
}
function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}
function CrearGasto(des, v, fec=Date.now(), ...etiq){
    if((parseFloat(v)<0) || isNaN(v))
        v=0;
        

    let gasto = {
        descripcion:des,
        valor:v,
        etiquetas : [...etiq],
        fecha:(typeof fec==='string') ? Date.parse(fec) : fec,

        mostrarGasto(){
            return 'Gasto correspondiente a '+gasto.descripcion+' con valor '+gasto.valor+' €';
        },
        actualizarDescripcion(des){
            gasto.descripcion=des;
        },
        actualizarValor(val){
            if(parseFloat(val)>0)
            {
                gasto.valor=val;
            }       
        }
      };
    return gasto;
}

function listarGastos(){
    return gastos;
}
function anyadirGasto(){
    
}
function borrarGasto(){
    
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
    calcularBalance
}

