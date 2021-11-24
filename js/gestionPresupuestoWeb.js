//Carlos Ramos Mirete 2ºDAW N
//Este fichero contendrá las utilidades necesarias para mostrar los datos de la aplicación en la página interaccionHTML.html
"use strict";
/**** IMPORTS ****/
import * as gestionPresupuesto from "./gestionPresupuesto.js"

/**** CONSTANTES ****/
//ENUM para tipo de botones.
const BOTON = {
    EDITAR: "Editar",
    BORRAR: "Borrar",
    EDITAR_FORM: "Editar (Formulario)"
}

//*  CONSTRUCTORES  *//

//* EVENTOS *//

/**
 *  * Constructor de evento par el botón Editar *
 */
function EditarHandle() {
    this.handleEvent = function () {
        let descrip = prompt("¿Cuál es la nueva descripción?");
        let val = prompt("¿Cuál es el nuevo valor?");
        let fech = prompt("¿Cuál es la nueva fecha?")
        let etiq = prompt("¿Cuáles son las nuevas etiquetas? \n (etiqeta1, etiqueta2...)")

        if (etiq.includes(",")) {
            etiq = etiq.split(",");
        }

        this.gasto.actualizarDescripcion(descrip);
        this.gasto.actualizarValor(parseFloat(val));
        this.gasto.actualizarFecha(fech);
        this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
        this.gasto.anyadirEtiquetas(etiq);
        repintar();
    }
}

/**
 * * Constructor de evento para el botón Borrar *
 */
function BorrarHandle() {
    this.handleEvent = function () {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    };
}

/**
 * * Constructor de evento para borrar una etiqueta. *
 */
function BorrarEtiquetasHandle() {
    this.handleEvent = function () {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

/**
 * * Constructor de evento para añadir un gasto desde un formulario. *
 */
function AnyadirGastoFormularioHandle() {
    this.handleEvent = function (event) {
        event.preventDefault();
        let descripcion = this.formulario.elements.descripcion.value;
        let valor = this.formulario.elements.valor.value;
        let fecha = this.formulario.elements.fecha.value;
        let etiquetas = this.formulario.elements.etiquetas.value;
        if (etiquetas.includes(",")) {
            etiquetas = etiquetas.split(",");
        }
        let gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
        gestionPresupuesto.anyadirGasto(gasto);
        let elementoPadre = document.getElementById("controlesprincipales")
        elementoPadre.removeChild(this.formulario);
        document.getElementById("anyadirgasto-formulario").disabled = false;
        repintar();
    }
}

/**
 * * Constructor de evento que muestra el formulario a un gasto, y le crea los eventos de los botones del mismo. *
 */
function MostrarFormularioGastoHandle() {
    this.handleEvent = function (event) {
        event.preventDefault();
        let form = this.formulario;
        let padr = this.padre;
        let gast = this.gasto;
        //Desactivamos Boton padre
        padr.querySelector(".gasto-editar-formulario").disabled = true;
        //Añadimos formulario y sus valores
        padr.append(form);
        form.elements.descripcion.value = gast.descripcion;
        form.elements.valor.value = gast.valor;
        form.elements.fecha.value = new Date(gast.fecha).toISOString().substring(0, 10);
        //Creamos eventos y añadimos elementos como proiedades.
        let eventoAnyadir = new EditarGastoFormularioHandle();
        let eventoCancelar = new CancelarGastoHandle();
        eventoAnyadir.formulario = form;
        eventoAnyadir.gasto = gast;
        eventoCancelar.formulario = form;
        //Añadimos los listeners
        form.addEventListener("submit", eventoAnyadir);
        form.querySelector(".cancelar").addEventListener("click", eventoCancelar);
    }
}

/**
 * * Constructor de evento que edita un gasto. *
 */
function EditarGastoFormularioHandle() {
    this.handleEvent = function (event) {
        event.preventDefault();
        let g = this.gasto;
        let elForm = this.formulario.elements;
        g.actualizarDescripcion(elForm.descripcion.value);
        g.actualizarValor(elForm.valor.value);
        g.actualizarFecha(elForm.fecha.value);
        g.borrarEtiquetas(g.etiquetas);
        let etiq = elForm.etiquetas.value;
        if (etiq.includes(",")) {
            etiq = etiq.split(",")
        }
        g.anyadirEtiquetas(etiq);
        this.formulario.parentNode.querySelector(".gasto-editar-formulario").disabled = false;
        repintar();
    }
}

/**
 * * Constructor de evento que cancela la creación/edición de un gasto. *
 */
function CancelarGastoHandle() {
    this.handleEvent = function (event) {
        event.preventDefault();
        let padre = this.formulario.parentNode;
        let btnAnyadirGasto = document.getElementById("anyadirgasto-formulario");
        if (btnAnyadirGasto.disabled == true) {
            btnAnyadirGasto.disabled = false;
            let hr = padre.querySelector("hr");
            padre.removeChild(hr)
        } else {
            padre.querySelector(".gasto-editar-formulario").disabled = false;

        }
        padre.removeChild(this.formulario);
        repintar();
    }
}
function FiltrarGastosWebHandle(){
    this.handleEvent = function(event){
        event.preventDefault();
        let elForm = this.formulario.elements;
        let desc = elForm["formulario-filtrado-descripcion"].value;
        let vMin = elForm["formulario-filtrado-valor-minimo"].value;
        let vMax = elForm["formulario-filtrado-valor-maximo"].value;
        let fDesd = elForm["formulario-filtrado-fecha-desde"].value;
        let fHast = elForm["formulario-filtrado-fecha-hasta"].value;
        let etiqTien = elForm["formulario-filtrado-etiquetas-tiene"].value;
        if(etiqTien){
            etiqTien = gestionPresupuesto.transformarListadoEtiquetas(etiqTien);
        }
        let objetoFiltro = {
            descripcionContiene: desc,
            fechaDesde: fDesd,
            fechaHasta: fHast,
            valorMinimo: vMin,
            valorMaximo: vMax,
            etiquetasTiene: etiqTien
        }
        let gastosFiltrados = gestionPresupuesto.filtrarGastos(objetoFiltro);
        mostrarDatoEnId("listado-gastos-completo","")
        gastosFiltrados.forEach(g => {
            mostrarGastoWeb("listado-gastos-completo",g);
        });
    }
}

//* FUNCIONES *//

//Escribe el valor en el elemento HTML con id indicado
/**
 * * Escribe texto en el elemento HTML indicado con un ID. *
 * @param {string} idElemento  - ID del elemento que se le quiere añadir un texto.
 * @param {string} texto - Texto que mostrará la estiqueta.
 */
function mostrarDatoEnId(idElemento, texto) {

    //Forma 1
    document.getElementById(idElemento).innerHTML = texto;
    //Forma 2
    /*
    let element = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;  
    element.appendChild(p);
    */
}


/**
 * * Función que crea una etiqueta HTML *
 * @param {strig} etiqueta  - Texto que indica que tipo de etiqueta se va ha crear.
 * @function @param {document.getElementById} padre - Etiqueta padre de la que se desea crear.
 * @param {string} clase - Texto que indica la clase de la etiqueta HTML.
 * @param {string} texto - Texto a mostrar la etiqueta HTML.
 * @returns {Element} - Referencia al elemento HTML creado.
 */
function crearEtiquetaHTML(etiqueta, padre, clase, texto = "") {
    let et = document.createElement(etiqueta);
    et.className = clase;
    et.textContent = texto
    padre.append(et)
    return et;
}

/**
 ** Función que  muestra un gasto en una etiqueta HTML. *
 * @param {string} idElemento - ID del elemento HTML que se quiere modificar.
 * @param {gasto} gasto - Gasto que se quiere mostrar. 
 */
function mostrarGastoWeb(idElemento, gasto) {
    //Guardamos el elemento padre
    let elementoHTML = document.getElementById(idElemento);

    //Creamos las etiquetas HTML del gasto y las añadimos
    crearEtiquetaHTML("hr", elementoHTML, "")
    let divGasto = crearEtiquetaHTML("div", elementoHTML, "gasto")
    crearEtiquetaHTML("div", divGasto, "gasto-descripcion", gasto.descripcion);
    crearEtiquetaHTML("div", divGasto, "gasto-fecha", new Date(gasto.fecha).toLocaleString());
    crearEtiquetaHTML("div", divGasto, "gasto-valor", gasto.valor);
    let divEtiquetas = crearEtiquetaHTML("div", divGasto, "gasto-etiquetas");
    crearEtiquetaHTML("span", divEtiquetas, "", " // ")

    //Creamos las etiquetas del gasto y le añadimos los eventos
    for (let et of gasto.etiquetas) {
        let etiquetaHTML = crearEtiquetaHTML("span", divEtiquetas, "gasto-etiquetas-etiqueta", et + " ");
        crearEtiquetaHTML("span", divEtiquetas, "", " // ")
        if (!idElemento.includes("filtrado")) {
            let evento = new BorrarEtiquetasHandle();
            evento.etiqueta = et;
            evento.gasto = gasto;
            etiquetaHTML.addEventListener("click", evento);
        }
    }

    //Creamos los botones
    if (!idElemento.includes("filtrado")) {
        //Creamos el botón editar
        crearBoton(BOTON.EDITAR, gasto, "gasto-editar", divGasto);
        //Creamos el botón Borrar
        crearBoton(BOTON.BORRAR, gasto, "gasto-borrar", divGasto);
        //Creamos el botón Editar (formulario)
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");
        crearBoton(BOTON.EDITAR_FORM, gasto, "gasto-editar-formulario", divGasto, formulario);
    }
}


/**
 * Función que crea un botón HTML
 * @param {Enumerator BOTON} tipoBoton  Tipo de botón que se creará.
 * @param {gasto} gasto - Gasto al que le afectará el evento.
 * @param {string} clase - Clase que se le aplicará al botón.
 * @param {Element} formulario - Formulario que tiene que aparecer en el evento click del botón.
 * @returns {Element}  Referencia al botón HTML creado.
 */
function crearBoton(tipoBoton, gast, clase, padre, formulario = undefined) {
    let boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = tipoBoton;
    boton.className = clase;
    let evento;
    switch (tipoBoton) {
        case BOTON.EDITAR:
            evento = new EditarHandle();
            break;
        case BOTON.BORRAR:
            evento = new BorrarHandle();
            break;
        case BOTON.EDITAR_FORM:
            evento = new MostrarFormularioGastoHandle();
            evento.formulario = formulario;
            evento.padre = padre;
            break;
        default:
            console.log("Botón por defecto")
    }
    evento.gasto = gast;
    boton.addEventListener("click", evento);
    padre.append(boton);
}

/**
 * Función que mostrará una agrupación de gastos en un elemento HTML indicado.
 * @param {string} idElemento - ID del elemento que se le quiere añadir un texto.
 * @function @param {Enumerator} agrup - Objeto con los periodos de agupación y sus valores (Resultado de la función gestionPresupuesto.obtenerPeriodoAgrupacion).
 * @param {string} periodo - Periodo de agupación que se le añadirá al titulo al mostrar la etiqueta HTML.
 */
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let elementoPadre = document.getElementById(idElemento);

    let divAgrupacion = crearEtiquetaHTML("div", elementoPadre, "agrupacion");
    crearEtiquetaHTML("h1", divAgrupacion, "", ("Gastos agrupados por " + periodo));

    for (let propiedad in agrup) {
        let agrupacionDato = crearEtiquetaHTML("div", divAgrupacion, "agrupacion-dato");
        crearEtiquetaHTML("span", agrupacionDato, "agrupacion-dato-clave", propiedad);
        crearEtiquetaHTML("span", agrupacionDato, "", " // ");
        crearEtiquetaHTML("span", agrupacionDato, "agrupacion-dato-valor", agrup[propiedad]);
    }
}


/**
 * Función que vuele a pintar el presupuesto, los gastos totales, el balance total y el listado de gastos.
 */
function repintar() {
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());
    mostrarDatoEnId("listado-gastos-completo", "");
    for (let gasto of gestionPresupuesto.listarGastos()) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
    mostrarDatoEnId("listado-gastos-filtrado-1", "");
    let filtro = gestionPresupuesto.filtrarGastos({
        fechaDesde: "2021-09-01",
        fechaHasta: "2021-09-30"
    });

    for (let gast of filtro) {
        mostrarGastoWeb("listado-gastos-filtrado-1", gast)
    }

    mostrarDatoEnId("listado-gastos-filtrado-2", "");

    filtro = gestionPresupuesto.filtrarGastos({
        valorMinimo: 50
    });

    for (let gast of filtro) {
        mostrarGastoWeb("listado-gastos-filtrado-2", gast)
    }

    mostrarDatoEnId("listado-gastos-filtrado-3", "");
    filtro = gestionPresupuesto.filtrarGastos({
        valorMinimo: 200,
        etiquetasTiene: ["seguros"]
    })
    for (let gast of filtro) {
        mostrarGastoWeb("listado-gastos-filtrado-3", gast)
    }

    mostrarDatoEnId("listado-gastos-filtrado-4", "");

    filtro = gestionPresupuesto.filtrarGastos({
        valorMaximo: 50,
        etiquetasTiene: ["comida", "transporte"]
    })
    for (let gast of filtro) {
        mostrarGastoWeb("listado-gastos-filtrado-4", gast)
    }


    let agrupacion = gestionPresupuesto.agruparGastos("dia");
    mostrarDatoEnId("agrupacion-dia", "");
    mostrarGastosAgrupadosWeb("agrupacion-dia", agrupacion, "día");

    //Mostrar el total de gastos agrupados por mes
    agrupacion = gestionPresupuesto.agruparGastos("mes");
    mostrarDatoEnId("agrupacion-mes", "");
    mostrarGastosAgrupadosWeb("agrupacion-mes", agrupacion, "mes");

    //Mostrar el total de gastos agrupados por año
    agrupacion = gestionPresupuesto.agruparGastos("anyo");
    mostrarDatoEnId("agrupacion-anyo", "");
    mostrarGastosAgrupadosWeb("agrupacion-anyo", agrupacion, "año");
}


//* MANEJADORES DE EVENTOS *//

let btnActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
btnActualizarPresupuesto.addEventListener("click", () => actualizarPresupuestoWeb());

let btnAnyadirgasto = document.getElementById("anyadirgasto");
btnAnyadirgasto.addEventListener("click", nuevoGastoWeb);

let btnAnyadirgastoFormulario = document.getElementById("anyadirgasto-formulario");
btnAnyadirgastoFormulario.addEventListener("click", nuevoGastoWebFormulario);

let formularoFiltrarGastos = document.getElementById("formulario-filtrado");
let eventoFormularioFiltratGasto = new FiltrarGastosWebHandle();
eventoFormularioFiltratGasto.formulario = formularoFiltrarGastos;
formularoFiltrarGastos.addEventListener("submit", eventoFormularioFiltratGasto);


/**
 * Función que actualiza el presupuesto desde un botón de la web.
 */
function actualizarPresupuestoWeb() {
    let nuevoPresupuesto = prompt("¿Cúal es el nuevo presupuesto?");
    parseFloat(nuevoPresupuesto) ? nuevoPresupuesto = parseFloat(nuevoPresupuesto) : nuevoPresupuesto = 0;
    gestionPresupuesto.actualizarPresupuesto(nuevoPresupuesto);
    repintar();
}

/**
 * Función que crea un nuevo gasto desde un botón de la web.
 */
function nuevoGastoWeb() {
    let descripcion = prompt("Descripción del gasto: ");
    let valor = prompt("Valor del gasto: ");
    let fecha = prompt("Fecha del gasto: ");
    let etiquetas = prompt("Etiquetas del gasto (et1, et2...): ");
    let arrEiq = etiquetas.split(',');
    let gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...arrEiq);
    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}

function nuevoGastoWebFormulario() {
    let divControlesPrincipales = document.getElementById("controlesprincipales");
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");
    ////crearEtiquetaHTML("br", divControlesPrincipales, "");
    crearEtiquetaHTML("hr", divControlesPrincipales, "");
    divControlesPrincipales.append(formulario);
    document.getElementById("anyadirgasto-formulario").disabled = true;
    let eventoAnyadir = new AnyadirGastoFormularioHandle();
    let eventoCancelar = new CancelarGastoHandle()
    eventoAnyadir.formulario = formulario;
    eventoCancelar.padre = divControlesPrincipales;
    eventoCancelar.formulario = formulario;
    eventoCancelar.btnPadre = document.getElementById("anyadirgasto-formulario");
    formulario.addEventListener("submit", eventoAnyadir);
    formulario.querySelector(".cancelar").addEventListener("click", eventoCancelar);
    repintar();
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}