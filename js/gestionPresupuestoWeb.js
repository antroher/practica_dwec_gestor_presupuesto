'use strict'

function mostrarDatoEnId(idElemento, valor){
    let elem = document.getElementById(idElemento);
    let p = document.createElement('p');
    p.textContent = valor;
    elem.appendChild(p);
}

function mostrarGastoWeb(idElemento, gasto){
    let elem = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.classList.add('gasto');
    elem.append(divGasto);

    let divGastoDes = document.createElement('div');
    divGastoDes.classList.add('gasto-descripcion');
    divGastoDes.innerHTML = `${gasto.descripcion}`;
    divGasto.append(divGastoDes);

    let divGastoFec = document.createElement('div');
    divGastoFec.classList.add('gasto-fecha');
    divGastoFec.innerHTML = `${gasto.fecha}`;
    divGasto.append(divGastoFec); 

    let divGastoVal = document.createElement('div');
    divGastoVal.classList.add('gasto-valor');
    divGastoVal.innerHTML = `${gasto.valor}`;
    divGasto.append(divGastoVal);

    let divGastoEti = document.createElement('div');
    divGastoEti.classList.add('gasto-etiquetas');
    divGasto.append(divGastoEti);

    for (let et of gasto.etiquetas){
        let objBorrarEti = new BorrarEtiquetasHandle();
        objBorrarEti.gasto = gasto;
        let spanGastoEti = document.createElement('span');
        spanGastoEti.classList.add('gasto-etiquetas-etiqueta');
        spanGastoEti.innerHTML = et;
        objBorrarEti.etiqueta = et;
        spanGastoEti.addEventListener('click', objBorrarEti);
        divGastoEti.append(spanGastoEti);
    }

    let botonE = document.createElement('button');
    botonE.classList.add('gasto-editar');
    botonE.innerHTML = 'Editar';
    let objEditar = new EditarHandle();
    objEditar.gasto = gasto;
    botonE.addEventListener("click",objEditar);
    divGasto.append(botonE);

    let botonB = document.createElement('button');
    botonB.classList.add('gasto-borrar');
    botonB.innerHTML = 'Borrar';
    let objBorrar = new BorrarHandle();
    objBorrar.gasto = gasto;
    botonB.addEventListener("click",objBorrar);
    divGasto.append(botonB);

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elem = document.getElementById(idElemento);

    let divAgrupacion = document.createElement('div');
    divAgrupacion.classList.add('agrupacion');
    elem.append(divAgrupacion);

    let hacheUno = document.createElement('h1');
    hacheUno.innerHTML = 'Gastos agrupados por ' + periodo;
    divAgrupacion.append(hacheUno);

    for (let propiedad in agrup){

        let divAgrupDato = document.createElement('div');
        divAgrupDato.classList.add('agrupacion-dato');
        divAgrupacion.append(divAgrupDato);

        let spanClave = document.createElement('span');
        spanClave.classList.add('agrupacion-dato-clave');
        spanClave.innerHTML = `${propiedad}`;
        divAgrupDato.append(spanClave);

        let spanValor = document.createElement('span');
        //spanValor.classList.add('agrupacion-dato-valor');
        spanValor.className = 'agrupacion-dato-valor';
        spanValor.innerHTML = `${agrup[propiedad]}`;
        divAgrupDato.append(spanValor);

    }
}

import * as gP from './gestionPresupuesto.js';

function repintar(){
    let texto = gP.mostrarPresupuesto();
    mostrarDatoEnId('presupuesto', texto);

    let total = gP.calcularTotalGastos();
    mostrarDatoEnId('gastos-totales', total);

    let balance = gP.calcularBalance();
    mostrarDatoEnId('balance-total', balance);

    let lisGasComp = document.getElementById('listado-gastos-completo');
    lisGasComp.innerHTML = '';

    let listado = gP.listarGastos();
    for (let gasto of listado){
    mostrarGastoWeb('listado-gastos-completo', gasto);
    }
}

function actualizarPresupuestoWeb(){
    let presu = parseFloat(prompt('Introduzca un presupuesto'));
    gP.actualizarPresupuesto(presu);
    repintar();
}

let b1 = document.getElementById('actualizarpresupuesto');
b1.addEventListener("click",actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    let des = prompt('Introduzca una descripción');
    let val = parseFloat(prompt('Introduzca un valor'));
    let fec = new Date(prompt('Introduzca una fecha')).toLocaleDateString();
    let eti = prompt('Introduzca una etiqueta(seguida de una coma)'); 
    eti = eti.split(', ');

    let gasto1 = new gP.CrearGasto(des, val, fec, eti);

    gP.anyadirGasto(gasto1);

    repintar();
}

let b2 = document.getElementById('anyadirgasto');
b2.addEventListener("click",nuevoGastoWeb);

function EditarHandle(){
    this.handleEvent = function(event){
        let des = prompt('Edita la descripción del gasto');
        let val = parseFloat(prompt('Edita el valor del gasto'));
        let fec = new Date(prompt('Edita la fecha del gasto')).toLocaleDateString();
        let eti = prompt('Edita las etiquetas del gasto(seguida de una coma)'); 
        eti = eti.split(', ');

        this.gasto.actualizarValor(val);
        this.gasto.actualizarDescripcion(des);
        this.gasto.actualizarFecha(fec);
        this.gasto.anyadirEtiquetas(eti);

        repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function(event){

        gP.borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(event){

        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}