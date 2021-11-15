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
    
    this.descripcion = desc;
    this.etiquetas = new Array();
    this.valor = null;
    this.fecha = null;
    

    if(parseFloat(valor) > 0){
        this.valor = valor;
    }else{
        this.valor = 0;
    }

    if(fechaCreacion === undefined || isNaN(Date.parse(fechaCreacion))){  // typeof === "string"
        this.fecha = new Date(Date.now()).toISOString().substring(0,16); // "2021-10-06T13:10" 16-char
    }else{
        this.fecha = Date.parse(fechaCreacion);
    }

    if(etiqueta !== undefined){
        this.etiquetas = etiqueta;
    }

    // MÉTODOS del objeto gasto

    this.mostrarGastoCompleto = function(){
        let respuesta = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${new Date(this.fecha).toLocaleString()}\nEtiquetas:\n`;
        
        for(let i = 0; i < this.etiquetas.length; i++){  // Recorre y muestra los valores del Array
            respuesta += "- " + this.etiquetas[i]+`\n`
        }

        return respuesta;
    };

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(nuevaDesc){
        this.descripcion = nuevaDesc;
    };

    this.actualizarValor = function(nuevoValor){
        if(parseFloat(nuevoValor) > 0){
            this.valor = nuevoValor;
        }
    };

    this.actualizarFecha = function(nuevaFecha){
        if(!isNaN(Date.parse(nuevaFecha))){
            this.fecha = Date.parse(nuevaFecha);
        }
    }

    this.anyadirEtiquetas = function(...nuevasEtiquetas){

        for(let elem of nuevasEtiquetas){
            if(!this.etiquetas.includes(elem)){
               this.etiquetas.push(elem);
            }
        }
    };
    
    this.borrarEtiquetas = function(...etiquetasBorrar){
        
        for (let e of etiquetasBorrar){
            if(this.etiquetas.includes(e)){
                this.etiquetas.splice(this.etiquetas.indexOf(e),1)
            }
        }
    };
    
    this.obtenerPeriodoAgrupacion = function (periodo) {
        let resultado = "0";
        let fechObj = new Date(this.fecha);
        switch (periodo) {
          case "dia":
            return fechObj.toISOString().substring(0, 10);
          case "mes":
            return fechObj.toISOString().substring(0, 7);
          case "anyo":
            return fechObj.toISOString().substring(0, 4);
          default:
            console.log("Periodo erroneo.");
            break;
        }
    
        return resultado;
      };
};

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
function filtrarGastos(objetoFiltro) {
    if (
      objetoFiltro != undefined &&
      objetoFiltro != null &&
      Object.entries(objetoFiltro).length != 0
    ) {
      let resultado = gastos.filter((gast) => {
        if (objetoFiltro.hasOwnProperty("fechaDesde")) {
          if (gast.fecha < Date.parse(objetoFiltro.fechaDesde)) {
            return;
          }
        }
  
        if (objetoFiltro.hasOwnProperty("fechaHasta")) {
          if (gast.fecha > Date.parse(objetoFiltro.fechaHasta) ) {
            return;
          }
        }
  
        if (objetoFiltro.hasOwnProperty("valorMinimo")) {
          if (gast.valor < objetoFiltro.valorMinimo) {
            return;
          }
        }
  
        if (objetoFiltro.hasOwnProperty("valorMaximo")) {
          if (gast.valor > objetoFiltro.valorMaximo) {
            return;
          }
        }
  
        if (objetoFiltro.hasOwnProperty("descripcionContiene")) {
          if (!gast.descripcion.includes(objetoFiltro.descripcionContiene)) {
            return;
          }
        }
        if (objetoFiltro.hasOwnProperty("etiquetasTiene")) {
          if ( objetoFiltro.etiquetasTiene.length != 0){
          let check = false;
          for (let des of objetoFiltro.etiquetasTiene) {
            if (gast.etiquetas.includes(des)) {
              check = true;
            }
          }
          if (!check) {
            return;
          }
        }
      }
        return gast;
      });
  
      return resultado;
  
    } else {
      return gastos;
    }
  }
  
function agruparGastos(periodo = "mes", etiquetas = [], fechDesd, fechaHas = Date.now()) {
  
  let listaResultadoFiltros = filtrarGastos({fechaDesde: fechDesd, fechaHasta:fechaHas, etiquetasTiene: etiquetas});
  let gastosAgrupados = listaResultadoFiltros.reduce(function(acumulador, gast){
    let perAgrup = gast.obtenerPeriodoAgrupacion(periodo);
    if (acumulador.hasOwnProperty(perAgrup)){
      acumulador[perAgrup] = acumulador[perAgrup] + gast.valor;
    } else {     
      acumulador[perAgrup] = gast.valor;
    }
    return acumulador
  }, {});
  return gastosAgrupados;
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
    agruparGastos,
    filtrarGastos
}
