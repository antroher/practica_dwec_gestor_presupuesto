"use strict";

import * as gestionpre from './gestionPresupuesto.js';

document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);
let erFiltrar = new filtrarGastosWeb();
document.getElementById("formulario-filtrado").addEventListener("submit", erFiltrar);
document.getElementById("guardar-gastos").addEventListener('click', guardarGastosWeb);
document.getElementById("cargar-gastos").addEventListener('click', cargarGastosWeb);
//API
document.getElementById("cargar-gastos-api").addEventListener('click', cargarGastosApi);


function mostrarDatoEnId(idElemento, valor)
{
    let elem = document.getElementById(idElemento);
    let parrafo = document.createElement('p');
    parrafo.textContent = valor;
    elem.appendChild(parrafo);

}

function mostrarGastoWeb(idElemento, gasto)
{
    let mostrar = document.getElementById(idElemento);

    //Botón editar gasto
    let evEditar = new EditarHandle();
    evEditar.gasto = gasto;

    //Botón borrar gasto
    let evBorrar = new BorrarHandle();
    evBorrar.gasto = gasto;

    //Botón editar gasto formulario
    let evEditarFormulario = new EditarHandleFormulario();
    evEditarFormulario.gasto = gasto;

    //Botón borrar API
    let evBorrarAPI = new BorrarAPIHandle();
    evBorrarAPI.gasto = gasto;

    let div = document.createElement("div");
    div.className = "gasto";

    let divDesc = document.createElement("div");
    divDesc.className = "gasto-descripcion";
    divDesc.textContent = `${gasto.descripcion}`;

    let divFech = document.createElement("div");
    divFech.className = "gasto-fecha";
    divFech.textContent = `${gasto.fecha}`;

    let divVal = document.createElement("div");
    divVal.className = "gasto-valor";
    divVal.textContent = `${gasto.valor}`;

    let divEtiq = document.createElement("div");
    divEtiq.className = "gasto-etiquetas";

    for(let etiqueta of gasto.etiquetas){
        let spanEtiq = document.createElement("span");
        spanEtiq.className = "gasto-etiquetas-etiqueta";
        spanEtiq.textContent = `${etiqueta}`;
        divEtiq.append(spanEtiq);
        //Borrar etiqueta
        let evEtiqueta = new BorrarEtiquetasHandle();
        evEtiqueta.gasto = gasto;
        evEtiqueta.etiqueta = etiqueta;
        spanEtiq.addEventListener("click", evEtiqueta);
    }

    let btnEditar = document.createElement("button");
    btnEditar.className = "gasto-editar";
    btnEditar.type = "button";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", evEditar);

    let btnBorrar = document.createElement("button");
    btnBorrar.className = "gasto-borrar";
    btnBorrar.type = "button";
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", evBorrar);

    let btnBorrarAPI = document.createElement("button");
    btnBorrarAPI.className = "gasto-borrar-api";
    btnBorrarAPI.type = "button";
    btnBorrarAPI.textContent = "Borrar (API)";
    btnBorrarAPI.addEventListener('click', evBorrarAPI);

    let btnEditaFormulario = document.createElement("button");
    btnEditaFormulario.className = "gasto-editar-formulario";
    btnEditaFormulario.type = "button";
    btnEditaFormulario.textContent = "Editar (formulario)";
    btnEditaFormulario.addEventListener("click", evEditarFormulario);

    div.append(divDesc);
    div.append(divFech);
    div.append(divVal);
    div.append(divEtiq);
    div.append(btnEditar);
    div.append(btnBorrar);
    div.append(btnBorrarAPI);
    div.append(btnEditaFormulario);
    mostrar.append(div);  
}
        

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    /*let elemento = document.getElementById(idElemento);
    let mensaje= 
    "<div class='agrupacion'>\n" + 
    "<h1>Gastos agrupados por " + periodo + "</h1>\n";
    for(let etiq in agrup)
    {
        mensaje += 
        "<div class='agrupacion-dato'>\n" +
        "<span class='agrupacion-dato-clave'>" + etiq + "</span>\n" +
        "<span class='agrupacion-dato-valor'>" + agrup[etiq] + "</span>\n"+
        "</div>\n";
    }
    mensaje += "</div>\n";
    elemento.innerHTML += mensaje;*/

    var divP = document.getElementById(idElemento);
    divP.innerHTML = '';

    let mostrar = document.getElementById(idElemento);

    let div = document.createElement("div");
    div.className = "agrupacion";

    let h1 = document.createElement("h1");
    h1.textContent = `Gastos agrupados por ${periodo}`;

    div.append(h1);

    for(const [key, value] of Object.entries(agrup)){
        let divAgrupacion = document.createElement("div");
        divAgrupacion.className = "agrupacion-dato";

        let spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.textContent = `${key}`;

        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.textContent = `${value}`;

        divAgrupacion.append(spanClave);
        divAgrupacion.append(spanValor);

        div.append(divAgrupacion);
    }

    mostrar.append(div);

    //*//
    // Estilos
    divP.style.width = "33%";
    divP.style.display = "inline-block";
    // Crear elemento <canvas> necesario para crear la gráfica
    // https://www.chartjs.org/docs/latest/getting-started/
    let chart = document.createElement("canvas");
    // Variable para indicar a la gráfica el período temporal del eje X
    // En función de la variable "periodo" se creará la variable "unit" (anyo -> year; mes -> month; dia -> day)
    let unit = "";
    switch (periodo) 
    {
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
    let presupuesto = gestionpre.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);
    
    let gasTotales = gestionpre.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gasTotales);
    
    let balTotal = gestionpre.calcularBalance();
    mostrarDatoEnId("balance-total", balTotal);
    
    document.getElementById("listado-gastos-completo").innerHTML = '';
    
    let lisgastos = gestionpre.listarGastos();
    
    for(let gasto of lisgastos)
    {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
    
    let gastosAgruparDia = gestionpre.agruparGastos("dia");
    mostrarGastosAgrupadosWeb("agrupacion-dia", gastosAgruparDia, "día");

    let gastosAgruparMes = gestionpre.agruparGastos("mes");
    mostrarGastosAgrupadosWeb("agrupacion-mes", gastosAgruparMes, "mes");

    let gastosAgruparAnyo = gestionpre.agruparGastos("anyo");
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAgruparAnyo, "año");
    
}

function actualizarPresupuestoWeb()
{
    let presupuesto = prompt('Introduce un presupuesto nuevo');
    presupuesto = parseInt(presupuesto);

    gestionpre.actualizarPresupuesto(presupuesto);

    repintar();
}

function nuevoGastoWeb()
{
    let descrip = prompt('Introduce la descripción del gasto: ');
    let valor = prompt('Introduce el valor del gasto: ');
    let fecha = prompt('Introduce la fecha del gasto: ');
    let etiq = prompt('Introduce las etiquetas: ');

    valor = parseFloat(valor);
    etiq = etiq.split(',');

    let g1 = new gestionpre.CrearGasto(descrip, valor, fecha, etiq);

    gestionpre.anyadirGasto(g1);

    repintar();
}

function nuevoGastoWebFormulario()
{
    document.getElementById("anyadirgasto-formulario").disabled=true;

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    let form = plantillaFormulario.querySelector("form");
    form.addEventListener("submit",this.handleEvent=function(event){
        event.preventDefault();
        let descrip = form.elements.descripcion;
        let valor = form.elements.valor;
        let fecha = form.elements.fecha;
        let etiq=form.elements.etiquetas;
        etiq=etiq.value.split(",");
        let gasto = new gestionpre.CrearGasto(descrip.value,parseFloat(valor.value),fecha.value,...etiq);
        gestionpre.anyadirGasto(gasto);
        document.getElementById("anyadirgasto-formulario").disabled=false;
        document.getElementById("controlesprincipales").removeChild(form);
        repintar();

    });
    document.getElementById("controlesprincipales").append(form);
    
    let btnCancelar=form.querySelector("button.cancelar");
    btnCancelar.addEventListener("click",this.handleEvent=function(){

    let btnEnviarAPI = formulario.querySelector("button.gasto-enviar-api");
    btnEnviarAPI.addEventListener("click", enviarAPIHandle);    
        
        document.getElementById("anyadirgasto-formulario").disabled=false;
        document.getElementById("controlesprincipales").removeChild(form);
        repintar();

    });
}

function BorrarHandle()
{
    this.handleEvent = function()
    {
        gestionpre.borrarGasto(this.gasto.id);
        repintar();
    };
 }
 function BorrarEtiquetasHandle()
 {
    this.handleEvent = function()
    {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
 }

 function EditarHandle()
 {

    this.handleEvent = function(e)
    {
       //Pedir datos al usuario
       let descri = prompt("Introduce la descripción nueva: ", this.gasto.descripcion);
       let v1 = prompt("Introduce el valor nuevo: ", this.gasto.valor);
       let f1 = prompt("Introduce la fecha nueva: ", this.gasto.fecha);
       let etiq = prompt("Inroduce las etiquetas nuevas: ", this.gasto.etiquetas);

       v1 = parseFloat(v1);
       etiq = etiq.split(',');

       this.gasto.actualizarDescripcion(descri);
       this.gasto.actualizarValor(v1);
       this.gasto.actualizarFecha(f1);
       this.gasto.anyadirEtiquetas(...etiq);

       repintar();
    }
}

function EditarHandleFormulario()
{
    this.handleEvent=function()
    {
        let g0=this.gasto;
        let btnEditG=this.btnEditarGasto;
        let divG0=this.divG1;

        this.btnEditarGasto.disabled=false;
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let form = plantillaFormulario.querySelector("form");

        form.elements.descripcion.value=g0.descripcion;
        form.elements.valor.value=g0.valor;
        form.elements.fecha.value=new Date(g0.fecha).toLocaleDateString();
        form.elements.etiquetas.value=g0.etiquetas.toString();
        divG0.appendChild(form);
        

        form.addEventListener("submit",this.handleEvent=function(event)
        {
            event.preventDefault();
            g0.actualizarDescripcion(form.elements.descripcion.value);
            g0.actualizarValor(parseFloat(form.elements.valor.value));
            g0.actualizarFecha(form.elements.fecha.value);
            let etiquetas=form.elements.etiquetas;
            etiquetas=etiquetas.value.split(",");
            g0.anyadirEtiquetas(...etiquetas);
            btnEditG.disabled=false;
            divG0.removeChild(form);
            repintar();
        });

        let btnCancelar=form.querySelector("button.cancelar");
        btnCancelar.addEventListener("click",this.handleEvent=function()
        {
            btnEditG.disabled=false;
            divG0.removeChild(form);
            repintar();
        });
        let actualizarAPI = new ActualizarAPIHandle();
        actualizarAPI.gasto = this.gasto;
        let btnActualizarAPI = formulario.querySelector("button.gasto-enviar-api");
        btnActualizarAPI.addEventListener("click", actualizarAPI);
    }
}

function filtrarGastosWeb()
{
    this.handleEvent=function(event){
        event.preventDefault();
        let descrip=document.getElementById("formulario-filtrado-descripcion").value;
        let valormin = parseFloat(document.getElementById("formulario-filtrado-valor-minimo").value);
        let valormax = parseFloat(document.getElementById("formulario-filtrado-valor-maximo").value);
        let fecDesde = document.getElementById("formulario-filtrado-fecha-desde").value;
        let fecHasta=document.getElementById("formulario-filtrado-fecha-hasta").value;
        let etiq=document.getElementById("formulario-filtrado-etiquetas-tiene").value;
        let etiqBuscar=[];
        if(etiq!=="" && typeof etiq !== 'undefined'){
            etiqBuscar=gestionpre.transformarListadoEtiquetas(etiq);
        }
       
        let filtro={};
        if(descrip!=="" && typeof descrip !== 'undefined')
        {
            filtro.descripcionContiene=descrip;
        }
        if(valormin!=="" && typeof valormin !== 'undefined' && !isNaN(valormin))
        {
            filtro.valorMinimo=valormin;
        }
        if(valormax!=="" && typeof valormax !== 'undefined'&& !isNaN(valormax))
        {
            filtro.valorMaximo=valormax;
        }
        if(fecDesde!=="" && typeof fecDesde !== 'undefined')
        {
            filtro.fechaDesde=fecDesde;
        }
        if(fecHasta!=="" && typeof fecHasta !== 'undefined')
        {
            filtro.fechaHasta=fecHasta;
        }
        if(etiqBuscar.length>0)
        {
            filtro.etiquetasTiene=etiqBuscar;
        }
        
        console.log(filtro);
        let filtroG=gestionpre.filtrarGastos(filtro);
        document.getElementById("listado-gastos-completo").innerHTML="<hr>";
        filtroG.forEach(FG => {
            mostrarGastoWeb("listado-gastos-completo",FG);
        });
        document.getElementById("listado-gastos-completo").innerHTML+="<hr>";
    };
}

function guardarGastosWeb()
{
    localStorage.GestorGastosDWEC = JSON.stringify(gestionpre.listarGastos());
}

function cargarGastosWeb()
{
    let gastosLG;
    
    if(localStorage.getItem('GestorGastosDWEC'))
    {
        gastosLG = JSON.parse(localStorage.getItem('GestorGastosDWEC'));   
    }
    else
    {
        gastosLG = [];
    }

    gestionpre.cargarGastos(gastosLG);

    repintar();
}

function cargarGastosApi()
{
    let NUsuario = document.getElementById('nombre_usuario').value;

    if(NUsuario != '')
    {
        let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;

        fetch(url, {
            method: "GET",
        })
        .then(response => response.json())
        .then(function(gastosAPI)
        {
            gestionpre.cargarGastos(gastosAPI);
        
            repintar();
        })
        .catch(err => alert(err));
    }
    else
    {
        alert('No has introducido un nombre de usuario');
    }

}

function BorrarAPIHandle()
{
    this.handleEvent = function(e)
    {
        let NUsuario = document.getElementById('nombre_usuario').value;

        if(NUsuario != '')
        {
            let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.gastoId}`;
            
            fetch(url, 
            {
                method: "DELETE",
            })
            .then(function(response)
            {
                if(!response.ok)
                {
                    alert("Error "+ response.status +": en la API no existe ningún gasto con ese id");
                }
                else
                {
                    alert("Gasto borrado correctamente");
                    cargarGastosApi();
                }
            })
            .catch(err => alert(err));


        }
        else
        {
            alert('No ha introducido un nombre de Usuario');
        }

    }
}

function enviarAPIHandle()
{
    let NUsuario = document.getElementById('nombre_usuario').value;

    if(NUsuario != '')
    {
        let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${NUsuario}`;    
    var form = document.querySelector("#controlesprincipales form");
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
            alert("Error "+response.status+": no se ha podido crear el gasto en la API");
        }
        else
        {
            alert("Gasto creado correctamente");
            cargarGastosApi();
        }
    })
    .catch(err => alert(err));         

}
    else
    {
        alert('No has introducido un nombre de usuario');
    }

}

function ActualizarAPIHandle()
{
    this.handleEvent = function(e)
    {
        let nombreUsuario = document.getElementById('nombre_usuario').value;

        if(nombreUsuario != '')
        {
            let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.gastoId}`;

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
                    alert("Error "+response.status+": no se ha podido actualizar el gasto de la API");
                }else
                {
                    alert("Gasto actualizado correctamente");
                    cargarGastosApi();
                }
            })
            .catch(err => alert(err));
        }
        else
        {
            alert('No has introducido un nombre de usuario');
        }
    }
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
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
    BorrarHandle,
    BorrarEtiquetasHandle,
    EditarHandleFormulario,
    EditarHandle,
    filtrarGastosWeb
}