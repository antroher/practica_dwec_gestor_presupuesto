import * as genDatEst from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
    let Elemen = document.getElementById(idElemento);
    Elemen.innerHTML = valor;
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

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const Elemen = document.getElementById(idElemento);
    let datos = ""
    for (let [llave, val] of Object.entries(agrup)) {
        datos +=
            `<div class="agrupacion-dato">
          <span class="agrupacion-dato-clave">${llave}</span>
          <span class="agrupacion-dato-valor">${val}</span>
      </div>`
    };
    Elemen.innerHTML +=
        `<div class="agrupacion">
      <h1>Gastos agrupados por ${periodo}</h1>
      ${datos}
  `

}
function repintar() {
    document.getElementById("presupuesto").innerHTML="";
    document.getElementById("gastos-totales").innerHTML="";
    document.getElementById("balance-total").innerHTML="";
    mostrarDatoEnId("presupuesto", genDatEst.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", genDatEst.calcularTotalGastos());
    mostrarDatoEnId("balance-total", genDatEst.calcularBalance());
    document.getElementById("listado-gastos-completo").innerHTML = "";
    genDatEst.listarGastos().forEach(g => {
        mostrarGastoWeb("listado-gastos-completo", g);
    });
    document.getElementById("listado-gastos-filtrado-1").innerHTML="";
    genDatEst.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}).forEach(gf => {
        mostrarGastoWeb("listado-gastos-filtrado-1",gf);
    });

    document.getElementById("listado-gastos-filtrado-2").innerHTML = "";
    genDatEst.filtrarGastos({valorMinimo: 50}).forEach(gf => {
        mostrarGastoWeb("listado-gastos-filtrado-2", gf);
    });

    document.getElementById("listado-gastos-filtrado-3").innerHTML = "";
    genDatEst.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]}).forEach(gf => {
        mostrarGastoWeb("listado-gastos-filtrado-3", gf);
    });

    document.getElementById("listado-gastos-filtrado-4").innerHTML = "";
    genDatEst.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida" , "transporte"]}).forEach(gf => {
        mostrarGastoWeb("listado-gastos-filtrado-4", gf);
    });

    document.getElementById("agrupacion-dia").innerHTML="";
    mostrarGastosAgrupadosWeb("agrupacion-dia", genDatEst.agruparGastos("dia"), "día");

    document.getElementById("agrupacion-mes").innerHTML = "";
    mostrarGastosAgrupadosWeb("agrupacion-mes", genDatEst.agruparGastos("mes"), "mes");

    document.getElementById("agrupacion-anyo").innerHTML = "";
    mostrarGastosAgrupadosWeb("agrupacion-anyo", genDatEst.agruparGastos("anyo"), "año");

}
function actualizarPresupuestoWeb() {
    let conV = prompt("introduzca un presupuesto");
    genDatEst.actualizarPresupuesto(parseFloat(conV));
    repintar();
}
function nuevoGastoWeb() {
    let desc = prompt("introduce una descripción");
    let val = prompt("introduce un nuebo valor");
    let fech = prompt("introduce una nueva fecha");
    let eti = prompt("introduce nuevas etiquetas");
    let valu = parseFloat(val);
    let ArrEti = new Array();
        ArrEti = eti.split(",");
    let gast = new genDatEst.CrearGasto(desc, valu, fech, ...ArrEti);
    genDatEst.anyadirGasto(gast);
    repintar();
}
function EditarHandle() {
    this.handleEvent = function () {
        let desc = prompt("introduce una descripción");
        let val = prompt("introduce un nuebo valor");
        let fech = prompt("introduce una nueva fecha");
        let eti = prompt("introduce nuevas etiquetas");
        let valu = parseFloat(val);
        let ArrEti = eti.split(", ");
        this.gasto.descripcion = desc;
        this.gasto.valor = valu;
        this.gasto.fecha = fech;
        this.gasto.etiquetas = ArrEti;
        repintar();
    }
}
function BorrarHandle(Gasto) {

       this.gasto = Gasto 

    this.handleEvent = function() {
        genDatEst.borrarGasto(this.gasto.id);
        repintar();
    }
}
function BorrarEtiquetasHandle(){

    this.handleEvent = function(){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };

}
function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector("form");


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
    BorrarEtiquetasHandle,
    nuevoGastoWebFormulario
}