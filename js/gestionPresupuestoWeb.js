
function mostrarDatoEnId(idElemento, valor){

    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement('p');
    parrafo.textContent = valor;
    elemento.appendChild(parrafo);

}

function mostrarGastoWeb(idElemento, gasto){
    console.log(idElemento + "||" + gasto)
    let bloque = `<div class="gasto">
                            <div class="gasto-descripcion"> ${gasto.descripcion} </div>
                            <div class="gasto-fecha"> ${gasto.fecha} </div>
                            <div class="gasto-valor"> ${gasto.valor} </div>
                            <div class="gasto-etiquetas">`;
    for(let etiqueta of gasto.etiquetas) 
    {     console.log(idElemento + "||" + etiqueta)
        bloque += `<span class="gasto-etiquetas-etiqueta"> ${etiqueta} </span>` 
    } 
    bloque += `</div>
                </div>`;
    document.getElementById(idElemento).innerHTML += bloque;
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let bloque = `<div class="agrupacion">
                        <h1>Gastos agrupados por ${periodo}</h1>`
    
    for(let elemento in agrup)
    {
        bloque += `<div class="agrupacion-dato">
                        <span class="agrupacion-dato-clave">${elemento} </span>
                        <span class="agrupacion-dato-valor">${agrup[elemento]}</span>
                        </div> `;
    }
    bloque += `</div>`;
    document.getElementById(idElemento).innerHTML += bloque;
}

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}