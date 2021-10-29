//Este fichero contendrá las utilidades necesarias para mostrar los datos de la aplicación en la página interaccionHTML.html
"use strict";

//Escribe el valor en el elemento HTML con id indicado
function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).innerHTML = "<p>" + valor + "</p>";
    // let test = document.querySelector(idElemento);
    //test.innerHTML = valor ;
}

//Función de dos parámetros que se encargará de añadir dentro del elemento HTML con id indicado una estructura HTML para el gasto pasado
function mostrarGastoWeb(idElemento, gasto) {
    let textoHTML =
        `<div>
<div class="gasto">
  <div class="gasto-descripcion">${gasto.descripcion}</div>
  <div class="gasto-fecha">${gasto.fecha}</div> 
  <div class="gasto-valor">${gasto.valor}</div> 
  <div class="gasto-etiquetas">
`;
    for (let et in gasto.etiquetas) {
        textoHTML += '<span class="gasto-etiquetas-etiqueta">' + et + '</span>'
    }
    textoHTML += ' </div> </div> </div>'

    document.getElementById(idElemento).innerHTML = textoHTML;
}
//Función de tres parámetros que se encargará de crear dentro del elemento HTML con id indicado una estructura HTML para el objeto que se pase como parámetro
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

    let textoHTML =
    `
    <div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
    `;
    for (let propiedad of agrup) {
        textoHTML +=
         `
        <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${propiedad}</span>
            <span class="agrupacion-dato-valor">${agrup[propiedad]}</span>
        </div>
        `;
    }
    textoHTML += "</div>"
    document.getElementById(idElemento).innerHTML = textoHTML;
}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}