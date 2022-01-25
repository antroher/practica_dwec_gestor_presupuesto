'use strict';
//import { result } from "cypress/types/lodash";
import * as gestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor)
{
    let elem = document.getElementById(idElemento);
    let p= document.createElement('p');

    p.textContent=valor;
    elem.appendChild(p);
}

function mostrarGastoWeb(idElemento, gasto)
{
    let elem = document.getElementById(idElemento);

    
    let divGastos = document.createElement("div");
    divGastos.className += "gasto";
    elem.append(divGastos);

   
    let divGastosDescrip = document.createElement("div");
    divGastosDescrip.className += "gasto-descripcion";
    divGastosDescrip.textContent = gasto.descripcion;
    divGastos.append(divGastosDescrip);

 
    let divGastosFech = document.createElement("div");
    divGastosFech.className += "gasto-fecha";
    divGastosFech.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGastos.append(divGastosFech);

    
    let divGastosVal = document.createElement("div");
    divGastosVal.className += "gasto-valor";
    divGastosVal.textContent = gasto.valor;
    divGastos.append(divGastosVal)

    let divGastosEtiq = document.createElement("div");
    divGastosEtiq.className += "gasto-etiquetas";


    gasto.etiquetas.forEach(item => {
        let borrarEtiq= new BorrarEtiquetasHandle();
        borrarEtiq.gasto=gasto;
        borrarEtiq.etiqueta=item;

        let span = document.createElement("span");
        span.className += "gasto-etiquetas-etiqueta";
        span.textContent = item + " ";
        divGastosEtiq.append(span);
        if(idElemento==='listado-gastos-completo')
        {
            span.addEventListener('click', borrarEtiq);
        }
        divGastosEtiq.append(span);
    });  
    divGastos.append(divGastosEtiq);


    let objEditarHandle = new EditarHandle();
    objEditarHandle.gasto= gasto;
    let botonEdit= document.createElement('button');
    botonEdit.className="gasto-editar";
    botonEdit.textContent="Editar";
    botonEdit.addEventListener('click', objEditarHandle);

    let objBorrarHandle = new BorrarHandle();
    objBorrarHandle.gasto=gasto;
    let botonBorrar= document.createElement('button');
    botonBorrar.className="gasto-borrar";
    botonBorrar.textContent='Borrar';
    botonBorrar.addEventListener('click', objBorrarHandle);

    let editarHandlerForm = new EditarFormHandle();
    editarHandlerForm.gasto = gasto;
    let botonEditForm = document.createElement('button');
    botonEditForm.className = 'gasto-editar-formulario';
    botonEditForm.textContent = 'Editar (formulario)';
    botonEditForm.addEventListener('click',editarHandlerForm);

    //obj gasto-borrar-api (API)
    let objBorrarApi = new borrarGastosApi();
    objBorrarApi.gasto = gasto;
        //boton gasto-borrar-api
    let botonBorrarApi = document.createElement('button');
    botonBorrarApi.className='gasto-borrar-api';
    botonBorrarApi.innerHTML = 'Borrar (API)';
    botonBorrarApi.addEventListener('click', objBorrarApi);//evento


    if(idElemento==='listado-gastos-completo')
    {
        divGastos.append(botonEdit);
        divGastos.append(botonBorrar);
        divGastos.append(botonEditForm);
    }

}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
        // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    var divP = document.getElementById(idElemento);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";
    let cadenaGAgrup=`<div class="agrupacion">
                        <h1>Gastos agrupados por ${periodo}</h1>`;

    for(let propiedad in agrup)
    {
        cadenaGAgrup+=`<div class="agrupacion-dato">
                            <span class="agrupacion-dato-clave">${propiedad}</span>
                            <span class="agrupacion-dato-valor">${agrup[propiedad]}</span>
                        </div>`;
    }

    cadenaGAgrup+=`</div>`
    document.getElementById(idElemento).innerHTML+= cadenaGAgrup;
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

function repintar()
{
    let elemento= document.getElementById('presupuesto');
    elemento.innerHTML="";
    
    elemento= document.getElementById('gastos-totales');
    elemento.innerHTML="";

    elemento= document.getElementById('balance-total');
    elemento.innerHTML="";

    elemento= document.getElementById('listado-gastos-completo');
    elemento.innerHTML="";


    let mostrarP= gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId('presupuesto', mostrarP);

    let mostrarGT= gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId('gastos-totales',mostrarGT);

    let mostrarB= gestionPresupuesto.calcularBalance();
    mostrarDatoEnId('balance-total',mostrarB);

    let arrayListadoGCompleto= gestionPresupuesto.listarGastos();
    for(let objeto of arrayListadoGCompleto)
    {
        mostrarGastoWeb('listado-gastos-completo',objeto);
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

function actualizarPresupuestoWeb()
{
    let num = parseFloat(prompt('Introduce el nuevo presupuesto:'));
    gestionPresupuesto.actualizarPresupuesto(num);
    repintar();
}

let botonActualizarP=document.getElementById("actualizarpresupuesto");
botonActualizarP.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb()
{
    let descripcion= prompt('Escriba la descripción del nuevo gasto: ');
    let valor= parseFloat(prompt('Introduzca el nuevo valor: '));
    let fecha= new Date(prompt('Introduzca la fecha: ')).toLocaleDateString();
    let etiq=prompt('Escriba las etiquetas seguidas por ","');
    let arrayEtiq=etiq.split(', ');

    let gasto= new gestionPresupuesto.CrearGasto(descripcion,valor,fecha, arrayEtiq);
    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}

let botonAnyadirG= document.getElementById('anyadirgasto');
botonAnyadirG.addEventListener('click', nuevoGastoWeb);

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true); //clonar plantilla (template)
    let formulario = plantillaFormulario.querySelector("form"); //extraer el form de la plantilla (template) a una variable
    
    let form = document.getElementById('anyadirgasto-formulario');
    form.setAttribute('disabled', '');

    let control = document.getElementById('controlesprincipales'); 
    control.append(formulario);

    formulario.addEventListener('submit', new EnviarFormHandle());

    //Api
    let enviarAPI = formulario.querySelector("button.gasto-enviar-api");
    enviarAPI.addEventListener('click', new enviarGastosApi());

    formulario.querySelector("button.cancelar").addEventListener('click',new CancelarFormHandle());

}

let formEvento = document.getElementById('anyadirgasto-formulario');
formEvento.addEventListener('click', nuevoGastoWebFormulario);

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

function EditarHandle()
{
    this.handleEvent= function()
    {
        let descripcion= prompt('Escriba la descripción del nuevo gasto: ');
        let valor= parseFloat(prompt('Introduzca el nuevo valor: '));
        let fecha= new Date(prompt('Introduzca la fecha: ')).toLocaleDateString();
        let etiq=prompt('Escriba las etiquetas seguidas por ","');
        let arrayEtiq=etiq.split(', ');

        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(arrayEtiq);

        repintar();
    }
}

function BorrarHandle()
{
    this.handleEvent= function()
    {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle()
{
    this.handleEvent=function()
    {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

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

function guardarGastosWeb(){
    this.handleEvent = function(e){
        let gastosListados= gestionPresupuesto.listarGastos();
        localStorage.setItem('GestorGastosDWEC', JSON.stringify(gastosListados));
    }
}

let botonGuardarGastos= document.getElementById('guardar-gastos');
let ggw= new guardarGastosWeb;
botonGuardarGastos.addEventListener('click', ggw);

function cargarGastosWeb(){
    this.handleEvent = function(e){
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
            alert(' ¡Introduce un nombre de usuario y prueba suerte de nuevo! ');
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
                            alert('Error ' + respuesta.status + ': El id introducido del gasto es inexistente');
                        }
            }
            else{
                alert('Introduce un nombre en el siguiente recuadro: ');
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
                        alert('¡El gasto se ha creado correctamente!');
                        cargarGastosApi();
                    }
                    else{
                        alert('Error ' + respuesta.status + ': NO se ha podido crear el gasto correctamente en la Api');
                    }   
                })
                .catch(errors => alert(errors));
        }
        else{
            alert('Introduce un nombre: ');
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
            console.log("hola usuario");
            fetch (url, {method: 'PUT', body: JSON.stringify(gastoApi), headers:{'Content-Type': 'application/json;charset=utf-8'}})
            .then(function(respuesta) {
                if(respuesta.ok){
                    alert(' ¡ El gasto se ha editado correctamente! ');
                    cargarGastosApi();
                }
                else{
                    alert('Error ' + respuesta.status + ': NO se ha podido crear el gasto correctamente en la Api');
                }   
            })
            .catch(errors => alert(errors));
        }
        else{
            alert('Introduce un nombre.');
        }
    }
}



let botonCargarGastos= document.getElementById('cargar-gastos');
let cgw = new cargarGastosWeb;
botonCargarGastos.addEventListener('click', cgw);   

export{ mostrarDatoEnId,
        mostrarGastoWeb,
        mostrarGastosAgrupadosWeb,
    
    }