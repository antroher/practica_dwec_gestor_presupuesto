// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
"use strict";
var presupuesto=0;
var idGasto=0;
var gastos=[];

function actualizarPresupuesto(valor) {
    if(valor>=0 ){

        presupuesto=valor;
        return presupuesto;

    }else{

        console.log("ERROR -> Valor negativo.");
        return -1;
    } 
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de "+presupuesto+" €"
}

function CrearGasto(desc  , datoValor, datoFecha, ...arrayEtiquetas) {
    
    if(datoValor<0 || isNaN(datoValor))datoValor=0;
    if(datoFecha===undefined || isNaN(Date.parse(datoFecha)))datoFecha=new Date(Date.now()).toISOString().substring(0,16);
    if(arrayEtiquetas===undefined)arrayEtiquetas=[];
    let gasto={
        descripcion:desc+"",
        valor:parseFloat(datoValor),
        fecha:Date.parse(datoFecha),
        etiquetas:arrayEtiquetas,
        mostrarGasto:function(){
            return "Gasto correspondiente a "+this.descripcion+" con valor "+this.valor+" €";
        },
        actualizarDescripcion:function(desc){
            if(desc !=null && desc !="") this.descripcion=desc;
        },
        actualizarValor:function(dato){
            if(parseFloat(dato)>0)this.valor=dato;
        },
        mostrarGastoCompleto(){
            let cadenaMostrar="Gasto correspondiente a "+this.descripcion+" con valor "+this.valor+" €.\n"+
            "Fecha: "+new Date(this.fecha).toLocaleString()+"\n"+
            "Etiquetas:\n";
            if(this.etiquetas.length>0){
                this.etiquetas.forEach(cad => {
                    cadenaMostrar=cadenaMostrar+"- "+cad+"\n"
                });
            }
            return cadenaMostrar;
        },
        actualizarFecha(datoActFecha){
            if(!isNaN(Date.parse(datoActFecha))){
                this.fecha=Date.parse(datoActFecha);
            }
        },
        anyadirEtiquetas(...datosEtiquetas){
            datosEtiquetas.forEach(e => {
                if(typeof(e)=="string" && !this.etiquetas.includes(e)){
                    this.etiquetas.push(e);
                }
            });
        },
        borrarEtiquetas(...eliminarEtiquetas){
            eliminarEtiquetas.forEach(e => {
                if(this.etiquetas.includes(e)){
                    this.etiquetas.splice(this.etiquetas.indexOf(e),1);
                }
            });
        }
    };
    return gasto;
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gastoAnyadir){
    if(gastoAnyadir!==undefined && gastoAnyadir!==null){
        gastoAnyadir.id=idGasto;
        gastos.push(gastoAnyadir);
        idGasto++;
    }
    
}

function calcularTotalGastos(){
    let totalGastos=0;
    gastos.forEach(g => {
        totalGastos=parseFloat(totalGastos+g.valor);
    });
    return totalGastos;
}

function calcularBalance(){
    return presupuesto-calcularTotalGastos();
}

function borrarGasto(idObjeto){
    gastos.forEach(g => {
        if(g.id==idObjeto){
            gastos.splice(gastos.indexOf(g),1);
        }
    });
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    borrarGasto,
    anyadirGasto,
    listarGastos,
    calcularBalance,
    calcularTotalGastos
    
}
