import * as gestionPresupuesto from './gestionPresupuesto.js';
 
 function mostrarDatoEnId(idElemento, valor) {
    let elem = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elem.appendChild(p);
 }

function mostrarGastoWeb(idElemento, gasto) {
    let elem = document.getElementById(idElemento);
    let divGast = document.createElement("div");
    divGast.className = "gasto";
    elem.append(divGast);
    divGast.innerHTML += 
        `
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div> 
        `;

    let gastEtis = document.createElement("div");
    gastEtis.className = "gasto-etiquetas";
    divGast.append(gastEtis);

    for (let eti of gasto.etiquetas) {
        let nuevaEti = new BorrarEtiquetasHandle(); 
        nuevaEti.gasto = gasto;

        let gastoEtiq = document.createElement("span");
        gastoEtiq.className = "gasto-etiquetas-etiqueta";
        gastoEtiq.innerHTML = eti + "<br>";
        nuevaEti.etiqueta = eti;
        gastEtis.append(gastoEtiq);
        gastoEtiq.addEventListener('click',nuevaEti);
    }

    let btnEditar = document.createElement("button");
                    btnEditar.className += `gasto-editar`;
                    btnEditar.textContent = "Editar";
                    btnEditar.type = `button`;

    let btnBorrar = document.createElement("button");
                    btnBorrar.className += 'gasto-borrar';
                    btnBorrar.textContent = "Borrar";
                    btnBorrar.type = `button`;

    let editar = new EditarHandle();
    let borrar = new BorrarHandle();
    editar.gasto = gasto;
    borrar.gasto = gasto;
    
    btnEditar.addEventListener('click', editar);
    btnBorrar.addEventListener('click', borrar);
    
    divGast.append(btnEditar);
    divGast.append(btnBorrar);

    let btnEditGastoForm = document.createElement("button");
                            btnEditGastoForm.className += 'gasto-editar-formulario';
                            btnEditGastoForm.textContent = 'Editar (formulario)';
                            btnEditGastoForm.type = 'button';

    let editForm = new EditarHandleformulario();
    editForm.gasto = gasto;
    btnEditGastoForm.addEventListener('click', editForm);
    divGast.append(btnEditGastoForm);  
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const elemen = document.getElementById(idElemento);
    let datos = ""
    for (let [llave, val] of Object.entries(agrup)) {
        datos += 
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${llave}</span>
            <span class="agrupacion-dato-valor">${val}</span>
        </div>`
    };
    elemen.innerHTML += 
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${datos}
    `
}

function repintar() {
    let presupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId( "presupuesto", presupuesto);
    
    let gasTot = gestionPresupuesto.calcularTotalGastos().toFixed(2);
    mostrarDatoEnId( "gastos-totales", gasTot);
    
    let balTot = gestionPresupuesto.calcularBalance().toFixed(2);
    mostrarDatoEnId("balance-total", balTot);
    
    let borrarDatos = document.getElementById("listado-gastos-completo").innerHTML = "";
    
    let gasList = gestionPresupuesto.listarGastos();
    for (const x of gasList) {
        mostrarGastoWeb("listado-gastos-completo", x);
    }
}

function actualizarPresupuestoWeb () {
    let presp = parseFloat(prompt(`Introduce el presupuesto gastado`));
    gestionPresupuesto.actualizarPresupuesto(presp);
    repintar();
}

const actualizarpresupuesto = document.getElementById("actualizarpresupuesto");
actualizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb () {
    let des = prompt(`¿En qué te lo has gastado esta vez?`);
    let val = parseFloat(prompt(`¿Cuánto ha sido?`));
    let fec = prompt(`¿Y cuándo fue eso? Dímelo con el formato yyyy-mm-dd`);
    let eti = prompt(`Etiqueta el gasto con todas las etiquetas que quieras, pero sepáralas con comas (,)`);
    let etiArray = eti.split(',');
    let gasto = new gestionPresupuesto.CrearGasto(des, val, fec, ...etiArray);
    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}

const anyadirgasto = document.getElementById("anyadirgasto");
anyadirgasto.addEventListener('click', nuevoGastoWeb);


function formatearFecha(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function EditarHandle() {
    this.handleEvent = function (event){
        let descripcion = prompt("Escribe la nueva descripción del gasto");
        let valor1 = parseFloat(prompt("Escribe la nueva valor del gasto"));
        let fecha = prompt("Escribe la fecha del gasto en formato yyyy-mm-dd");
        let etiquetas = prompt("Escribe las etiquetas del gasto separadas por ,");
        let etiquetasArray = etiquetas.split(',');
        this.gasto.actualizarValor(valor1);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetasArray);
        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function (event){
      let number = this.gasto.id;
      gestionPresupuesto.borrarGasto(number);
      repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function (event){
    this.gasto.borrarEtiquetas(this.etiqueta);
    repintar();
   }
}

function EnviarGastoFormHandle(){
    this.handleEvent = function(e){
        e.preventDefault();
         let formulario = e.currentTarget;
         let descripcion = formulario.elements.descripcion.value;
         let valor = parseFloat(formulario.elements.valor.value);
         let fecha = formulario.elements.fecha.value;
         let etiquetas = formulario.elements.etiquetas.value;
        let gastoNuevo = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas);
        gestionPresupuesto.anyadirGasto(gastoNuevo);
        repintar();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}

function CancelarFormHandle() {
    this.handleEvent = function (event){
        event.currentTarget.parentNode.remove();
        let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
        repintar();
    }
}

function nuevoGastoWebFormulario() {

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector("form");

    let divControlesPrincipales = document.getElementById("controlesprincipales")
    divControlesPrincipales.appendChild(formulario);
    let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");
    
    let enviarObj = new EnviarGastoFormHandle();
    formulario.addEventListener('submit', enviarObj);

    let cancelarObj = new CancelarFormHandle();
    let btnCancelar = formulario.querySelector("button.cancelar");
    btnCancelar.addEventListener("click", cancelarObj);
}

const anyadirgastoFormulario = document.getElementById("anyadirgasto-formulario");
anyadirgastoFormulario.addEventListener("click", nuevoGastoWebFormulario);


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
        let cancelarObj = new CancelarFormHandle();
        btnCancelar.addEventListener("click", cancelarObj);

        btnEditarFormulario.setAttribute("disabled", "");
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

function filtrarGastoWeb() {
    this.handleEvent = function(event) {
        event.preventDefault() 
        let formulario = event.currentTarget;
        let descripcion = formulario.elements["formulario-filtrado-descripcion"].value;
        let valMin = parseFloat(formulario.elements["formulario-filtrado-valor-minimo"].value);
        let valMax = parseFloat(formulario.elements["formulario-filtrado-valor-maximo"].value);
        let fechaDesde = formulario.elements["formulario-filtrado-fecha-desde"].value;
        let fechaHasta = formulario.elements["formulario-filtrado-fecha-hasta"].value;
        let etiquetas = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;

        if(etiquetas == null){
            etiquetas = gestionPresupuesto.transformarListadoEtiquetas(etiquetas);
        }

        let gastosFiltrar = ({fechaDesde : fechaDesde, fechaHasta : fechaHasta, valorMinimo : valMin, valorMaximo : valMax, descripcionContiene : descripcion, etiquetasTiene : etiquetas});
        let gastosFiltrados = gestionPresupuesto.filtrarGastos(gastosFiltrar);
        document.getElementById("listado-gastos-completo").innerHTML = " ";
        for (let gastoForm of gastosFiltrados) {
            mostrarGastoWeb("listado-gastos-completo",gastoForm);
        }
    }
}

let sendGaso = new filtrarGastoWeb();
const btnFiltrar = document.getElementById("formulario-filtrado");
btnFiltrar.addEventListener("submit", sendGaso);



export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}