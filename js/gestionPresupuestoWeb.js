"use strict";

import { throws } from "assert";
import { PromptOptionsMap } from "listr2";

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
function EditarHandle (){

  this.handleEvent = function(e){
    //pedir al usuario datos del gasto, etc
    var desc = Prompt("Introduce la descripción");
    this.gastos.actualizarDescripcion(desc)
  }
}
//CREA UN NUEVO OBJETO A RAIZ DE LA FUNCION CONTRUCTORA
let e1 = new EditarHandle();
e1.gastos= e;
e1.handleEvent();

export{
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb,
  EditarHandle
}