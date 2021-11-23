import * as GesPresu from "./gestionPresupuesto.js";

//Eventos
document.getElementById("actualizarpresupuesto").addEventListener('click', actualizarPresupuestoWeb);
// button.addEventListener("click",actualizarPresupuestoWeb) otra opción
document.getElementById("anyadirgasto").addEventListener("click",nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click",nuevoGastoWebFormulario);

function mostrarDatoEnId(idElemento,valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML = `<p>${valor}</p>`;  
}

function mostrarGastoWeb(idElemento,gastos){

    gastos.forEach((gasto) =>{
        let element = document.getElementById(idElemento);
        let elGasto = document.createElement("div");
        elGasto.className = "gasto";
        elGasto.setAttribute("id",`gasto-${gasto.id}`)
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

        let btnEditGastos = document.createElement("button");
        btnEditGastos.className += 'gasto-editar-formulario'
        btnEditGastos.textContent = "Editar(formulario)";
        btnEditGastos.type = 'button';
        btnEditGastos.setAttribute("id",`gasto-editar-formulario-${gasto.id}`);

        //Sepacion de gastos, me la ha enseñado javi xd ya que nadie me lo enseña jaja salu2

        let divSeparador = document.createElement('div');
        divSeparador.className = 'salto';
        divSeparador.textContent = "------------------------------"

        let editar = new EditarHandle();
        let borrar = new BorrarHandle();
        let editarform = new EditarHandleFormulario();

        editar.gasto = gasto;
        borrar.gasto = gasto;
        editarform.gasto = gasto;

        btnEdit.addEventListener('click',editar);
        btnBorrar.addEventListener('click',borrar);
        btnEditGastos.addEventListener('click',editarform);
        elGasto.append(btnEdit);
        elGasto.append(btnBorrar);
        elGasto.append(btnEditGastos);
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
    }}
function nuevoGastoWebFormulario(){
    let form = document.getElementById("formulario-template").content.cloneNode(true).querySelector("form");
    document.getElementById("controlesprincipales").append(form);

    //cancelar el botón una vez lo pulsamos
    document.getElementById("anyadirgasto-formulario").disabled = true;
    //evento boton enviar
    let submitEvent = new submitHandle();
    form.addEventListener('submit', submitEvent);
    //evento botón cancelar
    let cancelarEvent = new cancelarHandle();
    cancelarEvent.formulario = form;
    form.querySelector("button[class='cancelar']").addEventListener('click', cancelarEvent);
}

function submitHandle(){
    this.handleEvent = function(event) {
        //Prevenir el efecto por defecto del formulario.
        event.preventDefault();
    //ahora recoges datitos de tu formulario
    let descripcion = event.currentTarget.descripcion.value;
    let valor = parseFloat(event.currentTarget.valor.value);
    let fecha = event.currentTarget.fecha.value;
    let etiquetas = event.currentTarget.etiquetas.value;

    //separar las etiquetas si las hubiera
    if (typeof etiquetas !== 'undefined') {
        etiquetas = etiquetas.split(",");
    } 
    //Crear gasto con los datos que has recogido anteriormente
    let gasto = new GesPresu.CrearGasto(descripcion, valor, fecha, etiquetas);
    //y añadir el gasto
    GesPresu.anyadirGasto(gasto);
    repintar();
    //ahora borrar el formulario
    event.currentTarget.remove();
    //poner el botón de añadir los gastos otra vez
    document.getElementById("anyadirgasto-formulario").disabled = false;
}}
function cancelarHandle(){
    this.handleEvent = function(event){
        this.formulario.remove();
        //esto elimina el formulario
        //y añadimos el botón de añadir los gastos otra vez
        document.getElementById("anyadirgasto-formulario").disabled = false;
    }
}
function EditarHandleFormulario() {
    this.handleEvent = function(event) {
        //Clonación y creación del formulario por  el template "plantilla"
        let form = document.getElementById("formulario-template").content.cloneNode(true).querySelector("form");
        document.getElementById(`gasto-${this.gasto.id}`).append(form);//esto ahce que al hacerse el gasto poner gasto.0 o gasto.1 gasto + la id

        //Deshabilitar el boton de editar gasto.
        document.getElementById(`gasto-editar-formulario-${this.gasto.id}`).disabled = true;

        //Recogida y representación de datos del gasto en el formulario.
        form.descripcion.value = this.gasto.descripcion;
        form.valor.value = this.gasto.valor;

        //Recogida y representación de la fecha del gasto.
        let fecha = new Date(this.gasto.fecha);
        let fechaFormateda = fecha.toISOString().substring(0,10);
        form.fecha.value = fechaFormateda;

        //Recogida y representacion de las etiquetas del gasto.
        let etiquetaString = "";
        this.gasto.etiquetas.forEach((etiqueta, index) => {
            if (this.gasto.etiquetas.length - 1 === index) {
                etiquetaString += etiqueta;
            }
            else {
                etiquetaString += etiqueta + ", ";
            }
        });
        form.etiquetas.value = etiquetaString;

        //Creación del objeto manejador de eventos del boton cancelar.
        let cancelarEvent = new cancelarEditHandle();
        cancelarEvent.formulario = form;
        cancelarEvent.gasto = this.gasto;
        form.querySelector("button[class='cancelar']").addEventListener('click', cancelarEvent);

        //Creación del objeto manejador de eventos del boton enviar.
        let submitEvent = new submitEditHandle();
        submitEvent.gasto = this.gasto;
        form.addEventListener('submit', submitEvent);
}
function submitEditHandle () {
    this.handleEvent = function(event) {
        event.preventDefault();
        this.gasto.actualizarDescripcion(event.currentTarget.descripcion.value);
        this.gasto.actualizarValor(parseFloat(event.currentTarget.valor.value));
        this.gasto.actualizarFecha(event.currentTarget.fecha.value);
        let etiquetas = event.currentTarget.etiquetas.value;
        if (typeof etiquetas !== "undefined") {
            etiquetas = etiquetas.split(",");
        }
        this.gasto.etiquetas = etiquetas;

        repintar();
    }
}
function cancelarEditHandle () {
    this.handleEvent = function() {
        //Borrar formulario
        this.formulario.remove();

        //habilitar botón gasto
        document.getElementById(`gasto-editar-formulario-${this.gasto.id}`).disabled = false;
    }
}

}


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}