"use strict";

import * as gestionPresupuesto from "./gestionPresupuesto.js";

document.getElementById("actualizarpresupuesto").addEventListener('click', actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener('click', nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);

function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elemento.appendChild(p);
}

function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento);

    let divG1 = document.createElement('div');
    divG1.className = 'gasto';
    let divGastoDescri = document.createElement('div');
    divGastoDescri.className = 'gasto-descripcion';
    divGastoDescri.textContent = gasto.descripcion;
    divG1.append(divGastoDescri);


    let divGastoFech = document.createElement('div');
    divGastoFech.className = 'gasto-fecha';
    divGastoFech.textContent = new Date(gasto.fecha).toLocaleDateString();
    divG1.append(divGastoFech);

    let divGastoV1 = document.createElement('div');
    divGastoV1.className = 'gasto-valor';
    divGastoV1.textContent = gasto.valor + '';
    divG1.append(divGastoV1);

    let divGastoEtiq = document.createElement('div');
    divGastoEtiq.className = 'gasto-etiquetas';
    gasto.etiquetas.forEach(label => {
        let spanetiq = document.createElement('span');
        spanetiq.className = 'gasto-etiquetas-etiqueta';
        spanetiq.textContent = label + '';
        let borraEti = new BorrarEtiquetasHandle();
        borraEti.gasto = gasto;
        borraEti.etiqueta = label;
        spanetiq.addEventListener('click', borraEti);
        divGastoEtiq.append(spanetiq);
    }
    );
    divG1.append(divGastoEtiq);
    if (idElemento == 'listado-gastos-completo') {
        let btnEditar = document.createElement('button');
        btnEditar.className = 'gasto-editar';
        btnEditar.type = 'button';
        btnEditar.textContent = 'Editar';
        let editarHandle = new EditarHandle();
        editarHandle.gasto = gasto;
        btnEditar.addEventListener('click', editarHandle);
        divG1.append(btnEditar);

        let btnEditarForm = document.createElement("button");
        btnEditarForm.className = "gasto-editar-formulario";
        btnEditarForm.type = "button";
        btnEditarForm.textContent = "Editar Form";

        let editarHandleForm = new EditarHandleFormulario();
        editarHandleForm.gasto = gasto;
        editarHandleForm.btnEditarGasto = btnEditarForm;
        editarHandleForm.divG1 = divG1;
        btnEditarForm.addEventListener("click", editarHandleForm);
        divG1.append(btnEditarForm);

        let btnBorrar = document.createElement('button');
        btnBorrar.className = 'gasto-borrar';
        btnBorrar.type = 'button';
        btnBorrar.textContent = 'Borrar';
        let borrarHandle = new BorrarHandle();
        borrarHandle.gasto = gasto;
        btnBorrar.addEventListener('click', borrarHandle);
        divG1.append(btnBorrar);
    }
    elemento.append(divG1);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

    let agrupacion = '';
    let elemento = document.getElementById(idElemento);

    for (let [param, value] of Object.entries(agrup)) {
        agrupacion += `
        <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${param}</span>
            <span class="agrupacion-dato-valor">${value}</span>
        </div>`
    };
    elemento.innerHTML +=
        `<div class="agrupacion">
      if (${periodo}==='dia')
      <h1>Gastos agrupados por día</h1>
        else
        <h1>Gastos agrupados por ${periodo}</h1>
        ${data}`

    elemento.innerHTML += `
    <div class="agrupacion">
    <h1>Gastos agrupados por ${periodo}</h1>
    ${agrupacion}
    `
}

function repintar() {
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";
    mostrarGastoWeb("listado-gastos-completo", gestionPresupuesto.listarGastos());
}

function actualizarPresupuestoWeb() {
    gestionPresupuesto.actualizarPresupuesto(parseFloat(prompt("Introduce un nuevo presupuesto:")));

    repintar();
}

let btnActPresu = document.getElementById("actualizarpresupuesto");
btnActPresu.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    let descripcion = prompt("Introduzca la descripción del nuevo gasto: ");
    let valor = parseFloat(prompt("Introduzca el valor del nuevo gasto: "));
    let fecha = Date.parse(prompt("Introduzca la fecha del nuevo gasto: "));
    let etiquetas = prompt("Introduzca las etiquetas del nuevo gasto separadas por , : ").split(', ');

    gestionPresupuesto.anyadirGasto(gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas));

    repintar();
}

let btnAddGasto = document.getElementById("anyadirgasto");
btnAddGasto.addEventListener("click", nuevoGastoWeb);

function nuevoGastoWebFormulario() {
    document.getElementById("anyadirgasto-formulario").disabled = true;

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    let form = plantillaFormulario.querySelector("form");
    form.addEventListener("submit", this.handleEvent = function (evento) {
        evento.preventDefault();
        let descrip = form.elements.descripcion;
        let valor = form.elements.valor;
        let fecha = form.elements.fecha;
        let etiq = form.elements.etiquetas;
        etiq = etiq.value.split(",");
        let gasto = new gestionpre.CrearGasto(descrip.value, parseFloat(valor.value), fecha.value, ...etiq);
        gestionpre.anyadirGasto(gasto);
        document.getElementById("anyadirgasto-formulario").disabled = false;
        document.getElementById("controlesprincipales").removeChild(form);
        repintar();

    });
    document.getElementById("controlesprincipales").append(form);

    let btnCancelar = form.querySelector("button.cancelar");
    btnCancelar.addEventListener("click", this.handleEvent = function () {

        document.getElementById("anyadirgasto-formulario").disabled = false;
        document.getElementById("controlesprincipales").removeChild(form);
        repintar();

    });
}

function EditarHandle() {
    this.handleEvent = function (evento) {
        let descripcion = prompt("Escriba la descripción");
        let valor1 = parseFloat(prompt("Escriba el valor"));
        let fecha = prompt("Escriba la fecha. Formato yyyy-mm-dd");
        let etiquetas = prompt("Escriba las etiquetas del gasto. Sepárelas con comas");
        let etiquetasArray = etiquetas.split(',');

        this.gasto.actualizarValor(valor1);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetasArray);
        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function (evento) {
        let num = this.gasto.id;
        gestionPresupuesto.borrarGasto(num);
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function (evento) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
}