import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {
    let div = document.getElementById(idElemento);

    div.textContent = valor;
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
                            btnBorrar.className += 'gasto-borrar'
                            btnBorrar.textContent = "Borrar";
                            btnBorrar.type = 'button';
        
            let editar = new EditarHandle();
            let borrar = new BorrarHandle();
            editar.gasto = gasto;
            borrar.gasto = gasto;    
            btnEditar.addEventListener('click', editar);
            btnBorrar.addEventListener('click', borrar);
            divGasto.append(btnEditar);
            divGasto.append(btnBorrar);
}


function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
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



function repintar(){
    let presupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto)

    let gastosTotales = gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gastosTotales)

    let balanceTotal = gestionPresupuesto.calcularBalance();
    mostrarDatoEnId("balance-total", balanceTotal)

    document.getElementById('listado-gastos-completo').innerHTML = " " ;

    let listarGastos = gestionPresupuesto.listarGastos();
    for(const x of listarGastos) {
        mostrarGastoWeb("listado-gastos-completo", x);
    }
}


function actualizarPresupuestoWeb(){
    let presupuesto = parseFloat(prompt("Introduce el presupuesto"))
    gestionPresupuesto.actualizarPresupuesto(presupuesto)
    repintar();
}


function nuevoGastoWeb(){
    let descripcion = prompt ("Introudzca la descripción")
    let valor = parseFloat(prompt("Introudzca el valor"))
    let fecha = prompt ("Introudzca la fecha")
    let etiquetas = prompt ("Introudzca las etiquetas")

    let arrayEtiquetas = etiquetas.split(",");

    let gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...arrayEtiquetas);
    
    gestionPresupuesto.anyadirGasto(gasto)

    repintar()
}


function EditarHandle(){
    this.handleEvent = function(e){
        let descripcion = prompt(`Nueva descripción del gasto`);
        let valor1 = parseFloat(prompt(`Indique el valor`))
        let fecha = prompt(`Actualice la fecha`)
        let etiquetas = prompt(`Escriba las etiquetas`)

        let arrayEtiquetas =etiquetas.split(`,`);

        this.gasto.actualizarValor(valor1);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...arrayEtiquetas);  
        repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function(e) {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}


function BorrarEtiquetasHandle(){
    this.handleEvent = function(e) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").contentEditable.cloneNode(true);
    var formulario = plantillaformulario.querySelector("form");
    let divControlesPrincipales = document.getElementById("controlesprincipales");
    divControlesPrincipales.appendChild(formulario);
    let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");
}

function anyadirGastoFormulario(){

}


const btnActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
btnActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

const btnNuevoGasto = document.getElementById("anyadirgasto");
btnNuevoGasto.addEventListener("click", nuevoGastoWeb);



export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}