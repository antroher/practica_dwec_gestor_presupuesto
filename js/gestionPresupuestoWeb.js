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

    let objBorrarGastoApi = new BorrarGastoApiHandle();
    objBorrarGastoApi.gasto = gasto;
    btnBorrarGastoApi.addEventListener("click", objBorrarGastoApi);

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

function mostrarGastosAgrupadosWeb( idElemento, agrup, periodo ){

    var divP = document.getElementById(idElemento);

    divP.innerHTML = "";
        
        let arrayAgrupacion = "";

        for( let [nombre, valor] of Object.entries( agrup ) ){
            arrayAgrupacion += `
                <div class="agrupacion-dato">
                    <span class="agrupacion-dato-clave">${nombre}</span>
                    <span class="agrupacion-dato-valor">${valor}</span>
                </div>
            `;
        }

        divP.innerHTML = `
            <div class="agrupacion">
                <h1>Gastos agrupados por ${periodo}</h1>
                ${arrayAgrupacion}
            </div>
        `;

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

    const myChart = new Chart(chart.getContext("2d"), {
        type: 'bar',
        data: {
            datasets: [
                {
                    label: `Gastos por ${periodo}`,

                    backgroundColor: "#555555",

                    data: agrup
                }
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'time',

                    time: {
                        unit: unit
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    divP.append(chart);
}

function repintar(){
    
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    let listaGastos = gestionPresupuesto.listarGastos();
    for(let gasto of listaGastos){
    mostrarGastoWeb("listado-gastos-completo", gasto);
  }

    let periodoDia = "dia";
    let gastosDia = gestionPresupuesto.agruparGastos(periodoDia);
    mostrarGastosAgrupadosWeb("agrupacion-dia", gastosDia, "día");

    let periodoMes = "mes";
    let gastosMes = gestionPresupuesto.agruparGastos(periodoMes);
    mostrarGastosAgrupadosWeb("agrupacion-mes", gastosMes, "mes");

    let periodoAnyo = "anyo";
    let gastosAnyo = gestionPresupuesto.agruparGastos(periodoAnyo);
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAnyo, "año");

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

    let apiEnviar = formulario.querySelector("button.gasto-enviar-api");
    apiEnviar.addEventListener("click", EnviarGastoApi);
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

        event.preventDefault();

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
        //botón cancelar
        let btnCancelar = formulario.querySelector("button.cancelar");
        let cancelarObj = new CancelarFormHandle();
        btnCancelar.addEventListener("click", cancelarObj);

        btnEditarFormulario.setAttribute("disabled", "");

        let editarFormularioApi = formulario.querySelector("button.gasto-enviar-api");
        let evenEditar = new EditarGastoApi();
        evenEditar.gasto = this.gasto;
        editarFormularioApi.addEventListener("click", evenEditar);
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

function CargarGastosApi() {
    let usuario = document.querySelector("#nombre_usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;
    
    if (usuario != '') {
        fetch(url, {method: 'GET'})
            .then(respuesta => respuesta.json())
            .then((result) => {
                let resultado = result;
                if(resultado == "") {
                    console.log("No existen gastos en la api para el usuario")
                } else {
                    gestionPresupuesto.cargarGastos(resultado);
                    console.log("Miau cargasGastosApi")
                    repintar();
                }
                })
            .catch(err => console.error(err));
    }
}

function BorrarGastoApiHandle(){
    
    this.handleEvent = function(event){
        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

        if (usuario == "") {
            console.log("El input del nombre de usuario esta vacio");
        } else {
            fetch(url, {method: 'DELETE'})
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
    let usuario = document.getElementById("nombre_usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;
    
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

    if(usuario == ""){
        console.log("El input del nombre de usuario esta vacio");
    }else{
        fetch(url, {
            method: 'POST', 
            body: JSON.stringify(nuevoObjeto),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            
            if(response.ok){
                console.log("La peticion de añadir ha sido correcta");
                CargarGastosApi();
            }else{
                console.log("La peticion de añadir ha sido erronea");
            }
        })
        .catch(err => console.error(err));
    }
}

function EditarGastoApi(){

    this.handleEvent = function(event){
        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;
        
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

        if(usuario == ""){
            console.log("El input del nombre de usuario esta vacio");
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
                    console.log("Peticion de modificacion correcta");
                    CargarGastosApi();
                }else{
                    console.log("Peticion de modificacion incorrecta");
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
const btnGastosApi = document.getElementById("cargar-gastos-api");
btnGastosApi.addEventListener("click", CargarGastosApi);

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