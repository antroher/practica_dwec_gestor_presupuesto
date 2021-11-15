'use strict'

import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento,valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML += `<p>${valor}</p>`;
}

function mostrarGastoWeb(idElemento, gasto)
{
    let elemento = document.getElementById(idElemento);

    let div = document.createElement('div');
    div.className = 'gasto';

    let divDescripcion = document.createElement('div');
    divDescripcion.className = 'gasto-descripcion';
    divDescripcion.textContent = `${gasto.descripcion}`;

    let divValor = document.createElement('div');
    divValor.className = 'gasto-valor';
    divValor.textContent = `${gasto.valor}`; 

    let divFecha = document.createElement('div');
    divFecha.className = 'gasto-fecha';
    divFecha.textContent = `${gasto.fecha}`;

    let divEtiqueta = document.createElement('div');
    divEtiqueta.className = 'gasto-etiquetas';

    for (let etiq of gasto.etiquetas)
    {
        let spanEtiquetas = document.createElement('span');
        spanEtiquetas.className = 'gasto-etiquetas-etiqueta';
        spanEtiquetas.textContent = `${etiq}`;
        divEtiqueta.append(spanEtiquetas);
        
        //Boton solo para Etiquetas
        let botonBorrarEtiquetas = new BorrarEtiquetasHandle();
        botonBorrarEtiquetas.gasto = gasto;
        botonBorrarEtiquetas.etiq = etiq;
        spanEtiquetas.addEventListener('click', botonBorrarEtiquetas);        
    }
    
    //boton editar
    let botonEditar = document.createElement('button');
    botonEditar.className = 'gasto-editar';
    botonEditar.textContent = 'Editar';
    botonEditar.type = 'button';

    let editarNew = new EditarHandle();
    editarNew.gasto = gasto;

    botonEditar.addEventListener('click', editarNew);    

    //boton borrar
    let botonBorrar = document.createElement('button');
    botonBorrar.className = 'gasto-borrar';
    botonBorrar.textContent = 'Borrar';
    botonBorrar.type = 'button';

    let borrarNew = new BorrarHandle();
    borrarNew.gasto = gasto;

    botonBorrar.addEventListener('click', borrarNew);
    
    //Append
    div.append(divDescripcion);
    div.append(divValor);
    div.append(divFecha);
    div.append(divEtiqueta);
    div.append(botonEditar);
    div.append(botonBorrar);       
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

function repintar()
{
    mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());

    mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());

    mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance())

    let borrarGasto = document.getElementById('listado-gastos-completo').innerHTML = '';

    let listaGasto = gestionPresupuesto.listarGastos();

    for (let gasto of listaGasto)
    {
        mostrarGastoWeb('listado-gastos-completo', gasto);
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
    let etiquetasNew = prompt('Introduzca las etiquetas del gasto');
    let separador = ',';
    let Etiquetas = etiquetasNew.split(separador);
    gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto(descripcionNew, valorNew, fechaNew, Etiquetas));
    repintar();
}

//BOTON anyadirgasto
let anyadirgasto = document.getElementById("anyadirgasto");
anyadirgasto.addEventListener('click', nuevoGastoWeb);

function EditarHandle()
{
    this.handleEvent = function(event) 
    {
        //Pedir al usuario datos del gasto, etc
        let desc = prompt('Introduzca la descripción del gasto');
        let val = parseFloat(prompt('Introduzca el valor del gasto'));
        let fec = prompt('Introduzca una fecha del gasto en formato yyyy-mm-dd');
        let etique = prompt('Introduzca las etiquetas del gasto (lista separada por comas)');
        let separador = ',';
        let etiq = etique.split(separador);
        this.gasto.actualizarValor(val);
        this.gasto.actualizarDescripcion(desc);
        this.gasto.actualizarFecha(fec);
        this.gasto.anyadirEtiquetas(...etiq);
        repintar();
    }
}

function BorrarHandle()
{
    this.handleEvent = function(event)
    {       
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle() 
{
    this.handleEvent = function(event)
    {
        this.etiqueta = this.etiqueta.split(',');
        this.gasto.borrarEtiquetas(...this.etiqueta);        
        repintar();
    }
}

//********** NO TOCAR **************
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,    
    repintar, 
    actualizarPresupuestoWeb, 
    nuevoGastoWeb, 
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
    
}