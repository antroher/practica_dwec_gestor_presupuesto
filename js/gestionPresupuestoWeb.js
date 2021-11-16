import * as gestionPresupuesto from './gestionPresupuesto.js';
 
 function mostrarDatoEnId(idElemento, valor) {
    let elem = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elem.appendChild(p);
 }

function mostrarGastoWeb(idElemento, gasto) {
    let elem = document.getElementById(idElemento);
    let divGast = document.createElement("div");
    divGast.className = "gasto";
    elem.append(divGast);
    divGast.innerHTML += 
        `
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div> 
        `;

    let gastEtis = document.createElement("div");
    gastEtis.className = "gasto-etiquetas";
    divGast.append(gastEtis);

    for (let eti of gasto.etiquetas) {
        let nuevaEti = new BorrarEtiquetasHandle(); 
        nuevaEti.gasto = gasto;

        let gastoEtiq = document.createElement("span");
        gastoEtiq.className = "gasto-etiquetas-etiqueta";
        gastoEtiq.innerHTML = eti + "<br>";
        nuevaEti.etiqueta = eti;
        gastEtis.append(gastoEtiq);
        gastoEtiq.addEventListener('click',nuevaEti);
    }

    let btnEditar = document.createElement("button");
                    btnEditar.className += `gasto-editar`;
                    btnEditar.textContent = "Editar";
                    btnEditar.type = `button`;

    let btnBorrar = document.createElement("button");
                    btnBorrar.className += 'gasto-borrar';
                    btnBorrar.textContent = "Borrar";
                    btnBorrar.type = `button`;

    let editar = new EditarHandle();
    let borrar = new BorrarHandle();
    editar.gasto = gasto;
    borrar.gasto = gasto;
    
    btnEditar.addEventListener('click', editar);
    btnBorrar.addEventListener('click', borrar);
  
    
    divGast.append(btnEditar);
    divGast.append(btnBorrar);
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
    let presupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId( "presupuesto", presupuesto);
    
    let gasTot = gestionPresupuesto.calcularTotalGastos().toFixed(2);
    mostrarDatoEnId( "gastos-totales", gasTot);
    
    let balTot = gestionPresupuesto.calcularBalance().toFixed(2);
    mostrarDatoEnId("balance-total", balTot);
    
    let borrarDatos = document.getElementById("listado-gastos-completo").innerHTML = "";
    
    let gasList = gestionPresupuesto.listarGastos();
    for (const x of gasList) {
        mostrarGastoWeb("listado-gastos-completo", x);
    }
}

function actualizarPresupuestoWeb () {
    let presp = parseFloat(prompt(`Introduce el presupuesto gastado`));
    gestionPresupuesto.actualizarPresupuesto(presp);
    repintar();
}

const actualizarpresupuesto = document.getElementById("actualizarpresupuesto");
actualizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb () {
    let des = prompt(`¿En qué te lo has gastado esta vez?`);
    let val = parseFloat(prompt(`¿Cuánto ha sido?`));
    let fec = prompt(`¿Y cuándo fue eso? Dímelo con el formato yyyy-mm-dd`);
    let eti = prompt(`Etiqueta el gasto con todas las etiquetas que quieras, pero sepáralas con comas (,)`);
    let etiArray = eti.split(',');
    let gasto = new gestionPresupuesto.CrearGasto(des, val, fec, ...etiArray);
    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}

const anyadirgasto = document.getElementById("anyadirgasto");
anyadirgasto.addEventListener('click', nuevoGastoWeb);


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

//Botones


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}