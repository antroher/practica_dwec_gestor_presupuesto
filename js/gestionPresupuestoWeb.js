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
    // evento editar
    let eventoEditar = new EditarHandle();
    eventoEditar.gasto = gasto;
    botonEditar.addEventListener("click", eventoEditar);

    // boton borrar
    let botonBorrar = document.createElement('button');
    botonBorrar.className = "gasto-borrar";
    botonBorrar.id = "gasto-borrar";
    botonBorrar.type = "button";
    botonBorrar.textContent = "Borrar gasto";
    // evento borrar
    let eventoBorrar = new BorrarHandle();
    eventoBorrar.gasto = gasto;
    botonBorrar.addEventListener("click", eventoBorrar);
     // boton editar form
    let botonEditarForm = document.createElement("button");
    botonEditarForm.className = "gasto-editar-formulario";
    botonEditarForm.id = "gasto-editar-formulario";
    botonEditarForm.type = "button";
    botonEditarForm.textContent = "Editar (formulario)";
    // evento editar form
    let eventoEditarForm = new EditarHandleFormulario();
    eventoEditarForm.gasto = gasto;
    botonEditarForm.addEventListener("click", eventoEditarForm);

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

    let formularioAbajo = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = formularioAbajo.querySelector("form");
    let controlesprincipales = document.getElementById("controlesprincipales");
    document.getElementById("anyadirgasto-formulario").disabled = true;
    
    controlesprincipales.append(formulario);

    let enviarGasto = new EnviarGastoHandle();
    enviarGasto.formulario = formulario; 
    formulario.addEventListener("submit", enviarGasto);

    let botonCancelar = formulario.querySelector("button.cancelar");
    let eventoCancelar = new CancelarFormularioHandle();
    botonCancelar.addEventListener("click", eventoCancelar)
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
function filtrarGastosWeb(){
    this.handleEvent = function(e){

        e.preventDefault();

        let plantillaForm = document.getElementById("filtrar-gastos");
        let datosForm = plantillaForm.querySelector("form");
        let objeto = {
            etiquetasTiene : gestionPresupuesto.transformarListadoEtiquetas(datosForm.elements["formulario-filtrado-etiquetas-tiene"].value),
            descripcionContiene : datosForm.elements["formulario-filtrado-descripcion"].value,
            valorMinimo : datosForm.elements["formulario-filtrado-valor-minimo"].value,
            valorMaximo : datosForm.elements["formulario-filtrado-valor-maximo"].value,
            fechaDesde : datosForm.elements["formulario-filtrado-fecha-desde"].value,
            fechaHasta : datosForm.elements["formulario-filtrado-fecha-hasta"].value
        }

        
        
        let gastosFiltrados = gestionPresupuesto.filtrarGastos(objeto);

        document.getElementById("listado-gastos-completo").innerHTML = "";

        for(let filtro of gastosFiltrados)
        {
            mostrarGastoWeb("listado-gastos-completo", filtro);
        }
    }
}
let eventoFormularioFiltrado = new filtrarGastosWeb();
let formularioFiltrado = document.getElementById("formulario-filtrado");
formularioFiltrado.addEventListener("submit", eventoFormularioFiltrado);

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
        e.currentTarget.parentNode.remove(); // borras formulario
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
        enviarGasto.formulario = formulario; 
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


export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    nuevoGastoWebFormulario,
    filtrarGastosWeb
}