import * as gestionPresupuesto  from "./gestionPresupuesto.js";

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

    let btnEditGastoForm = document.createElement("button");
    btnEditGastoForm.className += 'gasto-editar-formulario';
    btnEditGastoForm.textContent = 'Editar (formulario)';
    btnEditGastoForm.type = 'button';

    let editForm = new editHandleForm();
    editForm.gasto = gasto;
    btnEditGastoForm.addEventListener('click', editForm);
    div.append(btnEditGastoForm);

    let btnBorrarGastoApi = document.createElement("button");
                            btnBorrarGastoApi.className += 'gasto-borrar-api';
                            btnBorrarGastoApi.textContent = 'Borrar (API)';
                            btnBorrarGastoApi.type = 'button';

    let objBorrarGastoApi = new BorrarGastoApiHandle();
    objBorrarGastoApi.gasto = gasto;
    btnBorrarGastoApi.addEventListener("click", objBorrarGastoApi);

    div.append(btnBorrarGastoApi);

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    const elem = document.getElementById(idElemento);
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
}

function repintar() {
    let pres = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId( "presupuesto", pres);
    
    let gasTot = gestionPresupuesto.calcularTotalGastos().toFixed(2);
    mostrarDatoEnId( "gastos-totales", gasTot);
    
    let balTot = gestionPresupuesto.calcularBalance().toFixed(2);
    mostrarDatoEnId("balance-total", balTot);
    
    let borrarDatos = document.getElementById("listado-gastos-completo").innerHTML = "";
    
    let gasList = gestionPresupuesto.listarGastos();
    for (const x of gasList) {
        mostrarGastoWeb("listado-gastos-completo", x);
    }
}

function actualizarPresupuestoWeb()  {
    let pres = parseFloat(prompt(`Hey amigo, introduce tu presupuesto`));
    gestionPresupuesto.actualizarPresupuesto(pres);
    repintar();
}

function nuevoGastoWeb() {
    let des = prompt(`¿Ya estás gastando dinero? ¿En qué te lo has gastado, trozo de mierda?`);
    let val = parseFloat(prompt(`¿Cuánto ha sido esta vez?`));
    let fec = prompt(`¿Y cuándo fue eso? Dímelo siguiendo el formato yyyy-mm-dd que si no no te entiendo, figura`);
    let eti = prompt(`Etiqueta ese rico gasto tuyo con todas las etiquetas que quieras, pero sepáralas con comas (,) para poder yo distinguir entre una y otra`);
    let etiArray = eti.split(',');
    let gasto = new gestionPresupuesto.CrearGasto(des, val, fec, ...etiArray);
    gestionPresupuesto.anyadirGasto(gasto);
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
    let enviarApi = formulario.querySelector("button.gasto-enviar-api");
    enviarApi.addEventListener("click", EnviarGastoApi);
}

function CancelarFormHandle() {
    this.handleEvent = function (event){
        event.currentTarget.parentNode.remove();
        let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
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

        let formTemplate = document.getElementById("formulario-template").content.cloneNode(true);;
        var form = formTemplate.querySelector("form");
        
        let divControlesPrincipales = document.getElementById("controlesprincipales")
        divControlesPrincipales.appendChild(form);
        
        let btnEditform = event.currentTarget;
        btnEditform.appendChild(form);
        form.elements.descripcion.value  = this.gasto.descripcion;
        form.elements.valor.value = this.gasto.valor;
        form.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        form.elements.etiquetas.value = this.gasto.etiquetas;

        let EditarFormHandle1 = new EnviarHandle();
        EditarFormHandle1.gasto = this.gasto;
        form.addEventListener('submit', EditarFormHandle1);
        
        let btnCancelar = form.querySelector("button.cancelar");
        let cancelarObj = new CancelarFormHandle();
        btnCancelar.addEventListener("click", cancelarObj);

        btnEditform.setAttribute("disabled", "");

        let editarFormularioApi = form.querySelector("button.gasto-enviar-api");
        let evenEditar = new EditarGastoApi();
        evenEditar.gasto = this.gasto;
        editarFormularioApi.addEventListener("click", evenEditar);
    }
}
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
        gestionPresupuesto.borrarGasto(this.gasto.id);
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
        let gastoNuevo = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas);
        gestionPresupuesto.anyadirGasto(gastoNuevo);
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
            etiq = gestionPresupuesto.transformarListadoEtiquetas(etiq);
        }

        let filter = ({fechaDesde : fecDes, fechaHasta : fecHas, valorMinimo : minVal, valorMaximo : maxVal, descripcionContiene : des, etiquetasTiene : etiq});
        let filterForm = gestionPresupuesto.filtrarGastos(filter);
        document.getElementById("listado-gastos-completo").innerHTML=" ";

        for (let gasto of filterForm){
            mostrarGastoWeb("listado-gastos-completo", gasto);
        }
    }
}
let gastoSend = new filtrarGastosWeb();

function guardarGastosWeb() {
    this.handleEvent = function(e) {
        let list = gestionPresupuesto.listarGastos();
        localStorage.GestorGastosDWEC = JSON.stringify(list);
    }
}
let guardarGastWeb = new guardarGastosWeb();

function cargarGastosWeb() {
    this.handleEvent = function(e) {
        if(localStorage.GestorGastosDWEC == null) {
            gestionPresupuesto.cargarGastos([]);
        }
        else {
            gestionPresupuesto.cargarGastos(JSON.parse(localStorage.GestorGastosDWEC));
        }
        repintar();
    }
}
let cargarGastWeb = new cargarGastosWeb();

function CargarGastosApi() {
    let user = document.querySelector("#nombre_usuario").value;
    let page = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}`;
    
    if (user != '') {
        fetch(page, {method: 'GET'})
            .then(respuesta => respuesta.json())
            .then((result) => {
                let resultado = result;
                if(resultado == "") {
                    console.log("por aqui no hay gastos")
                } else {
                    gestionPresupuesto.cargarGastos(resultado);
                    console.log("por aqui hay gastos")
                    repintar();
                }
                })
            .catch(err => console.error(err));
    }
}

function BorrarGastoApiHandle(){
    
    this.handleEvent = function(event){
        let user = document.getElementById("nombre_usuario").value;
        let page = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}/${this.gasto.gastoId}`;

        if (user == "") {
            console.log("Introduzca un nombre");
        } else {
            fetch(page, {method: 'DELETE'})
            .then(response => response.json())
            .then(datos => {
                if(!datos.errorMessage){
                    CargarGastosApi();
                } else {
                    console.log(datos.errorMessage);
                }
            })
            .catch(err => console.error(err));
        }
    }
}

function EnviarGastoApi(event){
    let user = document.getElementById("nombre_usuario").value;
    let page = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}`;
    
    let formulario = event.currentTarget.form;
    let descripcionN = formulario.elements.descripcion.value;
    let valorN = formulario.elements.valor.value;
    let fechaN = formulario.elements.fecha.value;
    let etiquetasN = formulario.elements.etiquetas.value;

    valorN = parseFloat(valorN);
    etiquetasN = etiquetasN.split(",");

    let nuevoObjeto = {
        descripcion: descripcionN,
        fecha: fechaN,
        valor: valorN,
        etiquetas: etiquetasN
    }

    console.log(nuevoObjeto);

    if(user == ""){
        console.log("No hay nombre");
    }else{
        fetch(page, {
            method: 'POST', 
            body: JSON.stringify(nuevoObjeto),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            
            if(response.ok){
                console.log("AÑADIR OK");
                CargarGastosApi();
            }else{
                console.log("AÑADIR NONONONOONONONONONO");
            }
        })
        .catch(err => console.error(err));
    }
}

function EditarGastoApi(){

    this.handleEvent = function(event){
        let user = document.getElementById("nombre_usuario").value;
        let page = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}/${this.gasto.gastoId}`;
        
        let formulario = event.currentTarget.form;
        let descripcionN = formulario.elements.descripcion.value;
        let valorN = formulario.elements.valor.value;
        let fechaN = formulario.elements.fecha.value;
        let etiquetasN = formulario.elements.etiquetas.value;

        valorN = parseFloat(valorN);
        etiquetasN = etiquetasN.split(",");
    
        let nuevoObjeto = {
            descripcion: descripcionN,
            fecha: fechaN,
            valor: valorN,
            etiquetas: etiquetasN
        }

        if(user == ""){
            console.log("No hay nombre de usuario");
        } else {
            fetch(page, {
                method: 'PUT', 
                body: JSON.stringify(nuevoObjeto),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                
                if(response.ok){
                    console.log("mod ok");
                    CargarGastosApi();
                }else{
                    console.log("mod nononononooo");
                }
            })
            .catch(err => console.error(err));
        }
    }
}


const btnAddGas = document.getElementById("anyadirgasto");
const btnActPres = document.getElementById("actualizarpresupuesto");
const btnGastForm = document.getElementById("anyadirgasto-formulario");
const btnFilter = document.getElementById("formulario-filtrado");
const btnGuardarGastWeb = document.getElementById("guardar-gastos");
const btncargarGastWeb = document.getElementById("cargar-gastos");

const btnCargarGastosApi = document.getElementById("cargar-gastos-api");
btnCargarGastosApi.addEventListener("click", CargarGastosApi);

btnAddGas.addEventListener("click", nuevoGastoWeb);
btnActPres.addEventListener("click", actualizarPresupuestoWeb);
btnGastForm.addEventListener("click", nuevoGastoWebFormulario);
btnFilter.addEventListener("submit", gastoSend);
btnGuardarGastWeb.addEventListener("click", guardarGastWeb);
btncargarGastWeb.addEventListener("click", cargarGastWeb);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    guardarGastosWeb,
    cargarGastosWeb
}