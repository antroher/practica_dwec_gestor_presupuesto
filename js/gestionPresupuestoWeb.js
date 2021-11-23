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

    gastos.forEach((gasto) => {
        let etiquetas = "";

        let listadeEti = [];
        let etiLista = [];

        gasto.etiquetas.forEach((etiqueta) => {
            etiquetas += 
                `<span class="gasto-etiquetas-etiqueta" id="${gasto.id}-${etiqueta}">
                    ${etiqueta}
                </span>`;

                listadeEti.push(`${gasto.id}-${etiqueta}`);
                etiLista.push(`${etiqueta}`);

        });    
        
        elem.innerHTML +=
            `<div class="gasto">
                <div class="gasto-descripcion">${gasto.descripcion}</div>
                <div class="gasto-fecha">${new Date(gasto.fecha).toLocaleString()}</div> 
                <div class="gasto-valor">${gasto.valor}</div> 
                <div class="gasto-etiquetas">
                    ${etiquetas}
                </div>
          
            <button type="button" class="gasto-editar" id="editar-${gasto.id}">Editar</button>
            <button type="button" class="gasto-borrar" id="borrar-${gasto.id}">Eliminar</button>`;

            let AccionBorrar = new BorrarHandle()

            AccionBorrar.gasto = gasto;
            document.getElementById(`borrar-${gasto.id}`).addEventListener("click",AccionBorrar);

            let AccionEditar = new EditarHandle()

            AccionEditar.gasto = gasto;
            document.getElementById(`editar-${gasto.id}`).addEventListener("click",AccionEditar);
              
            listadeEti.forEach((tags, search) => {
                let etiqH = new BorrarEtiquetasHandle();
                etiqH.gasto = gasto;                                                   
                etiqH.etiqueta = etiLista[search];
                document.getElementById(tags).addEventListener('click', etiqH);
            });

            let botonEditarGastoForm = document.createElement("button");
            botonEditarGastoForm.className += 'gasto-editar-formulario';
            botonEditarGastoForm.textContent = 'Editar (formulario)';
            botonEditarGastoForm.type = 'button';

            let editarForm = new EditarHandleFormulario();
            editarForm.gasto = gasto;
            botonEditarGastoForm.addEventListener('click', editarForm);
            elem.append(botonEditarGastoForm);
    });

    
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
    this.handleEvent = function(event){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");
    
        let ManEvent = document.getElementById("controlesprincipales");
        ManEvent.append(formulario);

        let botonEditar = event.currentTarget;
        botonEditar.appendChild(formulario);

        formulario.elements.descripcion.value  = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let editFormulario = new submitHandle();
        editFormulario.gasto = this.gasto;
        formulario.addEventListener('submit', editFormulario);
        let botonCancelar = formulario.querySelector("button.cancelar");
        let cancelarO = new CancelarHandleFormulario();
        
        botonCancelar.addEventListener("click", cancelarO);
        botonEditar.setAttribute("disabled", "");
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


//Botones
document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);

//Los exports 

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}








