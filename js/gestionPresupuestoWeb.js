'use strict'

function mostrarDatoEnId(idElemento, valor){
    let elem = document.getElementById(idElemento);
    let p = document.createElement('p');
    p.textContent = valor;
    elem.appendChild(p);
}

function mostrarGastoWeb(idElemento, gasto){
    let elem = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.classList.add('gasto');
    elem.append(divGasto);

    let divGastoDes = document.createElement('div');
    divGastoDes.classList.add('gasto-descripcion');
    divGastoDes.innerHTML = `${gasto.descripcion}`;
    divGasto.append(divGastoDes);

    let divGastoFec = document.createElement('div');
    divGastoFec.classList.add('gasto-fecha');
    divGastoFec.innerHTML = `${gasto.fecha}`;
    divGasto.append(divGastoFec); 

    let divGastoVal = document.createElement('div');
    divGastoVal.classList.add('gasto-valor');
    divGastoVal.innerHTML = `${gasto.valor}`;
    divGasto.append(divGastoVal);

    let divGastoEti = document.createElement('div');
    divGastoEti.classList.add('gasto-etiquetas');
    divGasto.append(divGastoEti);

    for (let et of gasto.etiquetas){
        let objBorrarEti = new BorrarEtiquetasHandle();
        objBorrarEti.gasto = gasto;
        let spanGastoEti = document.createElement('span');
        spanGastoEti.classList.add('gasto-etiquetas-etiqueta');
        spanGastoEti.innerHTML = et;
        objBorrarEti.etiqueta = et;
        spanGastoEti.addEventListener('click', objBorrarEti);
        divGastoEti.append(spanGastoEti);
    }

    let botonE = document.createElement('button');
    botonE.classList.add('gasto-editar');
    botonE.innerHTML = 'Editar';
    let objEditar = new EditarHandle();
    objEditar.gasto = gasto;
    botonE.addEventListener("click",objEditar);
    divGasto.append(botonE);

    let botonB = document.createElement('button');
    botonB.classList.add('gasto-borrar');
    botonB.innerHTML = 'Borrar';
    let objBorrar = new BorrarHandle();
    objBorrar.gasto = gasto;
    botonB.addEventListener("click",objBorrar);
    divGasto.append(botonB);

    let botonEF = document.createElement('button');
    botonEF.classList.add('gasto-editar-formulario');
    botonEF.innerHTML = 'Editar (formulario)';
    let objEditarForm = new EditarHandleFormulario();
    objEditarForm.gasto = gasto;
    botonEF.addEventListener("click",objEditarForm);
    divGasto.append(botonEF);

    let botonBApi = document.createElement('button');
    botonBApi.classList.add('gasto-borrar-api');
    botonBApi.innerHTML = 'Borrar (API)';
    let objBorrarApi = new borrarApiHandle();
    objBorrarApi.gasto = gasto;
    botonBApi.addEventListener('click', objBorrarApi);
    divGasto.append(botonBApi);

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    var divP = document.getElementById(idElemento);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";

    let elem = document.getElementById(idElemento);

    let divAgrupacion = document.createElement('div');
    divAgrupacion.classList.add('agrupacion');
    elem.append(divAgrupacion);

    let hacheUno = document.createElement('h1');
    hacheUno.innerHTML = 'Gastos agrupados por ' + periodo;
    divAgrupacion.append(hacheUno);

    for (let propiedad in agrup){

        let divAgrupDato = document.createElement('div');
        divAgrupDato.classList.add('agrupacion-dato');
        divAgrupacion.append(divAgrupDato);

        let spanClave = document.createElement('span');
        spanClave.classList.add('agrupacion-dato-clave');
        spanClave.innerHTML = `${propiedad}`;
        divAgrupDato.append(spanClave);

        let spanValor = document.createElement('span');
        //spanValor.classList.add('agrupacion-dato-valor');
        spanValor.className = 'agrupacion-dato-valor';
        spanValor.innerHTML = `${agrup[propiedad]}`;
        divAgrupDato.append(spanValor);

    }

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

import * as gP from './gestionPresupuesto.js';

function repintar(){

    document.getElementById('presupuesto').textContent = '';
    document.getElementById('gastos-totales').textContent = '';
    document.getElementById('balance-total').textContent = '';

    let texto = gP.mostrarPresupuesto();
    mostrarDatoEnId('presupuesto', texto);

    let total = gP.calcularTotalGastos();
    mostrarDatoEnId('gastos-totales', total);

    let balance = gP.calcularBalance();
    mostrarDatoEnId('balance-total', balance);

    let lisGasComp = document.getElementById('listado-gastos-completo');
    lisGasComp.innerHTML = '';

    let listado = gP.listarGastos();
    for (let gasto of listado){
    mostrarGastoWeb('listado-gastos-completo', gasto);
    }

    let agrupDia = gP.agruparGastos('dia');
    mostrarGastosAgrupadosWeb("agrupacion-dia", agrupDia, "día");

    let agrupMes = gP.agruparGastos('mes');
    mostrarGastosAgrupadosWeb("agrupacion-mes", agrupMes, "mes");

    let agrupAnyo = gP.agruparGastos('anyo');
    mostrarGastosAgrupadosWeb("agrupacion-anyo", agrupAnyo, "año");
}

function actualizarPresupuestoWeb(){
    let presu = parseFloat(prompt('Introduzca un presupuesto'));
    gP.actualizarPresupuesto(presu);
    repintar();
}

let b1 = document.getElementById('actualizarpresupuesto');
b1.addEventListener("click",actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    let des = prompt('Introduzca una descripción');
    let val = parseFloat(prompt('Introduzca un valor'));
    let fec = new Date(prompt('Introduzca una fecha')).toLocaleDateString();
    let eti = prompt('Introduzca una etiqueta(seguida de una coma)'); 
    eti = eti.split(', ');

    let gasto1 = new gP.CrearGasto(des, val, fec, eti);

    gP.anyadirGasto(gasto1);

    repintar();
}

let b2 = document.getElementById('anyadirgasto');
b2.addEventListener("click",nuevoGastoWeb);

function EditarHandle(){
    this.handleEvent = function(event){
        let des = prompt('Edita la descripción del gasto');
        let val = parseFloat(prompt('Edita el valor del gasto'));
        let fec = new Date(prompt('Edita la fecha del gasto')).toLocaleDateString();
        let eti = prompt('Edita las etiquetas del gasto(seguida de una coma)'); 
        eti = eti.split(', ');

        this.gasto.actualizarValor(val);
        this.gasto.actualizarDescripcion(des);
        this.gasto.actualizarFecha(fec);
        this.gasto.anyadirEtiquetas(eti);

        repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function(event){

        gP.borrarGasto(this.gasto.id);

        repintar();
    }
}


//Comunicación asíncrona :)

function borrarApiHandle(){
    this.handleEvent = function(event){

        let nomApe = document.getElementById('nombre_usuario').value;

        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nomApe}/${this.gasto.gastoId}`;

        if (nomApe != ''){
            fetch (url, {method: 'DELETE'})
                .then(function(gastosApi) {
                    if(respuesta.ok){
                        alert('El gasto se ha borrado correctamente');
                        cargarGastosApi(gastosApi);
                    }
                    else{
                        alert('Error ' + respuesta.status + ': el id introducido del gasto es inexistente');
                    }

                })
                .catch(errors => alert(errors));
        }
        else{
            alert('Introduce un nombre.');
        }
    }
}

function enviarApiHandle(){
    this.handleEvent = function(event){

        let nomApe = document.getElementById('nombre_usuario').value;

        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nomApe}`;

        if (nomApe != ''){

            var form = document.querySelector("#controlesprincipales form");
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

            fetch (url, {method: 'POST', headers:{'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(gastoApi)})
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

        let nomApe = document.getElementById('nombre_usuario').value;

        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nomApe}/${this.gasto.gastoId}`;

        if (nomApe != ''){

            var form = document.querySelector('.gasto form');
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
            
            fetch (url, {method: 'PUT', headers:{'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(gastoApi)})
            .then(function(respuesta) {
                if(respuesta.ok){
                    alert('El gasto se ha editado correctamente');
                    cargarGastosApi();
                }
                else{
                    alert('Error ' + respuesta.status + ': no se ha podido editar el gasto correctamente en la Api');
                }   
            })
            .catch(errors => alert(errors));
        }
        else{
            alert('Introduce un nombre.');
        }
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(event){

        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
}

function nuevoGastoWebFormulario(){

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");

    //Enviar
    let env = new enviarFormularioHandle();
    formulario.addEventListener('submit',env);

    //Cancelar
    let bCancelar = formulario.querySelector("button.cancelar");
    let can = new cancelarFormularioHandle();
    bCancelar.addEventListener('click',can);

    //Desacivar botón
    document.getElementById('anyadirgasto-formulario').setAttribute('disabled', '');

    //Enviar Api
    let envApi = formulario.querySelector("button.gasto-enviar-api");
    envApi.addEventListener('click', new enviarApiHandle());

    //Añadir plantilla al final
    document.getElementById('controlesprincipales').append(plantillaFormulario);
}

document.getElementById('anyadirgasto-formulario').addEventListener('click', nuevoGastoWebFormulario);

function enviarFormularioHandle(){

    this.handleEvent = function(event){

        event.preventDefault();

        let form = event.currentTarget;
        let des = form.descripcion.value;
        let val = parseFloat(form.valor.value);
        let fec = form.fecha.value;
        let eti = form.etiquetas.value;

        let gastoEnviar = new gP.CrearGasto(des, val, fec, eti);

        gP.anyadirGasto(gastoEnviar);
    
        repintar();

        document.getElementById('anyadirgasto-formulario').removeAttribute('disabled');
    }
}


function cancelarFormularioHandle(){

    this.handleEvent = function(event){

        event.currentTarget.parentNode.remove();

        document.getElementById("anyadirgasto-formulario").removeAttribute('disabled');

        repintar();
        
    }
}


function EditarHandleFormulario(){

    this.handleEvent = function(event){

        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");
    
        event.currentTarget.append(formulario);
        event.currentTarget.setAttribute('disabled', '');
    
        formulario.descripcion.value = this.gasto.descripcion;
        formulario.valor.value = parseFloat(this.gasto.valor);
        formulario.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        formulario.etiquetas.value = this.gasto.etiquetas;
    
        //Enviar
        let envForm = new enviarHandle();
        envForm.gasto = this.gasto;
        formulario.addEventListener('submit',envForm);

        //Cancelar
        let bCancelarForm = formulario.querySelector("button.cancelar");
        let canForm = new cancelarFormularioHandle();
        bCancelarForm.addEventListener('click', canForm);

        //Editar Api
        let objediApi = new editarApiHandle();
        objediApi.gasto = this.gasto;
        let ediApi = formulario.querySelector("button.gasto-enviar-api");
        ediApi.addEventListener('click', objediApi);

    }

}

function enviarHandle(){

    this.handleEvent = function(event){

        event.preventDefault();

        let form = event.currentTarget;

        let des = form.descripcion.value;
        this.gasto.actualizarDescripcion(des);

        let val = parseFloat(form.valor.value);
        this.gasto.actualizarValor(val);

        let fec = form.fecha.value;
        this.gasto.actualizarFecha(fec);

        let eti = form.etiquetas.value;
        this.gasto.anyadirEtiquetas(eti);
    
        repintar();
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
            filtro.etiquetasTiene = gP.transformarListadoEtiquetas(etiTiene);
        }
        filtro.fechaDesde = fecDes;
        filtro.fechaHasta = fecHas;
        filtro.valorMinimo = vMin;
        filtro.valorMaximo = vMax;
        filtro.descripcionContiene = des;

        document.getElementById("listado-gastos-completo").innerHTML="";
        let objsFiltrGastos = gP.filtrarGastos(filtro);

        for (let gasto of objsFiltrGastos){
            mostrarGastoWeb('listado-gastos-completo', gasto);
        }
        
    }

}

let filtGastForm = new filtrarGastosWeb();
document.getElementById('formulario-filtrado').addEventListener('submit', filtGastForm);

function guardarGastosWeb(){

    this.handleEvent = function(event){

        localStorage.setItem('GestorGastosDWEC', JSON.stringify(gP.listarGastos()));
        //localStorage.GestorGastosDWEC = JSON.stringify(gP.listarGastos());

    }

}

document.getElementById('guardar-gastos').addEventListener('click', new guardarGastosWeb);

function cargarGastosWeb(){

    this.handleEvent = function(event){

        let clave = JSON.parse(localStorage.getItem('GestorGastosDWEC'));
        if (clave !== null){
            if (clave.length >= 0)
            gP.cargarGastos(clave);
        }
        else{
            gP.cargarGastos([]);
        }
        repintar();

    }

}

document.getElementById('cargar-gastos').addEventListener('click', new cargarGastosWeb);

function cargarGastosApi(){

    this.handleEvent = function(event){

        let nomApe = document.getElementById('nombre_usuario').value;

        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nomApe}`;

        if (nomApe != ''){
            fetch (url, {method: 'GET'})
                .then(respuesta => respuesta.json())
                .then(function(gastosApi) {
                    gP.cargarGastos(gastosApi);
                    repintar();
                })
                .catch(errors => alert(errors));
        }
        else{
            alert('Introduce un nombre.');
        }

    }

}

document.getElementById('cargar-gastos-api').addEventListener('click', new cargarGastosApi);



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}