import * as GesPresu from "./gestionPresupuesto.js";

//Eventos
document.getElementById("actualizarpresupuesto").addEventListener('click', actualizarPresupuestoWeb);
// button.addEventListener("click",actualizarPresupuestoWeb) otra opción
document.getElementById("anyadirgasto").addEventListener("click",nuevoGastoWeb);

function mostrarDatoEnId(idElemento,valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML = `<p>${valor}</p>`;  
}

function mostrarGastoWeb(idElemento,gastos){
    let elemento = document.getElementById(idElemento);

    gastos.forEach((gasto) => {
        let etiquetas = "";
        let IdTag = [];
        let arrayEti = [];

        gasto.etiquetas.forEach((etiqueta) => {
            etiquetas +=
            `<span class="gasto-etiquetas-etiqueta" id ="${gasto.id}-${etiqueta}">
                ${etiqueta}
            </span>`;
            
            // recoger el id y la etiqueta que se borra para utilizarla luego
            IdTag.push(`${gasto.id}-${etiqueta}`);
            arrayEti.push(`${etiqueta}`);
        });

        elemento.innerHTML += 
        `<div class="gasto">
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${gasto.fecha}</div> 
        <div class="gasto-valor">${gasto.valor}</div> 
        <div class="gasto-etiquetas">
            ${etiquetas}
        </div> 
            <button class="gasto-editar" id="gasto-editar-${gasto.id}" type="button">Editar</button>
            <button class="gasto-borrar" id="gasto-borrar-${gasto.id}" type="button">Borrar</button>
        </div>`;
        
        let editHandler = new EditarHandle();
        editHandler.gasto = gasto;
        document.getElementById(`gasto-editar-${gasto.id}`).addEventListener('click', editHandler);

        //Asignación del objeto manejador al boton de borrado.
        let deleteHandler = new BorrarHandle();
        deleteHandler.gasto = gasto;
        document.getElementById(`gasto-borrar-${gasto.id}`).addEventListener('click', deleteHandler);

            IdTag.forEach((tagId, index) => {
            let tagsHandler = new BorrarEtiquetasHandle();
            tagsHandler.gasto = gasto;
            tagsHandler.etiqueta = arrayEti[index];
            document.getElementById(tagId).addEventListener('click', tagsHandler);
        });
    });
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
}


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}