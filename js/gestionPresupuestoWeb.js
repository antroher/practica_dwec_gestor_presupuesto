//Importar los programas

import * as GestPresWeb from './gestionPresupuestoWeb.js';
import * as GestPres from './gestionPresupuesto.js';

//Función mostrarDatoenId

function mostrarDatoEnId(idElemento, valor){
    var elem = document.getElementById(idElemento);
    elem.textContent = valor;
}

//Función mostrarGastoWeb
function mostrarGastoWeb(idElemento, gastos){
    let elem = document.getElementById(idElemento);
    let divG = document.createElement("div");
    divG.className = "gasto";
    elem.append(divG);

    divG.innerHTML +=
    `
        <div class="gasto-descripcion">${gastos.descripcion}</div>
        <div class="gasto-fecha">${gastos.fecha}</div>
        <div class="gasto-valor">${gastos.valor}</div>
    `;

    let etiquetasG = document.createElement("div");
    etiquetasG.className = "gasto-etiquetas";
    divG.append(etiquetasG);

    for (let eti of gastos.etiquetas){
        let objEtiqueta = new BorrarEtiquetasHandle();
        objEtiqueta.gasto = gasto;

        let gastoEtiqueta = document.createElement("span");
        gastoEtiqueta.className = "gasto-etiquetas-etiqueta";
        gastoEtiqueta.innerHTML = eti + "<br>";
        objEtiqueta.etiqueta = eti;

        etiquetasG.append(gastoEtiqueta);

        gastoEtiqueta.addEventListener('click', objEtiqueta);
    }

    let botonEditar = document.createElement('button');
        botonEditar.className += 'gasto-editar';
        botonEditar.textContent = 'Editar';
        botonEditar.type = 'button';

    let botonBorrar = document.createElement('button');
        botonBorrar.className += 'gasto-borrar';
        botonBorrar.textContent = 'Borrar';
        botonBorrar.type = 'button';

    let editar1 = new EditarHandle();
    let borrar1 = new BorrarHandle();

    editar1.gasto = gasto;
    borrar1.gasto = gasto;

    botonEditar.addEventListener('click', editar1);
    botonBorrar.addEventListener('click', borrar1);

        // for(let gasto of gastos){
    //     let cadena = "";
    //     for(let i of gasto.etiquetas){
    //         cadena += 
    //         `<span class="gasto-etiquetas-etiqueta">
    //                  ${i}
    //         </span>`
    //     }
    
    //     elem.innerHTML += `<div class="gasto">
    //         <div class="gasto-descripcion">${gasto.descripcion}</div>
    //         <div class="gasto-fecha">${gasto.fecha}</div> 
    //         <div class="gasto-valor">${gasto.valor}</div> 
    //         <div class="gasto-etiquetas">
    //            ${cadena};
    //         </div> 
    //     </div>`
    // }
}

//Función mostrarGastosAgrupadosWeb
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    var elem = document.getElementById(idElemento);

    let elemento = ""
    for (let [clave, valor] of Object.entries(agrup)) {
        elemento += 
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${clave}</span>
            <span class="agrupacion-dato-valor">${valor}</span>
        </div>`
    };

    elem.innerHTML += 
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${elemento}
    </div>
    `
}

//Función repintar
function repintar(){
    GestPres.mostrarDatoEnId('presupuesto', GestPres.mostrarPresupuesto());
    GestPres.mostrarDatoEnId('gastos-totales', GestPres.calcularTotalGastos());
    GestPres.mostrarDatoEnId('balance-total', GestPres.calcularBalance());
    document.getElementById('listado-gastos-completo').innerHTML = "";
    for (const gasto of GestPres.listarGastos()){
        mostrarGastoWeb('listado-gastos-completo', gasto);
    }
}

//Función actualizarPresupuestoWeb y botón actualizarpresupuesto

function actualizarPresupuestoWeb(){
    let nuevoPres = parseFloat(prompt('Inserta el nuevo presupuesto'));
    GestPresWeb.actualizarPresupuesto(nuevoPres); 
    repintar();
}

function nuevoGastoWeb(){
    let descripcion = prompt('Inserta una descripción: ');
    let valor = parseFloat(prompt('Inserta un nuevo valor: '));
    let fecha = prompt('Escriba la fecha: (formato yyyy-mm-dd)');
    let etiqueta = prompt('Escriba las etiquetas: (Separadas con ,)');
    let etiquetasTotal = etiqueta.split(',');
    let gastoNuevo = new GestPres.CrearGasto(descripcion, valor, fecha, ...etiquetasTotal);
    GestPres.anyadirGasto(gastoNuevo);
    repintar_();

}

//EditarHandle
function EditarHandle() {
    this.handleEvent = function(event){
        let descripcion = this.prompt('Escribe una nueva descripción');
        let valor = parseFloat(this.prompt('Escribe un nuevo valor'));
        let fecha = this.prompt('Escribe una fecha nueva');
        let etiquetas = this.prompt('Escribe nuevas etiquetas');
        let etiquetasNuevas = etiquetas.split(',');
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetasNuevas);
    
        repintar();
    }
}

//borrarHandle

function BorrarHandle() {
    this.handleEvent = function(event){
        let numero = this.gasto.id;
        GestPres.borrarGasto(numero);

        repintar();
    }
}

//Borrar etiquetas Handle (BorrarEtiquetasHandle)

function BorrarEtiquetasHandle() {
    this.handleEvent = function(event){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

//Botones

let actualizarPresupuesto = document.getElementById('actualizarpresupuesto');
let gastoNuevo = document.getElementById('gastoNuevo');
//Evento

actualizarPresupuesto.addEventListener('click', actualizarPresupuestoWeb);
gastoNuevo.addEventListener('click', nuevoGastoWeb);


//Los exports 
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}