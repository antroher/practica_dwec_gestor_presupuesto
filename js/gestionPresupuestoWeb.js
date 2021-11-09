function mostrarDatoEnId(idElemento, valor)
{
    let elem = document.getElementById(idElemento);
    let p= document.createElement('p');

    p.textContent=valor;
    elem.appendChild(p);
}

function mostrarGastoWeb(idElemento, gasto)
{
    let cadenaGasto= `<div class="gasto">
                        <div class="gasto-descripcion">${gasto.descripcion}</div>
                        <div class="gasto-fecha">${gasto.fecha}</div> 
                        <div class="gasto-valor">${gasto.valor}</div> 
                        <div class="gasto-etiquetas">`;

    
    for(let etiq of gasto.etiquetas)
    {
        cadenaGasto+= `<span class="gasto-etiquetas-etiqueta"> ${etiq} </span>`
    }

    cadenaGasto+= `</div></div>`

    document.getElementById(idElemento).innerHTML += cadenaGasto;
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let cadenaGAgrup=`<div class="agrupacion">
                        <h1>Gastos agrupados por ${periodo}</h1>`;

    for(let propiedad in agrup)
    {
        cadenaGAgrup+=`<div class="agrupacion-dato">
                            <span class="agrupacion-dato-clave">${propiedad}</span>
                            <span class="agrupacion-dato-valor">${agrup[propiedad]}</span>
                        </div>`;
    }

    cadenaGAgrup+=`</div>`
    document.getElementById(idElemento).innerHTML+= cadenaGAgrup;

}

export{ mostrarDatoEnId,
        mostrarGastoWeb,
        mostrarGastosAgrupadosWeb}