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

        /* 
        let dia = String(fec.getDate()).padStart(2,'0');
        let mes = ;
        let anyo = ;
        */
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
                    // valor por defecto
function agruparGastos(periodo = "mes", etiquetas = [], fechaDes = '', fechaHas = '') {
// 1º comprueba los parámetros
// 2º llama a filtrarGastos con esos parámetros
// 3º reduce los gastos filtrados por periodo
// 4º return objeto
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //empieza en 0, por eso sumamos 1 (enero = 0)
    let yyyy = today.getFullYear();

    let objeto = {};

    if ((typeof fechaDes !== 'string') || isNaN(Date.parse(fechaDes)) || (typeof fechaDes == "undefined")) {
        
    }



    let subconjG = filtrarGastos(objeto);

    let reducido = subconjG.reduce(function (acu, item){
        let per = item.obtenerPeriodoAgrupacion(periodo);

        if (!acu.hasOwnProperty(per)) {
            acu[per] = 0;
        }
        if (acu.hasOwnProperty(per)) {
            if (isNaN(acu[per])) {
                acu[per] = 0;
            }
            acu[per] = acu[per] + item.valor;
        }
        return acu;
    }, {});

    return reducido;
}
function filtrarGastos(objetoFiltrado) { // 1 param-> objeto que puede tener esas 6 propiedades
    if (objetoFiltrado != undefined && objetoFiltrado != null) {
// crea un array resultado que almacena lo que devuelve .filter
      let gastosFiltrados = gastos.filter((gasto) => {  // función que recibe el objeto gasto como parámetro (recorre el array gastos)
        if (objetoFiltrado.hasOwnProperty("fechaDesde")) {
          if (gasto.fecha < Date.parse(objetoFiltrado.fechaDesde)) {  //si la fecha del objeto gasto del array gastos es menor a
            return;                             // la fecha del atributo fechaDesde del objeto pasado, filtrará desde esa fecha.
          } 
        }// return: true => almacena ese gasto en el array de gastos filtrados
  
        if (objetoFiltrado.hasOwnProperty("fechaHasta")) {
          if (gasto.fecha > Date.parse(objetoFiltrado.fechaHasta) ) {
            return;
          }
        }
  
        if (objetoFiltrado.hasOwnProperty("valorMinimo")) {
          if (gasto.valor < objetoFiltrado.valorMinimo) {
            return;
          }
        }
  
        if (objetoFiltrado.hasOwnProperty("valorMaximo")) {
          if (gasto.valor > objetoFiltrado.valorMaximo) {
            return;
          }
        }
  
        if (objetoFiltrado.hasOwnProperty("descripcionContiene")) {
          if (!gasto.descripcion.includes(objetoFiltrado.descripcionContiene)) {
            return;
          }
        }
        if (objetoFiltrado.hasOwnProperty("etiquetasTiene")) {
          if ( objetoFiltrado.etiquetasTiene.length != 0){
          let devuelve = false;
          for (let des of objetoFiltrado.etiquetasTiene) {
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
  
      return gastosFiltrados;
  
    } else {
      return gastos;
    }
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
