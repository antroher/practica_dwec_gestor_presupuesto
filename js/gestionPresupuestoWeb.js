import * as GesPresu from "./gestionPresupuesto.js";

//Eventos
document.getElementById("actualizarpresupuesto").addEventListener('click', actualizarPresupuestoWeb);
// button.addEventListener("click",actualizarPresupuestoWeb) otra opción
document.getElementById("anyadirgasto").addEventListener("click",nuevoGastoWeb);
// document.getElementById("anyadirgasto-formulario").addEventListener("click",anyadirGasto);//btono añador gasto

function mostrarDatoEnId(idElemento,valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML = `<p>${valor}</p>`;  
}

function mostrarGastoWeb(idElemento,gastos){

    gastos.forEach((gasto) =>{
        let element = document.getElementById(idElemento);
        let elGasto = document.createElement("div");
        elGasto.className = "gasto";
        element.append(elGasto);

        elGasto.innerHTML +=`
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${new Date(gasto.fecha).toLocaleString()}</div> 
        <div class="gasto-valor">${gasto.valor}</div>
         `

       let etiGasto = document.createElement("div")
       etiGasto.className = "gasto-etiquetas";
       elGasto.append(etiGasto);

       for(let etiqueta of gasto.etiquetas){
           let newEtiqueta = new BorrarEtiquetasHandle();
           newEtiqueta.gasto = gasto;

           let gastEtiqueta = document.createElement("span");
           gastEtiqueta.className = "gasto-etiquetas-etiqueta";
           gastEtiqueta.textContent = etiqueta + " ";
           newEtiqueta.etiqueta = etiqueta;
           etiGasto.append(gastEtiqueta);
           gastEtiqueta.addEventListener("click",newEtiqueta);
       }

       //Para que solo ponga el boton el listado de gastos
       if (idElemento === "listado-gastos-completo") {
        let btnEdit = document.createElement("button");
        btnEdit.className += 'gasto-editar'
        btnEdit.textContent = "Editar";
        btnEdit.type = 'button';

        let btnBorrar = document.createElement("button");
        btnBorrar.className += 'gasto-borrar'
        btnBorrar.textContent = "Borrar";
        btnBorrar.type = 'button';

        //Sepracion de gastos, me la ha enseñado un compañero

        let divSeparador = document.createElement('div');
        divSeparador.className = 'salto';
        divSeparador.textContent = "------------------------------"

        let editar = new EditarHandle();
        let borrar = new BorrarHandle();

        editar.gasto = gasto;
        borrar.gasto = gasto;

        btnEdit.addEventListener('click',editar);
        btnBorrar.addEventListener('click',borrar);
        elGasto.append(btnEdit);
        elGasto.append(btnBorrar);
        elGasto.append(divSeparador);
       }

    })
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let elemento = document.getElementById(idElemento);
    let gastos = [];
    
    for(let [propiedad,valor] of Object.entries(agrup)){
        gastos +=
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${propiedad}</span>
            <span class="agrupacion-dato-valor">${valor}</span>
        </div>`;
    }
    elemento.innerHTML += 
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${gastos}
    </div>`
}
function repintar(){
    mostrarDatoEnId("presupuesto",GesPresu.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales",GesPresu.calcularTotalGastos());
    mostrarDatoEnId("balance-total",GesPresu.calcularBalance());
    document.getElementById("listado-gastos-completo").innerHTML = "";//borra el listado-gastos-completos y lo cambia a string"vacio"
    mostrarGastoWeb("listado-gastos-completo",GesPresu.listarGastos());
}

function actualizarPresupuestoWeb()
{
    let prestu = parseFloat(prompt("Introduzca un presupuesto"));
    GesPresu.actualizarPresupuesto(prestu);   
    repintar();
}

function nuevoGastoWeb()
{       
    let descripcion = prompt("Ponga una nueva decripción al objeto");
    let valor = parseFloat(prompt("Ponga un nuevo valor al objeto"));
    let fecha = Date.parse(prompt("Ponga una nueva fecha"));
    let etiquetas = prompt("Ponga nuevas etiqeutas");

    let arrayetiquetas = etiquetas.split(",");
    let gasto = new GesPresu.CrearGasto(descripcion,valor,fecha,arrayetiquetas);
    GesPresu.anyadirGasto(gasto);
    repintar();
}

function EditarHandle(){
    this.handleEvent = function() {
        //Pedir al usuario que quiere cambiar
        let descripcion = prompt("Introduzca la descripción nueva: ");
        let valor = parseFloat(prompt("Introduzca el valor nuevo: "));
        let fecha = Date.parse(prompt("Introduzca la fecha nueva: "));

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);

        let etiquetas = prompt("Introduzca las nuevas etiquetas separadas por , : ");

        if(typeof etiquetas != "undefined" ) {
            this.gasto.anyadirEtiquetas(etiquetas.split(','))
        }

        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function() {
        //Borra gasto
        GesPresu.borrarGasto(this.gasto.id);

        repintar();
    }
 }

 function BorrarEtiquetasHandle() {
    this.handleEvent = function() {
        //Borra etiqueta
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector("form");
}
}


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}