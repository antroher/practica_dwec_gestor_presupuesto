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
    <!-- Este elemento span tendrá un manejador de eventos -->
    <span class="gasto-etiquetas-etiqueta">
      ETIQUETA 1
    </span>
    <!-- Este elemento span tendrá un manejador de eventos -->
    <span class="gasto-etiquetas-etiqueta">
      ETIQUETA 2
    </span>
    <!-- Etcétera -->
  </div> 
  <!-- Este botón tendrá un manejador de eventos -->
  <button class="gasto-editar" type="button">Editar</button>
  <!-- Este botón tendrá un manejador de eventos -->
  <button class="gasto-borrar" type="button">Borrar</button>
  <!-- Este botón tendrá un manejador de eventos -->
  <button class="gasto-borrar-api" type="button">Borrar (API)</button>
  <!-- Este botón tendrá un manejador de eventos -->
  <button class="gasto-editar-formulario" type="button">Editar (formulario)</button>
</div>
                  */

                //faltaaaaa

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

                 //Objeto borrarApi con evento

                 let objBorrarApi = new borrarApi();
                 objBorrarApi.gasto = gasto;

                 let botonBorrarApi = document.createElement('button');
                 botonBorrarApi.className="gasto-borrar-api";
                 botonBorrarApi.textContent = "Borrar (API)";
                 botonBorrarApi.addEventListener("click", objBorrarApi);
                 

                 //Objeto editar formulario con evento

                 let EditarFormHandler= new EditarHandleFormulario();
                 EditarFormHandler.gasto=gasto;

                 let buttonEditForm= document.createElement("button");
                 buttonEditForm.className="gasto-editar-formulario";
                 buttonEditForm.textContent="Editar (formulario)";
                 buttonEditForm.addEventListener("click",EditarFormHandler)
                
                 if(idElemento === "listado-gastos-completo"){
                     divPrincipal.append(buttonEdit);
                     divPrincipal.append(buttonDelete);
                     divPrincipal.append(botonBorrarApi);
                     divPrincipal.append(buttonEditForm);
                 }

                 


}

//Eventos !
function repintar() {
  mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
  mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
  mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());

  //Borramos la anterior
  document.getElementById('listado-gastos-completo').innerHTML = '';

  const listadoGastos = gestionPresupuesto.listarGastos();
  listadoGastos.forEach(gasto => {
      mostrarGastoWeb('listado-gastos-completo', gasto);
  });
  mostrarGastosAgrupadosWeb('agrupacion-dia', gestionPresupuesto.agruparGastos('dia'), 'día');
  mostrarGastosAgrupadosWeb('agrupacion-mes', gestionPresupuesto.agruparGastos('mes'), 'mes');
  mostrarGastosAgrupadosWeb('agrupacion-anyo', gestionPresupuesto.agruparGastos('anyo'), 'año');
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

function enviarGastoApi(event){
  this.handleEvent = function(event){
    let NombreUsuario = document.getElementById('nombre_usuario').value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${NombreUsuario}`;
    if (NombreUsuario != ''){
        var form = document.querySelector("#controlesprincipales form");
        let des = form.elements.descripcion.value;
        let val = parseFloat(form.elements.valor.value);
        let fec = form.elements.fecha.value;
        let eti = form.elements.etiquetas.value.split(',');
        //obj
        let gastoEnviar = {
            descripcion: des,
            valor: val,
            fecha: fec,
            etiquetas: eti
        };
        fetch (url, {method: 'POST', headers:{'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(gastoEnviar)})
            .then(function(respuesta) {
                if(respuesta.ok){
                    alert('El gasto se ha creado correctamente');
                    cargarGastosApi();
                }
                else{
                    alert('Error ' + respuesta.status + ': no se ha podido crear el gasto correctamente en la Api');
                }   
            })
            .catch(errors => alert(errors));
    }
    else{
        alert('Introduce un nombre.');
    }
}
}

function borrarApi(){
  this.handleEvent = function(event){

      let nomApe = document.getElementById('nombre_usuario').value;

      let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nomApe}/${this.gasto.gastoId}`;

      if (nomApe != '' || nomApe!="" || nomApe!=null || nomApe!=undefined){
          fetch (url, {method: 'DELETE'})
              .then(function(gastosApi) {
                  if(respuesta.ok){
                      cargarGastosApi(gastosApi);
                  }
                  else{
                      console.log('Error '+ respuesta.status);
                  }

              })
              .catch(errors => alert(errors));
      }
      
  }
}


function mostrarGastosAgrupadosWeb(idElemento, agrupacion, periodo) {
  var divP = document.getElementById(idElemento);
  divP.innerHTML = "";
  const agrupacionHTLM = document.createElement('div');
  agrupacionHTLM.className = 'agrupacion';
  const tituloHTML = document.createElement('h1');
  const tituloText = document.createTextNode(`Gastos agrupados por ${periodo}`);
  tituloHTML.appendChild(tituloText);
  agrupacionHTLM.appendChild(tituloHTML);

  // Agrupación
  for (const agrupacionDato in agrupacion) {
      const agrupacionDatoHTML = document.createElement('div');
      agrupacionDatoHTML.className = 'agrupacion-dato';
      const agrupacionDatoClaveHTML = document.createElement('span');
      agrupacionDatoClaveHTML.className = 'agrupacion-dato-clave';
      const agrupacionDatoClaveText = document.createTextNode(agrupacionDato);
      agrupacionDatoClaveHTML.appendChild(agrupacionDatoClaveText);
      agrupacionDatoHTML.appendChild(agrupacionDatoClaveHTML);
      const agrupacionDatoValorHTML = document.createElement('span');
      agrupacionDatoValorHTML.className = 'agrupacion-dato-valor';
      const agrupacionDatoValorText = document.createTextNode(agrupacion[agrupacionDato]);
      agrupacionDatoValorHTML.appendChild(agrupacionDatoValorText);
      agrupacionDatoHTML.appendChild(agrupacionDatoValorHTML);
      agrupacionHTLM.appendChild(agrupacionDatoHTML);
  }

  divP.append(agrupacionHTLM);

  divP.style.width = "33%";
  divP.style.display = "inline-block";
  let chart = document.createElement("canvas");
  let unit = "";
  switch (periodo) {
      case "anyo":
          unit = "year";
          break;
      case "mes":
          unit = "month";
          break;
      case "dia":
      default:
          unit = "day";
          break;
  }

  const myChart = new Chart(chart.getContext("2d"), {
      type: 'bar',
      data: {
          datasets: [
              {
                  label: `Gastos por ${periodo}`,
                  backgroundColor: "#555555",
                  data: agrupacion
              }
          ],
      },
      options: {
          scales: {
              x: {
                  // El eje X es de tipo temporal
                  type: 'time',
                  time: {
                      // Indicamos la unidad correspondiente en función de si utilizamos días, meses o años
                      unit: unit
                  }
              },
              y: {
                  // Para que el eje Y empieza en 0
                  beginAtZero: true
              }
          }
      }
  });
  // Añadimos la gráfica a la capa
  divP.append(chart);
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

    /**Añade un manejador de eventos necesario para gestionar el evento click del botón .gasto-enviar-api.
   Se encargará de realizar mediante fetch una solicitud POST a la URL correspondiente de la API.
  Se deberá crear la URL correspondiente utilizando el nombre de usuario que se haya introducido en el control input#nombre_usuario.
  El contenido de la petición POST se obtendrá a partir del formulario de creación.
  Una vez completada la petición, se deberá llamar a la función cargarGastosApi para actualizar la lista en la página. */
    
    let formTemplate = document.getElementById("formulario-template").content.cloneNode(true);
    let form = formTemplate.querySelector("form");

    document.getElementById('anyadirgasto-formulario').setAttribute('disabled', '');

    document.getElementById('controlesprincipales').append(form);

    form.addEventListener('submit', new submitHandle());

    let envApi = form.querySelector("button.gasto-enviar-api");
    envApi.addEventListener('click', new enviarGastoApi());

    form.querySelector("button.cancelar").addEventListener('click',new cancelarHandle());
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

    let editApi = new editarApi();
    editApi.gasto = this.gasto;
    form.querySelector("button.gasto-enviar-api").addEventListener('click', editApi);
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

  let usuario = document.querySelector("#nombre_usuario").value;
   
    if (usuario != '' || usuario!=undefined || usuario !=null) {
      fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`, {method: 'GET'})
          .then(respuesta => respuesta.json())
          .then((result) => {
              let resultado = result;
              if(resultado == "" || resultado =='') {
                  console.log("No existe el usuario")
              } else {
                  gp.cargarGastos(resultado);
                  repintar();
              }
              })
          .catch(error => console.error(error));
    }
}
 document.getElementById("cargar-gastos-api").addEventListener("click", CargarGastosApi);

 function BorrarGastoApi(){
    
  this.handleEvent = function(event){
      let usuario = document.getElementById("nombre_usuario").value;
      let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

      if (usuario == "") {
          console.log("El input del nombre de usuario esta vacio");
      } else {
          fetch(url, {method: 'DELETE'})
          .then(response => response.json())
          .then(datos => {
              if(!datos.errorMessage){
                  CargarGastosApi();
              } else {
                  console.log(datos.errorMessage);
              }
          })
          .catch(err => console.error(err));
      }
  }
}

function editarApi(){
  this.handleEvent = function(event){

      let NombreUsuario = document.getElementById('nombre_usuario').value;

      let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${NombreUsuario}/${this.gasto.gastoId}`;

      if (NombreUsuario != ''){
          var form = event.currentTarget.form;
          let des = form.elements.descripcion.value;
          let val = parseFloat(form.elements.valor.value);
          let fec = form.elements.fecha.value;
          let eti = form.elements.etiquetas.value.split(',');

          let gastoApi = {
              descripcion: des,
              valor: val,
              fecha: fec,
              etiquetas: eti
          };
          fetch (url, {method: 'PUT', body: JSON.stringify(gastoApi), headers:{'Content-Type': 'application/json;charset=utf-8'}})
          .then(function(respuesta) {
              if(respuesta.ok){
                  alert('El gasto se ha editado correctamente');
                  cargarGastosApi();
              }   
          })
          .catch(errors => alert(errors));
      }
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
    BorrarEtiquetasHandle,
    nuevoGastoWebFormulario,
    EditarHandleFormulario,
    filtrarGastosWeb,
    CargarGastosApi,
    
}
