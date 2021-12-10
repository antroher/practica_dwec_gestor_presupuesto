'use strict';
import * as gestionPresupuesto from './gestionPresupuesto.js'

//Funciones para mostrar los datos
function mostrarDatoEnId(idElemento, valor){
    let elem = document.getElementById(idElemento);
    elem.innerHTML += valor;
}
function mostrarGastoWeb(idElemento, gasto){
    let elem = document.getElementById(idElemento);

    //div.class gasto
    let divG = document.createElement("div");
    divG.className += "gasto";
    elem.append(divG);

    //div.class gasto-descripcion
    let divGD = document.createElement("div");
    divGD.className += "gasto-descripcion";
    divGD.textContent = gasto.descripcion;
    divG.append(divGD);

    //div.class gasto-fecha
    let divGF = document.createElement("div");
    divGF.className += "gasto-fecha";
    divGF.textContent = new Date(gasto.fecha).toLocaleDateString();
    divG.append(divGF);

    //div.class gasto-valor
    let divGV = document.createElement("div");
    divGV.className += "gasto-valor";
    divGV.textContent = gasto.valor;
    divG.append(divGV)

    //div.class gasto-etiquetas
    let divGE = document.createElement("div");
    divGE.className += "gasto-etiquetas";


    gasto.etiquetas.forEach(item => {
        let borrarEtiquetas = new BorrarEtiquetasHandle();
        borrarEtiquetas.gasto = gasto;
        borrarEtiquetas.etiqueta = item;

        let span = document.createElement("span");
        span.className += "gasto-etiquetas-etiqueta";
        span.textContent = item + " ";
        if(idElemento === "listado-gastos-completo"){
            //evento click borrarEtiquetas
            span.addEventListener("click", borrarEtiquetas);
        }
        divGE.append(span);
    });  
    divG.append(divGE);

    //botones formulario
        //btn.class gasto-editar
    let btnEditar2 = document.createElement("button");
    btnEditar2.className = "gasto-editar";
    btnEditar2.textContent = "Editar";
        //btn.class gasto-borrar
    let btnBorrar2 = document.createElement("button");
    btnBorrar2.className = "gasto-borrar";
    btnBorrar2.textContent = "Borrar";


    //botones gasto-editar , gasto-borrar y gasto-editar-formulario

        //obj editarHandler
    let editarHandler = new EditarHandle();
    editarHandler.gasto = gasto;
        //btn.class gasto-editar
    let btnEditar = document.createElement("button");
    btnEditar.className = "gasto-editar";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", editarHandler);//evento

        //obj borrarHandler
    let borrarHandler = new BorrarHandle();
    borrarHandler.gasto = gasto;
        //btn.class gasto-borrar
    let btnBorrar = document.createElement("button");
    btnBorrar.className = "gasto-borrar";
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", borrarHandler);//evento

        //obj editarHandler
    let editarHandlerForm = new EditarFormHandle();
    editarHandlerForm.gasto = gasto;
        //boton.class gasto-editar-formulario
    let btnEditarF = document.createElement('button');
    btnEditarF.className = 'gasto-editar-formulario';
    btnEditarF.textContent = 'Editar (formulario)';
    btnEditarF.addEventListener('click',editarHandlerForm);

    if(idElemento === "listado-gastos-completo"){
        divG.append(btnEditar);
        divG.append(btnBorrar);
        divG.append(btnEditarF);
    }
    
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elem = document.getElementById(idElemento);
    let cad = "<div class='agrupacion'>\n" + 
    "<h1>Gastos agrupados por " + periodo + "</h1>\n";
    
    for (let res in agrup){
      
        cad += 
        "<div class='agrupacion-dato'>\n" +
        "<span class='agrupacion-dato-clave'>" + res + "</span>\n" +
        "<span class='agrupacion-dato-valor'>" + agrup[res] + "</span>\n"+
        "</div>\n";
}

    cad += "</div>\n";
    elem.innerHTML += cad;
    
}
function repintar(){
    document.getElementById('presupuesto').innerHTML='';
    document.getElementById('gastos-totales').innerHTML="";
    document.getElementById('balance-total').innerHTML="";
    mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales',gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId('balance-total',gestionPresupuesto.calcularBalance());
    document.getElementById('listado-gastos-completo').innerHTML="";


    let listadoGastoCompletos = gestionPresupuesto.listarGastos();
    for (let elem of listadoGastoCompletos){
        mostrarGastoWeb('listado-gastos-completo',elem);
    }
}


//Funciones y eventos botones principales

    //Funcion boton actulizar
function actualizarPresupuestoWeb(){
    let presu = parseInt(prompt('Introduce un presupuesto nuevo.'));
    gestionPresupuesto.actualizarPresupuesto(presu);
    document.getElementById('presupuesto').innerHTML="";
    document.getElementById('gastos-totales').innerHTML="";
    document.getElementById('balance-total').innerHTML="";
    repintar();
}
    //Funcion boton añadir gasto
function nuevoGastoWeb(){
    let desc = prompt('Escriba la descripción del nuevo gasto');
    let val = parseFloat(prompt('Escriba el valor del nuevo gasto'));
    let fech = new Date(prompt('Escriba la fecha del nuevo gasto')).toLocaleDateString();//arreglar?
    let etiq = prompt('Escriba las etiquetas (seguidas por coma) del nuevo gasto');
    etiq = etiq.split(', ');
    let gasto = new gestionPresupuesto.CrearGasto(desc, val, fech, etiq);
    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}
    //Funcion boton añadir gasto formulario
function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true); //clonar plantilla (template)
    let formulario = plantillaFormulario.querySelector("form"); //extraer el form de la plantilla (template) a una variable
    //Desacivar btn
    document.getElementById('anyadirgasto-formulario').setAttribute('disabled', '');

    //Añadir plantilla como ultimo hijo
    document.getElementById('controlesprincipales').append(formulario);

    //evento btn enviar
    formulario.addEventListener('submit', new EnviarFormHandle());

    //evento btn cancelar
    formulario.querySelector("button.cancelar").addEventListener('click',new CancelarFormHandle());


}
    //Evento boton actulizar
document.getElementById('actualizarpresupuesto').addEventListener('click', actualizarPresupuestoWeb);
    //Evento boton añadir gasto
document.getElementById('anyadirgasto').addEventListener('click', nuevoGastoWeb);
    //Evento boton añadir gasto formulario
document.getElementById('anyadirgasto-formulario').addEventListener('click', nuevoGastoWebFormulario)

    //Funcion boton filtrarGastos
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

    //Funcion boton guardar gastos
function guardarGastosWeb(){
        this.handleEvent = function(event){
            localStorage.setItem('GestorGastosDWEC', JSON.stringify(gestionPresupuesto.listarGastos()));    
        }
    }
    //Evento boton guardar gastos
document.getElementById('guardar-gastos').addEventListener('click', new guardarGastosWeb);

    //Funcion boton cargar gastos
function cargarGastosWeb(){
    this.handleEvent = function(event){
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
    //Evento boton cargar gastos
document.getElementById('cargar-gastos').addEventListener('click', new cargarGastosWeb);


//Funciones handle
function EditarHandle (){
    this.handleEvent = function(event){
        let desc = prompt('Escriba la descripción del nuevo gasto');
        let val = parseFloat(prompt('Escriba el valor del nuevo gasto'));
        let fech = new Date(prompt('Escriba la fecha del nuevo gasto')).toLocaleDateString();
        let etiq = prompt('Escriba las etiquetas (seguidas por coma) del nuevo gasto');
            etiq = etiq.split(', ');
        
        this.gasto.actualizarValor(val);
        this.gasto.actualizarDescripcion(desc);
        this.gasto.actualizarFecha(fech);
        this.gasto.anyadirEtiquetas(etiq);

        repintar();
    }
}
function BorrarHandle (){
    this.handleEvent = function(event){
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}
function BorrarEtiquetasHandle(){
    this.handleEvent = function(event){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
    
}
    //Funciones Handle para los formularios
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

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
