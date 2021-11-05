function mostrarDatoEnId(idElemento, valor) {
    let div = document.getElementById(idElemento);

    div.textContent = valor;
}

function mostrarGastoWeb(idElemento, gastos) {
    const div = document.getElementById(idElemento);

    for(let gasto of gastos) {
        let storage = "";
        for(let i = 0; gasto.etiquetas.length > i; i++) {
            storage +=  `
            <span class="gasto-etiquetas-etiqueta">
            ${gasto.etiquetas[i]}
          </span>`
        }

        div.innerHTML +=
        `<div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div>
            <div class="gasto-etiquetas">
                ${storage}
            `
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const div = document.getElementById(idElemento);

    let storage = "";
    for (let [clave, valor] of Object.entries(agrup)) {
        storage += 
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${clave}</span>
            <span class="agrupacion-dato-valor">${valor}</span>
        </div>`
    };
        div.innerHTML += ` 
    <div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${storage}
    `
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}