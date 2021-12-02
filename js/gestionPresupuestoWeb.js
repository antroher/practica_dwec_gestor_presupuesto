"use strict";

import * as gestionPresupuesto from "./gestionPresupuesto.js";

document.getElementById("actualizarpresupuesto").addEventListener('click', actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener('click', nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);
document.getElementById("formulario-filtrado").addEventListener("submit", filtrarGastoWeb)

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
    let elemento = document.getElementById(idElemento);
    let mensaje =
        "<div class='agrupacion'>\n" +
        "<h1>Gastos agrupados por " + periodo + "</h1>\n";

    for (let etiq in agrup) {
        mensaje +=
            "<div class='agrupacion-dato'>\n" +
            "<span class='agrupacion-dato-clave'>" + etiq + "</span>\n" +
            "<span class='agrupacion-dato-valor'>" + agrup[etiq] + "</span>\n" +
            "</div>\n";
    }
    mensaje += "</div>\n";
    elemento.innerHTML += mensaje;
}

function repintar() {
    document.getElementById('presupuesto').innerHTML = '';
    document.getElementById('balance-total').innerHTML = '';
    document.getElementById('gastos-totales').innerHTML = '';

    mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());

    document.getElementById('listado-gastos-completo').innerHTML = '';
    let lisgas = gestionPresupuesto.listarGastos();
    lisgas.forEach(exp => { mostrarGastoWeb('listado-gastos-completo', exp); });

    document.getElementById('listado-gastos-filtrado-1').innerHTML = '';
    let gastosFlt = gestionPresupuesto.filtrarGastos({ fechaDesde: '2021-09-01', fechaHasta: '2021-09-30' });

    gastosFlt.forEach(gastoFiltrado => { mostrarGastoWeb('listado-gastos-filtrado-1', gastoFiltrado); });
    document.getElementById('listado-gastos-filtrado-2').innerHTML = '';
    gastosFlt = gestionPresupuesto.filtrarGastos({ valorMinimo: 50 });
    gastosFlt.forEach(gastoFiltrado => { mostrarGastoWeb('listado-gastos-filtrado-2', gastoFiltrado); });
    document.getElementById('listado-gastos-filtrado-3').innerHTML = '';
    gastosFlt = gestionPresupuesto.filtrarGastos({ valorMinimo: 200, etiquetasTiene: ['seguros'] });
    gastosFlt.forEach(gastoFiltrado => { mostrarGastoWeb('listado-gastos-filtrado-3', gastoFiltrado); });
    document.getElementById('listado-gastos-filtrado-4').innerHTML = '';
    gastosFlt = gestionPresupuesto.filtrarGastos({ valorMaximo: 50, etiquetasTiene: ['comida', 'transporte'] });
    gastosFlt.forEach(gastoFiltrado => { mostrarGastoWeb('listado-gastos-filtrado-4', gastoFiltrado); });
}

function actualizarPresupuestoWeb() {
    let presupuesto = prompt('Introduce un presupuesto nuevo');

    presupuesto = parseInt(presupuesto);
    gestionPresupuesto.actualizarPresupuesto(presupuesto);

    repintar();
}

function nuevoGastoWeb() {
    let descripcion = prompt("Introduzca la descripción del nuevo gasto: ");
    let valor = parseFloat(prompt("Introduzca el valor del nuevo gasto: "));
    let fecha = Date.parse(prompt("Introduzca la fecha del nuevo gasto: "));
    let etiquetas = prompt("Introduzca las etiquetas del nuevo gasto separadas por , : ").split(', ');

    let g = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas);
    gestionPresupuesto.anyadirGasto(g);

    repintar();
}

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
        let gasto = new gestionPresupuesto.CrearGasto(descrip.value, parseFloat(valor.value), fecha.value, ...etiq);
        gestionPresupuesto.anyadirGasto(gasto);
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
        let descri = prompt("Introduce la descripción nueva: ", this.gasto.descripcion);
        let val = prompt("Introduce el valor nuevo: ", this.gasto.valor);
        let fech = prompt("Introduce la fecha nueva: ", this.gasto.fecha);
        let etiquet = prompt("Inroduce las etiquetas nuevas: ", this.gasto.etiquetas);
        val = parseFloat(val);
        etiquet = etiquet.split(',');
        this.gasto.actualizarDescripcion(descri);
        this.gasto.actualizarValor(val);
        this.gasto.actualizarFecha(fech);
        this.gasto.anyadirEtiquetas(...etiquet);
        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function () {
        let num = this.gasto.id;
        gestionPresupuesto.borrarGasto(num);
        repintar();
    };
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function () {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function EditarHandleFormulario() {
    this.handleEvent = function () {
        let g0 = this.gasto;
        let btnEditG = this.btnEditarGasto;
        let divG0 = this.divG1;

        this.btnEditarGasto.disabled = true;
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let form = plantillaFormulario.querySelector("form");

        form.elements.descripcion.value = g0.descripcion;
        form.elements.valor.value = g0.valor;
        form.elements.fecha.value = new Date(g0.fecha).toLocaleDateString();
        form.elements.etiquetas.value = g0.etiquetas.toString();
        divG0.appendChild(form);


        form.addEventListener("submit", this.handleEvent = function (event) {
            event.preventDefault();
            g0.actualizarDescripcion(form.elements.descripcion.value);
            g0.actualizarValor(parseFloat(form.elements.valor.value));
            g0.actualizarFecha(form.elements.fecha.value);
            let etiquetas = form.elements.etiquetas;
            etiquetas = etiquetas.value.split(",");
            g0.anyadirEtiquetas(...etiquetas);
            btnEditG.disabled = false;
            divG0.removeChild(form);
            repintar();
        });

        let btnCancelar = form.querySelector("button.cancelar");
        btnCancelar.addEventListener("click", this.handleEvent = function () {
            btnEditG.disabled = false;
            divG0.removeChild(form);
            repintar();
        });
    }
}

function filtrarGastoWeb() {
    event.preventDefault();

    let formulario = document.getElementById("formulario-filtrado");
    let filDescrip = formulario.elements["formulario-filtrado-descripcion"].value;
    let filMin = formulario.elements["formulario-filtrado-valor-minimo"].value;
    let filMax = formulario.elements["formulario-filtrado-valor-maximo"].value;
    let filFecha = formulario.elements["formulario-filtrado-fecha-desde"].value;
    let filHastaFecha = formulario.elements["formulario-filtrado-fecha-hasta"].value;
    let filEtiquetas = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;

    let filtrarParametros = {
        descripcionContiene: (filDescrip === "") ? undefined : filDescrip,
        valorMinimo: (filMin === "") ? undefined : parseFloat(filMin),
        valorMaximo: (filMax === "") ? undefined : parseFloat(filMax),
        fechaDesde: (filFecha === "") ? undefined : filFecha,
        fechaHasta: (filHastaFecha === "") ? undefined : filHastaFecha,
        etiquetasTiene: (filEtiquetas === "") ? [] : gesPre.transformarListadoEtiquetas(filEtiquetas)
    }
    console.log(filtrarParametros)

    let gastosFiltrados = gesPre.filtrarGastos(filtrarParametros);
    document.getElementById("listado-gastos-completo").innerHTML = "";
    mostrarGastoWeb("listado-gastos-completo",gastosFiltrados);

    document.getElementById("formulario-filtrado").addEventListener("submit",filtrarGastoWeb);
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    nuevoGastoWebFormulario,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    EditarHandleFormulario,
    filtrarGastoWeb
}