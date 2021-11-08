import * as metodosGastos from "./gestionPresupuesto.js"


function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML += valor;
}

function mostrarGastoWeb(idElemento, gasto){
    let elemento = document.getElementById(idElemento);
    let html = 
    "<div class='gasto'>\n" +
    "<div class='gasto-descripcion'>" + gasto.descripcion + "</div>\n" +
    "<div class='gasto-fecha'>" + new Date(gasto.fecha).toLocaleDateString() + "</div>\n" + 
    "<div class='gasto-valor'>" + gasto.valor + "</div>\n" + 
    "<div class='gasto-etiquetas'>\n";
    gasto.etiquetas.forEach(e => {
        html += "<span class='gasto-etiquetas-etiqueta'>\n" + e + "\n</span>\n"
    });
    html += "</div>\n" + 
    "<button type='button' class='gasto-editar'>Editar</button>" +
    "<button type='button' class='gasto-borrar'>Borrar</button>" +
    "</div>\n";
    elemento.innerHTML += html;
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elemento = document.getElementById(idElemento);
    let html= 
    "<div class='agrupacion'>\n" + 
    "<h1>Gastos agrupados por " + periodo + "</h1>\n";
    for(let prop in agrup){
        html += 
        "<div class='agrupacion-dato'>\n" +
        "<span class='agrupacion-dato-clave'>" + prop + "</span>\n" +
        "<span class='agrupacion-dato-valor'>" + agrup[prop] + "</span>\n"+
        "</div>\n";
    }
    html += "</div>\n";
    elemento.innerHTML += html;
}

function repintar(){
    document.getElementById("presupuesto").innerHTML="";
    document.getElementById("gastos-totales").innerHTML="";
    document.getElementById("balance-total").innerHTML="";
    mostrarDatoEnId("presupuesto", metodosGastos.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", metodosGastos.calcularTotalGastos());
    mostrarDatoEnId("balance-total", metodosGastos.calcularBalance());
    document.getElementById("listado-gastos-completo").innerHTML = "";
    metodosGastos.listarGastos().forEach(g => {
        mostrarGastoWeb("listado-gastos-completo", g);
    });
}

function actualizarPresupuestoWeb(){
    let respuesta = prompt ("Introdue un nuevo presupuesto:");
    metodosGastos.actualizarPresupuesto(parseInt(respuesta));
    repintar();
}

function nuevoGastoWeb(){
    let descr = prompt("Introduce la descripción del gasto:");
    let val = prompt("Introdue el valor del gasto: ");
    let fech = prompt ("Introduce la fecha del asto (yyyy-mm-dd): ");
    let etiq = prompt ("Introduce las etiquetas del asto separadas por ',': ");
    let gasto = metodosGastos.CrearGasto(descr,parseFloat(val), fech);
    let etiquetas = new Array();
    etiquetas = etiq.split(",");
    etiquetas.forEach(e => {
        gasto.anyadirEtiquetas(e);
    });
    metodosGastos.anyadirGasto(gasto);
    repintar();
}

function EditarHandle(gastoEditar){
    let handler = {
        gasto : gastoEditar
    }

    handler.handleEvent = function(){
        let descr = prompt("Introduce la descripción del gasto:", handler.gasto.descripcion);
        let val = prompt("Introdue el valor del gasto: ", handler.gasto.valor);
        let fech = prompt ("Introduce la fecha del asto (yyyy-mm-dd): ", handler.gasto.fecha);
        let etiq = prompt ("Introduce las etiquetas del asto separadas por ',': ");
        handler.gasto.actualizarDescripcion(descr);
        handler.gasto.actualizarValor(parseFloat(val));
        handler.gasto.actualizarFecha(fech);
        let etiquetas = new Array();
            etiquetas = etiq.split(",");
            etiquetas.forEach(e => {
                handler.gasto.anyadirEtiquetas(e);
            });
        repintar();
    }
    return handler;

}

function BorrarHandle(gastoBorrar){
    let handler={
        gasto : gastoBorrar
    }
    handler.handleEvent = function(){
        metodosGastos.borrarGasto(handler.gasto.id);
        repintar();
    }
    return handler;
}

function BorrarEtiquetasHandle(gastoEtiquetas, etiquetaEditar){
    let handler={
        gasto : gastoEtiquetas,
        etiqueta : etiquetaEditar
    }
    handler.handleEvent = function(){
        handler.gasto.borrarEtiquetas(handler.etiqueta);
        repintar();
    }
    return handler;
}


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