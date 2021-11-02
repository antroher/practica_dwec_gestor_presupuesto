'use strict'

function mostrarDatoEnId(idElemento, valor)
{
    let elemento = document.getElementById(idElemento);
    
    elemento.innerHTML += `<p>${valor}</p>`;
    /*
    for (elemento of parrafo)
    {
        elemento.innerHTML = `<p>${valor}</p>`;
    }
    */
    
}

function mostrarGastoWeb(idElemento, gastos)
{
    let elemento = document.getElementById(idElemento);

    for (let lista of arrayGastos)
    {
        let div = '';

    }

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento);
}




//********** NO TOCAR **************
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}