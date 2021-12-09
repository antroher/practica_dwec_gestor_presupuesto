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

function actualizarPresupuestoWeb() {
    // Actualiza el presupuesto
    gestionP.actualizarPresupuesto(parseFloat(prompt("Introduzca un nuevo presupuesto:")));

    // Limpia y vuelve a pintar con los nuevos datos
    repintar();
}

function nuevoGastoWeb() {
    // Pedir al usuario la información necesaria para crear un nuevo gasto
    const descripcion = prompt("Introduzca la descripción del nuevo gasto: ");
    const valor = parseFloat(prompt("Introduzca el valor del nuevo gasto: "));
    const fecha = Date.parse(prompt("Introduzca la fecha del nuevo gasto: "));
    const etiquetas = prompt("Introduzca las etiquetas del nuevo gasto: ").split(',');

    // Crear un nuevo gasto
    gestionP.anyadirGasto(new gestionP.CrearGasto(descripcion, valor, fecha, etiquetas));

    // Limpia y vuelve a pintar con los nuevos datos
    repintar();
}

function EditarHandle () {
    this.handleEvent = function() {
        // Pedir al usuario la información necesaria para editar el gasto
        this.gasto.actualizarDescripcion( 
            prompt("Introduzca la descripción nueva: "));
        
        this.gasto.actualizarValor( 
            parseFloat(prompt("Introduzca el valor nuevo: ")));
        
        this.gasto.actualizarFecha( 
            Date.parse(prompt("Introduzca la fecha nueva: ")));

        let etiquetas = prompt("Introduzca las nuevas etiquetas: ");
            
        if(typeof etiquetas != "undefined" ) {
            this.gasto.anyadirEtiquetas(etiquetas.split(','))
        }
    
        // Llamar a la función repintar para que se muestre la lista de gastos con los datos actualizados de la edición
        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function(event) {
        // Borrar objeto gasto
        gestionP.borrarGasto(this.gasto.id);
        
        // Llamar a la función repintar para que se muestre la lista de gastos con los datos actualizados tras el borrado
        repintar();
    }
}

function BorrarEtiquetasHandle() {

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

