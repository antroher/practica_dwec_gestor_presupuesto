function mostrarDatoEnId(idElemento, valor){
    var elem = document.getElementById(idElemento);
    let p = document.createElement('p');
    p.textContent = valor;
    elem.appendChild(p);
}

function mostrarGastoWeb(idElemento, gasto){
    var elem = document.getElementById(idElemento);
    var data = " ";

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

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    var elem = document.getElementById(idElemento);

    let datos = ""
    for (let [clave, valor] of Object.entries(agrup)) {
        datos += 
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${clave}</span>
            <span class="agrupacion-dato-valor">${valor}</span>
        </div>`
    };

    elem.innerHTML += 
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${datos}
    `
}

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}