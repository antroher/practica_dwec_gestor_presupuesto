import * as datosPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {//https://www.youtube.com/watch?v=DMawWBwHnBU
    let elem = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elem.appendChild(p);
}

function mostrarGastoWeb(idElemento, gastos) {
    let div = document.getElementById(idElemento);
    for (let gasto of gastos) {
        let aux = "";
        for (let eti of gasto.etiquetas) {
            aux += `
            <span class="gasto-etiquetas-etiqueta">
                ${eti}
            </span>`
        }
        div.innerHTML += 
            `<div class="gasto">
                <div class="gasto-descripcion">${gasto.descripcion}</div>
                <div class="gasto-fecha">${gasto.fecha}</div> 
                <div class="gasto-valor">${gasto.valor}</div> 
                <div class="gasto-etiquetas">
                ${aux}`;
    }
    let btnEditar = document.createElement("button");
    btnEditar.className += 'gasto-editar';
    btnEditar.textContent = "Editar"
    btnEditar.type = 'button';
    let btnBorrar = document.createElement("button");
    btnBorrar.className += 'gasto-borrar';
    btnBorrar.textContent = "Borrar";
    btnBorrar.type = 'button';

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    const elem = document.getElementById(idElemento);
    let datos = ""
    for (let [key, val] of Object.entries(agrup)) {
        datos += 
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${key}</span>
            <span class="agrupacion-dato-valor">${val}</span>
        </div>`
    };
    elem.innerHTML += 
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${datos}
    `    
}

function repintar() {
    let pres = datosPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId( "presupuesto",pres);
    
    let gasTot = datosPresupuesto.calcularTotalGastos().toFixed(2);
    mostrarDatoEnId( "gastos-totales",gasTot);
    
    let balTot = datosPresupuesto.calcularBalance().toFixed(2);
    mostrarDatoEnId("balance-total",balTot);
    
    let borrarDatos = document.getElementById("listado-gastos-completo").innerHTML = "";
    
    let matrizGasto = datosPresupuesto.listarGastos();
    for (const x of matrizGasto) {
        mostrarGastoWeb("listado-gastos-completo", x);
    }
}

function actualizarPresupuestoWeb()  {
    let pres = parseFloat(prompt(`Hey amigo, introduce tu presupuesto`));
    datosPresupuesto.actualizarPresupuesto(pres);
    repintar();
}

let btnActPres = document.getElementById("actualizarpresupuesto");
btnActPres.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    let des = prompt(`Hola buenas, indica la descripción del gasto`);
    let val = parseFloat(prompt(`¿Ya estás gastando dinero? ¿Cuánto ha sido esta vez?`));
    let fec = prompt(`¿Y cuándo fue eso? Dímelo siguiendo el formato yyyy-mm-dd que si no no te entiendo, figura`);
    let eti = prompt(`Etiqueta ese rico gasto tuyo con todas las etiquetas que quieras, pero sepáralas con comas (,) para poder yo distinguir entre una y otra`);
    let etiArray = eti.split(',');
    let gasto = new datosPresupuesto.CrearGasto(des, val, fec, ...etiArray);
    datosPresupuesto.anyadirGasto(gasto);
    repintar();
}

let btnAddGas = document.getElementById("anyadirgasto");
btnAddGas.addEventListener("click", nuevoGastoWeb);

function EditarHandle() {
    this.handleEvent = function (e){    
        let des = prompt("¿Cuál va a ser la nueva descripción del gasto?");
        let val = parseFloat(prompt("¿Y de cuánto dices que es?"));
        let fec = prompt("Dime cuándo hiciste ese gasto anda, recuerda que sólo entiendo el formato yyyy-mm-dd");
        let etiquetas = prompt("Etiqueta el gasto como te venga en gana, pero separa cada etiqueta con una coma (,)");
        let etiArray = etiquetas.split(',');
        let gasto = new datosPresupuesto.CrearGasto(des, val, fec, ...etiArray);
        datosPresupuesto.anyadirGasto(gasto);
        repintar();
   }
}

function BorrarHandle() {
    this.handleEvent = function (e) {
        datosPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }        
}
function BorrarEtiquetasHandle() {
    this.handleEvent = function (e){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}


//oaoaoaotiritioaoaoaotiritoaoaoaoaooooooooooooooo
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}