

function mostrarDatoEnId(valor,idElemento){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML += `<p>{$valor}</p>`   
}

function mostrarGastoWeb(idElemento,gasto){
    let elemento = document.getElementById(idElemento);
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){

}


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}