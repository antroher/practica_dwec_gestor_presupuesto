'use strict'

function mostrarDatoEnId(valor, idElemento)
{
    let elemento = document.getElementById(idElemento);
    
    elemento.innerHTML += `<p>${valor}</p>`;
}

function mostrarGastoWeb()
{

}

function mostrarGastosAgrupadosWeb()
{

}




//********** NO TOCAR **************
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}