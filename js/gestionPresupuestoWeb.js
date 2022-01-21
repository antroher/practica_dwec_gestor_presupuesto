"use strict"

import * as gesPre from "./gestionPresupuesto.js";

//EVENTO BOTON ACTUALIZAR PRESUPUESTO

let botonActualizar = document.getElementById("actualizarpresupuesto");
botonActualizar.addEventListener('click', actualizarPresupuestoWeb)
//EVENTO BOTON AÑADIR GASTO
let botonAnyadir = document.getElementById("anyadirgasto");
botonAnyadir.addEventListener('click', nuevoGastoWeb);

let botonAyadirGastoForm = document.getElementById("anyadirgasto-formulario");
botonAyadirGastoForm.addEventListener('click', nuevoGastoWebFormulario);

document.getElementById("formulario-filtrado").addEventListener("submit",filtrarGastoWeb);
document.getElementById("cargar-gastos").addEventListener("click", cargarGastosWeb);
document.getElementById("guardar-gastos").addEventListener("click", guardarGastosWeb)
document.getElementById("cargar-gastos-api").addEventListener('click', cargarGastosApi)

function mostrarDatoEnId(idElemento,valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML = `<p>${valor}</p>`
    
}

function mostrarGastoWeb(idElemento,gastos){
    let element = document.getElementById(idElemento);

    gastos.forEach((gasto, posicion) => {
                
        let divG = document.createElement('div')
        divG.className = `gasto`;
        divG.setAttribute('id', `gasto-${gasto.id}`);


        let divGDes = document.createElement('div');
        divGDes.className = 'gasto-descripcion';
        divGDes.textContent = gasto.descripcion;

        let divGFecha = document.createElement('div');
        divGFecha.className = 'gasto-fecha';
        divGFecha.textContent = gasto.fecha;

        let divGValor = document.createElement('div');
        divGValor.className = 'gasto-valor';
        divGValor.textContent = gasto.valor;

        let divGEtiq = document.createElement('div');
        divGEtiq.className = 'gasto-etiquetas';

        //AÑADIR ETIQUETAS
        gasto.etiquetas.forEach((etiq, posicion) =>{
            let spanEtiqueta = document.createElement('span');
            spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
            spanEtiqueta.textContent = etiq;
            if(gasto.etiquetas.length !== posicion+1){
                spanEtiqueta.textContent += ", ";
            }
            else{
                spanEtiqueta.textContent += ".";
            }

            let EventoBorrarEtiq = new BorrarEtiquetasHandle();
            EventoBorrarEtiq.gasto = gasto;
            EventoBorrarEtiq.etiqueta = etiq;
            spanEtiqueta.addEventListener('click', EventoBorrarEtiq)

            divGEtiq.append(spanEtiqueta);
        })

        divG.append(divGDes);
        divG.append(divGFecha);
        divG.append(divGValor);
        divG.append(divGEtiq);

        if(idElemento === 'listado-gastos-completo'){
            //CREAR BOTÓN EDITAR PROMP
            let botonEditar = document.createElement('button');
            botonEditar.className = 'gasto-editar';
            botonEditar.textContent = 'Editar'
            //CREAR BOTÓN BORRAR
            let botonBorrar = document.createElement('button');
            botonBorrar.className = 'gasto-borrar';
            botonBorrar.textContent = 'Borrar';
            //CREAR BOTON EDITAR FORMULARIO
            let botonEditarForm = document.createElement('button');
            botonEditarForm.className = 'gasto-editar-formulario';
            botonEditarForm.setAttribute('id', `gasto-editar-formulario-${gasto.id}`)
            botonEditarForm.textContent = 'Editar (Formulario)'

            //Creación del boton de borrar gastoAPI y su objeto manejador de eventos.
            let buttonAPIDelete = document.createElement("button");
            buttonAPIDelete.className = 'gasto-borrar-api'
            buttonAPIDelete.textContent = 'Borrar (API)';

            let deleteAPIEvent = new borrarApiHandle();
            deleteAPIEvent.gasto = gasto; 
            buttonAPIDelete.addEventListener('click', deleteAPIEvent);
            //ELEMENTO VACIO PARA SEPARAR LOS GASTOS
            let divVacio = document.createElement('div');
            divVacio.className = 'salto';
            divVacio.textContent = "______________________________ ";

            //EVENTO BOTON EDITAR GASTO
            let EventoEditarHandle = new EditarHandle();
            EventoEditarHandle.gasto = gasto;
            botonEditar.addEventListener('click', EventoEditarHandle);
            //EVENTO BOTON BORRAR GASTO
            let EventoBorrarHandle = new BorrarHandle();
            EventoBorrarHandle.gasto = gasto;
            botonBorrar.addEventListener(`click`, EventoBorrarHandle);
            //AGREGAR FUNCIÓN AL BOTON AÑADIR GASTO FORMULARIO
            let EventoEditarGastoForm = new EditarHandleFormulario();
            EventoEditarGastoForm.gasto = gasto;
            botonEditarForm.addEventListener('click', EventoEditarGastoForm);

            divG.append(botonEditar);
            divG.append(botonBorrar);
            divG.append(botonEditarForm);
            divG.append(divVacio);
            }
        element.append(divG);
    })
}
function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let elemento = document.getElementById(idElemento);

    
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
        ${gastos}
    </div>`;
}

function repintar(){
    mostrarDatoEnId("presupuesto",gesPre.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gesPre.calcularTotalGastos());
    mostrarDatoEnId("balance-total",gesPre.calcularBalance());

    let elemento = document.getElementById("listado-gastos-completo");
    elemento.innerHTML = "";
    mostrarGastoWeb("listado-gastos-completo", gesPre.listarGastos());
}

function actualizarPresupuestoWeb (){
    let nuevoValor = parseFloat(prompt("Introduce un presupuesto."));
    gesPre.actualizarPresupuesto(nuevoValor);
    repintar();
}

function nuevoGastoWeb (){
    let descripcion = prompt("Descripción.");
    let valor = parseFloat(prompt("Valor."));
    let fecha = Date.parse(prompt("Fecha."));
    let etiquetas = prompt("Etiquetas.");

    let listaEtiquetas = etiquetas.split(',');

    let gasto = new gesPre.CrearGasto(descripcion, valor, fecha, listaEtiquetas);

    gesPre.anyadirGasto(gasto);

    repintar();
}

function EditarHandle (){
    this.handleEvent = function(evento){
        let descripcion = prompt("Descripción.");
        let valor = parseFloat(prompt("Valor."));
        let fecha = Date.parse(prompt("Fecha."));
        let etiquetas = prompt("Etiquetas.");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha (fecha);
        
        if(etiquetas != undefined){
            let listaEtiquetas = etiquetas.split(',');
            this.gasto.anyadirEtiquetas(listaEtiquetas); 
        }

        repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function(evento){
        gesPre.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function(evento) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

//PRACTICA 6 FORMULARIOS -------------------------------------------------
//IMPRIME FORUMLARIO AL CREAR GASTO
function nuevoGastoWebFormulario(){
    let idElemento = document.getElementById('controlesprincipales');
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
    idElemento.append(formulario);
    
    //DESACTIVAR BOTÓN
    document.querySelector("button[id='anyadirgasto-formulario']").disabled = true;

    //creamos evento cancelar
    let EventoCancelarForm = new cancelarFromHandle();
    EventoCancelarForm.formulario = formulario;
    formulario.querySelector("button[class='cancelar']").addEventListener('click', EventoCancelarForm);

    //creamos evento submit
    let EventoSubmitForm = new submitFormHandle();
    EventoSubmitForm.formulario = formulario;
    formulario.addEventListener('submit', EventoSubmitForm);

    let submitApiEvent = new submitApiHandle();
    submitApiEvent.formulario = form;
    form.querySelector("button[class='gasto-enviar-api']").addEventListener('click', submitApiEvent);
}


//EVENTO BOTÓN CANCELAR
function cancelarFromHandle(){
    this.handleEvent = function(event){
        //Activa botón añadirgasto-formulario
        document.querySelector("button[id='anyadirgasto-formulario']").disabled = false;
        repintar();
        this.formulario.remove();
    }
}
//EVENTO SUBMIT CREAR GASTO FORM
function submitFormHandle(){
    this.handleEvent = function(event){
        event.preventDefault();
        let descripcion = event.currentTarget.descripcion.value;
        let valor = parseFloat(event.currentTarget.valor.value);
        let fecha = event.currentTarget.fecha.value;
        let etiquetas = event.currentTarget.etiquetas.value;     
        
        
        let gasto = new gesPre.CrearGasto(descripcion,valor,fecha,etiquetas);
        gesPre.anyadirGasto(gasto)

        //activar boton añadir gasto
        document.querySelector("button[id='anyadirgasto-formulario']").disabled = false;
        //Eliminar formulario
        // event.currentTarget.remove();
        repintar();
    }
}

//IMPRIME FORMULARIO AL EDITAR GASTO
function EditarHandleFormulario(){
    this.handleEvent = function(event){
        repintar();
        //DESABILITAR LOS BOTONES
        document.querySelector("button[id='anyadirgasto-formulario']").disabled = true;
        document.querySelector(`button[id='gasto-editar-formulario-${this.gasto.id}']`).disabled = true;
        //CLONAR E IMPRIMIR FORMULARIO EN GASTO A EDITAR
        let idElemento = document.querySelector(`[id='gasto-${this.gasto.id}']`);
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");
        idElemento.append(formulario);
        //TEXTBOX CON SU VALOR
        document.querySelector(`input[id='descripcion']`).value = this.gasto.descripcion;
        document.querySelector(`input[id='valor']`).value = this.gasto.valor;
        document.querySelector(`input[id='etiquetas']`).value = this.gasto.etiquetas;
        //CABIAR FORMATO FECHA
        let fecha = new Date(this.gasto.fecha);
        let fechaFormato = fecha.toISOString().substring(0,10);
        document.querySelector(`input[id='fecha']`).value = fechaFormato;


        let EventoBotonCancelar = new cancelarFromHandle();
        EventoBotonCancelar.formulario = formulario;
        formulario.querySelector(`button[class='cancelar']`).addEventListener('click', EventoBotonCancelar);

        let EventoBotonSubmit = new submitFormGastoHandle();
        EventoBotonSubmit.formulario = formulario;
        EventoBotonSubmit.gasto = this.gasto;
        formulario.addEventListener('submit', EventoBotonSubmit);

        let editApiEvent = new editApiHandle();
        editApiEvent.formulario = form;
        editApiEvent.gasto = this.gasto;
        form.querySelector("button[class='gasto-enviar-api']").addEventListener('click', editApiEvent);


    }
}

//EVENTO SUBMIT EDITAR GASTO FORM
function submitFormGastoHandle(){
    this.handleEvent = function(event){
        event.preventDefault();
        let descripcion = event.currentTarget.descripcion.value;
        let valor = parseFloat(event.currentTarget.valor.value);
        let fecha = event.currentTarget.fecha.value;
        let etiquetas = event.currentTarget.etiquetas.value;        
        
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        if(etiquetas != undefined){
            let listaEtiquetas = etiquetas.split(',');
            this.gasto.etiquetas = listaEtiquetas; 
        }
        //activar boton añadir gasto
        document.querySelector("button[id='anyadirgasto-formulario']").disabled = false;
        //Eliminar formulario
        // event.currentTarget.remove();
        repintar();
    }
}

//7.
function filtrarGastoWeb (){
    event.preventDefault();

    let formulario = document.getElementById("formulario-filtrado");
    let filFormDescripcion = formulario.elements["formulario-filtrado-descripcion"].value;
    let filFormMin = formulario.elements["formulario-filtrado-valor-minimo"].value;
    let filFormMax = formulario.elements["formulario-filtrado-valor-maximo"].value;
    let filFormFecha = formulario.elements["formulario-filtrado-fecha-desde"].value;
    let filFormHastaFecha = formulario.elements["formulario-filtrado-fecha-hasta"].value;
    let filFormEtiquetas = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;

    //Creación del objeto para filtrar gastos
    let filtrarParametros ={
        descripcionContiene: (filFormDescripcion === "")? undefined : filFormDescripcion,
        valorMinimo: (filFormMin === "")? undefined : parseFloat(filFormMin),
        valorMaximo:(filFormMax === "")? undefined: parseFloat(filFormMax),
        fechaDesde:(filFormFecha === "")? undefined : filFormFecha,
        fechaHasta: (filFormHastaFecha === "")? undefined : filFormHastaFecha,
        etiquetasTiene:(filFormEtiquetas === "")? [] : gesPre.transformarListadoEtiquetas(filFormEtiquetas)
    }
    console.log(filtrarParametros)
    
    let gastosFiltrados = gesPre.filtrarGastos(filtrarParametros);
    //console.log(gastosFiltrados)

    //Resetear la impresion de gastos listados.
    document.getElementById("listado-gastos-completo").innerHTML = "";
    mostrarGastoWeb("listado-gastos-completo",gastosFiltrados);
}


//T.8

function guardarGastosWeb(){
    localStorage.GestorGastosDWEC = JSON.stringify(gesPre.listarGastos());
}


function cargarGastosWeb(){
    let newListadogasto = JSON.parse(localStorage.getItem("GestorGastosDWEC"));

    if(newListadogasto !== null){
        gesPre.cargarGastos(newListadogasto);
    }
    else{
        gesPre.cargarGastos([]);
    }

    repintar();
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function cargarGastosApi () {
    //Obtener el nombre de usuario mediante la propiedad "value" del input y si esta vacía pedirla al usuario.
    if (document.getElementById("nombre_usuario").value === "") {
        let nombreUsuario = prompt("Introduzca el nombre de usuario");
        document.getElementById("nombre_usuario").value = nombreUsuario;
    }
     
    //Obtener mediante fetch la lista de gastos de la API con nuestra URL personal.
    let response = await fetch(
        `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${document.getElementById("nombre_usuario").value}`,
        {method: 'GET'})

    //Comprobación de si la respuesta ha sido correcta.
    if (response.ok) {
        let listaGastoJSON = await response.json();
        gesPre.cargarGastos(listaGastoJSON);
        repintar();
    }
    else {
        console.log(`Error de HTTP -> ${response.status}`);
    }
}

function submitApiHandle() {
    this.handleEvent = async function() {
        //Obtener el nombre de usuario mediante la propiedad "value" del input y si esta vacía pedirla al usuario.
        if (document.getElementById("nombre_usuario").value === "") {
            let nombreUsuario = prompt("Introduzca el nombre de usuario");
            document.getElementById("nombre_usuario").value = nombreUsuario;
        }

        //Obtener el cuerpo del gasto mediante la propiedad "value" de los inputs del formulario y crear un objeto con los valores.
        let gasto = {
            descripcion: this.formulario.descripcion.value,
            valor: this.formulario.valor.value,
            fecha: this.formulario.fecha.value,
            etiquetas: (typeof this.formulario.etiquetas.value !== "undefined") ? this.formulario.etiquetas.value.split(",") : undefined,
            id: id
        }
        
        //Realización del POST del gasto mediante el metodo fecth.
        let response = await fetch(
            `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${document.getElementById("nombre_usuario").value}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            //Casteo del objeto a JSON.
            body: JSON.stringify(gasto)
        });
        
        if (response.ok) {
            id++;
        }
    }
} 

function editApiHandle() {
    this.handleEvent = async function() {
        //Obtener el nombre de usuario mediante la propiedad "value" del input y si esta vacía pedirla al usuario.
        if (document.getElementById("nombre_usuario").value === "") {
            let nombreUsuario = prompt("Introduzca el nombre de usuario");
            document.getElementById("nombre_usuario").value = nombreUsuario;
        }

        //Actualización de los datos del gasto.
        this.gasto.actualizarDescripcion(this.formulario.descripcion.value);
        this.gasto.actualizarValor(this.formulario.valor.value);
        this.gasto.actualizarFecha(this.formulario.fecha.value);
        this.gasto.etiquetas = (typeof this.formulario.etiquetas.value !== "undefined") ? this.formulario.etiquetas.value.split(",") : this.gasto.etiquetas;
        

        //Realización del PUT del gasto mediante el metodo fetch.
        let response = await fetch(
            `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${document.getElementById("nombre_usuario").value}/${this.gasto.gastoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            //Casteo del objeto a JSON.
            body: JSON.stringify(this.gasto)
        });

        if(response.ok) {
            cargarGastosApi();
        }
        else {
            console.log(`Error de HTTP -> ${response.status}`);
        }
    }
}

function borrarApiHandle() {
    this.handleEvent  = async function () {
        //Obtener el nombre de usuario mediante la propiedad "value" del input y si esta vacía pedirla al usuario.
    if (document.getElementById("nombre_usuario").value === "") {
        let nombreUsuario = prompt("Introduzca el nombre de usuario");
        document.getElementById("nombre_usuario").value = nombreUsuario;
    }

    let response = await fetch(
        `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${document.getElementById("nombre_usuario").value}/${this.gasto.gastoId}`, {
        method: 'DELETE'
    });

    if(response.ok) {
        cargarGastosApi();
    }
    else {
        console.log(`Error de HTTP -> ${response.status}`);
    }
    }
}


//El export de las funciones
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    filtrarGastoWeb
}