"use strict";

import * as gP from './gestionPresupuesto.js';

document.getElementById("actualizarpresupuesto").addEventListener('click', actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener('click', nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener('click', nuevoGastoWebFormulario)


function mostrarDatoEnId(idElemento, valor) {
    let element = document.getElementById(idElemento);
    element.innerHTML = `<p>${valor}</p>` 
}

function mostrarGastoWeb(idElemento, gasto) {
    // Obtención del div del HTML.
    let element = document.getElementById(idElemento);

    //Creación de Divs
    let divGasto = document.createElement("div");
    divGasto.className = 'gasto';
    divGasto.setAttribute('id', `gasto-${gasto.id}`)

    let divGDesc = document.createElement("div");
    divGDesc.className = 'gasto-descripcion';
    divGDesc.textContent = gasto.descripcion;

    let divGFecha = document.createElement("div");
    divGFecha.className = 'gasto-fecha';
    divGFecha.textContent = gasto.fecha;

    let divGValor = document.createElement("div");
    divGValor.className = 'gasto-valor';
    divGValor.textContent = gasto.valor;
        
    let divGEtiq = document.createElement("div"); 
    divGEtiq.className = 'gasto-etiquetas';

    gasto.etiquetas.forEach((etiqueta, index) => {
        //Creación del span.
        let spanEtiq = document.createElement("span");
        spanEtiq.className = 'gasto-etiquetas-etiqueta';

        //Decorador dependiendo de si es la ultima etiqueta o no.
        if (gasto.etiquetas.length - 1 === index) {
            spanEtiq.textContent = `${etiqueta}`;
        }
        else {
            spanEtiq.textContent = `${etiqueta} | `
        }

        //Creación del objeto controlador del evento y asociación al mismo.
        let tagHandler = new BorrarEtiquetasHandle();
        tagHandler.gasto = gasto;
        tagHandler.etiqueta = etiqueta;
        spanEtiq.addEventListener('click', tagHandler);

        //Ligado al div de etiquetas.
        divGEtiq.append(spanEtiq);
    });

    //Asignado de divs al div padre('gasto').
    divGasto.append(divGDesc, divGFecha, divGValor, divGEtiq);

    //Si el idElemento otro al listado de gastos no debe de añadir los botones.
    if (idElemento === 'listado-gastos-completo') {
        //Creado del boton de editar y su objeto manejador de eventos.
        let buttonEdit = document.createElement("button");
        buttonEdit.className = 'gasto-editar';
        buttonEdit.textContent = 'Editar';
        
        let editHandler = new EditarHandle();
        editHandler.gasto = gasto;
        buttonEdit.addEventListener('click', editHandler);

        //Creado del boton de borrar y su objeto manejador de eventos.
        let buttonDelete = document.createElement("button");
        buttonDelete.className = 'gasto-borrar'
        buttonDelete.textContent = 'Borrar';

        let deleteHandler = new BorrarHandle();
        deleteHandler.gasto = gasto;
        buttonDelete.addEventListener('click', deleteHandler);

        //Creado del boton de editar gasto mediante formulario.
        let buttonEditForm = document.createElement("button");
        buttonEditForm.className = 'gasto-editar-formulario';
        buttonEditForm.textContent = 'Editar (Formulario)';

        let editFormHandler = new EditarHandleFormulario();
        editFormHandler.gasto = gasto;
        buttonEditForm.addEventListener('click', editFormHandler);

        //Colgado de botones al div del gasto.
        divGasto.append(buttonEdit, buttonDelete, buttonEditForm);
    }

    //Asignado del div gasto al div padre ('listado-gastos')
    element.append(divGasto);

    // //FUNCION ANTIGUA
    // //Recogida del div del html.
    // let element = document.getElementById(idElemento); 
    
    // //Creación de variables para su posterior utilización.
    // let etiquetas = "";
    // let tagIdStrings = [];
    // let arrayEtiquetas = [];

    // //Concatenación de las etiquetas del gasto y su guardado en arrays para su posterior uso.
    // gasto.etiquetas.forEach((etiqueta) => {
    //     etiquetas += 
    //         `<span class="gasto-etiquetas-etiqueta" id="${gasto.id}-${etiqueta}">
    //             ${etiqueta}
    //         </span>`;

    //     //Recogida de id del elemento y de la etiqueta a borrar en arrays para su posterior utilización.
    //     tagIdStrings.push(`${gasto.id}-${etiqueta}`);
    //     arrayEtiquetas.push(`${etiqueta}`);
    // });    

    // //Creación de la estructura HTML.
    // element.innerHTML +=
    //     `<div class="gasto">
    //         <div class="gasto-descripcion">${gasto.descripcion}</div>
    //         <div class="gasto-fecha">${gasto.fecha}</div> 
    //         <div class="gasto-valor">${gasto.valor}</div> 
    //         <div class="gasto-etiquetas">
    //             ${etiquetas}
    //         </div>
    //         <button class="gasto-editar" id="gasto-editar-${gasto.id}" type="button">Editar</button>
    //         <button class="gasto-borrar" id="gasto-borrar-${gasto.id}" type="button">Borrar</button>
    //     </div>`;

    //     //Asignación del objeto manejador al boton de editar. 
    // let editHandler = new EditarHandle();
    // editHandler.gasto = gasto;
    // document.getElementById(`gasto-editar-${gasto.id}`).addEventListener('click', editHandler);
    
    // //Asignación del objeto manejador al boton de borrado.
    // let deleteHandler = new BorrarHandle();
    // deleteHandler.gasto = gasto;
    // document.getElementById(`gasto-borrar-${gasto.id}`).addEventListener('click', deleteHandler);

    // //Asignación del objeto manejador a los span de las etiquetas.
    // tagIdStrings.forEach((tagId, index) => {
    //     let tagsHandler = new BorrarEtiquetasHandle();
    //     tagsHandler.gasto = gasto;
    //     tagsHandler.etiqueta = arrayEtiquetas[index];
    //     document.getElementById(tagId).addEventListener('click', tagsHandler);
    // });
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
    document.getElementById("presupuesto").innerHTML = "";
    mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto());

    document.getElementById("gastos-totales").innerHTML = "";
    mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos());

    document.getElementById("balance-total").innerHTML = "";
    mostrarDatoEnId("balance-total", gP.calcularBalance());

    //Borrado de elementos en el div#listado-gastos-completo y su impresion de nuevo.
    document.getElementById("listado-gastos-completo").innerHTML = "";
    for (let gasto of gP.listarGastos()) {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    }
    
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
    //Clonación y creación del formulario mediante el template (plantilla).
    let form = document.getElementById("formulario-template").content.cloneNode(true).querySelector("form");
    document.getElementById("controlesprincipales").append(form);

    //Cancelación del boton de añadir gasto.
    document.getElementById('anyadirgasto-formulario').disabled = true;
    
    //Creación del objeto manipulador de eventos del boton enviar.
    let submitEvent = new submitHandle();
    form.addEventListener('submit', submitEvent);

    //Creación del objeto manipulador de eventos del boton cancelar.
    let cancelarEvent = new cancelarHandle();
    cancelarEvent.formulario = form;
    form.querySelector("button[class='cancelar']").addEventListener('click', cancelarEvent);
}

function submitHandle() {
    this.handleEvent = function(event) {
        //Prevenir el efecto por defecto del formulario.
        event.preventDefault();

        //Recogida de datos del propio formulario.
        let descripcion = event.currentTarget.descripcion.value;
        let valor = event.currentTarget.valor.value;
        let fecha = event.currentTarget.fecha.value;
        let etiquetas = event.currentTarget.etiquetas.value;

        //Separación de las etiquetas a un array (Si estan definidas).
        if (typeof etiquetas !== 'undefined') {
            etiquetas = etiquetas.split(",");
        }

        //Creación de gasto con los datos recogidos.
        let gasto = new gP.CrearGasto(descripcion, valor, fecha, etiquetas);

        //Adición del gasto a la lista.
        gP.anyadirGasto(gasto);

        //Llamar a la función repintar.
        repintar();

        //Activación del boton de añadir gasto de nuevo.
        document.getElementById('anyadirgasto-formulario').disabled = false;
    }
}

function cancelarHandle () {
    this.handleEvent = function() {
        //Eliminar el formulario creado.
        this.formulario.remove();

        //Activación del boton de añadir gastos de nuevo.
        document.getElementById("anyadirgasto-formulario").disabled = false;
    }
}

function EditarHandleFormulario() {
    this.handleEvent = function(event) {
        //Clonación y creación del formulario mediante el template (plantilla).
        let form = document.getElementById("formulario-template").content.cloneNode(true).querySelector("form");
        document.getElementById(`gasto-${this.gasto.id}`).append(form);

        //Recogida y representación de datos del gasto en el formulario.
        form.descripcion.value = this.gasto.descripcion;
        form.valor.value = this.gasto.valor;

        //Recogida y representación de la fecha del gasto.
        let fecha = new Date(this.gasto.fecha);
        let fechaFormateda = fecha.toISOString().substring(0,10);
        form.fecha.value = fechaFormateda;

        //Recogida y representacion de las etiquetas del gasto.
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

        //Creación del objeto manejador de eventos del boton cancelar.
        let cancelarHandle = new cancelarHandle();
        
    }

    function submitEditHandle () {
        this.handleEvent = function(event) {

        }
    }
}

//Funciones a exportar para el test.
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb, 
    repintar
}