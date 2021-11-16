 "use strict";

 import * as gastosG from './gestionPresupuesto.js';

document.getElementById("actualizarpresupuesto").addEventListener("click",actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click",nuevoGastoWeb);

 //Función que recibe id y valor y lo muestra en un elemento <p> de HTML
 function mostrarDatoEnId(idElemento, valor){

    let dataId = document.getElementById(idElemento);
    dataId.innerHTML += `<p>${valor}<p>`

 }

 //Función que recibe un id y un gasto y despues muestra eses gasto con sus propiedades. 
 //Especial atención a los bucles para poder recorrer el array de etiquetas y mostrarlas. Tambien lo utilizamos para mostrar los datos filtrados.
 function mostrarGastoWeb(idElemento, gastos){
    let dataId = document.getElementById(idElemento);

    gastos.forEach((gasto) => {
        let etiquetas = "";

        let listDeEtiqueta = [];
        let etiquetaLista = [];

        gasto.etiquetas.forEach((etiqueta) => {
            etiquetas += 
                `<span class="gasto-etiquetas-etiqueta" id="${gasto.id}-${etiqueta}">
                    ${etiqueta}
                </span>`;

                listDeEtiqueta.push(`${gasto.id}-${etiqueta}`);
                etiquetaLista.push(`${etiqueta}`);

        });    

        dataId.innerHTML +=

            `<div class="gasto">
                <div class="gasto-descripcion">${gasto.descripcion}</div>
                <div class="gasto-fecha">${new Date(gasto.fecha).toLocaleString()}</div> 
                <div class="gasto-valor">${gasto.valor}</div> 
                <div class="gasto-etiquetas">
                    ${etiquetas}
            </div>

            <button type="button" class="gasto-editar" id="editar-${gasto.id}">Editar</button>
            <button type="button" class="gasto-borrar" id="borrar-${gasto.id}">Eliminar</button>`
    });
 }

 //Función que recibe un id, una forma de agruparse y un periodo y que mostrara los gastos agrupados segun ese periodo determinado.
 function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let dataId = document.getElementById(idElemento);
    let gastos ="";

    for(let [key, value] of Object.entries(agrup)){
        gastos +=

            `<div class="agrupacion-dato">

                <span class="agrupacion-dato-clave">${key}</span>
                <span class="agrupacion-dato-valor">${value}</span>

            </div>`;

    }
    //CUIDADO CON LOS DIVS --- PETABA PORQUE HABIAS PUESTO SOLO CLASS, SIN EL DIV DELANTE!!
        dataId.innerHTML += 
            `<div class="agrupacion">

                <h1>Gastos agrupados por ${periodo}</h1>
                ${gastos}
                
            </div>`
 }

 function repintar(){

    mostrarDatoEnId("presupuesto", gastosG.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gastosG.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gastosG.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    mostrarGastoWeb("listado-gastos-completo",gastosG.listarGastos());
}

function nuevoGastoWeb(){

    //Preguntamos al usuario por los datos del nuevo gasto
    let valor = "";
    let fecha = "";
    let etiquetas = "";
    let descripcion = "";

    //Creamos y añadimos el nuevo gasto con los datos recogidos
    gastosG.anyadirGasto(new gastosG.CrearGasto(valor, fecha, etiquetas, descripcion));

    //Actualizamos los datos
    repintar();
}

function actualizarPresupuestoWeb(){
    
    gastosG.actualizarPresupuesto(parseFloat(prompt("Introduce un presupuesto:")));

    repintar();
}

//Aqui van las funciones ligadas a los "handle" que iran en la funcion "mostrarGastosWeb"
function anyadirGasto(){

}

function editarHandle(){

}

function borrarHandle(){

}

function borrarEtiquetasHandle(){

}

 export{

    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
 }