/*El código de este fichero hará uso de la teoría explicada en la sección Documento del tutorial de JavaScript. El fichero deberá exportar las siguientes funciones:

mostrarDatoEnId
mostrarGastoWeb
mostrarGastosAgrupadosWeb*/ 
'use strict'

function mostrarDatoEnId(idElemento,valor)
{
    /**Función de dos parámetros que se encargará de escribir el valor (texto) en el elemento HTML con id idElemento indicado:
    idElemento - Hará referencia al id del elemento HTML donde se insertará el resultado en formato texto.
    valor - El valor a mostrar */
    
    document.getElementById(idElemento).innerHTML += valor;

}

function mostrarGastoWeb(idElemento,gasto)
{
    /*Función de dos parámetros que se encargará de añadir dentro del elemento HTML con id idElemento indicado una estructura HTML para el gasto que se pase como parámetro:
    idElemento - Hará referencia al id del elemento HTML donde se insertará el conjunto de estructuras HTML que se crearán para cada gasto.
    gasto - Objeto gasto

<div class="gasto">
  <div class="gasto-descripcion">DESCRIPCIÓN DEL GASTO</div>
  <div class="gasto-fecha">FECHA DEL GASTO</div> 
  <div class="gasto-valor">VALOR DEL GASTO</div> 
  <div class="gasto-etiquetas">
    <span class="gasto-etiquetas-etiqueta">
      ETIQUETA 1
    </span>
    <span class="gasto-etiquetas-etiqueta">
      ETIQUETA 2
    </span>
    <!-- Etcétera -->
  </div> 
</div>*/ 
let cadenaEtiquetas;
gasto.etiquetas.forEach(element => {
  cadenaEtiquetas+="<span class='gasto-etiquetas-etiqueta'>\n"+element+"</span>\n";
  
});

let element=document.getElementById(idElemento);
element.innerHTML+="<div class='gasto'>\n"
                 +"<div class='gasto-descripcion'>"+gasto.descripcion+"</div>\n"
                 +"<div class='gasto-fecha'>"+new Date(gasto.fecha).toLocaleDateString()+"</div>\n"
                 +"<div class='gasto-etiquetas'>\n"
                 +cadenaEtiquetas
                 +"</div>\n</div>\n";
                 




}

function mostrarGastosAgrupadosWeb(idElemento,agroup,periodo){
/**<div class="agrupacion">
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
</div> */
let agroupText="";
if(idElemento!=undefined)
{
for(let obj in agroup)
{
agroupText+="<div class='agrupacion-dato'>\n"
        + "<span class='agrupacion-dato-clave'>"+obj+"</span>\n"
        +"<span class='agrupacion-dato-valor'>"+agroup[obj]+"</span>\n"
        +"</div>\n";
}

  let element=document.getElementById(idElemento);
  element.innerHTML+="<div class='agrupacion'>\n"
                 +"<h1>Gastos agrupados por "+periodo+"</h1>\n"
                 +agroupText
                 +"</div>\n</div>\n";
}

}





export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb  
}