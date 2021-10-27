//Este fichero contendrá las utilidades necesarias para mostrar los datos de la aplicación en la página interaccionHTML.html
"use strict";

//Escribe el valor en el elemento HTML con id indicado
function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).innerHTML = "<p>"+ valor + "</p>";
  // let test = document.querySelector(idElemento);
   //test.innerHTML = valor ;
}

function mostrarGastoWeb() {
    
}

function mostrarGastosAgrupadosWeb() {

}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}