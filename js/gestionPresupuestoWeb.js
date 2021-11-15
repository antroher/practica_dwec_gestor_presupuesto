/*El código de este fichero hará uso de la teoría explicada en la sección Documento del tutorial de JavaScript. El fichero deberá exportar las siguientes funciones:

mostrarDatoEnId
mostrarGastoWeb
mostrarGastosAgrupadosWeb*/ 
import * as gp from "./gestionPresupuesto.js";
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
</div> */
let cadenaEtiquetas="";
gasto.etiquetas.forEach(etiq => {
 
    cadenaEtiquetas+="<span class='gasto-etiquetas-etiqueta'>\n"+etiq+"\n</span>\n";
  
  
  
});

let element = document.getElementById(idElemento);
element.innerHTML+="<div class='gasto'>"
                 +"<div class='gasto-descripcion'>"+gasto.descripcion+"</div>"
                 +"<div class='gasto-fecha'>"+new Date(gasto.fecha).toLocaleDateString()+"</div>"
                 +"<div class='gasto-valor'>"+gasto.valor+"</div>"
                 +"<div class='gasto-etiquetas'>"
                 +cadenaEtiquetas
                 +"</div></div>";
                  

}

//Eventos !
function repintar()
{
  /*Por tanto, es necesario disponer de una función que vuelva a crear toda la estructura HTML que refleje los cambios realizados en el modelo de datos. 
  Esta función se denominará repintar, y realizará las siguientes tareas:

  Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información. Puedes utilizar innerHTML para borrar el contenido de dicha capa.
Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
La función repintar no actualizará el resto de capas (filtrados y agrupaciones) de la práctica anterior (lo haremos así por simplicidad).*/
let gastocompleto= new Array();
let gastos = gp.listarGastos();
document.getElementById("presupuesto").innerHTML=mostrarDatoEnId(gp.mostrarPresupuesto(),"presupuesto");
document.getElementById("balance-total").innerHTML=mostrarDatoEnId(gp.calcularTotalGastos(),"gastos-totales");
document.getElementById("gastos-totales").innerHTML=mostrarDatoEnId(gp.calcularBalance(),"balance-total");
document.getElementById("listado-gastos-completo").innerHTML=
gastos.forEach(item => {
  mostrarGastoWeb("presupuesto",item);
});

gastos.forEach(item => {
  mostrarGastoWeb("balance-total",item);
});
gastos.forEach(item => {
  mostrarGastoWeb("gastos-totales",item);
});

gastos.forEach(item => {
  gastocompleto.push(item);
});

gastocompleto.forEach(item=>{
  mostrarGastoWeb("listado-gastos-completo", item)
});
}


function actualizarPresupuestoWeb()
{
  let presupuesto=prompt("Introduce presupuesto");
    gp.actualizarPresupuesto(parseFloat(presupuesto));
    repintar();

}

function nuevoGastoWeb()
{
  /*Pedir al usuario la información necesaria para crear un nuevo gasto mediante sucesivas preguntas con prompt (por orden: descripción, valor, fecha y etiquetas). Por simplicidad, de momento no se comprobará la validez de dichos datos. La fecha vendrá dada en formato internacional (yyyy-mm-dd) y las etiquetas se introducirán en un único cuadro de texto como una lista separada por comas (por ejemplo, etiqueta1,etiqueta2,etiqueta3).
Convertir el valor a número (recuerda que prompt siempre devuelve un string).
Convertir la cadena de texto de etiquetas devuelta por prompt a un array.
Crear un nuevo gasto (función crearGasto). ¡Ojo con la manera de pasar el parámetro ~etiquetas~!
Añadir el gasto a la lista (función anyadirGasto).
Llamar a la función repintar para que se muestre la lista con el nuevo gasto.*/
  let descricion=prompt("Introduce descripcion gasto");
  let valor=parseFloat(prompt("Introduce valor gasto"));
  let fecha=prompt("Introduce fecha gasto");
  let etiquetas=prompt("Introduce etiquetas gasto").split(",");

 


  let gasto =new gp.CrearGasto(descricion,valor,fecha);
  etiquetas.forEach(e => {
      gasto.anyadirEtiquetas(e);
  });

  gp.anyadirGasto(gasto);
  repintar();
}

function EditarHandle()
{

}

function BorrarHandle()
{
  
}
function BorrarEtiquetasHandle(){
  let divGV=document.createElement('div');
  divGV.className+='gasto-valor';
  divGV.innerText=gasto.valor;

  let divGE=document.createElement('div');
  divGE.className+='gasto-etiquetas';
  divGE.id+=`e${gasto.id}`;

  for(let item of gasto.etiquetas)
  {
     
  }
  repintar();
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
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
}