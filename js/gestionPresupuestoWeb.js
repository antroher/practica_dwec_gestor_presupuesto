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
        let borrarEtiquetas = new BorrarEtiquetasHandle();
        borrarEtiquetas.gasto = gasto;
        borrarEtiquetas.etiqueta = e;

        let divEtiqueta = document.createElement("span");
        divEtiqueta.className += "gasto-etiquetas-etiqueta";
        divEtiqueta.textContent = e + " ";
        if(idElemento == "listado-gastos-completo"){
            divEtiqueta.addEventListener("click", borrarEtiquetas);
        }
        divGastoEtiquetas.append(divEtiqueta);
    });  

    divGasto.append(divGastoEtiquetas);
    let editarHandler = new EditarHandle();
    editarHandler.gasto = gasto;

    let btnEditar = document.createElement("button");
    btnEditar.className = "gasto-editar";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", editarHandler);
    
    let borrarHandler = new BorrarHandle();
    borrarHandler.gasto = gasto;

    let btnBorrar = document.createElement("button");
    btnBorrar.className = "gasto-borrar";
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", borrarHandler);

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
    document.getElementById("controlesprincipales").removeChild(formulario);
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
    let gasto = new metodosGastos.CrearGasto(descr,parseFloat(val), fech, ...etiquetas);
    metodosGastos.anyadirGasto(gasto);
    repintar();
}

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector("form");
    let boton = document.getElementById("anyadirgasto-formulario");
    boton.disabled = true;
    document.getElementById("controlesprincipales").append(formulario);

    formulario.addEventListener("submit",this.handleEvent = function(event){
        if(!event.defaultPrevented()){
            let descForm = formulario.elements.descripcion;
            let valForm = formulario.elements.valor;
            let fechForm = formulario.elements.fecha;
            let etForm = formulario.elements.etiquetas;
            let etiqForm = new Array();
            etiqForm = etForm.value.split(",");
            let gastoForm = new metodosGastos.CrearGasto(descForm.value,parseFloat(valForm.value), fechForm.value, ...etiqForm);
            metodosGastos.anyadirGasto(gastoForm);
            boton.disabled = false;
            repintar();
            
        }
       
        
    })
    
    
}


function EditarHandle(){

    this.handleEvent = function(){
        let descr = prompt("Introduce la descripción del gasto:", this.gasto.descripcion);
        let val = prompt("Introdue el valor del gasto: ", this.gasto.valor);
        let fech = prompt ("Introduce la fecha del asto (yyyy-mm-dd): ", this.gasto.fecha);
        let etiq = prompt ("Introduce las etiquetas del asto separadas por ',': ");
        this.gasto.actualizarDescripcion(descr);
        this.gasto.actualizarValor(parseFloat(val));
        this.gasto.actualizarFecha(fech);
        let etiquetas = new Array();
            etiquetas = etiq.split(",");
            etiquetas.forEach(e => {
                this.gasto.anyadirEtiquetas(e);
            });
        repintar();
    };

}

function EditarHandleFormulario(){

    this.handleEvent = function(){

    }
}


function BorrarHandle(){
    
    this.handleEvent = function(){
        metodosGastos.borrarGasto(this.gasto.id);
        repintar();
    };
    
}

function BorrarEtiquetasHandle(){
    
    this.handleEvent = function(){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    nuevoGastoWebFormulario,
    EditarHandleFormulario
}