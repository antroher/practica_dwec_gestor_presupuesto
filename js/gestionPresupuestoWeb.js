"use strict"

import * as GesPresu from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento,valor){
    let datId = document.getElementById(idElemento);
    datId.innerHTML += `<p>${valor}</p>`
    
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
                </div>`;
        });
    }
    
        function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
            let elemento = document.getElementById(idElemento);

            //bucle tocho
          let loco ="";
            for(let prop in agrup){
                loco +=
                "<div class='agrupacion-dato'>" +
                "<span class='agrupacion-dato-clave'>" + prop + ": </span>" +
                "<span class='agrupacion-dato-valor'>" + agrup[prop] + "</span>"+
                "</div>";
            }

            elemento.innerHTML += 
            `<div class='agrupacion'> 
            <h1>Gastos agrupados por ${periodo} </h1>
            ${loco}`;
        }


        //Funcion repintar pàra actualizar la pagina
            function repintar(){
                GesPresu.mostrarPresupuesto("presupuesto",GesPresu.mostrarDatoEnId());
                GesPresu.mostrarDatoEnId("gastos-totales",GesPresu.calcularTotalGastos());
                GesPresu.mostrarDatoEnId("balance-total",GesPresu.calcularBalance());
                GesPresu.mostrarGastoWeb("listado-gastos-completo",GesPresu.listarGastos());

                document.getElementById("listado-gastos-completo").innerHTML = " ";      //Bora el contenido sustituyendolo por un string ("")
            }
        //Funcion que actualiza el presupuesto WEB
        function actualizarPresupuestoWeb(){
            GesPresu.actualizarPresupuesto(parseFloat(prompt("Introduce un presupuesto:")));
        }

//El export de las funciones
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}