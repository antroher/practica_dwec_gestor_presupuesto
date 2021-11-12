"use strict"

import * as gesPre from "./gestionPresupuesto.js";

//EVENTO BOTON ACTUALIZAR PRESUPUESTO

let botonActualizar = document.getElementById("actualizarpresupuesto");
botonActualizar.addEventListener('click', actualizarPresupuestoWeb)
//EVENTO BOTON AÑADIR GASTO
let botonAnyadir = document.getElementById("anyadirgasto");
botonAnyadir.addEventListener('click', nuevoGastoWeb);

function mostrarDatoEnId(idElemento,valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML = `<p>${valor}</p>`
    
}
    function mostrarGastoWeb(idElemento,gastos){
    let element = document.getElementById(idElemento);

    gastos.forEach((gasto) => {
        let etiquetas = "";
        gasto.etiquetas.forEach((etiqueta) => {
            etiquetas += 
                `<span class="gasto-etiquetas-etiqueta">
                    ${etiqueta}
                </span>`;
        });    

        element.innerHTML +=
            `<div class="gasto">
                <div class="gasto-descripcion">${gasto.descripcion}</div>
                <div class="gasto-fecha">${gasto.fecha}</div> 
                <div class="gasto-valor">${gasto.valor}</div> 
                <div class="gasto-etiquetas">
                    ${etiquetas}
                </div>
                
                <button class="gasto-editar" id="gasto-editar-${gasto.id}" type="button">
                    Editar
                </button>
            </div>`;

        //EVENTO BOTON EDITAR GASTO
        
        let EventoEditarHandle = new EditarHandle();
        EventoEditarHandle.gasto = gasto;
        let botonEditar = document.getElementById(`gasto-editar-${gasto.id}`);
        botonEditar.addEventListener('click', EventoEditarHandle);

    });
}
    
function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let elemento = document.getElementById(idElemento);

    
    let gastos ="";
    for(let prop in agrup){
        gastos +=
        "<div class='agrupacion-dato'>" +
            "<span class='agrupacion-dato-clave'>" + prop + ": </span>" +
            "<span class='agrupacion-dato-valor'>" + agrup[prop] + "</span>"+
        "</div>";
    }

    elemento.innerHTML += 
    `<div class='agrupacion'> 
        <h1>Gastos agrupados por ${periodo} </h1>
        ${gastos}
    </div>`;
}

function repintar(){
    mostrarDatoEnId("presupuesto",gesPre.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gesPre.calcularTotalGastos());
    mostrarDatoEnId("balance-total",gesPre.calcularBalance());

    let elemento = document.getElementById("listado-gastos-completo");
    elemento.innerHTML = "";
    mostrarGastoWeb("listado-gastos-completo", gesPre.listarGastos());
}

function actualizarPresupuestoWeb (){
    let nuevoValor = parseFloat(prompt("Introduce un presupuesto."));
    gesPre.actualizarPresupuesto(nuevoValor);
    repintar();
}

function nuevoGastoWeb (){
    let descripcion = prompt("Descripción.");
    let valor = parseFloat(prompt("Valor."));
    let fecha = Date.parse(prompt("Fecha."));
    let etiquetas = prompt("Etiquetas.");

    let listaEtiquetas = etiquetas.split(',');

    let gasto = new gesPre.CrearGasto(descripcion, valor, fecha, listaEtiquetas);

    gesPre.anyadirGasto(gasto);

    repintar();
}

function EditarHandle (){
    this.handleEvent = function(evento){
        let descripcion = prompt("Descripción.");
        let valor = parseFloat(prompt("Valor."));
        let fecha = Date.parse(prompt("Fecha."));
        let etiquetas = prompt("Etiquetas.");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha (fecha);
        
        if(etiquetas != undefined){
            let listaEtiquetas = etiquetas.split(',');
            this.gasto.anyadirEtiquetas(listaEtiquetas); 
        }

        repintar();
    }
}

//El export de las funciones
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
}