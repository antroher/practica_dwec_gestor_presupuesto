/*utilidades necesarias para mostrar los datos de la aplicación*/
"use strict";
function mostrarDatoEnId(idElemento, valor) {
    let Elemento = document.getElementById(idElemento); //selecciona el elemento
    let parrafo = document.createElement("p");//crea el elemento
    parrafo.textContent(valor);//modifica el contenido del elemento p
    Elemento.appendChild(parrafo);//añade el contenido del texto al párrafo (lo añade al html)
}

function mostrarGastoWeb(idElemento, gastos) {
    let elemento = document.getElementById(idElemento);
    let gastoEtiquetas ="";  
    for (const etiqueta of gastos.etiquetas) {
        gastoEtiquetas += `
        <span class="gasto-etiquetas-etiqueta">
            ${etiqueta}
        </span>`
    }
    elemento.innerHTML += `
  <div class="gasto">
  <div class="gasto-descripcion">${gastos.descripcion}</div>
  <div class="gasto-fecha">${gastos.fecha}</div>
  <div class="gasto-valor">${gastos.valor}</div>
  <div class="gasto-etiquetas">
  ${gastoEtiquetas}
  </div>
  </div>
  `;
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let element = document.getElementById(idElemento);
    let agrupacion = "";
    for (const [param,value] of agrup) {
        agrupacion += `
        <div class="agrupacion-dato">
        <span class="agrupacion-dato-clave">${param}</span>
        <span class="agrupacion-dato-valor">${value}</span>
        </div>`
    }
    element.innerHTML += `
    <div class="agrupacion">
    <h1>Gastos agrupados por ${periodo}</h1>
    `
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
/*se le paso un array de gastos
crear gasto y lo filtra y llames a mostrar gasto web pasando el id que te dice en el archivo y pasandole 
el array de gasto ndra que
recorrer todas las etiquetas del array de gastos y dentro te recorrerrer sus etiquetras
con innerhtm para meterlo dento 
modificar los 


para cada gasto se crea un div con cada gaso y dentro de mismo 

fecha del gasto = gasto.fecha
añadir estructura completa
*/
/*agrup devuelve un objeto por agrupacion de periodos
periodo = preiodo por el que se agrupa
seleccionar elemento con su id y crear una estrucutura para ese objeto en el documento
parecido al anterior
pero muestra la agrupacion por mes, dia o año. la estructura creada de html tendra que mostrr el parametro que se le pasa*/

/*for of recorrer el listado de mostrarGastosAgrupadosWeb, gasto descripcio = gasto.descripcion
    for of para etiquetas de cada gasto y las meto en un string concatenado para poner los daos en el código html
    */