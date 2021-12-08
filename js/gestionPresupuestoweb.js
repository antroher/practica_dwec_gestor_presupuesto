"use strict"
import * as gestionP from "./gestionPresupuesto.js";


// FUNCIONES

function mostrarDatoEnId(idElemento, valor){
    let item = document.getElementById(idElemento);
    item.innerHTML = `<p>${valor}</p>`;  
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
    let elemento = document.getElementById(idElemento); // captura del div con id dado
    let gastosAgrupados = ""; // contenedor de los datos agrupados con los pares clave-valor
    for (let key in agrup) {
        gastosAgrupados +=
            `<div class='agrupacion-dato'>
        <span class='agrupacion-dato-clave'> ${key}: </span>
        <span class='agrupacion-dato-valor'> ${agrup[key]} </span>
        </div>
        `;
    }
    // insertar toda la estructura en el div
    elemento.innerHTML +=
        `<div class='agrupacion'> 
            <h1>Gastos agrupados por ${periodo} </h1>
            ${gastosAgrupados}
        </div>
        `;
}

export function mostrarDatoEnId(arg0, arg1) {
    throw new Error("Function not implemented.");
}

export function mostrarGastoWeb(arg0, gasto) {
    throw new Error("Function not implemented.");
}

export function mostrarGastosAgrupadosWeb(arg0, arg1, arg2) {
    throw new Error("Function not implemented.");
}

