"use strict";
function mostrarDatoEnId (idElemento, valor)
{
  let elemento = document.getElementById(idElemento);
  //Creo el elemento p para guardar lo que hay dentro de idElement.
  let parrafo = document.createElement("p");
  // Le pongo el valor de idElemente a párrafo
  parrafo.textContent = valor;
  //añade el valor el contenido de parrafo al Elemento, es decir, al HTML
  elemento.appendChild(parrafo);
}


function mostrarGastoWeb(idElemento, gastos )/*HAY Q PASARLE UN ARRAY DE GASTO*/ 
{
  let elemento = document.getElementById(idElemento);
  
  for (let i of gastos)
  { 
    let divEtiquetas = "";
      for(let j of i.etiquetas)
      {
        divEtiquetas += `
        <span class="gasto-etiquetas-etiqueta">
            ${j}
        </span>
        `
      }
    //guardamos en una variable todas las etiquetas 
   //modificamos el elemento html
    elemento.innerHTML += `
    <div class="gasto">
    <div class="gasto-descripcion">${i.descripcion}</div>
    <div class="gasto-fecha">${i.fecha}</div>
    <div class="gasto-valor">${i.valor}</div>
    <div class="gasto-etiquetas">
    ${divEtiquetas}
    </div>
    </div>
    `;
  }
  
}


/*Función mostrarGastosAgrupadosWeb
Función de tres parámetros que se encargará de crear dentro del elemento HTML con id idElemento indicado una estructura HTML para el objeto 
agrup que se pase como parámetro:

idElemento - Hará referencia al id del elemento HTML donde se insertará el conjunto de estructuras HTML que se creará para cada gasto.
agrup - Objeto que contendrá el resultado de agrupar el total de gastos por período temporal (ejecución de la función agruparGastos
     desarrollada en la práctica anterior). Recordemos un ejemplo del formato que puede tener agrup en el caso de agrupar por mes:
agrup = {
    "2021-09": 5,
    "2021-10": 39
}
    
periodo - Período temporal por el que se habrá realizado la agrupación. Recordemos que puede ser mes, dia o anyo.
Para cada objeto agrup se creará una estructura como la siguiente:

<div class="agrupacion">
  <!-- PERIODO será "mes", "día" o "año" en función de si el parámetro
       de la función es "mes", "dia" o "anyo" respectivamente -->
  <h1>Gastos agrupados por PERIODO</h1>

  <!-- Se deberá crear un div.agrupacion-dato para cada propiedad del objeto agrup:
       https://es.javascript.info/keys-values-entries#object-keys-values-entries -->
  <div class="agrupacion-dato">
    <span class="agrupacion-dato-clave">NOMBRE_PROPIEDAD_OBJETO_AGRUP</span>
    <span class="agrupacion-dato-valor">VALOR_PROPIEDAD_OBJETO_AGRUP</span>
  </div>

  <div class="agrupacion-dato">
    <span class="agrupacion-dato-clave">NOMBRE_PROPIEDAD_OBJETO_AGRUP</span>
    <span class="agrupacion-dato-valor">VALOR_PROPIEDAD_OBJETO_AGRUP</span>
  </div>

  <!-- Etcétera -->

</div>
Así, para el ejemplo de agrup dado antes se deberá generar un código como el siguiente:

<div class="agrupacion">
  <h1>Gastos agrupados por mes</h1>
  <div class="agrupacion-dato">
    <span class="agrupacion-dato-clave">2021-09</span>
    <span class="agrupacion-dato-valor">5</span>
  </div>

  <div class="agrupacion-dato">
    <span class="agrupacion-dato-clave">2021-10</span>
    <span class="agrupacion-dato-valor">39</span>
  </div>
</div>*/


function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
  const Elemen = document.getElementById(idElemento);
  let datos = ""
  for (let [llave, val] of Object.entries(agrup)) {
      datos += 
      `<div class="agrupacion-dato">
          <span class="agrupacion-dato-clave">${llave}</span>
          <span class="agrupacion-dato-valor">${val}</span>
      </div>`
  };
  Elemen.innerHTML += 
  `<div class="agrupacion">
      <h1>Gastos agrupados por ${periodo}</h1>
      ${datos}
  `
}




export{
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
}