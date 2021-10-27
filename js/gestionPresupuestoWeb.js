function mostrarDatoEnId(idElemento ,valor){

        let idhtml = document.getElementsByClassName(idElemento);

        if(idthml)           
            idhtml.document.write(`${valor}`);
            
}

function mostrarGastoWeb(idElemento ,gasto){

    let gastoID = document.getElementsByClassName(idElemento);

    let hijosGasto = gastoId.childNodes;
    console.log(hijosGasto);

    if(gastoDesc)
        gastoDesc.document.write(`${gasto.descipcion}`);

}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){

}



/*Exportar las funciones necesarias.*/ 
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}