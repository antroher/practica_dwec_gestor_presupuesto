"use strict";

import * as gestionP from "./gestionPresupuesto.js";


// const gasto1 = new gestionP.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
// const gasto2 = new gestionP.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");


/*
function mostrarGastoWeb(idElemento, gasto) {

    let elemento = document.getElementById(idElemento); // Captura del div con id dado
    
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    elemento.append(divGasto);

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

    // Generar los span de etiquetas iterando la prop etiquetas del objeto gasto
    for (let etiqueta of gasto.etiquetas) {
        let spanE = document.createElement("span");
        spanE.className = "gasto-etiquetas-etiqueta";
        spanE.textContent = ` ${etiqueta}`;
        divEtiq.append(spanE);

        // Crear evt borrar en span de etiquetas y el objeto manejador evt asociado
        let handler1 = new BorrarEtiquetasHandle();
        handler1.gasto = gasto;         // Referencia al objeto gasto en la propiedad gasto
        handler1.etiqueta = etiqueta;   // Referencia a la etiqueta en la propiedad etiqueta
        spanE.addEventListener("click", handler1); // Cargar escuchador en la etiqueta
    }

    // Crear la estructura pedida, con divs para mostrar las prop y el str de spanEtiquetas
    divGasto.append(divDesc, divFech, divVal, divEtiq);
    

    
    // Agrega botones en caso de que el id dado sea el del listado de gastos    
    if (idElemento === 'listado-gastos-completo') {
        // Crear boton de editar un gasto y el objeto manejador evt asociado
        let editorBtn = document.createElement("button");
        editorBtn.className = 'gasto-editar';
        editorBtn.textContent = 'Editar';

        let editorHandler = new EditarHandle();
        editorHandler.gasto = gasto;                  // Referencia al objeto gasto en la propiedad gasto
        editorBtn.addEventListener('click', editorHandler);     // Cargar escuchador

        // Crear boton de borrar un gasto y el objeto manejador evt asociado
        let borradorBtn = document.createElement("button");
        borradorBtn.className = 'gasto-borrar'
        borradorBtn.textContent = 'Borrar';

        let borradorHandler = new BorrarHandle();
        borradorHandler.gasto = gasto;              // Referencia al objeto gasto en la propiedad gasto
        borradorBtn.addEventListener('click', borradorHandler);     // Cargar escuchador

        // Colgar los botones al final del div .gasto
        document.querySelector(".gasto").append(editorBtn, borradorBtn);    

    }
    
}

*/

// let gasto = {id: 12};
// console.log(gasto);

// let btnEditForm = document.createElement("button");
// btnEditForm.className = 'gasto-editar-formulario';
// btnEditForm.id = `gasto-editar-formulario-${gasto.id}`;
// btnEditForm.textContent = 'Editar (Formulario)';

// aplicacion.append(btnEditForm);




function EditarHandleFormulario() {
    this.handleEvent = function (event) {
        //Clonar el formulario del template y acceder a <form>
        let formulario = document.getElementById("formulario-template").content.cloneNode(true).querySelector("form");
        //Insertar el formulario en la página
        document.getElementById(`gasto-${this.gasto.id}`).append(formulario);

        //Deshabilitar el boton de editar gasto
        document.getElementById(`gasto-editar-formulario-${this.gasto.id}`).disabled = true;

        //Capturar los datos del gasto y asignarlos al formulario
        formulario.descripcion.value = this.gasto.descripcion;
        formulario.valor.value = this.gasto.valor;
        let fecha = new Date(this.gasto.fecha);
        let fechaFormateda = fecha.toISOString().substring(0, 10);
        formulario.fecha.value = fechaFormateda;
        //Extraer del array etiquetas del gasto las etiquetas
        let etiquetasC = "";
        this.gasto.etiquetas.forEach((etiqueta, index) => {
            if (this.gasto.etiquetas.length - 1 === index) {
                etiquetasC += etiqueta;
            }
            else {
                etiquetasC += etiqueta + ", ";
            }
        });
        formulario.etiquetas.value = etiquetasC;

        //Crear el objeto manejador de eventos del boton cancelar
        let cancelarHandler = new CancelarEditHandle();
        cancelarHandler.formulario = formulario;
        cancelarHandler.gasto = this.gasto;
        formulario.querySelector("button.cancelar").addEventListener('click', cancelarHandler);
        
        //Crear el objeto manejador de eventos del boton enviar
        let submitHandler = new SubmitEditHandle();
        submitHandler.gasto = this.gasto;
        formulario.addEventListener('submit', submitHandler);
        
    }
    
}


function SubmitEditHandle() {
    this.handleEvent = function (e) {
        //Actualizar las propiedades del gasto
        this.gasto.actualizarDescripcion(e.currentTarget.descripcion.value);
        this.gasto.actualizarValor(parseFloat(e.currentTarget.valor.value));
        this.gasto.actualizarFecha(e.currentTarget.fecha.value);

        //Comprobar si las nuevas etiquetas están definidas e introducirlas en array etiquetas para editar gasto.etiquetas
        let etiquetas = e.currentTarget.etiquetas.value;
        if (typeof etiquetas !== "undefined") {
            etiquetas = etiquetas.split(",");
        }
        this.gasto.etiquetas = etiquetas;

        //Llamar a la función repintar
        repintar();
    }
}

function CancelarEditHandle() {
    this.handleEvent = function () {
        //Borrar el formulario
        this.formulario.remove();

        //Habilitar el boton de editar gastos
        document.getElementById(`gasto-editar-formulario-${this.gasto.id}`).disabled = false;
    }
}





/*
let formulario = document.querySelector('#controlesprincipales');
formulario.querySelector("button.cancelar").addEventListener('click', cancelarHandler);

function cancelarHandler(e){
    alert("hola");
}
*/



/*
var presupuesto = 0;
var gastos = [];
var idGasto = 0;
const gasto1 = new gestionP.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
const gasto2 = new gestionP.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");

function anyadirGasto(gasto) {
    if (typeof (gasto) === "object") {
        gasto.id = idGasto;
        gastos.push(gasto);
        idGasto++;
    }
}

anyadirGasto(gasto1);
anyadirGasto(gasto2);
console.log(gasto1);
console.log(gasto2);
*/
