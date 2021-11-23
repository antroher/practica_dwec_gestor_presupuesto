"use strict";

import * as gestionPresupuesto from "./gestionPresupuesto.js";

document.getElementById("actualizarpresupuesto").addEventListener('click', actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener('click', nuevoGastoWeb);

function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elemento.appendChild(p);
}

function mostrarGastoWeb(idElemento, gasto) {
    let divG = document.createElement('div');
    divG.className += 'gasto';

    let divGD = document.createElement('div');
    divGD.className += 'gasto-descripcion';
    divGD.textContent = gasto.descripcion;

    let divGF = document.createElement('div');
    divGF.className += 'gasto-fecha';
    divGF.textContent = gasto.fecha;

    let divGV = document.createElement('div');
    divGV.className += 'gasto-valor';
    divGF.textContent = gasto.valor;

    let divGE = document.createElement('div');
    divGE.className += 'gasto-etiquetas';

    for (let et of gasto.etiquetas) {
        let spanE = document.createElement('span');
        spanE.className += 'gasto-etiqueta-etiquetas';
        spanE.textContent += et + ' ';

        if (idElemento === 'listado-gastos-completo') {
            let objBorrarEtiq = new BorrarEtiquetasHandle();
            objBorrarEtiq.gasto = gasto;
            objBorrarEtiq.etiqueta = et;
            spanE.addEventListener('click', objBorrarEtiq)
        }
        divGF.append(spanE);
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

    let agrupacion = '';
    let elemento = document.getElementById(idElemento);

    for (let [param, value] of Object.entries(agrup)) {
        agrupacion += `
        <div class="agrupacion-dato">
        <span class="agrupacion-dato-clave">${param}</span>
        <span class="agrupacion-dato-valor">${value}</span>
        </div>`
    };
    elemento.innerHTML +=
        `<div class="agrupacion">
      if (${periodo}==='dia')
      <h1>Gastos agrupados por día</h1>
        else
        <h1>Gastos agrupados por ${periodo}</h1>
        ${data}`

    elemento.innerHTML += `
    <div class="agrupacion">
    <h1>Gastos agrupados por ${periodo}</h1>
    ${agrupacion}
    `
}

function repintar() {
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";
    mostrarGastoWeb("listado-gastos-completo", gestionPresupuesto.listarGastos());
}

function actualizarPresupuestoWeb() {
    gestionPresupuesto.actualizarPresupuesto(parseFloat(prompt("Introduce un nuevo presupuesto:")));
    
    repintar();
}

let btnActPresu = document.getElementById("actualizarpresupuesto");
btnActPresu.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    let descripcion = prompt("Introduzca la descripción del nuevo gasto: ");
    let valor = parseFloat(prompt("Introduzca el valor del nuevo gasto: "));
    let fecha = Date.parse(prompt("Introduzca la fecha del nuevo gasto: "));
    let etiquetas = prompt("Introduzca las etiquetas del nuevo gasto separadas por , : ").split(', ');

    gestionPresupuesto.anyadirGasto(gestionPresupuesto.CrearGasto(descripcion,valor,fecha,etiquetas));

    repintar();
}

let btnAddGasto = document.getElementById("anyadirgasto");
btnAddGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle() {
    this.handleEvent = function (event) {
        let descripcion = prompt("Escriba la descripción");
        let valor1 = parseFloat(prompt("Escriba el valor"));
        let fecha = prompt("Escriba la fecha. Formato yyyy-mm-dd");
        let etiquetas = prompt("Escriba las etiquetas del gasto. Sepárelas con comas");
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
      let num = this.gasto.id;
      gestionPresupuesto.borrarGasto(num);
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
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
}