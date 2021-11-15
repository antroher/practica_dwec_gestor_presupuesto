"use strict";

import * as gP from './gestionPresupuesto.js';

document.getElementById("actualizarpresupuesto").addEventListener('click', actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener('click', nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener('click', nuevoGastoWebFormulario)


function mostrarDatoEnId(idElemento, valor) {
    let element = document.getElementById(idElemento);
    element.innerHTML = `<p>${valor}</p>` 
}

function mostrarGastoWeb(idElemento, gastos) {
    let element = document.getElementById(idElemento);
    
    gastos.forEach((gasto) => {
        let etiquetas = "";
        let tagIdStrings = [];
        let arrayEtiquetas = [];

        gasto.etiquetas.forEach((etiqueta) => {
            etiquetas += 
                `<span class="gasto-etiquetas-etiqueta" id="${gasto.id}-${etiqueta}">
                    ${etiqueta}
                </span>`;

            //Recogida de id del elemento y de la etiqueta a borrar en arrays para su posterior utilización.
            tagIdStrings.push(`${gasto.id}-${etiqueta}`);
            arrayEtiquetas.push(`${etiqueta}`);
        });    

        element.innerHTML +=
            `<div class="gasto">
                <div class="gasto-descripcion">${gasto.descripcion}</div>
                <div class="gasto-fecha">${gasto.fecha}</div> 
                <div class="gasto-valor">${gasto.valor}</div> 
                <div class="gasto-etiquetas">
                    ${etiquetas}
                </div>
                <button class="gasto-editar" id="gasto-editar-${gasto.id}" type="button">Editar</button>
                <button class="gasto-borrar" id="gasto-borrar-${gasto.id}" type="button">Borrar</button>
            </div>`;

            //Asignación del objeto manejador al boton de editar. 
            let editHandler = new EditarHandle();
            editHandler.gasto = gasto;
            document.getElementById(`gasto-editar-${gasto.id}`).addEventListener('click', editHandler);

            //Asignación del objeto manejador al boton de borrado.
            let deleteHandler = new BorrarHandle();
            deleteHandler.gasto = gasto;
            document.getElementById(`gasto-borrar-${gasto.id}`).addEventListener('click', deleteHandler);

            //Asignación del objeto manejador a los span de las etiquetas.
            tagIdStrings.forEach((tagId, index) => {
                let tagsHandler = new BorrarEtiquetasHandle();
                tagsHandler.gasto = gasto;
                tagsHandler.etiqueta = arrayEtiquetas[index];
                document.getElementById(tagId).addEventListener('click', tagsHandler);
            });
    });
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let element = document.getElementById(idElemento);
    let keys =  Object.keys(agrup);
    let values = Object.values(agrup);
    let agrupDato = "";
    let periodoString = "";

    switch (periodo) {
        case "dia":
            periodoString = "día";
            break;
        case "mes":
            periodoString = "mes";
            break;
        case "anyo":
            periodoString = "año";
            break;
    }

    keys.forEach((key, index) => {
        agrupDato += 
            `<div class="agrupacion-dato">
                <span class="agrupacion-dato-clave">${key}</span>
                <span class="agrupacion-dato-valor">${values[index]}</span>
             </div>`;
    });

    element.innerHTML += 
        `<div class="agrupacion">
            <h1>Gastos agrupados por ${periodoString}</h1>
            ${agrupDato}
        </div>`;
}

function repintar () {
    //Mostrar los datos en el div correspondiente.
    mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gP.calcularBalance());

    //Borrado de elementos en el div#listado-gastos-completo y su impresion de nuevo.
    document.getElementById("listado-gastos-completo").innerHTML = "";
    mostrarGastoWeb("listado-gastos-completo", gP.listarGastos());
}

function actualizarPresupuestoWeb() {
    //Actualizar el presupuesto.
    gP.actualizarPresupuesto(parseFloat(prompt("Introduce un nuevo presupuesto:")));

    //Volver a imprimir los datos con el nuevo presupuesto.
    repintar();
} 

function nuevoGastoWeb() {
    //Pedida de datos para la creación del gasto.
    let descripcion = prompt("Introduzca la descripción del nuevo gasto: ");
    let valor = parseFloat(prompt("Introduzca el valor del nuevo gasto: "));
    let fecha = Date.parse(prompt("Introduzca la fecha del nuevo gasto: "));
    let etiquetas = prompt("Introduzca las etiquetas del nuevo gasto separadas por , : ").split(',');

    //Creación y adición del gasto creado a la lista de gastos.
    gP.anyadirGasto(new gP.CrearGasto(descripcion,valor,fecha,etiquetas));

    //Volver a imprimir los datos con el nuevo objeto.
    repintar();
}

function EditarHandle () {
    this.handleEvent = function() {
        //Pedir al usuario la información necesaria para editar el gasto y su posterior actualización.
        this.gasto.actualizarDescripcion( 
            prompt("Introduzca la descripción nueva: "));
        
        this.gasto.actualizarValor( 
            parseFloat(prompt("Introduzca el valor nuevo: ")));
        
        this.gasto.actualizarFecha( 
            Date.parse(prompt("Introduzca la fecha nueva: ")));

        let etiquetas = prompt("Introduzca las nuevas etiquetas separadas por , : ");
            
        if(typeof etiquetas != "undefined" ) {
            this.gasto.anyadirEtiquetas(etiquetas.split(','))
        }
    
        //Llamada a la función repintar
        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function(event) {
        //Borrado de gasto.
        gP.borrarGasto(this.gasto.id);
        
        //Llamada a la función repintar.
        repintar();
    }
 }

function BorrarEtiquetasHandle() {
    this.handleEvent = function(event) {
        //Borrado de etiqueta.
        this.gasto.borrarEtiquetas(this.etiqueta);
    
        //Llamada a la función repintar.
        repintar();
    }
}

function nuevoGastoWebFormulario() {
    
    let gridForm = document.getElementById("formulario-template").content.cloneNode(true);
    var form = gridForm.querySelector("form");
    
    let cancelarEvent = new cancelarHandle();
    cancelarEvent.formulario = form;
    form.button.cancelar.addEventListener('click', cancelarEvent);
}

function cancelarHandle () {
    this.handleEvent = function(event) {
        //Eliminar el formulario creado.
        this.formulario.remove();

        document.getElementById("anyadirgasto-formulario").disabled = false;
    }
}

//Funciones a exportar para el test.
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb, 
    repintar
}