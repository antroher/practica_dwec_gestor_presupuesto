'use strict'

function mostrarDatoEnId(idElemento,valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML += `<p>${valor}</p>`;
}

function mostrarGastoWeb(idElemento, gastos)
{
    // let elemento = document.getElementById(idElemento);

    // for (let arrayGasto of gastos)
    // {
    //     let lista = "";
    //     for (let texto of arrayGasto.etiquetas) 
    //     {
    //         lista += `<span class="gasto-etiquetas-etiqueta"> ${texto} </span>`
    //     }

    //     elemento.innerHTML +=
    //         `<div class="gasto">
    //             <div class="gasto-descripcion"> ${arrayGasto.descripcion} </div>
    //             <div class="gasto-fecha">${arrayGasto.fecha}</div> 
    //             <div class="gasto-valor">${arrayGasto.valor}</div> 
    //             <div class="gasto-etiquetas">
    //                 ${lista}
    //             </div>
    //         </div>`;
    // }    

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
   
}




//********** NO TOCAR **************
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}