import * as gestionPresupuesto from './gestionPresupuesto.js';
import { prependListener } from 'cluster';
 
 function mostrarDatoEnId(idElemento, valor) {
    let elem = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elem.appendChild(p);
 }

function mostrarGastoWeb(idElemento, gastos) {
    let divElem = document.getElementById(idElemento);
    let divGast = document.createElement("div");
    divGast.className = "gasto";
    divElem.append(divGast);

    divGast.innerHTML += 
        `<div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div> 
            <div class="gasto-etiquetas">
            ${aux}`
        ;

    let gastoEtiqs = document.createElement("div");
    gastoEtiqs.className = "gasto-etiquetas";
    divGast.append(gastoEtiqs);

    for (let eti of gasto.etiquetas) {
        let nuevpObjEtiq = new BorrarEtiquetasHandle(); 
        nuevpObjEtiq.gasto = gasto;

        let gastoEtiq = document.createElement("span");
        gastoEtiq.className = "gasto-etiquetas-etiqueta";
        gastoEtiq.innerHTML = eti + "<br>";
        nuevpObjEtiq.etiqueta = eti;

        gastoEtiqs.append(gastoEtiq);

        gastoEtiq.addEventListener('click',nuevpObjEtiq);
    }

    let btnEditar = document.createElement("button");
    btnEditar.className = 'gasto-editar';
    btnEditar.textContent = "Editar";
    btnEditar.type = "button";

    let btnBorrar = document.createElement("button");
    btnBorrar.className = 'gasto-borrar';
    btnBorrar.textContent = "Borrar";
    btnBorrar.type = "button"

    let editar = new EditarHandle();
    let borrar = new BorrarHandle();
    editar.gasto = gasto;
    borrar.gasto = gasto;
    
    btnEditar.addEventListener('click', editar);
    btnBorrar.addEventListener('click', borrar);
  
    
    divGasto.append(btnEditar);
    divGasto.append(btnBorrar);
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
    let presp = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId("Presupuesto", presp);

    let gstoTotal = gestionPresupuesto.calcularTotalGastos().toFixed(2);
    mostrarDatoEnI("Gastos-Totales", gstoTotal);

    let balanceTotal = gestionPresupuesto.calcularBalance().toFixed(2);
    mostrarDatoEnId("Balance-Total", balanceTotal);

    let borrarDatos = document.getElementById("listadoGastosCompleto").innerHTML = "";

    let matrizGastos = gestionPresupuesto.listarGastos();
    for (const x of matrizGastos) {
        mostrarGastoWeb("gastosCompletos", x);
    }
}

function actualizarPresupuestoWeb () {
    let presp = parseFloat(prompt(`Introduce el presupuesto gastado`));
    gestionPresupuesto.actualizarPresupuesto(presp);
    repintar();
}

function nuevoGastoWeb () {
    let descr = prompt(`Escribe la descripcion del nuevo gasto`);
    let vlr = parseFloat(prompt(`Escribe el valor`));
    let fecha = prompt(`Escriba la fecha del gastos (yyyy-mm-dd)`);
    let etiq = prompt(`Introduce una etiqueta y si son varias añade una coma detras`);
    let etiqArray = etiq.split(`,`);
    let gastoAny = new gestionPresupuesto.CrearGasto(descripcion,valor1,fecha,...etiquetasArray);
    gestionPresupuesto.anyadirGasto(gastoAnyadido);
    repintar();
}

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

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}