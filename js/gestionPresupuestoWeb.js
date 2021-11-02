"use strict"
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
            elemento.innerHTML += 
            "<div class='agrupacion'>\n" + 
            "<h1>Gastos agrupados por " + periodo + "</h1>\n"
            for(let prop in agrup){
                elemento.innerHTML += 
                "<div class='agrupacion-dato'>\n" +
                "<span class='agrupacion-dato-clave'>" + prop + ": </span>\n" +
                "<span class='agrupacion-dato-valor'>" + agrup[prop] + "</span>\n"+
                "</div>\n";
            }
            elemento.innerHTML += "</div>\n";
        }



export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}