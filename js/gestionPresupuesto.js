// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
"use strict"
var presupuesto = 0;
var gastos = [];
function actualizarPresupuesto(valores) {

    if (parseFloat(valores) >= 0) {
        presupuesto = valores;
        return valores;
    } else {
        console.log("ha introducido un numero negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    return 'Tu presupuesto actual es de ' + presupuesto + ' €';
}

function CrearGasto(descr, val, fechaCreacion, ...etiquetas) {

    let gasto = {
   id = idgasto,
   descripcion = descr,
   etiquetas = new Array(),
   date = Date.now(),
   valor = null,
   fecha = null
    }

    if (parseFloat(val) >= 0) {
        gasto = {
            descripcion: descr,
            valor: val           
        };
    }

    else {

        gasto = {
            descripcion: descr,
            valor: 0
        };
        gastos += gasto;
        idgasto ++;
    }
    if(fechaCreacion==undefined || isNaN(Date.parse(fechaCreacion))){
        gasto.fecha = new Date(Date.now()).toISOString().substring(0,16);
        }else{
            gasto.fecha = Date.parse(fechaCreacion);
        }
    gasto.mostrarGastoCompleto = function(){
        let resp = `Gasto correspondiente a ${descr} con valor ${valor} €.
        Fecha: ${fechalocale}
        Etiquetas:\n`

        for(let i =0;i<etiquetas.length; i++){
            resp += `- ` + etiquetas[i] + `\n`;
        }
        return resp;
    }

    gasto.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    gasto.actualizarDescripcion = function (newDescr) {
        this.descripcion = newDescr;
    };
    gasto.actualizarValor = function(nuevovalor){
        if(parseFloat(nuevovalor)> 0){
        this.valor = nuevovalor;
        }
    }
    gasto.actulizarFecha = function(nuevaFecha){
        this.fecha = Date.parse(nuevaFecha);
    }
    gasto.anyadirEtiquetas = function(...nuevaEtiqueta){
        nuevaEtiqueta.forEach(a => {
            if(!this.etiquetas.includes(a)){
                this.etiquetas.push(a);
            }
        })
    }
    gasto.actualizarValor = function (v1) {
        if (parseFloat(v1) >= 0) {
            this.valor = v1;
        } 
    };

    
    return gasto;
}
function listarGastos(){
return gastos;
}

function anyadirGasto(gastoante){
    gastoante = idgasto;
    gastoante.push(gasto);
    idgasto++;
    
}
function borrarGasto(idborrar){
    let contador = 0;
    array.forEach(j => {
        if(j.id == idborrar){
            delete gastos[contador];
        }
        contador++;
    });


}
function calcularTotalGastos(idsumar){
    let contador = 0;
    let totalgastos = 0;
    array.forEach(j => {
        if(j.id == idsumar){
           totalgastos +=  gastos[contador];
        }
        contador++;
    });
}
function calcularBalance(){
    let gastostotales = calcularTotalGastos();
    return(presupuesto - gastostotales);
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
