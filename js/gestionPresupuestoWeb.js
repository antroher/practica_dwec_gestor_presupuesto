"use strict";

function mostrarDatoEnId(valor, idElemento){
    let idElemento2 = document.getElementById(idElemento);
    let valor2 = document.createTextNode(valor);

    idElemento2.appendChild(valor2);
}

function mostrarGastoWeb(idElemento, gasto){
    let idElemento3 = document.getElementById(idElemento);
    let gastoDescripcion = document.createTextNode(gasto.descripcion);
    let gastoFecha = document.createTextNode(gasto.fecha);
    let gastoValor = document.createTextNode(gasto.valor);

    let div1 = document.createElement("div");
    div1.appendChild(gastoDescripcion);

    let div2 = document.createElement("div");
    div2.appendChild(gastoFecha);

    let div3 = document.createElement("div");
    div3.appendChild(gastoValor);

    let span1;
    let spanTexto;
    let div4 = document.createElement("div");
    for(let i=0; i<gasto.etiquetas.length; i++){
         span1 = document.createElement("span");
         spanTexto = document.createTextNode(gasto.etiquetas[i]);
         span1.appendChild(spanTexto);
         div4.appendChild(span1);
    }

    idElemento3.appendChild(div1);
    idElemento3.appendChild(div2);
    idElemento3.appendChild(div3);
    idElemento3.appendChild(div4);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let idElemento3 = document.getElementById(idElemento);

    let h1 = document.createElement("h1");
    let h1Texto =document.createTextNode("gastos agrupador por "+periodo);
    h1.appendChild(h1Texto);
    idElemento3.appendChild(h1);

    let div5;
    let span2;
    let span3;
    let spanTexto2;
    let spanTexto3;

    for (const [key, value] of Object.entries(agrup)) {
        div5 = document.createElement("div");
        span2 = document.createElement("span");
        span3 = document.createElement("span");

        spanTexto2 = document.createTextNode(key);
        spanTexto3 = document.createTextNode(value);

        span2.appendChild(spanTexto2);
        span3.appendChild(spanTexto3);

        div5.appendChild(span2);
        div5.appendChild(span3);

        idElemento3.appendChild(div5);
    }
}

// export {
//     mostrarDatoEnId,
//     mostrarGastoWeb,
//     mostrarGastosAgrupadosWeb
// }