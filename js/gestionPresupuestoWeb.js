

function mostrarDatoEnId(idElemento,valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML += `<p>${valor}</p>`;  
}

function mostrarGastoWeb(idElemento,gastos){
    let elemento = document.getElementById(idElemento);

    gastos.forEach((gasto) => {
        let etiquetas = "";

        gasto.etiquetas.forEach((etiqueta) => {
            etiquetas +=
            `<span class="gasto-etiquetas-etiqueta">
                ${etiqueta}
            </span>`;
        });

        elemento.innerHTML += 
        `<div class="gasto">
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${gasto.fecha}</div> 
        <div class="gasto-valor">${gasto.valor}</div> 
        <div class="gasto-etiquetas">
            ${etiquetas}
        </div> 
        </div>`
    })

}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let elemento = document.getElementById(idElemento);
    let gastos = [];
    
    for(let [propiedad,valor] of Object.entries(agrup)){
        gastos +=
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${propiedad}</span>
            <span class="agrupacion-dato-valor">${valor}</span>
        </div>`;
    }
    elemento.innerHTML += 
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${gastos}
    </div>`
}


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}