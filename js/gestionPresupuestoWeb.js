import * as gesPres from "./gestionPresupuesto.js";

document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);
function mostrarDatoEnId(idElemento,valor){

    let textBox = document.getElementById(idElemento);
    textBox.textContent = valor;
}
function mostrarGastoWeb (idElemento, gasto){

    
    let divGen = document.createElement('div');
    divGen.className = "gasto"; 

    let divDes = document.createElement('div');
    divDes.className = "gasto-descripcion";
    divDes.append(gasto.descripcion);

    let divFech = document.createElement('div');
    divFech.className = "gasto-fecha";
    divFech.append(gasto.fecha);


    let divVal = document.createElement('div');
    divVal.className = "gasto-valor";
    divVal.append(gasto.valor)

    let divEti = document.createElement('div');
    divEti.className = "gasto-etiquetas";

    divGen.append(divDes, divFech, divVal, divEti);
   


    for (let etiqueta of gasto.etiquetas)
    {
         
        let spanEti = document.createElement('span');
        spanEti.className = "gasto-etiquetas-etiqueta";
        
        spanEti.append(`${etiqueta},`);
        
        divEti.append(spanEti);


        
          let elimitaretiquetassobre = new BorrarEtiquetasHandle();
         elimitaretiquetassobre.gasto = gasto;
        elimitaretiquetassobre.etiqueta = etiqueta;
        spanEti.addEventListener("click", elimitaretiquetassobre);

    }

      
     let contenido = document.getElementById(idElemento);

     
    contenido.append(divGen);    

    let botoneditar = document.createElement("button");
    botoneditar.type ="button";
    botoneditar.className = "gasto-editar";
    botoneditar.textContent = "Editar";
    let btnedit = new EditarHandle();
    btnedit.gasto = gasto;
    botoneditar.addEventListener("click", btnedit);

let botonborrar = document.createElement("button");
    botonborrar.type ="button";
    botonborrar.className = "gasto-borrar";
    botonborrar.textContent = "Borrar";
    let btnborrar = new BorrarHandle();
    btnborrar.gasto = gasto;
    botonborrar.addEventListener("click", btnborrar);

    divGen.append(botoneditar);
    divGen.append(botonborrar);

    let botoneditarform = document.createElement("button");
    botoneditarform.type ="button";
    botoneditarform.className = "gasto-editar-formulario";
    botoneditarform.textContent = "Editar (formulario)";
    let btneditform = new EditarHandleFormulario();
    btneditform.gasto = gasto;
    botoneditarform.addEventListener("click", btneditform);

    divGen.append(botoneditarform);

}

let accionSubmitparafiltrarform = new filtrarGastosWeb();
let botonFormularioFiltr = document.getElementById("formulario-filtrado");
botonFormularioFiltr.addEventListener("submit", accionSubmitparafiltrarform);

function filtrarGastosWeb(){

  this.handleEvent = function(event){

    event.preventDefault()
    let formfiltr = event.currentTarget;

    let descipcionformfilt = formfiltr.elements["formulario-filtrado-descripcion"].value;
    let valorminformfilt = formfiltr.elements["formulario-filtrado-valor-minimo"].value;
    valorminformfilt = parseFloat(valorminformfilt);
    let valormaxformfilt = formfiltr.elements["formulario-filtrado-valor-maximo"].value;
    valormaxformfilt = parseFloat(valormaxformfilt);
    let fechadesdeformfilt = formfiltr.elements["formulario-filtrado-fecha-desde"].value;
    let fechahastaformfilt = formfiltr.elements["formulario-filtrado-fecha-hasta"].value;
    let etiquetasformfilt = formfiltr.elements["formulario-filtrado-etiquetas-tiene"].value;


    if(etiquetasformfilt == "")
    {
        //
    }
    else{

        etiquetasformfilt = gesPres.transformarListadoEtiquetas(etiquetasformfilt);

    }

    let gastosFiltrados = gesPres.filtrarGastos({fechaDesde: fechadesdeformfilt, fechaHasta: fechahastaformfilt, valorMinimo: valorminformfilt, valorMaximo: valormaxformfilt, descripcionContiene: descipcionformfilt, etiquetasTiene: etiquetasformfilt});

        document.getElementById("listado-gastos-completo").innerHTML = "";

        for (let gasto of gastosFiltrados) {
            
            mostrarGastoWeb("listado-gastos-completo", gasto);
        }


  }
}  


function EditarHandleFormulario(){

    this.handleEvent = function(event){

        let plantillaForm = document.getElementById('formulario-template').content.cloneNode(true);;
        let form = plantillaForm.querySelector('form');

        event.currentTarget.after(form);

        let botonEdit = event.currentTarget;
        botonEdit.disabled = true;

        form.elements.descripcion.value = this.gasto.descripcion;
        form.elements.valor.value = this.gasto.valor;
       
        form.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        form.elements.etiquetas.value = this.gasto.etiquetas;

    
        let bSubmit = new submiteditformHandle();
        bSubmit.gasto = this.gasto;
        form.addEventListener('submit', bSubmit);

        let handleCancel = new cancelHandle();        
        let btnCancelar = form.querySelector("button.cancelar");
        btnCancelar.addEventListener("click", handleCancel);
        
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    let div = document.createElement('div');
    let h1 = document.createElement('h1');

    div.className = "agrupacion";  
    h1.innerHTML = "Gastos agrupados por " + periodo;
    div.append(h1);

    for (let [key, value] of Object.entries(agrup))
    {
        let div1 = document.createElement('div');
        let span = document.createElement('span');
        let span1 = document.createElement('span');   

        div1.className = "agrupacion-dato";       
        span.className = "agrupacion-dato-clave";           
        span1.className = "agrupacion-dato-valor";

        

        span.append(" " + key);
        span1.append("  " + value);
        
        div1.append(span);
        div1.append(span1);
        div.append(div1);
    }   
     
    let contenido = document.getElementById(idElemento);

    contenido.append(div);
}

document.getElementById("actualizarpresupuesto").addEventListener("click", botonactualizarpresupuesto);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);

function botonactualizarpresupuesto(){
    let promtpresupuesto = prompt("Introduzca nuevo presupuesto");
    promtpresupuesto = parseFloat(promtpresupuesto);
    let nuevopresupuesto = promtpresupuesto;

    gesPres.actualizarPresupuesto(nuevopresupuesto);
    


    repintar();
}

function nuevoGastoWeb(){

    let descripcion = prompt("Introduzca descripcion");
    let valor = prompt("Introduzca valor");
    let valorbien = parseFloat(valor);

    let fecha = prompt("Introduzca fecha");
    let fechabien = new Date(fecha);
    fechabien.toISOString;
    let etiquetas = prompt("Introduzca etiquetas");
    let arrEtiquetas = etiquetas.split(', ');

    let gastonuevo = new gesPres.CrearGasto(descripcion,valorbien,fechabien,...arrEtiquetas);
    
    gesPres.anyadirGasto(gastonuevo);
    
    repintar();
}

function repintar(){

    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gesPres.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    let listaGastos = gesPres.listarGastos();
    for (let g of listaGastos)
    {
        mostrarGastoWeb("listado-gastos-completo", g);
    }
}

function EditarHandle(){

    this.handleEvent = function(e){

    let descripcion = prompt("Introduzca descripcion");
    let valor = prompt("Introduzca valor");
    let valorbien = parseFloat(valor);

    let fecha = prompt("Introduzca fecha");
    let fechabien = new Date(fecha);
    fechabien.toISOString;
    let etiquetas = prompt("Introduzca etiquetas");
    let arrEtiquetas = etiquetas.split(', ');

    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valorbien);
    this.gasto.actualizarFecha(fechabien);
    this.gasto.anyadirEtiquetas(...arrEtiquetas);

        
    repintar();
    
       } 
      

}
function BorrarHandle(){
    this.handleEvent = function(e){

    gesPres.borrarGasto(this.gasto.id);   
            
        repintar();
        
           } 

}
function BorrarEtiquetasHandle(){

    this.handleEvent = function(e){

this.gasto.borrarEtiquetas(this.etiqueta);


         repintar();
    }
}


function nuevoGastoWebFormulario(){

    let plantillaForm = document.getElementById("formulario-template").content.cloneNode(true);;
    let form = plantillaForm.querySelector("form");

    let formtemplate = document.getElementById("controlesprincipales");
    formtemplate.append(form);

    let botonanyadirform = document.getElementById("anyadirgasto-formulario");
    botonanyadirform.disabled = true;
    let formhandleEnvioboton = new enviarnuevoGastoHandleform();
   
    form.addEventListener("submit", formhandleEnvioboton);

    let handleCancel = new cancelHandle();        
    let btnCancelar = form.querySelector("button.cancelar");
    btnCancelar.addEventListener("click", handleCancel);

    repintar();

}
function enviarnuevoGastoHandleform()
{
    this.handleEvent = function(event)
    {
        event.preventDefault();
        let formactivo = event.currentTarget;

        let nuevaDesc = formactivo.elements.descripcion.value;
        let nuevoValor = formactivo.elements.valor.value;
        let nuevaFecha = formactivo.elements.fecha.value;
        let nuevasEtiquetas = formactivo.elements.etiquetas.value;

        nuevoValor = parseFloat(nuevoValor);
      
        let gasto1 = new gesPres.CrearGasto(nuevaDesc, nuevoValor, nuevaFecha, ...nuevasEtiquetas);
        gesPres.anyadirGasto(gasto1);

        let anyadirGasto = document.getElementById("anyadirgasto-formulario");

        anyadirGasto.disabled = false;

        repintar();
    }
}
function cancelHandle()
{
    this.handleEvent = function(event)
    {
        event.currentTarget.parentNode.remove();

        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");

        repintar();
    }
}
function submiteditformHandle(){
    this.handleEvent = function(event){
        event.preventDefault();
        
        let form = event.currentTarget;
        let ndescripcion = form.elements.descripcion.value;
        let nvalor = form.elements.valor.value;
        let nfecha =  form.elements.fecha.value;
        let netiquetas = form.elements.etiquetas.value;

        nvalor = parseFloat(nvalor);
        let netiquetasArray = netiquetas.split(',');

       
        this.gasto.actualizarDescripcion(ndescripcion);
        this.gasto.actualizarValor(nvalor);
        this.gasto.actualizarFecha(nfecha);
        this.gasto.anyadirEtiquetas(...netiquetasArray);
        repintar();

    }

}
//bguardargastos
let accionguardargastos = new guardarGastosWeb();
let botonguardargastos = document.getElementById("guardar-gastos");
botonguardargastos.addEventListener("click", accionguardargastos);
//bcargargastos
let accioncargargastos = new cargarGastosWeb();
let botoncargargastos = document.getElementById("cargar-gastos");
botoncargargastos.addEventListener("click", accioncargargastos);

function guardarGastosWeb(){
  this.handleEvent = function(event){

      let listagatosaguardar = gesPres.listarGastos();
      localStorage.setItem('GestorGastosDWEC', JSON.stringify(listagatosaguardar)); 

      
  }

}
function cargarGastosWeb(){
this.handleEvent = function(event){

    let listadegastosguardados = localStorage.getItem('GestorGastosDWEC');
    listadegastosguardados = JSON.parse(listadegastosguardados);
    let arrayvacio = [];

    if(listadegastosguardados == null){

        gesPres.cargarGastos(arrayvacio);
    }
    else{

        gesPres.cargarGastos(listadegastosguardados)
    }

    repintar()

}
}

export  {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    nuevoGastoWeb,
    actualizarPresupuestoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
}
