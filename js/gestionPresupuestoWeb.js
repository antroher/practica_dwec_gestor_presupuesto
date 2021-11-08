function mostrarDatoEnId(idElemento, valor)
{
   document.getElementById(idElemento).innerHTML = `<p>${valor}<\p>`;
}

function mostrarGastoWeb(idElemento, gasto)
{    
    let elem = document.getElementById(idElemento);
    let etiqueta =  "<div class='gasto'>"+
                    "<div class='gasto-descripcion'>" + gasto.descripcion + "</div>" +
                    "<div class='gasto-fecha'>" + new Date(gasto.fecha).toLocaleDateString() + "</div>" +
                    "<div class='gasto-valor'>" + gasto.valor + "</div>" +
                    "<div class='gasto-etiquetas'>";
           
        gasto.etiquetas.forEach(label =>
        {
            etiqueta += "<span class='gasto-etiquetas-etiqueta'>";
            etiqueta += label;
            etiqueta += "</span>";
        });

    etiqueta += `</div>
                </div>`;

    elem.innerHTML += etiqueta;
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{    
    let elem =  document.getElementById(idElemento);
    let txt =   "<div class='agrupacion'>" +
                "<h1>Gastos agrupados por "+ periodo + "</h1>";

    for (let i in agrup)
    {
        txt +=  "<div class='agrupacion-dato'>" +
                "<span class='agrupacion-dato-clave'>" + i + "</span>" +
                "<span class='agrupacion-dato-valor'>" + agrup[i] + "</span>" +
                "</div>";
    }

    txt += "</div>";
    elem.innerHTML += txt;  
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}