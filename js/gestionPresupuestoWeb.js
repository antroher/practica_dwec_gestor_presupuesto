/*utilidades necesarias para mostrar los datos de la aplicación*/
"use strict";

import * as gestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
    let Elemento = document.getElementById(idElemento); //selecciona el elemento
    let parrafo = document.createElement("p");//crea el elemento
    parrafo.textContent = valor;//modifica el contenido del elemento p
    Elemento.appendChild(parrafo);//añade el contenido del texto al párrafo (lo añade al html)
}

function mostrarGastoWeb(idElemento, gastos) {
    let elemento = document.getElementById(idElemento);
    let divgasto = document.createElement('div');
    divgasto.className = "gasto" ; //hijo de elemento idElemento
    
    if (idElemento === 'listado-gastos-completo')
       divgasto.id = gastos.id
    
       let divGD = document.createElement('div');
    divGD.className += 'gasto-descripcion';
    divGD.textContent = `${gastos.descripcion}`;

    let divGF = document.createElement('div');
    divGF.className += 'gasto-fecha';
    divGF.textContent = `${gastos.fecha}`;

    let divGV = document.createElement('div');
    divGV.className += 'gasto-valor';
    divGV.textContent = `${gastos.valor}`;


    let divEtiquetas = document.createElement('div');
    divEtiquetas.className = 'gasto-etiquetas';
    //divEtiquetas.textContent = `${gastos.etiquetas}`;

    for (let etiq of gastos.etiquetas){ //cada etiqueta se cuelga de las etiquetas referidas
        //Creo del objeto para borrar la etiqueta haciendo referencia al gasto
        
        //añado la etiqueta a HTML haciendo referencia a la etiqueta del gasto
        let span = document.createElement('span');
        span.className += 'gasto-etiquetas-etiqueta';
        //span.textContent += etiq + " ";
        span.textContent += etiq + " ";
        
        if(idElemento.includes('completo'))
        { 
        let EventBorrarEtiqueta = new BorrarEtiquetasHandle();
        EventBorrarEtiqueta.gasto = gastos;
        EventBorrarEtiqueta.etiqueta = etiq;
        //por cada click de la etiqueta
        span.addEventListener('click', EventBorrarEtiqueta);
        //Introduczo dentro del "div gasto-etiquetas" el span que referencia la etiqueta
        }

        divEtiquetas.append(span);
        
    }

    divgasto.append(divGD,divGF,divGV,divEtiquetas); //añado al gasto cada uno de sus elementos (descripción, fecha...)    
    elemento.append(divgasto);

    //evento del botón editar
    let eventEditar = new EditarHandle(); //objeto manejador de eventos
    eventEditar.gasto = gastos //EditarHandle tiene una propiedad gasto, a dicha propiedad se le asigna el parameto gastos
    //evento del botón borrar
    let EvenBorrar = new BorrarHandle();
    EvenBorrar.gasto = gastos;
    
    //Botón editar:
    let ButtonEditar = document.createElement('button');//crea el elemento del boton ditar
    ButtonEditar.type = 'button';
    ButtonEditar.className += 'gasto-editar'; //crea el botón editar
    ButtonEditar.textContent = "Editar"; //contenido del boton editar
    ButtonEditar.addEventListener('click', eventEditar); //eventEditar es un objeto que tiene dos propiedades (una propiedad gasto y una función HandEvent()) tiene que ser un objeto que tenga definida una propiedad y que sea una funcion

    //Botón borrar:
    let ButtonBorrar = document.createElement('button');
    ButtonBorrar.type = 'button';
    ButtonBorrar.textContent = 'Borrar';
    ButtonBorrar.className += 'gasto-borrar';
    ButtonBorrar.addEventListener('click',EvenBorrar)

    //introducimos los botones en HTML
    let gastoActual = document.getElementById(gastos.id);
    if (idElemento === 'listado-gastos-completo')
        gastoActual.append(ButtonEditar,ButtonBorrar);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    
    let agrupacion = '';

    let element = document.getElementById(idElemento);


    for (let [param,value] of Object.entries(agrup)) {
        agrupacion += `
        <div class="agrupacion-dato">
        <span class="agrupacion-dato-clave">${param}</span>
        <span class="agrupacion-dato-valor">${value}</span>
        </div>`
    }

    element.innerHTML += `
    <div class="agrupacion">
    <h1>Gastos agrupados por ${periodo}</h1>
    ${agrupacion}
    `
}

function repintar() { //inner HTML faltan filtrados vaciar y volver a llamarlos 
    //Mostrar el presupuesto 
    document.getElementById(`presupuesto`).innerHTML ='';
    let presupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId('presupuesto',presupuesto);

    //Mostrar los gastos totales
    document.getElementById(`gastos-totales`).innerHTML ='';
    let Calculogastos = gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId('gastos-totales',Calculogastos);

    //Mostrar el balance total
    document.getElementById(`balance-total`).innerHTML ='';
    let BalancePresupuesto = gestionPresupuesto.calcularBalance();
    mostrarDatoEnId('balance-total',BalancePresupuesto);

    //Borrar el contenido de div#listado-gastos-completo --> innerHTML para borrar el contenido de dicha capa
    document.getElementById("listado-gastos-completo").innerHTML = "";

    //Mostrar el listado completo de gastos
    let Listagastos = gestionPresupuesto.listarGastos();
    for (let k of Listagastos)
        mostrarGastoWeb("listado-gastos-completo", k);
    
}

//manejadora de eventos del botón actualizarpresupuesto del código HTML
function actualizarPresupuestoWeb() {
    let solicitudPresupuesto = parseFloat(prompt('introduzca un presupuesto: '));
    gestionPresupuesto.actualizarPresupuesto(solicitudPresupuesto);
    repintar();
}



function nuevoGastoWeb() {
    let Descripcion = prompt('Introduce  la descripción del gasto');
    let valueGasto = parseFloat(prompt('Introduce  el valor correspondiente al gasto'));
    let fechaGato =  Date.parse(prompt('Introduce  la fecha del gasto en formato yyyy-mm-dd'));
    let EtiquetaGasto = prompt('Introduce la etiqueta del gasto separado por ,: ');
    //EtiquetaGasto = EtiquetaGasto.split(',');
    //Crear un nuevo gasto
    let NewGasto = new gestionPresupuesto.CrearGasto(Descripcion,valueGasto,fechaGato,EtiquetaGasto);
    //Añadir el gasto a la lista de gastos
    gestionPresupuesto.anyadirGasto(NewGasto);
    repintar();
}


//edita cada gasto tras acción del botón editar de cada gasto
function EditarHandle() {
    this.handleEvent = function(event){
        //pedir al usuario datos del gasto
        let Descripcion = prompt('Introduce la descripción del gasto: ');
        this.gasto.actualizarDescripcion(Descripcion);

        let valueGasto = parseFloat(prompt('Introduce el valor correspondiente al gasto: '));
        this.gasto.actualizarValor(valueGasto);

        let fechaGato =  Date.parse(prompt('Introduce la fecha del gasto en formato yyyy-mm-dd: '));
        this.gasto.actualizarFecha(fechaGato);

        let EtiquetaGasto = prompt('Escribe la etiqueta del gasto separado por ,: ');
        this.gasto.anyadirEtiquetas(EtiquetaGasto.split(','))
        
        //después de asignar el nuevo gasto a la lista actualizo la página
        repintar();
    }
}
function BorrarHandle() {
    this.handleEvent = function (event) {
        gestionPresupuesto.borrarGasto(this.gasto.id); //borrar gasto
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function (event) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

let btnActualizarPres = document.getElementById('actualizarpresupuesto') //boton
btnActualizarPres.addEventListener('click',actualizarPresupuestoWeb); //Evento

let btnAnyadirgasto = document.getElementById('anyadirgasto');
btnAnyadirgasto = addEventListener('click',nuevoGastoWeb);

export {
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
