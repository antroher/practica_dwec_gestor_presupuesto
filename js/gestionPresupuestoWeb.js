//Este fichero contendrá las utilidades necesarias para mostrar los datos de la aplicación en la página interaccionHTML.html
"use strict";
/**** IMPORTS ****/
import * as gestionPresupuesto from "./gestionPresupuesto.js"

/**** CONSTANTES ****/

//Intento de ENUM
const BOTON = {
    EDITAR: "Editar",
    BORRAR: "Borrar"
}

/**** CONSTRUCTORES ****/

function EditarHandle() {
    this.handleEvent = function () {
        console.log(this.gasto)

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

function BorrarHandle() {
    this.handleEvent = function () {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    };
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function () {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

/**** FUNCIONES ****/

//Escribe el valor en el elemento HTML con id indicado
/**
 * Escribe texto en el elemento HTML indicado con un ID.
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
 * Función que crea una etiqueta HTML
 * @param {strig} etiqueta  - Texto que indica que tipo de etiqueta se va ha crear.
 * @function @param {document.getElementById} padre - Etiqueta padre de la que se desea crear.
 * @param {string} clase - Texto que indica la clase de la etiqueta HTML.
 * @param {string} texto - Texto a mostrar la etiqueta HTML.
 * @returns {Element} - Referencia al elemento HTML creado.
 */
function crearEtiquetaHTML(etiqueta, padre, clase, texto = undefined) {

    let et = document.createElement(etiqueta);
    et.className = clase;
    et.textContent = texto

    padre.appendChild(et)
    return et;
}

/**
 * Función que  muestra un gasto en una etiqueta HTML.
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

    //Creamos las etiquetas del gasto y le añadimos los eventos
    for (let et of gasto.etiquetas) {
        let etiquetaHTML = crearEtiquetaHTML("span", divEtiquetas, "gasto-etiquetas-etiqueta", et + " ");
        let evento = new BorrarEtiquetasHandle();
        evento.etiqueta = et;
        evento.gasto = gasto;
        etiquetaHTML.addEventListener("click", evento);
    }

    //Creamos los botones
    if (!idElemento.includes("filtrado")) {
        //Creamos el botón editar
        let btnEditar = crearBoton(BOTON.EDITAR, gasto, "gasto-editar");
        //Creamos el botón Borrar
        let btnBorrar = crearBoton(BOTON.BORRAR, gasto, "gasto-borrar")
        //Añadimos los 2 botones
        divGasto.appendChild(btnEditar);
        divGasto.appendChild(btnBorrar);
    }
}


/**
 * Función que crea un botón HTML
 * @param {Enumerator BOTON} tipoBoton - Tipo de botón que se creará.
 * @param {gasto} gasto - Gasto al que le afectará el evento.
 * @param {string} clase - Clase que se le aplicará al botón.
 * @returns {Element} - Referencia al botón HTML creado.
 */
function crearBoton(tipoBoton, gast, clase) {
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
        default:
            console.log("Crear boton por defecto");
            break;

    }
    evento.gasto = gast;
    boton.addEventListener("click", evento);
    return boton;
}

/**
 * Función que mostrará una agrupación de gastos en un elemento HTML indicado.
 * @param {string} idElemento - ID del elemento que se le quiere añadir un texto.
 * @function @param {Enumerator} agrup - Objeto con los periodos de agupación y sus valores (Resultado de la función gestionPresupuesto.obtenerPeriodoAgrupacion).
 * @param {string} periodo - Periodo de agupación que se le añadirá al titulo al mostrar la etiqueta HTML.
 */
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

    let textoHTML =
        `
    
    <div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
    `;
    for (let propiedad in agrup) {
        textoHTML +=
            `
        <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${propiedad}</span>
            <span>//</span>
            <span class="agrupacion-dato-valor">${agrup[propiedad]}€</span>
        </div>
        `;
    }
    textoHTML += "</div>"
    document.getElementById(idElemento).innerHTML = textoHTML;

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
}

/**** EVENTOS DE LOS BOTONES ****/

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

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}