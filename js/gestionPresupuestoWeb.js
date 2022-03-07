'use strict';
import * as gestionPresupuesto from './gestionPresupuesto.js'

//Funciones para mostrar los datos
function mostrarDatoEnId(idElemento, valor){
    let elem = document.getElementById(idElemento);
    elem.innerHTML += valor;
}
function mostrarGastoWeb(idElemento, gasto){
    let elem = document.getElementById(idElemento);

    //div.class gasto
    let divG = document.createElement("div");
    divG.className += "gasto";
    elem.append(divG);

    //div.class gasto-descripcion
    let divGD = document.createElement("div");
    divGD.className += "gasto-descripcion";
    divGD.textContent = gasto.descripcion;
    divG.append(divGD);

    //div.class gasto-fecha
    let divGF = document.createElement("div");
    divGF.className += "gasto-fecha";
    divGF.textContent = new Date(gasto.fecha).toLocaleDateString();
    divG.append(divGF);

    //div.class gasto-valor
    let divGV = document.createElement("div");
    divGV.className += "gasto-valor";
    divGV.textContent = gasto.valor;
    divG.append(divGV)

    //div.class gasto-etiquetas
    let divGE = document.createElement("div");
    divGE.className += "gasto-etiquetas";


    gasto.etiquetas.forEach(item => {
        let borrarEtiquetas = new BorrarEtiquetasHandle();
        borrarEtiquetas.gasto = gasto;
        borrarEtiquetas.etiqueta = item;

        let span = document.createElement("span");
        span.className += "gasto-etiquetas-etiqueta";
        span.textContent = item + " ";
        if(idElemento === "listado-gastos-completo"){
            //evento click borrarEtiquetas
            span.addEventListener("click", borrarEtiquetas);
        }
        divGE.append(span);
    });  
    divG.append(divGE);

    //botones formulario
        //btn.class gasto-editar
    let btnEditar2 = document.createElement("button");
    btnEditar2.className = "gasto-editar";
    btnEditar2.textContent = "Editar";
        //btn.class gasto-borrar
    let btnBorrar2 = document.createElement("button");
    btnBorrar2.className = "gasto-borrar";
    btnBorrar2.textContent = "Borrar";


    //botones gasto-editar , gasto-borrar y gasto-editar-formulario

        //obj editarHandler
    let editarHandler = new EditarHandle();
    editarHandler.gasto = gasto;
        //btn.class gasto-editar
    let btnEditar = document.createElement("button");
    btnEditar.className = "gasto-editar";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", editarHandler);//evento

        //obj borrarHandler
    let borrarHandler = new BorrarHandle();
    borrarHandler.gasto = gasto;
        //btn.class gasto-borrar
    let btnBorrar = document.createElement("button");
    btnBorrar.className = "gasto-borrar";
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", borrarHandler);//evento

        //obj editarHandler
    let editarHandlerForm = new EditarFormHandle();
    editarHandlerForm.gasto = gasto;
        //boton.class gasto-editar-formulario
    let btnEditarF = document.createElement('button');
    btnEditarF.className = 'gasto-editar-formulario';
    btnEditarF.textContent = 'Editar (formulario)';
    btnEditarF.addEventListener('click',editarHandlerForm);//evento

        //API
        //obj gasto-borrar-api 
    let objBorrarApi = new borrarGastosApi();
    objBorrarApi.gasto = gasto;
        //btn.class gasto-borrar-api
    let botonBorrarApi = document.createElement('button');
    botonBorrarApi.className='gasto-borrar-api';
    botonBorrarApi.innerHTML = 'Borrar (API)';
    botonBorrarApi.addEventListener('click', objBorrarApi);//evento
        
    if(idElemento === "listado-gastos-completo"){
        divG.append(btnEditar);
        divG.append(btnBorrar);
        divG.append(btnEditarF);
        divG.append(botonBorrarApi);
    }
    
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    var divP = document.getElementById(idElemento);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";

    let cad = "<div class='agrupacion'>\n" + 
    "<h1>Gastos agrupados por " + periodo + "</h1>\n";
    
    for (let res in agrup){
      
        cad += 
        "<div class='agrupacion-dato'>\n" +
        "<span class='agrupacion-dato-clave'>" + res + "</span>\n" +
        "<span class='agrupacion-dato-valor'>" + agrup[res] + "</span>\n"+
        "</div>\n";
    }

    cad += "</div>\n";
    divP.innerHTML += cad;

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
function repintar(){
    document.getElementById('presupuesto').innerHTML='';
    document.getElementById('gastos-totales').innerHTML="";
    document.getElementById('balance-total').innerHTML="";

    mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales',gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId('balance-total',gestionPresupuesto.calcularBalance());
    document.getElementById('listado-gastos-completo').innerHTML="";


    let listadoGastoCompletos = gestionPresupuesto.listarGastos();
    document.getElementById('listado-gastos-completo').innerHTML='';
    for (let elem of listadoGastoCompletos){
        mostrarGastoWeb('listado-gastos-completo',elem);
    }

    //gastos filtrados
        let obj,gastoFiltrado,etiq;
        //mostrar los gastos de septiembre de 2021 id=listado-gastos-filtrado-1
        document.getElementById('listado-gastos-filtrado-1').innerHTML="";
        obj = {fechaDesde : "2021-09-01", fechaHasta:"2021-09-30"};
        gastoFiltrado = gestionPresupuesto.filtrarGastos(obj);
        for( let key of gastoFiltrado){
            mostrarGastoWeb('listado-gastos-filtrado-1',key);
        }
        //mostrar los gastos mas de 50 id=listado-gastos-filtrado-2
        document.getElementById('listado-gastos-filtrado-2').innerHTML="";
        obj = {valorMinimo : 50};
        gastoFiltrado = gestionPresupuesto.filtrarGastos(obj);
        for( let key of gastoFiltrado){
            mostrarGastoWeb('listado-gastos-filtrado-2',key);
        }    
        //mostrar los gastos mas de 200 con etiq seguros id=listado-gastos-filtrado-3
        document.getElementById('listado-gastos-filtrado-3').innerHTML="";
        etiq = ["seguros"];
        obj = {valorMinimo : 200, etiquetasTiene:etiq};
        gastoFiltrado = gestionPresupuesto.filtrarGastos(obj);
        for( let key of gastoFiltrado){
            mostrarGastoWeb('listado-gastos-filtrado-3',key);
        }    
        //mostrar los gastos menos de 50 con etiq comida o transporte id=listado-gastos-filtrado-4
        document.getElementById('listado-gastos-filtrado-4').innerHTML="";
        etiq = ["comida", "transporte"];
        obj = {valorMaximo : 50, etiquetasTiene:etiq};
        gastoFiltrado = gestionPresupuesto.filtrarGastos(obj);
        for( let key of gastoFiltrado){
            mostrarGastoWeb('listado-gastos-filtrado-4',key);
        }

    let periodo = "dia";
    let gasto = gestionPresupuesto.agruparGastos(periodo);
    mostrarGastosAgrupadosWeb("agrupacion-dia", gasto, "día");

    periodo = "mes";
    gasto = gestionPresupuesto.agruparGastos(periodo);
    mostrarGastosAgrupadosWeb("agrupacion-mes", gasto, "mes");

    periodo = "anyo";
    gasto = gestionPresupuesto.agruparGastos(periodo);
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gasto, "año");
}


//Funciones y eventos botones principales

    //Funcion boton actulizar
function actualizarPresupuestoWeb(){
    let presu = parseInt(prompt('Introduce un presupuesto nuevo.'));
    gestionPresupuesto.actualizarPresupuesto(presu);
    document.getElementById('presupuesto').innerHTML="";
    document.getElementById('gastos-totales').innerHTML="";
    document.getElementById('balance-total').innerHTML="";
    repintar();
}
    //Funcion boton añadir gasto
function nuevoGastoWeb(){
    let desc = prompt('Escriba la descripción del nuevo gasto');
    let val = parseFloat(prompt('Escriba el valor del nuevo gasto'));
    let fech = new Date(prompt('Escriba la fecha del nuevo gasto')).toLocaleDateString();//arreglar?
    let etiq = prompt('Escriba las etiquetas (seguidas por coma) del nuevo gasto');
    etiq = etiq.split(', ');
    let gasto = new gestionPresupuesto.CrearGasto(desc, val, fech, etiq);
    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}
    //Funcion boton añadir gasto formulario
function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true); //clonar plantilla (template)
    let formulario = plantillaFormulario.querySelector("form"); //extraer el form de la plantilla (template) a una variable
    //Desacivar btn
    document.getElementById('anyadirgasto-formulario').setAttribute('disabled', '');

    //Añadir plantilla como ultimo hijo
    document.getElementById('controlesprincipales').append(formulario);

    //evento btn enviar
    formulario.addEventListener('submit', new EnviarFormHandle());

    //Enviar Api
    let enviarAPI = formulario.querySelector("button.gasto-enviar-api");
    enviarAPI.addEventListener('click', new enviarGastosApi());

    //evento btn cancelar
    formulario.querySelector("button.cancelar").addEventListener('click',new CancelarFormHandle());

    
}
    //Evento boton actulizar
document.getElementById('actualizarpresupuesto').addEventListener('click', actualizarPresupuestoWeb);
    //Evento boton añadir gasto
document.getElementById('anyadirgasto').addEventListener('click', nuevoGastoWeb);
    //Evento boton añadir gasto formulario
document.getElementById('anyadirgasto-formulario').addEventListener('click', nuevoGastoWebFormulario)

    //Funcion boton filtrarGastos
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

    //Funcion boton guardar gastos
function guardarGastosWeb(){
        this.handleEvent = function(event){
            localStorage.setItem('GestorGastosDWEC', JSON.stringify(gestionPresupuesto.listarGastos()));    
        }
    }
    //Evento boton guardar gastos
document.getElementById('guardar-gastos').addEventListener('click', new guardarGastosWeb);

    //Funcion boton cargar gastos
function cargarGastosWeb(){
    this.handleEvent = function(event){
        let clave = JSON.parse(localStorage.getItem('GestorGastosDWEC'));
        if (clave !== null){
            if (clave.length >= 0)
            gestionPresupuesto.cargarGastos(clave);
        }
        else{
            gestionPresupuesto.cargarGastos([]);
        }
        repintar();
    }
}
    //Evento boton cargar gastos
document.getElementById('cargar-gastos').addEventListener('click', new cargarGastosWeb);


//Funciones handle
function EditarHandle (){
    this.handleEvent = function(event){
        let desc = prompt('Escriba la descripción del nuevo gasto');
        let val = parseFloat(prompt('Escriba el valor del nuevo gasto'));
        let fech = new Date(prompt('Escriba la fecha del nuevo gasto')).toLocaleDateString();
        let etiq = prompt('Escriba las etiquetas (seguidas por coma) del nuevo gasto');
            etiq = etiq.split(', ');
        
        this.gasto.actualizarValor(val);
        this.gasto.actualizarDescripcion(desc);
        this.gasto.actualizarFecha(fech);
        this.gasto.anyadirEtiquetas(etiq);

        repintar();
    }
}
function BorrarHandle (){
    this.handleEvent = function(event){
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}
function BorrarEtiquetasHandle(){
    this.handleEvent = function(event){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
    
}
    //Funciones Handle para los formularios
function EnviarFormHandle(){

    this.handleEvent = function(event){

        event.preventDefault();

        let form = event.currentTarget;
        
        let desc = form.descripcion.value;
        let val = parseFloat(form.valor.value);
        let fech = form.fecha.value;
        let etiq = form.etiquetas.value;
            etiq = etiq.split(', ');

        let gasto = new gestionPresupuesto.CrearGasto(desc, val, fech, etiq);

        gestionPresupuesto.anyadirGasto(gasto);

        document.getElementById('anyadirgasto-formulario').removeAttribute('disabled');
        form.remove();

        repintar();
    }
}
function CancelarFormHandle(){
    this.handleEvent = function(event){

        event.currentTarget.parentNode.remove();
        
        document.getElementById("anyadirgasto-formulario").removeAttribute('disabled');

        repintar();
    }
}
function EditarFormHandle(){
    this.handleEvent=function(event){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true); //clonar plantilla (template)
        let formulario = plantillaFormulario.querySelector("form"); //extraer el form de la plantilla (template) a una variable

        formulario.descripcion.value = this.gasto.descripcion;
        formulario.valor.value = parseFloat(this.gasto.valor);
        formulario.fecha.value = new Date(this.gasto.fecha).toString().substr(0,10);//.toISOString?
        formulario.etiquetas.value = this.gasto.etiquetas;

        event.currentTarget.append(formulario);
        event.currentTarget.setAttribute('disabled', '');

        //evento btn enviar
        let objBtnEnviar = new enviarHandle();
        objBtnEnviar.gasto = this.gasto;
        formulario.addEventListener('submit',objBtnEnviar);

        //evento btn cancelar
        let objBtnCancelar = new CancelarFormHandle();
        formulario.querySelector("button.cancelar").addEventListener('click',objBtnCancelar);

        //Editar Api
        let objEditarAPI = new editarApiHandle();
        objEditarAPI.gasto = this.gasto;
        formulario.querySelector("button.gasto-enviar-api").addEventListener('click', objEditarAPI);
    }
}

function enviarHandle(){
    this.handleEvent=function(event){
        event.preventDefault();

        let form = event.currentTarget;

        this.gasto.actualizarDescripcion(form.descripcion.value);
        this.gasto.actualizarValor(parseFloat(form.valor.value));
        this.gasto.actualizarFecha(form.fecha.value);
        this.gasto.anyadirEtiquetas(form.etiquetas.value.split(', '));

        repintar();
    }
}


//Funciones API
function cargarGastosApi(){
    this.handleEvent=function(event){
        let NombreUsuario = document.getElementById('nombre_usuario').value;

        if(NombreUsuario != '')
        {
            let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${NombreUsuario}`;

            fetch(url, {method: "GET",})
            .then(response => response.json())
            .then(function(gastosAPI)
            {
                gestionPresupuesto.cargarGastos(gastosAPI);
                repintar();
            })
            .catch(err => alert(err));
        }
        else
        {
            alert('Introduce un nombre de usuario y prueba de nuevo');
        }

    }
}
document.getElementById('cargar-gastos-api').addEventListener('click', new cargarGastosApi); //Evento

function borrarGastosApi(){
    this.handleEvent = async function(event){
        let NombreUsuario = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${NombreUsuario}/${this.gasto.gastoId}`;
        try{
            if (NombreUsuario != ''){
                let respuesta = await fetch (url, {method: 'DELETE'})
                        if(respuesta.ok){
                            cargarGastosApi();
                            alert('El gasto se ha borrado correctamente');
                        }
                        else{
                            alert('Error ' + respuesta.status + ': el id introducido del gasto es inexistente');
                        }
            }
            else{
                alert('Introduce un nombre en el cuadro de texto.');
            }
        }
        catch(err){
            console.log(err);
        }
    }
}

function enviarGastosApi(){
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

function editarApiHandle(){
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
            console.log("hola");
            fetch (url, {method: 'PUT', body: JSON.stringify(gastoApi), headers:{'Content-Type': 'application/json;charset=utf-8'}})
            .then(function(respuesta) {
                if(respuesta.ok){
                    alert('El gasto se ha editado correctamente');
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

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
