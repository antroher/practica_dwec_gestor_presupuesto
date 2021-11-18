import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId (idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement("p");
    parrafo.textContent = valor;
    elemento.appendChild(parrafo);
}

function mostrarGastoWeb (idElemento, gasto) {
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

function mostrarGastosAgrupadosWeb (idElemento, agrup, periodo) {
    const elemento = document.getElementById(idElemento);
    let datos = ""
    for (let [clave, valor] of Object.entries(agrup)) {
        datos += 
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${clave}</span>
            <span class="agrupacion-dato-valor">${valor}</span>
        </div>`
    };
    elemento.innerHTML += 
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${datos}
    `
}

function repintar () {
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

function actualizarPresupuestoWeb () {
    let valor = parseFloat ( promt ("Introduzaca un presupuesto: "));
    gestionPresupuesto.actualizarPresupuesto(valor);
    reprintar();
}

function nuevoGastoWeb (){
    let descripcion = promt('Descirba el objrto a adquirir: ');
    let valor = parseFloat(promt('Indique el valor de la adquisición: '));
    let fecha = promt('Indique la fecha utilizando un formato (yyyy-mm-dd): ');
    let etiquetas =  promt('Indique las etiquetas separándolas por comas: ');

    let ArrayEtiquetas = etiquetas.split(',');

    let gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...ArrayEtiquetas);
    
    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}

function editarHandle() {
    this.handleEvennt = function(e) {
        let descripcion = promt('Indique la nueva descripción del gasto: ');
        let valor = parseFloat(promt('Indique el nuevo valor: '));
        let fecha = promt('Inqdique la nueva fecha en formato (yyyy-mm-dd): ');
        let etiquetas = promt('Indique las etiquetas separadas por comas: ');
        
        let ArrayEtiquetas = etiquetas.split(',');
        
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...ArrayEtiquetas);  
        repintar();
    }
}

function borrarHandle(){
    this.handleEvennt = function(e){
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}

function borrarEtiquetasHandle(){
    this.handleEvent = function(e) {
        this.gasto.borrarEtiquetas(this.etiqueta);
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
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    editarHandle,
    borrarHandle,
    borrarEtiquetasHandle
}