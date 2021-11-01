/*utilidades necesarias para mostrar los datos de la aplicación*/
"use strict";
function mostrarDatoEnId(idElemento,valor){
    let Elemento = document.getElementsByTagName(idElemento); //selecciona el elemento
    let parrafo = document.createElement("p").createTextNode(valor);//crea el elemento para el texto y el contenido dentro de dicho elemento
    Elemento.appendChild(parrafo)//añade el contenido del texto al párrafo
}

function mostrarGastoWeb(idElemento,id){
    let gasto = {
        
    }
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodos){

}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}