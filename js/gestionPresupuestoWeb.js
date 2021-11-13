"use strict";

function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elemento.appendChild(p);
}

function mostrarGastoWeb(idElemento, gastos) {
    let elemento = document.getElementById(idElemento);
    for (let gasto of gastos) {
        let data = "";
        for (let i of gasto.etiquetas) {
            data +=
            `<span class="gasto-etiquetas-etiqueta">
                ${i}
            </span>`
        }
        elemento.innerHTML += 
        `<div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div> 
            <div class="gasto-etiquetas">
            ${data}
            </div>`;
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

    let agrupacion = '';
    let elemento = document.getElementById(idElemento);

    for (let [param,value] of Object.entries(agrup)) {
        agrupacion += `
        <div class="agrupacion-dato">
        <span class="agrupacion-dato-clave">${param}</span>
        <span class="agrupacion-dato-valor">${value}</span>
        </div>`
<<<<<<< HEAD
    }
=======
    };
    elemento.innerHTML += 
    `<div class="agrupacion">
      if (${periodo}==='dia')
      <h1>Gastos agrupados por día</h1>
        else
        <h1>Gastos agrupados por ${periodo}</h1>
        ${data}`
}
>>>>>>> 4fdd94ad1baa8588b782717f9cec7a9b4d19f8a0

    elemento.innerHTML += `
    <div class="agrupacion">
    <h1>Gastos agrupados por ${periodo}</h1>
    ${agrupacion}
    `
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}