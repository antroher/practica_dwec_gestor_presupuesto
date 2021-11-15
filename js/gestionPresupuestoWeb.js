//Este fichero contendrá las utilidades necesarias para mostrar los datos de la aplicación en la página interaccionHTML.html
"use strict";
/**** IMPORTS ****/
import * as gestionPresupuesto from "./gestionPresupuesto.js"

/**** CONSTRUCTORES ****/

function EditarHandle() {
    this.handleEvent = function () {
        console.log(this.gasto )

        let descrip = prompt("¿Cúal es la nueva descripción?");
        //console.log(this.gasto.descripcion)

        this.gasto. actualizarDescripcion(descrip);
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
        console.log("Entro al botón borrar etiq");
        console.log(this.etiqueta + " // " );
        this.etiqueta = "";
        repintar();
    }
}

/**** FUNCIONES ****/

//Escribe el valor en el elemento HTML con id indicado
function mostrarDatoEnId(idElemento, valor) {
    /*** Varias formas de hacerlo ***/
    //Forma 1
    document.getElementById(idElemento).innerHTML = valor;
    //Forma 2

    /*let element = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;  
    element.appendChild(p);*/
}

//Función de dos parámetros que se encargará de añadir dentro del elemento HTML con id indicado una estructura HTML para el gasto pasado
function mostrarGastoWeb(idElemento, gasto) {
    let elementoHTML = document.getElementById(idElemento);
    let numBoton = 0;
    let contadorEtiq = 1;
    let idEtiquetas = "Etiquetas"+gasto.id;
    let textoHTML =
        `
        <hr/>
<div class="gasto" id="Gast${gasto.id}">
  <div class="gasto-descripcion">${gasto.descripcion}</div>
  <div class="gasto-fecha">${new Date(gasto.fecha).toLocaleString()}</div> 
  <div class="gasto-valor">${gasto.valor}€</div> 
  <div class="gasto-etiquetas" id="${idEtiquetas}">
  //
  </div></div>
`;
elementoHTML.innerHTML += textoHTML;
    for (let et of gasto.etiquetas) {
        let etiq = document.createElement("span");
        etiq.textContent = et + " // ";
        etiq.className = "gasto-etiquetas-etiqueta";
        etiq.id = "Etiq" + gasto.id + contadorEtiq;

        let evento = new BorrarEtiquetasHandle();
        evento.etiqueta = et;
        etiq.addEventListener("click", evento);
        document.getElementById(idEtiquetas).appendChild(etiq);
        contadorEtiq++;
    }

    if (!idElemento.includes("filtrado")){
    //Creamos el botón editar

    let boton = document.createElement("button");
    boton.textContent = "Eliminar";
    boton.className= "gasto-borrar";
    boton.type="button";
    boton.id = "Err" + gasto.id;
    let evento = new BorrarHandle();
    evento.gasto = gasto;
    boton.addEventListener("click", evento);
    document.getElementById("Gast" +gasto.id).appendChild(boton);

    /*let btnEditar = crearBoton("Editar", gasto, numBoton);
    numBoton++;
    //Creamos el botón Borrar
    let btnBorrar = crearBoton("Borrar", gasto, numBoton)
    //Añadimos los 2 botones
    elementoHTML.appendChild(btnEditar);
    // elementoHTML.appendChild(btnBorrar);*/
    }
}

/**
 * Función que crea un botón HTML
 * @param {string} textoBoton 
 * @param {gasto} gasto 
 * @param {int} numBoton 
 * @returns Botón HTML
 */
function crearBoton(textoBoton, gast, numBoton) {
    let boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = textoBoton;
    let evento;
    if (numBoton == 0) {
        boton.id = "Edit" + gast.id;
        evento = new EditarHandle();
    } else {
        
        boton.id = "Borr" + gast.id;
        evento = new BorrarHandle();
    }

    evento.gasto = gast;
    boton.addEventListener("click", evento);
    return boton;
}
//Función de tres parámetros que se encargará de crear dentro del elemento HTML con id indicado una estructura HTML para el objeto que se pase como parámetro
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

function actualizarPresupuestoWeb() {
    let nuevoPresupuesto = prompt("¿Cúal es el nuevo presupuesto?");
    parseFloat(nuevoPresupuesto) ? nuevoPresupuesto = parseFloat(nuevoPresupuesto) : nuevoPresupuesto = 0;
    gestionPresupuesto.actualizarPresupuesto(nuevoPresupuesto);
    repintar();
}

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