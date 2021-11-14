import * as datosPresupuesto from './gestionPresupuesto.js';

"use strict";


function mostrarDatoEnId (idElemento, valor)
{
  let elemento = document.getElementById(idElemento);
  //Creo el elemento p para guardar lo que hay dentro de idElement.
  let parrafo = document.createElement("p");
  // Le pongo el valor de idElemente a párrafo
  parrafo.textContent = valor;
  //añade el valor el contenido de parrafo al Elemento, es decir, al HTML
  elemento.appendChild(parrafo);
}


function mostrarGastoWeb(idElemento, gastos )/*HAY Q PASARLE UN ARRAY DE GASTO*/ 
{
  let elemento = document.getElementById(idElemento);

  let divGasto = document.createElement("div");
  divGasto.className = "gasto";
  elemento.append(divGasto);

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

  let buttomE = document.createElement("buttom");
  buttomE.className += "gasto-editar";
  buttomE.textContent = 'editar';
  buttomE.type ='buttom';

  let buttomB = document.createElement("buttom");
  buttomB.className += "gasto-borrar";
  buttomB.textContent = 'borrar';
  buttomB.type ='buttom';

   //Botón editar gasto
  let evEditar = new EditarHandle();
  evEditar.gasto = gastos;

   //Botón borrar gasto
  let evBorrar = new BorrarHandle();
  evBorrar.gasto = gasto;

  buttomB.addEventListener('click', evBorrar);
  buttomE.addEventListener('click', evEditar);

  divGasto.append(buttomE);
  divGasto.append(buttomB); 

  elemento.append(divGasto);  

}

//ok
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
  let Element = document.getElementById(idElemento);
  let datos = ""
  for (let [llave, val] of Object.entries(agrup)) {
      datos += 
      `<div class="agrupacion-dato">
          <span class="agrupacion-dato-clave">${llave}</span>
          <span class="agrupacion-dato-valor">${val}</span>
      </div>`
  };
  Element.innerHTML += 
  `<div class="agrupacion">
      <h1>Gastos agrupados por ${periodo}</h1>
      ${datos}
  `
}

//ok
function actualizarPresupuestoWeb (){
  let cambioPresupuesto = parseFloat(prompt("¿Cuál es el valor del presupuesto actualmente?"));
  datosPresupuesto.actualizarPresupuesto(cambioPresupuesto);
  repintar();
}

//Botones
const actualizarpresupuesto = document.getElementById("actualizarpresupuesto");
const anyadirgasto = document.getElementById("anyadirgasto");

/*Eventos
actualizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);
anyadirgasto.addEventListener('click', nuevoGastoWeb);*/


//ok
function repintar(){
  let mostrar = datosPresupuesto.mostrarPresupuesto();
  mostrarDatoEnId("presupuesto",mostrar);
  
  let gastoTotal = datosPresupuesto.calcularTotalGastos().toFixed(2);
  mostrarDatoEnId("gastos-totales",gastoTotal);
  
  let balanceTotal = datosPresupuesto.calcularBalance().toFixed(2);
  mostrarDatoEnId("balance-total",balanceTotal);
  
  let borrarDatos= document.getElementById("listado-gastos-completo").innerHTML = "";
  
  let listGasto = datosPresupuesto.listarGastos();
  for (const gasto of listGasto) {
    mostrarGastoWeb("listado-gastos-completo", gasto);
  }

}
//ok
function EditarHandle() {
  
  this.handleEvent = function (e){
  
    let descripcion = prompt("Escribe la nueva descripción del gasto");
    let valor = parseFloat(prompt("Escribe la nueva valor del gasto"));
    let fecha = prompt("Escribe la fecha del gasto en formato yyyy-mm-dd");
    let etiquetas = prompt("Escribe las etiquetas del gasto separadas por ,");
    let etiquetas2 = etiquetas.split(',');

    this.gasto.actualizarValor(valor);
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetas2);
    
    repintar();
  }
}

//bien
function BorrarHandle() {
  
  this.handleEvent = function (e){
  
    let number = this.gasto.id;
  
    datosPresupuesto.borrarGasto(number);
  
    repintar();
    
  }
}
//bien
function BorrarEtiquetasHandle() {
  
  this.handleEvent = function (e){
  
    this.gasto.borrarEtiquetas(this.etiqueta);
    
    repintar();
  }
}


export{
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb,
  EditarHandle,
  BorrarHandle,
  BorrarEtiquetasHandle,
  repintar,
  actualizarPresupuestoWeb

}