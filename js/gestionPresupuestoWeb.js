function mostrarDatoEnId(idElemento, valor) {

    let div = document.getElementById(idElemento);

    let p = document.createElement('p');

    p.textContent = valor;
    
    div.appendChild(p);
}

function mostrarGastoWeb(idElemento, gastos) {
    const div = document.getElementById(idElemento);

    for(let gasto of gastos) {
        
        let storage = "";
        for(let i = 0; gasto.etiquetas.length > i; i++) {
            storage =  `
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
                ${storage}`
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let div = document.getElementById(idElemento);

    let keyStorage = "";
    for(let key of Object.keys(agrup)) {
        keyStorage = ` 
        <span class="agrupacion-dato-clave">${key}</span>`
    }
    let valueStorage = "";
    for(let value of Object.values(agrup)) {
        valueStorage = `
        <span class="agrupacion-dato-valor">${value}</span>`
    }
        div.innerHTML += ` 
    <div class="agrupacion">
    
        <h1>Gastos agrupados por ${periodo}</h1>
    
        <div class="agrupacion-dato">
            ${keyStorage}

            ${valueStorage}
        </div>`
    
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}