"use strict";
import * as gestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
  let identificador = document.getElementById(idElemento);
  let textoValor = (identificador.innerHTML = valor);
  return textoValor;
}

function mostrarGastoWeb(idElemento, gasto) {
  let identificador = document.getElementById(idElemento);

  let divGasto = document.createElement("div");
  divGasto.className = "gasto";
  identificador.append(divGasto);

  let gastoDescripcion = document.createElement("div");
  gastoDescripcion.className = "gasto-descripcion";
  gastoDescripcion.innerHTML = gasto.descripcion;
  divGasto.append(gastoDescripcion);

  let gastoFecha = document.createElement("div");
  gastoFecha.className = "gasto-fecha";
  let fechaNueva = new Date(gasto.fecha);
  gastoFecha.innerHTML = fechaNueva.toLocaleString();
  divGasto.append(gastoFecha);

  let gastoValor = document.createElement("div");
  gastoValor.className = "gasto-valor";
  gastoValor.innerHTML = gasto.valor;
  divGasto.append(gastoValor);

  let gastoEtiquetas = document.createElement("div");
  gastoEtiquetas.className = "gasto-etiquetas";
  divGasto.append(gastoEtiquetas);

  let nuevoObjEtiqueta = new BorrarEtiquetasHandle(); 
  nuevoObjEtiqueta.gasto = gasto;

  for (let x of gasto.etiquetas) {
    let gastoEtiqueta = document.createElement("span");
    gastoEtiqueta.className = "gasto-etiquetas-etiqueta";
    gastoEtiqueta.innerHTML = x + "<br>";
    nuevoObjEtiqueta.etiqueta = x;
    gastoEtiquetas.append(gastoEtiqueta);

  }

  gastoEtiquetas.addEventListener('click',nuevoObjEtiqueta);
  
  let nuevoObj = new EditarHandle(); 
  nuevoObj.gasto = gasto;
  let buttonEdit = document.createElement('button'); 
  buttonEdit.type = 'button'; 
  buttonEdit.innerText = 'Editar';
  buttonEdit.className = "gasto-editar";
  buttonEdit.addEventListener('click',nuevoObj);
  divGasto.append(buttonEdit);


  let nuevoObjBorrar = new BorrarHandle(); 
  nuevoObjBorrar.gasto = gasto;
  let buttonBorrar = document.createElement('button'); 
  buttonBorrar.type = 'button'; 
  buttonBorrar.innerText = 'Borrar';
  buttonBorrar.className = "gasto-borrar";
  buttonBorrar.addEventListener('click',nuevoObjBorrar);
  divGasto.append(buttonBorrar);

}

 
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
  let identificador = document.getElementById(idElemento);
  let divAgrupacion = document.createElement("div");
  divAgrupacion.className = "agrupacion";
  identificador.append(divAgrupacion);
  let tituloAgrupacion = document.createElement("h1");
  tituloAgrupacion.innerHTML = `Gastos agrupados por ${periodo}`;
  divAgrupacion.append(tituloAgrupacion);
  for (let x in agrup) {
        let agrupacionDato = document.createElement("div");
        agrupacionDato.className = "agrupacion-dato";
        divAgrupacion.append(agrupacionDato);

        let agrupacionClave = document.createElement("span");
        agrupacionClave.className = "agrupacion-dato-clave";
        agrupacionClave.innerHTML = x + "<br>";
        agrupacionDato.append(agrupacionClave);

        let agrupacionValor = document.createElement("span");
        agrupacionValor.className = "agrupacion-dato-valor";
        let valorDecimal = agrup[x];
        agrupacionValor.innerHTML = valorDecimal.toFixed(2) + "<br>";
        agrupacionDato.append(agrupacionValor);
  }
}



function repintar() {
    let mostrar = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId( "presupuesto",mostrar);
    
    let gastoTotal = gestionPresupuesto.calcularTotalGastos().toFixed(2);
    mostrarDatoEnId( "gastos-totales",gastoTotal);
    
    let balanceTotal = gestionPresupuesto.calcularBalance().toFixed(2);
    mostrarDatoEnId("balance-total",balanceTotal);
    
    let borrarDatos = document.getElementById("listado-gastos-completo").innerHTML = "";
    
    let matrizGasto = gestionPresupuesto.listarGastos();
    for (const x of matrizGasto) {
        mostrarGastoWeb("listado-gastos-completo", x);
    }
}


function actualizarPresupuestoWeb (){
    let cambioPresupuesto = parseInt(prompt("Cual es el valor del presupuesto actualmente"));
    gestionPresupuesto.actualizarPresupuesto(cambioPresupuesto);
    repintar();
}

  function nuevoGastoWeb(){
    let descripcion = prompt("Escribe la descripción del gasto");
    let valor1 = parseFloat(prompt("Escribe el valor del gasto"));
    let fecha = prompt("Escribe la fecha del gasto en formato yyyy-mm-dd");
    let etiquetas = prompt("Escribe las etiquetas del gasto separadas por ,");
    let etiquetasArray= etiquetas.split(',');
    let gastoAnyadido = new gestionPresupuesto.CrearGasto(descripcion,valor1,fecha,...etiquetasArray);
    gestionPresupuesto.anyadirGasto(gastoAnyadido);
    repintar();
  }

function EditarHandle() {
    this.handleEvent = function (e){
    let descripcion = prompt("Escribe la nueva descripción del gasto");
    let valor1 = parseFloat(prompt("Escribe la nueva valor del gasto"));
    let fecha = prompt("Escribe la fecha del gasto en formato yyyy-mm-dd");
    let etiquetas = prompt("Escribe las etiquetas del gasto separadas por ,");
    let etiquetasArray = etiquetas.split(',');
    this.gasto.actualizarValor(valor1);
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetasArray);
    repintar();
   }
}

  function BorrarHandle() {
    this.handleEvent = function (e){
      let number = this.gasto.id;
      gestionPresupuesto.borrarGasto(number);
      repintar();
    }
}

  function BorrarEtiquetasHandle() {
    this.handleEvent = function (e){
    this.gasto.borrarEtiquetas(this.etiqueta);
    repintar();
   }
}
 

 
let botonGasto = document.getElementById("anyadirgasto");
botonGasto.addEventListener("click",nuevoGastoWeb);


let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click",actualizarPresupuestoWeb);

export { mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb };

