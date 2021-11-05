 "use strict";

 function mostrarDatoEnId(idElemento, valor){

    let dataId = document.getElementById(idElemento);
    dataId.innerHTML += `<p>${valor}<p>`;

 }

 function mostrarGastoWeb(idElemento, gastos){
    let elmnt = document.getElementById(idElemento);

    gastos.forEach((gasto) => {
        let etiquetas = "";

        gasto.etiquetas.forEach((etiqueta) => {
            etiquetas += (

                `<span class="gasto-etiquetas-etiqueta"> 
                                ${etiqueta}
                </span>`
            );
        });

        elmnt.innerHTML += (
            `<div class="gasto">

                <div class="gasto-descripcion">${gasto.descripcion}</div>
                <div class="gasto-fecha">${gasto.fecha}</div> 
                <div class="gasto-valor">${gasto.valor}</div> 
                <div class="gasto-etiquetas">${etiquetas}</div> 

            </div>`
        )
    });
 }

 function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elmnt = document.getElementById(idElemento);
    let gastos ={};

    for(let propertie in agrup){
        gastos +=(
            `<div class='agrupacion-dato'>

                <span class='agrupacion-dato-clave'>${propertie}</span>
                <span class='agrupacion-dato-valor'>" ${propertie[agrup]}</span>

            </div>`
        )

        elmnt.innerHTML += (
            `<div class='agrupacion'>

                <h1>Gastos agrupados por ${periodo} </h1>
                ${gastos}
                
            </div>`
        );
    }
 }

 export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
 }