"use strict";

function mostrarDatoEnId(idElemento,valor)
{
    let elem=document.getElementById(idElemento);
    let parrafo=document.createElement('p');
    parrafo.textContent=valor;
    elem.appendChild(parrafo);
}

function mostrarGastoWeb(idElemento, gastos) 
{
    let div = document.getElementById(idElemento);
    for (let gasto of gastos) 
    {
        let aux = "";
        for (let eti of gasto.etiquetas) 
        {
            aux += `
            <span class="gasto-etiquetas-etiqueta">
                ${eti}
            </span>`
        }
        div.innerHTML += 
            `<div class="gasto">
                <div class="gasto-descripcion">${gasto.descripcion}</div>
                <div class="gasto-fecha">${gasto.fecha}</div> 
                <div class="gasto-valor">${gasto.valor}</div> 
                <div class="gasto-etiquetas">
                ${aux}`;
    }
}
function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo)
{

    let index1 = `<div class="agrupacion">
                        <h1>Gastos agrupados por ${periodo}</h1>`
    
    for(let elem in agrup)
    {
        index1 += `<div class="agrupacion-dato">
                        <span class="agrupacion-dato-clave">${elem} </span>
                        <span class="agrupacion-dato-valor">${agrup[elem]}</span
                        </div> `;
    }
    index1 += `</div>`;

    document.getElementById(idElemento).innerHTML += index1;
                 
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
