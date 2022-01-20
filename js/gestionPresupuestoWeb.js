"use strict"

import * as gestionPresupuesto from './gestionPresupuesto.js';

//Botones 

document.getElementById("actualizarpresupuesto").addEventListener("click",actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click",nuevoGastoWeb);


function mostrarDatoEnId (idElemento, valor)
{
  let div = document.getElementById(idElemento);
  let p = document.createElement('p');
  p.textContent = valor;
  div.append(p);
}


function mostrarGastoWeb(idElemento,gastos){
  let elem = document.getElementById(idElemento);

  gastos.forEach((gasto) =>{
      let Gasto = document.createElement("div");
      Gasto.className = "gasto";
      Gasto.setAttribute('id', `gasto-${gasto.id}`)
      elem.append(Gasto);

      Gasto.innerHTML +=`
      <div class="gasto-descripcion">${gasto.descripcion}</div>
      <div class="gasto-fecha">${new Date(gasto.fecha).toLocaleString()}</div> 
      <div class="gasto-valor">${gasto.valor}</div>
       `

     let EtiqGasto = document.createElement("div")
     EtiqGasto.className = "gasto-etiquetas";
     Gasto.append(EtiqGasto);

     for(let etiqueta of gasto.etiquetas){
         let EtiquetaNueva = new BorrarEtiquetasHandle();
         EtiquetaNueva.gasto = gasto;

         let gastEtiqueta = document.createElement("span");
         gastEtiqueta.className = "gasto-etiquetas-etiqueta";
         gastEtiqueta.textContent = etiqueta + " ";
         EtiquetaNueva.etiqueta = etiqueta;
         EtiqGasto.append(gastEtiqueta);
         gastEtiqueta.addEventListener("click",EtiquetaNueva);
     }

     if (idElemento === "listado-gastos-completo") {
      let botonEditar = document.createElement("button");
      botonEditar.className += 'gasto-editar'
      botonEditar.textContent = "Editar";
      botonEditar.type = 'button';

      let botonBorrar = document.createElement("button");
      botonBorrar.className += 'gasto-borrar'
      botonBorrar.textContent = "Borrar";
      botonBorrar.type = 'button';

      let botonEditarForm = document.createElement("button");
      botonEditarForm.setAttribute('id', `gasto-editar-formulario-${gasto.id}`)
      botonEditarForm.className += 'gasto-editar-formulario';
      botonEditarForm.textContent = "Editar (formulario)";
      botonEditarForm.type = "button";

      let editarForm = new EditarHandleFormulario();
      editarForm.gasto = gasto;

      botonEditarForm.addEventListener('click',editarForm);

      let editar = new EditarHandle();
      let borrar = new BorrarHandle();

      editar.gasto = gasto;
      borrar.gasto = gasto;

      botonEditar.addEventListener('click', editar);
      botonBorrar.addEventListener('click', borrar);

      Gasto.append(botonEditar);
      Gasto.append(botonBorrar);
      Gasto.append(botonEditarForm);
     }
  })
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

function EditarHandle() {
  this.handleEvent = function (){
      this.gasto.actualizarDescripcion(prompt("Escribe la nueva descripción: "));
      this.gasto.actualizarValor(parseFloat(prompt("Escribe el nuevo valor: ")));
      this.gasto.actualizarFecha(Date.parse(prompt("Escribe la fecha: ")));
      let etiqueta = prompt("Escribe las etiquetas: ");

      if(typeof etiqueta != "undefined"){
          this.gasto.anyadirEtiquetas(etiqueta.split(','))
      }
      repintar();
  }
}

function BorrarHandle(){
  this.handleEvent = function(e) {
      gestionPresupuesto.borrarGasto(this.gasto.id);
      repintar();
  }
}

function BorrarEtiquetasHandle() {
  this.handleEvent = function (){
  this.gasto.borrarEtiquetas(this.etiqueta);

  repintar();
 }
}

function nuevoGastoWebFormulario(){
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
  var formulario = plantillaFormulario.querySelector("form");

  let controls = document.getElementById("controlesprincipales")
  controls.appendChild(formulario);

  document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");
  let envO = new EnviarGastoHandleFormulario();
  formulario.addEventListener('submit', envO);
  let cancO = new CancelarHandleFormulario();
  let btnCancel = formulario.querySelector("button.cancelar");
  btnCancel.addEventListener("click", cancO);
}

function EditarHandleFormulario()
{
    this.handleEvent = function(event) {
        let form = document.getElementById("formulario-template").content.cloneNode(true).querySelector("form");
        document.getElementById(`gasto-${this.gasto.id}`).append(form);

        document.getElementById(`gasto-editar-formulario-${this.gasto.id}`).disabled = true;

        form.descripcion.value = this.gasto.descripcion;
        form.valor.value = this.gasto.valor;

        let fecha = new Date(this.gasto.fecha);
        let fechaFormateda = fecha.toISOString().substring(0,10);
        form.fecha.value = fechaFormateda;

        let etiquetaString = "";
        this.gasto.etiquetas.forEach((etiqueta, index) => {
            if (this.gasto.etiquetas.length - 1 === index) {
                etiquetaString += etiqueta;
            }
            else {
                etiquetaString += etiqueta + ", ";
            }
        });
        form.etiquetas.value = etiquetaString;

        let cancelarEvent = new CancelarHandleFormulario();
        cancelarEvent.formulario = form;
        cancelarEvent.gasto = this.gasto;
        form.querySelector("button[class='cancelar']").addEventListener('click', cancelarEvent);

        let submitEvent = new submitEditHandle();
        submitEvent.gasto = this.gasto;
        form.addEventListener('submit', submitEvent);

        let actualizarAPI = new ActualizarAPIHandle();
        actualizarAPI.gasto = this.gasto;

        let btnActualizarAPI = formulario.querySelector("button.gasto-enviar-api");
        btnActualizarAPI.addEventListener("click", actualizarAPI);    
    }
}

function submitEditHandle(){
  this.handleEvent = function (event){
      this.gasto.actualizarDescripcion(event.currentTarget.descripcion.value);
      this.gasto.actualizarValor(parseFloat(event.currentTarget.valor.value));
      this.gasto.actualizarFecha(event.currentTarget.fecha.value);
          let etiquetas = event.currentTarget.etiquetas.value;
          if (typeof etiquetas !== "undefined") {
              etiquetas = etiquetas.split(",");
          }
      this.gasto.etiquetas = etiquetas;

      repintar();
  }
}

function CancelarHandleFormulario() {
  this.handleEvent = function (e){
      e.currentTarget.parentNode.remove();
      document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");

      repintar();
  }
}

function EnviarGastoHandleFormulario(){
  this.handleEvent = function(event){
      event.preventDefault();
      let formulario = event.currentTarget;
      let descripcion = formulario.elements.descripcion.value;
      let valor = parseFloat(formulario.elements.valor.value);
      let fecha = formulario.elements.fecha.value;
      let etiquetas = formulario.elements.etiquetas.value;
      let gastoNuevo = new GestPres.CrearGasto(descripcion, valor, fecha, etiquetas);
      GestPres.anyadirGasto(gastoNuevo);

      repintar();
      document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
  }
}

//Práctica 7 -- función filtrarGastosWeb.

function filtrarGastoWeb (){

  this.handleEvent = function(event) {
     event.preventDefault();

    let formulario = document.getElementById("formulario-filtrado");
    let descripcionfiltro = formulario.elements["formulario-filtrado-descripcion"].value;
    let valorMinimofiltro = formulario.elements["formulario-filtrado-valor-minimo"].value;
    let valorMaximofiltro = formulario.elements["formulario-filtrado-valor-maximo"].value;
    let fechaDesdefiltro = formulario.elements["formulario-filtrado-fecha-desde"].value;
    let fechaHastafiltro = formulario.elements["formulario-filtrado-fecha-hasta"].value;
    let etiquetasfiltro = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;
  
    if(etiquetasfiltro === ""){
        etiquetasfiltro = [];
    }
  
    let filtrar ={
        descripcionContiene: (descripcionfiltro === "") ? undefined : descripcionfiltro,
        valorMinimo: (valorMinimofiltro === "") ? undefined : parseFloat(valorMinimofiltro),
        valorMaximo:(valorMaximofiltro === "") ? undefined: parseFloat(valorMaximofiltro),
        fechaDesde:(fechaDesdefiltro === "") ? undefined : fechaDesdefiltro,
        fechaHasta: (fechaHastafiltro === "") ? undefined : fechaHastafiltro,
        etiquetasTiene:(etiquetasfiltro.length === 0) ? [] : GestPres.transformarListadoEtiquetas(etiquetasfiltro)
    }
  
    console.log(filtrar)
  
    let gastosFiltrar = GestPres.filtrarGastos(filtrar);
  
    console.log(gastosFiltrar)
  
    document.getElementById("listado-gastos-completo").innerHTML = "";
  
    mostrarGastoWeb("listado-gastos-completo", gastosFiltrar);
  }
 
}

//Practica 8
function guardarGastosWeb(){
  localStorage.GestorGastosDWEC = JSON.stringify(GestPres.listarGastos());
}

function cargarGastosWeb(){
  let listGasto = JSON.parse(localStorage.getItem("GestorGastosDWEC"));

  if(listGasto !== null){
      GestPres.cargarGastos(listGasto);
  }
  else{
      GestPres.cargarGastos([]);
  }

  repintar();
}

//Práctica 9 

function BorrarAPIHandle()
{
    this.handleEvent = function(e)
    {
        let usuario = document.getElementById('nombre_usuario').value;
        let direccion =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.gastoId}`;

        if(usuario != '')
        {
            fetch(direccion, 
            {
                method: "DELETE",
            })
            .then(function(resp)
            {
                if(!resp.ok)
                {
                    alert("Error "+ resp.status +": no existe el id de ese gasto");
                }
                else
                {
                    alert("GASTO BORRADO");
                    cargarGastosApi();
                }
            })
            .catch(err => alert(err));
        }
        else
        {
            alert('Falta nombre usuario');
        }
    }
}

function EnviarGastoHandleFormulario(){
  this.handleEvent = function(event){
      event.preventDefault();
      let formulario = event.currentTarget;
      let descripcion = formulario.elements.descripcion.value;
      let valor = parseFloat(formulario.elements.valor.value);
      let fecha = formulario.elements.fecha.value;
      let etiquetas = formulario.elements.etiquetas.value;
      let gastoNuevo = new GestPres.CrearGasto(descripcion, valor, fecha, etiquetas);
      GestPres.anyadirGasto(gastoNuevo);

      repintar();
      document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
  }
}

function ActualizarAPIHandle(){
  this.handleEvent = function(e) {
    let Nomusuario = document.getElementById('nombre_usuario').value;
    let direccion =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

    if(Nomusuario != '')
    {
        var form = document.querySelector(".gasto form");
        let descrip = form.elements.descripcion.value;
        let val = form.elements.valor.value;
        let fech = form.elements.fecha.value;
        let etiq = form.elements.etiquetas.value;
        val = parseFloat(val);
        etiq = etiq.split(',');

        let gastoAPI = 
        {

            descripcion: descrip,
            valor: val,
            fecha: fech,
            etiquetas: etiq
        };
        fetch(direccion, {
            method: "PUT",
            headers:
            {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(gastoAPI)
        })

        .then(function(resp)
        {
            if(!resp.ok)
            {
                alert("Error " + resp.status + ": no se ha actualizado el gasto");
            }else
            {
                alert("GASTO ACTUALIZADO");
                cargarGastosApi();
            }
        })
        .catch(err => alert(err));
    }else
    {
        alert('Falta nombre usuario');
    }
  }
}


function cargarGastosApi(){
  let NomUsuario = document.querySelector("#nombre_usuario").value;
  let direccion = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${NomUsuario}`;
  
  if (NomUsuario != '') {
      fetch(direccion, {
          method: 'GET'
      })
          .then(resp => resp.json())
          .then(function(gastosAPI)
          {
  
              gestionPresupuesto.cargarGastos(gastosAPI);
              repintar();
          })
          .catch(err => alert(err));
  }else{
      alert('Falta nombre usuario');
  }
}

function EnviarGastoApi(event){
  let nombre_usuario = document.getElementById("nombre_usuario").value;
  let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombre_usuario}`;
  
  let formulario = event.currentTarget.form;
  let descripcionN = formulario.elements.descripcion.value;
  let valorN = formulario.elements.valor.value;
  let fechaN = formulario.elements.fecha.value;
  let etiquetasN = formulario.elements.etiquetas.value;

  valorN = parseFloat(valorN);
  etiquetasN = etiquetasN.split(",");

  let nuevoObjeto = {
      descripcion: descripcionN,
      fecha: fechaN,
      valor: valorN,
      etiquetas: etiquetasN
  }

  console.log(nuevoObjeto);

  if(nombre_usuario == ""){
      console.log("El input del nombre de nombre_usuario esta vacio");
      
  }else{
      fetch(url, {
          method: 'POST', 
          body: JSON.stringify(nuevoObjeto),
          headers:{
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          
          if(response.ok){
              console.log("La peticion de añadir ha sido correcta");
              CargarGastosApi();
          }else{
              console.log("La peticion de añadir ha sido erronea");
          }
      })
      .catch(err => console.error(err));
  }
}


function EditarGastoApi(){

  this.handleEvent = function(event){
      let nombre_usuario = document.getElementById("nombre_usuario").value;
      let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombre_usuario}/${this.gasto.gastoId}`;
      
      let formulario = event.currentTarget.form;
      let descripcionN = formulario.elements.descripcion.value;
      let valorN = formulario.elements.valor.value;
      let fechaN = formulario.elements.fecha.value;
      let etiquetasN = formulario.elements.etiquetas.value;

      valorN = parseFloat(valorN);
      etiquetasN = etiquetasN.split(",");
  
      let nuevoObjeto = {
          descripcion: descripcionN,
          fecha: fechaN,
          valor: valorN,
          etiquetas: etiquetasN
      }

      if(nombre_usuario == ""){
          console.log("El input del nombre de nombre_usuario esta vacio");
      } else {
          fetch(url, {
              method: 'PUT', 
              body: JSON.stringify(nuevoObjeto),
              headers:{
                  'Content-Type': 'application/json'
              }
          })
          .then(response => {
              
              if(response.ok){
                  console.log("Peticion correcta");
                  CargarGastosApi();
              }else{
                  console.log("Peticion incorrecta");
              }
          })
          .catch(err => console.error(err));
      }
  }
}


//Botones
const actualizarpresupuesto = document.getElementById("actualizarpresupuesto");
const anyadirgasto = document.getElementById("anyadirgasto");
const anyadirgastoFirmulario = document.getElementById("anyadirgasto-formulario");
const formularioFiltrador = document.getElementById("formulario-filtrado");
const btnGuardarGastos = document.getElementById("guardar-gastos");
const btnCargarGastos = document.getElementById("cargar-gastos");
const btnGastosApi = document.getElementById("cargar-gastos-api");
btnGastosApi.addEventListener("click", CargarGastosApi);

//Eventos
actualizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);
anyadirgasto.addEventListener('click', nuevoGastoWeb);
anyadirgastoFirmulario.addEventListener('click', nuevoGastoWebFormulario);


let filtGastForm = new filtrarGastosWeb();
formularioFiltrador.addEventListener('submit', filtGastForm);

let objGuardarGastosWeb = new guardarGastosWeb();
let objCargarGastosWeb = new cargarGastosWeb();
btnGuardarGastos.addEventListener('click', objGuardarGastosWeb);
btnCargarGastos.addEventListener('click', objCargarGastosWeb);

export{
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb,
} 
