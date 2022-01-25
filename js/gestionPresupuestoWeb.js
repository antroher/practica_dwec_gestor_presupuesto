import * as gesPres from "./gestionPresupuesto.js";
//Funciones

function mostrarDatoEnId(idElemento, valor) {
    let elem = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elem.appendChild(p);
}

function mostrarGastoWeb(idElemento, gasto) {
    let id = document.getElementById(idElemento);
    let div = document.createElement("div");
    div.className = "gasto";
    id.append(div);        
    div.innerHTML += `<div class="gasto-descripcion">${gasto.descripcion}</div>
                      <div class="gasto-fecha">${gasto.fecha}</div> 
                      <div class="gasto-valor">${gasto.valor}</div>`;
                        
    let etiGas = document.createElement("div");
    etiGas.className = "gasto-etiquetas";
    div.append(etiGas);

    for (let eti of gasto.etiquetas) {
        let newEti = new BorrarEtiquetasHandle(); 
        newEti.gasto = gasto;
        let gastoEtiq = document.createElement("span");
        gastoEtiq.className = "gasto-etiquetas-etiqueta";
        gastoEtiq.innerHTML = eti + "<br>";
        newEti.etiqueta = eti;
        etiGas.append(gastoEtiq);
        gastoEtiq.addEventListener('click',newEti);
    }

    let btnEditar = document.createElement("button");
                     btnEditar.className += 'gasto-editar'
                     btnEditar.textContent = "Editar";
                     btnEditar.type = 'button';

    let btnBorrar = document.createElement("button");
                    btnBorrar.className += 'gasto-borrar'
                    btnBorrar.textContent = "Borrar";
                    btnBorrar.type = 'button';

    let edit = new EditarHandle();
    let dlt = new BorrarHandle();
    edit.gasto = gasto;
    dlt.gasto = gasto;    
    btnEditar.addEventListener('click', edit);
    btnBorrar.addEventListener('click', dlt);
    div.append(btnEditar);
    div.append(btnBorrar);
    let btnApiGastDelete = document.createElement("button");
                            btnApiGastDelete.className += 'gasto-borrar-api';
                            btnApiGastDelete.textContent = 'Borrar (API)';
                            btnApiGastDelete.type = 'button';

    let dltApiObj = new apiDeleteHandle();
    dltApiObj.gasto = gasto;
    btnApiGastDelete.addEventListener("click", dltApiObj);

    div.append(btnApiGastDelete);

    let btnEditGastoForm = document.createElement("button");
    btnEditGastoForm.className += 'gasto-editar-formulario';
    btnEditGastoForm.textContent = 'Editar (formulario)';
    btnEditGastoForm.type = 'button';

    let editForm = new editHandleForm();
    editForm.gasto = gasto;
    btnEditGastoForm.addEventListener('click', editForm);
    div.append(btnEditGastoForm);  
}

function mostrarGastosAgrupadosWeb(id, agrup, periodo){
    // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    var divP = document.getElementById(id);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    console.log(divP);
    divP.innerHTML = "";
    const elem = document.getElementById(id);
    let datos = ""
    for (let [key, val] of Object.entries(agrup)) {
        datos += 
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${key}</span>
            <span class="agrupacion-dato-valor">${val}</span>
        </div>`
    };
    elem.innerHTML += 
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${datos}`
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
    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gesPres.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    let gastList = gesPres.listarGastos();
    for(let gasto of gastList){
    mostrarGastoWeb("listado-gastos-completo", gasto);
  }

    let day = "dia";
    let gastDay = gesPres.agruparGastos(day);
    mostrarGastosAgrupadosWeb("agrupacion-dia", gastDay, "día");

    let month = "mes";
    let gastMonth = gesPres.agruparGastos(month);
    mostrarGastosAgrupadosWeb("agrupacion-mes", gastMonth, "mes");

    let year = "anyo";
    let gastYear = gesPres.agruparGastos(year);
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gastYear, "año");
}

function actualizarPresupuestoWeb()  {
    let pres = parseFloat(prompt(`Hey amigo, introduce tu presupuesto`));
    gesPres.actualizarPresupuesto(pres);
    repintar();
}

function nuevoGastoWeb() {
    let des = prompt(`¿Ya estás gastando dinero? ¿En qué te lo has gastado, trozo de mierda?`);
    let val = parseFloat(prompt(`¿Cuánto ha sido esta vez?`));
    let fec = prompt(`¿Y cuándo fue eso? Dímelo siguiendo el formato yyyy-mm-dd que si no no te entiendo, figura`);
    let eti = prompt(`Etiqueta ese rico gasto tuyo con todas las etiquetas que quieras, pero sepáralas con comas (,) para poder yo distinguir entre una y otra`);
    let etiArray = eti.split(',');
    let gasto = new gesPres.CrearGasto(des, val, fec, ...etiArray);
    gesPres.anyadirGasto(gasto);
    repintar();
}

function nuevoGastoWebFormulario() {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector("form");
    let controls = document.getElementById("controlesprincipales")
    controls.appendChild(formulario);
    let btnAddGastForm = document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");
    let sendObject = new enviarGastoFormHandle();
    formulario.addEventListener('submit', sendObject);
    let cancelObject = new cancelFormHandle();
    let btnCancel = formulario.querySelector("button.cancelar");
    btnCancel.addEventListener("click", cancelObject);
    let sendApi = formulario.querySelector("button.gasto-enviar-api");
    sendApi.addEventListener("click", apiSendHandle);
}

//Manejadores

function EditarHandle() {
    this.handleEvent = function (e){    
        let des = prompt("¿Cuál va a ser la nueva descripción del gasto?");
        let val = parseFloat(prompt("¿Y de cuánto dices que es?"));
        let fec = prompt("Dime cuándo hiciste ese gasto anda, recuerda que sólo entiendo el formato yyyy-mm-dd");
        let etiquetas = prompt("Etiqueta el gasto como te venga en gana, pero separa cada etiqueta con una coma (,)");
        let etiArray = etiquetas.split(',');
        this.gasto.actualizarValor(val);
        this.gasto.actualizarDescripcion(des);
        this.gasto.actualizarFecha(fec);
        this.gasto.anyadirEtiquetas(...etiArray);
        repintar();
   }
}

function BorrarHandle() {
    this.handleEvent = function (e) {
        gesPres.borrarGasto(this.gasto.id);
        repintar();
    }        
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function (e){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function submitHandle(e) {
    this.handleEvent = function(e){
        e.preventDefault();
        let form = e.currentTarget;
        let des = form.elements.descripcion.value;
        this.gasto.actualizarDescripcion(des);
        let val = parseFloat(form.elements.valor.value);
        this.gasto.actualizarValor(val);
        let fec = form.elements.fecha.value;
        this.gasto.actualizarFecha(fec);
        let eti = form.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(eti);
        repintar();
    }
}

function enviarGastoFormHandle(){
    this.handleEvent = function(e){
        e.preventDefault();
         let formulario = e.currentTarget;
         let descripcion = formulario.elements.descripcion.value;
         let valor = parseFloat(formulario.elements.valor.value);
         let fecha = formulario.elements.fecha.value;
         let etiquetas = formulario.elements.etiquetas.value;
        let gastoNuevo = new gesPres.CrearGasto(descripcion, valor, fecha, etiquetas);
        gesPres.anyadirGasto(gastoNuevo);
        repintar();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}

function editHandleForm() {
    this.handleEvent = function (event){

        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
        var formulario = plantillaFormulario.querySelector("form");
        let divMainControls = document.getElementById("controlesprincipales")
        divMainControls.appendChild(formulario);
        let btnEditForm = event.currentTarget;
        btnEditForm.appendChild(formulario);
        formulario.elements.descripcion.value  = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;
        let editFormHandle = new submitHandle();
        editFormHandle.gasto = this.gasto;
        formulario.addEventListener('submit', editFormHandle);
        let btnCancel = formulario.querySelector("button.cancelar");
        let cancelObject = new cancelFormHandle();
        btnCancel.addEventListener("click", cancelObject);
        btnEditForm.setAttribute("disabled", "");
        let apiFormEdit = formulario.querySelector("button.gasto-enviar-api");
        let editEvent = new apiEditHandle();
        editEvent.gasto = this.gasto;
        apiFormEdit.addEventListener("click", editEvent);
    }
}

function cancelFormHandle() {
    this.handleEvent = function (e){
        e.currentTarget.parentNode.remove();
        let btnAddGastForm = document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
        repintar();
    }
}

function filtrarGastosWeb() {
    this.handleEvent = function(event) {
        event.preventDefault();
        let form = event.currentTarget;
        let des = form.elements["formulario-filtrado-descripcion"].value;
        let minVal = parseFloat(form.elements["formulario-filtrado-valor-minimo"].value);
        let maxVal = parseFloat(form.elements["formulario-filtrado-valor-maximo"].value);
        let fecDes = form.elements["formulario-filtrado-fecha-desde"].value;
        let fecHas = form.elements["formulario-filtrado-fecha-hasta"].value;
        let etiq = form.elements["formulario-filtrado-etiquetas-tiene"].value;
        if (etiq !== undefined) {
            etiq = gesPres.transformarListadoEtiquetas(etiq);
        }

        /*let obj = {
            descripcion: des,
            valorMinimo: minVal,
            valorMaximo: maxVal,
            fechadesde: fecDes,
            fechahasta: fecHas,
            etiquetasTiene: etiq
        }*/

        let filter = ({fechaDesde : fecDes, fechaHasta : fecHas, valorMinimo : minVal, valorMaximo : maxVal, descripcionContiene : des, etiquetasTiene : etiq});
        let filterForm = gesPres.filtrarGastos(filter);
        document.getElementById("listado-gastos-completo").innerHTML=" ";

        for (let gasto of filterForm){
            mostrarGastoWeb("listado-gastos-completo", gasto);
        }
    }
}
let gastoSend = new filtrarGastosWeb();

function guardarGastosWeb() {
    this.handleEvent = function(e) {
        let list = gesPres.listarGastos();
        localStorage.GestorGastosDWEC = JSON.stringify(list);
    }
}
let saveGastWeb = new guardarGastosWeb();

function cargarGastosWeb() {
    this.handleEvent = function(e) {
        if (localStorage.GestorGastosDWEC == null) {
            gesPres.cargarGastos([]);
        } else {
            gesPres.cargarGastos(JSON.parse(localStorage.GestorGastosDWEC));
        }
        repintar();
    }
}
let chrgGastWeb = new cargarGastosWeb();

// function cargarGastosApi(e) {
//     let user = document.querySelector("#nombre_usuario").value;
//     let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}`;
//     if (usuer != '') {
//         fetch(url, {method: 'GET'})
//             .then(answer => answer.json())
//             .then((res) => {
//                 let result = res;
//                 if(result == "") {
//                     console.log("La API no contiene datos para el usuario introducido")
//                 } else {
//                     gestionPresupuesto.cargarGastos(result);
//                     console.log("Carga de gastos realizada correctamente")
//                     repintar();
//                 }
//                 })
//             .catch(error => console.error(error));
//     }
// }

function cargarGastosApi(){
    let user = document.getElementById('nombre_usuario').value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}`;

    if (user != ''){
        fetch (url, {method: 'GET'})
        .then(respuesta => respuesta.json())
        .then((result) => {
            let res = result;
            if(res == '') {
                console.log(`No existen gastos del usuario ${user}`);
            } else{
                gesPres.cargarGastos(res);
                console.log("Cargando gastos...");
                repintar();
            }
        })
        .catch(error => console.error(error));
    }
}

// function apiGastSend(event){
//     let user = document.getElementById("nombre_usuario").value;
//     let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}`;
    
//     let form = event.currentTarget.form;
//     let desc = form.elements.descripcion.value;
//     let value = form.elements.valor.value;
//     let date = form.elements.fecha.value;
//     let eti = form.elements.etiquetas.value;

//     value = parseFloat(value);
//     eti = eti.split(",");

//     let newObj = {
//         descripcion: desc,
//         fecha: date,
//         valor: value,
//         etiquetas: eti
//     }

//     console.log(newObj);

//     if(user == ""){
//         console.log("Debes introducir un nombre de usuario en el input");
//     }else{
//         fetch(url, {
//             method: 'POST', 
//             body: JSON.stringify(newObj),
//             headers:{
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then(response => {
            
//             if(response.ok){
//                 console.log("Petición correcta");
//                 CargarGastosApi();
//             }else{
//                 console.log("Petición errónea");
//             }
//         })
//         .catch(err => console.error(err));
//     }
// }

// function apiGastEdit(){

//     this.handleEvent = function(event){
//         let user = document.getElementById("nombre_usuario").value;
//         let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}/${this.gasto.gastoId}`;
        
//         let form = event.currentTarget.form;
//         let desc = form.elements.descripcion.value;
//         let value = form.elements.valor.value;
//         let date = form.elements.fecha.value;
//         let eti = form.elements.etiquetas.value;

//         value = parseFloat(value);
//         eti = eti.split(",");
    
//         let nuevoObjeto = {
//             descripcion: desc,
//             fecha: date,
//             valor: value,
//             etiquetas: eti
//         }

//         if(user == ""){
//             console.log("Debes introducir un nombre de usuario en el input");
//         } else {
//             fetch(url, {
//                 method: 'PUT', 
//                 body: JSON.stringify(nuevoObjeto),
//                 headers:{
//                     'Content-Type': 'application/json'
//                 }
//             })
//             .then(response => {
                
//                 if(response.ok){
//                     console.log("Petición correcta");
//                     CargarGastosApi();
//                 }else{
//                     console.log("Petición errónea");
//                 }
//             })
//             .catch(err => console.error(err));
//         }
//     }
// }
function apiSendHandle(){
    let user = document.getElementById("nombre_usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}`;

    let form = event.currentTarget.form;
    let desc = form.elements.descripcion.value;
    let value = form.elements.valor.value;
    let date = form.elements.fecha.value;
    let eti = form.elements.fecha.value;

    value = parseFloat(value);
    eti = etiquetas.split(",");

    let newObjeto = {
        descripcion: desc,
        fecha: date,
        valor: value,
        etiquetas: eti
    }

    if(user != "") {
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
                console.log("Error");
            }
        })
        .catch(error => console.error(error));
    }
}

function apiEditHandle(){
    this.handleEvent = function(event){
        let user = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;
        
        let form = event.currentTarget.form;
        let desc = form.elements.descripcion.value;
        let value = form.elements.valor.value;
        let date = form.elements.fecha.value;
        let eti = form.elements.fecha.value;
    
        value = parseFloat(value);
        eti = etiquetas.split(",");

        let newObjeto = {
            descripcion: desc,
            fecha: date,
            valor: value,
            etiquetas: eti
        }

        if(user != "") {
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

function apiDeleteHandle(){
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

//Botones
const btnAddGas = document.getElementById("anyadirgasto");
const btnActPres = document.getElementById("actualizarpresupuesto");
const btnGastForm = document.getElementById("anyadirgasto-formulario");
const btnFilter = document.getElementById("formulario-filtrado");
const btnSaveGast = document.getElementById("guardar-gastos");
const btnChargeGast = document.getElementById("cargar-gastos");
const btnApiGast = document.getElementById("cargar-gastos-api");

btnAddGas.addEventListener("click", nuevoGastoWeb);
btnActPres.addEventListener("click", actualizarPresupuestoWeb);
btnGastForm.addEventListener("click", nuevoGastoWebFormulario);
btnFilter.addEventListener("submit", gastoSend);
btnSaveGast.addEventListener("click", saveGastWeb);
btnChargeGast.addEventListener("click", chrgGastWeb);
btnApiGast.addEventListener("click", cargarGastosApi);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}