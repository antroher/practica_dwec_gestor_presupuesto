function mostrarDatoEnId(valor, idElemento){
    let elem= document.getElementById(idElemento);
    elem.innerHTML=valor;
}

function mostrarGastoWeb(idElemento, gasto){
    let elem = document.getElementById(idElemento);
    let etiq="";
    gasto.etiquetas.forEach(e => {
        etiq+="<span class='gasto-etiquetas-etiqueta'>\n";
        etiq+=e+"\n";
        etiq+="</span>";
    });
    elem.innerHTML+="<div class='gasto'>\n"+
                    "<div class='gasto-descripcion'>"+gasto.descripcion+"</div>\n"+
                    "<div class='gasto-fecha'>"+new Date(gasto.fecha).toLocaleDateString()+"</div>\n"+
                    "<div class='gasto-valor'>"+gasto.valor+"</div>\n"+
                    "<div class='gasto-etiquetas'>\n"+
                    etiq+
                    "</div>\n"+
                    "</div>";
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    
}

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
    
}