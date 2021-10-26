//Para iterar sobre un collection del node usar for...of


function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    const elemento = document.getElementById(idElemento);
    let span = document.createElement("span").textContent = " ";
    for (let i of gasto.etiquetas) {
        span.innerHTML += `
        <span class="gasto-etiquetas-etiqueta">
            ${i}
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

//Este habrá que arreglarlo -mirar lo del key - value
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