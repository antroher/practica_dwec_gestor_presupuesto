function mostrarDatoEnId(idElemento, valor)
{
    
    //let elem = document.getElementById(idElemento);
    //let paragraph = document.createElement('p');

    //paragraph.textContent = valor ;
    ////elem.appendChild(paragraph);
    
   document.getElementById(idElemento).innerHTML = `<p>${valor}<\p>`;
}

function mostrarGastoWeb(idElemento, gasto)
{
    
        let elem = document.getElementById(idElemento);
        let etiqueta =  "<div class='gasto'>\n"+
                        "<div class='gasto-descripcion'>" + gasto.descripcion + "</div>\n" +
                        "<div class='gasto-fecha'>" + new Date(gasto.fecha).toLocaleDateString() + "</div>\n" +
                        "<div class='gasto-valor'>" + gasto.valor + "</div>\n" +
                        "<div class='gasto-etiquetas'>\n";

        
        
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
    if (idElemento !== undefined)
    {
        let elem =  document.getElementById(idElemento);
        let txt =   "<div class='agrupacion'>\n" +
                    "<h1>Gastos agrupados por "+ periodo + "</h1>\n";

        for (let per in agrup)
        {
            txt +=  "<div class='agrupacion-dato'>\n" +
                    "<span class='agrupacion-dato-clave'>" + per + "</span>\n" +
                    "<span class='agrupacion-dato-valor'>" + agrup[per] + "</span>\n" +
                    "</div>\n";
        }

        txt += "</div>\n";
        elem.innerHTML += txt;
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}