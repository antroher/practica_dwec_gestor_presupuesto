import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {
    let div = document.getElementById(idElemento);
    let p = document.createElement('p');
    p.textContent = valor;
    div.append(p);
}   

function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento);
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    elemento.append(divGasto);
        
    divGasto.innerHTML +=
    `
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${gasto.fecha}</div> 
        <div class="gasto-valor">${gasto.valor}</div> 
    `;
            let etiquetaGasto = document.createElement("div");
            etiquetaGasto.className = "gasto-etiquetas";
            divGasto.append(etiquetaGasto);
        
            for (let etiqueta of gasto.etiquetas) {
                let nuevaEtiqueta = new BorrarEtiquetasHandle();
                nuevaEtiqueta.gasto = gasto;
                let gastoEtiqueta = document.createElement("span");
                gastoEtiqueta.className = "gasto-etiquetas-etiqueta";
                gastoEtiqueta.innerHTML = etiqueta + "<br>";
                nuevaEtiqueta.etiqueta = etiqueta;
                etiquetaGasto.append(gastoEtiqueta);
                gastoEtiqueta.addEventListener('click',nuevaEtiqueta);
            }

            let btnEditar = document.createElement("button");
                            btnEditar.className += 'gasto-editar'
                            btnEditar.textContent = "Editar";
                            btnEditar.type = 'button';
        
            let btnBorrar = document.createElement("button");
                            btnBorrar.className += "gasto-borrar"
                            btnBorrar.textContent = "Borrar";
                            btnBorrar.type = "button";
        
            let editar = new EditarHandle();
            let borrar = new BorrarHandle();
            editar.gasto = gasto;
            borrar.gasto = gasto;    
            btnEditar.addEventListener("click", editar);
            btnBorrar.addEventListener("click", borrar);
            divGasto.append(btnEditar);
            divGasto.append(btnBorrar);

            let btnEditGastoForm = document.createElement("button");
                            btnEditGastoForm.className += "gasto-editar-formulario";
                            btnEditGastoForm.textContent = "Editar (formulario)";
                            btnEditGastoForm.type = "button";

            let editForm = new EditarHandleformulario();
            editForm.gasto = gasto;
            btnEditGastoForm.addEventListener("click", editForm);
            divGasto.append(btnEditGastoForm);  
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const div = document.getElementById(idElemento);

    let storage = "";
    for (let [clave, valor] of Object.entries(agrup)) {
        storage +=
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${clave}</span>
            <span class="agrupacion-dato-valor">${valor}</span>
        </div>`
    };
        div.innerHTML += ` 
    <div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${storage}
    `
}

function repintar() {
    let presupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId('presupuesto', presupuesto);

    let gastosTotales = gestionPresupuesto.calcularTotalGastos().toFixed(2);
    mostrarDatoEnId("gastos-totales", gastosTotales);

    let balanceTotal = gestionPresupuesto.calcularBalance().toFixed(2);
    mostrarDatoEnId('balance-total', balanceTotal);

    document.getElementById('listado-gastos-completo').innerHTML = " " ;

    let listarGastos = gestionPresupuesto.listarGastos();
    for (const x of listarGastos) {
        mostrarGastoWeb("listado-gastos-completo", x);
    }
}

function actualizarPresupuestoWeb() {
    let presupuesto = parseFloat(prompt('Introduzca un presupuesto'));
    gestionPresupuesto.actualizarPresupuesto(presupuesto);  
    repintar();    
}

function nuevoGastoWeb() {
    let descripcion = prompt('Describa el objeto que acaba de adquirir');
    let valor = parseFloat(prompt('¿Cuál ha sido el valor de su adquisición?'));
    let fecha = prompt('En formato yyyy-mm-dd, indique la fecha');
    let etiquetas = prompt('Escriba las etiquetas separadas por comas (,)');

    let arrayEtiquetas = etiquetas.split(",");

    let gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...arrayEtiquetas);

    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}

function nuevoGastoWebFormulario() {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");

    let divControlesPrincipales = document.getElementById("controlesprincipales")
    divControlesPrincipales.appendChild(formulario);
    document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");

    let enviarGastoWeb = new EnviarGastoWebHandle();
    formulario.addEventListener("submit", enviarGastoWeb);
    
    let cancelarGastoWeb = new CancelarGastoWebHandle();
    let btnCancelar = formulario.querySelector("button.cancelar")
    btnCancelar.addEventListener("click", cancelarGastoWeb);
    
}

function CancelarGastoWebHandle() {
    this.handleEvent = function (event){
        
        event.currentTarget.parentNode.remove();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
        repintar();
    }
}
function EnviarHandle(){
    this.handleEvent = function(e){

        e.preventDefault();

        let formulario = e.currentTarget;
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

function EnviarGastoWebHandle() {
    this.handleEvent = function(e) {
        e.preventDefault();

        let formulario = e.currentTarget;
        let descripcion = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value;

        let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas);
        gestionPresupuesto.anyadirGasto(nuevoGasto);

        repintar();

        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}

function EditarHandleformulario() {
    this.handleEvent = function (event){

        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
        var formulario = plantillaFormulario.querySelector("form");
        
        let divControlesPrincipales = document.getElementById("controlesprincipales")
        divControlesPrincipales.appendChild(formulario);

        let btnEditarFormulario = event.currentTarget;
        btnEditarFormulario.appendChild(formulario);
        formulario.elements.descripcion.value  = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;


        let EditarFormHandle1 = new EnviarHandle();
        EditarFormHandle1.gasto = this.gasto;
        formulario.addEventListener('submit', EditarFormHandle1);

        let btnCancelar = formulario.querySelector("button.cancelar");
        let cancelarObj = new CancelarGastoWebHandle();
        btnCancelar.addEventListener("click", cancelarObj);

        btnEditarFormulario.setAttribute("disabled", "");
    }
}

function EditarHandle() {
    this.handleEvent = function(e) {
        let descripcion = prompt('Nueva descripción del gasto');
        let valor1 = parseFloat(prompt('Indique el nuevo valor'));
        let fecha = prompt('En formato yyyy-mm-dd, actualice la fecha');
        let etiquetas = prompt('Escriba las etiquetas separadas por comas (,)');
        
        let arrayEtiquetas = etiquetas.split(',');

        this.gasto.actualizarValor(valor1);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...arrayEtiquetas);  
        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function(e) {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function(e) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function filtrarGastosWeb(){
    this.handleEvent = function(event)
    {
        event.preventDefault();
        let form = event.currentTarget;
        let descripcion = form["formulario-filtrado-descripcion"].value;
        let valorMinimo = form["formulario-filtrado-valor-minimo"].value;
        let valorMaximo = form["formulario-filtrado-valor-maximo"].value;
        let fechaDesde = form["formulario-filtrado-fecha-desde"].value;
        let fechaHasta = form["formulario-filtrado-fecha-hasta"].value;
        let etiq = form["formulario-filtrado-etiquetas-tiene"].value;

        if(etiq != null){
            etiq = gestionPresupuesto.transformarListadoEtiquetas(etiq);
        }
    }
}

const btnActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
btnActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);
const btnNuevoGasto = document.getElementById("anyadirgasto");
btnNuevoGasto.addEventListener("click", nuevoGastoWeb);
const btnNuevoGastoFormulario = document.getElementById("anyadirgasto-formulario");
btnNuevoGastoFormulario.addEventListener("click", nuevoGastoWebFormulario);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}