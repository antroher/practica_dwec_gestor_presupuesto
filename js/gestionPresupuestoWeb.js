function mostrarDatoEnId(idElemento, valor){
    var elem = document.getElementById(idElemento);
    let p = document.createElement('p');
    p.innerHTML = valor;
    elem.appendChild(p);
}

function mostrarGastoWeb(idElemento, gasto){
    var elem = document.getElementById(idElemento);

    elem.innerHTML = `<div class="gasto">
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${gasto.fecha}</div> 
        <div class="gasto-valor">${gasto.valor}</div> 
        <div class="gasto-etiquetas">
            <span class="gasto-etiquetas-etiqueta">
                 
            </span>
            <span class="gasto-etiquetas-etiqueta">
                ETIQUETA 2
            </span>
      <!-- Etcétera -->
        </div> 
    </div>"`

}

function mostrarGastosAgrupadosWeb(){

}

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}