import * as gesPres from "./gestionPresupuesto.js";
//Primera parte de una guía muy útil que encontré https://www.youtube.com/watch?v=ztL8KMLJ9Is
//Funciones

function mostrarDatoEnId(idElemento, valor) {//https://www.youtube.com/watch?v=DMawWBwHnBU
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

    let dltApiObj = new BorrarGastoApiHandle();
    dltApiObj.gasto = gasto;
    btnApiGastDelete.addEventListener("click", dltApiObj);

    divGasto.append(btnApiGastDelete);

    let btnEditGastoForm = document.createElement("button");
    btnEditGastoForm.className += 'gasto-editar-formulario';
    btnEditGastoForm.textContent = 'Editar (formulario)';
    btnEditGastoForm.type = 'button';

    let editForm = new editHandleForm();
    editForm.gasto = gasto;
    btnEditGastoForm.addEventListener('click', editForm);
    div.append(btnEditGastoForm);  
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
    let pres = gesPres.mostrarPresupuesto();
    mostrarDatoEnId( "presupuesto", pres);
    
    let gasTot = gesPres.calcularTotalGastos().toFixed(2);
    mostrarDatoEnId( "gastos-totales", gasTot);
    
    let balTot = gesPres.calcularBalance().toFixed(2);
    mostrarDatoEnId("balance-total", balTot);
    
    let borrarDatos = document.getElementById("listado-gastos-completo").innerHTML = "";
    
    let gasList = gesPres.listarGastos();
    for (const x of gasList) {
        mostrarGastoWeb("listado-gastos-completo", x);
    }
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
    enviarApi.addEventListener("click", apiGastSend);
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
        let editEvent = new apiGastEdit();
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

function cargarGastosApi(e) {
    let user = document.querySelector("#nombre_usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}`;
    if (usuer != '') {
        fetch(url, {method: 'GET'})
            .then(answer => answer.json())
            .then((res) => {
                let result = res;
                if(result == "") {
                    console.log("La API no contiene datos para el usuario introducido")
                } else {
                    gestionPresupuesto.cargarGastos(result);
                    console.log("Carga de gastos realizada correctamente")
                    repintar();
                }
                })
            .catch(error => console.error(error));
    }
}

function apiGastSend(event){
    let user = document.getElementById("nombre_usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}`;
    
    let form = event.currentTarget.form;
    let desc = form.elements.descripcion.value;
    let value = form.elements.valor.value;
    let date = form.elements.fecha.value;
    let eti = form.elements.etiquetas.value;

    value = parseFloat(value);
    eti = eti.split(",");

    let newObj = {
        descripcion: desc,
        fecha: date,
        valor: value,
        etiquetas: eti
    }

    console.log(newObj);

    if(user == ""){
        console.log("Debes introducir un nombre de usuario en el input");
    }else{
        fetch(url, {
            method: 'POST', 
            body: JSON.stringify(newObj),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            
            if(response.ok){
                console.log("Petición correcta");
                CargarGastosApi();
            }else{
                console.log("Petición errónea");
            }
        })
        .catch(err => console.error(err));
    }
}

function apiGastEdit(){

    this.handleEvent = function(event){
        let user = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}/${this.gasto.gastoId}`;
        
        let form = event.currentTarget.form;
        let desc = form.elements.descripcion.value;
        let value = form.elements.valor.value;
        let date = form.elements.fecha.value;
        let eti = form.elements.etiquetas.value;

        value = parseFloat(value);
        eti = eti.split(",");
    
        let nuevoObjeto = {
            descripcion: desc,
            fecha: date,
            valor: value,
            etiquetas: eti
        }

        if(user == ""){
            console.log("Debes introducir un nombre de usuario en el input");
        } else {
            fetch(url, {
                method: 'PUT', 
                body: JSON.stringify(nuevoObjeto),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                
                if(response.ok){
                    console.log("Petición correcta");
                    CargarGastosApi();
                }else{
                    console.log("Petición errónea");
                }
            })
            .catch(err => console.error(err));
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




//https://www.youtube.com/watch?v=3zrGjc0UEgU
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}