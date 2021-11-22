"use strict";

import * as gestionpre from './gestionPresupuesto.js';

document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);

function mostrarDatoEnId(idElemento, valor)
{
    let elem = document.getElementById(idElemento);
    let parrafo = document.createElement('p');
    parrafo.textContent = valor;
    elem.appendChild(parrafo);

}

function mostrarGastoWeb(idElemento, gasto)
{
    /*let div = `<div class="gasto">
                            <div class="gasto-descripcion"> ${gasto.descripcion} </div>
                            <div class="gasto-fecha"> ${gasto.fecha} </div>
                            <div class="gasto-valor"> ${gasto.valor} </div>
                            <div class="gasto-etiquetas">`;

    for(let gast of gasto.etiquetas)       
            div += ` <span class="gasto-etiquetas-etiqueta"> ${gast} </span> `;
        
    div += `</div></div>`;

    document.getElementById(idElemento).innerHTML += div;*/

    let ele = document.getElementById(idElemento);  
    
    let divG1 = document.createElement('div');
    divG1.className = 'gasto';

    let divGastoDescri = document.createElement('div');
    divGastoDescri.className = 'gasto-descripcion'; // Le asignamos el id 'gasto-descripcion'
    divGastoDescri.textContent = gasto.descripcion;
    divG1.append(divGastoDescri); //divGastoDescripcion hijo de divGasto
    
    
    let divGastoFech = document.createElement('div');
    divGastoFech.className = 'gasto-fecha'; 
    divGastoFech.textContent = new Date(gasto.fecha).toLocaleDateString();
    divG1.append(divGastoFech); 

    
    let divGastoV1 = document.createElement('div');
    divGastoV1.className = 'gasto-valor'; 
    divGastoV1.textContent = gasto.valor + '';
    divG1.append(divGastoV1); 

    
    let divGastoEtiq = document.createElement('div');
    divGastoEtiq.className = 'gasto-etiquetas'; 
    gasto.etiquetas.forEach(label =>
        {
            let spanetiq = document.createElement('span');
            spanetiq.className = 'gasto-etiquetas-etiqueta';
            spanetiq.textContent = label + '';

            let borraEti = new BorrarEtiquetasHandle();
            borraEti.gasto = gasto;
            borraEti.etiqueta = label;
            spanetiq.addEventListener('click', borraEti);
            divGastoEtiq.append(spanetiq);            
        }
    );

    divG1.append(divGastoEtiq); 

    if(idElemento == 'listado-gastos-completo')
    {
        let btnEditar = document.createElement('button');
        btnEditar.className = 'gasto-editar';
        btnEditar.type = 'button';
        btnEditar.textContent = 'Editar';

        let editarHandle = new EditarHandle();
        editarHandle.gasto = gasto;
        btnEditar.addEventListener('click', editarHandle);
        divG1.append(btnEditar);

        let btnBorrar = document.createElement('button');
        btnBorrar.className = 'gasto-borrar';
        btnBorrar.type = 'button';
        btnBorrar.textContent = 'Borrar';

        let borrarHandle = new BorrarHandle();
        borrarHandle.gasto = gasto;
        btnBorrar.addEventListener('click', borrarHandle);
        divG1.append(btnBorrar);
    }
    
    ele.append(divG1);

}
        

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento);
    let mensaje= 
    "<div class='agrupacion'>\n" + 
    "<h1>Gastos agrupados por " + periodo + "</h1>\n";
    for(let etiq in agrup)
    {
        mensaje += 
        "<div class='agrupacion-dato'>\n" +
        "<span class='agrupacion-dato-clave'>" + etiq + "</span>\n" +
        "<span class='agrupacion-dato-valor'>" + agrup[etiq] + "</span>\n"+
        "</div>\n";
    }
    mensaje += "</div>\n";
    elemento.innerHTML += mensaje;

}

function repintar()
{
    document.getElementById('presupuesto').innerHTML = '';
    document.getElementById('balance-total').innerHTML = '';
    document.getElementById('gastos-totales').innerHTML = '';
    mostrarDatoEnId('presupuesto', gestionpre.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gestionpre.calcularTotalGastos());
    mostrarDatoEnId('balance-total', gestionpre.calcularBalance());

    document.getElementById('listado-gastos-completo').innerHTML = '';
    let lisgas = gestionpre.listarGastos();
    lisgas.forEach(exp => {mostrarGastoWeb('listado-gastos-completo', exp);});
    
    document.getElementById('listado-gastos-filtrado-1').innerHTML = '';
    let gastosFlt = gestionpre.filtrarGastos({fechaDesde:'2021-09-01', fechaHasta:'2021-09-30'});
    gastosFlt.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-1', gastoFiltrado);});

    document.getElementById('listado-gastos-filtrado-2').innerHTML = '';
    gastosFlt = gestionpre.filtrarGastos({valorMinimo:50});
    gastosFlt.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-2', gastoFiltrado);});

    document.getElementById('listado-gastos-filtrado-3').innerHTML = '';
    gastosFlt = gestionpre.filtrarGastos({valorMinimo:200,etiquetasTiene:['seguros']});
    gastosFlt.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-3', gastoFiltrado);});

    document.getElementById('listado-gastos-filtrado-4').innerHTML = '';
    gastosFlt = gestionpre.filtrarGastos({valorMaximo:50,etiquetasTiene:['comida','transporte']});
    gastosFlt.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-4', gastoFiltrado);});
    
}

function actualizarPresupuestoWeb()
{
    let presupuesto = prompt('Introduce un presupuesto nuevo');
    presupuesto = parseInt(presupuesto);

    gestionpre.actualizarPresupuesto(presupuesto);

    repintar();
}

function nuevoGastoWeb()
{
    let descrip = prompt('Introduce la descripción del gasto: ');
    let valor = prompt('Introduce el valor del gasto: ');
    let fecha = prompt('Introduce la fecha del gasto: ');
    let etiq = prompt('Introduce las etiquetas: ');

    valor = parseFloat(valor);
    etiq = etiq.split(',');

    let g1 = new gestionpre.CrearGasto(descrip, valor, fecha, etiq);

    gestionpre.anyadirGasto(g1);

    repintar();
}

function BorrarHandle()
{
    this.handleEvent = function()
    {
        gestionpre.borrarGasto(this.gasto.id);
        repintar();
    };
 }
 function BorrarEtiquetasHandle()
 {
    this.handleEvent = function()
    {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
 }

 function EditarHandle(){

    this.handleEvent = function(e)
    {
       //Pedir datos al usuario
       let descri = prompt("Introduce la descripción nueva: ", this.gasto.descripcion);
       let v1 = prompt("Introduce el valor nuevo: ", this.gasto.valor);
       let f1 = prompt("Introduce la fecha nueva: ", this.gasto.fecha);
       let etiq = prompt("Inroduce las etiquetas nuevas: ", this.gasto.etiquetas);

       v1 = parseFloat(v1);
       etiq = etiq.split(',');

       this.gasto.actualizarDescripcion(descri);
       this.gasto.actualizarValor(v1);
       this.gasto.actualizarFecha(f1);
       this.gasto.anyadirEtiquetas(...etiq);

       repintar();
    }
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    BorrarHandle,
    BorrarEtiquetasHandle,
    EditarHandle
}