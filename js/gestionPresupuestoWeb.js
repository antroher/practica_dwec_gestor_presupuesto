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
  /*ESTO OK
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
  //HASTA AQUI
  */

  for (let i of gastos)
  { 
    let divEtiquetas = "";
      for(let j of i.etiquetas)
      {
        divEtiquetas += `
        <span class="gasto-etiquetas-etiqueta">
            ${j}
        </span>
        `
      }
    //guardamos en una variable todas las etiquetas 
   //modificamos el elemento html
    elemento.innerHTML += `
    <div class="gasto">
    <div class="gasto-descripcion">${i.descripcion}</div>
    <div class="gasto-fecha">${i.fecha}</div>
    <div class="gasto-valor">${i.valor}</div>
    <div class="gasto-etiquetas">
    ${divEtiquetas}
    </div>
    </div>
    `;
  }
}


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

/*
function actualizarPresupuestoWeb (){
  let cambioPresupuesto = parseInt(prompt("Cual es el valor del presupuesto actualmente"));
  datosPresupuesto.actualizarPresupuesto(cambioPresupuesto);
  repintar();
}

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click",actualizarPresupuestoWeb);


function repintar(){
  let mostrar = datosPresupuesto.mostrarPresupuesto();
  mostrarDatoEnId( "presupuesto",mostrar);
  
  let gastoTotal = datosPresupuesto.calcularTotalGastos().toFixed(2);
  mostrarDatoEnId( "gastos-totales",gastoTotal);
  
  let balanceTotal = datosPresupuesto.calcularBalance().toFixed(2);
  mostrarDatoEnId("balance-total",balanceTotal);
  
  let borrarDatos = document.getElementById("listado-gastos-completo").innerHTML = "";
  
  let matrizGasto = datosPresupuesto.listarGastos();
  for (const x of matrizGasto) {
    mostrarGastoWeb("listado-gastos-completo", x);
  }
  
}

function EditarHandle() {
    
  this.handleEvent = function (e){
  
    let descripcion = prompt("Escribe la nueva descripción del gasto");
    let valor = parseFloat(prompt("Escribe la nueva valor del gasto"));
    let fecha = prompt("Escribe la fecha del gasto en formato yyyy-mm-dd");
    let etiquetas = prompt("Escribe las etiquetas del gasto separadas por ,");
    
    if (etiquetas !== null)
    {
      this.gasto.etiquetas=etiquetas.split(',');
    }
    else
    {
      this.gasto.etiquetas=[];
    }

    this.gasto.actualizarValor(valor);
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetas);
    
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
*/

export{
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb,
  /*
  EditarHandle,
  BorrarHandle,
  BorrarEtiquetasHandle,
  repintar,
  actualizarPresupuestoWeb
  */
}