"use strict"

import * as GestPres from './gestionPresupuesto.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId (idElemento, valor)
{
    var elem = document.getElementById(idElemento);
    elem.textContent = valor;
}


function mostrarGastoWeb(idElemento,gastos){
    let elem = document.getElementById(idElemento);

    gastos.forEach((gasto) =>{
        let Gasto = document.createElement("div");
        Gasto.className = "gasto";
        Gasto.setAttribute('id', `gasto-${gasto.id}`)
        elem.append(Gasto);

        Gasto.innerHTML +=`
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${new Date(gasto.fecha).toLocaleString()}</div> 
        <div class="gasto-valor">${gasto.valor}</div>
         `

       let EtiqGasto = document.createElement("div")
       EtiqGasto.className = "gasto-etiquetas";
       Gasto.append(EtiqGasto);

       for(let etiqueta of gasto.etiquetas){
           let EtiquetaNueva = new BorrarEtiquetasHandle();
           EtiquetaNueva.gasto = gasto;

           let gastEtiqueta = document.createElement("span");
           gastEtiqueta.className = "gasto-etiquetas-etiqueta";
           gastEtiqueta.textContent = etiqueta + " ";
           EtiquetaNueva.etiqueta = etiqueta;
           EtiqGasto.append(gastEtiqueta);
           gastEtiqueta.addEventListener("click",EtiquetaNueva);
       }

       if (idElemento === "listado-gastos-completo") {
        let botonEditar = document.createElement("button");
        botonEditar.className += 'gasto-editar'
        botonEditar.textContent = "Editar";
        botonEditar.type = 'button';
        
        let botonBorrar = document.createElement("button");
        botonBorrar.className += 'gasto-borrar'
        botonBorrar.textContent = "Borrar";
        botonBorrar.type = 'button';

        let evBorrarAPI = new BorrarAPIHandle();
        evBorrarAPI.gasto = gasto;

        let btnBorrarAPI = document.createElement("button");
        btnBorrarAPI.className = "gasto-borrar-api";
        btnBorrarAPI.type = "button";
        btnBorrarAPI.textContent = "Borrar (API)";

        btnBorrarAPI.addEventListener('click', evBorrarAPI);

        let botonEditarForm = document.createElement("button");
        botonEditarForm.setAttribute('id', `gasto-editar-formulario-${gasto.id}`)
        botonEditarForm.className += 'gasto-editar-formulario';
        botonEditarForm.textContent = "Editar (formulario)";
        botonEditarForm.type = "button";
        
        let editarForm = new EditarHandleFormulario();
        editarForm.gasto = gasto;

        botonEditarForm.addEventListener('click',editarForm);

        let editar = new EditarHandle();
        let borrar = new BorrarHandle();

        editar.gasto = gasto;
        borrar.gasto = gasto;

        botonEditar.addEventListener('click', editar);
        botonBorrar.addEventListener('click', borrar);
              
        Gasto.append(botonEditar);
        Gasto.append(botonBorrar);
        Gasto.append(botonEditarForm);
       }
    })
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    
    var divP = document.getElementById(idElemento);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";

    const elem = document.getElementById(idElemento);
    let datos = ""
    for (let propi in agrup) {
        datos += `
        <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${propi}</span>
            <span class="agrupacion-dato-valor">${agrup[propi]}</span>
        </div>`
    };
    elem.innerHTML += 
    `
    <div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${datos}
    `

    // Estilos
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


//Funcion repintar para actualizar la pagina

function repintar(flagApi)
{
    document.getElementById('presupuesto').innerHTML='';
    mostrarDatoEnId("presupuesto", GestPres.mostrarPresupuesto());

    document.getElementById('gastos-totales').innerHTML='';
    mostrarDatoEnId("gastos-totales", GestPres.calcularTotalGastos());

    document.getElementById('balance-total').innerHTML='';
    mostrarDatoEnId("balance-total", GestPres.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";
     mostrarGastoWeb("listado-gastos-completo", GestPres.listarGastos());

    // Práctica 10
    let pDia = "dia";
    let gastosDia = GestPres.agruparGastos(pDia);
    mostrarGastosAgrupadosWeb("agrupacion-dia",gastosDia, "día");

    let pMes = "mes";
    let gastosMes = GestPres.agruparGastos(pMes);
    mostrarGastosAgrupadosWeb("agrupacion-mes", gastosMes, "mes");

    let pAnyo = "anyo";
    let gastosAnyo = GestPres.agruparGastos(pAnyo);
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAnyo, "año");

    if(flagApi)
    {
        document.getElementById("listado-gastos-filtrado-1").innerHTML = "";
        document.getElementById("listado-gastos-filtrado-2").innerHTML = "";
        document.getElementById("listado-gastos-filtrado-3").innerHTML = "";
        document.getElementById("listado-gastos-filtrado-4").innerHTML = "";
        
    }
}

//Función actualizarPresupuestoWeb y botón actualizarpresupuesto
function actualizarPresupuestoWeb() {
    GestPres.actualizarPresupuesto(parseFloat(prompt("Inserta un presupuesto: ")));
    repintar();
}

//Funcion nuevoGastoWeb
function nuevoGastoWeb(){
    let descripcion = prompt("Inserta una descripción: ");
    let Avalor = parseFloat(prompt("Inserta un valor: "));
    let fecha = Date.parse(prompt("Insertar una fecha: "));
    let etiq = prompt("Insertar etiquetas: ").split(',');

    GestPres.anyadirGasto(new GestPres.CrearGasto(descripcion,Avalor,fecha,etiq));
    repintar();
  }

//EditarHandle
function EditarHandle() {
    this.handleEvent = function (){
        this.gasto.actualizarDescripcion(prompt("Escribe la nueva descripción: "));
        this.gasto.actualizarValor(parseFloat(prompt("Escribe el nuevo valor: ")));
        this.gasto.actualizarFecha(Date.parse(prompt("Escribe la fecha: ")));
        let etiqueta = prompt("Escribe las etiquetas: ");

        if(typeof etiqueta != "undefined"){
            this.gasto.anyadirEtiquetas(etiqueta.split(','))
        }
        repintar();
    }
}

//borrarHandle
function BorrarHandle() {
    this.handleEvent = function (){
      GestPres.borrarGasto(this.gasto.id);

      repintar();
    }
}


//Borrar etiq Handle (BorrarEtiquetasHandle)
function BorrarEtiquetasHandle() {
    this.handleEvent = function (){
    this.gasto.borrarEtiquetas(this.etiqueta);

    repintar();
   }
}

//Funcion nuevoGastoWebFormulario()
function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector("form");

    let controls = document.getElementById("controlesprincipales")
    controls.appendChild(formulario);

    document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");
    let envO = new EnviarGastoHandleFormulario();
    formulario.addEventListener('submit', envO);
    let cancO = new CancelarHandleFormulario();
    let btnCancel = formulario.querySelector("button.cancelar");
    btnCancel.addEventListener("click", cancO);
    let btnEnviarAPI = formulario.querySelector("button.gasto-enviar-api");
    btnEnviarAPI.addEventListener("click", enviarAPIHandle);  
}


//Funcion EditarhandleFormulario
function EditarHandleFormulario()
{
    this.handleEvent = function(event) {
        let form = document.getElementById("formulario-template").content.cloneNode(true).querySelector("form");
        document.getElementById(`gasto-${this.gasto.id}`).append(form);

        document.getElementById(`gasto-editar-formulario-${this.gasto.id}`).disabled = true;

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

        let cancelarEvent = new CancelarHandleFormulario();
        cancelarEvent.formulario = form;
        cancelarEvent.gasto = this.gasto;
        form.querySelector("button[class='cancelar']").addEventListener('click', cancelarEvent);

        let submitEvent = new submitEditHandle();
        submitEvent.gasto = this.gasto;
        form.addEventListener('submit', submitEvent);

        let actualizarAPI = new ActualizarAPIHandle();
        actualizarAPI.gasto = this.gasto;

        let btnActualizarAPI = form.querySelector("button.gasto-enviar-api");
        btnActualizarAPI.addEventListener("click", actualizarAPI);    
    }
}


//Funcion submitEditHandle
function submitEditHandle(){
    this.handleEvent = function (event){
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

//Funcion CancelarHandleFormulario
function CancelarHandleFormulario() {
    this.handleEvent = function (e){
        e.currentTarget.parentNode.remove();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");

        repintar();
    }
}

//Funcion EnviarGastoHandleFormulario

function EnviarGastoHandleFormulario(){
    this.handleEvent = function(event)
    {
        event.preventDefault();
        let formulario = event.currentTarget;
        let descripcion = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value;
        let gastoNuevo = new GestPres.CrearGasto(descripcion, valor, fecha, etiquetas);
        GestPres.anyadirGasto(gastoNuevo);

        repintar();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}

//Práctica 7 -- función filtrarGastosWeb.

function filtrarGastoWeb (){

    event.preventDefault();

    let formulario = document.getElementById("formulario-filtrado");
    let descripcionfiltro = formulario.elements["formulario-filtrado-descripcion"].value;
    let valorMinimofiltro = formulario.elements["formulario-filtrado-valor-minimo"].value;
    let valorMaximofiltro = formulario.elements["formulario-filtrado-valor-maximo"].value;
    let fechaDesdefiltro = formulario.elements["formulario-filtrado-fecha-desde"].value;
    let fechaHastafiltro = formulario.elements["formulario-filtrado-fecha-hasta"].value;
    let etiquetasfiltro = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;

    if(etiquetasfiltro === ""){
        etiquetasfiltro = [];
    }

    let filtrar ={
        descripcionContiene: (descripcionfiltro === "") ? undefined : descripcionfiltro,
        valorMinimo: (valorMinimofiltro === "") ? undefined : parseFloat(valorMinimofiltro),
        valorMaximo:(valorMaximofiltro === "") ? undefined: parseFloat(valorMaximofiltro),
        fechaDesde:(fechaDesdefiltro === "") ? undefined : fechaDesdefiltro,
        fechaHasta: (fechaHastafiltro === "") ? undefined : fechaHastafiltro,
        etiquetasTiene:(etiquetasfiltro.length === 0) ? [] : GestPres.transformarListadoEtiquetas(etiquetasfiltro)
    }
        
    console.log(filtrar)

    let gastosFiltrar = GestPres.filtrarGastos(filtrar);

    console.log(gastosFiltrar)

    document.getElementById("listado-gastos-completo").innerHTML = "";

    mostrarGastoWeb("listado-gastos-completo", gastosFiltrar);
}

//Practica 8
function guardarGastosWeb(){
    localStorage.GestorGastosDWEC = JSON.stringify(GestPres.listarGastos());
}

function cargarGastosWeb(){
    let listGasto = JSON.parse(localStorage.getItem("GestorGastosDWEC"));

    if(listGasto !== null){
        GestPres.cargarGastos(listGasto);
    }
    else{
        GestPres.cargarGastos([]);
    }

    repintar();
}

//Practica 9 

//Funcion ActualizarAPIHandle

function ActualizarAPIHandle()
{
    this.handleEvent = function(e)
    {
        let nomusuario = document.getElementById('nombre_usuario').value;
        let direccion =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

        if(nomusuario != '')
        {
            var form = document.querySelector(".gasto form");
            let descrip = form.elements.descripcion.value;
            let val = form.elements.valor.value;
            let fech = form.elements.fecha.value;
            let etiq = form.elements.etiquetas.value;
            val = parseFloat(val);
            etiq = etiq.split(',');

            let gastoAPI = 
            {
                descripcion: descrip,
                valor: val,
                fecha: fech,
                etiquetas: etiq
            };
            fetch(direccion, {
                method: "PUT",
                headers:
                {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(gastoAPI)
            })

            .then(function(resp)
            {
                if(!resp.ok)
                {
                    alert("Error " + resp.status + ": no se ha actualizado el gasto");
                }else
                {
                    alert("GASTO ACTUALIZADO");
                    cargarGastosApi();
                }
            })
            .catch(err => alert(err));
        }else
        {
            alert('Falta nombre usuario');
        }
    }
}





//Cargar gastos Api
function cargarGastosApi()
{
    let usuario = document.getElementById("nombre_usuario").value;
    let direccion = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;
    
    if (usuario != '')
    {
        fetch(direccion, {
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(function(gastosAPI)
            {
    
                gestionPresupuesto.cargarGastos(gastosAPI);
                repintar();
            })
            .catch(err => alert(err));
    }else{
        alert('Falta nombre usuario');
    }
}




//Funcion BorrarAPIHandle

function BorrarAPIHandle()
{
    this.handleEvent = function(e)
    {
        let usuario = document.getElementById('nombre_usuario').value;
        let direccion =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

        if(usuario != '')
        {
            fetch(direccion, 
            {
                method: "DELETE",
            })
            .then(function(resp)
            {
                if(!resp.ok)
                {
                    alert("Error "+ resp.status +": no existe el id de ese gasto");
                }
                else
                {
                    alert("GASTO BORRADO");
                    cargarGastosApi();
                }
            })
            .catch(err => alert(err));
        }
        else
        {
            alert('Falta nombre usuario');
        }
    }
}
//Funcion enviarAPIHandle

function enviarAPIHandle()
{
    let usuario = document.getElementById('nombre_usuario').value;
    let direccion =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;    

    if(usuario != '')
    {
        var form = document.querySelector("#controlesprincipales form");
        let descrip = form.elements.descripcion.value;
        let val = form.elements.valor.value;
        let fech = form.elements.fecha.value;
        let etiqueta = form.elements.etiquetas.value;

        val = parseFloat(val);
        etiqueta = etiqueta.split(',');

        let gastoAPI =
        {
            descripcion: descrip,
            valor: val,
            fecha: fech,
            etiquetas: etiqueta
        };

        fetch(direccion, {
            method: "POST",
            headers:
            {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(gastoAPI)
    })
    .then(function(resp)
    {
        if(!resp.ok)
        {
            alert("Error "+resp.status+": no se creo el gasto");
        }
        else
        {
            alert("Gasto creado");
            cargarGastosApi();
        }
    })
    .catch(err => alert(err));         
}
    else
    {
        alert('Falta nombre usuario');
    }
}



function EditarGastoApi()
{
    this.handleEvent = function(event)
    {
        let usuario = document.getElementById('nombre_usuario').value;
        let direccion =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

        let formulario = event.currentTarget.form;

        let gastoApi =
        {
            descripcion: formulario.elements.descripcion.value,                
            valor: parseFloat(formulario.elements.valor.value),
            fecha: formulario.elements.fecha.value,
            etiquetas: (formulario.elements.etiquetas.value).split(",")
            
        }
        if(usuario != '')
        {
            console.log("No hay el nombre");
        }
        else 
        {
            fetch(direccion, 
                {
                    method: 'PUT', 
                    headers:{'Content-Type': 'application/json;charset=utf-8'},
                    body: JSON.stringify(gastoApi)
                })
        .then(response =>
        {
            if(!response.ok)
            {
                console.log('Error');
            }
            else
            {
                console.log('gasto actualizado');
                cargarGastosApi();
            }
        })
        .catch(err => console.error(err));
        }        
    }
       
}




//Botones
document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);
document.getElementById("formulario-filtrado").addEventListener("submit", filtrarGastoWeb);
document.getElementById("guardar-gastos").addEventListener("click", guardarGastosWeb);
document.getElementById("cargar-gastos").addEventListener("click", cargarGastosWeb);
// document.getElementById('cargar-gastos-api').addEventListener('click',cargarGastosApi);

export{
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb,
} 
