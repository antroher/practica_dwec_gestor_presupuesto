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
        etiq+="</span>\n";
    });
    elem.innerHTML+="<div class='gasto'>\n"+
                    "<div class='gasto-descripcion'>"+gasto.descripcion+"</div>\n"+
                    "<div class='gasto-fecha'>"+new Date(gasto.fecha).toLocaleDateString()+"</div>\n"+
                    "<div class='gasto-valor'>"+gasto.valor+"</div>\n"+
                    "<div class='gasto-etiquetas'>\n"+
                    etiq+
                    "</div>\n"+
                    "</div>\n";
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let elem=document.getElementById(idElemento);
    let cad="<div class='agrupacion'>\n"+
            "<h1>Gastos agrupados por "+periodo+"</h1>\n";
    for(let prop in agrup){
        cad+="<div class='agrupacion-dato'>\n"+
            "<span class='agrupacion-dato-clave'>"+prop+"</span>\n"+
            "<span class='agrupacion-dato-valor'>"+agrup[prop]+"</span>\n"+
            "</div>\n";
    }  

    elem.innerHTML=cad;
}

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
    
}