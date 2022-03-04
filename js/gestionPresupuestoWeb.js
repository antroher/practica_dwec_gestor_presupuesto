'use strict';

import * as gestionPresupuesto from './gestionPresupuesto.js';
 

function mostrarDatoEnId(idElemento,valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML += `<p>${valor}</p>`;
}

function mostrarGastoWeb(idElemento, gasto)
{
    let elemento = document.getElementById(idElemento);

    let divG = document.createElement('div');
    divG.className += 'gasto';
    divG.id = 'gasto-editar';
    if (idElemento.includes('completo'))
    {
        divG.id = gasto.id;
    }

    let divDescripcion = document.createElement('div');
    divDescripcion.className += 'gasto-descripcion';
    divDescripcion.textContent = gasto.descripcion;

    let divFecha = document.createElement('div');
    divFecha.className += 'gasto-fecha';
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();

    let divValor = document.createElement('div');
    divValor.className += 'gasto-valor';
    divValor.textContent = gasto.valor + "";     

    let divEtiqueta = document.createElement('div');
    divEtiqueta.className += 'gasto-etiquetas';

    for (let etiq of gasto.etiquetas)
    {
        let spanEtiquetas = document.createElement('span');
        spanEtiquetas.className += 'gasto-etiquetas-etiqueta';
        spanEtiquetas.textContent = etiq + " ";
        divEtiqueta.append(spanEtiquetas);
        
        //Borrar solo para Etiquetas
        if (idElemento.includes('completo'))
        {
            let botonBorrarEtiquetas = new BorrarEtiquetasHandle();
            botonBorrarEtiquetas.gasto = gasto;
            botonBorrarEtiquetas.etiqueta = etiq; //* ETIQUETA *A
            spanEtiquetas.addEventListener('click', botonBorrarEtiquetas);        
        }
    }
    
    divG.append(divDescripcion,divFecha,divValor,divEtiqueta);

    elemento.append(divG);

    if (idElemento == 'listado-gastos-completo')
    {
        //boton editar
        let botonEditar = document.createElement('button');
        botonEditar.className += 'gasto-editar';
        botonEditar.id = 'gasto-editar';
        botonEditar.textContent = 'Editar';
        botonEditar.type = 'button';

        let editarNew = new EditarHandle();
        editarNew.gasto = gasto;

        botonEditar.addEventListener('click', editarNew); 
        divG.append(botonEditar);   

        //boton borrar
        let botonBorrar = document.createElement('button');
        botonBorrar.className += 'gasto-borrar';
        botonBorrar.id = "gasto-borrar";
        botonBorrar.textContent = 'Borrar';
        botonBorrar.type = 'button';

        let borrarNew = new BorrarHandle();
        borrarNew.gasto = gasto;

        botonBorrar.addEventListener('click', borrarNew);
        divG.append(botonBorrar);
        //let gastoActual = document.getElementById(gasto.id);
        //gastoActual.append(botonEditar,botonBorrar);    

        //boton borrar API -> PRACTICA 9
        let botonBorrarApi = document.createElement('button');
        botonBorrarApi.className += 'gasto-borrar-api';
        botonBorrarApi.id = "gasto-borrar-api";
        botonBorrarApi.textContent = 'Borrar (API)';
        botonBorrarApi.type = 'button';

        let borrarApiNew = new BorrarGastoApiHandle();
        borrarApiNew.gasto = gasto;

        botonBorrarApi.addEventListener('click', borrarApiNew);
        divG.append(botonBorrarApi);
        //gastoActual.append(botonBorrarApi);

        //boton editar formulario -> PRACTICA 6
        let botonEditForm = document.createElement('button');
        botonEditForm.className += 'gasto-editar-formulario';
        botonEditForm.id = "gasto-editar-formulario";
        botonEditForm.textContent = 'Editar (formulario)';
        botonEditForm.type = 'button';

        let editarFormNew = new EditarHandleFormulario();
        editarFormNew.gasto = gasto;

        botonEditForm.addEventListener('click', editarFormNew);
        divG.append(botonEditForm);
        //gastoActual.append(botonEditForm);        
    }      
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let divP = document.getElementById(idElemento);
    divP.innerHTML = "";
    
    let lista = "";
    for (let [nombre, valor] of Object.entries(agrup))
    {
        lista +=    `<div class="agrupacion-dato">
                        <span class="agrupacion-dato-clave"> ${nombre} </span>
                        <span class="agrupacion-dato-valor"> ${valor} </span>
                    </div>`
    };

    divP.innerHTML +=   `<div class="agrupacion">
                                <h1> Gastos agrupados por ${periodo} </h1>

                            ${lista}`

    //PRACTICA 10
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

function repintar()
{
    document.getElementById('presupuesto').innerHTML='';
    mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
    
    document.getElementById('gastos-totales').innerHTML='';
    mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
    
    document.getElementById('balance-total').innerHTML='';
    mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance())

    document.getElementById('listado-gastos-completo').innerHTML = '';

    let listaGasto = gestionPresupuesto.listarGastos();
    for (let gasto of listaGasto)
    {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    } 
    
    //PRACTICA 10
    let DiaG = gestionPresupuesto.agruparGastos("dia");
    mostrarGastosAgrupadosWeb("agrupacion-dia", DiaG, "día");

    let MesG = gestionPresupuesto.agruparGastos("mes");
    mostrarGastosAgrupadosWeb("agrupacion-mes", MesG, "mes");

    let AnyoG = gestionPresupuesto.agruparGastos("anyo");
    mostrarGastosAgrupadosWeb("agrupacion-anyo", AnyoG, "año");
}

function actualizarPresupuestoWeb()
{
    let presupuesto = parseFloat(prompt('Introduzca el presupuesto'));
    gestionPresupuesto.actualizarPresupuesto(presupuesto);
    repintar();
}

function nuevoGastoWeb()
{
    let descripcionNew = prompt('Introduzca la descripción del gasto');
    let valorNew = parseFloat(prompt('Introduzca un valor del gasto'));
    let fechaNew = prompt('Introduzca una fecha del gasto en formato yyyy-mm-dd');
    let etiquetasNew = prompt('Introduzca las etiquetas del gasto');
    let separador = ',';
    let Etiquetas = etiquetasNew.split(separador);
    gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto(descripcionNew, valorNew, fechaNew, ...Etiquetas));
    repintar();
}

function EditarHandle()
{
    this.handleEvent = function(event) 
    {
        //Pedir al usuario datos del gasto, etc
        let desc = prompt('Introduzca la descripción del gasto');
        let val = parseFloat(prompt('Introduzca el valor del gasto'));
        let fec = prompt('Introduzca una fecha del gasto en formato yyyy-mm-dd');
        let etique = prompt('Introduzca las etiquetas del gasto (lista separada por comas)');
        let separador = ',';
        let etiq = etique.split(separador);
        this.gasto.actualizarDescripcion(desc);
        this.gasto.actualizarValor(val);        
        this.gasto.actualizarFecha(fec);
        this.gasto.anyadirEtiquetas(...etiq);
        repintar();
    }
}

function BorrarHandle()
{
    this.handleEvent = function(event)
    {       
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle() 
{
    this.handleEvent = function(event)
    {        
        this.gasto.borrarEtiquetas(this.etiqueta);  //*OJO CON ETIQUETA *A      
        repintar();
    }
}

function nuevoGastoWebFormulario() //PRACTICA 6 - a y b
{
    //Copia en enunciado
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");

    let divContrPrinc = document.getElementById("controlesprincipales");
    divContrPrinc.append(formulario);

    //Para desactivar boton
    let botonAnyadir = document.getElementById("anyadirgasto-formulario");
    botonAnyadir.disabled = true;

    //Boton Enviar
    let enviar = new EnviarFormularioHandle();
    formulario.addEventListener('submit', enviar);

    //Boton Cancelar
    let botonCancelar = formulario.querySelector("button.cancelar");
    let cancelar = new CancelarFormularioHandle();
    cancelar.botonAnyadir = botonAnyadir;
    botonCancelar.addEventListener('click', cancelar);

    //Boton Enviar Api - PRACTICA 9    
    let botonEnviarApi = formulario.querySelector("button[class='gasto-enviar-api']");
    botonEnviarApi.addEventListener('click', EnviarGastoApi)
}

function EnviarFormularioHandle() //PRACTICA 6 - a y b
{
    this.handleEvent = function(event)
    {
        event.preventDefault();
        let formulario = event.currentTarget;
        let desc = formulario.elements.descripcion.value;
        let val = parseFloat(formulario.elements.valor.value);
        let fec = formulario.elements.fecha.value;
        let etique = formulario.elements.etiquetas.value;       

        let gastoEnv = new gestionPresupuesto.CrearGasto(desc, val, fec, etique);
        gestionPresupuesto.anyadirGasto(gastoEnv);      

        repintar();

        document.getElementById("anyadirgasto-formulario").disabled = false;
    }    
}

function CancelarFormularioHandle() //PRACTICA 6 - a y b
{
    this.handleEvent = function(event)
    {
        this.botonAnyadir.disabled = false;
        //document.getElementById("anyadirgasto-formulario").disabled = false;
        event.currentTarget.parentNode.remove();
        //repintar();
    }
}

function CancelarFormularioHandleIndividual()
{
    this.handleEvent = function(event)
    {
        this.botonEditar.disabled = false;
        event.currentTarget.parentNode.remove();
    }
}

function EditarHandleFormulario() //PRACTICA 6 - c y d
{
    this.handleEvent = function(event) 
    {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");

        //let divContrPrinc = document.getElementById("controlesprincipales");
        //divContrPrinc.append(formulario);

        let botonEditForm  = event.currentTarget;
        botonEditForm.after(formulario);
        botonEditForm.disabled = true;

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = parseFloat(this.gasto.valor);
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substring(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas.toString(); 

        //Boton Enviar
        let enviarFormulario = new EnviarHandle();
        enviarFormulario.gasto = this.gasto;
        formulario.addEventListener('submit', enviarFormulario);

        //Boton Cancelar
        let cancelarFormulario = new CancelarFormularioHandleIndividual();
        cancelarFormulario.botonEditar = botonEditForm;
        let botonCancelarFormulario = formulario.querySelector("button.cancelar");
        botonCancelarFormulario.addEventListener('click', cancelarFormulario);

        //Boton Editar Api -> PRACTICA 9
        let editarFormularioApi = new EditarGastoApi();
        let botonEditarFormularioApi = formulario.querySelector("button.gasto-enviar-api");
        editarFormularioApi.gasto = this.gasto;
        botonEditarFormularioApi.addEventListener('click', editarFormularioApi);
    }
}

function EnviarHandle() //PRACTICA 6 - c y d
{
    this.handleEvent = function(event) 
    {
        event.preventDefault();
        let formulario = event.currentTarget;
        
        let desc = formulario.elements.descripcion.value;
        this.gasto.actualizarDescripcion(desc);

        let val = parseFloat(formulario.elements.valor.value);
        this.gasto.actualizarValor(val);

        let fec = formulario.elements.fecha.value;
        this.gasto.actualizarFecha(fec);

        let etique = formulario.elements.etiquetas.value; 
        this.gasto.anyadirEtiquetas(etique);           

        repintar();
    }
}

//******************************************************
//********************* PRACTICA 7 *********************
//******************************************************
function filtrarGastoWeb()
{
    this.handleEvent = function(event)
    {
        event.preventDefault();
        
        let formulario = event.currentTarget;
        let desc = formulario.elements['formulario-filtrado-descripcion'].value;
        let vMinimo = parseFloat(formulario.elements['formulario-filtrado-valor-minimo'].value);
        let vMaximo = parseFloat(formulario.elements['formulario-filtrado-valor-maximo'].value);
        let fDesde = formulario.elements['formulario-filtrado-fecha-desde'].value;
        let fHasta = formulario.elements['formulario-filtrado-fecha-hasta'].value;
        let etiq = formulario.elements['formulario-filtrado-etiquetas-tiene'].value;

        if (etiq !== null)
        {
            etiq = gestionPresupuesto.transformarListadoEtiquetas(etiq);
        }
               
        let crearObjeto =
        {
            fechaDesde: fDesde,
            fechaHasta: fHasta,
            valorMinimo: vMinimo, 
            valorMaximo: vMaximo,
            descripcionContiene: desc,
            etiquetasTiene: etiq
        }

        let listaFiltrarObjeto = gestionPresupuesto.filtrarGastos(crearObjeto);

        let listaGastos = document.getElementById('listado-gastos-completo');
        listaGastos.innerHTML = '';

        for (let gasto of listaFiltrarObjeto)
        {
            mostrarGastoWeb('listado-gastos-completo', gasto);
        }
    }      
}

//******************************************************
//********************* PRACTICA 8 *********************
//******************************************************
function guardarGastoWeb()
{
    this.handleEvent = function(event)
    {   
        let listaGuardar = gestionPresupuesto.listarGastos();
        localStorage.GestorGastosDWEC = JSON.stringify(listaGuardar);
    }
}

//--------------------------

function cargarGastosWeb()
{
    this.handleEvent = function(event)
    {   

        if (localStorage.GestorGastosDWEC == null)
        {
            gestionPresupuesto.cargarGastos([]);           
        }
        else
        {
            gestionPresupuesto.cargarGastos(JSON.parse(localStorage.GestorGastosDWEC));
        }
        
        repintar();
    }
}



//******************************************************
//********************* PRACTICA 9 *********************
//******************************************************
function cargarGastosApi()
{
    let usuario = document.getElementById("nombre_usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;
    
    if (usuario != '')
    {
        fetch (url, {method: 'GET'})
        .then(response => response.json())
        .then((result) => 
        {
            if (result == '')
            {
                console.log('No hay el nombre del usuario');
            }
            else 
            {
                gestionPresupuesto.cargarGastos(result);
                repintar();
            }
        })
        .catch(err => console.error(err));        
    }
    else
    {
       console.log('No hay el nombre del usuario');
    }
}

function BorrarGastoApiHandle()
{
    this.handleEvent = function(event)
    {
        let usuario = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;
        
        if(usuario != "")
        {           
            fetch(url, {method: 'DELETE'})
            .then(response => response.json())
            .then(resp => 
            {
                if(!resp.errorMessage)
                {
                    console.log('gasto borrado');
                    cargarGastosApi;                    
                }
                else
                {
                    console.log('Error')
                }
            })
            .catch(err => console.error(err))
        }   
        else
        {
            console.log('Introduce un usuario');
        }
    }
}

function EnviarGastoApi(event)
{
    //this.handleEvent = function(event) 
    //{
        let usuario = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;

        let formulario = event.currentTarget.form;
        
        let gastoApi = 
        {
            descripcion: formulario.descripcion.value,
            valor: parseFloat(formulario.valor.value),
            fecha: formulario.fecha.value,
            etiquetas: formulario.etiquetas.value.split(","),
        }

        if (usuario == "")
        {
            console.log("El input del nombre de usuario está vacio");
        }
        else 
        {
            fetch(url,
                {
                    method: 'POST',
                    headers: 
                    {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(gastoApi),                    
                }
            )
            .then(response =>
            {
                if(response.ok)
                {
                    console.log("Correcto");
                    cargarGastosApi();
                }
                else 
                {
                    console.log("Error");
                }
            }) 
            .catch(err => console.error(err));
        }
        
    //}      
}

function EditarGastoApi()
{
    this.handleEvent = function(event)
    {
        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

        let formulario = event.currentTarget.form;
    
        let gastoAPI = 
        {
            descripcion: formulario.elements.descripcion.value,                
            valor: parseFloat(formulario.elements.valor.value),
            fecha: formulario.elements.fecha.value,
            etiquetas: (formulario.elements.etiquetas.value).split(",")
        }

        if (usuario == "")
        {
            console.log("No hay el nombre");
        }
        else 
        {
            fetch(url, 
                {
                    method: 'PUT', 
                    headers:{'Content-Type': 'application/json;charset=utf-8'},
                    body: JSON.stringify(gastoAPI)
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

//BOTON actualizarpresupuesto
let actualizarpresupuesto = document.getElementById("actualizarpresupuesto");
actualizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);

//BOTON anyadirgasto
let anyadirgasto = document.getElementById("anyadirgasto");
anyadirgasto.addEventListener('click', nuevoGastoWeb);

//BOTON nuevoGastoWebFormulario
let anyadirgastoForm = document.getElementById("anyadirgasto-formulario");
anyadirgastoForm.addEventListener('click', nuevoGastoWebFormulario);

//BOTON ENVIAR a filtrarGastoWeb
let eventFiltrGasto = new filtrarGastoWeb();
let formFiltrGasto = document.getElementById('formulario-filtrado');
formFiltrGasto.addEventListener('submit', eventFiltrGasto);

//BOTON GUARDAR GASTOS
let guardarGastos = new guardarGastoWeb();
let saveGast = document.getElementById('guardar-gastos');
saveGast.addEventListener('click', guardarGastos);

//BOTON CARGAR GASTOS
let cargarGastos = new cargarGastosWeb();
let loadGast = document.getElementById('cargar-gastos');
loadGast.addEventListener('click', cargarGastos);

//BOTON CARGAR API
let loadGastApi = document.getElementById('cargar-gastos-api');
loadGastApi.addEventListener('click', cargarGastosApi);

//********** NO TOCAR **************
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}