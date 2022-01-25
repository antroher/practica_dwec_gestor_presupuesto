//Ejemplo detallado de como hacer la práctica: https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley


import * as gestionPresupuesto from './gestionPresupuesto.js';

//Para iterar sobre un collection del node usar for...of
function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elemento.appendChild(p);
}

//aqui gasto es un array, con lo que habria que cambiarlo y meterlo todo dentro de una iteracción
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

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
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
}

function repintar() {
    let mostrar = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId( "presupuesto",mostrar);
    
    let gastoTotal = gestionPresupuesto.calcularTotalGastos().toFixed(2);
    mostrarDatoEnId( "gastos-totales",gastoTotal);
    
    let balanceTotal = gestionPresupuesto.calcularBalance().toFixed(2);
    mostrarDatoEnId("balance-total",balanceTotal);
    
    let borrarDatos = document.getElementById("listado-gastos-completo").innerHTML = "";
    
    let listaGasto = gestionPresupuesto.listarGastos();
    for (const gasto of listaGasto) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
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

/* https://stackoverflow.com/questions/2230992/javascript-creating-objects-based-on-a-prototype-without-using-new-constructo*/

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
    //Copia del formulario/template
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector("form");
    //En la práctica pone que se ponga al final, pero salta error si se hace de ese modo
    let divControlesPrincipales = document.getElementById("controlesprincipales")
    divControlesPrincipales.appendChild(formulario);
    let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");
    
    //botón submit
    let enviarObj = new EnviarGastoFormHandle();
    formulario.addEventListener('submit', enviarObj);
    //botón cancelar
    let cancelarObj = new CancelarFormHandle();
    let btnCancelar = formulario.querySelector("button.cancelar");
    btnCancelar.addEventListener("click", cancelarObj);
}

//Manejador del evento cancelar del formulario
function CancelarFormHandle() {
    this.handleEvent = function (event){
        //La única forma de borrar el formulario sin que salten mil errores
        //básicamente recoge el padre del botón cancelar -el formulario- y lo borra
        //llevo probando combinaciones 2 horas y esto es lo mejor que me ha salido
        event.currentTarget.parentNode.remove();
        let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
        repintar();
    }
}


//Este handle actualizará los valores del gasto que nosotros estemos manejando
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

//Manejador del evento editar gasto formulario
function EditarHandleformulario() {
    this.handleEvent = function (event){

        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
        var formulario = plantillaFormulario.querySelector("form");
        //En el enunciado pone que se ponga al final el añadir el formulario, pero si lo haces así explota
        //por ello primero selecciono el nodo y después adjunto el formulario al DOM.
        let divControlesPrincipales = document.getElementById("controlesprincipales")
        divControlesPrincipales.appendChild(formulario);
        //Recogemos el nodo que ha pedido el evento
        let btnEditarFormulario = event.currentTarget;
        btnEditarFormulario.appendChild(formulario);
        formulario.elements.descripcion.value  = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        //Evento para el submit del formulario
        let EditarFormHandle1 = new EnviarHandle();
        EditarFormHandle1.gasto = this.gasto;
        formulario.addEventListener('submit', EditarFormHandle1);
        //botón cancelar
        let btnCancelar = formulario.querySelector("button.cancelar");
        let cancelarObj = new CancelarFormHandle();
        btnCancelar.addEventListener("click", cancelarObj);

        //Desactivar -añadir atributo disabled- al botón anyadirgasto-formulario
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

function CargarGastosApi(){
    let user = document.querySelector("#nombre_usuario").value;
    let page = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}`;

    if(user !=``){
        fetch(page, {method: 'GET'})
            .then(respuest => respuesta.json())
            .then((result) => {
                if(result == ""){
                    console.log("No tiene gastos")
                } else {
                    gestionPresupuesto.cargarGastos(resultado);
                    console.log("Sí tiene gastos")
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
                    console.log("Ok");
                    CargarGastosApi();
                }else{
                    console.log("No");
                }
            })
            .catch(err => console.error(err));
        }
    }
}





const actualizarpresupuesto = document.getElementById("actualizarpresupuesto");
const anyadirgasto = document.getElementById("anyadirgasto");
const anyadirgastoFirmulario = document.getElementById("anyadirgasto-formulario");
const formularioFiltrador = document.getElementById("formulario-filtrado");
const btnGuardarGastos = document.getElementById("guardar-gastos");
const btnCargarGastos = document.getElementById("cargar-gastos");

actualizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);
anyadirgasto.addEventListener('click', nuevoGastoWeb);
anyadirgastoFirmulario.addEventListener('click', nuevoGastoWebFormulario)

let filtGastForm = new filtrarGastosWeb();
formularioFiltrador.addEventListener('submit', filtGastForm);


let objGuardarGastosWeb = new guardarGastosWeb();
let objCargarGastosWeb = new cargarGastosWeb();

btnGuardarGastos.addEventListener('click', objGuardarGastosWeb);
btnCargarGastos.addEventListener('click', objCargarGastosWeb);





export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}