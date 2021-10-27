//Para iterar sobre un collection del node usar for...of


function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elemento.appendChild(p);
}

//aqui gasto es un array, con lo que habria que cambiarlo y meterlo todo dentro de una iteracción
function mostrarGastoWeb(idElemento, gastos) {
    let elemento = document.getElementById(idElemento);
    for (let gasto of gastos) {
        let data = "";
        for (let i of gasto.etiquetas) {
            data += `
            <div class="gasto-etiquetas-etiqueta">
                ${i}
            </div>`
        }
        elemento.innerHTML += 
        `<div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div> 
            <div class="gasto-etiquetas">
            ${data}`;
        // elemento.innerHTML += span.innerHTML + "</div>";
    }
}

///aqui gasto es un array, con lo que habria que cambiarlo y meterlo todo dentro de una iteracción
// function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
//     const elemento = document.getElementById(idElemento);
//     let data = ""
//     for (let [key, value] of Object.entries(agrup)) {
//         data += `<div class="agrupacion-dato">
//         <span class="agrupacion-dato-clave">${key}</span>
//         <span class="agrupacion-dato-valor">${value}</span>
//         </div>`
//     };
//     elemento.innerHTML += 
//     `
//     <div class="agrupacion">
//         <h1>Gastos agrupados por ${periodo}</h1>
//         ${data}
//     `
// }

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const elemento = document.getElementById(idElemento);
    let data = ""
    for (let [key, value] of Object.entries(agrup)) {
        data += `
        <div class="agrupacion-dato">
            <div class="agrupacion-dato-clave">${key}</div>
            <div class="agrupacion-dato-valor">${value}</div>
        </div>`
    };
    elemento.innerHTML += 
    `
    <div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${data}
    `
}

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}