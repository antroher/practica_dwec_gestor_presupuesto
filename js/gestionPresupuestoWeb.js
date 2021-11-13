/*utilidades necesarias para mostrar los datos de la aplicación*/
"use strict";

function mostrarDatoEnId(idElemento, valor) {
    let Elemento = document.getElementById(idElemento); //selecciona el elemento
    let parrafo = document.createElement("p");//crea el elemento
    parrafo.textContent = valor;//modifica el contenido del elemento p
    Elemento.appendChild(parrafo);//añade el contenido del texto al párrafo (lo añade al html)
}

function mostrarGastoWeb(idElemento, gastos) {
    let elemento = document.getElementById(idElemento);
    let divgasto = document.createElement('div');
    divgasto.className = "gasto" ;
    elemento.append(divgasto);

    elemento.innerHTML +=`
    <div class="gasto-descripcion">${gastos.descripcion}</div>
    <div class="gasto-fecha">${gastos.fecha}</div>
    <div class="gasto-valor">${gastos.valor}</div>`;

    let divEtiquetas = document.createElement('div');
    divEtiquetas.className = 'gasto-etiquetas';
    divgasto.append(divEtiquetas);

    //Creo del objeto para borrar la etiqueta haciendo referencia al gasto
    let EventBorrarEtiqueta = new BorrarEtiquetasHandle();
    EventBorrarEtiqueta.gasto = gastos;

    //añado la etiqueta a HTML haciendo referencia a la etiqueta del gasto
    let span = document.createElement('span');
    span.className = 'gasto-etiquetas-etiqueta';
    span.innerHTML = etiq + "<br>";
    EventBorrarEtiqueta.etiqueta = etiq;

    //Introduczo dentro del "div gasto-etiquetas" el span que referencia la etiqueta
    divEtiquetas.append(span);
    //por cada click de borrado
    span.addEventListener('click',EventBorrarEtiqueta);

    }
    
  //Botón editar:
  let ButtonEditar = document.createElement('button');//crea el elemento del boton ditar
  ButtonEditar.type = 'button';
  ButtonEditar.className += 'gasto-editar'; //crea el botón editar
  ButtonEditar.textContent = "Editar"; //contenido del boton editar
  let eventEditar = new EditarHandle(); //objeto manejador de eventos
  eventEditar.gasto = gastos //EditarHandle tiene una propiedad gasto, a dicha propiedad se le asigna el parameto gastos
  ButtonEditar.addEventListener('click', eventEditar); //eventEditar es un objeto que tiene dos propiedades (una propiedad gasto y una función HandEvent()) tiene que ser un objeto que tenga definida una propiedad y que sea una funcion
  //Botón borrar:
  let ButtonBorrar = document.createElement('button');
  ButtonBorrar.type = 'button';
  ButtonBorrar.textContent = 'Borrar';
  ButtonBorrar.className = 'gasto-borrar';
  let EvenBorrar = new BorrarHandle();
  EvenBorrar.gasto = gastos;
  ButtonBorrar.addEventListener('click',EvenBorrar)

  //introducimos los botones en HTML
    divgasto.append(ButtonEditar);
    divgasto.append(ButtonBorrar);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    
    let agrupacion = '';

    let element = document.getElementById(idElemento);


    for (let [param,value] of Object.entries(agrup)) {
        agrupacion += `
        <div class="agrupacion-dato">
        <span class="agrupacion-dato-clave">${param}</span>
        <span class="agrupacion-dato-valor">${value}</span>
        </div>`
    }

    element.innerHTML += `
    <div class="agrupacion">
    <h1>Gastos agrupados por ${periodo}</h1>
    ${agrupacion}
    `
}

function repintar() {
    //Mostrar el presupuesto 
    let presupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId('presupuesto',presupuesto);

    //Mostrar los gastos totales
    let Calculogastos = gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId('gastos-totales',Calculogastos);

    //Mostrar el balance total
    let BalancePresupuesto = gestionPresupuesto.calcularBalance();
    mostrarDatoEnId('balance-total',BalancePresupuesto);

    //Borrar el contenido de div#listado-gastos-completo --> innerHTML para borrar el contenido de dicha capa
    document.getElementById("listado-gastos-completo").innerHTML = "";

    //Mostrar el listado completo de gastos
    let Listagastos = gestionPresupuesto.listarGastos();
    for (const gastico of Listagastos) {
        mostrarGastoWeb('listado-gastos-completo',gastico);
    }
}

//manejadora de eventos del botón actualizarpresupuesto del código HTML
function actualizarPresupuestoWeb() {
    let solicitudPresupuesto = parseFloat(prompt('introduzca un presupuesto: '));
    gestionPresupuesto.actualizarPresupuesto(solicitudPresupuesto);
    repintar();
}

let btnActualizarPres = document.getElementById('actualizarpresupuesto') //boton
btnActualizarPres.addEventListener('click',actualizarPresupuestoWeb); //Evento

function nuevoGastoWeb() {
    let Descripcion = prompt('Inserta la descripción del gasto');
    let valueGasto = parseFloat(prompt('Inserta el valor correspondiente al gasto'));
    let fechaGato =  prompt('Inserta la fecha del gasto en formato yyyy-mm-dd');
    let EtiquetaGasto = prompt('Escribe la etiqueta del gasto separado por ,: ').split(',');
    //Crear un nuevo gasto
    let NewGasto = new gestionPresupuesto.CrearGasto(Descripcion,valueGasto,fechaGato,...EtiquetaGasto);
    //Añadir el gasto a la lista de gastos
    gestionPresupuesto.anyadirGasto(NewGasto);
    repintar();
}
let btnAnyadirgasto = document.getElementById('anyadirgasto');
btnAnyadirgasto = addEventListener('click',nuevoGastoWeb);

//edita cada gasto tras acción del botón editar de cada gasto
function EditarHandle() {
    this.handleEvent = function(){
        //pedir al usuario datos del gasto
        let Descripcion = prompt('Inserta la descripción del gasto: ');
        this.gasto.actualizarDescripcion(Descripcion);

        let valueGasto = parseFloat(prompt('Inserta el valor correspondiente al gasto: '));
        this.gasto.actualizarPresupuesto(valueGasto);

        let fechaGato =  Date.parse(prompt('Inserta la fecha del gasto en formato yyyy-mm-dd: '));
        this.gasto.actualizarFecha(fechaGato);

        let EtiquetaGasto = prompt('Escribe la etiqueta del gasto separado por ,: ');
        let etiq = EtiquetaGasto.split(', ');
        this.gasto.anyadirEtiquetas(...etiq);
        //después de asignar el nuevo gasto a la lista actualizo la página
        repintar();
    }
}
function BorrarHandle() {
    this.handleEvent = function () {
        let identidad = this.gasto.id;
        gestionPresupuesto.borrarGasto(identidad); //borrar gasto
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function () {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function nuevoGastoWebFormulario() {
    let gridForm = document.getElementById("formulario-template").content.cloneNode(true);
    var form = gridForm.querySelector("form");
}

function submitHandle(event) {
    event.preventDefault();

    repintar();
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
    /*actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle*/
}
import * as gestionPresupuesto from "./gestionPresupuesto.js";
