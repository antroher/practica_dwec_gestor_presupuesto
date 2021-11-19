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


function mostrarGastoWeb(idElemento, gasto )/*HAY Q PASARLE UN ARRAY DE GASTO*/ 
{
  let elemento = document.getElementById(idElemento);

  let divGasto = document.createElement("div");
  divGasto.className += "gasto";

  if(idElemento.includes('completo'))
  {
    divGasto.id = gasto.id;
  }

  let gastoDescripcion = document.createElement("div");
  gastoDescripcion.className += "gasto-descripcion";
  gastoDescripcion.textContent = `${gasto.descripcion}`;
 
  let gastoValor = document.createElement("div");
  gastoValor.className += "gasto-valor";
  gastoValor.textContent = `${gasto.valor}`;
 

  let gastoFecha = document.createElement("div");
  gastoFecha.className += "gasto-fecha";
  gastoFecha.textContent = `${gasto.fecha}`;
  

  let gastoEtiquetas = document.createElement("div");
  gastoEtiquetas.className += "gasto-etiquetas";
 

  for (let x of gasto.etiquetas) {

    let gastoEtiqueta = document.createElement("span");
    gastoEtiqueta.className += "gasto-etiquetas-etiqueta";
    gastoEtiqueta.textContent =`${x} `;
    gastoEtiquetas.append(gastoEtiqueta);

    if(idElemento.includes('completo'))
    {
      let nuevoObjEtiqueta = new BorrarEtiquetasHandle(); 
      nuevoObjEtiqueta.gasto = gasto;
      nuevoObjEtiqueta.etiqueta = x;
      gastoEtiqueta.addEventListener('click',nuevoObjEtiqueta);
    }
    
  }

  divGasto.append(gastoDescripcion, gastoValor, gastoFecha, gastoEtiquetas);
  elemento.append(divGasto);
 //crear boton editar formulario  y ese boton llama a un manejador para ver que haces 
 //BOTON ENVIAR Y CCANCELAR, APROCHECHAR EL CODIGO DEL PRINCIPIO DE LA PRACTICA 
  if(idElemento === 'listado-gastos-completo')
  {
    let buttomE = document.createElement("button");
    buttomE.className += "gasto-editar";
    buttomE.textContent = 'Editar';
    buttomE.type ='button';

    let buttomB = document.createElement("button");
    buttomB.className += "gasto-borrar";
    buttomB.textContent = 'Borrar';
    buttomB.type ='button';

    //Botón editar gasto
    let evEditar = new EditarHandle();
    evEditar.gasto = gasto;

    //Botón borrar gasto
    let evBorrar = new BorrarHandle();
    evBorrar.gasto = gasto;

    buttomB.addEventListener('click', evBorrar);
    buttomE.addEventListener('click', evEditar);

    let gastoactual= document.getElementById(gasto.id);
    gastoactual.append(buttomE, buttomB); 
    
    /*//--------------------------

    let buttomEN = document.createElement("button");
    buttomEN.className += "gasto-enviar";
    buttomEN.textContent = 'Enviar';
    buttomEN.type ='button';

    let evEnviar = new FormSubmitHandle();
    evEnviar.gasto = gasto;

    buttomEN.addEventListener('click', evEnviar);


    let buttomCan = document.createElement("button");
    buttomCan.className += "gasto-Cancelar";
    buttomCan.textContent = 'Cancelar';
    buttomCan.type ='button';

    let evCancelar = new CancelarEtiquetasHandle();
    evCancelar.gasto = gasto;

    buttomCan.addEventListener('click', evCancelar);*/
  
  }
  
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
      <h1>Gastos agrupados por ${periodo} </h1>
      
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

//Eventos
actualizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);
anyadirgasto.addEventListener('click', nuevoGastoWeb);

//ok
function nuevoGastoWeb()
{
  let descripcionNew = prompt('Introduzca la descripción del gasto');
  let valorNew = parseFloat(prompt('Introduzca un valor del gasto'));
  let fechaNew = prompt('Introduzca una fecha del gasto en formato yyyy-mm-dd');
  let etiquetasNew = prompt('Introduzca las etiquetas del gasto');
  let separador = ',';
  let Etiquetas = etiquetasNew.split(separador);
  datosPresupuesto.anyadirGasto(new datosPresupuesto.CrearGasto(descripcionNew, valorNew, fechaNew, ...Etiquetas));
  repintar();
}

//ok
function repintar(){
  
  document.getElementById('presupuesto').innerHTML='';
  let mostrar = datosPresupuesto.mostrarPresupuesto();
  mostrarDatoEnId("presupuesto",mostrar);
  
  document.getElementById('gastos-totales').innerHTML='';
  let gastoTotal = datosPresupuesto.calcularTotalGastos().toFixed(2);
  mostrarDatoEnId("gastos-totales",gastoTotal);
  
  document.getElementById('balance-total').innerHTML='';
  let balanceTotal = datosPresupuesto.calcularBalance().toFixed(2);
  mostrarDatoEnId("balance-total",balanceTotal);
  
  document.getElementById("listado-gastos-completo").innerHTML = "";
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

function nuevoGastoWebFormulario()
{
  //estamos haciendo una clonacion para poder manejarlo con javascript
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  //seleccionamos la etique form
  var formulario = plantillaFormulario.querySelector("form");
  let controlesPrincipales = document.getElementById("controlesprincipales");

  controlesPrincipales.append(formulario);

  document.getElementById("anyadirgasto-formulario").disabled = true;

  let enviarHandle = new EnviarGastoHandle();
  formulario.addEventListener("submit", enviarHandle);

  let botonCancelar =formulario.querySelector("button.cancelar");
  let cancelarEvento = new cancelarHandle();
  botonCancelar.addEventListener("click",cancelarEvento);


    
  //buttomE.addEventListener('click', evEditar); al clicar te tiene   qure llevar aquí
}
function CancelarEtiquetasHandle() {
  
  this.handleEvent = function (e){
  
    //this.gasto.borrarEtiquetas(this.etiqueta);
    
    repintar();
  }
}
//MANEJADOR DE EVENTOS EDITAR HADLEFROMULARIO


//OK
function FormSubmitHandle(){

  this.handleEvent = function (e) {

      e.preventDefault();

      let formulario = e.currentTarget;
      let dscr = formulario.elements.descripcion.value;
      let valor = parseFloat(formulario.elements.valor.value);
      let fecha = formulario.elements.fecha.value;
      let etiquetas = formulario.elements.etiquetas.value;
      
      let nuevoG = new gestionPresupuesto.CrearGasto(dscr,valor,fecha,etiquetas);
      gestionPresupuesto.anyadirGasto(nuevoG);
      repintar();
      document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");

  }

}
//ok
let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

let botonNuevoGasto  = document.getElementById("anyadirgasto");
botonNuevoGasto.addEventListener("click", nuevoGastoWeb);

let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
botonAnyadirGastoFormulario.addEventListener("click", nuevoGastoWebFormulario);

export{
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb,
  EditarHandle,
  BorrarHandle,
  BorrarEtiquetasHandle,
  repintar,
  actualizarPresupuestoWeb,
  nuevoGastoWebFormulario,
  CancelarEtiquetasHandle,
  FormSubmitHandle
}