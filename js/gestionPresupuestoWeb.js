'use strict';
import * as gestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor)
{
    let elem = document.getElementById(idElemento);
    let p= document.createElement('p');

    p.textContent=valor;
    elem.appendChild(p);
}

function mostrarGastoWeb(idElemento, gasto)
{
    let elem = document.getElementById(idElemento);

    
    let divGastos = document.createElement("div");
    divGastos.className += "gasto";
    elem.append(divGastos);

   
    let divGastosDescrip = document.createElement("div");
    divGastosDescrip.className += "gasto-descripcion";
    divGastosDescrip.textContent = gasto.descripcion;
    divGastos.append(divGastosDescrip);

 
    let divGastosFech = document.createElement("div");
    divGastosFech.className += "gasto-fecha";
    divGastosFech.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGastos.append(divGastosFech);

    
    let divGastosVal = document.createElement("div");
    divGastosVal.className += "gasto-valor";
    divGastosVal.textContent = gasto.valor;
    divGastos.append(divGastosVal)

    let divGastosEtiq = document.createElement("div");
    divGastosEtiq.className += "gasto-etiquetas";


    gasto.etiquetas.forEach(item => {
        let borrarEtiq= new BorrarEtiquetasHandle();
        borrarEtiq.gasto=gasto;
        borrarEtiq.etiqueta=item;

        let span = document.createElement("span");
        span.className += "gasto-etiquetas-etiqueta";
        span.textContent = item + " ";
        divGastosEtiq.append(span);
        if(idElemento==='listado-gastos-completo')
        {
            span.addEventListener('click', borrarEtiq);
        }
        divGastosEtiq.append(span);
    });  
    divGastos.append(divGastosEtiq);


    let objEditarHandle = new EditarHandle();
    objEditarHandle.gasto= gasto;
    let botonEdit= document.createElement('button');
    botonEdit.className="gasto-editar";
    botonEdit.textContent="Editar";
    botonEdit.addEventListener('click', objEditarHandle);

    let objBorrarHandle = new BorrarHandle();
    objBorrarHandle.gasto=gasto;
    let botonBorrar= document.createElement('button');
    botonBorrar.className="gasto-borrar";
    botonBorrar.textContent='Borrar';
    botonBorrar.addEventListener('click', objBorrarHandle);

    let editarHandlerForm = new EditarFormHandle();
    editarHandlerForm.gasto = gasto;
    let botonEditForm = document.createElement('button');
    botonEditForm.className = 'gasto-editar-formulario';
    botonEditForm.textContent = 'Editar (formulario)';
    botonEditForm.addEventListener('click',editarHandlerForm);

    if(idElemento==='listado-gastos-completo')
    {
        divGastos.append(botonEdit);
        divGastos.append(botonBorrar);
        divGastos.append(botonEditForm);
    }

}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let cadenaGAgrup=`<div class="agrupacion">
                        <h1>Gastos agrupados por ${periodo}</h1>`;

    for(let propiedad in agrup)
    {
        cadenaGAgrup+=`<div class="agrupacion-dato">
                            <span class="agrupacion-dato-clave">${propiedad}</span>
                            <span class="agrupacion-dato-valor">${agrup[propiedad]}</span>
                        </div>`;
    }

    cadenaGAgrup+=`</div>`
    document.getElementById(idElemento).innerHTML+= cadenaGAgrup;

}

function repintar()
{
    let elemento= document.getElementById('presupuesto');
    elemento.innerHTML="";
    
    elemento= document.getElementById('gastos-totales');
    elemento.innerHTML="";

    elemento= document.getElementById('balance-total');
    elemento.innerHTML="";

    elemento= document.getElementById('listado-gastos-completo');
    elemento.innerHTML="";


    let mostrarP= gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId('presupuesto', mostrarP);

    let mostrarGT= gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId('gastos-totales',mostrarGT);

    let mostrarB= gestionPresupuesto.calcularBalance();
    mostrarDatoEnId('balance-total',mostrarB);

    let arrayListadoGCompleto= gestionPresupuesto.listarGastos();
    for(let objeto of arrayListadoGCompleto)
    {
        mostrarGastoWeb('listado-gastos-completo',objeto);
    }

}

function actualizarPresupuestoWeb()
{
    let num = parseFloat(prompt('Introduce el nuevo presupuesto:'));
    gestionPresupuesto.actualizarPresupuesto(num);
    repintar();
}

let botonActualizarP=document.getElementById("actualizarpresupuesto");
botonActualizarP.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb()
{
    let descripcion= prompt('Escriba la descripción del nuevo gasto: ');
    let valor= parseFloat(prompt('Introduzca el nuevo valor: '));
    let fecha= new Date(prompt('Introduzca la fecha: ')).toLocaleDateString();
    let etiq=prompt('Escriba las etiquetas seguidas por ","');
    let arrayEtiq=etiq.split(', ');

    let gasto= new gestionPresupuesto.CrearGasto(descripcion,valor,fecha, arrayEtiq);
    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}

let botonAnyadirG= document.getElementById('anyadirgasto');
botonAnyadirG.addEventListener('click', nuevoGastoWeb);

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true); //clonar plantilla (template)
    let formulario = plantillaFormulario.querySelector("form"); //extraer el form de la plantilla (template) a una variable
    
    let form = document.getElementById('anyadirgasto-formulario');
    form.setAttribute('disabled', '');

    let control = document.getElementById('controlesprincipales'); 
    control.append(formulario);

    formulario.addEventListener('submit', new EnviarFormHandle());

    formulario.querySelector("button.cancelar").addEventListener('click',new CancelarFormHandle());


}

let formEvento = document.getElementById('anyadirgasto-formulario');
formEvento.addEventListener('click', nuevoGastoWebFormulario);

function filtrarGastosWeb(){

    this.handleEvent = function(event){

        event.preventDefault();

        let des = document.getElementById("formulario-filtrado-descripcion").value;
        let vMin = parseFloat(document.getElementById("formulario-filtrado-valor-minimo").value);
        let vMax = parseFloat(document.getElementById("formulario-filtrado-valor-maximo").value);
        let fecDes = document.getElementById("formulario-filtrado-fecha-desde").value;
        let fecHas = document.getElementById("formulario-filtrado-fecha-hasta").value;
        let etiTiene = document.getElementById("formulario-filtrado-etiquetas-tiene").value;
        let filtro = {};

        if (etiTiene.length > 0){
            filtro.etiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(etiTiene);
        }
        filtro.fechaDesde = fecDes;
        filtro.fechaHasta = fecHas;
        filtro.valorMinimo = vMin;
        filtro.valorMaximo = vMax;
        filtro.descripcionContiene = des;

        document.getElementById("listado-gastos-completo").innerHTML="";
        let objsFiltrGastos = gestionPresupuesto.filtrarGastos(filtro);

        for (let gasto of objsFiltrGastos){
            mostrarGastoWeb('listado-gastos-completo', gasto);
        }
    }
}
document.getElementById('formulario-filtrado').addEventListener('submit', new filtrarGastosWeb());

function EditarHandle()
{
    this.handleEvent= function()
    {
        let descripcion= prompt('Escriba la descripción del nuevo gasto: ');
        let valor= parseFloat(prompt('Introduzca el nuevo valor: '));
        let fecha= new Date(prompt('Introduzca la fecha: ')).toLocaleDateString();
        let etiq=prompt('Escriba las etiquetas seguidas por ","');
        let arrayEtiq=etiq.split(', ');

        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(arrayEtiq);

        repintar();
    }
}

function BorrarHandle()
{
    this.handleEvent= function()
    {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle()
{
    this.handleEvent=function()
    {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function EnviarFormHandle(){

    this.handleEvent = function(event){

        event.preventDefault();

        let form = event.currentTarget;

        let desc = form.descripcion.value;
        let val = parseFloat(form.valor.value);
        let fech = form.fecha.value;
        let etiq = form.etiquetas.value;
            etiq = etiq.split(', ');

        let gasto = new gestionPresupuesto.CrearGasto(desc, val, fech, etiq);

        gestionPresupuesto.anyadirGasto(gasto);

        document.getElementById('anyadirgasto-formulario').removeAttribute('disabled');
        form.remove();

        repintar();
    }
}

function CancelarFormHandle(){
    this.handleEvent = function(event){

        event.currentTarget.parentNode.remove();

        document.getElementById("anyadirgasto-formulario").removeAttribute('disabled');

        repintar();
    }
}

function EditarFormHandle(){
    this.handleEvent=function(event){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true); //clonar plantilla (template)
        let formulario = plantillaFormulario.querySelector("form"); //extraer el form de la plantilla (template) a una variable

        formulario.descripcion.value = this.gasto.descripcion;
        formulario.valor.value = parseFloat(this.gasto.valor);
        formulario.fecha.value = new Date(this.gasto.fecha).toString().substr(0,10);//.toISOString?
        formulario.etiquetas.value = this.gasto.etiquetas;

        event.currentTarget.append(formulario);
        event.currentTarget.setAttribute('disabled', '');

        //evento btn enviar
        let objBtnEnviar = new enviarHandle();
        objBtnEnviar.gasto = this.gasto;
        formulario.addEventListener('submit',objBtnEnviar);

        //evento btn cancelar
        let objBtnCancelar = new CancelarFormHandle();
        formulario.querySelector("button.cancelar").addEventListener('click',objBtnCancelar);
    }
}

function enviarHandle(){
    this.handleEvent=function(event){
        event.preventDefault();

        let form = event.currentTarget;

        this.gasto.actualizarDescripcion(form.descripcion.value);
        this.gasto.actualizarValor(parseFloat(form.valor.value));
        this.gasto.actualizarFecha(form.fecha.value);
        this.gasto.anyadirEtiquetas(form.etiquetas.value.split(', '));

        repintar();
    }
}

function guardarGastosWeb(){
    this.handleEvent = function(e){
        let gastosListados= gestionPresupuesto.listarGastos();
        localStorage.setItem('GestorGastosDWEC', JSON.stringify(gastosListados));
    }
}

let botonGuardarGastos= document.getElementById('guardar-gastos');
let ggw= new guardarGastosWeb;
botonGuardarGastos.addEventListener('click', ggw);

function cargarGastosWeb(){
    this.handleEvent = function(e){
        let clave = JSON.parse(localStorage.getItem('GestorGastosDWEC'));
        if (clave !== null){
            if (clave.length >= 0)
            gestionPresupuesto.cargarGastos(clave);
        }
        else{
            gestionPresupuesto.cargarGastos([]);
        }
        repintar();
    }
}

let botonCargarGastos= document.getElementById('cargar-gastos');
let cgw = new cargarGastosWeb;
botonCargarGastos.addEventListener('click', cgw);

export{ mostrarDatoEnId,
        mostrarGastoWeb,
        mostrarGastosAgrupadosWeb}