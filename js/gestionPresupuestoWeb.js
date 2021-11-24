'use strict';
import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){

    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;

}

function mostrarGastoWeb(idElemento, gasto){
    let bloque = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.className = "gasto";
    divGasto.id = "gasto-editar";

    let divDescripcion = document.createElement('div');
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = `${gasto.descripcion}`;

    let divFecha = document.createElement('div');
    divFecha.className = "gasto-fecha";
    divFecha.textContent = `${gasto.fecha}`;

    let divValor = document.createElement('div');
    divValor.className = "gasto-valor";
    divValor.textContent = `${gasto.valor}`;

    let divEtiquetas = document.createElement('div');
    divEtiquetas.className = "gasto-etiquetas";
    
    // boton editar
    let botonEditar = document.createElement('button');
    botonEditar.className = "gasto-editar";
    botonEditar.id = "gasto-editar";
    botonEditar.type = "button";
    botonEditar.textContent = "Editar gasto";
    // evento del botonEditar
    let eventoEditar = new EditarHandle();
    eventoEditar.gasto = gasto;
    botonEditar.addEventListener("click", eventoEditar);

    // boton borrar
    let botonBorrar = document.createElement('button');
    botonBorrar.className = "gasto-borrar";
    botonBorrar.id = "gasto-borrar";
    botonBorrar.type = "button";
    botonBorrar.textContent = "Borrar gasto";
    // evento boton borrar
    let eventoBorrar = new BorrarHandle();
    eventoBorrar.gasto = gasto;
    botonBorrar.addEventListener("click", eventoBorrar);
     // segundo boton editar form
    let botonEditarForm = document.createElement("button");
    botonEditarForm.className = "gasto-editar-formulario";
    botonEditarForm.id = "gasto-editar-formulario";
    botonEditarForm.type = "button";
    botonEditarForm.textContent = "Editar (formulario)";
    // evento editar form
    let eventEditarForm = new EditarHandleFormulario();
    eventEditarForm.gasto = gasto;
    botonEditarForm.addEventListener("click", eventEditarForm);

    for (let eti of gasto.etiquetas) {

        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";
        spanEtiqueta.textContent = `${eti}`;
        divEtiquetas.append(spanEtiqueta);

        let eventoBorrarEti = new BorrarEtiquetasHandle();
        eventoBorrarEti.gasto = gasto;
        eventoBorrarEti.etiqueta = eti;
        spanEtiqueta.addEventListener('click', eventoBorrarEti);
    }
        bloque.append(divGasto);
        divGasto.append(divDescripcion);
        divGasto.append(divFecha);
        divGasto.append(divValor);
        divGasto.append(divEtiquetas);
        divGasto.append(botonEditar);
        divGasto.append(botonBorrar);
        divGasto.append(botonEditarForm);

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let bloque = `<div class="agrupacion">
                        <h1>Gastos agrupados por ${periodo}</h1>`
    
    for(let elemento in agrup)
    {
        bloque += `<div class="agrupacion-dato">
                        <span class="agrupacion-dato-clave">${elemento} </span>
                        <span class="agrupacion-dato-valor">${agrup[elemento]}</span>
                        </div> `;


    }
    bloque += `</div>`;
    document.getElementById(idElemento).innerHTML += bloque;
}

function repintar(){
let presupuesto = gestionPresupuesto.mostrarPresupuesto();
mostrarDatoEnId("presupuesto", presupuesto);

let gastos_totales = gestionPresupuesto.calcularTotalGastos();
mostrarDatoEnId("gastos-totales", gastos_totales) ;

let balance_total = gestionPresupuesto.calcularBalance()
mostrarDatoEnId("balance-total", balance_total)

document.getElementById("listado-gastos-completo").innerHTML = "";
let listado_gastos_completo = gestionPresupuesto.listarGastos()
for(let gasto of listado_gastos_completo){
    mostrarGastoWeb("listado-gastos-completo", gasto)
}
}

function actualizarPresupuestoWeb(){
    let presupuesto = parseFloat(prompt("Introduce un presupuesto"))
    gestionPresupuesto.actualizarPresupuesto(presupuesto)
    repintar()
}
let actualizarPre = document.getElementById("actualizarpresupuesto");
actualizarPre.addEventListener('click',actualizarPresupuestoWeb);

function nuevoGastoWeb(){
let descripcion = prompt("dime la descripcion del gasto");
let valor = parseFloat(prompt("dime el valor del gasto"));
let fecha = Date.parse(prompt("dime la fecha del gasto"));
let etiquetas = prompt("dime las etiquetas del gasto separadas por comas");
let arrayEtiquetas = etiquetas.split(',')

let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,arrayEtiquetas)
gestionPresupuesto.anyadirGasto(nuevoGasto)
repintar()
}
let agregarGasto = document.getElementById("anyadirgasto");
agregarGasto.addEventListener('click',nuevoGastoWeb);

function nuevoGastoWebFormulario(){

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
    let formu = document.getElementById("controlesprincipales");
   
    formu.append(formulario);
    //document.body.append(formulario);
    document.getElementById("anyadirgasto-formulario").disabled = true;

    let enviarGasto = new EnviarGastoHandle();
    enviarGasto.formulario = formulario; // le creamos una propiedad al manejador que se llame formulario y le asignamos el elemento formulario
    formulario.addEventListener("submit", enviarGasto);

    let cancelarFormBoton = formulario.querySelector("button.cancelar");
    let eventCancelar = new CancelarFormularioHandle();
    cancelarFormBoton.addEventListener("click", eventCancelar)
}
let anyadirFormulario = document.getElementById("anyadirgasto-formulario");
anyadirFormulario.addEventListener("click", nuevoGastoWebFormulario);

function EditarHandle() {
    this.handleEvent = function(e){
    let descripcion = prompt("dime la descripcion del gasto", this.gasto.descripcion);
    this.gasto.actualizarDescripcion(descripcion)
    let valor = parseFloat(prompt("dime el valor del gasto"));
    this.gasto.actualizarValor(parseFloat(valor));
    let fecha = ("dime la fecha del gasto con formato yyyy-mm-dd")
    this.gasto.actualizarFecha(fecha);
    let etiquetas = prompt("dime las etiquetas del gasto separadas por comas");
    let arrayEtiquetas = etiquetas.split(',');
    this.gasto.anyadirEtiquetas(...arrayEtiquetas);
    repintar()
    }
}
function BorrarHandle(){

    this.handleEvent = function(e){

        gestionPresupuesto.borrarGasto(this.gasto.id);

        repintar();
    }
}
function BorrarEtiquetasHandle(){

    this.handleEvent = function(e){
        
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}
function EnviarGastoHandle(){

    this.handleEvent = function(e){
        e.preventDefault();
     
         let descripcion = this.formulario.elements.descripcion.value;
         let valor = parseFloat(this.formulario.elements.valor.value);
         let fecha = this.formulario.elements.fecha.value;
         let etiquetas = this.formulario.elements.etiquetas.value;



        let gastoNuevo = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas);
        gestionPresupuesto.anyadirGasto(gastoNuevo);
        repintar();

        document.getElementById("anyadirgasto-formulario").disabled = false;
    }
}

function CancelarFormularioHandle(){

    this.handleEvent = function(e){
        
        document.getElementById("anyadirgasto-formulario").disabled = false;
        e.currentTarget.parentNode.remove(); // con parentNode borramos el formulario que es el padre del boton
        repintar();
    }
}

function EditarHandleFormulario(){

    this.handleEvent = function(e){
        
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");
    
        let btnEditarF = e.currentTarget;
        btnEditarF.after(formulario); // mete el formulario abajo del boton
        btnEditarF.disabled = true;

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = this.gasto.fecha;
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let enviarGasto = new SubmitHandle();
        enviarGasto.formulario = formulario; // le creamos una propiedad al manejador que se llame formulario y le asignamos el elemento formulario
        enviarGasto.gasto = this.gasto;
        formulario.addEventListener("submit", enviarGasto);

        let cancelarFormBoton = formulario.querySelector("button.cancelar");
        let eventCancelar = new CancelarFormularioHandle();
        cancelarFormBoton.addEventListener("click", eventCancelar);
    }
}

function SubmitHandle(){

    this.handleEvent = function(e){
        e.preventDefault();
 
        let descripcion = this.formulario.elements.descripcion.value;
        this.gasto.actualizarDescripcion(descripcion);

        let valor = this.formulario.elements.valor.value;
        valor = parseFloat(valor);
        this.gasto.actualizarValor(valor);

        let fecha = this.formulario.elements.fecha.value;
        this.gasto.actualizarFecha(fecha);

        let etiquetas = this.formulario.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(etiquetas);


        repintar();
    }
} 
/*
import * as gestionPresupuesto from "./gestionPresupuesto.js";

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

let botonAnyadirGasto = document.getElementById("anyadirgasto");
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);

let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
botonAnyadirGastoFormulario.addEventListener("click", nuevoGastoWebFormulario);



function mostrarDatoEnId(idElemento, valor){

    let div = document.getElementById(idElemento);
    div.textContent = valor;
}


function mostrarGastoWeb(idElemento, gasto){
    
    let cuerpo = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.className = "gasto";
    divGasto.id = "gasto-editar";

    let divDescripcion = document.createElement('div');
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = `${gasto.descripcion}`;

    let divFecha = document.createElement('div');
    divFecha.className = "gasto-fecha";
    divFecha.textContent = `${gasto.fecha}`;

    let divValor = document.createElement('div');
    divValor.className = "gasto-valor";
    divValor.textContent = `${gasto.valor}`;

    let divEtiquetas = document.createElement('div');
    divEtiquetas.className = "gasto-etiquetas";
    
    // boton editar
    let botonEditar = document.createElement('button');
    botonEditar.className = "gasto-editar";
    botonEditar.id = "gasto-editar";
    botonEditar.type = "button";
    botonEditar.textContent = "Editar gasto";
    // evento del botonEditar
    let eventEditar = new EditarHandle();
    eventEditar.gasto = gasto;
    botonEditar.addEventListener("click", eventEditar);

    // boton borrar
    let botonBorrar = document.createElement('button');
    botonBorrar.className = "gasto-borrar";
    botonBorrar.id = "gasto-borrar";
    botonBorrar.type = "button";
    botonBorrar.textContent = "Borrar gasto";
    // evento boton borrar
    let eventBorrar = new BorrarHandle();
    eventBorrar.gasto = gasto;
    botonBorrar.addEventListener("click", eventBorrar);
    
    // segundo boton editar form
    let botonEditarForm = document.createElement("button");
    botonEditarForm.className = "gasto-editar-formulario";
    botonBorrar.id = "gasto-editar-formulario";
    botonEditarForm.type = "button";
    botonEditarForm.textContent = "Editar (formulario)";
    // evento editar form
    let eventEditarForm = new EditarHandleFormulario();
    eventEditarForm.gasto = gasto;
    botonEditarForm.addEventListener("click", eventEditarForm);


    if(botonEditar.addEventListener("click", eventEditar)){
        divGasto.id = "gasto-editar";
    }else if(botonBorrar.addEventListener("click", eventBorrar)){
        divGasto.id = "gasto-borrar";
    }

    for (let eti of gasto.etiquetas) {

        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";
        spanEtiqueta.textContent = `${eti}`;
        divEtiquetas.append(spanEtiqueta);

        let eventBorrarEti = new BorrarEtiquetasHandle();
        eventBorrarEti.gasto = gasto;
        eventBorrarEti.etiqueta = eti;
        spanEtiqueta.addEventListener('click', eventBorrarEti);
    }



        divGasto.append(divDescripcion);
        divGasto.append(divFecha);
        divGasto.append(divValor);
        divGasto.append(divEtiquetas);
        divGasto.append(botonEditar);
        divGasto.append(botonBorrar);
        divGasto.append(botonEditarForm);

        cuerpo.append(divGasto);
     

}


function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    let cuerpo = document.getElementById(idElemento);
    
    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = "agrupacion";
    let h1 = document.createElement('h1');
    h1.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.append(h1);



    for (const[key, value] of Object.entries(agrup)) {
        
        let divAgruDato = document.createElement('div');
        divAgruDato.className = "agrupacion-dato";

        let spanKey = document.createElement('span');
        spanKey.className = "agrupacion-dato-clave";
        spanKey.textContent = `${key}`;

        let spanValue = document.createElement('span');
        spanValue.className = "agrupacion-dato-valor";
        spanValue.textContent = `${value}`;

        divAgruDato.append(spanKey);
        divAgruDato.append(spanValue);
        divAgrupacion.append(divAgruDato);
    }   

    cuerpo.append(divAgrupacion);
 
}


function repintar(){
    
    let presupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);

    let gastosTotales = gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gastosTotales);

    let balanceTotal = gestionPresupuesto.calcularBalance();
    mostrarDatoEnId("balance-total", balanceTotal);

    document.getElementById("listado-gastos-completo").innerHTML = "";
    let listaGastos = gestionPresupuesto.listarGastos();

    for (const gasto of listaGastos) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb(){

    let presupuesto = prompt("Introduce tu presupuesto");
    let presupuestoNum = parseInt(presupuesto);

    gestionPresupuesto.actualizarPresupuesto(presupuestoNum);
    repintar();

}

function nuevoGastoWeb(){
    
    let descripcion = prompt("Introduce una descripción");
    let valor = prompt("Introduce un valor");
    valor = parseFloat(valor);
    let fecha = prompt("Introduce una fecha tipo yyyy-mm-dd");
    let etiquetas = prompt("Introduce las etiquetas separadas por coma");
    etiquetas = etiquetas.split(',');

    let gastoNuevo = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas);
    gestionPresupuesto.anyadirGasto(gastoNuevo);
    repintar();
}

function nuevoGastoWebFormulario(){

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
    let formu = document.getElementById("controlesprincipales");
   
    formu.append(formulario);
    //document.body.append(formulario);
    document.getElementById("anyadirgasto-formulario").disabled = true;

    let enviarGasto = new EnviarGastoHandle();
    enviarGasto.formulario = formulario; // le creamos una propiedad al manejador que se llame formulario y le asignamos el elemento formulario
    formulario.addEventListener("submit", enviarGasto);

    let cancelarFormBoton = formulario.querySelector("button.cancelar");
    let eventCancelar = new CancelarFormularioHandle();
    cancelarFormBoton.addEventListener("click", eventCancelar)
}



function EditarHandle(){

    this.handleEvent = function(e){
      let descripcion = prompt("Introduce una descripcion:", this.gasto.descripcion);
      this.gasto.actualizarDescripcion(descripcion);

      let valor = prompt("Introduce un valor:", this.gasto.valor);
      this.gasto.actualizarValor(parseFloat(valor));

      let fecha = prompt("Introduce una fecha", this.gasto.fecha);
      this.gasto.actualizarFecha(fecha);

      let etiquetas = prompt("Introduce las etiquetas:", this.gasto.etiquetas);
      etiquetas = etiquetas.split(',');
      this.gasto.anyadirEtiquetas(...etiquetas);

      repintar();
    }
}

function BorrarHandle(){

    this.handleEvent = function(e){

        gestionPresupuesto.borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle(){

    this.handleEvent = function(e){
        
        //this.etiqueta = this.etiqueta.split(',');
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
}

function EnviarGastoHandle(){

    this.handleEvent = function(e){
        e.preventDefault();
     
         let descripcion = this.formulario.elements.descripcion.value;
         let valor = this.formulario.elements.valor.value;
         let fecha = this.formulario.elements.fecha.value;
         let etiquetas = this.formulario.elements.etiquetas.value;

         valor = parseFloat(valor);

        let gastoNuevo = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas);
        gestionPresupuesto.anyadirGasto(gastoNuevo);
        repintar();

        document.getElementById("anyadirgasto-formulario").disabled = false;
    }
}

function CancelarFormularioHandle(){

    this.handleEvent = function(e){
        
        document.getElementById("anyadirgasto-formulario").disabled = false;
        e.currentTarget.parentNode.remove(); // con parentNode borramos el formulario que es el padre del boton
        repintar();
    }
}

function EditarHandleFormulario(){

    this.handleEvent = function(e){
        
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");
        //let formu = document.getElementsByClassName("gasto");
    
        let btnEditarF = e.currentTarget;
        btnEditarF.after(formulario); // mete el formulario abajo del boton
        btnEditarF.disabled = true;

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = this.gasto.fecha;
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let enviarGasto = new SubmitHandle();
        enviarGasto.formulario = formulario; // le creamos una propiedad al manejador que se llame formulario y le asignamos el elemento formulario
        enviarGasto.gasto = this.gasto;
        formulario.addEventListener("submit", enviarGasto);

        let cancelarFormBoton = formulario.querySelector("button.cancelar");
        let eventCancelar = new CancelarFormularioHandle();
        cancelarFormBoton.addEventListener("click", eventCancelar);
    }
}

function SubmitHandle(){

    this.handleEvent = function(e){
        e.preventDefault();
 
        let descripcion = this.formulario.elements.descripcion.value;
        this.gasto.actualizarDescripcion(descripcion);

        let valor = this.formulario.elements.valor.value;
        valor = parseFloat(valor);
        this.gasto.actualizarValor(valor);

        let fecha = this.formulario.elements.fecha.value;
        this.gasto.actualizarFecha(fecha);

        let etiquetas = this.formulario.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(etiquetas);

        //document.getElementsByClassName("gasto-editar-formulario").disabled = true;

        repintar();
    }
}
*/
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    nuevoGastoWebFormulario
}