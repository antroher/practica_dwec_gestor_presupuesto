import * as gestionPresupuesto from './gestionPresupuesto.js';

//Para iterar sobre un collection del node usar for...of
function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elemento.appendChild(p);
}

//aqui gasto es un array, con lo que habria que cambiarlo y meterlo todo dentro de una iteracción
function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento);
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    elemento.append(divGasto);
        
    divGasto.innerHTML += 
    `
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${gasto.fecha}</div> 
        <div class="gasto-valor">${gasto.valor}</div> 
    `;
                        
    let gastoEtiquetas = document.createElement("div");
    gastoEtiquetas.className = "gasto-etiquetas";
    divGasto.append(gastoEtiquetas);

    for (let etiq of gasto.etiquetas) {
        //Creación del objeto para Borrar Etiquetas
        let nuevoObjEtiqueta = new BorrarEtiquetasHandle(); 
        nuevoObjEtiqueta.gasto = gasto;

        //Creación de la etiqueta
        let gastoEtiqueta = document.createElement("span");
        gastoEtiqueta.className = "gasto-etiquetas-etiqueta";
        gastoEtiqueta.innerHTML = etiq + "<br>";
        nuevoObjEtiqueta.etiqueta = etiq;

        //Adjuntamos la etiqueta al div gasto-etiquetas
        gastoEtiquetas.append(gastoEtiqueta);

        //Creamos el manador para la etiqueta
        gastoEtiqueta.addEventListener('click',nuevoObjEtiqueta);
    }

    let buttonEdit = document.createElement("button");
                        buttonEdit.className += 'gasto-editar'
                        buttonEdit.textContent = "Editar";
                        buttonEdit.type = 'button';

    let buttonBorr = document.createElement("button");
                        buttonBorr.className += 'gasto-borrar'
                        buttonBorr.textContent = "Borrar";
                        buttonBorr.type = 'button';

    let edit = new EditarHandle();
    let delet = new BorrarHandle();
    edit.gasto = gasto;
    delet.gasto = gasto;
    
    buttonEdit.addEventListener('click', edit);
    buttonBorr.addEventListener('click', delet);
  
    
    divGasto.append(buttonEdit);
    divGasto.append(buttonBorr);


    //Práctica 6:
    let btnEditGastoForm = document.createElement("button");
                            btnEditGastoForm.className += 'gasto-editar-formulario';
                            btnEditGastoForm.textContent = 'Editar (formulario)';
                            btnEditGastoForm.type = 'button';

    let editForm = new EditarHandleformulario();
    editForm.gasto = gasto;
    //Creamos el manejador de eventos de editar el formulario
    btnEditGastoForm.addEventListener('click', editForm);
    //adjuntamos al botón a la estructura HTML
    divGasto.append(btnEditGastoForm);  
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const elemento = document.getElementById(idElemento);
    let data = ""
    for (let [key, value] of Object.entries(agrup)) {
        data += `
        <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${key}</span>
            <span class="agrupacion-dato-valor">${value}</span>
        </div>`
    };
    elemento.innerHTML += 
    `
    <div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${data}
    `
}

function repintar() {
    let mostrar = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId( "presupuesto",mostrar);
    
    let gastoTotal = gestionPresupuesto.calcularTotalGastos().toFixed(2);
    mostrarDatoEnId( "gastos-totales",gastoTotal);
    
    let balanceTotal = gestionPresupuesto.calcularBalance().toFixed(2);
    mostrarDatoEnId("balance-total",balanceTotal);
    
    let borrarDatos = document.getElementById("listado-gastos-completo").innerHTML = "";
    
    let listaGasto = gestionPresupuesto.listarGastos();
    for (const gasto of listaGasto) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function formatearFecha(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function actualizarPresupuestoWeb() {
    let presupuesto = parseFloat(prompt("Introduzca un presupuesto: "))
    gestionPresupuesto.actualizarPresupuesto(presupuesto);
    repintar();
}

function nuevoGastoWeb(){
    let descripcion = prompt("Escribe la descripción del gasto");
    let valor1 = parseFloat(prompt("Escribe el valor del gasto"));
    let fecha = prompt("Escribe la fecha del gasto en formato yyyy-mm-dd");
    let etiquetas = prompt("Escribe las etiquetas del gasto separadas por ,");
    let etiquetasArray= etiquetas.split(',');
    let gastoAnyadido = new gestionPresupuesto.CrearGasto(descripcion,valor1,fecha,...etiquetasArray);
    gestionPresupuesto.anyadirGasto(gastoAnyadido);
    repintar();
  }

/* https://stackoverflow.com/questions/2230992/javascript-creating-objects-based-on-a-prototype-without-using-new-constructo*/

function EditarHandle() {
    this.handleEvent = function (event){
        let descripcion = prompt("Escribe la nueva descripción del gasto");
        let valor1 = parseFloat(prompt("Escribe la nueva valor del gasto"));
        let fecha = prompt("Escribe la fecha del gasto en formato yyyy-mm-dd");
        let etiquetas = prompt("Escribe las etiquetas del gasto separadas por ,");
        let etiquetasArray = etiquetas.split(',');
        this.gasto.actualizarValor(valor1);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetasArray);
        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function (event){
      let number = this.gasto.id;
      gestionPresupuesto.borrarGasto(number);
      repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function (event){
    this.gasto.borrarEtiquetas(this.etiqueta);
    repintar();
   }
}

function nuevoGastoWebFormulario() {
    //Copia del formulario/template
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector("form");
    //Recogemos el evento submit
    //let buttonSubmit = formulario.getElementsByTagName("button")[0];

    //Evento para el submit del formulario
    formulario.addEventListener('submit', this.handleEvent = function(event) {
        event.preventDefault();
        let formularioSubmit = event.currentTarget;
        let descripcionForm = formularioSubmit.elements.descripcion.value;
        let valorForm = formularioSubmit.elements.valor.value;
        let fechaForm = formularioSubmit.elements.fecha.value;
        let etiquetasForm = formularioSubmit.elements.etiquetas.value;
        let newGastoForm = new gestionPresupuesto.CrearGasto(descripcionForm, valorForm, fechaForm, etiquetasForm);
        gestionPresupuesto.anyadirGasto(newGastoForm);
        repintar();
        let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    });
    //botón cancelar
    let cancelarObj = new CancelarFormHandle();
    console.log("Dentro de nuevoGastoWebFormulario" + formulario)
    cancelarObj.formulario = formulario;

    let btnCancelar = formulario.querySelector("button.cancelar");
    btnCancelar.addEventListener("click", cancelarObj);

    //Desactivar -añadir atributo disabled- al botón anyadirgasto-formulario
    let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");

    //Por último, añadir el fragmento de documento (variable plantillaFormulario) al final del <div id="controlesprincipales"> para que se muestre en la página.
    let divControlesPrincipales = document.getElementById("controlesprincipales").appendChild(plantillaFormulario);
}

//Manejador del evento cancelar del formulario
function CancelarFormHandle() {
    this.handleEvent = function (event){
        //¿Eliminamos el formulario?
    console.log("Dentro de CancelarFormHandle " + this.formulario)
       this.formulario.remove();
       let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}

function EditarFormHandle() {
    this.handleEvent = function (event){
        event.preventDefault();
        let formularioSubmit = event.currentTarget;
        let descripcionForm = formularioSubmit.elements.descripcion.value;
        let valorForm = formularioSubmit.elements.valor.value;
        let fechaForm = formularioSubmit.elements.fecha.value;
        let etiquetasForm = formularioSubmit.elements.etiquetas.value;
        let newGastoForm = new gestionPresupuesto.CrearGasto(descripcionForm, valorForm, fechaForm, etiquetasForm);
        gestionPresupuesto.anyadirGasto(newGastoForm);
        repintar();
        let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}

//Manejador del evento editar gasto formulario TODO
function EditarHandleformulario() {
    this.handleEvent = function (event){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
        var formulario = plantillaFormulario.querySelector("form");

        formulario.elements.descripcion.value  = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = this.gasto.fecha.toLocaleString();
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        //Evento para el submit del formulario
        let EditarFormHandle1 = new EditarFormHandle();
        EditarFormHandle1.gasto = this.gasto;
        formulario.addEventListener('submit', EditarFormHandle1);
        //botón cancelar
        let btnCancelar = formulario.querySelector("button.cancelar");
        let cancelarObj = new CancelarFormHandle();
        cancelarObj.formulario = this.formulario;
        btnCancelar.addEventListener("click", cancelarObj);

        //Desactivar -añadir atributo disabled- al botón anyadirgasto-formulario
        let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");

        //Por último, añadir el fragmento de documento (variable plantillaFormulario) al final del <div id="controlesprincipales"> para que se muestre en la página.
        let divControlesPrincipales = document.getElementById("controlesprincipales").appendChild(plantillaFormulario);
    }
}

//Botones
const actualizarpresupuesto = document.getElementById("actualizarpresupuesto");
const anyadirgasto = document.getElementById("anyadirgasto");
const anyadirgastoFirmulario = document.getElementById("anyadirgasto-formulario");

//Eventos
actualizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);
anyadirgasto.addEventListener('click', nuevoGastoWeb);
anyadirgastoFirmulario.addEventListener('click', nuevoGastoWebFormulario)


export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}