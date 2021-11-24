import * as gestionPresupuesto from './gestionPresupuesto.js'
'use strict';

document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);

function mostrarDatoEnId(idElemento ,valor){
    
    let p = document.createElement('p');
    let elem = document.getElementById(idElemento);
    p.textContent += valor;
    elem.appendChild(p);
    console.log(elem);

}

 function mostrarGastoWeb(idElemento, gasto)
{
    let contenido = document.getElementById(idElemento);

    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    let div4 = document.createElement("div");
    let div5 = document.createElement("div");

    div1.className = "gasto";

    div2.className = "gasto-descripcion";
    div2.append(gasto.descripcion);

    div3.className = "gasto-fecha";
    div3.append(gasto.fecha);

    div4.className = "gasto-valor";
    div4.append(gasto.valor);

    div1.append(div2);
    div1.append(div3);
    div1.append(div4);

    div5.className = "gasto-etiquetas";

    for (let e of gasto.etiquetas)
    {
        let span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";

        span.append(e);
        div5.append(span);

        //Borrado etiquetas
        let evEtiquetas = new BorrarEtiquetasHandle();
        evEtiquetas.gasto = gasto;
        evEtiquetas.etiqueta = e;

        span.addEventListener("click", evEtiquetas);
    }

    div1.append(div5);

    //Boton Editar
    let evEditar = new EditarHandle();
    evEditar.gasto = gasto;

    let btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.className = "gasto-editar";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", evEditar);

    //Boton borrar
    let evBorrar = new BorrarHandle();
    evBorrar.gasto = gasto;

    let btnBorrar = document.createElement("button");
    btnBorrar.type = "button";
    btnBorrar.className = "gasto-borrar";
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", evBorrar);

    div1.append(btnEditar);
    div1.append(btnBorrar);
    contenido.append(div1);
}

function repintar()
{
    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gesPres.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    let listaGastos = gesPres.listarGastos();
    for (let g of listaGastos)
    {
        mostrarGastoWeb("listado-gastos-completo", g);
    }
}
function nuevoGastoWeb()
{
    let desc = prompt("Introduce una descripcion");
    let valor = parseFloat(prompt("Introduce un valor"));
    let fecha = prompt("introduce una fecha");
    let etiqs = prompt("introduce las etiquetas");

    etiqs = etiqs.split(",");

    let g1 = new gesPres.CrearGasto(desc, valor, fecha, etiqs);

    gesPres.anyadirGasto(g1);

    repintar();
}

function actualizarPresupuestoWeb()
{
    let presu = prompt("Introduzca un presupuesto");

    let presuNum = parseFloat(presu);

    gesPres.actualizarPresupuesto(presuNum);

    repintar();
}

function EditarHandle()
{
    this.handleEvent = function(e)
    {
        let des = prompt("Introduce una descripcion");
        let val = parseFloat(prompt("Introduce un valor"));
        let fech = prompt("introduce una fecha");

        let etiqsPrompt = prompt("introduce las etiquetas");

        let etiq = etiqsPrompt.split(",");

        this.gasto.actualizarValor(val);
        this.gasto.actualizarDescripcion(des);
        this.gasto.actualizarFecha(fech);
        this.gasto.anyadirEtiquetas(...etiq);

        repintar();
    }
}

function BorrarHandle()
{
    this.handleEvent = function(e)
    {
        gesPres.borrarGasto(this.gasto.id);

        repintar();
    }
}
function BorrarEtiquetasHandle()
{
    this.handleEvent = function(e)
    {
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    nuevoGastoWeb,
    actualizarPresupuestoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
}
