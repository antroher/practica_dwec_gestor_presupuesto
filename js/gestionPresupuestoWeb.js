'use strict';
import * as gestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor)
{
    let elem = document.getElementById(idElemento);
    let p= document.createElement('p');

    p.textContent=valor;
    elem.appendChild(p);
}

function mostrarGastoWeb(idElemento, gasto)
{
    let elem = document.getElementById(idElemento);

    
    let divGastos = document.createElement("div");
    divGastos.className += "gasto";
    elem.append(divGastos);

   
    let divGastosDescrip = document.createElement("div");
    divGastosDescrip.className += "gasto-descripcion";
    divGastosDescrip.textContent = gasto.descripcion;
    divGastos.append(divGastosDescrip);

 
    let divGastosFech = document.createElement("div");
    divGastosFech.className += "gasto-fecha";
    divGastosFech.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGastos.append(divGastosFech);

    
    let divGastosVal = document.createElement("div");
    divGastosVal.className += "gasto-valor";
    divGastosVal.textContent = gasto.valor;
    divGastos.append(divGastosVal)

    let divGastosEtiq = document.createElement("div");
    divGastosEtiq.className += "gasto-etiquetas";


    gasto.etiquetas.forEach(item => {
        let borrarEtiq= new BorrarEtiquetasHandle();
        borrarEtiq.gasto=gasto;
        borrarEtiq.etiqueta=item;

        let span = document.createElement("span");
        span.className += "gasto-etiquetas-etiqueta";
        span.textContent = item + " ";
        divGastosEtiq.append(span);
        if(idElemento==='listado-gastos-completo')
        {
            span.addEventListener('click', borrarEtiq);
        }
        divGastosEtiq.append(span);
    });  
    divGastos.append(divGastosEtiq);

    // 

    let objEditarHandle = new EditarHandle();
    objEditarHandle.gasto= gasto;
    let botonEdit= document.createElement('button');
    botonEdit.className="gasto-editar";
    botonEdit.textContent="Editar";
    botonEdit.addEventListener('click', objEditarHandle);

    let objBorrarHandle = new BorrarHandle();
    objBorrarHandle.gasto=gasto;
    let botonBorrar= document.createElement('button');
    botonBorrar.className="gasto-borrar";
    botonBorrar.textContent='Borrar';
    botonBorrar.addEventListener('click', objBorrarHandle);

    if(idElemento==='listado-gastos-completo')
    {
        divGastos.append(botonEdit);
        divGastos.append(botonBorrar);
    }

}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let cadenaGAgrup=`<div class="agrupacion">
                        <h1>Gastos agrupados por ${periodo}</h1>`;

    for(let propiedad in agrup)
    {
        cadenaGAgrup+=`<div class="agrupacion-dato">
                            <span class="agrupacion-dato-clave">${propiedad}</span>
                            <span class="agrupacion-dato-valor">${agrup[propiedad]}</span>
                        </div>`;
    }

    cadenaGAgrup+=`</div>`
    document.getElementById(idElemento).innerHTML+= cadenaGAgrup;

}

function repintar()
{
    let elemento= document.getElementById('presupuesto');
    elemento.innerHTML="";
    
    elemento= document.getElementById('gastos-totales');
    elemento.innerHTML="";

    elemento= document.getElementById('balance-total');
    elemento.innerHTML="";

    elemento= document.getElementById('listado-gastos-completo');
    elemento.innerHTML="";


    let mostrarP= gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId('presupuesto', mostrarP);

    let mostrarGT= gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId('gastos-totales',mostrarGT);

    let mostrarB= gestionPresupuesto.calcularBalance();
    mostrarDatoEnId('balance-total',mostrarB);

    let arrayListadoGCompleto= gestionPresupuesto.listarGastos();
    for(let objeto of arrayListadoGCompleto)
    {
        mostrarGastoWeb('listado-gastos-completo',objeto);
    }

}

function actualizarPresupuestoWeb()
{
    let num = parseFloat(prompt('Introduce el nuevo presupuesto:'));
    gestionPresupuesto.actualizarPresupuesto(num);
    repintar();
}

let botonActualizarP=document.getElementById("actualizarpresupuesto");
botonActualizarP.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb()
{
    let descripcion= prompt('Escriba la descripción del nuevo gasto: ');
    let valor= parseFloat(prompt('Introduzca el nuevo valor: '));
    let fecha= new Date(prompt('Introduzca la fecha: ')).toLocaleDateString();
    let etiq=prompt('Escriba las etiquetas seguidas por ","');
    let arrayEtiq=etiq.split(', ');

    let gasto= new gestionPresupuesto.CrearGasto(descripcion,valor,fecha, arrayEtiq);
    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}

let botonAnyadirG= document.getElementById('anyadirgasto');
botonAnyadirG.addEventListener('click', nuevoGastoWeb);

function EditarHandle()
{
    this.handleEvent= function()
    {
        let descripcion= prompt('Escriba la descripción del nuevo gasto: ');
        let valor= parseFloat(prompt('Introduzca el nuevo valor: '));
        let fecha= new Date(prompt('Introduzca la fecha: ')).toLocaleDateString();
        let etiq=prompt('Escriba las etiquetas seguidas por ","');
        let arrayEtiq=etiq.split(', ');

        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.actualizarEtiquetas(arrayEtiq);

        repintar();
    }
}

function BorrarHandle()
{
    this.handleEvent= function()
    {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle()
{
    this.handleEvent=function()
    {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}


export{ mostrarDatoEnId,
        mostrarGastoWeb,
        mostrarGastosAgrupadosWeb}