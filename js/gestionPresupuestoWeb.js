import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement('p');
    if(id == elemento){
        parrafo.textContent(valor)
    }
}

function mostrarGastoWeb(idElemento, gastos){
  let elemento = document.getElementById(idElemento);
    for (let gasto of gastos) {
        let grpetiquetas = "";
        for (let etiquetai of gasto.etiquetas) {
            grpetiquetas += `<span class="gasto-etiquetas-etiqueta">${etiquetai}</span>`
        }
        elemento.innerHTML +=`<div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div>
            <div class="gasto-valor">${gasto.valor}</div> 
            <div class="gasto-etiquetas">${grpetiquetas}</div>`;
    }
}


function mostraGastosAgrupadosWeb(){
    const elemento = document.getElementById(idElemento);
    let data = ""
    for (let [key, value] of Object.entries(agrup)){
        data += `<div class="agrupacion-dato">
                    <span class="agrupacion-dato-clave">${key}</span>
                    <span class="agrupacion-dato-valor">${value}</span>
                </div>`
    };
    elemento.innerHTML +=`<div class="agrupacion"><h1>Gastos agrupados por ${periodo}</h1>${data}`
}







export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostraGastosAgrupadosWeb
}