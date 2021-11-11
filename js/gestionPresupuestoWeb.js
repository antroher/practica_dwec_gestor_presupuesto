import * as GesPresu from "./gestionPresupuesto.js";

//Eventos
document.getElementById("actualizarpresupuesto").addEventListener('click', actualizarPresupuestoWeb);
// button.addEventListener("click",actualizarPresupuestoWeb) otra opción
document.getElementById("anyadirgasto").addEventListener("click",nuevoGastoWeb);

function mostrarDatoEnId(idElemento,valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML = `<p>${valor}</p>`;  
}

function mostrarGastoWeb(idElemento,gastos){
    let elemento = document.getElementById(idElemento);

    gastos.forEach((gasto) => {
        let etiquetas = "";

        gasto.etiquetas.forEach((etiqueta) => {
            etiquetas +=
            `<span class="gasto-etiquetas-etiqueta">
                ${etiqueta}
            </span>`;
        });

        elemento.innerHTML += 
        `<div class="gasto">
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${gasto.fecha}</div> 
        <div class="gasto-valor">${gasto.valor}</div> 
        <div class="gasto-etiquetas">
            ${etiquetas}
        </div> 
        </div>`
    })

}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let elemento = document.getElementById(idElemento);
    let gastos = [];
    
    for(let [propiedad,valor] of Object.entries(agrup)){
        gastos +=
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${propiedad}</span>
            <span class="agrupacion-dato-valor">${valor}</span>
        </div>`;
    }
    elemento.innerHTML += 
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${gastos}
    </div>`
}
function repintar(){
    mostrarDatoEnId("presupuesto",GesPresu.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales",GesPresu.calcularTotalGastos());
    mostrarDatoEnId("balance-total",GesPresu.calcularBalance());
    document.getElementById("listado-gastos-completo").innerHTML = "";//borra el listado-gastos-completos y lo cambia a string"vacio"
    mostrarGastoWeb("listado-gastos-completo",GesPresu.listarGastos());
}

function actualizarPresupuestoWeb()
{
    let prestu = parseFloat(prompt("Introduzca un presupuesto"));
    GesPresu.actualizarPresupuesto(prestu);   
    repintar();
}

function nuevoGastoWeb()
{
    let descripcion = prompt("Ponga una nueva decripción al objeto");
    let valor = parseFloat(prompt("Ponga un nuevo valor al objeto"));
    let fecha = Date.parse(prompt("Ponga una nueva fecha"));
    let etiquetas = prompt("Ponga nuevas etiqeutas");

    let arrayetiquetas = etiquetas.split(",");
    let gasto = new GesPresu.CrearGasto(descripcion,valor,fecha,arrayetiquetas);
    GesPresu.anyadirGasto(gasto);
    repintar();
}


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}