'use strict';
import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId( idElemento, valor ){
    let mostrarGasto = document.getElementById(idElemento);
    mostrarGasto.innerHTML = `${valor}`;
}


document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);
document.getElementById("cargar-gastos-api").addEventListener("click", cargarGastosApi);

let filtradoGW = new filtrarGastosWeb(); 
document.getElementById("formulario-filtrado").addEventListener("submit", filtradoGW);

let guardarGW = new guardarGastosWeb();
document.getElementById("guardar-gastos").addEventListener("click", guardarGW);

let cargarGW = new cargarGastosWeb();
document.getElementById("cargar-gastos").addEventListener("click", cargarGW);

function actualizarPresupuestoWeb() {

    let presupuestoString = prompt('Introduzca un presupuesto');
    let presupuestoNumber = parseInt(presupuestoString);

    gestionPresupuesto.actualizarPresupuesto(presupuestoNumber);
    repintar();
}

function nuevoGastoWeb() {

    let desc = prompt("Introduce una descripción");
    let valorString = prompt("Introduce un valor");
    let fecha = prompt("Introduce una fecha");
    let etiquetaString = prompt("Introduce una/s etiqueta/s");
    let valorNumber = parseFloat(valorString);
    let arrayEtiquetas = etiquetaString.split(', ');
    let gasto = new gestionPresupuesto.CrearGasto( desc, valorNumber, fecha, arrayEtiquetas );
    gestionPresupuesto.anyadirGasto(gasto);

    repintar();
}

function nuevoGastoWebFormulario(){

    let template = document.getElementById("formulario-template").content.cloneNode(true);

    let form = template.querySelector("form");

    let formTemplate = document.getElementById("controlesprincipales");
    formTemplate.append(form);

        let botonanyadirform = document.getElementById("anyadirgasto-formulario");
        botonanyadirform.disabled = true;

        let AnyadirGastoHandle = new AnyadirGastoHandleForm();
        form.addEventListener("submit", AnyadirGastoHandle);

        let eventoCancelar = new cancelarHandleForm();        
        let btnCancelar = form.querySelector("button.cancelar");
        btnCancelar.addEventListener("click", eventoCancelar);

        let btnenviarApi = form.querySelector("button.gasto-enviar-api");
        btnenviarApi.addEventListener("click", enviarHandlerGastoApi);

    repintar();
}

function mostrarGastoWeb( idElemento, gasto ){

    let body = document.getElementById(idElemento);
    
        let divGasto = document.createElement('div');
        divGasto.className = "gasto";

            let divDescripcion = document.createElement('div');
            divDescripcion.className = "gasto-descripcion";
            divDescripcion.innerHTML = `${gasto.descripcion}`;

            let divFecha = document.createElement('div');
            divFecha.className = "gasto-fecha";
            divFecha.innerHTML = `${gasto.fecha}`;
            let divValor = document.createElement('div');
            divValor.className = "gasto-valor";
            divValor.innerHTML = `${gasto.valor}`;
            let divEtiquetas = document.createElement('div');
            divEtiquetas.className = "gasto-etiquetas";

        divGasto.append(divDescripcion);
        divGasto.append(divFecha);
        divGasto.append(divValor);
        divGasto.append(divEtiquetas);

    for (let e of gasto.etiquetas) {

        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";

        spanEtiqueta.innerHTML = `${e}`;     
           
        divEtiquetas.append(spanEtiqueta);
        let evBorrarEti = new BorrarEtiquetasHandle();
        evBorrarEti.gasto = gasto;
        evBorrarEti.etiqueta = e;

        spanEtiqueta.addEventListener('click', evBorrarEti);
    }

        let botonEditar = document.createElement('button');        
        botonEditar.className = "gasto-editar";
        botonEditar.id = "gasto-editar";
        botonEditar.type = "button";
        botonEditar.innerHTML = "Editar gasto";

        let evEditar = new EditarHandle();
        evEditar.gasto = gasto;
        botonEditar.addEventListener("click", evEditar);
        divGasto.append(botonEditar);

        let botonBorrar = document.createElement('button');
        botonBorrar.className = "gasto-borrar";
        botonBorrar.id = "gasto-borrar";
        botonBorrar.type = "button";
        botonBorrar.innerHTML = "Borrar gasto";

        let evBorrar = new BorrarHandle();
        evBorrar.gasto = gasto;
        botonBorrar.addEventListener("click", evBorrar);

        divGasto.append(botonBorrar);

        let botonBorrarAPI = document.createElement("button");
        botonBorrarAPI.type ="button";
        botonBorrarAPI.className = "gasto-borrar-api";
        botonBorrarAPI.textContent = "Borrar (API)";

        let evBorrarAPI = new BorrarHandleAPI();
        evBorrarAPI.gasto = gasto;
        botonBorrarAPI.addEventListener("click", evBorrarAPI);
        divGasto.append(botonBorrarAPI);

        let botonEditarForm = document.createElement("button");
        botonEditarForm.type ="button";
        botonEditarForm.className = "gasto-editar-formulario";
        botonEditarForm.textContent = "Editar (formulario)";

        let evEditarForm = new EditarHandleForm();
        evEditarForm.gasto = gasto;
        botonEditarForm.addEventListener("click", evEditarForm);
        divGasto.append(botonEditarForm);
    body.append(divGasto);
}


function AnyadirGastoHandleForm(){
    this.handleEvent = function(e){

        e.preventDefault();

        let actual = e.currentTarget;

        let newDesc = actual.elements.descripcion.value;
        let newValor = actual.elements.valor.value;
        let newFecha = actual.elements.fecha.value;
        let newEtiquetas = actual.elements.etiquetas.value;

        newValor = parseFloat(newValor);

        newEtiquetas = newEtiquetas.split(',');

        let gasto = new gestionPresupuesto.CrearGasto(newDesc, newValor, newFecha, newEtiquetas);
        gestionPresupuesto.anyadirGasto(gasto);

        let anyadirGasto = document.getElementById("anyadirgasto-formulario");
        anyadirGasto.disabled = false;

        repintar();
    }
}

function cancelarHandleForm(){
    this.handleEvent = function(event){

        event.currentTarget.parentNode.remove();
        document.getElementById("anyadirgasto-formulario").disabled = false;

        repintar();
    }
}

function SubmitEditarHandleForm(){

    this.handleEvent = function(event){
        
        event.preventDefault();

        let form = event.currentTarget;
        let ndescripcion = form.elements.descripcion.value;
        let nvalor = form.elements.valor.value;
        let nfecha =  form.elements.fecha.value;
        let netiquetas = form.elements.etiquetas.value;

        nvalor = parseFloat(nvalor);
        let netiquetasArray = netiquetas.split(',');

        this.gasto.actualizarDescripcion(ndescripcion);
        this.gasto.actualizarValor(nvalor);
        this.gasto.actualizarFecha(nfecha);
        this.gasto.anyadirEtiquetas(...netiquetasArray);
        repintar();
    }
}

function EditarHandleForm(){
    this.handleEvent = function(event){

        let plantillaForm = document.getElementById('formulario-template').content.cloneNode(true);

        let form = plantillaForm.querySelector('form');

        event.currentTarget.after(form);
        let botonEditar = event.currentTarget;
        botonEditar.disabled = true;

        form.elements.descripcion.value = this.gasto.descripcion;
        form.elements.valor.value = this.gasto.valor;
        form.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        form.elements.etiquetas.value = this.gasto.etiquetas;

        let Submit = new SubmitEditarHandleForm();
        Submit.gasto = this.gasto;
        form.addEventListener('submit', Submit);
        let eventoCancelar = new cancelarHandleForm(); 
        let btnCancelar = form.querySelector("button.cancelar");
        btnCancelar.addEventListener("click", eventoCancelar);
        let editarFormApi = form.querySelector("button.gasto-enviar-api");
        editarFormApi.gasto = this.gasto;
        editarFormApi.addEventListener("click", handleEnviarEditarAPI);
    }
}

function EditarHandle(){
    this.handleEvent = function(e){

       let desc = prompt("Introduce una descripción", this.gasto.descripcion);
       let valor = prompt("Introduce un valor", this.gasto.valor);
       let fecha = prompt("Introduce una fecha", this.gasto.fecha);
       let etiq = prompt("Introduce una/s etiqueta/s", this.gasto.etiquetas);

       valor = parseFloat(valor);

       etiq = etiq.split(',');

       this.gasto.actualizarDescripcion(desc);
       this.gasto.actualizarValor(valor);
       this.gasto.actualizarFecha(fecha);
       this.gasto.anyadirEtiquetas(...etiq);

       repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function(e){

        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(e){

        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function repintar() {

    mostrarDatoEnId( "presupuesto", gestionPresupuesto.mostrarPresupuesto() );
    mostrarDatoEnId( "gastos-totales", gestionPresupuesto.calcularTotalGastos() );
    mostrarDatoEnId( "balance-total", gestionPresupuesto.calcularBalance() );

    document.getElementById("listado-gastos-completo").innerHTML = ``;

    let gastos = gestionPresupuesto.listarGastos();

    for ( let gasto of gastos ){
        mostrarGastoWeb( "listado-gastos-completo", gasto );
    }

    let periodoDia = "dia";
    let gastosDia = gestionPresupuesto.agruparGastos(periodoDia);
    mostrarGastosAgrupadosWeb("agrupacion-dia", gastosDia, "día");

    let periodoMes = "mes";
    let gastosMes = gestionPresupuesto.agruparGastos(periodoMes);
    mostrarGastosAgrupadosWeb("agrupacion-mes", gastosMes, "mes");

    let periodoAnyo = "anyo";
    let gastosAnyo = gestionPresupuesto.agruparGastos(periodoAnyo);
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAnyo, "año");
}

function mostrarGastosAgrupadosWeb( idElemento, agrup, periodo ){
    var divP = document.getElementById(idElemento);
    divP.innerHTML = "";
        
       let arrayAgrupacion = "";

        for( let [nombre, valor] of Object.entries( agrup ) ){
            arrayAgrupacion += `
                <div class="agrupacion-dato">
                    <span class="agrupacion-dato-clave">${nombre}</span>
                    <span class="agrupacion-dato-valor">${valor}</span>
                </div>
            `;
        }

        divP.innerHTML = `
            <div class="agrupacion">
                <h1>Gastos agrupados por ${periodo}</h1>
                ${arrayAgrupacion}
            </div>
        `;

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
                    data: agrup
                }
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: unit
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    divP.append(chart);
}

function filtrarGastosWeb(){
    this.handleEvent = function(e)
    {
        e.preventDefault();
        let form = e.currentTarget;

        let descripcion = form.elements['formulario-filtrado-descripcion'].value;
        let valorMinimo = form.elements['formulario-filtrado-valor-minimo'].value;
        let valorMaximo = form.elements['formulario-filtrado-valor-maximo'].value;
        let fechaDesde = form.elements['formulario-filtrado-fecha-desde'].value;
        let fechaHasta = form.elements['formulario-filtrado-fecha-hasta'].value;
        let etiquetas = form.elements['formulario-filtrado-etiquetas-tiene'].value;

        valorMinimo = parseFloat(valorMinimo);
        valorMaximo = parseFloat(valorMaximo);

        if( etiquetas != null ){
            etiquetas = gestionPresupuesto.transformarListadoEtiquetas ( etiquetas );
        }

        let gastosFiltro = gestionPresupuesto.filtrarGastos({
            etiquetasTiene: etiquetas,
            fechaDesde: fechaDesde,
            fechaHasta: fechaHasta,
            valorMinimo: valorMinimo,
            valorMaximo: valorMaximo,
            descripcionContiene: descripcion,
        });

        let lista = document.getElementById('listado-gastos-completo');
        lista.innerHTML = '';

        for(let gasto of gastosFiltro){
            mostrarGastoWeb("listado-gastos-completo", gasto);
        }
    }
}

function guardarGastosWeb(){ 
    this.handleEvent = function(e){

        localStorage.GestorGastosDWEC = JSON.stringify(gestionPresupuesto.listarGastos());
    }
}    

function cargarGastosWeb(){

    this.handleEvent = function(e){

        let cargarGastos = JSON.parse(localStorage.getItem("GestorGastosDWEC"));
        if( !cargarGastos )
        {
            gestionPresupuesto.cargarGastos([]);
        }
        else {
            gestionPresupuesto.cargarGastos( cargarGastos );
        }
       repintar();
    }
}

async function cargarGastosApi(){
    
    let usuario = document.getElementById('nombre_usuario').value;
    let url = 'https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/' + usuario;
    try 
    {
        let datos = await fetch(url);

        if( datos.ok ){
            let json = await datos.json();            
            gestionPresupuesto.cargarGastos(json);

            repintar()
        }
        else {
            alert("Error-HTTP: "+ datos.status);
        }
    }  
    catch(e) {
        console.log(e);
    }
}

function BorrarHandleAPI(){
    this.handleEvent = async function(e){

        let usuario = document.getElementById('nombre_usuario').value;

        let url = 'https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/' + usuario + `/${this.gasto.gastoId}`;

        fetch( url, {
            method: "DELETE"
        })
        .then( Response => {
            if( Response ){
                cargarGastosApi();
            }
        })
    }
}

function enviarHandlerGastoApi(event){

    let usuario = document.getElementById("nombre_usuario").value;

    let url = 'https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/' + usuario;

        let form = event.currentTarget.form;
        let descripcion = form.elements.descripcion.value;
        let valor = form.elements.valor.value;
        let fecha = form.elements.fecha.value;
        let etiquetas = form.elements.etiquetas.value;    

        valor = parseFloat(valor);

        let arrayetiquetas = etiquetas.split(",");

        let gastoAPI = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...arrayetiquetas);

    fetch( url, {
        method: 'POST', 
        body: JSON.stringify(gastoAPI),
        headers:{'Content-Type': 'application/json'}
    })
    .then( Response => {
        if( Response ){
            cargarGastosApi();
        }
        else{
            alert("Error al actualizar los gastos");
        }
    })
}

function handleEnviarEditarAPI(event){
    
    let usuario = document.getElementById("nombre_usuario").value;

    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

        let form = event.currentTarget.form;

        let descripcion = form.elements.descripcion.value;
        let valor = form.elements.valor.value;
        let fecha = form.elements.fecha.value;
        let etiquetas = form.elements.etiquetas.value;    

        valor = parseFloat(valor);

        let arrayetiquetas = etiquetas.split(",");

        let gastoAPI = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...arrayetiquetas);

    fetch( url, {
        method: 'PUT', 
        body: JSON.stringify(gastoAPI),
        headers:{'Content-Type': 'application/json'}
    })
    .then( Response => {
        if( Response ){
            cargarGastosApi();
        }
        else{
            alert("Error al actualizar los gastos");
        }
    })
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    nuevoGastoWebFormulario,
    filtrarGastosWeb,
    EditarFormularioHandler,
    guardarGastosWeb,
    cargarGastosWeb,

}