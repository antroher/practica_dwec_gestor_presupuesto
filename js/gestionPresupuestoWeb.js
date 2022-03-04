
import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(valor, idElemento) {
    if (idElemento != null){
        let elememento = document.getElementById(idElemento);
        elememento.innerHTML+= " " + valor;
    }
}

//aqui gasto es un array, con lo que habria que cambiarlo y meterlo todo dentro de una iteracción
function mostrarGastoWeb(idElemento, gasto){
    if (idElemento != null) {
        let elem = document.getElementById(idElemento);

        let divgasto = document.createElement("div");
        divgasto.className = "gasto";

        let divGastoDesc=document.createElement("div");
        divGastoDesc.className = "gasto-descripcion";
        divGastoDesc.textContent = gasto.descripcion;
        divgasto.append(divGastoDesc);

        let divGastoFecha = document.createElement("div");
        divGastoFecha.className = "gasto-fecha";
        divGastoFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
        divgasto.append(divGastoFecha);

        let divGastoValor=document.createElement("div");
        divGastoValor.className = "gasto-valor";
        divGastoValor.textContent = gasto.valor + "";
        divgasto.append(divGastoValor);

        let divGastoEtiquetas=document.createElement("div");
        divGastoEtiquetas.className="gasto-etiquetas";
        gasto.etiquetas.forEach(etiqueta => {
            let span=document.createElement("span");
            span.className="gasto-etiquetas-etiqueta";
            span.textContent = etiqueta + " ";
            
            if (idElemento=="listado-gastos-completo") {
                let borraEtiqueta = new BorrarEtiquetasHandle();
                borraEtiqueta.gasto = gasto;
                borraEtiqueta.etiqueta = etiqueta;
                span.addEventListener("click",borraEtiqueta);
            }
            divGastoEtiquetas.append(span);
        });

        divgasto.append(divGastoEtiquetas);
        if (idElemento == "listado-gastos-completo"){
            let botonEditar = document.createElement("button");
            botonEditar.className = "gasto-editar";
            botonEditar.type = "button";
            botonEditar.textContent = "Editar";
            
            let botonEditarFormulario = document.createElement("button");
            botonEditarFormulario.className = "gasto-editar-formulario";
            botonEditarFormulario.type = "button";
            botonEditarFormulario.textContent = "Editar Form";

            let editarHandle = new EditarHandle();
            editarHandle.gasto = gasto;
            botonEditar.addEventListener("click",editarHandle);
            divgasto.append(botonEditar);

            let botonBorrar=document.createElement("button");
            botonBorrar.className = "gasto-borrar";
            botonBorrar.type = "button";
            botonBorrar.textContent = "Borrar";
            let borrarHa = new BorrarHandle();
            borrarHa.gasto = gasto;
            botonBorrar.addEventListener("click",borrarHa);
            divgasto.append(botonBorrar);
            
            let editarFormularioHandle = new EditarHandleformulario();
            editarFormularioHandle.gasto = gasto;
            editarFormularioHandle.botonEditarGasto = botonEditarFormulario;
            editarFormularioHandle.divGasto = divgasto;
            botonEditarFormulario.addEventListener("click",editarFormularioHandle);
            divgasto.append(botonEditarFormulario);

            let botonBorrarApi = document.createElement("button");
            botonBorrarApi.className = "gasto-borrar-api";
            botonBorrarApi.type = "button";
            botonBorrarApi.textContent="Borrar (API)";

            let borrarApi = new BorrarGastoApiHandle();
            borrarApi.gasto = gasto;
            botonBorrarApi.addEventListener("click",borrarApi);
            divgasto.append(botonBorrarApi);
        }
          elem.append(divgasto);              
    }

}
function mostrarGastosAgrupadosWeb(idElemento, agrupacion, periodo) {
    if (idElemento != null){
    var divP = document.getElementById(idElemento);
    divP.innerHTML = "";
    const agrupacionHTLM = document.createElement('div');
    agrupacionHTLM.className = 'agrupacion';
    const tituloHTML = document.createElement('h1');
    const tituloText = document.createTextNode(`Gastos agrupados por ${periodo}`);
    tituloHTML.appendChild(tituloText);
    agrupacionHTLM.appendChild(tituloHTML);

    // Agrupación
    for (const agrupacionDato in agrupacion) {
        const agrupacionDatoHTML = document.createElement('div');
        agrupacionDatoHTML.className = 'agrupacion-dato';
        const agrupacionDatoClaveHTML = document.createElement('span');
        agrupacionDatoClaveHTML.className = 'agrupacion-dato-clave';
        const agrupacionDatoClaveText = document.createTextNode(agrupacionDato + " ");
        agrupacionDatoClaveHTML.appendChild(agrupacionDatoClaveText);
        agrupacionDatoHTML.appendChild(agrupacionDatoClaveHTML);
        const agrupacionDatoValorHTML = document.createElement('span');
        agrupacionDatoValorHTML.className = 'agrupacion-dato-valor';
        const agrupacionDatoValorText = document.createTextNode(agrupacion[agrupacionDato]);
        agrupacionDatoValorHTML.appendChild(agrupacionDatoValorText);
        agrupacionDatoHTML.appendChild(agrupacionDatoValorHTML);
        agrupacionHTLM.appendChild(agrupacionDatoHTML);
    }

    divP.append(agrupacionHTLM);

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
                    data: agrupacion
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
}

function repintar() {
    document.getElementById("presupuesto").innerHTML= "";
    document.getElementById("balance-total").innerHTML= "";
    document.getElementById("gastos-totales").innerHTML= "";
    mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(),"presupuesto");
    mostrarDatoEnId(gestionPresupuesto.calcularTotalGastos(),"gastos-totales");
    mostrarDatoEnId(gestionPresupuesto.calcularBalance(),"balance-total");
    document.getElementById("listado-gastos-completo").innerHTML= "";
    let gastos = gestionPresupuesto.listarGastos();
    gastos.forEach(gasto => {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    });

    
    document.getElementById("listado-gastos-filtrado-1").innerHTML="";
    let gastosF=gestionPresupuesto.filtrarGastos({fechaDesde:"2021-09-01", fechaHasta:"2021-09-30"});
    gastosF.forEach(gastoFiltrado => {
        mostrarGastoWeb("listado-gastos-filtrado-1",gastoFiltrado);
    });

    document.getElementById("listado-gastos-filtrado-2").innerHTML="";
    gastosF=gestionPresupuesto.filtrarGastos({valorMinimo:50});
    gastosF.forEach(gastoFiltrado => {
        mostrarGastoWeb("listado-gastos-filtrado-2",gastoFiltrado);
    });

    document.getElementById("listado-gastos-filtrado-3").innerHTML="";
    gastosF=gestionPresupuesto.filtrarGastos({valorMinimo:200,etiquetasTiene:["seguros"]});
    gastosF.forEach(gastoFiltrado => {
        mostrarGastoWeb("listado-gastos-filtrado-3",gastoFiltrado);
    });

    document.getElementById("listado-gastos-filtrado-4").innerHTML="";
    gastosF=gestionPresupuesto.filtrarGastos({valorMaximo:50,etiquetasTiene:["comida","transporte"]});
    gastosF.forEach(gastoFiltrado => {
        mostrarGastoWeb("listado-gastos-filtrado-4",gastoFiltrado);
    });
    
    mostrarGastosAgrupadosWeb('agrupacion-dia', gestionPresupuesto.agruparGastos('dia'), 'día');
    mostrarGastosAgrupadosWeb('agrupacion-mes', gestionPresupuesto.agruparGastos('mes'), 'mes');
    mostrarGastosAgrupadosWeb('agrupacion-anyo', gestionPresupuesto.agruparGastos('anyo'), 'año');

}

function actualizarPresupuestoWeb() {
    gestionPresupuesto.actualizarPresupuesto(
        parseInt(prompt('Nuevo presupuesto:', gestionPresupuesto.presupuesto))
    );
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

    let apiEnviar = formulario.querySelector("button.gasto-enviar-api");
    apiEnviar.addEventListener("click", EnviarGastoApi);
    
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
        for (let gasto of gastosFiltradosForm) {
            mostrarGastoWeb("listado-gastos-completo", gasto);
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
    const nombreUsuario = document.getElementById('nombre_usuario').value;
    fetch("https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + nombreUsuario)
        .then(response => response.json())
        .then(gastos => {
            gestionPresupuesto.cargarGastos(gastos);
            repintar()
        })
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

function EnviarGastoApi() {
    this.handleEvent = function (event) {
        const nombreUsuario = document.getElementById('nombre_usuario').value;

        const gastoJson = {
            "valor": Number(this.formulario.valor.value),
            "descripcion": this.formulario.descripcion.value,
            "fecha": this.formulario.fecha.value,
            "etiquetas": this.formulario.etiquetas.value.split(","),
        }

        fetch(`"https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest"/${nombreUsuario}`, {
            method: "POST",
            body: JSON.stringify(gastoJson),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then(cargarGastosApi)
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


//Botones
const actualizarpresupuesto = document.getElementById("actualizarpresupuesto");
const anyadirgasto = document.getElementById("anyadirgasto");
const anyadirgastoFirmulario = document.getElementById("anyadirgasto-formulario");
const formularioFiltrador = document.getElementById("formulario-filtrado");
const btnGuardarGastos = document.getElementById("guardar-gastos");
const btnCargarGastos = document.getElementById("cargar-gastos");
const btnGastosApi = document.getElementById("cargar-gastos-api");
btnGastosApi.addEventListener("click", CargarGastosApi);
//Eventos
actualizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);
anyadirgasto.addEventListener('click', nuevoGastoWeb);
anyadirgastoFirmulario.addEventListener('click', nuevoGastoWebFormulario)
//Al tener que trabajar con el propio nodo que manifiesta el evento deberemos crear un objeto manejador... o eso creo yo despúes de 3 horas sin saber que falla jeje
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