import * as GesPresu from "./gestionPresupuesto.js";

//Eventos
document.getElementById("actualizarpresupuesto").addEventListener('click', actualizarPresupuestoWeb);
// button.addEventListener("click",actualizarPresupuestoWeb) otra opción
document.getElementById("anyadirgasto").addEventListener("click",nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click",nuevoGastoWebFormulario);
document.getElementById("formulario-filtrado").addEventListener('submit', filtrarGastoWeb);
document.getElementById("guardar-gastos").addEventListener("click", guardarGastosWeb)
document.getElementById("cargar-gastos").addEventListener("click", cargarGastosWeb);
document.getElementById("cargar-gastos-api").addEventListener("click", cargarGastosApi)

var id = 0;

function mostrarDatoEnId(idElemento,valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML = `<p>${valor}</p>`;  
}

function mostrarGastoWeb(idElemento,gastos){

    gastos.forEach((gasto) =>{
        let element = document.getElementById(idElemento);
        let elGasto = document.createElement("div");
        elGasto.className = "gasto";
        elGasto.setAttribute("id",`gasto-${gasto.id}`)
        element.append(elGasto);

        elGasto.innerHTML +=`
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${new Date(gasto.fecha).toLocaleString()}</div> 
        <div class="gasto-valor">${gasto.valor}</div>
         `

       let etiGasto = document.createElement("div")
       etiGasto.className = "gasto-etiquetas";
       elGasto.append(etiGasto);

       for(let etiqueta of gasto.etiquetas){
           let newEtiqueta = new BorrarEtiquetasHandle();
           newEtiqueta.gasto = gasto;

           let gastEtiqueta = document.createElement("span");
           gastEtiqueta.className = "gasto-etiquetas-etiqueta";
           gastEtiqueta.textContent = etiqueta + " ";
           newEtiqueta.etiqueta = etiqueta;
           etiGasto.append(gastEtiqueta);
           gastEtiqueta.addEventListener("click",newEtiqueta);
       }

       //Para que solo ponga el boton el listado de gastos
       if (idElemento === "listado-gastos-completo") {
        let btnEdit = document.createElement("button");
        btnEdit.className += 'gasto-editar'
        btnEdit.textContent = "Editar";
        btnEdit.type = 'button';

        let btnBorrar = document.createElement("button");
        btnBorrar.className += 'gasto-borrar'
        btnBorrar.textContent = "Borrar";
        btnBorrar.type = 'button';

        let btnEditGastos = document.createElement("button");
        btnEditGastos.className += 'gasto-editar-formulario'
        btnEditGastos.textContent = "Editar(formulario)";
        btnEditGastos.type = 'button';
        btnEditGastos.setAttribute("id",`gasto-editar-formulario-${gasto.id}`);

        let buttonAPIDelete = document.createElement("button");
        buttonAPIDelete.className = 'gasto-borrar-api'
        buttonAPIDelete.textContent = 'Borrar (API)';
        buttonAPIDelete.type = 'button';

        //Sepacion de gastos, me la ha enseñado javi xd ya que nadie me lo enseña jaja salu2

        let divSeparador = document.createElement('div');
        divSeparador.className = 'salto';
        divSeparador.textContent = "------------------------------"
        
        //manejador de eventos
        let editar = new EditarHandle();
        let borrar = new BorrarHandle();
        let editarform = new EditarHandleFormulario();
        let deleteApiEvent = new deleteApiHandle();

        editar.gasto = gasto;
        borrar.gasto = gasto;
        editarform.gasto = gasto;
        deleteApiEvent.gasto = gasto;
        

          //asignas el eventol
        btnEdit.addEventListener('click',editar);
        btnBorrar.addEventListener('click',borrar);
        btnEditGastos.addEventListener('click',editarform);
        buttonAPIDelete.addEventListener('click', deleteApiEvent);       

          //metes el boton en el html
        elGasto.append(btnEdit);
        elGasto.append(btnBorrar);
        elGasto.append(btnEditGastos);
        elGasto.append(buttonAPIDelete);
        elGasto.append(divSeparador);
       }

    })
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let elemento = document.getElementById(idElemento);
    let gastos = [];
    elemento.innerHTML = "";
    
    for(let [propiedad,valor] of Object.entries(agrup)){
        gastos +=
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${propiedad}</span>
            <span class="agrupacion-dato-valor">${valor}</span>
        </div>`;
    }
    elemento.innerHTML += 
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${gastos}
    </div>`
    
    // Estilos
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
elemento.append(chart);
}
function repintar(){
    mostrarDatoEnId("presupuesto",GesPresu.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales",GesPresu.calcularTotalGastos());
    mostrarDatoEnId("balance-total",GesPresu.calcularBalance());
    document.getElementById("listado-gastos-completo").innerHTML = "";//borra el listado-gastos-comp                
    mostrarGastoWeb("listado-gastos-completo",GesPresu.listarGastos());
    mostrarGastosAgrupadosWeb("agrupacion-anyo",GesPresu.agruparGastos("anyo"),"año");
    mostrarGastosAgrupadosWeb("agrupacion-mes",GesPresu.agruparGastos("mes"),"mes");
    mostrarGastosAgrupadosWeb("agrupacion-dia",GesPresu.agruparGastos("dia"),"día");
}

function actualizarPresupuestoWeb()
{
    let prestu = parseFloat(prompt("Introduzca un presupuesto"));
    GesPresu.actualizarPresupuesto(prestu);   
    repintar();
}

function nuevoGastoWeb()
{       
    let descripcion = prompt("Ponga una nueva decripción al objeto");
    let valor = parseFloat(prompt("Ponga un nuevo valor al objeto"));
    let fecha = Date.parse(prompt("Ponga una nueva fecha"));
    let etiquetas = prompt("Ponga nuevas etiqeutas");

    let arrayetiquetas = etiquetas.split(",");
    let gasto = new GesPresu.CrearGasto(descripcion,valor,fecha,arrayetiquetas);
    GesPresu.anyadirGasto(gasto);
    repintar();
}

function EditarHandle(){
    this.handleEvent = function() {
        //Pedir al usuario que quiere cambiar
        let descripcion = prompt("Introduzca la descripción nueva: ");
        let valor = parseFloat(prompt("Introduzca el valor nuevo: "));
        let fecha = Date.parse(prompt("Introduzca la fecha nueva: "));

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);

        let etiquetas = prompt("Introduzca las nuevas etiquetas separadas por , : ");

        if(typeof etiquetas != "undefined" ) {
            this.gasto.anyadirEtiquetas(etiquetas.split(','))
        }

        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function() {
        //Borra gasto
        GesPresu.borrarGasto(this.gasto.id);

        repintar();
    }
 }

 function BorrarEtiquetasHandle() {
    this.handleEvent = function() {
        //Borra etiqueta
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }}
function nuevoGastoWebFormulario(){
    let form = document.getElementById("formulario-template").content.cloneNode(true).querySelector("form");                
    document.getElementById("controlesprincipales").append(form);

    //cancelar el botón una vez lo pulsamos
    document.getElementById("anyadirgasto-formulario").disabled = true;
    //evento boton enviar
    let submitEvent = new submitHandle();
    form.addEventListener('submit', submitEvent);
    //evento botón cancelar
    let cancelarEvent = new cancelarHandle();
    cancelarEvent.formulario = form;
    form.querySelector("button[class='cancelar']").addEventListener('click', cancelarEvent);

    let createGastoEvent = new PostHandle();
    createGastoEvent.formulario = form;
    form.querySelector("button[class='gasto-enviar-api']").addEventListener('click', createGastoEvent);
}

function submitHandle(){
    this.handleEvent = function(event) {
        //Prevenir el efecto por defecto del formulario.
        event.preventDefault();
    //ahora recoges datitos de tu formulario
    let descripcion = event.currentTarget.descripcion.value;
    let valor = parseFloat(event.currentTarget.valor.value);
    let fecha = event.currentTarget.fecha.value;
    let etiquetas = event.currentTarget.etiquetas.value;

    //separar las etiquetas si las hubiera
    if (typeof etiquetas !== 'undefined') {
        etiquetas = etiquetas.split(",");
    } 
    //Crear gasto con los datos que has recogido anteriormente
    let gasto = new GesPresu.CrearGasto(descripcion, valor, fecha, etiquetas);
    //y añadir el gasto
    GesPresu.anyadirGasto(gasto);
    repintar();
    //ahora borrar el formulario
    event.currentTarget.remove();
    //poner el botón de añadir los gastos otra vez
    document.getElementById("anyadirgasto-formulario").disabled = false;
}}
function cancelarHandle(){
    this.handleEvent = function(event){
        this.formulario.remove();
        //esto elimina el formulario
        //y añadimos el botón de añadir los gastos otra vez
        document.getElementById("anyadirgasto-formulario").disabled = false;
    }
}
function EditarHandleFormulario() {
    this.handleEvent = function(event) {
        //Clonación y creación del formulario por  el template "plantilla"
        let form = document.getElementById("formulario-template").content.cloneNode(true).querySelector("form");             
        document.getElementById(`gasto-${this.gasto.id}`).append(form);//esto ahce que al hacerse el                

        //Deshabilitar el boton de editar gasto.
        document.getElementById(`gasto-editar-formulario-${this.gasto.id}`).disabled = true;

        //Recogida y representación de datos del gasto en el formulario.
        form.descripcion.value = this.gasto.descripcion;
        form.valor.value = this.gasto.valor;

        //Recogida y representación de la fecha del gasto.
        let fecha = new Date(this.gasto.fecha);
        let fechaFormateda = fecha.toISOString().substring(0,10);
        form.fecha.value = fechaFormateda;

        //Recogida y representacion de las etiquetas del gasto.
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

        //Creación del objeto manejador de eventos del boton cancelar.
        let cancelarEvent = new cancelarEditHandle();
        cancelarEvent.formulario = form;
        cancelarEvent.gasto = this.gasto;
        form.querySelector("button[class='cancelar']").addEventListener('click', cancelarEvent);

        //Creación del objeto manejador de eventos del boton enviar.
        let submitEvent = new submitEditHandle();
        submitEvent.gasto = this.gasto;
        form.addEventListener('submit', submitEvent);

        let editApiEvent = new editApiHandle();
        editApiEvent.formulario = form;
        editApiEvent.gasto = this.gasto;
        form.querySelector("button[class='gasto-enviar-api']").addEventListener('click', editApiEvent);
}}
function submitEditHandle () {
    this.handleEvent = function(event) {
        event.preventDefault();
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
function cancelarEditHandle () {
    this.handleEvent = function() {
        //Borrar formulario
        this.formulario.remove();

        //habilitar botón gasto
        document.getElementById(`gasto-editar-formulario-${this.gasto.id}`).disabled = false;
    }
}

function filtrarGastoWeb () {
    //Prevenir el evento por defecto.
    event.preventDefault();

    //Recogida de datos del formulario.
    let form = document.getElementById("formulario-filtrado")
    let filterDescription = form.elements["formulario-filtrado-descripcion"].value;
    let filterMinValue = parseFloat(form.elements["formulario-filtrado-valor-minimo"].value);
    let filterMaxValue = parseFloat(form.elements["formulario-filtrado-valor-maximo"].value);
    let filterFromDate = form.elements["formulario-filtrado-fecha-desde"].value;
    let filterUntilDate = form.elements["formulario-filtrado-fecha-hasta"].value;
    let filterContainTags = form.elements["formulario-filtrado-etiquetas-tiene"].value;

    //Si las etiquetas estan vacias diremos que las etiquetas estan "undefined".
    if (filterContainTags === "") {
        filterContainTags = [];
    }

    //Creación del objeto a filtrar.
    let filtro = {
        descripcionContiene: (filterDescription === "") ? undefined : filterDescription,
        valorMinimo: (isNaN(filterMinValue)) ? undefined : filterMinValue,
        valorMaximo: (isNaN(filterMaxValue)) ? undefined : filterMaxValue,
        fechaDesde: (filterFromDate === "") ? undefined : filterFromDate,
        fechaHasta: (filterUntilDate === "") ? undefined : filterUntilDate,
        etiquetasTiene: (filterContainTags.length === 0) ? [] : GesPresu.transformarListadoEtiquetas(filterContainTags)  
    }

    console.log(filtro)
    //Realización de la transformación de las etiquetas.
    

    //Filtrado de gastos.
    let gastosFiltrados = GesPresu.filtrarGastos(filtro);

    console.log(gastosFiltrados)
    //Borrado del listado de gastos para mostrar los gastos filtrados.
    document.getElementById("listado-gastos-completo").innerHTML = "";

    //Mostrar los gastos filtrados en el div "listado-gastos-completo".
    
    mostrarGastoWeb("listado-gastos-completo", gastosFiltrados);    
    
}

function guardarGastosWeb(){
    localStorage.GestorGastosDWEC = JSON.stringify(GesPresu.listarGastos());
}

function cargarGastosWeb(){
    let newListadogasto = JSON.parse(localStorage.getItem("GestorGastosDWEC"));

    if(newListadogasto !== null){
        GesPresu.cargarGastos(newListadogasto);
    }
    else{
        GesPresu.cargarGastos([]);
    }

    repintar();
}

function PostHandle(){
    this.handleEvent = async function(){
        let usu = document.getElementById("nombre_usuario").value
        
        let gasto = {
            descripcion: this.formulario.descripcion.value,
            valor: this.formulario.valor.value,
            fecha: this.formulario.fecha.value,
            etiquetas: (typeof this.formulario.etiquetas.value !== "undefined") ? this.formulario.etiquetas.value.split(",") : undefined,
            id: id
        }

        let response = await fetch(
            `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usu}`,{
                method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(gasto)
            });

            if(response.ok){
                id++;
                cargarGastosApi();
            }
        }   
}

function editApiHandle() {
    this.handleEvent = async function() {
        let usu = document.getElementById("nombre_usuario").value    

        let gasto = {
            descripcion: this.formulario.descripcion.value,
            valor: this.formulario.valor.value,
            fecha: this.formulario.fecha.value,
            etiquetas: (typeof this.formulario.etiquetas.value !== "undefined") ? this.formulario.etiquetas.value.split(",") : undefined,
            id: id
        }

        let response = await fetch(
            `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usu}/${this.gasto.gastoId}`,{
                method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(gasto)
            });

            if(response.ok){
                cargarGastosApi();
            }
            else {
                console.log(`Error de HTTP -> ${response.status}`);
            }
        }
    }

function deleteApiHandle(){
    this.handleEvent = async function() {
        let usu = document.getElementById("nombre_usuario").value    
        
        let response = await fetch(
            `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usu}/${this.gasto.gastoId}`,{
                method: 'DELETE',
            });

            if(response.ok){
                cargarGastosApi();
            }
            else {
                console.log(`Error de HTTP -> ${response.status}`);
            }
        }   
}

async function cargarGastosApi () {
    
    let usu = document.getElementById("nombre_usuario").value    

    let response = await fetch(
        `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usu}`,
        {method: 'GET'})

    if (response.ok) {
        let listaGastoJSON = await response.json();
        GesPresu.cargarGastos(listaGastoJSON);
        repintar();
    }
    else {
        console.log(`Error de HTTP -> ${response.status}`);
    }
}





export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}