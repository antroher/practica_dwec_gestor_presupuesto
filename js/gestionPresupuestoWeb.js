"use strict";

import * as gestionPresupuesto from "./gestionPresupuesto.js";

document.getElementById("actualizarpresupuesto").addEventListener('click', actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener('click', nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);
document.getElementById("formulario-filtrado").addEventListener("submit", filtrarGastosWeb)

function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elemento.appendChild(p);
}

function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento);
    let divGasto = document.createElement("div");
    divGasto.className += "gasto";

    if (idElemento.includes('completo')) {
        divGasto.id = gasto.id;
    }
    let gastoDescripcion = document.createElement("div");
    gastoDescripcion.className += "gasto-descripcion";
    gastoDescripcion.textContent = `${gasto.descripcion}`;

    let gastoValor = document.createElement("div");
    gastoValor.className += "gasto-valor";
    gastoValor.textContent = `${gasto.valor}`;

    let gastoFecha = document.createElement("div");
    gastoFecha.className += "gasto-fecha";
    gastoFecha.textContent = `${gasto.fecha}`;

    let gastoEtiquetas = document.createElement("div");
    gastoEtiquetas.className += "gasto-etiquetas";

    for (let x of gasto.etiquetas) {
        let gastoEtiqueta = document.createElement("span");
        gastoEtiqueta.className += "gasto-etiquetas-etiqueta";
        gastoEtiqueta.textContent =`${x} `;
        gastoEtiquetas.append(gastoEtiqueta);
        if(idElemento.includes('completo'))
        {
          let newObjEtiquet = new BorrarEtiquetasHandle(); 
          newObjEtiquet.gasto = gasto;
          newObjEtiquet.etiqueta = x;
          gastoEtiqueta.addEventListener('click',newObjEtiquet);
        }
        
      }
    
      divGasto.append(gastoDescripcion, gastoValor, gastoFecha, gastoEtiquetas);
      elemento.append(divGasto);
      if(idElemento === 'listado-gastos-completo')
      {
        let botonEdit = document.createElement("button");
        botonEdit.className += "gasto-editar";
        botonEdit.textContent = 'Editar';
        botonEdit.type ='button';
        let botonBorr = document.createElement("button");
        botonBorr.className += "gasto-borrar";
        botonBorr.textContent = 'Borrar';
        botonBorr.type ='button';
    
        let evEditar = new EditarHandle();
        evEditar.gasto = gasto;
    
        let evBorrar = new BorrarHandle();
        evBorrar.gasto = gasto;
        botonBorr.addEventListener('click', evBorrar);
        botonEdit.addEventListener('click', evEditar);
        let gastoactual= document.getElementById(gasto.id);
        gastoactual.append(botonEdit, botonBorr); 
        
        
        let gastoActual = document.getElementById(gasto.id);; 
        let botonEditForm = document.createElement('button');
        botonEditForm.className += 'gasto-editar-formulario';
        botonEditForm.textContent = 'Editar (formulario)';
        botonEditForm.type = 'button';
        let evEditForm = new EditarHandleFormulario();
        evEditForm.gasto = gasto;
        botonEditForm.addEventListener('click', evEditForm); 
        gastoActual.append(botonEditForm);
      }
    }


    /* gastos.forEach((gasto) => {
        let gast = document.createElement("div");
        gast.className = "gasto";
        gast.setAttribute('id', `gasto-${gasto.id}`)
        elemento.append(gast);

        gast.innerHTML += `
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${new Date(gasto.fecha).toLocaleString()}</div> 
        <div class="gasto-valor">${gasto.valor}</div>
         `
        let EtiqGasto = document.createElement("div")
        EtiqGasto.className = "gasto-etiquetas";
        gast.append(EtiqGasto);

        for (let etiqueta of gasto.etiquetas) {
            let EtiquetaNueva = new BorrarEtiquetasHandle();
            EtiquetaNueva.gasto = gasto;
            let gastEtiqueta = document.createElement("span");
            gastEtiqueta.className = "gasto-etiquetas-etiqueta";
            gastEtiqueta.textContent = etiqueta + " ";
            EtiquetaNueva.etiqueta = etiqueta;
            EtiqGasto.append(gastEtiqueta);
            gastEtiqueta.addEventListener("click", EtiquetaNueva);
        }

        if (idElemento === "listado-gastos-completo") {
            let botonEditar = document.createElement("button");
            botonEditar.className += 'gasto-editar'
            botonEditar.textContent = "Editar";
            botonEditar.type = 'button';

            let botonBorrar = document.createElement("button");
            botonBorrar.className += 'gasto-borrar'
            botonBorrar.textContent = "Borrar";
            botonBorrar.type = 'button';
            let botonEditarForm = document.createElement("button");
            botonEditarForm.setAttribute('id', `gasto-editar-formulario-${gasto.id}`)
            botonEditarForm.className += 'gasto-editar-formulario';
            botonEditarForm.textContent = "Editar (formulario)";
            botonEditarForm.type = "button";

            let editarForm = new EditarHandleFormulario();
            editarForm.gasto = gasto;
            botonEditarForm.addEventListener('click', editarForm);
            let editar = new EditarHandle();
            let borrar = new BorrarHandle();
            editar.gasto = gasto;
            borrar.gasto = gasto;
            botonEditar.addEventListener('click', editar);
            botonBorrar.addEventListener('click', borrar);

            Gasto.append(botonEditar);
            Gasto.append(botonBorrar);
            Gasto.append(botonEditarForm);
        }
    }) */
//}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let elemento = document.getElementById(idElemento);
    let mensaje =
        "<div class='agrupacion'>\n" +
        "<h1>Gastos agrupados por " + periodo + "</h1>\n";

    for (let etiq in agrup) {
        mensaje +=
            "<div class='agrupacion-dato'>\n" +
            "<span class='agrupacion-dato-clave'>" + etiq + "</span>\n" +
            "<span class='agrupacion-dato-valor'>" + agrup[etiq] + "</span>\n" +
            "</div>\n";
    }
    mensaje += "</div>\n";
    elemento.innerHTML += mensaje;
}

function repintar() {
    document.getElementById('presupuesto').innerHTML = '';
    document.getElementById('balance-total').innerHTML = '';
    document.getElementById('gastos-totales').innerHTML = '';

    mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());

    document.getElementById('listado-gastos-completo').innerHTML = '';
    let lisgas = gestionPresupuesto.listarGastos();
    lisgas.forEach(exp => { mostrarGastoWeb('listado-gastos-completo', exp); });

    document.getElementById('listado-gastos-filtrado-1').innerHTML = '';
    let gastosFlt = gestionPresupuesto.filtrarGastos({ fechaDesde: '2021-09-01', fechaHasta: '2021-09-30' });

    gastosFlt.forEach(gastoFiltrado => { mostrarGastoWeb('listado-gastos-filtrado-1', gastoFiltrado); });
    document.getElementById('listado-gastos-filtrado-2').innerHTML = '';
    gastosFlt = gestionPresupuesto.filtrarGastos({ valorMinimo: 50 });
    gastosFlt.forEach(gastoFiltrado => { mostrarGastoWeb('listado-gastos-filtrado-2', gastoFiltrado); });
    document.getElementById('listado-gastos-filtrado-3').innerHTML = '';
    gastosFlt = gestionPresupuesto.filtrarGastos({ valorMinimo: 200, etiquetasTiene: ['seguros'] });
    gastosFlt.forEach(gastoFiltrado => { mostrarGastoWeb('listado-gastos-filtrado-3', gastoFiltrado); });
    document.getElementById('listado-gastos-filtrado-4').innerHTML = '';
    gastosFlt = gestionPresupuesto.filtrarGastos({ valorMaximo: 50, etiquetasTiene: ['comida', 'transporte'] });
    gastosFlt.forEach(gastoFiltrado => { mostrarGastoWeb('listado-gastos-filtrado-4', gastoFiltrado); });
}

function actualizarPresupuestoWeb() {
    let presupuesto = prompt('Introduce un presupuesto nuevo');

    presupuesto = parseInt(presupuesto);
    gestionPresupuesto.actualizarPresupuesto(presupuesto);

    repintar();
}

function nuevoGastoWeb() {
    let descripcion = prompt("Introduzca la descripción del nuevo gasto: ");
    let valor = parseFloat(prompt("Introduzca el valor del nuevo gasto: "));
    let fecha = Date.parse(prompt("Introduzca la fecha del nuevo gasto: "));
    let etiquetas = prompt("Introduzca las etiquetas del nuevo gasto separadas por , : ").split(', ');

    let g = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas);
    gestionPresupuesto.anyadirGasto(g);

    repintar();
}

function nuevoGastoWebFormulario() {
    document.getElementById("anyadirgasto-formulario").disabled = true;

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    let form = plantillaFormulario.querySelector("form");

    form.addEventListener("submit", this.handleEvent = function (evento) {
        evento.preventDefault();
        let descrip = form.elements.descripcion;
        let valor = form.elements.valor;
        let fecha = form.elements.fecha;
        let etiq = form.elements.etiquetas;
        etiq = etiq.value.split(",");
        let gasto = new gestionPresupuesto.CrearGasto(descrip.value, parseFloat(valor.value), fecha.value, ...etiq);
        gestionPresupuesto.anyadirGasto(gasto);
        document.getElementById("anyadirgasto-formulario").disabled = false;
        document.getElementById("controlesprincipales").removeChild(form);
        repintar();

    });
    document.getElementById("controlesprincipales").append(form);

    let btnCancelar = form.querySelector("button.cancelar");
    btnCancelar.addEventListener("click", this.handleEvent = function () {

        document.getElementById("anyadirgasto-formulario").disabled = false;
        document.getElementById("controlesprincipales").removeChild(form);
        repintar();

    });
}

function EditarHandle() {
    this.handleEvent = function (evento) {
        let descri = prompt("Introduce la descripción nueva: ", this.gasto.descripcion);
        let val = prompt("Introduce el valor nuevo: ", this.gasto.valor);
        let fech = prompt("Introduce la fecha nueva: ", this.gasto.fecha);
        let etiquet = prompt("Inroduce las etiquetas nuevas: ", this.gasto.etiquetas);
        val = parseFloat(val);
        etiquet = etiquet.split(',');
        this.gasto.actualizarDescripcion(descri);
        this.gasto.actualizarValor(val);
        this.gasto.actualizarFecha(fech);
        this.gasto.anyadirEtiquetas(...etiquet);
        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function () {
        let num = this.gasto.id;
        gestionPresupuesto.borrarGasto(num);
        repintar();
    };
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function () {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function EditarHandleFormulario() {
    this.handleEvent = function () {
        repintar();

        document.querySelector("button[id='anyadirgasto-formulario']").disabled = true;
        document.querySelector(`button[id='gasto-editar-formulario-${this.gasto.id}']`).disabled = true;

        let idElemento = document.querySelector(`[id='gasto-${this.gasto.id}']`);
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");
        idElemento.append(formulario);

        document.querySelector(`input[id='descripcion']`).value = this.gasto.descripcion;
        document.querySelector(`input[id='valor']`).value = this.gasto.valor;
        document.querySelector(`input[id='etiquetas']`).value = this.gasto.etiquetas;

        let fecha = new Date(this.gasto.fecha);
        let fechaFormato = fecha.toISOString().substring(0, 10);
        document.querySelector(`input[id='fecha']`).value = fechaFormato;

        let EventBotonCancelar = new cancelarFromHandle();
        EventBotonCancelar.formulario = formulario;
        formulario.querySelector(`button[class='cancelar']`).addEventListener('click', EventBotonCancelar);

        let EventBotonSubmit = new submitFormGastoHandle();
        EventBotonSubmit.formulario = formulario;
        EventBotonSubmit.gasto = this.gasto;
        formulario.addEventListener('submit', EventBotonSubmit);
    }
}

function filtrarGastosWeb() {
    event.preventDefault();

    let formulario = document.getElementById("formulario-filtrado");
    let filDescrip = formulario.elements["formulario-filtrado-descripcion"].value;
    let filMin = formulario.elements["formulario-filtrado-valor-minimo"].value;
    let filMax = formulario.elements["formulario-filtrado-valor-maximo"].value;
    let filFecha = formulario.elements["formulario-filtrado-fecha-desde"].value;
    let filHastaFecha = formulario.elements["formulario-filtrado-fecha-hasta"].value;
    let filEtiquetas = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;

    let filtrarParametros = {
        descripcionContiene: (filDescrip === "") ? undefined : filDescrip,
        valorMinimo: (filMin === "") ? undefined : parseFloat(filMin),
        valorMaximo: (filMax === "") ? undefined : parseFloat(filMax),
        fechaDesde: (filFecha === "") ? undefined : filFecha,
        fechaHasta: (filHastaFecha === "") ? undefined : filHastaFecha,
        etiquetasTiene: (filEtiquetas === "") ? [] : gestionPresupuesto.transformarListadoEtiquetas(filEtiquetas)
    }
    console.log(filtrarParametros)

    let gastosFiltrados = gestionPresupuesto.filtrarGastos(filtrarParametros);
    document.getElementById("listado-gastos-completo").innerHTML = "";
    mostrarGastoWeb("listado-gastos-completo", gastosFiltrados);

    document.getElementById("formulario-filtrado").addEventListener("submit", filtrarGastosWeb);
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}