import * as metodosGastos from "./gestionPresupuesto.js"


function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML += valor;
}

function mostrarGastoWeb(idElemento, gasto){
    let elemento = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className += "gasto";

    let divGastoDesc = document.createElement("div");
    divGastoDesc.className += "gasto-descripcion";
    divGastoDesc.textContent = gasto.descripcion;

    let divGastoFecha = document.createElement("div");
    divGastoFecha.className += "gasto-fecha";
    divGastoFecha.textContent = new Date(gasto.fecha).toLocaleDateString();

    let divGastoValor = document.createElement("div");
    divGastoValor.className += "gasto-valor";
    divGastoValor.textContent = gasto.valor;

    let divGastoEtiquetas = document.createElement("div");
    divGastoEtiquetas.className += "gasto-etiquetas";

    elemento.append(divGasto);
    divGasto.append(divGastoDesc);
    divGasto.append(divGastoFecha);
    divGasto.append(divGastoValor);
    

    gasto.etiquetas.forEach(e => {
        let divEtiqueta = document.createElement("span");
        divEtiqueta.className += "gasto-etiquetas-etiqueta";
        divEtiqueta.textContent = e + " ";
        if(idElemento == "listado-gastos-completo"){
            divEtiqueta.addEventListener("click", BorrarEtiquetasHandle(gasto, e).handleEvent);
        }
        divGastoEtiquetas.append(divEtiqueta);
    });  

    divGasto.append(divGastoEtiquetas);

    let btnEditar = document.createElement("button");
    btnEditar.className = "gasto-editar";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", EditarHandle(gasto).handleEvent);
    
    let btnBorrar = document.createElement("button");
    btnBorrar.className = "gasto-borrar";
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", BorrarHandle(gasto).handleEvent);

    if(idElemento == "listado-gastos-completo"){
        divGasto.append(btnEditar);
        divGasto.append(btnBorrar);
    }
    
    
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

    document.getElementById("listado-gastos-filtrado-1").innerHTML="";
    metodosGastos.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}).forEach(gf => {
        mostrarGastoWeb("listado-gastos-filtrado-1",gf);
    });

    document.getElementById("listado-gastos-filtrado-2").innerHTML = "";
    metodosGastos.filtrarGastos({valorMinimo: 50}).forEach(gf => {
        mostrarGastoWeb("listado-gastos-filtrado-2", gf);
    });

    document.getElementById("listado-gastos-filtrado-3").innerHTML = "";
    metodosGastos.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]}).forEach(gf => {
        mostrarGastoWeb("listado-gastos-filtrado-3", gf);
    });

    document.getElementById("listado-gastos-filtrado-4").innerHTML = "";
    metodosGastos.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida" , "transporte"]}).forEach(gf => {
        mostrarGastoWeb("listado-gastos-filtrado-4", gf);
    });

    document.getElementById("agrupacion-dia").innerHTML="";
    mostrarGastosAgrupadosWeb("agrupacion-dia", metodosGastos.agruparGastos("dia"), "día");

    document.getElementById("agrupacion-mes").innerHTML = "";
    mostrarGastosAgrupadosWeb("agrupacion-mes", metodosGastos.agruparGastos("mes"), "mes");

    document.getElementById("agrupacion-anyo").innerHTML = "";
    mostrarGastosAgrupadosWeb("agrupacion-anyo", metodosGastos.agruparGastos("anyo"), "año");

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
    let etiquetas = new Array();
    etiquetas = etiq.split(",");
    let gasto = metodosGastos.CrearGasto(descr,parseFloat(val), fech, ...etiquetas);
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