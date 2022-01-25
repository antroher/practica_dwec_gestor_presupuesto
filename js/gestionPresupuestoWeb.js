"use strict";

import * as gp from './gestionPresupuesto.js';

document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);
let evFiltrar = new filtrarGastosWeb();
document.getElementById("formulario-filtrado").addEventListener("submit", evFiltrar);
document.getElementById("guardar-gastos").addEventListener('click', guardarGastosWeb);
document.getElementById("cargar-gastos").addEventListener('click', cargarGastosWeb);
/**/
document.getElementById("cargar-gastos-api").addEventListener('click', cargarGastosApi);

function mostrarDatoEnId(idElemento, valor){
    let mostrar = document.getElementById(idElemento);
    mostrar.textContent = `${valor}`;
}

function mostrarGastoWeb(idElemento, gasto){

    let mostrar = document.getElementById(idElemento);

    //Botón editar gasto
    let evEditar = new EditarHandle();
    evEditar.gasto = gasto;

    //Botón borrar gasto
    let evBorrar = new BorrarHandle();
    evBorrar.gasto = gasto;

    //Botón editar gasto formulario
    let evEditarFormulario = new EditarHandleFormulario();
    evEditarFormulario.gasto = gasto;

    //Botón borrar API
    let evBorrarAPI = new BorrarAPIHandle();
    evBorrarAPI.gasto = gasto;

    let div = document.createElement("div");
    div.className = "gasto";

    let divDesc = document.createElement("div");
    divDesc.className = "gasto-descripcion";
    divDesc.textContent = `${gasto.descripcion}`;

    let divFech = document.createElement("div");
    divFech.className = "gasto-fecha";
    divFech.textContent = `${gasto.fecha}`;

    let divVal = document.createElement("div");
    divVal.className = "gasto-valor";
    divVal.textContent = `${gasto.valor}`;

    let divEtiq = document.createElement("div");
    divEtiq.className = "gasto-etiquetas";

    for(let etiqueta of gasto.etiquetas){
        let spanEtiq = document.createElement("span");
        spanEtiq.className = "gasto-etiquetas-etiqueta";
        spanEtiq.textContent = `${etiqueta}`;
        divEtiq.append(spanEtiq);
        //Borrar etiqueta
        let evEtiqueta = new BorrarEtiquetasHandle();
        evEtiqueta.gasto = gasto;
        evEtiqueta.etiqueta = etiqueta;
        spanEtiq.addEventListener("click", evEtiqueta);
    }

    let btnEditar = document.createElement("button");
    btnEditar.className = "gasto-editar";
    btnEditar.type = "button";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", evEditar);

    let btnBorrar = document.createElement("button");
    btnBorrar.className = "gasto-borrar";
    btnBorrar.type = "button";
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", evBorrar);

    let btnBorrarAPI = document.createElement("button");
    btnBorrarAPI.className = "gasto-borrar-api";
    btnBorrarAPI.type = "button";
    btnBorrarAPI.textContent = "Borrar (API)";
    btnBorrarAPI.addEventListener('click', evBorrarAPI);

    let btnEditaFormulario = document.createElement("button");
    btnEditaFormulario.className = "gasto-editar-formulario";
    btnEditaFormulario.type = "button";
    btnEditaFormulario.textContent = "Editar (formulario)";
    btnEditaFormulario.addEventListener("click", evEditarFormulario);

    div.append(divDesc);
    div.append(divFech);
    div.append(divVal);
    div.append(divEtiq);
    div.append(btnEditar);
    div.append(btnBorrar);
    div.append(btnBorrarAPI);
    div.append(btnEditaFormulario);
    mostrar.append(div);  
}



function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    var divP = document.getElementById(idElemento);
    divP.innerHTML = '';

    let mostrar = document.getElementById(idElemento);

    let div = document.createElement("div");
    div.className = "agrupacion";

    let h1 = document.createElement("h1");
    h1.textContent = `Gastos agrupados por ${periodo}`;

    div.append(h1);

    for(const [key, value] of Object.entries(agrup)){
        let divAgrupacion = document.createElement("div");
        divAgrupacion.className = "agrupacion-dato";

        let spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.textContent = `${key}`;

        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.textContent = `${value}`;

        divAgrupacion.append(spanClave);
        divAgrupacion.append(spanValor);

        div.append(divAgrupacion);
    }

    mostrar.append(div);

    //*//
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
    let presupuesto = gp.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);

    let gTotales = gp.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gTotales);

    let bTotal = gp.calcularBalance();
    mostrarDatoEnId("balance-total", bTotal);

    document.getElementById("listado-gastos-completo").innerHTML = '';

    let lgastos = gp.listarGastos();

    for(let gasto of lgastos){
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }

    //*//
    let gastosAgruparDia = gp.agruparGastos("dia");

    mostrarGastosAgrupadosWeb("agrupacion-dia", gastosAgruparDia, "día");

    let gastosAgruparMes = gp.agruparGastos("mes");

    mostrarGastosAgrupadosWeb("agrupacion-mes", gastosAgruparMes, "mes");

    let gastosAgruparAnyo = gp.agruparGastos("anyo");

    mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAgruparAnyo, "año");
}

function actualizarPresupuestoWeb(){
    let presupuesto = prompt('Introduce un presupuesto nuevo');
    presupuesto = parseInt(presupuesto);

    gp.actualizarPresupuesto(presupuesto);

    repintar();
}

function nuevoGastoWeb(){
    let descripcion = prompt('Introduce la descripción del gasto');
    let valor = prompt('Introduce el valor del gasto');
    let fecha = prompt('Introduce la fecha del gasto');
    let etiquetas = prompt('Introduce las etiquetas');

    valor = parseFloat(valor);
    etiquetas = etiquetas.split(',');

    let gasto1 = new gp.CrearGasto(descripcion, valor, fecha, etiquetas);

    gp.anyadirGasto(gasto1);

    repintar();
}

// FORMULARIO

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");

    let final = document.getElementById("controlesprincipales");

    final.append(formulario);

    document.getElementById("anyadirgasto-formulario").disabled = true;

    let enviar = new enviarGastoHandle();

    formulario.addEventListener("submit", enviar);

    let cancelar = new cancelarGastoHandle();

    let btnCancelar = formulario.querySelector("button.cancelar");
    btnCancelar.addEventListener("click", cancelar);

    let btnEnviarAPI = formulario.querySelector("button.gasto-enviar-api");
    btnEnviarAPI.addEventListener("click", enviarAPIHandle);
}

function enviarGastoHandle(){
    this.handleEvent = function(e){
        e.preventDefault();
        
        let form = e.currentTarget;
        let desc = form.elements.descripcion.value;
       let val = form.elements.valor.value;
       let fech = form.elements.fecha.value;
       let etiq = form.elements.etiquetas.value;

       val = parseFloat(val);
       etiq = etiq.split(',');

       let gasto1 = new gp.CrearGasto(desc, val, fech, etiq);

       gp.anyadirGasto(gasto1);

       document.getElementById("anyadirgasto-formulario").disabled = false;

       repintar();
    }
}

function cancelarGastoHandle(){
    this.handleEvent = function(e){

        e.currentTarget.parentNode.remove();
        document.getElementById("anyadirgasto-formulario").removeAttribute('disabled');

        repintar();      
    }
}

function EditarHandle(){

    this.handleEvent = function(e){
       //Pedir datos al usuario
       let desc = prompt("Introduce la descripción nueva", this.gasto.descripcion);
       let val = prompt("Introduce el valor nuevo", this.gasto.valor);
       let fech = prompt("Introduce la fecha nueva", this.gasto.fecha);
       let etiq = prompt("Inroduce las etiquetas nuevas", this.gasto.etiquetas);

       val = parseFloat(val);
       etiq = etiq.split(',');

       this.gasto.actualizarDescripcion(desc);
       this.gasto.actualizarValor(val);
       this.gasto.actualizarFecha(fech);
       this.gasto.anyadirEtiquetas(...etiq);

       repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function(e){

        gp.borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(e){

        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
}

function EditarHandleFormulario(){
    this.handleEvent = function(e){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");

        let final = e.currentTarget; //el botón pulsado

        final.after(formulario); //Añadir el formulario debajo del botón

        final.disabled = true;

        /***** Valores formulario por defecto ****/
        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10); //Para que salga bien en el input tipo fecha
        formulario.elements.etiquetas.value = this.gasto.etiquetas;
    
        let enviar = new SubmitHandleGasto();
        enviar.gasto = this.gasto;
    
        formulario.addEventListener("submit", enviar);
    
        let cancelar = new cancelarGastoHandle();
    
        let btnCancelar = formulario.querySelector("button.cancelar");
        btnCancelar.addEventListener("click", cancelar);

        /**/
        let actualizarAPI = new ActualizarAPIHandle();
        actualizarAPI.gasto = this.gasto;
        let btnActualizarAPI = formulario.querySelector("button.gasto-enviar-api");
        btnActualizarAPI.addEventListener("click", actualizarAPI);

    }
}

function SubmitHandleGasto(){
    this.handleEvent = function(e){
        e.preventDefault();
        
        let form = e.currentTarget;
        let desc = form.elements.descripcion.value;
       let val = form.elements.valor.value;
       let fech = form.elements.fecha.value;
       let etiq = form.elements.etiquetas.value;

       val = parseFloat(val);
       etiq = etiq.split(',');

       this.gasto.actualizarDescripcion(desc);
       this.gasto.actualizarValor(val);
       this.gasto.actualizarFecha(fech);
       this.gasto.anyadirEtiquetas(...etiq);

       repintar();
    }
}

function filtrarGastosWeb(){
    this.handleEvent = function(e){
        e.preventDefault();
        
        let form = e.currentTarget;
        let desc = form.elements['formulario-filtrado-descripcion'].value;
        let vMinimo = form.elements['formulario-filtrado-valor-minimo'].value;
        let vMaximo = form.elements['formulario-filtrado-valor-maximo'].value;
        let fDesde = form.elements['formulario-filtrado-fecha-desde'].value;
        let fHasta = form.elements['formulario-filtrado-fecha-hasta'].value;
        let etiq = form.elements['formulario-filtrado-etiquetas-tiene'].value;

        vMinimo = parseFloat(vMinimo);
        vMaximo = parseFloat(vMaximo);

        if(etiq != null){
            etiq = gp.transformarListadoEtiquetas(etiq);
        }

        let filtro = {
            etiquetasTiene: etiq,
            fechaDesde: fDesde,
            fechaHasta: fHasta,
            valorMinimo: vMinimo,
            valorMaximo: vMaximo,
            descripcionContiene: desc,
        }

        let gastosFiltro = gp.filtrarGastos(filtro);

        console.log(gastosFiltro);

        //Borramos todos los gastos
        let lista = document.getElementById('listado-gastos-completo');

        lista.innerHTML = '';

        //Otras opciones para borrar los gastos
        /*
        while(lista.firstChild){
            lista.removeChild(lista.firstChild);
        }

        document.querySelectorAll(".gasto").forEach(el => el.remove());
        */

        for(let gasto of gastosFiltro){
            mostrarGastoWeb("listado-gastos-completo", gasto);
        }

    }
}

function guardarGastosWeb(){
    localStorage.GestorGastosDWEC = JSON.stringify(gp.listarGastos());
}

function cargarGastosWeb(){
    let gastosLS;
    
    if(localStorage.getItem('GestorGastosDWEC')){
        gastosLS = JSON.parse(localStorage.getItem('GestorGastosDWEC'));   
    }else{
        gastosLS = [];
    }

    gp.cargarGastos(gastosLS);

    repintar();
}

function cargarGastosApi(){
    let nombreUsuario = document.getElementById('nombre_usuario').value;

    if(nombreUsuario != ''){
        let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;

        fetch(url, {
            method: "GET",
        })
        .then(response => response.json())
        .then(function(gastosAPI){
            gp.cargarGastos(gastosAPI);
    
            repintar();
        })
        .catch(err => alert(err));
    }else{
        alert('No has introducido un nombre de usuario');
    }

}

function BorrarAPIHandle(){
    this.handleEvent = function(e){
        let nombreUsuario = document.getElementById('nombre_usuario').value;

        if(nombreUsuario != ''){
            let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.gastoId}`;

            fetch(url, {
                method: "DELETE",
            })
            .then(function(response){
                if(!response.ok){
                    alert("Error "+response.status+": en la API no hay ningún gasto con ese id");
                }else{
                    alert("Gasto borrado correctamente");
                    cargarGastosApi();
                }
            })
            .catch(err => alert(err));
    
        }else{
            alert('No has introducido un nombre de usuario');
        }

        
    }
}

function enviarAPIHandle(){

    let nombreUsuario = document.getElementById('nombre_usuario').value;

    if(nombreUsuario != ''){
        let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;

        var form = document.querySelector("#controlesprincipales form");
        let desc = form.elements.descripcion.value;
        let val = form.elements.valor.value;
        let fech = form.elements.fecha.value;
        let etiq = form.elements.etiquetas.value;

        val = parseFloat(val);
        etiq = etiq.split(',');

        let gastoAPI = {
            descripcion: desc,
            valor: val,
            fecha: fech,
            etiquetas: etiq
        };

        fetch(url, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(gastoAPI)
        })
        .then(function(response){
            if(!response.ok){
                alert("Error "+response.status+": no se ha podido crear el gasto en la API");
            }else{
                alert("Gasto creado correctamente");
                cargarGastosApi();
            }
        })
        .catch(err => alert(err));         

    }else{
        alert('No has introducido un nombre de usuario');
    }

}

function ActualizarAPIHandle(){
    this.handleEvent = function(e){
        let nombreUsuario = document.getElementById('nombre_usuario').value;

        if(nombreUsuario != ''){
            let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.gastoId}`;

            var form = document.querySelector(".gasto form");
            let desc = form.elements.descripcion.value;
            let val = form.elements.valor.value;
            let fech = form.elements.fecha.value;
            let etiq = form.elements.etiquetas.value;
    
            val = parseFloat(val);
            etiq = etiq.split(',');
    
            let gastoAPI = {
                descripcion: desc,
                valor: val,
                fecha: fech,
                etiquetas: etiq
            };

            fetch(url, {
                method: "PUT",
                headers:{
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(gastoAPI)
            })
            .then(function(response){
                if(!response.ok){
                    alert("Error "+response.status+": no se ha podido actualizar el gasto de la API");
                }else{
                    alert("Gasto actualizado correctamente");
                    cargarGastosApi();
                }
            })
            .catch(err => alert(err));
    
        }else{
            alert('No has introducido un nombre de usuario');
        }
    }
}


export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}