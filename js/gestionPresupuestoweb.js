"use strict"
import * as gestionP from "./gestionPresupuesto.js";


// FUNCIONES

function mostrarDatoEnId(idElemento,valor){
    let item = document.getElementById(idElemento);
    item.innerHTML = `<p>${valor}</p>`  
}

function mostrarGastoWeb(idElemento, gasto){
    
    let elemento = document.getElementById(idElemento); // Captura del div con id dado
    let spanEtiquetas = ""; 

    // Generar el span de etiquetas iterando la prop etiquetas del objeto gasto
    gasto.etiquetas.forEach((etiqueta) => {
        spanEtiquetas +=
            `<span class="gasto-etiquetas-etiqueta">
            ${ etiqueta }
            </span>`;
    });

    // Crear la estructura pedida, con divs para mostrar las prop y el str de spanEtiquetas
    elemento.innerHTML +=
        `<div class="gasto">
                    <div class="gasto-descripcion">${gasto.descripcion}</div>
                    <div class="gasto-fecha">${new Date(gasto.fecha).toLocaleString()}</div> 
                    <div class="gasto-valor">${gasto.valor}</div> 
                    <div class="gasto-etiquetas">
                        ${spanEtiquetas}
                    </div>
        </div>`;

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    
}

