'use strict'
/* 
    var --> declarar variable global
    let --> variable ámbito local
    const --> constante
*/

/* shift + alt + a   para comentarios de varias líneas */
// control + } para comentarios de un línea

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// Variables globales
var presupuesto = 0;
var idGasto = 0;
var gastos = new Array();

function actualizarPresupuesto(valor) {

    if(parseFloat(valor) > 0){
        presupuesto = valor;
        return presupuesto;
    }else {
        console.log("Error. Número negativo");
        return -1;
    }
}

function mostrarPresupuesto() {

    return "Tu presupuesto actual es de "+ presupuesto +" €";
}

function CrearGasto(desc, valor, fechaCreacion , ...etiqueta) {
                                                // parámetro rest: que no sabemos la longitug que va a tener, pueden pasarte muchas etiquetas
    let gasto={
        descripcion : desc,
        etiquetas : new Array(),
        valor : null,
        fecha : null
    }

    if(parseFloat(valor) > 0){
        gasto.valor = valor;
    }else{
        gasto.valor = 0;
    }

    if(fechaCreacion === undefined || isNaN(Date.parse(fechaCreacion))){  // typeof === "string"
        gasto.fecha = new Date(Date.now()).toISOString().substring(0,16); // "2021-10-06T13:10" 16-char
    }else{
        gasto.fecha = Date.parse(fechaCreacion);
    }

    if(etiqueta !== undefined){
        gasto.etiquetas = etiqueta;
    }

    // MÉTODOS del objeto gasto

    gasto.mostrarGastoCompleto = function(){
        let respuesta = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${new Date(this.fecha).toLocaleString()}\nEtiquetas:\n`;
        
        for(let i = 0; i < this.etiquetas.length; i++){  // Recorre y muestra los valores del Array
            respuesta += "- " + this.etiquetas[i]+`\n`
        }

        return respuesta;
    }

    gasto.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    gasto.actualizarDescripcion = function(nuevaDesc){
        this.descripcion = nuevaDesc;
    }

    gasto.actualizarValor = function(nuevoValor){
        if(parseFloat(nuevoValor) > 0){
            this.valor = nuevoValor;
        }
    }

    gasto.actualizarFecha = function(nuevaFecha){
        if(!isNaN(Date.parse(nuevaFecha))){
            this.fecha = Date.parse(nuevaFecha);
        }
    }

    gasto.anyadirEtiquetas = function(...nuevasEtiquetas){

        for(let elem of nuevasEtiquetas){
            if(!this.etiquetas.includes(elem)){
               this.etiquetas.push(elem);
            }
        }
    }
    
    gasto.borrarEtiquetas = function(...etiquetasBorrar){
        
        for (let e of etiquetasBorrar){
            if(this.etiquetas.includes(e)){
                this.etiquetas.splice(this.etiquetas.indexOf(e),1)
            }
        }
    }
    
    gasto.obtenerPeriodoAgrupacion = function(periodo){

        let fec = new Date(this.fecha); // convierte objeto en fecha (la fecha es un numero en formato TimeStamp)

        let cadena = '';
        switch (periodo) {
            case 'dia':{ //aaaa-mm-dd           a los menores de 10 le colocamos un 0 delante para cumplir el formato
                let mes = fec.getMonth() < 10 ? `0${fec.getMonth()+1}` : `${fec.getMonth()+1}`;
                let dia = fec.getDate() < 10 ? `0${fec.getDate()}` : `${fec.getDate()}`;
                cadena = '' + fec.getFullYear() + '-' + mes + '-' + dia;  //get.FUllYear() te da todo el año
                break;
            }
            case 'mes':{//aaaa-mm
                let mes = fec.getMonth() < 10 ? `0${fec.getMonth()+1}` : `${fec.getMonth()+1}`;
                cadena = '' + fec.getFullYear() + '-' + mes;
                break;
            }
            case 'anyo':{//aaaa
                cadena = '' + fec.getFullYear();
                break;
            }
            default :{
                break;
            }
        }
        return cadena;
    }

    return gasto;
    }

// FUNCIONES

function listarGastos() {
    return gastos;      // o recorrer el array con un bucle
}

function anyadirGasto(gastoAnyadir){
    if(gastoAnyadir !== undefined && gastoAnyadir !== null){
        gastoAnyadir.id = idGasto;
        gastos.push(gastoAnyadir);
        idGasto++;
    }
}

function borrarGasto(idBorrar){
    for(let elem of gastos){
        if(elem.id == idBorrar){
            gastos.splice(gastos.indexOf(elem),1);
        }
    }
}

function calcularTotalGastos() {
    let totalGasto = 0;
    for (let i = 0; i < gastos.length; i++){
        totalGasto += gastos[i].valor
    }
    return totalGasto;
}

function calcularBalance() {
    let totalGasto = calcularTotalGastos();

    let balance = presupuesto - totalGasto;

    return balance;
}

function agruparGastos(periodo = "mes", etiquetas = [], fechDesd, fechaHas = Date.now()) {


}
function filtrarGastos(objetoFiltrado) {
    if (objetoFiltrado != undefined && objetoFiltrado != null) {

      let resultado = gastos.filter((gasto) => {
        if (objetoFiltro.hasOwnProperty("fechaDesde")) {
          if (gasto.fecha < Date.parse(objetoFiltro.fechaDesde)) {
            return;
          }
        }
  
        if (objetoFiltro.hasOwnProperty("fechaHasta")) {
          if (gasto.fecha > Date.parse(objetoFiltro.fechaHasta) ) {
            return;
          }
        }
  
        if (objetoFiltro.hasOwnProperty("valorMinimo")) {
          if (gasto.valor < objetoFiltro.valorMinimo) {
            return;
          }
        }
  
        if (objetoFiltro.hasOwnProperty("valorMaximo")) {
          if (gasto.valor > objetoFiltro.valorMaximo) {
            return;
          }
        }
  
        if (objetoFiltro.hasOwnProperty("descripcionContiene")) {
          if (!gasto.descripcion.includes(objetoFiltro.descripcionContiene)) {
            return;
          }
        }
        if (objetoFiltro.hasOwnProperty("etiquetasTiene")) {
          if ( objetoFiltro.etiquetasTiene.length != 0){
          let devuelve = false;
          for (let des of objetoFiltro.etiquetasTiene) {
            if (gasto.etiquetas.includes(des)) {
              devuelve = true;
            }
          }
          if (!devuelve) {
            return;
          }
        }
      }
        return gasto;
      });
  
      return resultado;
  
    } else {
      return gastos;
    }
}
/*
function filtrarGastos(objeto){  // filtrar de los arrays  .filter()
    // gasos.filter --> comparar entre todos los objetos gasto en el array gastos -->devuelve un array con los resultados

    let fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene;
// hay que ver qué propiedades de estas tiene el objeto
// si variable local is unfefined, no hace nada
// si cumple, función filter

    if (typeof objeto != "undefined"){
        return gastos;
    }

    if ('fechaDesde' in objeto){
        fechaDesde = objeto.fechaDesde;

    } else if ('fechaHasta' in objeto){
        fechaHasta = objeto.fechaHasta;

    } else if ('valorMinimo' in objeto){
        valorMinimo = objeto.valorMinimo;

    } else if ('valorMaxmo' in objeto){
        valorMaximo = objeto.valorMaximo;

    } else if ('descripcionContiene' in objeto){
        descripcionContiene = objeto.descripcionContiene;

    } else if ('etiquetasTiene'){
        etiquetasTiene = objeto.etiquetasTiene;

    }

    let gastosFiltrados = gastos.filter(function(item){
        let devuelve = true;

        if (fechaDesde !== undefined){
            if (item.fecha > Date.parse(fechaDesde)){
                devuelve = false;
            }
        }
        if (fechaHasta !== undefined){
            if (item.fecha < Date.parse(fechaHasta)){
                devuelve = false;
            }
        }
        if (valorMinimo !== undefined){
            if (item.valor < valorMinimo){
                devuelve = false;
            }
        }
        if (valorMaximo !== undefined){
            if (item.valor > valorMaximo){
                devuelve = false;
            }
        }
        if (descripcionContiene !== undefined){

        }
    }
    )
}
*/
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
    agruparGastos,
    filtrarGastos
}
