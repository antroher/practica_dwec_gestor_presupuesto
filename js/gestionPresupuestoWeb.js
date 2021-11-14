'use strict'

import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento,valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML += `<p>${valor}</p>`;
}

function mostrarGastoWeb(idElemento, gastos)
{
    let elemento = document.getElementById(idElemento);

    for (let arrayGasto of gastos)
    {
        let lista = "";
        for (let texto of arrayGasto.etiquetas) 
        {
            lista += `<span class="gasto-etiquetas-etiqueta"> ${texto} </span>`
        }

        elemento.innerHTML +=
            `<div class="gasto">
                <div class="gasto-descripcion"> ${arrayGasto.descripcion} </div>
                <div class="gasto-fecha">${arrayGasto.fecha}</div> 
                <div class="gasto-valor">${arrayGasto.valor}</div> 
                <div class="gasto-etiquetas">
                    ${lista}
                </div>
            </div>`;
    }    
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento);
    
    let lista = ""
    for (let [nombre, valor] of Object.entries(agrup))
    {
        lista +=    `<div class="agrupacion-dato">
                        <span class="agrupacion-dato-clave"> ${nombre} </span>
                        <span class="agrupacion-dato-valor"> ${valor} </span>
                    </div>`
    };

    elemento.innerHTML +=   `<div class="agrupacion">
                                <h1> Gastos agrupados por ${periodo} </h1>

                            ${lista}`
}

//let a = document.querySelector();
// console.log(a);
function repintar()
{
    mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());

    mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());

    mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance())

    let borrarGasto = document.getElementById('listado-gastos-completo').innerHTML = '';

    let listaGasto = gestionPresupuesto.listarGastos();
    for (let g of listaGasto)
    {
        mostrarGastoWeb('listado-gastos-completo', g);
    }
}

function actualizarPresupuestoWeb()
{
    let presupuesto = parseFloat(prompt('Introduzca el presupuesto'));
    gestionPresupuesto.actualizarPresupuesto(presupuesto);
    repintar();
}

//BOTON actualizarpresupuesto
let actualizarpresupuesto = document.getElementById("actualizarpresupuesto");
actualizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb()
{
    let descripcionNew = prompt('Introduzca la descripción del gasto');
    let valorNew = parseFloat(prompt('Introduzca un valor del gasto'));
    let fechaNew = prompt('Introduzca una fecha del gasto en formato yyyy-mm-dd');
    let etiquetasNew = prompt('Introduzca las etiquetas del gasto (lista separada por comas)');
    let separador = ',';
    let arrayEtiquetas = etiquetasNew.split(separador);
    gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto(descripcionNew, valorNew, fechaNew, ...arrayEtiquetas));
    repintar();
}

//BOTON anyadirgasto
let anyadirgasto = document.getElementById("anyadirgasto");
anyadirgasto.addEventListener('click', nuevoGastoWeb);


/*
function EditarHandle ()
{
    this.handleEvent = function(event) 
    {
        //Pedir al usuario datos del gasto, etc
        var desc = prompt('Por favor, introduce la descripción');
        this.gasto.actualizarDescripcion(desc);
    }
}

let event = new CrearGasto("a", 24);

let el = new EditarHandle();

el.gasto = event();

el.handleEvent(); 

//Ejemplo de funcionamiento del programa

let gastos = gesPres.listarGastos();

for (let g of gastos) 
{
    gesPresWeb.mostrarGastoWeb(g);
}

function mostrarGastoWeb(gasto)
{
    //Pintar datos del gasto en html
    //Crear los botones
    //Crea botón "editar"
    //Crea botón "borrar" -> NO USA
    //Crea objeto manejador de eventos
    let evEditar = new EditarHandle();
    evEditar.gasto = g;
    editar.addEventListener('click', evEditar);

    for (let et of g.etiquetas)
    {
        //Pintar etiqueta
        //Añadir manejador de eventos de borrar etiqueta
    }
}
*/


//********** NO TOCAR **************
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}