"use strict"

import * as gestionPresupuesto from './gestionPresupuesto.js';

//Botones 

document.getElementById("actualizarpresupuesto").addEventListener("click",actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click",nuevoGastoWeb);


function mostrarDatoEnId (idElemento, valor)
{
  let datId = document.getElementById(idElemento);
  datId.innerHTML = `<p>${valor}</p>`
}


function mostrarGastoWeb(idElemento, gastos)
{
  let element = document.getElementById(idElemento);

    gastos.forEach((gasto) => {
        let etiquetas = "";

        gasto.etiquetas.forEach((etiqueta) => {
            etiquetas += 

                `<span class="gasto-etiquetas-etiqueta"> 
                    ${etiqueta}
                </span>`;
        });


        element.innerHTML +=
        `<div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div> 
            <div class="gasto-etiquetas">
                ${etiquetas}
            </div>
      
        <!--Creamos boton-->
        <button type="button" class="gasto-editar" id="editar-${gasto.id}">Editar</button>
        <button type="button" class="gasto-borrar" id="borrar-${gasto.id}">Eliminar</button>`;

        // let objetoDel = new BorrarHandle()

        // objetoDel.gasto = gasto;
        // document.getElementById(`borrar-${gasto.id}`).addEventListener("click",objetoDel);//boton que borra

        let objetoEdit = new EditarHandle()

        objetoEdit.gasto = gasto;
        document.getElementById(`editar-${gasto.id}`).addEventListener("click",objetoEdit); //boton que edita

    });
 }


function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
  let elemento = document.getElementById(idElemento);

  //bucle

  let gastos ="";
    for(let prop in agrup){
        gastos +=
        "<div class='agrupacion-dato'>" +
        "<span class='agrupacion-dato-clave'>" + prop + ": </span>" +
        "<span class='agrupacion-dato-valor'>" + agrup[prop] + "</span>"+
        "</div>";
    }

    elemento.innerHTML += 
    `<div class='agrupacion'> 
    <h1>Gastos agrupados por ${periodo} </h1>
    ${gastos}`;

}


//Funcion repintar para actualizar la pagina

function repintar(){
  let presupuesto = gestionPresupuesto.mostrarPresupuesto();
  mostrarDatoEnId("presupuesto", presupuesto)

  let gastosTotales = gestionPresupuesto.calcularTotalGastos();
  mostrarDatoEnId("gastos-totales", gastosTotales)

  let balanceTotal = gestionPresupuesto.calcularBalance();
  mostrarDatoEnId("balance-total", balanceTotal)

  document.getElementById('listado-gastos-completo').innerHTML = " " ;

  let listarGastos = gestionPresupuesto.listarGastos();
  for(const x of listarGastos) {
      mostrarGastoWeb("listado-gastos-completo", x);
  }
}


function actualizarPresupuestoWeb(){
  let presupuesto = parseFloat(prompt("Introduce el presupuesto"))
  gestionPresupuesto.actualizarPresupuesto(presupuesto)
  repintar();
}


function nuevoGastoWeb(){
  let descripcion = prompt ("Introudzca la descripción")
  let valor = parseFloat(prompt("Introudzca el valor"))
  let fecha = prompt ("Introudzca la fecha")
  let etiquetas = prompt ("Introudzca las etiquetas")

  let arrayEtiquetas = etiquetas.split(",");

  let gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...arrayEtiquetas);

  gestionPresupuesto.anyadirGasto(gasto)

  repintar()
}


function EditarHandle(){
  this.handleEvent = function(e){
      let descripcion = prompt(`Nueva descripción del gasto`);
      let valor1 = parseFloat(prompt(`Indique el valor`))
      let fecha = prompt(`Actualice la fecha`)
      let etiquetas = prompt(`Escriba las etiquetas`)

      let arrayEtiquetas =etiquetas.split(`,`);

      this.gasto.actualizarValor(valor1);
      this.gasto.actualizarDescripcion(descripcion);
      this.gasto.actualizarFecha(fecha);
      this.gasto.anyadirEtiquetas(...arrayEtiquetas);  
      repintar();
  }
}

function BorrarHandle(){
  this.handleEvent = function(e) {
      gestionPresupuesto.borrarGasto(this.gasto.id);
      repintar();
  }
}

function borrarEtiquetas(){
  this.handleEvent = function(e) {
      this.gasto.borrarEtiquetas(this.etiqueta);
      repintar();
  }
}


const btnActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
btnActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

const btnNuevoGasto = document.getElementById("anyadirgasto");
btnNuevoGasto.addEventListener("click", nuevoGastoWeb);



export{
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb,
} 
