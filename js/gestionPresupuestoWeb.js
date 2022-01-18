import * as metodosGastos from "./gestionPresupuesto.js"

let botonPresupuesto = document.getElementById("actualizarpresupuesto");
botonPresupuesto.onclick = actualizarPresupuestoWeb;

let botonAnyadirGasto = document.getElementById("anyadirgasto");
botonAnyadirGasto.onclick = nuevoGastoWeb;

let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
botonAnyadirGastoFormulario.addEventListener('click', nuevoGastoWebFormulario);

let botonGuardarGastos = document.getElementById("guardar-gastos");
botonGuardarGastos.addEventListener('click',new guardarGastosWeb);

let botonCargarGastos = document.getElementById("cargar-gastos");
botonCargarGastos.addEventListener('click',new cargarGastosWeb);

let botonCargarGastosApi = document.getElementById("cargar-gastos-api");
botonCargarGastosApi.onclick = cargarGastosApi;


function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML += valor;
}

function mostrarGastoWeb(idElemento, gasto){
    let elemento = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className += "gasto";

    let divGastoDesc = document.createElement("div");
    divGastoDesc.className += "gasto-descripcion";
    divGastoDesc.textContent = gasto.descripcion;

    let divGastoFecha = document.createElement("div");
    divGastoFecha.className += "gasto-fecha";
    divGastoFecha.textContent = new Date(gasto.fecha).toLocaleDateString();

    let divGastoValor = document.createElement("div");
    divGastoValor.className += "gasto-valor";
    divGastoValor.textContent = gasto.valor;

    let divGastoEtiquetas = document.createElement("div");
    divGastoEtiquetas.className += "gasto-etiquetas";


    elemento.append(divGasto);
    divGasto.append(divGastoDesc);
    divGasto.append(divGastoFecha);
    divGasto.append(divGastoValor);
    

    gasto.etiquetas.forEach(e => {
        let borrarEtiquetas = new BorrarEtiquetasHandle();
        borrarEtiquetas.gasto = gasto;
        borrarEtiquetas.etiqueta = e;

        let divEtiqueta = document.createElement("span");
        divEtiqueta.className += "gasto-etiquetas-etiqueta";
        divEtiqueta.textContent = e + " ";
        if(idElemento == "listado-gastos-completo"){
            divEtiqueta.addEventListener("click", borrarEtiquetas);
        }
        divGastoEtiquetas.append(divEtiqueta);
    });  

    divGasto.append(divGastoEtiquetas);
    let editarHandler = new EditarHandle();
    editarHandler.gasto = gasto;

    let btnEditar = document.createElement("button");
    btnEditar.className = "gasto-editar";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", editarHandler);
    
    let borrarHandler = new BorrarHandle();
    borrarHandler.gasto = gasto;

    let btnBorrar = document.createElement("button");
    btnBorrar.className = "gasto-borrar";
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", borrarHandler);

    

    let btnEditarForm = document.createElement("button");
    btnEditarForm.className = "gasto-editar-formulario";
    btnEditarForm.textContent = "Editar (formulario)";

    let editarFormHandler = new EditarHandleFormulario();
    editarFormHandler.gasto = gasto;
    editarFormHandler.elemento = divGasto;
    editarFormHandler.boton = btnEditarForm;

    btnEditarForm.addEventListener("click", editarFormHandler);

    let btnBorrarApi = document.createElement("button");
    btnBorrarApi.className = "gasto-borrar-api";
    btnBorrarApi.textContent = "Borrar (API)";

    let borrarApiHandler = new borrarGastoApi();
    borrarApiHandler.gasto = gasto;    
    btnBorrarApi.addEventListener("click", borrarApiHandler);


    if(idElemento == "listado-gastos-completo"){
        divGasto.append(btnEditar);
        divGasto.append(btnBorrar);
        divGasto.append(btnEditarForm);
        divGasto.append(btnBorrarApi);
    }
    
    
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elemento = document.getElementById(idElemento);
    let html= 
    "<div class='agrupacion'>\n" + 
    "<h1>Gastos agrupados por " + periodo + "</h1>\n";
    for(let prop in agrup){
        html += 
        "<div class='agrupacion-dato'>\n" +
        "<span class='agrupacion-dato-clave'>" + prop + "</span>\n" +
        "<span class='agrupacion-dato-valor'>" + agrup[prop] + "</span>\n"+
        "</div>\n";
    }
    html += "</div>\n";
    elemento.innerHTML += html;
    elemento.style.width = "33%";
    elemento.style.display = "inline-block";
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
        type: 'line',
        data: {
            datasets: [
                {
                    // Título de la gráfica
                    label: `Gastos por ${periodo}`,
                    // Color de fondo
                    backgroundColor: "#6ADB24",
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
elemento.append(chart);
}

function repintar(){
    document.getElementById("presupuesto").innerHTML="";
    document.getElementById("gastos-totales").innerHTML="";
    document.getElementById("balance-total").innerHTML="";
    mostrarDatoEnId("presupuesto", metodosGastos.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", metodosGastos.calcularTotalGastos());
    mostrarDatoEnId("balance-total", metodosGastos.calcularBalance());
    document.getElementById("listado-gastos-completo").innerHTML = "";
    metodosGastos.listarGastos().forEach(g => {
        mostrarGastoWeb("listado-gastos-completo", g);
    });

    document.getElementById("listado-gastos-filtrado-1").innerHTML="";
    metodosGastos.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}).forEach(gf => {
        mostrarGastoWeb("listado-gastos-filtrado-1",gf);
    });

    document.getElementById("listado-gastos-filtrado-2").innerHTML = "";
    metodosGastos.filtrarGastos({valorMinimo: 50}).forEach(gf => {
        mostrarGastoWeb("listado-gastos-filtrado-2", gf);
    });

    document.getElementById("listado-gastos-filtrado-3").innerHTML = "";
    metodosGastos.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]}).forEach(gf => {
        mostrarGastoWeb("listado-gastos-filtrado-3", gf);
    });

    document.getElementById("listado-gastos-filtrado-4").innerHTML = "";
    metodosGastos.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida" , "transporte"]}).forEach(gf => {
        mostrarGastoWeb("listado-gastos-filtrado-4", gf);
    });

    document.getElementById("agrupacion-dia").innerHTML="";
    mostrarGastosAgrupadosWeb("agrupacion-dia", metodosGastos.agruparGastos("dia"), "día");

    document.getElementById("agrupacion-mes").innerHTML = "";
    mostrarGastosAgrupadosWeb("agrupacion-mes", metodosGastos.agruparGastos("mes"), "mes");

    document.getElementById("agrupacion-anyo").innerHTML = "";
    mostrarGastosAgrupadosWeb("agrupacion-anyo", metodosGastos.agruparGastos("anyo"), "año");

}

function actualizarPresupuestoWeb(){
    let respuesta = prompt ("Introdue un nuevo presupuesto:");
    metodosGastos.actualizarPresupuesto(parseInt(respuesta));
    repintar();
}

function nuevoGastoWeb(){
    let descr = prompt("Introduce la descripción del gasto:");
    let val = prompt("Introdue el valor del gasto: ");
    let fech = prompt ("Introduce la fecha del asto (yyyy-mm-dd): ");
    let etiq = prompt ("Introduce las etiquetas del asto separadas por ',': ");
    let etiquetas = new Array();
    etiquetas = etiq.split(",");
    let gasto = new metodosGastos.CrearGasto(descr,parseFloat(val), fech, ...etiquetas);
    metodosGastos.anyadirGasto(gasto);
    repintar();
}

function nuevoGastoWebFormulario(){

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");
    let boton = document.getElementById("anyadirgasto-formulario");
    boton.disabled = true;
    document.getElementById("controlesprincipales").append(formulario);

    let anyadirGastoFromHandler = new AnyadirGastoFormularioHandler();
    anyadirGastoFromHandler.formulario = formulario;
    anyadirGastoFromHandler.boton = boton;

    formulario.addEventListener("submit",anyadirGastoFromHandler);

    let botonCancelar = formulario.querySelector("button.cancelar");
    let handlerBotonCancelar = new CancelarBotonFormulario();
    handlerBotonCancelar.formulario = formulario;
    handlerBotonCancelar.boton = boton;
    handlerBotonCancelar.elemento = document.getElementById("controlesprincipales");

    botonCancelar.addEventListener("click", handlerBotonCancelar);

    let btnNuevoGastoApi = formulario.querySelector("button.gasto-enviar-api");
    let anyadirGastoApi = new nuevoGastoApi();
    anyadirGastoApi.formulario = formulario;
    anyadirGastoApi.boton = boton;
    btnNuevoGastoApi.addEventListener("click", anyadirGastoApi);
    
}


function EditarHandle(){

    this.handleEvent = function(){
        let descr = prompt("Introduce la descripción del gasto:", this.gasto.descripcion);
        let val = prompt("Introdue el valor del gasto: ", this.gasto.valor);
        let fech = prompt ("Introduce la fecha del asto (yyyy-mm-dd): ", this.gasto.fecha);
        let etiq = prompt ("Introduce las etiquetas del asto separadas por ',': ");
        this.gasto.actualizarDescripcion(descr);
        this.gasto.actualizarValor(parseFloat(val));
        this.gasto.actualizarFecha(fech);
        let etiquetas = new Array();
            etiquetas = etiq.split(",");
            etiquetas.forEach(e => {
                this.gasto.anyadirEtiquetas(e);
            });
        repintar();
    };

}
function AnyadirGastoFormularioHandler(){
    this.handleEvent = function(){
        let descForm = this.formulario.elements.descripcion.value;
        let valForm = this.formulario.elements.valor.value;
        let fechForm = this.formulario.elements.fecha.value;
        let etForm = this.formulario.elements.etiquetas.value;
        let etiqForm = new Array();
        etiqForm = etForm.split(",");
        let gastoForm = new metodosGastos.CrearGasto(descForm,parseFloat(valForm), fechForm, ...etiqForm);
        metodosGastos.anyadirGasto(gastoForm);
        this.boton.disabled = false;
        document.getElementById("controlesprincipales").removeChild(this.formulario);
        repintar();
    }
}

function CancelarBotonFormulario(){
    this.handleEvent = function(){
        this.boton.disabled = false;
        this.elemento.removeChild(this.formulario);
    }
}

function EditarHandleFormulario(){
    this.handleEvent = function(){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");
        this.elemento.append(formulario);
        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substring(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas.toString();

        let aplicarEdit = new AplicarEditForm();
        aplicarEdit.gasto = this.gasto;
        aplicarEdit.formulario = formulario;
        aplicarEdit.boton = this.boton;
        aplicarEdit.elemento = this.elemento;


        this.boton.disabled = true;
        formulario.addEventListener("submit", aplicarEdit);

        let botonCancelar = formulario.querySelector("button.cancelar");
        let handlerBotonCancelar = new CancelarBotonFormulario();
        handlerBotonCancelar.formulario = formulario;
        handlerBotonCancelar.boton = this.boton;
        handlerBotonCancelar.elemento = this.elemento;
        botonCancelar.addEventListener("click", handlerBotonCancelar);

        let botonPutApi = formulario.querySelector("button.gasto-enviar-api");
        let putApi = new putGastoApi();
        putApi.formulario = formulario;
        putApi.gasto = this.gasto;
        putApi.elemento = this.elemento;
        putApi.boton = this.boton;
        botonPutApi.addEventListener("click", putApi);


    }
}


function AplicarEditForm(){
    this.handleEvent = function(event){
        event.preventDefault();
        this.gasto.actualizarDescripcion(this.formulario.elements.descripcion.value);
        this.gasto.actualizarFecha(this.formulario.elements.fecha.value);
        this.gasto.actualizarValor(parseFloat(this.formulario.elements.valor.value));
        let etiqForm = new Array();
        etiqForm = this.formulario.elements.etiquetas.value.split(",");
        this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
        this.gasto.anyadirEtiquetas(...etiqForm);
        this.boton.disabled = false;
        this.elemento.removeChild(this.formulario);
        console.log(metodosGastos.calcularTotalGastos());
        repintar();

    }
}

function BorrarHandle(){
    
    this.handleEvent = function(){
        metodosGastos.borrarGasto(this.gasto.id);
        repintar();
    };
    
}

function BorrarEtiquetasHandle(){
    
    this.handleEvent = function(){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
}

function filtrarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        let desc = document.getElementById("formulario-filtrado-descripcion").value;
        let vm = parseFloat(document.getElementById("formulario-filtrado-valor-minimo").value);
        let vmax =  parseFloat(document.getElementById("formulario-filtrado-valor-maximo").value);
        let fechD = document.getElementById("formulario-filtrado-fecha-desde").value;
        let fechH = document.getElementById("formulario-filtrado-fecha-hasta").value;
        let etF = document.getElementById("formulario-filtrado-etiquetas-tiene").value;
        
        let filtro = {};

        if(etF.length > 0){
            filtro.etiquetasTiene = metodosGastos.transformarListadoEtiquetas(etF);
        }
        if(desc != ""){
            filtro.descripcionContiene = desc;
        }
        if(vm != "" && typeof vm !== "undefined" && !isNaN(vm)){
            filtro.valorMinimo = vm;
        }

        if(vmax != "" && typeof vmax !== "undefined" && !isNaN(vmax)){
            filtro.valorMaximo = vmax;
        }

        if(Date.parse(fechD)){
            filtro.fechaDesde = fechD;
        }

        if(Date.parse(fechH)){
            filtro.fechaHasta = fechH;
        }

        console.log(filtro);

        document.getElementById("listado-gastos-completo").innerHTML="";
        let gastosFiltrados = metodosGastos.filtrarGastos(filtro);
        gastosFiltrados.forEach(g => {
            mostrarGastoWeb("listado-gastos-completo" , g);
        });

    }
}
let formularioFiltro = document.getElementById("formulario-filtrado");

let handlerFiltro = new filtrarGastosWeb();
formularioFiltro.addEventListener("submit", handlerFiltro);

function guardarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        localStorage.GestorGastosDWEC = JSON.stringify(metodosGastos.listarGastos());
    }
}

function cargarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        let gastosCargados = JSON.parse(localStorage.getItem("GestorGastosDWEC"));
        if(gastosCargados !== null){
            metodosGastos.cargarGastos(gastosCargados);
        }else{
            metodosGastos.cargarGastos([]);
        }
        repintar();
    }
}

async function cargarGastosApi(){
    let usuario = document.getElementById("nombre_usuario");
    let url = "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/";
    let response = await fetch(url + usuario.value);
    if(response.ok){
        let gastosRespuesta = await response.json();
        metodosGastos.cargarGastos(gastosRespuesta);
        repintar();
    }
}

function borrarGastoApi(){
    this.handleEvent = async function(event){
        event.preventDefault();
        let usuario = document.getElementById("nombre_usuario");
        let url = "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/";
        let response =  await fetch(url + usuario.value + "/" + this.gasto.gastoId, {method: 'DELETE'});
        if(response.ok){
            cargarGastosApi();
        }
    }
}

function nuevoGastoApi(){
    this.handleEvent = async function(event){
        event.preventDefault();
        let usuario = document.getElementById("nombre_usuario");
        let url = "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/";
        let descForm = this.formulario.elements.descripcion.value;
        let valForm = this.formulario.elements.valor.value;
        let fechForm = this.formulario.elements.fecha.value;
        let etForm = this.formulario.elements.etiquetas.value;
        let etiqForm = new Array();
        etiqForm = etForm.split(",");
        let gastoForm = new metodosGastos.CrearGasto(descForm,parseFloat(valForm), fechForm, ...etiqForm);
        let response = await fetch(url + usuario.value, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(gastoForm)
        });
        if(response.ok){
            cargarGastosApi();
        }
        this.boton.disabled = false;
        document.getElementById("controlesprincipales").removeChild(this.formulario);
    }
}

function putGastoApi(){
    this.handleEvent = async function(event){
        event.preventDefault();
        let usuario = document.getElementById("nombre_usuario");
        this.gasto.actualizarDescripcion(this.formulario.elements.descripcion.value);
        this.gasto.actualizarFecha(this.formulario.elements.fecha.value);
        this.gasto.actualizarValor(parseFloat(this.formulario.elements.valor.value));
        let etiqForm = new Array();
        etiqForm = this.formulario.elements.etiquetas.value.split(",");
        this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
        this.gasto.anyadirEtiquetas(...etiqForm);
        
        let url = "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/";
        let response = await fetch(url + usuario.value + "/" + this.gasto.gastoId, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(this.gasto)
        });
        if(response.ok){
            cargarGastosApi();
        }
        this.boton.disabled = false;
        this.elemento.removeChild(this.formulario);
    }
    
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    EditarHandleFormulario
}