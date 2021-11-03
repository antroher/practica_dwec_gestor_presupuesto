
function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML += valor;
}

function mostrarGastoWeb(idElemento, gasto){
    let elemento = document.getElementById(idElemento);
    let html = 
    "<div class='gasto'>\n" +
    "<div class='gasto-descripcion'>" + gasto.descripcion + "</div>\n" +
    "<div class='gasto-fecha'>" + new Date(gasto.fecha).toLocaleDateString() + "</div>\n" + 
    "<div class='gasto-valor'>" + gasto.valor + "</div>\n" + 
    "<div class='gasto-etiquetas'>\n";
    gasto.etiquetas.forEach(e => {
        html += "<span class='gasto-etiquetas-etiqueta'>\n" + e + "\n</span>\n"
    });
    html += "</div>\n</div>\n";
    elemento.innerHTML += html;
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elemento = document.getElementById(idElemento);
    let html= 
    "<div class='agrupacion'>\n" + 
    "<h1>Gastos agrupados por " + periodo + "</h1>\n";
    for(let prop in agrup){
        html += 
        "<div class='agrupacion-dato'>\n" +
        "<span class='agrupacion-dato-clave'>" + prop + "</span>\n" +
        "<span class='agrupacion-dato-valor'>" + agrup[prop] + "</span>\n"+
        "</div>\n";
    }
    html += "</div>\n";
    elemento.innerHTML += html;
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}