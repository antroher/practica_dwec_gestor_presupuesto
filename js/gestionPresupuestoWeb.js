"use strict"

//Importar los programas

import * as GestPres from './gestionPresupuesto.js';

//Función mostrarDatoenId

function mostrarDatoEnId(idElemento, valor){
    var elem = document.getElementById(idElemento);
    elem.textContent = valor;
}

//Función mostrarGastoWeb
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
   


//Función mostrarGastosAgrupadosWeb
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const elem = document.getElementById(idElemento);
    let datos = ""
    for (let propi in agrup) {
        datos += `
        <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${propi}</span>
            <span class="agrupacion-dato-valor">${agrup[propi]}</span>
        </div>`
    };
    elem.innerHTML += 
    `
    <div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${datos}
    `
}

//Función repintar
function repintar() {
    mostrarDatoEnId("presupuesto", GestPres.mostrarPresupuesto());    
    mostrarDatoEnId( "gastos-totales", GestPres.calcularTotalGastos());
    mostrarDatoEnId("balance-total", GestPres.calcularBalance());  
    document.getElementById("listado-gastos-completo").innerHTML = "";
    mostrarGastoWeb("listado-gastos-completo", GestPres.listarGastos());
    }

//Función actualizarPresupuestoWeb y botón actualizarpresupuesto
function actualizarPresupuestoWeb() {
    GestPres.actualizarPresupuesto(parseFloat(prompt("Inserta un presupuesto: ")));
    repintar();
}

//Funcion nuevoGastoWeb
function nuevoGastoWeb(){
    let descripcion = prompt("Inserta una descripción: ");
    let Avalor = parseFloat(prompt("Inserta un valor: "));
    let fecha = Date.parse(prompt("Insertar una fecha: "));
    let etiq = prompt("Insertar etiquetas: ").split(',');

    GestPres.anyadirGasto(new GestPres.CrearGasto(descripcion,Avalor,fecha,etiq));
    repintar();
  }

//EditarHandle
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

//borrarHandle
function BorrarHandle() {
    this.handleEvent = function (){
      GestPres.borrarGasto(this.gasto.id);

      repintar();
    }
}


//Borrar etiq Handle (BorrarEtiquetasHandle)
function BorrarEtiquetasHandle() {
    this.handleEvent = function (){
    this.gasto.borrarEtiquetas(this.etiqueta);

    repintar();
   }
}

//Funcion nuevoGastoWebFormulario()
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


//Funcion EditarhandleFormulario
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
    }
}

//Funcion submitEditHandle
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

//Funcion CancelarHandleFormulario
function CancelarHandleFormulario() {
    this.handleEvent = function (e){
        e.currentTarget.parentNode.remove();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");

        repintar();
    }
}

//Funcion EnviarGastoHandleFormulario

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

//Botones
document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);
document.getElementById("formulario-filtrado").addEventListener("submit", filtrarGastoWeb);

//Los exports 

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}

