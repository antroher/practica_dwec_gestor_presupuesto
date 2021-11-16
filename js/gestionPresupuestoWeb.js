"use strict"

import * as gesPre from "./gestionPresupuesto.js";

//EVENTO BOTON ACTUALIZAR PRESUPUESTO

let botonActualizar = document.getElementById("actualizarpresupuesto");
botonActualizar.addEventListener('click', actualizarPresupuestoWeb)
//EVENTO BOTON AÑADIR GASTO
let botonAnyadir = document.getElementById("anyadirgasto");
botonAnyadir.addEventListener('click', nuevoGastoWeb);

function mostrarDatoEnId(idElemento,valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML = `<p>${valor}</p>`
    
}

function mostrarGastoWeb(idElemento,gastos){
    let element = document.getElementById(idElemento);

    gastos.forEach((gasto) => {
                
        let divG = document.createElement('div')
        divG.className = 'gasto';

        let divGDes = document.createElement('div');
        divGDes.className = 'gasto-descripcion';
        divGDes.textContent = gasto.descripcion;

        let divGFecha = document.createElement('div');
        divGFecha.className = 'gasto-fecha';
        divGFecha.textContent = gasto.fecha;

        let divGValor = document.createElement('div');
        divGValor.className = 'gasto-valor';
        divGValor.textContent = gasto.valor;

        let divGEtiq = document.createElement('div');
        divGEtiq.className = 'gasto-etiquetas';

        //AÑADIR ETIQUETAS
        gasto.etiquetas.forEach((etiq, posicion) =>{
            let spanEtiqueta = document.createElement('span');
            spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
            spanEtiqueta.textContent = etiq;
            if(gasto.etiquetas.length !== posicion+1){
                spanEtiqueta.textContent += ", ";
            }
            else{
                spanEtiqueta.textContent += ".";
            }

            let EventoBorrarEtiq = new BorrarEtiquetasHandle();
            EventoBorrarEtiq.gasto = gasto;
            EventoBorrarEtiq.etiqueta = etiq;
            spanEtiqueta.addEventListener('click', EventoBorrarEtiq)

            divGEtiq.append(spanEtiqueta);
        })

        divG.append(divGDes);
        divG.append(divGFecha);
        divG.append(divGValor);
        divG.append(divGEtiq);

        if(idElemento === 'listado-gastos-completo'){
            let botonEditar = document.createElement('button');
            botonEditar.className = 'gasto-editar';
            botonEditar.textContent = 'Editar'
    
            let botonBorrar = document.createElement('button');
            botonBorrar.className = 'gasto-borrar';
            botonBorrar.textContent = 'Borrar';
            //ELEMENTO VACIO PARA SEPARAR LOS GASTOS
            let divVacio = document.createElement('div');
            divVacio.className = 'salto';
            divVacio.textContent = "--------------------------------- ";

            //EVENTO BOTON EDITAR GASTO
            let EventoEditarHandle = new EditarHandle();
            EventoEditarHandle.gasto = gasto;
            botonEditar.addEventListener('click', EventoEditarHandle);
            //EVENTO BOTON BORRAR GASTO
            let EventoBorrarHandle = new BorrarHandle();
            EventoBorrarHandle.gasto = gasto;
            botonBorrar.addEventListener(`click`, EventoBorrarHandle);
            divG.append(botonEditar);
            divG.append(botonBorrar);
            divG.append(divVacio);
            }
        element.append(divG);
    })
}
function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let elemento = document.getElementById(idElemento);

    
    let gastos ="";
    for(let prop in agrup){
        gastos +=
        "<div class='agrupacion-dato'>" +
            "<span class='agrupacion-dato-clave'>" + prop + ": </span>" +
            "<span class='agrupacion-dato-valor'>" + agrup[prop] + "</span>"+
        "</div>";
    }

    elemento.innerHTML += 
    `<div class='agrupacion'> 
        <h1>Gastos agrupados por ${periodo} </h1>
        ${gastos}
    </div>`;
}

function repintar(){
    mostrarDatoEnId("presupuesto",gesPre.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gesPre.calcularTotalGastos());
    mostrarDatoEnId("balance-total",gesPre.calcularBalance());

    let elemento = document.getElementById("listado-gastos-completo");
    elemento.innerHTML = "";
    mostrarGastoWeb("listado-gastos-completo", gesPre.listarGastos());
}

function actualizarPresupuestoWeb (){
    let nuevoValor = parseFloat(prompt("Introduce un presupuesto."));
    gesPre.actualizarPresupuesto(nuevoValor);
    repintar();
}

function nuevoGastoWeb (){
    let descripcion = prompt("Descripción.");
    let valor = parseFloat(prompt("Valor."));
    let fecha = Date.parse(prompt("Fecha."));
    let etiquetas = prompt("Etiquetas.");

    let listaEtiquetas = etiquetas.split(',');

    let gasto = new gesPre.CrearGasto(descripcion, valor, fecha, listaEtiquetas);

    gesPre.anyadirGasto(gasto);

    repintar();
}

function EditarHandle (){
    this.handleEvent = function(evento){
        let descripcion = prompt("Descripción.");
        let valor = parseFloat(prompt("Valor."));
        let fecha = Date.parse(prompt("Fecha."));
        let etiquetas = prompt("Etiquetas.");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha (fecha);
        
        if(etiquetas != undefined){
            let listaEtiquetas = etiquetas.split(',');
            this.gasto.anyadirEtiquetas(listaEtiquetas); 
        }

        repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function(evento){
        gesPre.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function(evento) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

//El export de las funciones
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}