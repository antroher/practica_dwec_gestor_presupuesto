'use strict'

function mostrarDatoEnId(idElemento, valor) {

    let elem = document.getElementById(idElemento);
    let p = document.createElement('p');

    p.textContent = valor; // para modificar parte del texto del Dom, no meter codigo html nuevo

    elem.appendChild(p); // añade un hijo al elemento que han pasado por ID
}

function mostrarGastoWeb(idElemento,gasto) {
    let strGasto = `<div class="gasto">
                    <div class="gasto-descripcion">${gasto.descripcion}</div>
                    <div class="gasto-fecha">${gasto.fecha}</div> 
                    <div class="gasto-valor">${gasto.valor}</div> 
                    <div class="gasto-etiquetas">`;

    for (let eti of gasto.etiquetas){
        strGasto += `<span class="gasto-etiquetas-etiqueta">${eti}</span>`;
    }

    strGasto += `</div></div>`;

    document.getElementById(idElemento).innerHTML += strGasto;
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo) {  // agrup = { "2021-09": 5, "2021-10": 39}
    let textoHTML =                                                         
    `
    <div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
    `;
    for (let propiedad in agrup) {
        textoHTML +=
         `
        <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${propiedad}</span>
            <span class="agrupacion-dato-valor">${agrup[propiedad]}</span>
        </div>
        `;
    }
    textoHTML += "</div>"
    document.getElementById(idElemento).innerHTML = textoHTML;
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}