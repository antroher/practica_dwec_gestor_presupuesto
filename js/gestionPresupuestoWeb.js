 "use strict";

 function mostrarDatoEnId(idElemento, valor){
    let dataId = document.getElementById(idElemento);
    dataId.innerHTML += `<p>${valor}<p>`;
 }

 function mostrarGastoWeb(idElemento, gastos){
    let element = document.getElementById(idElemento);

    gastos.forEach((gasto) => {
        let etiquetas = "";

        gasto.etiquetas.forEach((etiqueta) => {
            etiquetas += (

                `<span class="gasto-etiquetas-etiqueta"> 
                                ${etiqueta}
                </span>`
            );
        });

        element.innerHTML += 

            `<div class="gasto">
                <div class="gasto-descripcion">${gasto.descripcion}</div>
                <div class="gasto-fecha">${gasto.fecha}</div> 
                <div class="gasto-valor">${gasto.valor}</div> 
                <div class="gasto-etiquetas">
                    ${etiquetas}
                </div> 
            </div>`
    });

 }

 function mostrarGastosAgrupadosWeb(){

 }

 export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
 }