'use strict';
import * as gestionPresupuesto from './gestionPresupuesto.js'

let botonActualizar = document.getElementById('actualizarpresupuesto')
botonActualizar.onclick = actualizarPresupuestoWeb;

let botonAnyadir = document.getElementById('anyadirgasto')
botonAnyadir.onclick = nuevoGastoWeb;

let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
botonAnyadirGastoFormulario.addEventListener('click', nuevoGastoWebFormulario);

let botonGuardarGastos = document.getElementById("guardar-gastos");
botonGuardarGastos.addEventListener('click', new guardarGastosWeb);

let botonCargarGastos = document.getElementById("cargar-gastos");
botonCargarGastos.addEventListener('click', new cargarGastosWeb);


function nuevoGastoWebFormulario(){
    
    let plantillaFormulario  = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario .querySelector("form");
    let boton = document.getElementById("anyadirgasto-formulario");
    boton.disabled = true;
    document.getElementById("controlesprincipales").append(formulario);
    

    let eventoAnyadirGastoForm = new AnyadirGastoFormularioHandler();
    eventoAnyadirGastoForm.formulario = formulario;
    eventoAnyadirGastoForm.boton = boton;

    formulario.addEventListener("submit",eventoAnyadirGastoForm);

    let botonCancelar = formulario.querySelector("button.cancelar");
    let eventoBotonCancelar = new CancelarFormularioHandle();
    eventoBotonCancelar.formulario = formulario;
    eventoBotonCancelar.boton = boton;
    eventoBotonCancelar.elem = document.getElementById("controlesprincipales");

    botonCancelar.addEventListener("click", eventoBotonCancelar);

    let boton_enviar_API = formulario.querySelector("button.gasto-enviar-api");
    boton_enviar_API.addEventListener("click", enviarAPIHandle);    

    repintar();
    
}

function repintar(){
    let div_gasto = document.createElement('div');
    div_gasto.className = 'gasto';
    let h1 = document.createElement('h1');
    let texto = "Presupuesto actual"
    h1.append(texto);
    document.getElementById('presupuesto').innerHTML = '';
    div_gasto.append(h1);
    document.getElementById('balance-total').innerHTML = '';
    document.getElementById('gastos-totales').innerHTML = '';
    mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());

    document.getElementById('listado-gastos-completo').innerHTML = '';
    let gastos = gestionPresupuesto.listarGastos();
    gastos.forEach(exp => {mostrarGastoWeb('listado-gastos-completo', exp);});
    
    document.getElementById('listado-gastos-filtrado-1').innerHTML = '';
    let gastos_filtrados = gestionPresupuesto.filtrarGastos({fechaDesde:'2021-09-01', fechaHasta:'2021-09-30'});
    gastos_filtrados.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-1', gastoFiltrado);});

    document.getElementById('listado-gastos-filtrado-2').innerHTML = '';
    gastos_filtrados = gestionPresupuesto.filtrarGastos({valorMinimo:50});
    gastos_filtrados.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-2', gastoFiltrado);});

    document.getElementById('listado-gastos-filtrado-3').innerHTML = '';
    gastos_filtrados = gestionPresupuesto.filtrarGastos({valorMinimo:200,etiquetasTiene:['seguros']});
    gastos_filtrados.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-3', gastoFiltrado);});

    document.getElementById('listado-gastos-filtrado-4').innerHTML = '';
    gastos_filtrados = gestionPresupuesto.filtrarGastos({valorMaximo:50,etiquetasTiene:['comida','transporte']});
    gastos_filtrados.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-4', gastoFiltrado);});

    document.getElementById("agrupacion-dia").innerHTML="";
    mostrarGastosAgrupadosWeb("agrupacion-dia", gestionPresupuesto.agruparGastos("dia"), "día");

    document.getElementById("agrupacion-mes").innerHTML = "";
    mostrarGastosAgrupadosWeb("agrupacion-mes", gestionPresupuesto.agruparGastos("mes"), "mes");

    document.getElementById("agrupacion-anyo").innerHTML = "";
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gestionPresupuesto.agruparGastos("anyo"), "año");

    
}
function actualizarPresupuestoWeb(){
    let presupuesto = parseFloat(prompt("Introduce un presupuesto"))
    gestionPresupuesto.actualizarPresupuesto(presupuesto)
    repintar()
}

 function nuevoGastoWeb(){
    let descripcion = prompt("dime la descripcion del gasto");
    let valor = parseFloat(prompt("dime el valor del gasto"));
    let fecha = Date.parse(prompt("dime la fecha del gasto"));
    let etiquetas = prompt("dime las etiquetas del gasto separadas por comas");
    let arrayEtiquetas = etiquetas.split(',')
    let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,arrayEtiquetas)
    gestionPresupuesto.anyadirGasto(nuevoGasto)
    repintar()
 }

 
 function AnyadirGastoFormularioHandler(){
    this.handleEvent = function(){
        let descripcionForm = this.formulario.elements.descripcion.value;
        let valorForm = this.formulario.elements.valor.value;
        let fechaForm = this.formulario.elements.fecha.value;
        let etiquetasForm = this.formulario.elements.etiquetas.value;
        let array_etiquetasForm = new Array();
        array_etiquetasForm = etiquetasForm.split(",");
        let gastoForm = new gestionPresupuesto.CrearGasto(descripcionForm,parseFloat(valorForm), fechaForm, ...array_etiquetasForm);
        gestionPresupuesto.anyadirGasto(gastoForm);
        this.boton.disabled = false;
        document.getElementById("controlesprincipales").removeChild(this.formulario);
        repintar();
    }
}

 function AplicarEditFormHandler(){
    this.handleEvent = function(e){
        e.preventDefault();
        this.gasto.actualizarDescripcion(this.formulario.elements.descripcion.value);
        this.gasto.actualizarFecha(this.formulario.elements.fecha.value);
        this.gasto.actualizarValor(parseFloat(this.formulario.elements.valor.value));
        let array_etiquetasForm = new Array();
        array_etiquetasForm = this.formulario.elements.etiquetas.value.split(",");
        this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
        this.gasto.anyadirEtiquetas(...array_etiquetasForm);
        this.boton.disabled = false;
        this.elem.removeChild(this.formulario);
        repintar();

    }
}

function CancelarFormularioHandle(){
    this.handleEvent = function(){
        this.boton.disabled = false;
        this.elem.removeChild(this.formulario);
    }
}

function EditarFormularioHandler(){
    this.handleEvent = function(){
        let formulario_abajo = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = formulario_abajo .querySelector("form");
        this.elem.append(formulario);
        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toLocaleDateString();
        formulario.elements.etiquetas.value = this.gasto.etiquetas.toString();

        let aplicarEdit = new AplicarEditFormHandler();
        aplicarEdit.gasto = this.gasto;
        aplicarEdit.formulario = formulario;
        aplicarEdit.boton = this.boton;
        aplicarEdit.elem = this.elem;

        formulario.addEventListener("submit", aplicarEdit);
        this.boton.disabled = true;
    
        let botonCancelar = formulario.querySelector("button.cancelar");
        let eventoBotonCancelar = new CancelarFormularioHandle();
        eventoBotonCancelar.formulario = formulario;
        eventoBotonCancelar.boton = this.boton;
        eventoBotonCancelar.elem = this.elem;
        botonCancelar.addEventListener("click", eventoBotonCancelar);   

        let actualizarAPI = new ActualizarAPIHandle();
        actualizarAPI.gasto = this.gasto;

        let botonActualizarAPI = formulario.querySelector("button.gasto-enviar-api");
        botonActualizarAPI.addEventListener("click", actualizarAPI);    
    }
}
 function EditarHandle(){
    this.handleEvent = function()
    {
        let ArrayEtiquetas = new Array();
        let descripcion = prompt('Introduce la descripción:');
        let valor = parseFloat(prompt('Introduce el valor:'));
        let fecha = prompt('Introduce una fecha con este formato(aaaa-mm-dd):');
        let etiquetas = prompt('Introduce las etiquetas(etiqueta1, etiqueta2, etiqueta3):');
        
        ArrayEtiquetas = etiquetas.split(',');
        
        descripcion !== '' && this.gasto.actualizarDescripcion(descripcion);
        valor >= 0 && this.gasto.actualizarValor(valor);
        fecha !=='' && this.gasto.actualizarFecha(fecha);

        this.gasto.ArrayEtiquetas = ArrayEtiquetas;
        repintar();
    };
 }

 function BorrarHandle(){
    this.handleEvent = function()
    {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    };
 }
 function BorrarEtiquetasHandle(){
    this.handleEvent = function()
    {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
 }

function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).innerHTML= `<br> ${valor} <br>`;
}

function mostrarGastoWeb(idElemento, gasto){
    let elem = document.getElementById(idElemento); 
    
    let divGasto = document.createElement('div');
    divGasto.className += 'gasto';

    let texto = "<h2> Presupuesto </h2>";                                                                          

    let divPresupuesto = document.createElement('div');
    divPresupuesto.className = 'presupuesto';

    let divGastoPresupuesto = document.createElement('div');
    divGastoPresupuesto.className = 'presupuesto';
    divGastoPresupuesto.textContent = texto;

    let divDescripcion  = document.createElement('div');
    divDescripcion.className = 'gasto-descripcion'; 
    divDescripcion.textContent = gasto.descripcion;

    let divFecha   = document.createElement('div');
    divFecha.className = 'gasto-fecha'; 
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    
    let divValor  = document.createElement('div');
    divValor.className = 'gasto-valor'; 
    divValor.textContent = gasto.valor + '';
    
    let divEtiquetas = document.createElement('div');
    divEtiquetas.className = 'gasto-etiquetas'; 

    elem.append(divGasto);
    divGasto.append(divDescripcion);
    divGasto.append(divFecha);
    divGasto.append(divValor);
    divGasto.append(divPresupuesto);
    let espacio = "______________________________________________________"
    let br = document.createElement('br');
    gasto.etiquetas.forEach(label =>
        {
            let borrarEtiquetas = new BorrarEtiquetasHandle();
            borrarEtiquetas.gasto = gasto;
            borrarEtiquetas.etiqueta = label;
            
            let span = document.createElement('span');
            span.className = 'gasto-etiquetas-etiqueta';
            span.textContent = label + '';  
            if(idElemento == "listado-gastos-completo"){
                span.addEventListener("click", borrarEtiquetas);
            }

            divEtiquetas.append(span);   
                 
        });
    
    
    divGasto.append(divEtiquetas);
    
     // boton editar
    let botonEditar = document.createElement('button');
    botonEditar.className = 'gasto-editar';
    botonEditar.type = 'button';
    botonEditar.textContent = 'Editar';

    // evento editar
    let evento_editar = new EditarHandle();
    evento_editar.gasto = gasto;
    botonEditar.addEventListener('click', evento_editar);    

    // boton borrar
    let botonBorrar = document.createElement('button');
    botonBorrar.className = 'gasto-borrar';
    botonBorrar.type = 'button';
    botonBorrar.textContent = 'Borrar';

    // evento borrar API
    let eventoBorrarAPI = new BorrarAPIHandle();
    eventoBorrarAPI.gasto = gasto;

    // boton borrar API
    let botonBorrarAPI = document.createElement("button");
    botonBorrarAPI.className = "gasto-borrar-api";
    botonBorrarAPI.type = "button";
    botonBorrarAPI.textContent = "Borrar (API)";
    botonBorrarAPI.addEventListener('click', eventoBorrarAPI);

    // evento borrar
    let evento_borrar = new BorrarHandle();
    evento_borrar.gasto = gasto;
    botonBorrar.addEventListener('click', evento_borrar);
    
    //boton editar form
    let botonEditarFormulario=document.createElement("button");
    botonEditarFormulario.className="gasto-editar-formulario";
    botonEditarFormulario.type="button";
    botonEditarFormulario.textContent="Editar Form";

    // evento editar form
    let eventoEditarForm = new EditarFormularioHandler();
    eventoEditarForm.gasto=gasto;
    eventoEditarForm.boton=botonEditarFormulario;
    eventoEditarForm.elem= divGasto;
    botonEditarFormulario.addEventListener("click",eventoEditarForm);

    botonEditarFormulario.addEventListener("click", eventoEditarForm);

    if(idElemento == "listado-gastos-completo"){
        divGasto.append(botonEditar);
        divGasto.append(botonBorrar);
        divGasto.append(botonEditarFormulario);
        divGasto.append(br);
        divGasto.append(espacio);
        divGasto.append(br);
        
    } 
    divGasto.append(br);
    divGasto.append(espacio);
    divGasto.append(br);
}    

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elem = document.getElementById(idElemento);
    let texto = "";
    for (let [clave, valor] of Object.entries(agrup)) {
        texto += "<div class='agrupacion-dato'> <span class='agrupacion-dato-clave'> " + clave + " </span>" +
            "<span class='agrupacion-dato-valor'> " + valor + "\n </span></div>";
        
    };
    elem.innerHTML += "<div class='agrupacion'><h1>Gastos agrupados por " + periodo + " </h1>" + texto;
    
}
let formularioFiltrado = document.getElementById("formulario-filtrado");

let eventoFiltrarGastoWeb = new filtrarGastosWeb();
formularioFiltrado.addEventListener("submit", eventoFiltrarGastoWeb);

function filtrarGastosWeb(){
    this.handleEvent = function(e){
        e.preventDefault();
        let desc = document.getElementById("formulario-filtrado-descripcion").value;
        let valmin = parseFloat(document.getElementById("formulario-filtrado-valor-minimo").value);
        let valmax =  parseFloat(document.getElementById("formulario-filtrado-valor-maximo").value);
        let etstiene = document.getElementById("formulario-filtrado-etiquetas-tiene").value;
        let fhasta = document.getElementById("formulario-filtrado-fecha-hasta").value;
        let fdesde = document.getElementById("formulario-filtrado-fecha-desde").value;
        
        let filtro = {};

        if(etstiene.length > 0){
            filtro.etiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(etstiene);
        }
        if(desc != ""){
            filtro.descripcionContiene = desc;
        }
        if(valmin != "" && typeof valmin !== "undefined" && !isNaN(valmin)){
            filtro.valorMinimo = valmin;
        }

        if(valmax != "" && typeof valmax !== "undefined" && !isNaN(valmax)){
            filtro.valorMaximo = valmax;
        }

        if(Date.parse(fdesde)){
            filtro.fechaDesde = fdesde;
        }

        if(Date.parse(fhasta)){
            filtro.fechaHasta = fhasta;
        }

        document.getElementById("listado-gastos-completo").innerHTML="";
        let gastosFiltrado = gestionPresupuesto.filtrarGastos(filtro);
        gastosFiltrado.forEach(g => {
            mostrarGastoWeb("listado-gastos-completo" , g);
        })

    }
}
function cargarGastosWeb(){
    this.handleEvent = function(e){
    let listaGastosStorage = localStorage.getItem('GestorGastosDWEC');
    listaGastosStorage = JSON.parse(listaGastosStorage);

    if(listaGastosStorage){
        gestionPresupuesto.cargarGastos(listaGastosStorage);
    }else{
        listaGastosStorage = [];
        gestionPresupuesto.cargarGastos(listaGastosStorage);
    }
    repintar();
    }
}

function guardarGastosWeb(){
    this.handleEvent = function(e){
      
    let listaGastos = gestionPresupuesto.listarGastos();
    localStorage.setItem('GestorGastosDWEC', JSON.stringify(listaGastos));
    }
}

let botonCargarGastosApi = document.getElementById("cargar-gastos-api");
botonCargarGastosApi.addEventListener('click', new cargarGastosApi);



function cargarGastosApi(){
    let nusuario = document.getElementById('nombre_usuario').value;

    if(nusuario != '')
    {
        let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;

        fetch(url, {

            method: "GET",
        })
        .then(response => response.json())

        .then(function(gastosAPI)
        {

            gestionPresupuesto.cargarGastos(gastosAPI);
            repintar();
        })
        .catch(err => alert(err));
    }else
    {
        alert('No has introducido usuario');
    }
}

function BorrarAPIHandle()
{
    this.handleEvent = function(e)
    {
        let nusuario = document.getElementById('nombre_usuario').value;
        if(nusuario != '')
        {
            let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nusuario}/${this.gasto.gastoId}`;
            fetch(url, 
            {

                method: "DELETE",
            })
            .then(function(response)
            {
                if(!response.ok)
                {
                    alert("Error "+ response.status +": no existe gasto con ese id");
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
            alert('No ha introducido un usuario');
        }
    }
}
function enviarAPIHandle()
{
    let nusuario = document.getElementById('nombre_usuario').value;

    if(nusuario != '')
    {
        let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nusuario}`;    
        var form = document.querySelector("#controlesprincipales form");
        let desc = form.elements.descripcion.value;
        let val = form.elements.valor.value;
        let fech = form.elements.fecha.value;
        let etiq = form.elements.etiquetas.value;

        val = parseFloat(val);
        etiq = etiq.split(',');

        let gastoAPI =
        {
            descripcion: desc,
            valor: val,
            fecha: fech,
            etiquetas: etiq
        };

        fetch(url, {
            method: "POST",
            headers:
            {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(gastoAPI)
    })
    .then(function(response)
    {
        if(!response.ok)
        {
            alert("Error "+response.status+": no se ha creado el gasto");
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

        alert('No has introducido el usuario');
    }

}
function ActualizarAPIHandle()
{
    this.handleEvent = function(e)
    {
        let nusuario = document.getElementById('nombre_usuario').value;

        if(nusuario != '')
        {
            let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nusuario}/${this.gasto.gastoId}`;
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
            fetch(url, {

                method: "PUT",
                headers:
                {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(gastoAPI)
            })

            .then(function(response)
            {
                if(!response.ok)
                {
                    alert("Error "+response.status+": no se ha actualizado el gasto");
                }else
                {
                    alert("Gasto actualizado");
                    cargarGastosApi();
                }
            })
            .catch(err => alert(err));
        }else
        {
            alert('No has introducido usuario');
        }
    }
}// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    nuevoGastoWebFormulario,
    filtrarGastosWeb,
    EditarFormularioHandler,
    guardarGastosWeb,
    cargarGastosWeb,

}