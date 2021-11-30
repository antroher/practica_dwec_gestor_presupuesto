//Para iterar sobre un collection del node usar for...of
// npx cypress open
import * as gestionPresupuesto from "./gestionPresupuesto.js";



function mostrarDatoEnId (idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement("p");
    parrafo.textContent = valor;
    elemento.appendChild(parrafo);
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
                        
    let gastoEtiquetas = document.createElement("div");
    gastoEtiquetas.className = "gasto-etiquetas";
    divGasto.append(gastoEtiquetas);
    let nuevoObjEtiqueta = new BorrarEtiquetasHandle(); 
    nuevoObjEtiqueta.gasto = gasto;

    for (let etiq of gasto.etiquetas) {
        let gastoEtiqueta = document.createElement("span");
        gastoEtiqueta.className = "gasto-etiquetas-etiqueta";
        gastoEtiqueta.innerHTML = etiq + "<br>";
        nuevoObjEtiqueta.etiqueta = etiq;
        gastoEtiquetas.append(gastoEtiqueta);
    }

    let buttonEdit = document.createElement("button");
                        buttonEdit.className += 'gasto-editar'
                        buttonEdit.textContent = "Editar";
                        buttonEdit.type = 'button';

    let buttonBorr = document.createElement("button");
                        buttonBorr.className += 'gasto-borrar'
                        buttonBorr.textContent = "Borrar";
                        buttonBorr.type = 'button';

    let edit = new EditarHandle();
    let delet = new BorrarHandle();
    edit.gasto = gasto;
    delet.gasto = gasto;
    
    buttonEdit.addEventListener('click', edit);
    buttonBorr.addEventListener('click', delet);
    gastoEtiquetas.addEventListener('click',nuevoObjEtiqueta);
    
    divGasto.append(buttonEdit);
    divGasto.append(buttonBorr);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const elemento = document.getElementById(idElemento);
    let data = ""
    for (let [key, value] of Object.entries(agrup)) {
        data += `
        <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${key}</span>
            <span class="agrupacion-dato-valor">${value}</span>
        </div>`
    };
    elemento.innerHTML += 
    `
    <div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${data}
    `
}

function repintar() {

    let presupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto",presupuesto);

    let gasto = gestionPresupuesto.calcularTotalGastos().toFixed(2);
    mostrarDatoEnId("gastos-totales",gasto);

    let balance = gestionPresupuesto.calcularBalance().toFixed(2);
    mostrarDatoEnId("balance-total",balance);

    let borrar = document.getElementById("listado-gastos-completo").innerHTML = " ";

    let listaGastos = gestionPresupuesto.listarGastos();
    for (const gasto of listaGastos) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb() {

    let valor2 = parseFloat ( prompt ("Introduce un presupuesto: "));

    gestionPresupuesto.actualizarPresupuesto(valor2);

    repintar();

}

function nuevoGastoWeb() {

    let descripcion = prompt("Introducir la descripcion");
    let valor = parseFloat(prompt("Introducir valor"));
    let fecha = prompt("Introduce la fecha (yyyy-mm-dd)");
    //const etiquetas = new Array();
    let etiquetasintro = prompt("Introduce las etiquetas separandolas con (,) ");
    
    const etiquetas = etiquetasintro.split(",");

   
    /*
    let control = true;
    let etiqueta = "";
    etiquetas.push(etiqueta);
    while(control == true){
    }
    */    

    const gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);

    gestionPresupuesto.anyadirGasto(gasto);

    repintar();

}

function EditarHandle() {
    
    this.handleEvent = function(x){

        let descripcion = prompt(`Introducir la descripcion`);
        let valor1 = parseFloat(prompt(`Introducir valor`));
        let fecha = prompt(`Introduce la fecha (yyyy-mm-dd)`);
        //const etiquetas = new Array();
        let etiquetasintro = prompt(`Introduce las etiquetas separandolas con (,)`);

        let etiquetas = etiquetasintro.split(`,`);

        this.gasto.actualizarValor(valor1);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);
        
        repintar();
    }
}

function BorrarHandle() {

    this.handleEvent = function (a) {
        let idnum = this.gasto.id;
        gestionPresupuesto.borrarGasto(idnum);
        repintar();

    }
}

function BorrarEtiquetasHandle() {

    this.handleEvent = function (a) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

// test6

function nuevoGastoWebFormulario() {

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector("form");
    let control = document.getElementById("controlesprincipales");

    control.appendChild(formulario);

    let botonAnyadir = document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");
    let enviarObj = new enviarGastoFormHandle();

    formulario.addEventListener("submit", enviarObj);

    let cancelarObj = new cancelarFormHandle();
    let botonCancelar = formulario.querySelector("button.cancelar");
    botonCancelar.addEventListener("click", cancelarObj);
}

function enviarGastoFormHandle(){

    this.handleEvent = function (a){

        a.preventDefault();
        let formulario = a.currentTarget;
        let descripcion = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = formulario.elements.etiquetas.value;
        let etiquetas = formulario.elements.etiquetas.value;
        let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valor ,fecha , etiquetas);

        gestionPresupuesto.anyadirGasto(nuevoGasto);

        repintar;
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");

    }
}

function cancelarFormHandle() {

    this.handleEvent = function(a) {

        a.currentTarget.parentNode.remove();
        let botonGastoForm = document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
        repintar();
    }

}


//botones
const botonactulizarpresupuesto = document.getElementById('actualizarpresupuesto')
const botonanyadirgasto = document.getElementById('anyadirgasto');

//Event
botonactulizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);
botonanyadirgasto.addEventListener('click', nuevoGastoWeb);

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}