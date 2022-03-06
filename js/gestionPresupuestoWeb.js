'use strict'

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
    if (idElemento.includes('completo'))
    {
        divG.id = gasto.id;
    }

    let divDescripcion = document.createElement('div');
    divDescripcion.className += 'gasto-descripcion';
    divDescripcion.textContent = `${gasto.descripcion}`;

    let divValor = document.createElement('div');
    divValor.className += 'gasto-valor';
    divValor.textContent = `${gasto.valor}`; 

    let divFecha = document.createElement('div');
    divFecha.className += 'gasto-fecha';
    divFecha.textContent = `${gasto.fecha}`;

    let divEtiqueta = document.createElement('div');
    divEtiqueta.className += 'gasto-etiquetas';

    for (let etiq of gasto.etiquetas)
    {
        let spanEtiquetas = document.createElement('span');
        spanEtiquetas.className += 'gasto-etiquetas-etiqueta';
        spanEtiquetas.textContent = `${etiq} `;
        divEtiqueta.append(spanEtiquetas);
        
        //Borrar solo para Etiquetas
        if (idElemento.includes('completo'))
        {
            let botonBorrarEtiquetas = new BorrarEtiquetasHandle();
            botonBorrarEtiquetas.gasto = gasto;
            botonBorrarEtiquetas.etiqueta = etiq; 
            spanEtiquetas.addEventListener('click', botonBorrarEtiquetas);        
        }
    }
    
    divG.append(divDescripcion,divFecha,divValor,divEtiqueta);

    elemento.append(divG);

    if (idElemento === 'listado-gastos-completo')
    {
        //boton editar
        let botonEditar = document.createElement('button');
        botonEditar.className += 'gasto-editar';
        botonEditar.textContent = 'Editar';
        botonEditar.type = 'button';

        let editarNew = new EditarHandle();
        editarNew.gasto = gasto;

        botonEditar.addEventListener('click', editarNew);    

        //boton borrar
        let botonBorrar = document.createElement('button');
        botonBorrar.className += 'gasto-borrar';
        botonBorrar.textContent = 'Borrar';
        botonBorrar.type = 'button';

        let borrarNew = new BorrarHandle();
        borrarNew.gasto = gasto;

        botonBorrar.addEventListener('click', borrarNew);

        let gastoActual = document.getElementById(gasto.id);
        gastoActual.append(botonEditar,botonBorrar);    

        //boton borrar API -> PRACTICA 9
        let botonBorrarApi = document.createElement('button');
        botonBorrarApi.className += 'gasto-borrar-api';
        botonBorrarApi.textContent = 'Borrar (API)';
        botonBorrarApi.type = 'button';

        let borrarApiNew = new borrarGastoApiHandle();
        borrarApiNew.gasto = gasto;

        botonBorrarApi.addEventListener('click', borrarApiNew);
        gastoActual.append(botonBorrarApi);

        //boton editar formulario -> PRACTICA 6
        let botonEditForm = document.createElement('button');
        botonEditForm.className += 'gasto-editar-formulario';
        botonEditForm.textContent = 'Editar (formulario)';
        botonEditForm.type = 'button';

        let editarFormNew = new EditarHandleFormulario();
        editarFormNew.gasto = gasto;

        botonEditForm.addEventListener('click', editarFormNew); 
        gastoActual.append(botonEditForm);        
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

//BOTON actualizarpresupuesto
let actualizarpresupuesto = document.getElementById("actualizarpresupuesto");
actualizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);

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

//BOTON anyadirgasto
let anyadirgasto = document.getElementById("anyadirgasto");
anyadirgasto.addEventListener('click', nuevoGastoWeb);

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
        this.gasto.actualizarValor(val);
        this.gasto.actualizarDescripcion(desc);
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
    document.getElementById("anyadirgasto-formulario").disabled = true;

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
    botonEnviarApi.addEventListener('click', enviarGastoApi)
}

//BOTON nuevoGastoWebFormulario
let anyadirgastoForm = document.getElementById("anyadirgasto-formulario");
anyadirgastoForm.addEventListener('click', nuevoGastoWebFormulario);


function EnviarFormularioHandle() //PRACTICA 6 
{
    this.handleEvent = function(event)
    {
        event.preventDefault();
        let accesoEnv = event.currentTarget;
        let desc = accesoEnv.descripcion.value;
        let val = parseFloat(accesoEnv.valor.value);
        let fec = accesoEnv.fecha.value;
        let etique = accesoEnv.etiquetas.value;       

        let gastoEnv = new gestionPresupuesto.CrearGasto(desc, val, fec, etique);
        gestionPresupuesto.anyadirGasto(gastoEnv);      

        repintar();

        document.getElementById("anyadirgasto-formulario").disabled = false;
    }    
}

function CancelarFormularioHandle() //PRACTICA 6 
{
    this.handleEvent = function(event)
    {
        document.getElementById("anyadirgasto-formulario").disabled = false;
        event.currentTarget.parentNode.remove();
        repintar();
    }
}

function EditarHandleFormulario() //PRACTICA 6 
{
    this.handleEvent = function(event) 
    {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");

       // let divContrPrinc = document.getElementById("controlesprincipales");
        //divContrPrinc.append(formulario);

        let accesoEditForm = event.currentTarget;
        accesoEditForm.append(formulario);
        accesoEditForm.disabled = true;

        formulario.descripcion.value = this.gasto.descripcion;
        formulario.valor.value = parseFloat(this.gasto.valor);
        formulario.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        formulario.etiquetas.value = this.gasto.etiquetas; 

        //Boton Enviar
        let enviarFormulario = new EnviarHandle();
        enviarFormulario.gasto = this.gasto;
        formulario.addEventListener('submit', enviarFormulario);

        //Boton Cancelar
        let cancelarFormulario = new CancelarFormularioHandle();
        let botonCancelarFormulario = formulario.querySelector("button.cancelar");
        botonCancelarFormulario.addEventListener('click', cancelarFormulario);

         //Boton Editar Api -> PRACTICA 9
         let editarFormularioApi = new EditarGastoApi();
         let botonEditarFormularioApi = formulario.querySelector("button.gasto-enviar-api");
         editarFormularioApi.gasto = this.gasto;
         botonEditarFormularioApi.addEventListener('click', editarFormularioApi);
     }
}

function EnviarHandle() //PRACTICA 6 
{
    this.handleEvent = function(event) 
    {
        event.preventDefault();
        let accesoEnvH = event.currentTarget;
        
        let desc = accesoEnvH.descripcion.value;
        this.gasto.actualizarDescripcion(desc);

        let val = parseFloat(accesoEnvH.valor.value);
        this.gasto.actualizarValor(val);

        let fec = accesoEnvH.fecha.value;
        this.gasto.actualizarFecha(fec);

        let etique = accesoEnvH.etiquetas.value; 
        this.gasto.anyadirEtiquetas(etique);           

        repintar();
    }
}


//PRACTICA 7 
function filtrarGastoWeb()
{
    this.handleEvent = function(event)
    {
        event.preventDefault();
        //coge el valor del evento, del formulario, te da acceso al contenido del formulario
        let accesoFormFilt = event.currentTarget;
        //cogemos el valor de la descripcion dada por el usuario
        let desc = accesoFormFilt['formulario-filtrado-descripcion'].value;
        let vMinimo = parseInt(accesoFormFilt['formulario-filtrado-valor-minimo'].value);
        let vMaximo = parseInt(accesoFormFilt['formulario-filtrado-valor-maximo'].value);
        let fDesde = accesoFormFilt['formulario-filtrado-fecha-desde'].value;
        let fHasta = accesoFormFilt['formulario-filtrado-fecha-hasta'].value;
        let etiq = accesoFormFilt['formulario-filtrado-etiquetas-tiene'].value;

        etiq = gestionPresupuesto.transformarListadoEtiquetas(etiq);
               
        let crearObjeto =
        {
          fechaDesde: (fDesde === "") ? undefined : fDesde,
          fechaHasta: (fHasta === "") ? undefined : fHasta,
          valorMinimo: (vMinimo === "") ? undefined : vMinimo,
          valorMaximo: (vMaximo === "") ? undefined : vMaximo,
          descripcionContiene: (desc === "") ? undefined : desc,
          etiquetasTiene: (etiq === "") ? undefined : etiq
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


//BOTON ENVIAR a filtrarGastoWeb
let eventFiltrGasto = new filtrarGastoWeb();
let formFiltrGasto = document.getElementById('formulario-filtrado');
formFiltrGasto.addEventListener('submit', eventFiltrGasto);


//PRACTICA 8 

function guardarGastoWeb()
{
    this.handleEvent = function(event)
    {   
        let listaGuardar = gestionPresupuesto.listarGastos();
        localStorage.GestorGastosDWEC = JSON.stringify(listaGuardar);
    }
}

//BOTON GUARDAR
let eventSaveGasto = new guardarGastoWeb();
let saveGast = document.getElementById('guardar-gastos');
saveGast.addEventListener('click', eventSaveGasto );

//--------------------------

function cargarGastoWeb()
{
    this.handleEvent = function(event)
    {   
        
        let carg = JSON.parse(localStorage.getItem('GestorGastosDWEC'));

        if (carg !== null)
        {
            if (carg.length > 0)
            {
                gestionPresupuesto.cargarGastos(carg);
            }            
        }
        else
        {
            gestionPresupuesto.cargarGastos([]);
        }
        
        repintar();
    }
}

//BOTON CARGAR
let eventLoadGasto = new cargarGastoWeb();
let loadGast = document.getElementById('cargar-gastos');
loadGast.addEventListener('click', eventLoadGasto);


// PRACTICA 9 

function cargarGastosApi ()
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
                console.log('No está el nombre del usuario');
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
       console.log('No está el nombre del usuario');
    }

}

//BOTON CARGAR API
let loadGastApi = document.getElementById('cargar-gastos-api');
loadGastApi.addEventListener('click', cargarGastosApi);

function borrarGastoApiHandle()
{
    this.handleEvent = function(event)
    {
        let usuario = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

        if(usuario == "")
        {
            console.log('No está el nombre del usuario');
        }
        else
        {
            fetch(url, {method: 'DELETE'})
            .then(response => response.json())
            .then(datos => 
            {
                if(datos.errorMessage)
                {
                    console.log(datos.errorMessage);
                }
                else
                {
                    cargarGastosApi();
                }
            })
            .catch(error => console.error(error));
        }
    }
}

function enviarGastoApi(event)
{

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
    
}

function EditarGastoApi()
{
    this.handleEvent = function(event)
    {
        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

        let formulario = e.currentTarget.form;
        let descripcionNew = formulario.elements.descripcion;
        let valorNew = parseFloat(formulario.elements.valor);
        let fechaNew = formulario.elements.fecha;
        let etiquetasNew = (formulario.elements.etiquetas).split(',');

        let nuevoG = 
        {
            descripcion: descripcionNew,
            fecha: fechaNew,
            valor: valorNew,
            etiquetas: etiquetasNew
        }

        if(usuario == '')
        {
            console.log('No hay el nombre del usuario')
        }
        else 
        {
            fetch(url, {
                method: 'PUT', 
                body: JSON.stringify(nuevoG),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(response => 
            {
                if (response.ok)
                {
                    cargarGastosApi();
                }
                else
                {
                    console.log('Error');
                }
            })
            .catch(error => console.error(error));
        }  
    }
}



//********** NO TOCAR **************
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}