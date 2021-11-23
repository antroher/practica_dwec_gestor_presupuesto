//Para iterar sobre un collection del node usar for...of
// npx cypress open
import * as gestionPresupuesto from "./gestionPresupuesto.js";


function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elemento.appendChild(p);
}

function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento);
    let gastoDiv = document.createElement("div");
    
    gastoDiv.classList.add("gasto");
    elemento.append(gastoDiv);
    gastoDiv.innerHTML +=
    `
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${gasto.fecha}</div> 
        <div class="gasto-valor">${gasto.valor}</div> 
    `
    let etiquetas = document.createElement("div");
    etiquetas.classList.add = "gasto-etiquetas";
    gastoDiv.append(etiquetas);

    for (let etiqueta of gasto.etiquetas) {

        let newObjEtiqueta = new BorrarEtiquetasHandle();
        newObjEtiqueta.gasto = gasto;

        let etiquetaGasto = document.createElement("span");
        etiquetaGasto.className = "gasto-etiquetas-etiqueta";
        etiquetaGasto.innerHTML = etiqueta + "<br>";
        newObjEtiqueta.etiqueta = etiqueta;

        etiquetas.append(etiquetaGasto);

        etiquetaGasto.addEventListener("click",newObjEtiqueta);

    }
   
    let btnEditar = document.createElement("button");
    btnEditar.className += 'gasto-editar'
    btnEditar.textContent = "Editar";
    btnEditar.type = 'button';

    let btnBorrar = document.createElement("button");
    btnBorrar.className += 'gasto-borrar'
    btnBorrar.textContent = "Borrar";
    btnBorrar.type = 'button';

    let edit = new EditarHandle();
    let delet = new BorrarHandle();
    edit.gasto = gasto;
    delet.gasto = gasto;

    btnEditar.addEventListener('click', edit);
    btnBorrar.addEventListener('click', delet);


    gastoDiv.append(btnEditar);
    gastoDiv.append(btnBorrar);
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

    document.getElementById("listado-gastos-completo").innerHTML = " ";

    let listaGastos = gestionPresupuesto.listarGastos();
    for (const gasto of listaGastos) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb() {

    let valor = parseFloat(prompt ("Introduce un nuevo presupuesto: "));

    gestionPresupuesto.actualizarPresupuesto(valor);

    repintar();

}

function nuevoGastoWeb() {

    let descripcion = prompt("Introducir la descripcion");
    let valor = parseFloat(prompt("Introducir valor"));
    let fecha = prompt("Introduce la fecha (yyyy-mm-dd)");
    //const etiquetas = new Array();
    let etiquetasintro = prompt("Introduce las etiquetas separandolas con (,) ");
    
    const etiquetas = etiquetasintro.split(",");

   
    /*
    let control = true;
    let etiqueta = "";
    etiquetas.push(etiqueta);
    while(control == true){
    }
    */    

    const gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);

    gestionPresupuesto.anyadirGasto(gasto);

    repintar();

}

function EditarHandle() {
    
    this.handleEvent = function(x){

        let descripcion = prompt(`Introducir la descripcion`);
        let valor1 = parseFloat(prompt(`Introducir valor`));
        let fecha = prompt(`Introduce la fecha (yyyy-mm-dd)`);
        //const etiquetas = new Array();
        let etiquetasintro = prompt(`Introduce las etiquetas separandolas con (,)`);

        let etiquetas = etiquetasintro.split(`,`);

        this.gasto.actualizarValor(valor1);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);
        
        repintar();
    }
}

function BorrarHandle() {

    this.handleEvent = function (a) {
        let idnum = this.gasto.id;
        gestionPresupuesto.borrarGasto(idnum);
        repintar();

    }
}

function BorrarEtiquetasHandle() {

    this.handleEvent = function (a) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

//botones
const botonactulizarpresupuesto = document.getElementById('actualizarpresupuesto')
const botonanyadirgasto = document.getElementById('anyadirgasto');

//Event
botonactulizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);
botonanyadirgasto.addEventListener('click', nuevoGastoWeb);

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}