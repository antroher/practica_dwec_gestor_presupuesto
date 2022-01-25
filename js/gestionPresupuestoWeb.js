//Ejemplo detallado de como hacer la práctica: https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley


import * as gestionPresupuesto from './gestionPresupuesto.js';



function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elemento.appendChild(p);
}


function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento);
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    elemento.append(divGasto);
    divGasto.innerHTML += 
    `
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${gasto.fecha}</div> 
        <div class="gasto-valor">${gasto.valor}</div> 
    `;
                        
    let gastoEtiquetas = document.createElement("div");
    gastoEtiquetas.className = "gasto-etiquetas";
    divGasto.append(gastoEtiquetas);

    for (let etiq of gasto.etiquetas) {
        
        let nuevoObjEtiqueta = new BorrarEtiquetasHandle(); 
        nuevoObjEtiqueta.gasto = gasto;

        
        let gastoEtiqueta = document.createElement("span");
        gastoEtiqueta.className = "gasto-etiquetas-etiqueta";
        gastoEtiqueta.innerHTML = etiq + "<br>";
        nuevoObjEtiqueta.etiqueta = etiq;

        
        gastoEtiquetas.append(gastoEtiqueta);

       
        gastoEtiqueta.addEventListener('click',nuevoObjEtiqueta);
    }

    let buttonEdit = document.createElement("button");
                        buttonEdit.className += 'gasto-editar'
                        buttonEdit.textContent = "Editar";
                        buttonEdit.type = 'button';

    let buttonBorr = document.createElement("button");
                        buttonBorr.className += 'gasto-borrar'
                        buttonBorr.textContent = "Borrar";
                        buttonBorr.type = 'button';

    let edit = new EditarHandle();
    let delet = new BorrarHandle();
    edit.gasto = gasto;
    delet.gasto = gasto;
    
    buttonEdit.addEventListener('click', edit);
    buttonBorr.addEventListener('click', delet);
  
    
    divGasto.append(buttonEdit);
    divGasto.append(buttonBorr);

    let btnBorrarGastoApi = document.createElement("button");
    btnBorrarGastoApi.className += 'gasto-borrar-api';
    btnBorrarGastoApi.textContent = 'Borrar (API)';
    btnBorrarGastoApi.type = 'button';

    let objBorrarGastoApi = new GastoBorrarApiHandle();
    objBorrarGastoApi.gasto = gasto;
    btnBorrarGastoApi.addEventListener('click', objBorrarGastoApi); 

    divGasto.append(btnBorrarGastoApi);

   
    let btnEditGastoForm = document.createElement("button");
                            btnEditGastoForm.className += 'gasto-editar-formulario';
                            btnEditGastoForm.textContent = 'Editar (formulario)';
                            btnEditGastoForm.type = 'button';

    let editForm = new EditarHandleformulario();
    editForm.gasto = gasto;
    
    btnEditGastoForm.addEventListener('click', editForm);
    
    divGasto.append(btnEditGastoForm);  
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    var divP = document.getElementById(idElemento);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";
    const elemento = document.getElementById(idElemento);
    let data = ""
    for (let [key, value] of Object.entries(agrup)) {
        data += `
        <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${key}</span>
            <span class="agrupacion-dato-valor">${value}</span>
        </div>`
    };
    elemento.innerHTML += 
    `
    <div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${data}
    `

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

function repintar() {
    document.getElementById("presupuesto").innerHTML = "";
    document.getElementById("gastos-totales").innerHTML = "";
    document.getElementById("balance-total").innerHTML = "";
    
    let mostrar = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId( "presupuesto",mostrar);
    
    let gastoTotal = gestionPresupuesto.calcularTotalGastos().toFixed(2);
    mostrarDatoEnId( "gastos-totales",gastoTotal);
    
    let balanceTotal = gestionPresupuesto.calcularBalance().toFixed(2);
    mostrarDatoEnId("balance-total",balanceTotal);
    
    document.getElementById("listado-gastos-completo").innerHTML = "";
    
    
    
    let listaGasto = gestionPresupuesto.listarGastos();
    for (const gasto of listaGasto) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }

    let dia = "dia";
    let diaGasto = gestionPresupuesto.agruparGastos(dia);
    mostrarGastosAgrupadosWeb("agrupacion-dia", diaGasto, "día");

    let mes = "mes";
    let mesGasto = gestionPresupuesto.agruparGastos(mes);
    mostrarGastosAgrupadosWeb("agrupacion-mes", mesGasto, "mes");

    let anyo = "anyo";
    let anyoGasto = gestionPresupuesto.agruparGastos(anyo);
    mostrarGastosAgrupadosWeb("agrupacion-anyo", anyoGasto, "año");
}

function actualizarPresupuestoWeb() {
    let presupuesto = parseFloat(prompt("Introduzca un presupuesto: "))
    gestionPresupuesto.actualizarPresupuesto(presupuesto);

    repintar();
}

function nuevoGastoWeb(){
    let descripcion = prompt("Escribe la descripción del gasto");
    let valor1 = parseFloat(prompt("Escribe el valor del gasto"));
    let fecha = prompt("Escribe la fecha del gasto en formato yyyy-mm-dd");
    let etiquetas = prompt("Escribe las etiquetas del gasto separadas por ,");
    let etiquetasArray= etiquetas.split(',');
    let gastoAnyadido = new gestionPresupuesto.CrearGasto(descripcion,valor1,fecha,...etiquetasArray);
    gestionPresupuesto.anyadirGasto(gastoAnyadido);
    repintar();
  }



function EditarHandle() {
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

function BorrarHandle() {
    this.handleEvent = function (event){
      let number = this.gasto.id;
      gestionPresupuesto.borrarGasto(number);
      repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function (event){
    this.gasto.borrarEtiquetas(this.etiqueta);
    repintar();
   }
}

function nuevoGastoWebFormulario() {
    
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector("form");
    let divControlesPrincipales = document.getElementById("controlesprincipales")
    divControlesPrincipales.appendChild(formulario);
    let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");
    
    
    let enviarObj = new EnviarGastoFormHandle();
    formulario.addEventListener('submit', enviarObj);
    
    let cancelarObj = new CancelarFormHandle();
    let btnCancelar = formulario.querySelector("button.cancelar");
    btnCancelar.addEventListener("click", cancelarObj);
}


function CancelarFormHandle() {
    this.handleEvent = function (event){
        event.currentTarget.parentNode.remove();
        let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
        repintar();
    }
}



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

function EnviarGastoFormHandle(){
    this.handleEvent = function(e){
        e.preventDefault();
         let formulario = e.currentTarget;
         let descripcion = formulario.elements.descripcion.value;
         let valor = parseFloat(formulario.elements.valor.value);
         let fecha = formulario.elements.fecha.value;
         let etiquetas = formulario.elements.etiquetas.value;
        let gastoNuevo = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas);
        gestionPresupuesto.anyadirGasto(gastoNuevo);
        repintar();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}


function EditarHandleformulario() {
    this.handleEvent = function (event){

        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
        var formulario = plantillaFormulario.querySelector("form");
        
        let divControlesPrincipales = document.getElementById("controlesprincipales")
        divControlesPrincipales.appendChild(formulario);
        
        let btnEditarFormulario = event.currentTarget;
        btnEditarFormulario.appendChild(formulario);
        formulario.elements.descripcion.value  = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        
        let EditarFormHandle1 = new EnviarHandle();
        EditarFormHandle1.gasto = this.gasto;
        formulario.addEventListener('submit', EditarFormHandle1);
        
        let btnCancelar = formulario.querySelector("button.cancelar");
        let cancelarObj = new CancelarFormHandle();
        btnCancelar.addEventListener("click", cancelarObj);

      
        btnEditarFormulario.setAttribute("disabled", "");
    }
}

function filtrarGastosWeb() {
    this.handleEvent = function(event) {
        event.preventDefault();
        let formulario = event.currentTarget;
        let descr = formulario.elements["formulario-filtrado-descripcion"].value;
        let minVal = parseFloat(formulario.elements["formulario-filtrado-valor-minimo"].value);
        let maxVal = parseFloat(formulario.elements["formulario-filtrado-valor-maximo"].value);
        let fechaDesde1 = formulario.elements["formulario-filtrado-fecha-desde"].value;
        let fechaHasta1 = formulario.elements["formulario-filtrado-fecha-hasta"].value;
        let etiq = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;
        
        if (etiq !== undefined) {
            etiq = gestionPresupuesto.transformarListadoEtiquetas(etiq);
        }
        let gastosFilter = ({fechaDesde : fechaDesde1, fechaHasta : fechaHasta1, valorMinimo : minVal, valorMaximo : maxVal, descripcionContiene : descr, etiquetasTiene : etiq});
        let gastosFiltradosForm = gestionPresupuesto.filtrarGastos(gastosFilter);
        document.getElementById("listado-gastos-completo").innerHTML = " ";
        for (let gastoForm of gastosFiltradosForm) {
            mostrarGastoWeb("listado-gastos-completo", gastoForm);
        }
    }
}

function guardarGastosWeb() {
    this.handleEvent = function(event) {
        let listadoGastos = gestionPresupuesto.listarGastos();
        localStorage.GestorGastosDWEC = JSON.stringify(listadoGastos);
    }
}

function cargarGastosWeb() {
    this.handleEvent = function(event) {
        if (localStorage.GestorGastosDWEC == null) 
            gestionPresupuesto.cargarGastos([]);
        else 
            gestionPresupuesto.cargarGastos(JSON.parse(localStorage.GestorGastosDWEC));
        repintar();    
    }
}

function cargarGastosApi() {
    let nombre = document.querySelector("#nombre_usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombre}`;

    if (nombre != '') {
        fetch(url, {method: 'GET'})
        .then(respuesta => respuesta.json())
        .then((result) => {
            let resultado = result;
            if(resultado == '') {
                console.log("No existe gastos en la API de ese usuario")
            } else {
                gestionPresupuesto.cargarGastos(resultado);
                console.log("cargando los gastos de la API")
                repintar();
            }
        })
        .catch(error => console.error(error));
    }
   
}

function GastoBorrarApiHandle() {
    this.handleEvent = function(event){
        let nombre = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombre}/${this.gasto.gastoId}`;
        
        if(nombre != "") {
        fetch(url, {method: 'DELETE'})
        .then(response => response.json())
        .then(datos => {
            if(!datos.errorMessage){
                cargarGastosApi();
            }
            else{
                console.log(datos.errorMessage);
            }
        })
        .catch(error => console.error(error));
    }
}
}

function GastoEnviarApiHandle(event) {
    let nombre = document.getElementById("nombre_usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombre}`;

    let formulario = event.currentTarget.form;
    let newdescripcion = formulario.elements.descripcion.value;
    let newvalor = formulario.elements.valor.value;
    let newfecha = formulario.elements.fecha.value;
    let newetiquetas = formulario.elements.fecha.value;

    newvalor = parseFloat(newvalor);
    newetiquetas = etiquetas.split(",");

    let newObjeto = {
        descripcion: newdescripcion,
        fecha: newfecha,
        valor: newvalor,
        etiquetas: newetiquetas
    }

    if(nombre != "") {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(newObjeto),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(response.ok){
                cargarGastosApi();
            }
            else{
                console.log("Error al añadir");
            }
        })
        .catch(error => console.error(error));
    }
}

function GastoEditarApi(){
    this.handleEvent = function(event){
        let nombre = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;
        
        let formulario = event.currentTarget.form;
        let newdescripcion = formulario.elements.descripcion.value;
        let newvalor = formulario.elements.valor.value;
        let newfecha = formulario.elements.fecha.value;
        let newetiquetas = formulario.elements.fecha.value;
    
        newvalor = parseFloat(newvalor);
        newetiquetas = etiquetas.split(",");

        let newObjeto = {
        descripcion: newdescripcion,
        fecha: newfecha,
        valor: newvalor,
        etiquetas: newetiquetas
    }

    if(nombre != "") {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(newObjeto),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(response.ok){
                cargarGastosApi();
            }
            else{
                console.log("Error al editar");
            }
        })
        .catch(error => console.error(error));
    }
    }
}

//Botones
const actualizarpresupuesto = document.getElementById("actualizarpresupuesto");
const anyadirgasto = document.getElementById("anyadirgasto");
const anyadirgastoFirmulario = document.getElementById("anyadirgasto-formulario");
const formularioFiltrador = document.getElementById("formulario-filtrado");
const btnGuardarGastos = document.getElementById("guardar-gastos");
const btnCargarGastos = document.getElementById("cargar-gastos");
const btncargarGastosApi = document.getElementById("cargar-gastos-api");
//Eventos
actualizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);
anyadirgasto.addEventListener('click', nuevoGastoWeb);
anyadirgastoFirmulario.addEventListener('click', nuevoGastoWebFormulario)
//Al tener que trabajar con el propio nodo que manifiesta el evento deberemos crear un objeto manejador... o eso creo yo despúes de 3 horas sin saber que falla jeje
let filtGastForm = new filtrarGastosWeb();
formularioFiltrador.addEventListener('submit', filtGastForm);

//Práctica 8
let objGuardarGastosWeb = new guardarGastosWeb();
let objCargarGastosWeb = new cargarGastosWeb();
//let objcargarGastosApi = new cargarGastosApi();
btnGuardarGastos.addEventListener('click', objGuardarGastosWeb);
btnCargarGastos.addEventListener('click', objCargarGastosWeb);
btncargarGastosApi.addEventListener("click", cargarGastosApi);

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
