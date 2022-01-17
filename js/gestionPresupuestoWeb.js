import * as gestionPresupuesto from './gestionPresupuesto.js';
'use strict'

// FUNCIONES -------------------------------------------------------------------------------------------- 
function mostrarDatoEnId(idElemento, valor) {

    let elem = document.getElementById(idElemento);
    let p = document.createElement('p');
    p.textContent = valor; // para modificar parte del texto del Dom, no meter codigo html nuevo
    elem.append(p); // añade un hijo al elemento que han pasado por ID
}

function mostrarGastoWeb(idElemento,gasto) { 
    let elemento = document.getElementById(idElemento);
    
    // creación elemento <div class="gasto">
    let divGasto = document.createElement('div');
    divGasto.className += 'gasto';
    elemento.append(divGasto);

    // <div class="gasto-descripcion">
    let divGastoDesc = document.createElement('div');
    divGastoDesc.className += 'gasto-descripcion';
    divGastoDesc.textContent += gasto.descripcion;
    divGasto.append(divGastoDesc);

    // <div class="gasto-fecha"
    let divGastoFecha = document.createElement('div');
    divGastoFecha.className = 'gasto-fecha';
    divGastoFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.append(divGastoFecha);

    // <div class="gasto-valor">
    let divGastoValor = document.createElement('div');
    divGastoValor.className = 'gasto-valor';
    divGastoValor.textContent = gasto.valor + "";
    divGasto.append(divGastoValor);

    // <div class="gasto-etiquetas">
    let divGastoEtiq = document.createElement('div');
    divGastoEtiq.className = 'gasto-etiquetas';

    for (let eti of gasto.etiquetas){
        let span = document.createElement('span');
            span.className = "gasto-etiquetas-etiqueta";
            span.textContent = eti + " ";

        //Creación de la etiqueta + Creación del objeto para Borrar Etiquetas
        if(idElemento=="listado-gastos-completo"){
            let borraEt = new BorrarEtiquetasHandle();
            borraEt.gasto = gasto;
            borraEt.etiqueta = eti;
            span.addEventListener("click",borraEt);
        }
        divGastoEtiq.append(span);
    }
    divGasto.append(divGastoEtiq);

    if (!idElemento.includes('filtrado')){
        // Botón Editar Gasto ------------------------------------------------------------------------------
        let btnEditar = document.createElement('button');
        btnEditar.type = 'button';
        btnEditar.className = 'gasto-editar';
        btnEditar.textContent = 'Editar';

        let editar = new EditarHandle();
        editar.gasto = gasto;
        btnEditar.addEventListener('click', editar);
        divGasto.append(btnEditar);

        //Botón Borrar ---------------------------------------------------------------------------------------
        let btnBorrar = document.createElement('button');
        btnBorrar.type = 'button';
        btnBorrar.className += 'gasto-borrar';
        btnBorrar.textContent = "Borrar";

        let borrar = new BorrarHandle();
        borrar.gasto = gasto;
        btnBorrar.addEventListener('click', borrar);
        divGasto.append(btnBorrar);

        // Botón EditarFormulario ----------------------------------------------------------------------------
        let btnEditarForm = document.createElement('button');
        btnEditarForm.type = 'button';
        btnEditarForm.className += 'gasto-editar-formulario';
        btnEditarForm.textContent = 'Editar (formulario)';

        let editarForm = new EditarHandleformulario();
        editarForm.gasto = gasto;
        btnEditarForm.addEventListener('click', editarForm);
        divGasto.append(btnEditarForm);
    }
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo) {  // agrup = { "2021-09": 5, "2021-10": 39}

    let textoHTML =                                                         
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>`;

    for (let propiedad in agrup) {
        textoHTML +=`<div class="agrupacion-dato">
                        <span class="agrupacion-dato-clave">${propiedad}</span>
                        <span class="agrupacion-dato-valor">${agrup[propiedad]}</span>
                    </div>`;
    }
    textoHTML += "</div>"
    document.getElementById(idElemento).innerHTML = textoHTML;
}

function repintar() {
    // Mostrar presupuesto
    document.getElementById('presupuesto').innerHTML = " ";
    mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto());
    // Mostrar gastos totales
    document.getElementById('gastos-totales').innerHTML = " ";
    mostrarDatoEnId('gastos-totales',gestionPresupuesto.calcularTotalGastos().toFixed(2));
    // Mostrar balance total
    document.getElementById('balance-total').innerHTML = " ";
    mostrarDatoEnId('balance-total',gestionPresupuesto.calcularBalance().toFixed(2));
    // Borrar el contenito de #listado-gastos-completo
    document.getElementById('listado-gastos-completo').innerHTML = " ";
    // Mostrar listado de gastos
    for (let list of gestionPresupuesto.listarGastos()) {
        mostrarGastoWeb("listado-gastos-completo",list);
    }
}

// FUNCIONES MANEJADORAS DE EVENTOS ----------------------------------------------------------------------

//función manejadora de evento click de #actualizarpresupuesto
function actualizarPresupuestoWeb(){
    let nuevoPre = parseFloat(prompt("Introduce un nuevo presupuesto"));
    gestionPresupuesto.actualizarPresupuesto(nuevoPre);
    
    repintar();
}
// manejadora del evento click del boton #anyadirgasto
function nuevoGastoWeb() {
    
    /* Pedir al usuario la información necesaria para crear un nuevo gasto mediante 
    sucesivas preguntas con prompt (por orden: descripción, valor, fecha y etiquetas). */
    
    //Descirpción del gasto.
    let gastoDesc = prompt('Introduce la descripción del gasto :');
    
    //Convertir el valor a número (recuerda que prompt siempre devuelve un string).
    let gastoValor = parseFloat(prompt('Introduce el valor del gasto :'));
    
    //Fecha del gasto.
    let gastoFecha =Date.parse(prompt('Introduce la fecha del gasto :'));
    
    //Etiquetas del gasto.
    let gastoEtiquetas = prompt('Introduce las etiquetas del gasto separadas por comas :');
    //Convertimos la cadena de texto con las etiquetas a un array para poder pasárselo a la función constructora crearGasto.
    let arrayEtiquetas = gastoEtiquetas.split(',');
    
    //Crear un nuevo gasto (función crearGasto). ¡Ojo con la manera de pasar el parámetro ~etiquetas~!
    let gastoWeb = new gestionPresupuesto.CrearGasto(gastoDesc,gastoValor,gastoFecha,arrayEtiquetas);
    
    //Añadir el gasto a la lista (función anyadirGasto).
    gestionPresupuesto.anyadirGasto(gastoWeb);
    
    //Llamar a la función repintar para que se muestre la lista con el nuevo gasto.
    repintar();
}

// evento del botón #anyadirgasto-formulario
function nuevoGastoWebFormulario() {
    //Copia del formulario/template
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
                                /* Node.cloneNode() ==> método que devuelve una copia del nodo que lo llama, en este caso el
                                    <div id='formulario-template'>
                                */
    // variable con el formulario -- acceso al <form> dentro de ese fragmento de documento
    var formulario = plantillaFormulario.querySelector("form");
    // inserción en el DOM
    let divControlesPrincipales = document.getElementById("controlesprincipales")
    divControlesPrincipales.appendChild(formulario);
    // deshabilitar el botón para que  no siga haciendo formularios
    let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");
    
    // Botones del formulario
    //botón submit
    let enviarObj = new EnviarGastoFormHandle();
    formulario.addEventListener('submit', enviarObj); // el botón de tipo submit (type="submit") recoge la acción submit, no click
    //botón cancelar
    let cancelarObj = new CancelarFormHandle();
    // localizar el botón en el documento
    let btnCancelar = formulario.querySelector("button.cancelar");  // selecciona <button class="cancelar"> 
    btnCancelar.addEventListener("click", cancelarObj);
}

function EditarHandle() {   // Botón Editar del GASTO
    this.handleEvent = function (event){
        let descripcion = prompt("Escribe la nueva descripción del gasto");
        let valor1 = parseFloat(prompt("Escribe la nueva valor del gasto"));
        let fecha = prompt("Escribe la fecha del gasto en formato yyyy-mm-dd");
        let etiquetas = prompt("Escribe las etiquetas del gasto separadas por ,");
        let etiquetasArray = etiquetas.split(',');
        this.gasto.actualizarValor(valor1);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetasArray);
        repintar();
    }
}
function BorrarHandle() {  // Botón Borrar del GASTO
    this.handleEvent = function (event){
      let number = this.gasto.id;
      gestionPresupuesto.borrarGasto(number);
      repintar();
    }
}
function EditarHandleformulario() { //Manejador del evento Editar(formulario)
    this.handleEvent = function (event){

        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
        var formulario = plantillaFormulario.querySelector("form");
        //En el enunciado pone que se ponga al final el añadir el formulario, pero si lo haces así explota
        //por ello primero selecciono el nodo y después adjunto el formulario al DOM.
        let divControlesPrincipales = document.getElementById("controlesprincipales")
        divControlesPrincipales.appendChild(formulario);
        //Recogemos el nodo que ha pedido el evento
        let btnEditarFormulario = event.currentTarget;
        btnEditarFormulario.appendChild(formulario);
        formulario.elements.descripcion.value  = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        //Evento para el submit del formulario
        let EditarFormHandle1 = new EnviarHandle();  /* Aquí me falla el EnviarHandle()  */ 
        EditarFormHandle1.gasto = this.gasto;
        formulario.addEventListener('submit', EditarFormHandle1);
        //botón cancelar
        let btnCancelar = formulario.querySelector("button.cancelar");
        let cancelarObj = new CancelarFormHandle();
        btnCancelar.addEventListener("click", cancelarObj);

        //Desactivar -añadir atributo disabled- al botón anyadirgasto-formulario
        btnEditarFormulario.setAttribute("disabled", "");
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
            filtro.etiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(etiTiene);
        }
        filtro.fechaDesde = fecDes;
        filtro.fechaHasta = fecHas;
        filtro.valorMinimo = vMin;
        filtro.valorMaximo = vMax;
        filtro.descripcionContiene = des;

        document.getElementById("listado-gastos-completo").innerHTML="";
        let objsFiltrGastos = gestionPresupuesto.filtrarGastos(filtro);

        for (let gasto of objsFiltrGastos){
            mostrarGastoWeb('listado-gastos-completo', gasto);
        }
    }
}
document.getElementById('formulario-filtrado').addEventListener('submit', new filtrarGastosWeb());

function BorrarEtiquetasHandle() { 
    this.handleEvent = function (event){
    this.gasto.borrarEtiquetas(this.etiqueta);
    repintar();
   }
}
//Este handle actualizará los valores del gasto que nosotros estemos manejando
function EnviarHandle(){
    this.handleEvent = function(event){
        //Evitamos que se haga el submit
        event.preventDefault();
        //Recogemos el evento que ha realizado el evento y actualizamos los valores del gasto
        let formulario = event.currentTarget;
        let descripcion = formulario.elements.descripcion.value;
        this.gasto.actualizarDescripcion(descripcion);
        let valor = parseFloat(formulario.elements.valor.value);
        this.gasto.actualizarValor(valor);
        let fecha = formulario.elements.fecha.value;
        this.gasto.actualizarFecha(fecha);
        let etiquetas = formulario.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(etiquetas);
        repintar();
    }
}
// Manejador del evento 'submit' de añadir gasto con formulario
function EnviarGastoFormHandle(){
    this.handleEvent = function(event){
        //Evitamos que se haga el submit (comportamiento por defecto)
        event.preventDefault();
        // crear nuevo gasto con los valores del form
        // la función manejadora tiene acceso al evento, que a su vez tiene acceso al elemento que lo ha provocado (formulario)
        //  desde 'event.currentTarget'.
        let formulario = event.currentTarget;
        let descripcion = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value;
        // añadir el gasto a la lista de gastos
        let gastoNuevo = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas);
        gestionPresupuesto.anyadirGasto(gastoNuevo);
        // llamar a repintar
        repintar();
        // activar el botón
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}

//Manejador del evento cancelar del formulario
function CancelarFormHandle() {
    this.handleEvent = function (event){
        //recoge el padre del botón cancelar -el formulario- y lo borra
        event.currentTarget.parentNode.remove(); // -->parentNode es el padre del nodo actual.
        // habilitar el botón añadirgasto-form
        let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
        repintar();
    }
}

function guardarGastosWeb() {
    this.handleEvent = function(event) {
    // Se encargará de guardar el listado de gastos (disponible en la función listarGastos del paquete js/gestionPresupuesto.js
        let listadoGastos = gestionPresupuesto.listarGastos();
    //  en la clave de almacenamiento de localstorage denominada GestorGastosDWEC. Ten en cuenta que solo se pueden almacenar strings.
        localStorage.GestorGastosDWEC = JSON.stringify(listadoGastos);
    }
}

function cargarGastosWeb() {
    this.handleEvent = function(event) {
    // Se encargará de cargar el listado de gastos (función cargarGastos del paquete js/gestionPresupuesto.js) 
    // desde la clave de almacenamiento de localstorage denominada GestorGastosDWEC. 
    // Si no existe la clave en el almacenamiento, llamará a cargarGastos con un array vacío
        if (localStorage.GestorGastosDWEC == null) 
            gestionPresupuesto.cargarGastos([]);
        else 
            gestionPresupuesto.cargarGastos(JSON.parse(localStorage.GestorGastosDWEC));

        // Una vez cargados los gastos deberá llamar a la función repintar para que se muestren correctamente en el HTML.
        repintar();    
    }
}

function cargarGastosApi() {
    this.handleEvent = function(event) {

    }
}

//_________________________________________________________________________________________________//


//Botones Principales
let btnActualizar = document.getElementById('actualizarpresupuesto');
let btnAnyadirgasto = document.getElementById('anyadirgasto');
let anyadirgastoFormulario = document.getElementById("anyadirgasto-formulario");
// let formularioFiltrador = document.getElementById("formulario-filtrado");
let btnGuardarGastos = document.getElementById("guardar-gastos");
let btnCargarGastos = document.getElementById("cargar-gastos");
let btnCargarGastosApi = document.getElementById('cargar-gastos-api');


//Eventos de los botones principales
btnActualizar.addEventListener('click', actualizarPresupuestoWeb);
btnAnyadirgasto.addEventListener('click', nuevoGastoWeb);
anyadirgastoFormulario.addEventListener('click', nuevoGastoWebFormulario);
// anyadirgastoFormulario.onclick=nuevoGastoWebFormulario;  hacen lo mismo

/* let filtGastForm = new filtrarGastosWeb();
formularioFiltrador.addEventListener('submit', filtGastForm); */

let objGuardarGastosWeb = new guardarGastosWeb();
btnGuardarGastos.addEventListener('click', objGuardarGastosWeb);

let objCargarGastosWeb = new cargarGastosWeb();
btnCargarGastos.addEventListener('click', objCargarGastosWeb);

let objCargarGastosApi = new cargarGastosApi();
btnCargarGastosApi.addEventListener('click', objCargarGastosApi);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    repintar,
}