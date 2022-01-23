"use strict";

import * as gestionPresupuesto from "./gestionPresupuesto.js";

document.getElementById("actualizarpresupuesto").addEventListener('click', actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener('click', nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);
let evFiltrar = new filtrarGastosWeb();
document.getElementById("formulario-filtrado").addEventListener("submit", evFiltrar);
document.getElementById("guardar-gastos").addEventListener('click', guardarGastosWeb);
document.getElementById("cargar-gastos").addEventListener('click', cargarGastosWeb);


function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elemento.appendChild(p);
}

function mostrarGastoWeb(idElemento, gasto) {
    let mostrar = document.getElementById(idElemento);

    let evEditar = new EditarHandle();
    evEditar.gasto = gasto;

    let evBorrar = new BorrarHandle();
    evBorrar.gasto = gasto;

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

    for (let etiqueta of gasto.etiquetas) {
        let spanEtiq = document.createElement("span");
        spanEtiq.className = "gasto-etiquetas-etiqueta";
        spanEtiq.textContent = `${etiqueta}`;
        divEtiq.append(spanEtiq);

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

    let btnBorrarApi = document.createElement("button");
    btnBorrarApi.className += `gasto-borrar-api`;
    btnBorrarApi.type = "button";
    btnBorrarApi.textContent = "Borrar (API)";

    let eventoBorrarApi = new BorrarGastoApiHandle();
    eventoBorrarApi.gasto = gastos;
    btnBorrarApi.addEventListener("click",eventoBorrarApi);

    div.append(divDesc);
    div.append(divFech);
    div.append(divVal);
    div.append(divEtiq);
    div.append(btnEditar);
    div.append(btnBorrar);
    div.append(btnEditaFormulario);
    mostrar.append(div);
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

function enviarGastoHandle() {
    this.handleEvent = function (evento) {
        evento.preventDefault();

        let form = evento.currentTarget;
        let desc = form.elements.descripcion.value;
        let val = form.elements.valor.value;
        let fech = form.elements.fecha.value;
        let etiq = form.elements.etiquetas.value;

        val = parseFloat(val);
        etiq = etiq.split(',');

        let gasto1 = new gestionPresupuesto.CrearGasto(desc, val, fech, etiq);

        gestionPresupuesto.anyadirGasto(gasto1);
        document.getElementById("anyadirgasto-formulario").disabled = false;
        repintar();
    }
}

function cancelarGastoHandle() {
    this.handleEvent = function(evento) {
        evento.currentTarget.parentNode.remove();
        document.getElementById("anyadirgasto-formulario").removeAttribute('disabled');
        repintar();
    }
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
    this.handleEvent = function (evento) {
        let num = this.gasto.id;
        gestionPresupuesto.borrarGasto(num);
        repintar();
    };
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function (evento) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function EditarHandleFormulario() {
    this.handleEvent = function (evento) {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");

        let final = evento.currentTarget;
        final.after(formulario);

        final.disabled = true;

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0, 10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let enviar = new SubmitHandleGasto();
        enviar.gasto = this.gasto;

        formulario.addEventListener("submit", enviar);

        let cancelar = new cancelarGastoHandle();

        let btnCancelar = formulario.querySelector("button.cancelar");
        btnCancelar.addEventListener("click", cancelar);
    }
}

function SubmitHandleGasto() {
    this.handleEvent = function (evento) {
        evento.preventDefault();

        let form = evento.currentTarget;
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

function filtrarGastosWeb() {
    this.handleEvent = function (evento) {
        evento.preventDefault();

        let form = evento.currentTarget;
        let desc = form.elements['formulario-filtrado-descripcion'].value;
        let vMinimo = form.elements['formulario-filtrado-valor-minimo'].value;
        let vMaximo = form.elements['formulario-filtrado-valor-maximo'].value;
        let fDesde = form.elements['formulario-filtrado-fecha-desde'].value;
        let fHasta = form.elements['formulario-filtrado-fecha-hasta'].value;
        let etiq = form.elements['formulario-filtrado-etiquetas-tiene'].value;

        vMinimo = parseFloat(vMinimo);
        vMaximo = parseFloat(vMaximo);

        if (etiq != null) {
            etiq = gestionPresupuesto.transformarListadoEtiquetas(etiq);
        }

        let filtro = {
            etiquetasTiene: etiq,
            fechaDesde: fDesde,
            fechaHasta: fHasta,
            valorMinimo: vMinimo,
            valorMaximo: vMaximo,
            descripcionContiene: desc,
        }

        let gastosFiltro = gestionPresupuesto.filtrarGastos(filtro);
        console.log(gastosFiltro);
        let lista = document.getElementById('listado-gastos-completo');
        lista.innerHTML = '';

        for (let gasto of gastosFiltro) {
            mostrarGastoWeb("listado-gastos-completo", gasto);
        }
    }
}

function guardarGastosWeb() {
    localStorage.GestorGastosDWEC = JSON.stringify(gestionPresupuesto.listarGastos());
}

function cargarGastosWeb() {
    let gastosLS;

    if (localStorage.getItem('GestorGastosDWEC')) {
        gastosLS = JSON.parse(localStorage.getItem('GestorGastosDWEC'));
    } else {
        gastosLS = [];
    }

    gestionPresupuesto.cargarGastos(gastosLS);
    repintar();
}

function cargarGastosApi(){
    let nombreUser = document.querySelector("#nombre_usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUser}`;

            if(nombreUser != ' ')
            {
                fetch(url, {method: 'GET'})
                    .then(respusta => respusta.json())
                    .then(resultado => {
                        if(resultado != "")
                        {
                            gestionPresupuesto.cargarGastos(resultado);
                            console.log("CargargastosApi");
                            repintar();
                        }
                        else{
                            alert("Error-HTTP: "+resultado.status)
                        }
                    })
                    .catch(err => console.error(err));
            }
            else{
                alert("Error-HTTP: 400 ");
            }  
}
let btnCargarGastosApi = document.getElementById("cargar-gastos-api");
btnCargarGastosApi.addEventListener("click",cargarGastosApi());

function BorrarGastoApiHandle() {
    this.handleEvent = function(e){
        let UserName = document.querySelector("#nombre_usuario");
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${UserName}/${this.gasto.gastoId}`;

        if(UserName.ok){
            fetch(url, {method: 'DELETE'})
            .then(responde => responde.json())
            .then(respuesta => {
                if(respuesta.ok){
                    cargarGastosApi();
                    repintar();
                }
                else{
                    alert("Error-HTTP: "+respuesta.status);
                }
            })
            .catch(erro => console.error(erro));
        }
        else{
            alert("Error-HTTP: 404");
        }
    };
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
    BorrarEtiquetasHandle,
    nuevoGastoWebFormulario
}