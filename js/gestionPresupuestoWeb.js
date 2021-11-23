"use strict";

import * as gp from './gestionPresupuesto.js';

document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);
let evFiltrar = new filtrarGastosWeb();
document.getElementById("formulario-filtrado").addEventListener("submit", evFiltrar);
document.getElementById("guardar-gastos").addEventListener('click', guardarGastosWeb);
document.getElementById("cargar-gastos").addEventListener('click', cargarGastosWeb);

function mostrarDatoEnId(idElemento, valor){
    let mostrar = document.getElementById(idElemento);
    mostrar.textContent = `${valor}`;
}

function mostrarGastoWeb(idElemento, gasto){

    let mostrar = document.getElementById(idElemento);

    //Botón editar gasto
    let evEditar = new EditarHandle();
    evEditar.gasto = gasto;

    //Botón borrar gasto
    let evBorrar = new BorrarHandle();
    evBorrar.gasto = gasto;

    //Botón editar gasto formulario
    let evEditarFormulario = new EditarHandleFormulario();
    evEditarFormulario.gasto = gasto;

    let div = document.createElement("div");
    div.className = "gasto";

    let divDesc = document.createElement("div");
    divDesc.className = "gasto-descripcion";
    divDesc.textContent = `${gasto.descripcion}`;

    let divFech = document.createElement("div");
    divFech.className = "gasto-fecha";
    divFech.textContent = `${gasto.fecha}`;

    let divVal = document.createElement("div");
    divVal.className = "gasto-valor";
    divVal.textContent = `${gasto.valor}`;

    let divEtiq = document.createElement("div");
    divEtiq.className = "gasto-etiquetas";

    for(let etiqueta of gasto.etiquetas){
        let spanEtiq = document.createElement("span");
        spanEtiq.className = "gasto-etiquetas-etiqueta";
        spanEtiq.textContent = `${etiqueta}`;
        divEtiq.append(spanEtiq);
        //Borrar etiqueta
        let evEtiqueta = new BorrarEtiquetasHandle();
        evEtiqueta.gasto = gasto;
        evEtiqueta.etiqueta = etiqueta;
        spanEtiq.addEventListener("click", evEtiqueta);
    }

    let btnEditar = document.createElement("button");
    btnEditar.className = "gasto-editar";
    btnEditar.type = "button";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", evEditar);

    let btnBorrar = document.createElement("button");
    btnBorrar.className = "gasto-borrar";
    btnBorrar.type = "button";
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", evBorrar);

    let btnEditaFormulario = document.createElement("button");
    btnEditaFormulario.className = "gasto-editar-formulario";
    btnEditaFormulario.type = "button";
    btnEditaFormulario.textContent = "Editar (formulario)";
    btnEditaFormulario.addEventListener("click", evEditarFormulario);

    div.append(divDesc);
    div.append(divFech);
    div.append(divVal);
    div.append(divEtiq);
    div.append(btnEditar);
    div.append(btnBorrar);
    div.append(btnEditaFormulario);
    mostrar.append(div);  
}



function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let mostrar = document.getElementById(idElemento);

    let div = document.createElement("div");
    div.className = "agrupacion";

    let h1 = document.createElement("h1");
    h1.textContent = `Gastos agrupados por ${periodo}`;

    div.append(h1);

    for(const [key, value] of Object.entries(agrup)){
        let divAgrupacion = document.createElement("div");
        divAgrupacion.className = "agrupacion-dato";

        let spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.textContent = `${key}`;

        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.textContent = `${value}`;

        divAgrupacion.append(spanClave);
        divAgrupacion.append(spanValor);

        div.append(divAgrupacion);
    }

    mostrar.append(div);

}

function repintar(){
    let presupuesto = gp.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);

    let gTotales = gp.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gTotales);

    let bTotal = gp.calcularBalance();
    mostrarDatoEnId("balance-total", bTotal);

    document.getElementById("listado-gastos-completo").innerHTML = '';

    let lgastos = gp.listarGastos();

    for(let gasto of lgastos){
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb(){
    let presupuesto = prompt('Introduce un presupuesto nuevo');
    presupuesto = parseInt(presupuesto);

    gp.actualizarPresupuesto(presupuesto);

    repintar();
}

function nuevoGastoWeb(){
    let descripcion = prompt('Introduce la descripción del gasto');
    let valor = prompt('Introduce el valor del gasto');
    let fecha = prompt('Introduce la fecha del gasto');
    let etiquetas = prompt('Introduce las etiquetas');

    valor = parseFloat(valor);
    etiquetas = etiquetas.split(',');

    let gasto1 = new gp.CrearGasto(descripcion, valor, fecha, etiquetas);

    gp.anyadirGasto(gasto1);

    repintar();
}

// FORMULARIO

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");

    let final = document.getElementById("controlesprincipales");

    final.append(formulario);

    document.getElementById("anyadirgasto-formulario").disabled = true;

    let enviar = new enviarGastoHandle();

    formulario.addEventListener("submit", enviar);

    let cancelar = new cancelarGastoHandle();

    let btnCancelar = formulario.querySelector("button.cancelar");
    btnCancelar.addEventListener("click", cancelar);
}

function enviarGastoHandle(){
    this.handleEvent = function(e){
        e.preventDefault();
        
        let form = e.currentTarget;
        let desc = form.elements.descripcion.value;
       let val = form.elements.valor.value;
       let fech = form.elements.fecha.value;
       let etiq = form.elements.etiquetas.value;

       val = parseFloat(val);
       etiq = etiq.split(',');

       let gasto1 = new gp.CrearGasto(desc, val, fech, etiq);

       gp.anyadirGasto(gasto1);

       document.getElementById("anyadirgasto-formulario").disabled = false;

       repintar();
    }
}

function cancelarGastoHandle(){
    this.handleEvent = function(e){

        e.currentTarget.parentNode.remove();
        document.getElementById("anyadirgasto-formulario").removeAttribute('disabled');

        repintar();      
    }
}

function EditarHandle(){

    this.handleEvent = function(e){
       //Pedir datos al usuario
       let desc = prompt("Introduce la descripción nueva", this.gasto.descripcion);
       let val = prompt("Introduce el valor nuevo", this.gasto.valor);
       let fech = prompt("Introduce la fecha nueva", this.gasto.fecha);
       let etiq = prompt("Inroduce las etiquetas nuevas", this.gasto.etiquetas);

       val = parseFloat(val);
       etiq = etiq.split(',');

       this.gasto.actualizarDescripcion(desc);
       this.gasto.actualizarValor(val);
       this.gasto.actualizarFecha(fech);
       this.gasto.anyadirEtiquetas(...etiq);

       repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function(e){

        gp.borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(e){

        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
}

function EditarHandleFormulario(){
    this.handleEvent = function(e){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");

        let final = e.currentTarget; //el botón pulsado

        final.after(formulario); //Añadir el formulario debajo del botón

        final.disabled = true;

        /***** Valores formulario por defecto ****/
        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10); //Para que salga bien en el input tipo fecha
        formulario.elements.etiquetas.value = this.gasto.etiquetas;
    
        let enviar = new SubmitHandleGasto();
        enviar.gasto = this.gasto;
    
        formulario.addEventListener("submit", enviar);
    
        let cancelar = new cancelarGastoHandle();
    
        let btnCancelar = formulario.querySelector("button.cancelar");
        btnCancelar.addEventListener("click", cancelar);
    }
}

function SubmitHandleGasto(){
    this.handleEvent = function(e){
        e.preventDefault();
        
        let form = e.currentTarget;
        let desc = form.elements.descripcion.value;
       let val = form.elements.valor.value;
       let fech = form.elements.fecha.value;
       let etiq = form.elements.etiquetas.value;

       val = parseFloat(val);
       etiq = etiq.split(',');

       this.gasto.actualizarDescripcion(desc);
       this.gasto.actualizarValor(val);
       this.gasto.actualizarFecha(fech);
       this.gasto.anyadirEtiquetas(...etiq);

       repintar();
    }
}

function filtrarGastosWeb(){
    this.handleEvent = function(e){
        e.preventDefault();
        
        let form = e.currentTarget;
        let desc = form.elements['formulario-filtrado-descripcion'].value;
        let vMinimo = form.elements['formulario-filtrado-valor-minimo'].value;
        let vMaximo = form.elements['formulario-filtrado-valor-maximo'].value;
        let fDesde = form.elements['formulario-filtrado-fecha-desde'].value;
        let fHasta = form.elements['formulario-filtrado-fecha-hasta'].value;
        let etiq = form.elements['formulario-filtrado-etiquetas-tiene'].value;

        vMinimo = parseFloat(vMinimo);
        vMaximo = parseFloat(vMaximo);

        if(etiq != null){
            etiq = gp.transformarListadoEtiquetas(etiq);
        }

        let filtro = {
            etiquetasTiene: etiq,
            fechaDesde: fDesde,
            fechaHasta: fHasta,
            valorMinimo: vMinimo,
            valorMaximo: vMaximo,
            descripcionContiene: desc,
        }

        let gastosFiltro = gp.filtrarGastos(filtro);

        console.log(gastosFiltro);

        //Borramos todos los gastos
        let lista = document.getElementById('listado-gastos-completo');

        lista.innerHTML = '';

        //Otras opciones para borrar los gastos
        /*
        while(lista.firstChild){
            lista.removeChild(lista.firstChild);
        }

        document.querySelectorAll(".gasto").forEach(el => el.remove());
        */

        for(let gasto of gastosFiltro){
            mostrarGastoWeb("listado-gastos-completo", gasto);
        }

    }
}

function guardarGastosWeb(){
    localStorage.GestorGastosDWEC = JSON.stringify(gp.listarGastos());
}

function cargarGastosWeb(){
    let gastosLS;
    
    if(localStorage.getItem('GestorGastosDWEC')){
        gastosLS = JSON.parse(localStorage.getItem('GestorGastosDWEC'));   
    }else{
        gastosLS = [];
    }

    gp.cargarGastos(gastosLS);

    repintar();
}

export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    /*repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    nuevoGastoWebFormulario,*/
}