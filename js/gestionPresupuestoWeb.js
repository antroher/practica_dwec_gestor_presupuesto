/*El código de este fichero hará uso de la teoría explicada en la sección Documento del tutorial de JavaScript. El fichero deberá exportar las siguientes funciones:

mostrarDatoEnId
mostrarGastoWeb
mostrarGastosAgrupadosWeb*/ 
import * as gp from "./gestionPresupuesto.js";
'use strict'

document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);

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
</div>
                  */

                

                 let elem = document.getElementById(idElemento);

                 let divPrincipal = document.createElement("div");
                 divPrincipal.className += "gasto";
                 divPrincipal.id = `gasto-${gasto.id}`;
                 elem.append(divPrincipal);
             
                 
                 let divGD = document.createElement("div");
                 divGD.className += "gasto-descripcion";
                 divGD.textContent = gasto.descripcion;
                 
             
                 
                 let divGF = document.createElement("div");
                 divGF.className += "gasto-fecha";
                 divGF.textContent = new Date(gasto.fecha).toLocaleDateString();
                
             
                 
                 let divGV = document.createElement("div");
                 divGV.className += "gasto-valor";
                 divGV.textContent = gasto.valor;
                 
             
                
                 let divGE = document.createElement("div");

                 
                 divGE.className += "gasto-etiquetas";
             
             


                 gasto.etiquetas.forEach(item => {
                   //Objeto eliminar con evento
                     let borrarEtiquetas = new BorrarEtiquetasHandle();
                     borrarEtiquetas.gasto = gasto;
                     borrarEtiquetas.etiqueta = item;
             
                     let span = document.createElement("span");
                     span.className += "gasto-etiquetas-etiqueta";
                     span.textContent = item + " ";
                     if(idElemento === "listado-gastos-completo"){
                         
                         span.addEventListener("click", borrarEtiquetas);
                     }
                     divGE.append(span);
                 }); 
                 
                 
                 divPrincipal.append(divGD);
                 divPrincipal.append(divGF);
                 divPrincipal.append(divGV);
                 divPrincipal.append(divGE);
            
                 //Objeto editar con evento
                 let editHandler = new EditarHandle();
                 editHandler.gasto = gasto;
                     
                 let buttonEdit = document.createElement("button");
                 buttonEdit.className = "gasto-editar";
                 buttonEdit.textContent = "Editar";
                 buttonEdit.addEventListener("click", editHandler);
                     
                 //Objeto eliminar con evento
                 let borrarHandler = new BorrarHandle();
                 borrarHandler.gasto = gasto;
                     
                 let buttonDelete = document.createElement("button");
                 buttonDelete.className = "gasto-borrar";
                 buttonDelete.textContent = "Borrar";
                 buttonDelete.addEventListener("click", borrarHandler);


                 //Objeto editar formulario con evente

                 let EditarFormHandler= new EditarHandleFormulario();
                 EditarFormHandler.gasto=gasto;

                 let buttonEditForm= document.createElement("button");
                 buttonEditForm.className="gasto-editar-formulario";
                 buttonEditForm.textContent="Editar (formulario)";
                 buttonEditForm.addEventListener("click",EditarFormHandler)
                
                 if(idElemento === "listado-gastos-completo"){
                     divPrincipal.append(buttonEdit);
                     divPrincipal.append(buttonDelete);
                     divPrincipal.append(buttonEditForm);
                 }

                 


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




document.getElementById('presupuesto').innerHTML='';
let presupuesto = gp.mostrarPresupuesto();
mostrarDatoEnId("presupuesto",presupuesto);

document.getElementById('gastos-totales').innerHTML='';
let gastoTotal = gp.calcularTotalGastos();
mostrarDatoEnId("gastos-totales",gastoTotal);

document.getElementById('balance-total').innerHTML='';
let balanceTotal = gp.calcularBalance();
mostrarDatoEnId("balance-total",balanceTotal);

document.getElementById("listado-gastos-completo").innerHTML = '';
let listGasto = gp.listarGastos();
for (const gasto of listGasto) {
  mostrarGastoWeb("listado-gastos-completo", gasto);
}
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
  this.handleEvent = function (e){
  let descripcion,valor,fecha,etiquetasnexo,etiquetasreal;
     descripcion = prompt("Escribe la nueva descripción del gasto");
     valor = parseFloat(prompt("Escribe la nueva valor del gasto"));
     fecha = new Date(prompt("Escribe la fecha del gastocon el formato ingles")).toLocaleDateString();
     etiquetasnexo = prompt("Escribe las etiquetas del gasto separadas por ,");
    etiquetasreal = etiquetasnexo.split(',');

    this.gasto.actualizarValor(valor);
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetasreal);
    
    repintar();
  }
}

function BorrarHandle()
{
  this.handleEvent = function (){
    let id = this.gasto.id;
    gp.borrarGasto(id);
    repintar();
    
  }
}
function BorrarEtiquetasHandle(){
  this.handleEvent = function (){
    this.gasto.borrarEtiquetas(this.etiqueta);
    repintar();
  }
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
let agroupText='';
if(idElemento!=undefined)
{
for(let i in agroup)
{
agroupText+="<div class='agrupacion-dato'>\n"
        + "<span class='agrupacion-dato-clave'>"+i+"</span>\n"
        +"<span class='agrupacion-dato-valor'>"+agroup[i]+"</span>\n"
        +"</div>\n";
}

  let element=document.getElementById(idElemento);
  element.innerHTML+="<div class='agrupacion'>\n"
                 +"<h1>Gastos agrupados por "+periodo+"</h1>\n"
                 +agroupText
                 +"</div>\n</div>\n";
}
}





//PRACTICA 6

function submitEditHandle () {
  this.handleEvent = function(event) {
    this.gasto.actualizarDescripcion(event.currentTarget.descripcion.value);
    this.gasto.actualizarValor(parseFloat(event.currentTarget.valor.value));
    this.gasto.actualizarFecha(event.currentTarget.fecha.value);
    let etiquetas = event.currentTarget.etiquetas.value;
    if (typeof etiquetas !== "undefined") {
        etiquetas = etiquetas.split(",");
    }
    this.gasto.etiquetas = etiquetas;

    repintar();
}
}

function cancelarEditHandle () {
  this.handleEvent = function() {
      this.formulario.remove();
      document.querySelector(`#gasto-${this.gasto.id} .gasto-editar-formulario`).disabled = false;
  }
}

function cancelarHandle () {
  this.handleEvent = function() {
      this.formulario.remove();
      document.getElementById("anyadirgasto-formulario").disabled = false;
  }
}


  function nuevoGastoWebFormulario(){
      let cancel = new cancelarHandle();
      let submit = new submitHandle();
      let form ;
      form= document.getElementById("formulario-template").content.cloneNode(true).querySelector("form");
   
    document.getElementById("controlesprincipales").append(form);

    document.getElementById('anyadirgasto-formulario').disabled = true;
    
    form.addEventListener('submit', submit);

    cancel.formulario = form;
    form.querySelector("button[class='cancelar']").addEventListener('click', cancel);
}

function submitHandle() {
  this.handleEvent = function(event) {
      event.preventDefault();
      let descripcion = event.currentTarget.descripcion.value;
      let valor = parseFloat(event.currentTarget.valor.value);
      let fecha = event.currentTarget.fecha.value;
      let etiquetas = event.currentTarget.etiquetas.value;

      if (typeof etiquetas !== 'undefined') {
          etiquetas = etiquetas.split(",");
      }
      let gasto = new gp.CrearGasto(descripcion, valor, fecha, etiquetas);
      gp.anyadirGasto(gasto);
      repintar();
      event.currentTarget.remove();
      document.getElementById('anyadirgasto-formulario').disabled = false;
  }
}

function EditarHandleFormulario(){
  this.handleEvent = function(event) {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var form = plantillaFormulario.querySelector("form");
    document.getElementById("gasto-"+this.gasto.id).append(form);

    document.querySelector(`#gasto-${this.gasto.id} .gasto-editar-formulario`).disabled = true;

    form.descripcion.value = this.gasto.descripcion;
    form.valor.value = this.gasto.valor;

    let fecha = new Date(this.gasto.fecha);
    let fechaFormateda = fecha.toISOString().substring(0,10);
    form.fecha.value = fechaFormateda;

    let etiquetaString = "";
    this.gasto.etiquetas.forEach((etiqueta, index) => {
        if (this.gasto.etiquetas.length - 1 === index) {
            etiquetaString += etiqueta;
        }
        else {
            etiquetaString += etiqueta + ", ";
        }
    });
    form.etiquetas.value = etiquetaString;

    let cancelarEvent = new cancelarEditHandle();
    cancelarEvent.formulario = form;
    cancelarEvent.gasto = this.gasto;
    form.querySelector("button[class='cancelar']").addEventListener('click', cancelarEvent);

    let submitEvent = new submitEditHandle();
    submitEvent.gasto = this.gasto;
    form.addEventListener('submit', submitEvent);

}
}

function filtrarGastosWeb(){

  this.handleEvent = function(event){

    event.preventDefault();

    let des = document.getElementById("formulario-filtrado-descripcion").value;
    let vMin = parseFloat(document.getElementById("formulario-filtrado-valor-minimo").value);
    let vMax = parseFloat(document.getElementById("formulario-filtrado-valor-maximo").value);
    let fecDes = document.getElementById("formulario-filtrado-fecha-desde").value;
    let fecHas = document.getElementById("formulario-filtrado-fecha-hasta").value;
    let etiTiene = document.getElementById("formulario-filtrado-etiquetas-tiene").value;
    let filtro = {};

    if (etiTiene.length > 0){
        filtro.etiquetasTiene = gp.transformarListadoEtiquetas(etiTiene);
    }
    filtro.fechaDesde = fecDes;
    filtro.fechaHasta = fecHas;
    filtro.valorMinimo = vMin;
    filtro.valorMaximo = vMax;
    filtro.descripcionContiene = des;

    document.getElementById("listado-gastos-completo").innerHTML="";
    let objsFiltrGastos = gp.filtrarGastos(filtro);

    for (let gasto of objsFiltrGastos){
        mostrarGastoWeb('listado-gastos-completo', gasto);
    }

}

}
document.getElementById('formulario-filtrado').addEventListener('submit', new filtrarGastosWeb());

/*sta función se utilizará como manejadora de eventos del evento click del botón guardar-gastos.

Se encargará de guardar el listado de gastos (disponible en la función listarGastos del paquete js/gestionPresupuesto.js)
 en la clave de almacenamiento de localstorage denominada GestorGastosDWEC.
 Ten en cuenta que solo se pueden almacenar strings. */
 function guardarGastosWeb(){
  this.handleEvent = function(event){
      localStorage.setItem('GestorGastosDWEC', JSON.stringify(gp.listarGastos()));    
  }
}

document.getElementById('guardar-gastos').addEventListener('click', new guardarGastosWeb);

/*Esta función se utilizará como manejadora de eventos del evento click del botón cargar-gastos.
Se encargará de cargar el listado de gastos (función cargarGastos del paquete js/gestionPresupuesto.js) 
desde la clave de almacenamiento de localstorage denominada GestorGastosDWEC. Ten en cuenta que solo se pueden almacenar strings.
Si no existe la clave en el almacenamiento, llamará a cargarGastos con un array vacío.
Una vez cargados los gastos deberá llamar a la función repintar para que se muestren correctamente en el HTML. */
function cargarGastosWeb(){
this.handleEvent = function(event){
  let clave = JSON.parse(localStorage.getItem('GestorGastosDWEC'));
  if (clave !== null){
      if (clave.length >= 0)
      gp.cargarGastos(clave);
  }
  else{
      gp.cargarGastos([]);
  }
  repintar();
}
}

document.getElementById('cargar-gastos').addEventListener('click', new cargarGastosWeb);
  
function CargarGastosApi() {
  
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
    BorrarEtiquetasHandle,
    nuevoGastoWebFormulario,
    EditarHandleFormulario,
    filtrarGastosWeb,
    CargarGastosApi
}
