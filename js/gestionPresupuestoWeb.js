//Para iterar sobre un collection del node usar for...of
import * as gestionPresupuesto from "./gestionPresupuesto.js";


function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elemento.appendChild(p);
}

function mostrarGastoWeb(idElemento, gastos) {
    let elemento = document.getElementById(idElemento);
    let gastoDiv = document.getElementById("div");
    
    gastoDiv.className = "gasto";
    elemento.append(gastoDiv);
    gastoDiv.innerHTML +=
    `
    <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div> 
    `
    let etiquetas = document.createElement("div");
    etiquetas.className = "gasto-etiquetas";
    gastoDiv.append(etiquetas);

    for (let etiqueta of gasto.etiquetas) {

        let newObjEtiqueta = new BorrarEtiquetasHandle();
        newObjEtiqueta.gasto = gasto;

        let etiquetaGasto = document.createElement("span");
        etiquetaGasto.className = "gasto-etiquetas-etiqueta";
        etiquetaGasto.innerHTML = etiq + "<br>";
        newObjEtiqueta.etiqueta = etiq;

        etiquetas.append(etiqueta);

        etiqueta.addEventListener("click",newObjEtiqueta);

    }
   
    let bEditar = document.createElement("button");
    bEditar.className += "gasto-editar";
    bEditar.textContent = "Editar";
    bEditar.type = "button";

    let bBorrar = document.createElement("button");
    bBorrar.className += "gasto-borrar";
    bBorrar.textContent = "Borrar";
    bBorrar.type = "button";

    let editar = new EditarHandle();
    editar.gasto = gasto;
    editar.addEventListener("click", editar);
    GastoDiv.append(editar);

    let borrar = new BorrarHandle();
    borrar.gasto = gasto;
    borrar.addEventListener('click', borrar);
    GastoDiv.append(borrar);
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

    let gasto = gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales",gasto);

    let balance = gestionPresupuesto.calcularBalance();
    mostrarDatoEnId("balance-total",balance);

    let borrarDatos = document.getElementById("listado-gastos-completos").innerHTML = "";

    let listaGastos = gestionPresupuesto.listarGastos();
    for (const gasto of listaGastos) {

        mostrarGastoWeb("listado-gastos-completo")

    }
}

function actualizarPresupuestoWeb() {

    let valor = parseFloat(prompt ("Introduce un nuevo presupuesto"));

    gestionPresupuesto.actualizarPresupuesto(valor);

    repintar();

}

function nuevoGastoWeb() {

    let descripcion = prompt("Introducir la descripcion");
    let valor = parseFloat(prompt("Introducir valor"));
    let fecha = prompt("Introduce la fecha (yyyy-mm-dd)");
    const etiquetas = new Array();
    let etiquetasintro = prompt("Introduce las etiquetas separandolas con (,) ");
    
    etiquetas = etiquetasintro.split(",");

   
    /*
    let control = true;
    let etiqueta = "";
    etiquetas.push(etiqueta);
    while(control == true){
    }
    */    

    const gasto = gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);

    gestionPresupuesto.anyadirGasto(gasto);

    repintar();

}

function EditarHandle() {
    
    this.handleEvent = function (a){

        let descripcion = prompt("Introducir la descripcion");
        let valor = parseFloat(prompt("Introducir valor"));
        let fecha = prompt("Introduce la fecha (yyyy-mm-dd)");
        const etiquetas = new Array();
        let etiquetasintro = promt("introduce las etiquetas separandolas con (,)");

        etiquetas = etiquetasintro.split(",");

       this.
        
        
        repintar();
    }
}

function BorrarHandle() {

    this.handleEvent = function (a) {
        gestionPresupuesto.borrarGasto();
        repintar();

    }
}

function BorrarEtiquetasHandle() {

    this.handleEvent = function (a) {
        


    }
}

/*
    estructura HTML final

<div class="gasto">
  <div class="gasto-descripcion">DESCRIPCIÓN DEL GASTO</div>
  <div class="gasto-fecha">FECHA DEL GASTO</div> 
  <div class="gasto-valor">VALOR DEL GASTO</div> 
  <div class="gasto-etiquetas">
    <!-- Este elemento span tendrá un manejador de eventos -->
    <span class="gasto-etiquetas-etiqueta">
      ETIQUETA 1
    </span>
    <!-- Este elemento span tendrá un manejador de eventos -->
    <span class="gasto-etiquetas-etiqueta">
      ETIQUETA 2
    </span>
    <!-- Etcétera -->
  </div> 
  <!-- Este botón tendrá un manejador de eventos -->
  <button class="gasto-editar" type="button">Editar</button>
  <!-- Este botón tendrá un manejador de eventos -->
  <button class="gasto-borrar" type="button">Borrar</button>
</div>

*/

//button
const botonactulizarpresupuesto = document.getElementById('actualizarpresupuesto')


//Event
botonactulizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}