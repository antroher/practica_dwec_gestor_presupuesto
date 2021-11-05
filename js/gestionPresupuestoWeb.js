"use strict"

function mostrarDatoEnId (idElemento, valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML += `<p>${valor}</p>`;
    
}

function mostrarGastoWeb(idElemento,listaGasto){
    let element = document.getElementById(idElemento);

    listaGasto.forEach((gasto) => {
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
      let listaGasto ="";
        for(let prop in agrup){
            listaGasto +=
            "<div class='agrupacion-dato'>" +
            "<span class='agrupacion-dato-clave'>" + prop + ": </span>" +
            "<span class='agrupacion-dato-valor'>" + agrup[prop] + "</span>"+
            "</div>";
        }

        elemento.innerHTML += 
        `<div class='agrupacion'> 
        <h1>Gastos agrupados por ${periodo} </h1>
        ${listaGasto}`;
    }

function mostrarGastosAgrupadosWeb (idElemento, agrup, periodo){

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}