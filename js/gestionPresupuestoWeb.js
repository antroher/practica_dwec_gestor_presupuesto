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
    /*let div = `<div class="gasto">
                            <div class="gasto-descripcion"> ${gasto.descripcion} </div>
                            <div class="gasto-fecha"> ${gasto.fecha} </div>
                            <div class="gasto-valor"> ${gasto.valor} </div>
                            <div class="gasto-etiquetas">`;

    for(let gast of gasto.etiquetas)       
            div += ` <span class="gasto-etiquetas-etiqueta"> ${gast} </span> `;
        
    div += `</div></div>`;

    document.getElementById(idElemento).innerHTML += div;*/

    let ele = document.getElementById(idElemento);  
    
    let divG1 = document.createElement('div');
    divG1.className = 'gasto';

    let divGastoDescri = document.createElement('div');
    divGastoDescri.className = 'gasto-descripcion'; // Le asignamos el id 'gasto-descripcion'
    divGastoDescri.textContent = gasto.descripcion;
    divG1.append(divGastoDescri); //divGastoDescripcion hijo de divGasto
    
    
    let divGastoFech = document.createElement('div');
    divGastoFech.className = 'gasto-fecha'; 
    divGastoFech.textContent = new Date(gasto.fecha).toLocaleDateString();
    divG1.append(divGastoFech); 

    
    let divGastoV1 = document.createElement('div');
    divGastoV1.className = 'gasto-valor'; 
    divGastoV1.textContent = gasto.valor + '';
    divG1.append(divGastoV1); 

    let evBorrarAPI = new BorrarAPIHandle();
    evBorrarAPI.gasto = gasto;

    
    let divGastoEtiq = document.createElement('div');
    divGastoEtiq.className = 'gasto-etiquetas'; 
    gasto.etiquetas.forEach(label =>
        {
            let spanetiq = document.createElement('span');
            spanetiq.className = 'gasto-etiquetas-etiqueta';
            spanetiq.textContent = label + '';

            let borraEti = new BorrarEtiquetasHandle();
            borraEti.gasto = gasto;
            borraEti.etiqueta = label;
            spanetiq.addEventListener('click', borraEti);
            divGastoEtiq.append(spanetiq);            
        }
    );

    divG1.append(divGastoEtiq); 

    if(idElemento == 'listado-gastos-completo')
    {
        let btnEditar = document.createElement('button');
        btnEditar.className = 'gasto-editar';
        btnEditar.type = 'button';
        btnEditar.textContent = 'Editar';

        let editarHandle = new EditarHandle();
        editarHandle.gasto = gasto;
        btnEditar.addEventListener('click', editarHandle);
        divG1.append(btnEditar);

        let btnEditarForm=document.createElement("button");
        btnEditarForm.className="gasto-editar-formulario";
        btnEditarForm.type="button";
        btnEditarForm.textContent="Editar Form";

        let editarHandleForm = new EditarHandleFormulario();
        editarHandleForm.gasto=gasto;
        editarHandleForm.btnEditarGasto=btnEditarForm;
        editarHandleForm.divG1=divG1;
        btnEditarForm.addEventListener("click",editarHandleForm);
        divG1.append(btnEditarForm);


        let btnBorrar = document.createElement('button');
        btnBorrar.className = 'gasto-borrar';
        btnBorrar.type = 'button';
        btnBorrar.textContent = 'Borrar';

        let btnBorrarAPI = document.createElement("button");
        btnBorrarAPI.className = "gasto-borrar-api";
        btnBorrarAPI.type = "button";
        btnBorrarAPI.textContent = "Borrar (API)";
        btnBorrarAPI.addEventListener('click', evBorrarAPI);
        div.append(btnBorrarAPI);

        let borrarHandle = new BorrarHandle();
        borrarHandle.gasto = gasto;
        btnBorrar.addEventListener('click', borrarHandle);
        divG1.append(btnBorrar);
    }   
    
    ele.append(divG1);

}
        

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento);
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
    elemento.innerHTML += mensaje;

}

function repintar()
{
    document.getElementById('presupuesto').innerHTML = '';
    document.getElementById('balance-total').innerHTML = '';
    document.getElementById('gastos-totales').innerHTML = '';
    mostrarDatoEnId('presupuesto', gestionpre.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gestionpre.calcularTotalGastos());
    mostrarDatoEnId('balance-total', gestionpre.calcularBalance());

    document.getElementById('listado-gastos-completo').innerHTML = '';
    let lisgas = gestionpre.listarGastos();
    lisgas.forEach(exp => {mostrarGastoWeb('listado-gastos-completo', exp);});
    
    document.getElementById('listado-gastos-filtrado-1').innerHTML = '';
    let gastosFlt = gestionpre.filtrarGastos({fechaDesde:'2021-09-01', fechaHasta:'2021-09-30'});
    gastosFlt.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-1', gastoFiltrado);});

    document.getElementById('listado-gastos-filtrado-2').innerHTML = '';
    gastosFlt = gestionpre.filtrarGastos({valorMinimo:50});
    gastosFlt.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-2', gastoFiltrado);});

    document.getElementById('listado-gastos-filtrado-3').innerHTML = '';
    gastosFlt = gestionpre.filtrarGastos({valorMinimo:200,etiquetasTiene:['seguros']});
    gastosFlt.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-3', gastoFiltrado);});

    document.getElementById('listado-gastos-filtrado-4').innerHTML = '';
    gastosFlt = gestionpre.filtrarGastos({valorMaximo:50,etiquetasTiene:['comida','transporte']});
    gastosFlt.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-4', gastoFiltrado);});
    
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

        this.btnEditarGasto.disabled=true;
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