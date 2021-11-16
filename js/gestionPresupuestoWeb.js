import * as gestionPresupuesto from './gestionPresupuesto.js';
//Para iterar sobre un collection del node usar for...of


function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elemento.appendChild(p);
}

function mostrarGastoWeb(idElemento, gastos) {
    let elemento = document.getElementById(idElemento);
    for (let gasto of gastos) {
        let data = "";
        for (let i of gasto.etiquetas) {
            data += `
            <span class="gasto-etiquetas-etiqueta">
                ${i}
            </span>`
        }
        elemento.innerHTML += 
        `<div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div> 
            <div class="gasto-etiquetas">
            ${data}
            <div>
            <button type="button" class="gasto-editar">Editar</button>
            <button type="button" class="gasto-borrar">Borrar</button>
            <div>`

    }
    
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

    let presupuesto = gestionPresupuesto.mostrarPresupuesto;

    let totalgastos = gestionPresupuesto.calcularTotalGastos;

    let balance = gestionPresupuesto.calcularBalance;

    //let borrar =
    


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

    const gasto = gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas);

    gestionPresupuesto.anyadirGasto(gasto);

    repintar();

}

function EditarHandle() {



}

function BorrarHandle() {



}

function BorrarEtiquetasHandle() {



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

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
}