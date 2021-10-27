//Para iterar sobre un collection del node usar for...of


function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elemento.appendChild(p);
}

//aqui gasto es un array, con lo que habria que cambiarlo y meterlo todo dentro de una iteracción
function mostrarGastoWeb(idElemento, gasto) {
    const elemento = document.getElementById(idElemento);
    let span = document.createElement("span").textContent = " ";
    if (gasto.etiquetas.length > 0 && gasto.etiquetas != null) {
        for (let i in gasto.etiquetas) {
            span.innerHTML += `
            <span class="gasto-etiquetas-etiqueta">
                ${i}
            </span>`
        }
    } else {
        span.innerHTML += `
            <span class="gasto-etiquetas-etiqueta">
                ${gasto.etiquetas[0]}
            </span>`
    }

    elemento.innerHTML = 
    `<div class="gasto">
    <div class="gasto-descripcion">${gasto.descripcion}</div>
    <div class="gasto-fecha">${gasto.fecha}</div> 
    <div class="gasto-valor">${gasto.valor}</div> 
    <div class="gasto-etiquetas">`;
    elemento.innerHTML = elemento.innerHTML + span.innerHTML + `</div> 
    </div>`

}

///aqui gasto es un array, con lo que habria que cambiarlo y meterlo todo dentro de una iteracción
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const elemento = document.getElementById(idElemento);
    agrup.forEach((x) => {
        elemento.innerHTML += `<div class="agrupacion-dato">
        <span class="agrupacion-dato-clave">${Object.keys(x)[0]}</span>
        <span class="agrupacion-dato-valor">${x[Object.keys(x)[0]]}</span>
    </div>`
    });
    elemento.innerHTML = 
    `
    <div class="agrupacion">
        <!-- PERIODO será "mes", "día" o "año" en función de si el parámetro
            de la función es "mes", "dia" o "anyo" respectivamente -->
        <h1>Gastos agrupados por ${periodo}</h1>
    `
    + elemento.innerHTML +`</div>`
}

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}