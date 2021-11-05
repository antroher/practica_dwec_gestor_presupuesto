//Función mostrarDatoenId

function mostrarDatoEnId(idElemento, valor){
    var elem = document.getElementById(idElemento);
    elem.textContent = valor;
}

//Función mostrarGastoWeb
function mostrarGastoWeb(idElemento, gastos){       
    let elem = document.getElementById(idElemento);

    for(let gasto of gastos){
        let cadena = "";
        for(let i of gasto.etiquetas){
            cadena += 
            `<span class="gasto-etiquetas-etiqueta">
                     ${i}
            </span>`
        }
    
        elem.innerHTML += `<div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div> 
            <div class="gasto-etiquetas">
               ${cadena};
            </div> 
        </div>`
    }
}

//Función mostrarGastosAgrupadosWeb
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    var elem = document.getElementById(idElemento);

    let elemento = ""
    for (let [clave, valor] of Object.entries(agrup)) {
        elemento += 
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${clave}</span>
            <span class="agrupacion-dato-valor">${valor}</span>
        </div>`
    };

    elem.innerHTML += 
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${elemento}
    </div>
    `
}

//Los exports 
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}