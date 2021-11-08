"use strict";

function mostrarDatoEnId(idElemento, valor)
{
    let elem = document.getElementById(idElemento);
    let parrafo = document.createElement('p');
    parrafo.textContent = valor;
    elem.appendChild(parrafo);

}

function mostrarGastoWeb(idElemento, gasto)
{
    let div = `<div class="gasto">
                            <div class="gasto-descripcion"> ${gasto.descripcion} </div>
                            <div class="gasto-fecha"> ${gasto.fecha} </div>
                            <div class="gasto-valor"> ${gasto.valor} </div>
                            <div class="gasto-etiquetas">`;

    for(let gast of gastos.etiquetas)       
            div += ` <span class="gasto-etiquetas-etiqueta"> ${gast} </span> `;
        
    div += `</div></div>`;

    document.getElementById(idElemento).innerHTML += div;

}
        

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento);
    let mensaje= 
    "<div class='agrupacion'>\n" + 
    "<h1>Gastos agrupados por " + periodo + "</h1>\n";
    for(let etiq in agrup)
    {
        mensaje += 
        "<div class='agrupacion-dato'>\n" +
        "<span class='agrupacion-dato-clave'>" + etiq + "</span>\n" +
        "<span class='agrupacion-dato-valor'>" + agrup[etiq] + "</span>\n"+
        "</div>\n";
    }
    mensaje += "</div>\n";
    elemento.innerHTML += html;
    
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}