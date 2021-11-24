import * as gestionPresupuesto from './gestionPresupuesto.js'
'use strict';

document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);

function mostrarDatoEnId(idElemento ,valor){
    
    let p = document.createElement('p');
    let elem = document.getElementById(idElemento);
    p.textContent += valor;
    elem.appendChild(p);
    console.log(elem);

}

 function mostrarGastoWeb(idElemento ,gasto){
     let string1 = `<div class="gasto">
                            <div class="gasto-descripcion"> ${gasto.descripcion} </div>
                            <div class="gasto-fecha"> ${new Date(gasto.fecha).toLocaleDateString()} </div>
                             <div class="gasto-valor"> ${gasto.valor} </div>
                            <div class="gasto-etiquetas">`;


                        
    
    console.log(gasto.etiquetas);
    gasto.etiquetas.forEach(etiq => {
            string1 += ` <span class="gasto-etiquetas-etiqueta"> ${etiq} </span> `;

    });

        
    string1 += `</div></div>`;

    document.getElementById(idElemento).innerHTML += string1;

}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let string1 = `<div class="agrupacion">
                        <h1>Gastos agrupados por ${periodo}</h1>`
    
    for(let elem in agrup)
    {
        string1 += `<div class="agrupacion-dato">
                        <span class="agrupacion-dato-clave">${elem} </span>
                        <span class="agrupacion-dato-valor">${agrup[elem]}</span>
                        </div> `;
    }
    string1 += `</div>`;

    document.getElementById(idElemento).innerHTML += string1;
                 
}

function repintar()
{
    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gesPres.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    let listaGastos = gesPres.listarGastos();
    for (let g of listaGastos)
    {
        mostrarGastoWeb("listado-gastos-completo", g);
    }
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
