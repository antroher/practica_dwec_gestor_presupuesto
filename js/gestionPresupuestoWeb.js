
function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML += valor;
}

function mostrarGastoWeb(idElemento, gasto){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML += 
    "<div class='gasto'>\n" +
    "<div class='gasto-descripcion'>" + gasto.descripcion + "</div>\n" +
    "<div class='gasto-fecha'>" + new Date(gasto.fecha).toLocaleDateString() + "</div>\n" + 
    "<div class='gasto-valor'>" + gasto.valor + "</div>\n" + 
    "<div class='gasto-etiquetas'>\n";
    gasto.etiquetas.forEach(e => {
        elemento.innerHTML += "<span class='gasto-etiquetas-etiqueta'>\n" + e + "\n</span>\n"
    });
    elemento.innerHTML += "</div>\n </div>\n"
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML += 
    "<div class='agrupacion'>\n" + 
    "<h1>Gastos agrupados por " + periodo + "</h1>\n"
    for(let prop in agrup){
        elemento.innerHTML += 
        "<div class='agrupacion-dato'>\n" +
        "<span class='agrupacion-dato-clave'>" + prop + "</span>\n" +
        "<span class='agrupacion-dato-valor'>" + agrup[prop] + "</span>\n"+
        "</div>\n";
    }
    elemento.innerHTML += "</div>\n";
}