/*utilidades necesarias para mostrar los datos de la aplicación*/
import * as gestionPresupuesto from "./gestionPresupuesto.js";
"use strict";

function mostrarDatoEnId(idElemento, valor) {
    let Elemento = document.getElementById(idElemento); //selecciona el elemento
    let parrafo = document.createElement("p");//crea el elemento
    parrafo.textContent = valor;//modifica el contenido del elemento p
    Elemento.appendChild(parrafo);//añade el contenido del texto al párrafo (lo añade al html)
}

function mostrarGastoWeb(idElemento, gastos) {
    let elemento = document.getElementById(idElemento);
    let divgasto = document.createElement('div');
    divgasto.className += "gasto" ; //hijo de elemento idElemento
    
    if (idElemento.includes('completo')){
        divgasto.id = gastos.id; //creo una id al gasto
    }
       
    let divGD = document.createElement("div");
    divGD.className += "gasto-descripcion";
    divGD.textContent = `${gastos.descripcion}`;

    let divGV = document.createElement("div");
    divGV.className += "gasto-valor";
    divGV.textContent = `${gastos.valor}`;

    let divGF = document.createElement("div");
    divGF.className += "gasto-fecha";
    divGF.textContent = `${gastos.fecha}`;

    let divEtiquetas = document.createElement("div");
    divEtiquetas.className += "gasto-etiquetas";

    for (let etiq of gastos.etiquetas){ //cada etiqueta se cuelga de las etiquetas referidas
        //añado la etiqueta a HTML haciendo referencia a la etiqueta del gasto
        let span = document.createElement("span");
        span.className += "gasto-etiquetas-etiqueta";
        span.textContent = `${etiq} `;
        divEtiquetas.append(span);

        if(idElemento.includes('completo'))
        { 
        let EventBorrarEtiqueta = new BorrarEtiquetasHandle();
        EventBorrarEtiqueta.gasto = gastos;
        EventBorrarEtiqueta.etiqueta = etiq;
        span.addEventListener('click', EventBorrarEtiqueta);
        }
    }
    divgasto.append(divGD, divGV, divGF, divEtiquetas);
    elemento.append(divgasto);
    
    if(idElemento === 'listado-gastos-completo')
    {
        //Botón editar:
        let ButtonEditar = document.createElement("button");//crea el elemento del boton ditar
        ButtonEditar.className += "gasto-editar"; //crea el botón editar
        ButtonEditar.textContent = 'Editar'; //contenido del boton editar
        ButtonEditar.type = 'button';        
       
        //Botón borrar:
        let ButtonBorrar = document.createElement("button");
        ButtonBorrar.className += "gasto-borrar";
        ButtonBorrar.textContent = 'Borrar';
        ButtonBorrar.type = 'button';        
        
        //evento del botón editar
        let eventEditar = new EditarHandle(); //objeto manejador de eventos
        eventEditar.gasto = gastos //EditarHandle tiene una propiedad gasto, a dicha propiedad se le asigna el parameto gastos
        //evento del botón borrar
        let EvenBorrar = new BorrarHandle();
        EvenBorrar.gasto = gastos;
        /*eventEditar es un objeto que tiene dos propiedades (una propiedad gasto y una función 
        HandEvent()) tiene que ser un objeto que tenga definida una propiedad y que sea una funcion*/
        ButtonBorrar.addEventListener('click',EvenBorrar);
        ButtonEditar.addEventListener('click',eventEditar);

        divgasto.append(ButtonEditar,ButtonBorrar);

        /* PRÁCTICA 9*/

        let btnBorrarApi = document.createElement("button");
        btnBorrarApi.className += `gasto-borrar-api`;
        btnBorrarApi.type = "button";
        btnBorrarApi.textContent = "Borrar (API)";

        let eventoBorrarApi = new BorrarGastoApiHandle()
        btnBorrarApi.addEventListener("click",)

        /************/
        /*
        práctica 6: Añade un segundo botón de edición a la estructura HTML de cada gasto
        
        Botón editar formulario*/
        let btnGastoForm = document.createElement("button");
        btnGastoForm.className += 'gasto-editar-formulario';
        btnGastoForm.textContent = 'Editar (formulario)';
        btnGastoForm.type = 'button';

        //eventos
        let eventGatoForm = new EditarHandleFormulario();
        eventGatoForm.gasto = gastos;
        btnGastoForm.addEventListener('click',eventGatoForm);

        divgasto.append(btnGastoForm);
        divgasto.append(ButtonEditar,ButtonBorrar);
    }  

    
    
    
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let element = document.getElementById(idElemento);
    let agrupacion = '';
    for (let [param,value] of Object.entries(agrup)) {
        agrupacion += `
        <div class="agrupacion-dato">
        <span class="agrupacion-dato-clave">${param}</span>
        <span class="agrupacion-dato-valor">${value}</span>
        </div>`
    }
    element.innerHTML += `
    <div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${agrupacion}
    `
}

//manejadora de eventos del botón actualizarpresupuesto del código HTML
function actualizarPresupuestoWeb() {
    let solicitudPresupuesto = parseFloat(prompt('introduzca el valor del presupuesto actual: '));
    gestionPresupuesto.actualizarPresupuesto(solicitudPresupuesto);
    repintar();
}


function nuevoGastoWeb() {
    let Descripcion = prompt('Introduce  la descripción del gasto');
    let valueGasto = parseFloat(prompt('Introduce  el valor correspondiente al gasto'));
    let fechaGato =  Date.parse(prompt('Introduce  la fecha del gasto en formato yyyy-mm-dd'));
    let EtiquetaGasto = prompt('Introduce la etiqueta del gasto separado por ,: ');
    //EtiquetaGasto = EtiquetaGasto.split(',');
    //Crear un nuevo gasto
    let NewGasto = new gestionPresupuesto.CrearGasto(Descripcion,valueGasto,fechaGato,EtiquetaGasto);
    //Añadir el gasto a la lista de gastos
    gestionPresupuesto.anyadirGasto(NewGasto);
    repintar();
}

function repintar() { //inner HTML faltan filtrados vaciar y volver a llamarlos 
    //Mostrar el presupuesto 
    document.getElementById('presupuesto').innerHTML ='';
    let presupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto",presupuesto);

    //Mostrar los gastos totales
    document.getElementById('gastos-totales').innerHTML ='';
    let Calculogastos = gestionPresupuesto.calcularTotalGastos().toFixed(2);
    mostrarDatoEnId("gastos-totales",Calculogastos);

    //Mostrar el balance total
    document.getElementById('balance-total').innerHTML ='';
    let BalancePresupuesto = gestionPresupuesto.calcularBalance().toFixed(2);
    mostrarDatoEnId("balance-total",BalancePresupuesto);

    //Borrar el contenido de div#listado-gastos-completo --> innerHTML para borrar el contenido de dicha capa
    document.getElementById("listado-gastos-completo").innerHTML = "";
    //Mostrar el listado completo de gastos
    let Listagastos = gestionPresupuesto.listarGastos();
    for (let k of Listagastos)
        mostrarGastoWeb("listado-gastos-completo", k);
}

function BorrarHandle() {
    this.handleEvent = function (event) {

        gestionPresupuesto.borrarGasto(this.gasto.id); //borrar gasto
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function(event){

        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}


//edita cada gasto tras acción del botón editar de cada gasto
function EditarHandle() {

    this.handleEvent = function(event){

        //pedir al usuario datos del gasto
        let Descripcion = prompt('Introduce la descripción del gasto: ');
        let valueGasto = parseFloat(prompt('Introduce el valor correspondiente al gasto: '));
        let fechaGato = prompt('Introduce la fecha del gasto en formato yyyy-mm-dd: ');
        let EtiquetaGasto = prompt('Escribe la etiqueta del gasto separado por ,: ');
        let etiquetasGasto = EtiquetaGasto.split(',');
        
        this.gasto.actualizarValor(valueGasto);
        this.gasto.actualizarDescripcion(Descripcion);
        this.gasto.actualizarFecha(fechaGato);
        this.gasto.anyadirEtiquetas(...etiquetasGasto);
        
        repintar();
    }
}


//se encarga de cargar la plantilla, modificarla y añadirla a la página
function nuevoGastoWebFormulario() { 
    
    // Clona el contenido de la plantilla para reutilizarlo múltiples veces
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form"); //Accede al elemento <form>
    
    //crear y asociar manejadores de eventos a los botones Enviar y Cancelar
    let controlPrincipal = document.querySelector("#controlesprincipales");
    controlPrincipal.append(formulario);

    document.getElementById("anyadirgasto-formulario").disabled = true;

    //botón enviar
    let Submit = new FormSubmitHandle();
    formulario.addEventListener("submit",Submit);
    //botón cancelar
    let btnCancelar = formulario.querySelector("button.cancelar");
    let EventCancel = new cancelFormHandle();
    btnCancelar.addEventListener('click', EventCancel); //al hacer clic en el boton cancelar
}


function EditarHandleFormulario() {
    this.handleEvent = function (event) {

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
      let enviarForm = new ActualizarDatos();
      enviarForm.gasto = this.gasto;
      formulario.addEventListener('submit', enviarForm);

      //Boton Cancelar
      let cancelarForm = new cancelFormHandle();
      let botonCancelarFormulario = formulario.querySelector("button.cancelar");
      botonCancelarFormulario.addEventListener('click', cancelarForm);
    }
}

//función al hacer click en "enviar" formulario
function FormSubmitHandle() {
    this.handleEvent = function(event){ //manejador que esccuha el evento
    
    event.preventDefault(); 
    let Accederformulario = event.currentTarget; //llama al fomulario, objeto llamante de los elementos del formulario
    
    let descipcion = Accederformulario.elements.descripcion.value //elemento más nombre del imput
    let valor = parseFloat(Accederformulario.elements.valor.value);
    let date = Accederformulario.elements.fecha.value;
    let etiq = Accederformulario.elements.etiquetas.value;
    
    let newGasto = new gestionPresupuesto.CrearGasto(descipcion,valor,date,etiq);
    gestionPresupuesto.anyadirGasto(newGasto);
    repintar();
    document.getElementById("anyadirgasto-formulario").disabled = false;
    }
}
//Actualizar boton enviar
function ActualizarDatos() {
    this.handleEvent = function(event) 
    {
        event.preventDefault();
        let Accederformulario = event.currentTarget;

        let descipcion = Accederformulario.elements.descripcion.value //elemento más nombre del imput
        this.gasto.actualizarDescripcion(descipcion);

        let valor = parseFloat(Accederformulario.elements.valor.value);
        this.gasto.actualizarValor(valor);

        let date = Accederformulario.elements.fecha.value;
        this.gasto.actualizarFecha(date);

        let etiq = Accederformulario.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(etiq);

        repintar();
    }
}
//botón cancelar
function cancelFormHandle() {
    this.handleEvent = function (e){
        e.currentTarget.parentNode.remove();
        document.getElementById("anyadirgasto-formulario").disabled = false;
        repintar();
    }
}
//botones
let btnActualizarPres = document.getElementById("actualizarpresupuesto"); 
let btnAnyadirgasto = document.getElementById("anyadirgasto");
const anyadirgastoFirmulario = document.getElementById("anyadirgasto-formulario");
//Eventos
btnActualizarPres.addEventListener('click',actualizarPresupuestoWeb); 
btnAnyadirgasto.addEventListener('click',nuevoGastoWeb);
anyadirgastoFirmulario.addEventListener('click',nuevoGastoWebFormulario);

//recoje los datos del formulario de filtrado y actualiza la lista de listado-gastos-completo
function filtrarGastosWeb() {
    this.handleEvent = function (event) {
        
        event.preventDefault();

        let formularioFiltrado = event.currentTarget;
        let desc = formularioFiltrado["formulario-filtrado-descripcion"].value;
        let valorMinimo = formularioFiltrado["formulario-filtrado-valor-minimo"].value;
        let valorMaximo = formularioFiltrado["formulario-filtrado-valor-maximo"].value;
        let fechInicial = formularioFiltrado["formulario-filtrado-fecha-desde"].value;
        let fechFinal = formularioFiltrado["formulario-filtrado-fecha-hasta"].value;
        let Etiquetas = formularioFiltrado["formulario-filtrado-etiquetas-tiene"].value;

        
        
        Etiquetas = gestionPresupuesto.transformarListadoEtiquetas(Etiquetas);
        
        let Obj = {
            fechaDesde: (fechInicial === "") ? undefined : fechInicial,
            fechaHasta: (fechFinal === "") ? undefined : fechFinal,
            valorMinimo: (valorMinimo === "") ? undefined : parseFloat(valorMinimo),
            valorMaximo: (valorMaximo === "") ? undefined : parseFloat(valorMaximo),
            descripcionContiene: (desc === "") ? undefined : desc,
            etiquetasTiene: (Etiquetas === "") ? undefined : Etiquetas
        }
        
        let gastosFiltrado = gestionPresupuesto.filtrarGastos(Obj);
        
        let listarGasto = document.getElementById("listado-gastos-completo");
        listarGasto.innerHTML = "";

        for (let gastico of gastosFiltrado) { //muestro el listado pro cada gasto filtrado
            mostrarGastoWeb("listado-gastos-completo",gastico); //al ser una lista tiene que recorrer un array
        }
    }
}
//boton enviar de FiltrarGastoWeb
let btnEditarFormulario = document.getElementById("formulario-filtrado");
let eventoFiltrarGasto = new filtrarGastosWeb();
btnEditarFormulario.addEventListener('submit',eventoFiltrarGasto);

function GuardarGastosWeb() {
    this.handleEvent = function(event) {
        localStorage.GestorGastosDWEC = JSON.stringify(gestionPresupuesto.listarGastos());
    }
}
//boton
let evetGuardarGastosWeb = new GuardarGastosWeb();
let btnGatosGuardados = document.getElementById("guardar-gastos");
btnGatosGuardados.addEventListener('click',evetGuardarGastosWeb);

//carga el listado de gastos
function CargarGastosWeb(){
    this.handleEvent = function(e) {
        let listarGasto = localStorage.GestorGastosDWEC; 
        if(listarGasto == null){
            gestionPresupuesto.cargarGastos([]);
        }
        else{
            gestionPresupuesto.cargarGastos(JSON.parse(localStorage.GestorGastosDWEC));
        }
        repintar();
    }
}
//boton
let cargarGastos = new CargarGastosWeb();
let btnCargarGastos = document.getElementById("cargar-gastos");
btnCargarGastos.addEventListener('click',cargarGastos);

async function cargarGastosApi() {
    let nombreUser = document.querySelector("#nombre_usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUser}`;
    try{
        if(nombreUser.ok)
        {
            await fetch(url, {method: 'GET'})
                .then(respusta => respusta.json())
                .then(resultado => {

                    if(resultado.ok)
                    {
                        gestionPresupuesto.cargarGastos(resp);
                        repintar();
                    }
                    else{
                        alert("Error-HTTP: "+response.status)
                    }
                });
        }
        else{
            alert("Error-HTTP: "+response.status);
        }
    }
    catch{
        alert("Error-HTTP: "+response.status);
    }
}
let btnCargarGastosApi = document.getElementById("cargar-gastos-api");
btnCargarGastosApi.addEventListener("click",cargarGastosApi());

function BorrarGastoApiHandle() {
    this.handleEvent = function(e){
        let UserName = document.querySelector("#nombre_usuario");
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${UserName}`;
        
        await fetch(url, {method:'DELETE'})
        .then(responde => responde.json())
        .then(respuesta => {
            if(respuesta.ok){
                gestionPresupuesto.cargarGastosApi();
            }
            else{
                alert("Error-HTTP: "+response.status);
            }
        })
    };
}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb    
}
/*
    event.preventDefault() --> permite que no se recarge la página, es decir que no se envién datos al servidor
    removeAttribute(); //deshabilitar el botón de envío
    event.currentTarget -> permite acceder a todos los elementos de un fomulario en este caso
    element -> hace referencia al nombre del elemento que se va a seleccionar
    value -> saca el valor introducido en el elemento
    JSON.stringify -> Convierte objetos en string
    JSON.parse -> Convierte un string en un objeto
    localStorage.getItem -> obtiene en forma de string el objeto
    response.text() – lee y devuelve la respuesta en formato texto,
    response.json() – convierte la respuesta como un JSON,
    response.formData() – devuelve la respuesta como un objeto FormData (explicado en el siguiente capítulo),
    response.blob() – devuelve la respuesta como Blob (datos binarios tipados),
    response.arrayBuffer() – devuelve la respuesta como un objeto ArrayBuffer (representación binaria de datos de bajo nivel),
    Adicionalmente, response.body es un objeto ReadableStream, el cual nos permite acceder al cuerpo como si fuera un stream 
    y leerlo por partes. Veremos un ejemplo de esto más adelante.
*/
