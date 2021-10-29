/*Función de dos parámetros que se encargará de escribir el valor (texto) en el elemento HTML con id idElemento indicado:

idElemento - Hará referencia al id del elemento HTML donde se insertará el resultado en formato texto.
valor - El valor a mostrar.*/ 
function mostrarDatoEnId (idElemento, valor)
{

}
/*Función de dos parámetros que se encargará de añadir dentro del elemento HTML con id idElemento indicado una estructura HTML para el gasto que se pase como parámetro:

idElemento - Hará referencia al id del elemento HTML donde se insertará el conjunto de estructuras HTML que se crearán para cada gasto.
gasto - Objeto gasto
Así, para un determinado gasto se creará una estructura como la siguiente:

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
</div>
Donde se sustituirán los textos por los datos del gasto correspondiente.*/ 
function mostrarGastoWeb()
{

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
function mostrarGastosAgrupadosWeb()
{

}





export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb 
}