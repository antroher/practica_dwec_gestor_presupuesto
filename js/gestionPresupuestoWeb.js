/*El código de este fichero hará uso de la teoría explicada en la sección Documento del tutorial de JavaScript. El fichero deberá exportar las siguientes funciones:

mostrarDatoEnId
mostrarGastoWeb
mostrarGastosAgrupadosWeb*/ 
'use strict'

function mostrarDatoEnId(texto,idElemento)
{
    /**Función de dos parámetros que se encargará de escribir el valor (texto) en el elemento HTML con id idElemento indicado:
    idElemento - Hará referencia al id del elemento HTML donde se insertará el resultado en formato texto.
    valor - El valor a mostrar */
    
    document.getElementById(idElemento).innerHTML = texto.toString();

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
/** */

}





export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb  
}