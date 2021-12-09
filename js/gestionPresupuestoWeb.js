import {mostrarPresupuesto}    from './gestionPresupuesto.js';
import {CrearGasto} from './gestionPresupuesto.js';
import {listarGastos} from './gestionPresupuesto.js';
import {anyadirGasto} from './gestionPresupuesto.js';
import {borrarGasto} from './gestionPresupuesto.js';
import {calcularTotalGastos} from './gestionPresupuesto.js';
import {calcularBalance} from './gestionPresupuesto.js';
import {filtrarGastos} from './gestionPresupuesto.js';
import {agruparGastos} from './gestionPresupuesto.js';
import {actualizarPresupuesto} from './gestionPresupuesto.js';
import {transformarListadoEtiquetas} from './gestionPresupuesto.js';


function mostrarDatoEnId(idElemento,valor){
    let elemento = document.getElementById(idElemento);
    elemento.append(valor);

}

function mostrarGastoWeb(idElemento,gasto)
{
    let elemento = document.getElementById(idElemento);
    let div = document.createElement('div');
    let div1 = document.createElement('div');
    div.className = "gasto";

        
        div.innerHTML += 
        `
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div> `;


    for (let etiquetas of gasto.etiquetas)
    {        
        let span = document.createElement('span');
        span.className="gasto-etiquetas-etiqueta";

        let manejadorBorrarEtiqueta = new BorrarEtiquetasHandle();
        manejadorBorrarEtiqueta.gasto = gasto;
        manejadorBorrarEtiqueta.etiqueta = etiquetas;
        span.addEventListener("click", manejadorBorrarEtiqueta);

        span.append(etiquetas);
        div1.append(span);
    }

    div1.className ="gasto-etiquetas";
    
    
    div.append(div1);

    let botEditar = document.createElement('button');
    botEditar.className = "gasto-editar";
    botEditar.type = "button";
    botEditar.textContent = "Editar";

    let manejadorEdit = new EditarHandle();
    manejadorEdit.gasto = gasto;
    botEditar.addEventListener("click", manejadorEdit);
    div.append(botEditar);

    let botBorrar = document.createElement('button');
    botBorrar.className = "gasto-borrar";
    botBorrar.type = "button";
    botBorrar.textContent = "Borrar";

    let manejadorBorrar = new BorrarHandle();
    manejadorBorrar.gasto = gasto;
    botBorrar.addEventListener("click", manejadorBorrar);
    div.append(botBorrar);

    elemento.append(div);

    let botEditarForm = document.createElement("button");
    botEditarForm.className = "gasto-editar-formulario";
    botEditarForm.type = "button";
    botEditarForm.textContent = "Editar (formulario)";

    let manejadorEditarForm = new EditarHandleformulario();
    manejadorEditarForm.gasto = gasto;
    botEditarForm.addEventListener("click", manejadorEditarForm);
    div.append(botEditarForm)

    elemento.append(div);

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento);
    let datos = ""
    for (let [clave, valor] of Object.entries(agrup)) {
        datos += 
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${clave}</span>
            <span class="agrupacion-dato-valor">${valor}</span>
        </div>`
    };
    elemento.innerHTML += 
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${datos}
        `

}
    function repintar()
    {

        mostrarDatoEnId("presupuesto",mostrarPresupuesto());
        mostrarDatoEnId("gastos-totales", calcularTotalGastos());
        mostrarDatoEnId("balance-total", calcularBalance());


        document.getElementById("listado-gastos-completo").innerHTML = "";
        
        let listagastos = listarGastos();
        
    for (let lista of listagastos)
        {
            mostrarGastoWeb("listado-gastos-completo", lista);
        }
    }

    function actualizarPresupuestoWeb(){

        let nuevoPresupuesto = prompt("Introduzca  un nuevo presupuesto");
        actualizarPresupuesto(parseFloat(nuevoPresupuesto));
    
        repintar();
    }
    let botActualizar = document.getElementById("actualizarpresupuesto");
    botActualizar.addEventListener("click", actualizarPresupuestoWeb);

    function nuevoGastoWeb()
    {
        let nuevadesc = prompt("Introduce una nueva descripción");
        let nuevovalor = prompt("Introduce un  nuevo valor");
        let nuevafecha = prompt("Introduce una nueva fecha");
        let nuevaetiqueta = prompt("Introduce una o varias etiquetas nuevas etiquetas");

        nuevovalor = parseFloat(nuevovalor);
        var arrEtiquetas= nuevaetiqueta.split(', ');
        

        let gasto = new CrearGasto(nuevadesc,nuevovalor,nuevafecha,...arrEtiquetas);
        anyadirGasto(gasto);
       
        repintar();
    }
    let botAnaydir = document.getElementById("anyadirgasto");
    botAnaydir.addEventListener("click", nuevoGastoWeb);

    function EditarHandle()
    {
        this.handleEvent = function(e){

            let nuevadesc = prompt("Introduce nueva descripción");
            this.gasto.actualizarDescripcion(nuevadesc);
    
            let nuevovalor = prompt("Introduce nuevo valor");
            nuevovalor = parseFloat(nuevovalor);
            this.gasto.actualizarValor(nuevovalor);
    
            let nuevafecha = prompt("Introduce nueva fecha");
            nuevafecha = Date.parse(nuevafecha);
            this.gasto.actualizarFecha(nuevafecha);
    
            let nuevaetiqueta = prompt("Introduce nuevas etiquetas");
            nuevaetiqueta = nuevaetiqueta.split(', ');
            this.gasto.anyadirEtiquetas(nuevaetiqueta);
    
            repintar();
        }
    }

    function BorrarHandle()
    {
        this.handleEvent = function(e){

            borrarGasto(this.gasto.id);
    
            repintar()
        }
    }

    function BorrarEtiquetasHandle()
    {
        this.handleEvent = function(e){
       
            this.gasto.borrarEtiquetas(this.etiqueta);
    
            repintar();
        }
    }


    function nuevoGastoWebFormulario()
    {
      
            let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
            let formulario = plantillaFormulario.querySelector("form");

            let finalContenido = document.getElementById("controlesprincipales");
            finalContenido.append(formulario);

            let botonFormulario = document.getElementById("anyadirgasto-formulario");
            botonFormulario.disabled = true;
            
        
            let manejadorEnvio = new eventoEnviar();
            
            formulario.addEventListener("submit", manejadorEnvio);
        
            let manejadorCancelar = new eventoCancelar();
           
            let botonCancelar = formulario.querySelector("button.cancelar");
            botonCancelar.addEventListener("click", manejadorCancelar);   
        
    }

    let anyadirgastoForm = document.getElementById("anyadirgasto-formulario")
    anyadirgastoForm.addEventListener("click", nuevoGastoWebFormulario);

    function eventoEnviar()
    {
    this.handleEvent = function(e)
        {
            e.preventDefault();
            let actual = e.currentTarget;

            let nuevaDesc = actual.elements.descripcion.value;
            let nuevoValor = actual.elements.valor.value;
            let nuevaFecha = actual.elements.fecha.value;
            let nuevasEtiquetas = actual.elements.etiquetas.value;

            nuevoValor = parseFloat(nuevoValor);
            
       
            let gasto1 = new CrearGasto(nuevaDesc, nuevoValor, nuevaFecha,nuevasEtiquetas);
            
            anyadirGasto(gasto1);
            
            let introducirGasto = document.getElementById("anyadirgasto-formulario");
            introducirGasto.disabled = false;

            repintar();
         
        }
    }

    function eventoCancelar()
    {
        this.handleEvent = function(e)
        {
        
            e.currentTarget.parentNode.remove();

       
            let cancelar = document.getElementById("anyadirgasto-formulario")
            cancelar.disabled = false;
            repintar();
        }
    }

    function EditarHandleformulario()
    {
        this.handleEvent = function(e)
        {
            let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
            let formulario = plantillaFormulario.querySelector("form");

            let finalContenido = document.getElementById("controlesprincipales");
            finalContenido.append(formulario);

            let btnActual = e.currentTarget;
            btnActual.append(formulario);
        
            formulario.elements.descripcion.value = this.gasto.descripcion;
            formulario.elements.valor.value = this.gasto.valor;
            formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
            formulario.elements.etiquetas.value = this.gasto.etiquetas;
            let editarGasto = new actualizarEnvio();
            editarGasto.gasto = this.gasto;
        
            let botonEditar = formulario;
            botonEditar.addEventListener("submit", editarGasto);
        
            let manejadorCancelar = new eventoCancelar();
            let btnCancelar = formulario.querySelector("button.cancelar");
            btnCancelar.addEventListener("click", manejadorCancelar);

            btnActual.disabled = true;
        }
    }

    function actualizarEnvio()
    {
        this.handleEvent = function(e)
        {
            e.preventDefault();
            let actual = e.currentTarget;

            let nuevaDesc = actual.elements.descripcion.value;
            let nuevoValor = actual.elements.valor.value;
            let nuevaFecha = actual.elements.fecha.value;
            let nuevasEtiquetas = actual.elements.etiquetas.value;

            nuevoValor = parseFloat(nuevoValor);
            nuevasEtiquetas=nuevasEtiquetas.split(",");

        
            this.gasto.actualizarDescripcion(nuevaDesc);
            this.gasto.actualizarValor(nuevoValor);
            this.gasto.actualizarFecha(nuevaFecha);
            this.gasto.anyadirEtiquetas(...nuevasEtiquetas);

            repintar();
        }
        
    }

    function filtrarGastoWeb() 
{
    this.handleEvent = function(e)
    {
       
        e.preventDefault();

        
        let plantillaFormulario = document.getElementById("filtrar-gastos");
        var formulario = plantillaFormulario.querySelector("form");

        let fechaDesde = formulario.elements["formulario-filtrado-fecha-desde"].value;
        let fechaHasta = formulario.elements["formulario-filtrado-fecha-hasta"].value;
        let valorMinimo = formulario.elements["formulario-filtrado-valor-minimo"].value;
        let valorMaximo = formulario.elements["formulario-filtrado-valor-maximo"].value;  
        let descripcionContiene = formulario.elements["formulario-filtrado-descripcion"].value;    
        let etiquetasTiene = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;

       
        if (etiquetasTiene != "")
        {
            etiquetasTiene = transformarListadoEtiquetas(etiquetasTiene);
        }

       
        let opciones = ({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene});

        
        document.getElementById("listado-gastos-completo").innerHTML = "";

        
        let gastosFiltrados = filtrarGastos(opciones);

       
        for (let g of gastosFiltrados)
        {   
            mostrarGastoWeb("listado-gastos-completo", g);
        }
    }   
}

    let manejadorFiltrado = new filtrarGastoWeb();
     let filtrado_Formulario = document.getElementById("formulario-filtrado");
     filtrado_Formulario.addEventListener("submit", manejadorFiltrado);
  
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}