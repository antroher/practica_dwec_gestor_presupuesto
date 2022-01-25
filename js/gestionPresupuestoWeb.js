import * as datosPresupuesto from './gestionPresupuesto.js';

"use strict";

//ok
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

//OK
function mostrarGastoWeb(idElemento, gasto )/*HAY Q PASARLE UN ARRAY DE GASTO*/ 
{
  let elemento = document.getElementById(idElemento);

  let divGasto = document.createElement("div");
  divGasto.className += "gasto";

  if(idElemento.includes('completo'))
  {
    divGasto.id = gasto.id;
  }

  let gastoDescripcion = document.createElement("div");
  gastoDescripcion.className += "gasto-descripcion";
  gastoDescripcion.textContent = `${gasto.descripcion}`;
 
  let gastoValor = document.createElement("div");
  gastoValor.className += "gasto-valor";
  gastoValor.textContent = `${gasto.valor}`;
 

  let gastoFecha = document.createElement("div");
  gastoFecha.className += "gasto-fecha";
  gastoFecha.textContent = `${gasto.fecha}`;
  

  let gastoEtiquetas = document.createElement("div");
  gastoEtiquetas.className += "gasto-etiquetas";
 

  for (let x of gasto.etiquetas) {

    let gastoEtiqueta = document.createElement("span");
    gastoEtiqueta.className += "gasto-etiquetas-etiqueta";
    gastoEtiqueta.textContent =`${x} `;
    gastoEtiquetas.append(gastoEtiqueta);

    if(idElemento.includes('completo'))
    {
      let nuevoObjEtiqueta = new BorrarEtiquetasHandle(); 
      nuevoObjEtiqueta.gasto = gasto;
      nuevoObjEtiqueta.etiqueta = x;
      gastoEtiqueta.addEventListener('click',nuevoObjEtiqueta);
    }
    
  }

  divGasto.append(gastoDescripcion, gastoValor, gastoFecha, gastoEtiquetas);
  elemento.append(divGasto);

  if(idElemento === 'listado-gastos-completo')
  {
    let buttomE = document.createElement("button");
    buttomE.className += "gasto-editar";
    buttomE.textContent = 'Editar';
    buttomE.type ='button';

    let buttomB = document.createElement("button");
    buttomB.className += "gasto-borrar";
    buttomB.textContent = 'Borrar';
    buttomB.type ='button';

    //Botón editar gasto
    let evEditar = new EditarHandle();
    evEditar.gasto = gasto;

    //Botón borrar gasto
    let evBorrar = new BorrarHandle();
    evBorrar.gasto = gasto;

    buttomB.addEventListener('click', evBorrar);
    buttomE.addEventListener('click', evEditar);

    let gastoactual= document.getElementById(gasto.id);
    gastoactual.append(buttomE, buttomB); 
    //boton borrar API -> PRACTICA 9
    let botonBorrarApi = document.createElement('button');
    botonBorrarApi.className += 'gasto-borrar-api';
    botonBorrarApi.textContent = 'Borrar (API)';
    botonBorrarApi.type = 'button';

    let borrarApiNew = new borrarGastoApiHandle();
    borrarApiNew.gasto = gasto;

    botonBorrarApi.addEventListener('click', borrarApiNew);
    gastoActual.append(botonBorrarApi);

    //Botón editar formulario
    
    let gastoActual = document.getElementById(gasto.id);; 

    let buttomEditForm = document.createElement('button');
    buttomEditForm.className += 'gasto-editar-formulario';
    buttomEditForm.textContent = 'Editar (formulario)';
    buttomEditForm.type = 'button';

    let evEditForm = new EditarHandleFormulario();
    evEditForm.gasto = gasto;

    buttomEditForm.addEventListener('click', evEditForm); 
    gastoActual.append(buttomEditForm);

  }
}

//ok
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let divP = document.getElementById(idElemento);
    divP.innerHTML = "";
    
    let lista = "";
    for (let [nombre, valor] of Object.entries(agrup))
    {
        lista +=    `<div class="agrupacion-dato">
                        <span class="agrupacion-dato-clave"> ${nombre} </span>
                        <span class="agrupacion-dato-valor"> ${valor} </span>
                    </div>`
    };

    divP.innerHTML +=   `<div class="agrupacion">
                                <h1> Gastos agrupados por ${periodo} </h1>
                            ${lista}`

    //PRACTICA 10
    // Estilos
    divP.style.width = "33%";
    divP.style.display = "inline-block";
    // Crear elemento <canvas> necesario para crear la gráfica
    // https://www.chartjs.org/docs/latest/getting-started/
    let chart = document.createElement("canvas");
    // Variable para indicar a la gráfica el período temporal del eje X
    // En función de la variable "periodo" se creará la variable "unit" (anyo -> year; mes -> month; dia -> day)
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

    // Creación de la gráfica
    // La función "Chart" está disponible porque hemos incluido las etiquetas <script> correspondientes en el fichero HTML
    const myChart = new Chart(chart.getContext("2d"), {
        // Tipo de gráfica: barras. Puedes cambiar el tipo si quieres hacer pruebas: https://www.chartjs.org/docs/latest/charts/line.html
        type: 'bar',
        data: {
            datasets: [
                {
                    // Título de la gráfica
                    label: `Gastos por ${periodo}`,
                    // Color de fondo
                    backgroundColor: "#555555",
                    // Datos de la gráfica
                    // "agrup" contiene los datos a representar. Es uno de los parámetros de la función "mostrarGastosAgrupadosWeb".
                    data: agrup
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

//ok
function actualizarPresupuestoWeb (){
  let cambioPresupuesto = parseFloat(prompt("¿Cuál es el valor del presupuesto actualmente?"));
  datosPresupuesto.actualizarPresupuesto(cambioPresupuesto);
  repintar();
}

//Botones
const actualizarpresupuesto = document.getElementById("actualizarpresupuesto");
const anyadirgasto = document.getElementById("anyadirgasto");

//Eventos
actualizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);
anyadirgasto.addEventListener('click', nuevoGastoWeb);

//ok
function nuevoGastoWeb()
{
  let descripcionNew = prompt('Introduzca la descripción del gasto');
  let valorNew = parseFloat(prompt('Introduzca un valor del gasto'));
  let fechaNew = prompt('Introduzca una fecha del gasto en formato yyyy-mm-dd');
  let etiquetasNew = prompt('Introduzca las etiquetas del gasto');
  let separador = ',';
  let Etiquetas = etiquetasNew.split(separador);
  datosPresupuesto.anyadirGasto(new datosPresupuesto.CrearGasto(descripcionNew, valorNew, fechaNew, ...Etiquetas));
  repintar();
}

//ok
function repintar(){
  
  document.getElementById('presupuesto').innerHTML='';
  let mostrar = datosPresupuesto.mostrarPresupuesto();
  mostrarDatoEnId("presupuesto",mostrar);
  
  document.getElementById('gastos-totales').innerHTML='';
  let gastoTotal = datosPresupuesto.calcularTotalGastos().toFixed(2);
  mostrarDatoEnId("gastos-totales",gastoTotal);
  
  document.getElementById('balance-total').innerHTML='';
  let balanceTotal = datosPresupuesto.calcularBalance().toFixed(2);
  mostrarDatoEnId("balance-total",balanceTotal);
  
  document.getElementById("listado-gastos-completo").innerHTML = "";
  let listGasto = datosPresupuesto.listarGastos();
  for (const gasto of listGasto) {
    mostrarGastoWeb("listado-gastos-completo", gasto);
  }
  //PRACTICA 10
  let DiaG = gestionPresupuesto.agruparGastos("dia");
  mostrarGastosAgrupadosWeb("agrupacion-dia", DiaG, "día");

  let MesG = gestionPresupuesto.agruparGastos("mes");
  mostrarGastosAgrupadosWeb("agrupacion-mes", MesG, "mes");

  let AnyoG = gestionPresupuesto.agruparGastos("anyo");
  mostrarGastosAgrupadosWeb("agrupacion-anyo", AnyoG, "año");
}


//ok
function EditarHandle() {
  
  this.handleEvent = function (e){
  
    let descripcion = prompt("Escribe la nueva descripción del gasto");
    let valor = parseFloat(prompt("Escribe la nueva valor del gasto"));
    let fecha = prompt("Escribe la fecha del gasto en formato yyyy-mm-dd");
    let etiquetas = prompt("Escribe las etiquetas del gasto separadas por ,");
   let etiquetas2 = etiquetas.split(',');

    this.gasto.actualizarValor(valor);
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetas2);
    
    repintar();
  }
}

//bien
function BorrarHandle() {
  
  this.handleEvent = function (e){
  
    let number = this.gasto.id;
  
    datosPresupuesto.borrarGasto(number);
  
    repintar();
    
  }
}
//bien
function BorrarEtiquetasHandle() {
  
  this.handleEvent = function (e){
  
    this.gasto.borrarEtiquetas(this.etiqueta);
    
    repintar();
  }
}

//ok
function CancelarFormularioHandle() 
{
    this.handleEvent = function(e)
    {
        document.getElementById("anyadirgasto-formulario").disabled = false;
        e.currentTarget.parentNode.remove();
        repintar();
    }
}

//ok
function nuevoGastoWebFormulario()
{
  //estamos haciendo una clonacion para poder manejarlo con javascript
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  //seleccionamos la etique form
  var formulario = plantillaFormulario.querySelector("form");

  let controlesPrincipales = document.getElementById("controlesprincipales");
  controlesPrincipales.append(formulario);

  document.getElementById("anyadirgasto-formulario").disabled = true;

  //Boton Enviar

  let enviarHadl = new EnviarFormularioHandle();
  formulario.addEventListener("submit", enviarHadl);

  //Boton Cancelar

  let botonCancelar =formulario.querySelector("button.cancelar");
  let cancelarEvento = new CancelarFormularioHandle();
  botonCancelar.addEventListener("click",cancelarEvento);

   //Boton Enviar Api - PRACTICA 9
   let botonEnviarApi = formulario.querySelector("button.gasto-enviar-api");
   botonEnviarApi.addEventListener('click', enviarGastoApi)
}

//OK
function EditarHandleFormulario() 
{
  this.handleEvent = function(event) 
  {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");

    let controlesPrincipales = document.getElementById("controlesprincipales");
    controlesPrincipales.append(formulario);

    let accesoEditForm = event.currentTarget;
    accesoEditForm.append(formulario);
    accesoEditForm.disabled = true;

    formulario.descripcion.value = this.gasto.descripcion;
    formulario.valor.value = parseFloat(this.gasto.valor);
    formulario.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
    formulario.etiquetas.value = this.gasto.etiquetas; 

    //Boton Enviar
    let enviarForm = new EnviarHandle();
    enviarForm.gasto = this.gasto;
    formulario.addEventListener('submit', enviarForm);

    //Boton Cancelar
    let cancelarForm = new CancelarFormularioHandle();
    let botonCancelarFormulario = formulario.querySelector("button.cancelar");
    botonCancelarFormulario.addEventListener('click', cancelarForm);

    /*Botón Editar API*/
        let editarFormularioApi = new EditarGastoApi();
        let botonEditarFormularioApi = formulario.querySelector("button.gasto-enviar-api");
        editarFormularioApi.gasto = this.gasto;
        botonEditarFormularioApi.addEventListener('click', editarFormularioApi);
  }
}

//OK
function EnviarFormularioHandle(){

  this.handleEvent = function (e) {

      e.preventDefault();

      let formulario = e.currentTarget;
      let dscr = formulario.descripcion.value;
      let valor = parseFloat(formulario.valor.value);
      let fecha = formulario.fecha.value;
      let etiquetas = formulario.etiquetas.value;
      
      let nuevoG = new datosPresupuesto.CrearGasto(dscr,valor,fecha,etiquetas);
      datosPresupuesto.anyadirGasto(nuevoG);

      repintar();

      document.getElementById("anyadirgasto-formulario").disabled = false;

  }

}

function EnviarHandle() 
{
    this.handleEvent = function(event) 
    {
        event.preventDefault();
        let accesoEnvH = event.currentTarget;
        
        let desc = accesoEnvH.descripcion.value;
        this.gasto.actualizarDescripcion(desc);

        let val = parseFloat(accesoEnvH.valor.value);
        this.gasto.actualizarValor(val);

        let fec = accesoEnvH.fecha.value;
        this.gasto.actualizarFecha(fec);

        let etique = accesoEnvH.etiquetas.value; 
        this.gasto.anyadirEtiquetas(etique);           

        repintar();
    }
}

//ok
let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

let botonNuevoGasto  = document.getElementById("anyadirgasto");
botonNuevoGasto.addEventListener("click", nuevoGastoWeb);

let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
botonAnyadirGastoFormulario.addEventListener("click", nuevoGastoWebFormulario);



//Practica 7
function filtrarGastosWeb(){
  
  this.handleEvent = function(event) 
  {
    event.preventDefault();
    //coge el valor del evento, del formulario, te da acceso al contenido del formulario
    let formulario = event.currentTarget;
    //cogemos el valor de la descripcion dada por el usuario
    let descripcion1 = formulario["formulario-filtrado-descripcion"].value;
    let fechaInicio = formulario["formulario-filtrado-fecha-desde"].value;
    let fechaFinal = formulario["formulario-filtrado-fecha-hasta"].value;
    let valorMin1 = formulario["formulario-filtrado-valor-minimo"].value;
    let valorMax1 = formulario["formulario-filtrado-valor-maximo"].value;
    let etiquetas = formulario["formulario-filtrado-etiquetas-tiene"].value;
    
    console.log(typeof valorMax1);
    etiquetas = datosPresupuesto.transformarListadoEtiquetas(etiquetas);

    let ObjetoNuevo = {

      fechaDesde: (fechaInicio === "") ? undefined : fechaInicio,
      fechaHasta: (fechaFinal === "") ? undefined : fechaFinal,
      valorMinimo: (valorMin1 === "") ? undefined : valorMin1,
      valorMaximo: (valorMax1 === "") ? undefined : valorMax1,
      descripcionContiene: (descripcion1 === "") ? undefined : descripcion1,
      etiquetasTiene: (etiquetas === "") ? undefined : etiquetas
    }
    let filtrar = datosPresupuesto.filtrarGastos(ObjetoNuevo);
    console.log(filtrar);

    let listarGastos = document.getElementById("listado-gastos-completo");
    listarGastos.innerHTML="";

    for (let gasto of filtrar)
    {
      mostrarGastoWeb("listado-gastos-completo", gasto);
    }
      
  }
}
//boton para filtrar 
let eviarGasto = new filtrarGastosWeb();
let formFiltr = document.getElementById("formulario-filtrado");
formFiltr.addEventListener('submit', eviarGasto);

//Practica 8
function guardarGastosWeb()
{
  this.handleEvent = function(e)
  {
    let listarGasto = datosPresupuesto.listarGastos();
    localStorage.GestorGastosDWEC = JSON.stringify(listarGasto);
  }
}
//boton guardar gastos
let eventGuardar = new guardarGastosWeb();
let guardarGastos = document.getElementById("guardar-gastos");
guardarGastos.addEventListener('click', eventGuardar);


function cargarGastosWeb()
{
  this.handleEvent = function(e)
  {
    //GUARDAME EN listarGasto en formato string lo que encuntres guardado en el item GestorGastosDWEC
     let listarGasto = JSON.parse(localStorage.getItem('GestorGastosDWEC'));
     //comprobar que si da un array vacio
      if (listarGasto !== null)
      {
          if (listarGasto.length >= 0)
            datosPresupuesto.cargarGastos(listarGasto);
      }
      else
      {
        datosPresupuesto.cargarGastos([]);
      }
      repintar();
  }
}

//boton cargar gastos
let eventCargar = new cargarGastosWeb();
let cargarGastos = document.getElementById("cargar-gastos");
cargarGastos.addEventListener('click', eventCargar);









//******************************************************
//********************* PRACTICA 9 *********************
//******************************************************
function cargarGastosApi ()
{
    let usuario = document.getElementById("nombre_usuario");
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;
    
    if (usuario == '')
    {
        console.log('No hay el nombre del usuario');
    }
    else
    {
        fetch (url, {method: 'GET'})
        .then(response => response.json())
        .then((result) => 
        {
            let resp = result;
            if (resp == '')
            {
                console.log('No hay el nombre del usuario');
            }
            else 
            {
                gestionPresupuesto.cargarGastos(resp);
                repintar();
            }
        })
        .catch(error => console.error(error));
    }
}

//BOTON CARGAR API
let loadGastApi = document.getElementById('cargar-gastos-api');
loadGastApi.addEventListener('click', cargarGastosApi);

function borrarGastoApiHandle()
{
    this.handleEvent = function(event)
    {
        let usuario = document.getElementById('nombre_usuario');
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

        if(usuario == "")
        {
            console.log('No hay el nombre del usuario');
        }
        else
        {
            fetch(url, {method: 'DELETE'})
            .then(response => response.json())
            .then(datos => 
            {
                if(datos.errorMessage)
                {
                    console.log(datos.errorMessage);
                }
                else
                {
                    cargarGastosApi();
                }
            })
            .catch(error => console.error(error));
        }
    }
}

function enviarGastoApi(event)
{
    let usuario = document.getElementById('nombre_usuario');
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;

    let formulario = e.currentTarget.form;
    let descripcionNew = formulario.elements.descripcion;
    let valorNew = parseFloat(formulario.elements.valor);
    let fechaNew = formulario.elements.fecha;
    let etiquetasNew = (formulario.elements.etiquetas).split(',');

    let nuevoG = 
    {
        descripcion: descripcionNew,
        fecha: fechaNew,
        valor: valorNew,
        etiquetas: etiquetasNew
    }

    if(usuario == '')
    {
        console.log('No hay el nombre del usuario')
    }
    else 
    {
        fetch(url, {
            method: 'POST', 
            body: JSON.stringify(nuevoG),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => 
        {
            if (response.ok)
            {
                cargarGastosApi();
            }
            else
            {
                console.log('Error');
            }
        })
        .catch(error => console.error(error));
    }    
}

function EditarGastoApi()
{
    this.handleEvent = function(event)
    {
        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

        let formulario = e.currentTarget.form;
        let descripcionNew = formulario.elements.descripcion;
        let valorNew = parseFloat(formulario.elements.valor);
        let fechaNew = formulario.elements.fecha;
        let etiquetasNew = (formulario.elements.etiquetas).split(',');

        let nuevoG = 
        {
            descripcion: descripcionNew,
            fecha: fechaNew,
            valor: valorNew,
            etiquetas: etiquetasNew
        }

        if(usuario == '')
        {
            console.log('No hay el nombre del usuario')
        }
        else 
        {
            fetch(url, {
                method: 'PUT', 
                body: JSON.stringify(nuevoG),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(response => 
            {
                if (response.ok)
                {
                    cargarGastosApi();
                }
                else
                {
                    console.log('Error');
                }
            })
            .catch(error => console.error(error));
        }  
    }
}


export{
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
}