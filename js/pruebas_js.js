"use strict";

import * as gestionP from "./gestionPresupuesto.js";


const gasto1 = new gestionP.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
const gasto2 = new gestionP.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");

console.log(gasto1.fecha);
console.log(gasto2.etiquetas);

mostrarGastoWeb("listado-gastos-completo", gasto1);





function BorrarEtiquetasHandle() {
    this.handleEvent = function (e) {
        // Borrar etiqueta sobre la que se actúa
        this.gasto.borrarEtiquetas(this.etiqueta);

        // Llamar a la función repintar para que se muestre la lista de gastos con los datos actualizados tras el borrado
        repintar();
    }

}


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
    

    /*
    // Agrega botones en caso de que el id dado sea el del listado de gastos    
    if (idElemento === 'listado-gastos-completo') {
        // Crear boton de editar un gasto y el objeto manejador evt asociado
        let editorBtn = document.createElement("button");
        editorBtn.className = 'gasto-editar';
        editorBtn.textContent = 'Editar';

        let editorHandler = new EditarHandle();
        editorHandler.gasto = gasto;                  // Vincular puntero al objeto gasto en la propiedad gasto
        editorBtn.addEventListener('click', editorHandler);     // Cargar escuchador

        // Crear boton de borrar un gasto y el objeto manejador evt asociado
        let borradorBtn = document.createElement("button");
        borradorBtn.className = 'gasto-borrar'
        borradorBtn.textContent = 'Borrar';

        let borradorHandler = new BorrarHandle();
        borradorHandler.gasto = gasto;
        borradorBtn.addEventListener('click', borradorHandler);     // Cargar escuchador



        // Colgar los botones al final del div .gasto
        document.querySelector(".gasto").append(editorBtn, borradorBtn);    

    }
    */
}




function repintar() {
    // Mostrar el presupuesto en div#presupuesto
    document.getElementById("presupuesto").innerHTML = "";
    mostrarDatoEnId("presupuesto", gestionP.mostrarPresupuesto());

    // Mostrar los gastos totales en div#gastos - totales
    document.getElementById("gastos-totales").innerHTML = "";
    mostrarDatoEnId("gastos-totales", gestionP.calcularTotalGastos());

    // Mostrar el balance total en div#balance - total
    document.getElementById("balance-total").innerHTML = "";
    mostrarDatoEnId("balance-total", gestionP.calcularBalance());

    // Borrar el contenido de div#listado - gastos - completo y repintar
    document.getElementById("listado-gastos-completo").innerHTML = "";
    for (let gasto of gestionP.listarGastos()) {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    }

}






