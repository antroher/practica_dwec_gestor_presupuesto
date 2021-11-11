'use strict'

<<<<<<< HEAD
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(cantidad) {
    if(cantidad >= 0){
        presupuesto = cantidad;
    }else if(cantidad < 0){
        presupuesto = -1;
=======
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
>>>>>>> 1a852cbe802ab0bdafa3552122e15a964866ce9e
    }

    return presupuesto;
}

function mostrarPresupuesto() {
<<<<<<< HEAD
    let mensaje = `Tu presupuesto actual es de ${presupuesto} €`
    return mensaje;
}

function CrearGasto(descripcion = "No hay descripción", valor = 0, fecha = "", ...etiquetas) {

    this.descripcion = descripcion;

    if(valor >= 0){
        this.valor = valor;
    }else{
        this.valor = 0;
    }

    if(fecha == "" || isNaN(Date.parse(fecha))){
        this.fecha = Date.now();
    }else{
        this.fecha = Date.parse(fecha);
    }

    this.etiquetas = [];

    this.mostrarGasto = function(){
        let mensaje = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        return mensaje;
    };

    this.mostrarGastoCompleto = function(){
        let listaEtiquetas = "";

        for(let etiqueta of this.etiquetas){
            listaEtiquetas += `- ${etiqueta}\n`;
        }

        let fechalocale = new Date(this.fecha).toLocaleString();

        let mensaje = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        mensaje += `Fecha: ${fechalocale}\n`;
        mensaje += `Etiquetas:\n${listaEtiquetas}`;
        return mensaje;
    }

    this.actualizarDescripcion = function(descripcion = this.descripcion){
        this.descripcion = descripcion;
    };

    this.actualizarValor = function(valor){
        if(valor >= 0){
            this.valor = valor;
        }
    };

    this.actualizarFecha = function(fecha){
        if(fecha != "" && !isNaN(Date.parse(fecha))){
            this.fecha = Date.parse(fecha);
        }
    };

    this.anyadirEtiquetas = function(...etiquetas){
        for(let etiqueta of etiquetas){
            if(this.etiquetas.includes(etiqueta) == false){
                this.etiquetas.push(etiqueta);
            }
        }
    }

    //Comprobamos que las etiquetas que se introducen en el objeto no estén repetidas
    this.anyadirEtiquetas(...etiquetas);

    this.borrarEtiquetas = function(...etiquetas){
        for(let etiqueta of etiquetas){
            let index = this.etiquetas.indexOf(etiqueta);
            if(index != -1){
                this.etiquetas.splice(index,1);
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo){
        let periodoAgrupacion = "";

        if(periodo == "dia" || periodo == "mes" || periodo == "anyo"){

            periodoAgrupacion = new Date(this.fecha).toISOString();

            if(periodo == "dia"){
                periodoAgrupacion = periodoAgrupacion.substring(0,10);
            }else if(periodo == "mes"){
                periodoAgrupacion = periodoAgrupacion.substring(0,7);
            }else if(periodo == "anyo"){
                periodoAgrupacion = periodoAgrupacion.substring(0,4);
            }
        }
        return periodoAgrupacion;
    }
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    if(typeof(gasto) === "object"){
        gasto.id = idGasto;
        gastos.push(gasto);
=======

    return "Tu presupuesto actual es de "+ presupuesto +" €";
}

function CrearGasto(desc, valor, fechaCreacion , ...etiqueta) {
    
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

    if(fechaCreacion === undefined || isNaN(Date.parse(fechaCreacion))){  
        gasto.fecha = new Date(Date.now()).toISOString().substring(0,16); 
    }else{
        gasto.fecha = Date.parse(fechaCreacion);
    }

    if(etiqueta !== undefined){
        gasto.etiquetas = etiqueta;
    }



    gasto.mostrarGastoCompleto = function(){
        let respuesta = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${new Date(this.fecha).toLocaleString()}\nEtiquetas:\n`;
        
        for(let i = 0; i < this.etiquetas.length; i++){  
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
    
    gasto.obtenerPeriodoAgrupacion = function (periodo) {
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
    
      return gasto;
    }



function listarGastos() {
    return gastos;   
}

function anyadirGasto(gastoAnyadir){
    if(gastoAnyadir !== undefined && gastoAnyadir !== null){
        gastoAnyadir.id = idGasto;
        gastos.push(gastoAnyadir);
>>>>>>> 1a852cbe802ab0bdafa3552122e15a964866ce9e
        idGasto++;
    }
}

<<<<<<< HEAD
function borrarGasto(numId){
    if(typeof numId == 'number' && numId >= 0){
        let index = gastos.indexOf(gastos.find(x=>x.id == numId));
        if(index != -1){
            gastos.splice(index,1);
=======
function borrarGasto(idBorrar){
    for(let elem of gastos){
        if(elem.id == idBorrar){
            gastos.splice(gastos.indexOf(elem),1);
>>>>>>> 1a852cbe802ab0bdafa3552122e15a964866ce9e
        }
    }
}

<<<<<<< HEAD
function calcularTotalGastos(){
    let total = 0;

    for(let gasto of gastos){
        total = total + gasto.valor;
    }

    return total;
}
=======
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
>>>>>>> 1a852cbe802ab0bdafa3552122e15a964866ce9e

function calcularBalance(){
    let balance = presupuesto - calcularTotalGastos();
    return balance;
<<<<<<< HEAD
}

function filtrarGastos(filtro){

    let gastosFiltro = gastos;

    if(typeof(filtro) == "object"){

        if(Object.keys(filtro).length != 0){

            gastosFiltro = gastos.filter(function(gasto){

                let existe = true;

                if(filtro.fechaDesde){
                    let fDesde = Date.parse(filtro.fechaDesde);
                    if(gasto.fecha < fDesde){
                        existe = false;
                    }
                }

                if(filtro.fechaHasta){
                    let fHasta = Date.parse(filtro.fechaHasta);
                    if(gasto.fecha > fHasta){
                        existe = false;
                    }
                }

                if(filtro.valorMinimo){
                    if(gasto.valor < filtro.valorMinimo){
                        existe = false;
                    }
                }

                if(filtro.valorMaximo){
                    if(gasto.valor > filtro.valorMaximo){
                        existe = false;
                    }
                }

                if(filtro.descripcionContiene){
                    if(!gasto.descripcion.includes(filtro.descripcionContiene)){
                        existe = false;
                    }
                }

                
                if(filtro.etiquetasTiene){
                    let eTiene = filtro.etiquetasTiene;

                    let contiene = false;
                    for(let gast of gasto.etiquetas){
                        for(let tiene of eTiene){
                            if(gast == tiene){
                                    contiene = true;
                            }
                        }
                    }
                    if(contiene == false){
                        existe = false;
                    }                                          
                }

                return existe;
       
            });

        }
    }

    return gastosFiltro;
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta = new Date(Date.now()).toISOString().substring(0,10)){

    let filtro = {
        etiquetasTiene: etiquetas,
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta
    }

    let gastosFiltro = filtrarGastos(filtro);

    let gastosAgrupar = gastosFiltro.reduce((acc, gasto) => {
        acc[gasto.obtenerPeriodoAgrupacion(periodo)] = (acc[gasto.obtenerPeriodoAgrupacion(periodo)] || 0) + gasto.valor;
        return acc;
    },{});

    return gastosAgrupar;


=======
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
>>>>>>> 1a852cbe802ab0bdafa3552122e15a964866ce9e
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
<<<<<<< HEAD
    filtrarGastos,
    agruparGastos,

=======
    agruparGastos,
    filtrarGastos
>>>>>>> 1a852cbe802ab0bdafa3552122e15a964866ce9e
}