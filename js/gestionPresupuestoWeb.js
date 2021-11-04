function mostrarDatoEnId(idElemento, valor){
    var elem = document.getElementById(idElemento);
    let p = document.createElement('p');
    p.innerHTML = valor;
    elem.appendChild(p);
}

function mostrarGastoWeb(idElemento, gasto){
    var elem = document.getElementById(idElemento);
    var data = "";

    for(let i of gasto.etiquetas){
        data += 
        `<span class="gasto-etiquetas-etiqueta">
                 ${i}
        </span>`
    }

    elem.innerHTML = `<div class="gasto">
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${gasto.fecha}</div> 
        <div class="gasto-valor">${gasto.valor}</div> 
        <div class="gasto-etiquetas">
           ${data};
        </div> 
    </div>`
}

function mostrarGastosAgrupadosWeb(){

}

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}