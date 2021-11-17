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
    mostrarDatoEnId('gastos-totales', gastosTotales);

    let balanceTotal = gestionPresupuesto.calcularBalance().toFixed(2);
    mostrarDatoEnId('balance-total', balanceTotal);

    document.getElementById('listado-gastos-completo').innerHTML = "" ;

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

function EditarHandle() {
    this.handleEvent = function(e) {
        let descripcion = prompt('Nueva descripción del gasto');
        let fecha = prompt('En formato yyyy-mm-dd, actualice la fecha');
        let valor = parseFloat(prompt('Indique el nuevo valor'));
        let etiquetas = prompt('Escriba las etiquetas separadas por comas (,)');
        
        let arrayEtiquetas = etiquetas.split(",");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
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
        this.gasto.borrarEtiquetas(this.etiquetas);
        repintar();
    }
}

const btnActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
btnActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);
const btnNuevoGasto = document.getElementById("anyadirgasto");
btnNuevoGasto.addEventListener("click", nuevoGastoWeb);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}