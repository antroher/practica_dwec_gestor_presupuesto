function mostrarDatoEnID(idElemento, valor){
    let elem = document.getElementById(idElemento);
    let p=document.createElement('p');
    p.textContent=valor;
    elem.appendChild(p);
}

function mostrarGastoWeb(idElemento, valor){

}
function mostrarGastosAgrupadosWeb(){

}


export {
    mostrarDatoEnID,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}