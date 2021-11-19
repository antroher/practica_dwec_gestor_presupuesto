import * as gestionPresupuesto from './gestionPresupuesto.js';
'use strict'

function mostrarDatoEnId(idElemento, valor) {

    let elem = document.getElementById(idElemento);
    let p = document.createElement('p');
    p.textContent = valor; // para modificar parte del texto del Dom, no meter codigo html nuevo
    elem.append(p); // añade un hijo al elemento que han pasado por ID
}

function mostrarGastoWeb(idElemento,gasto) {
   /* 
    let elemento = document.getElementById(idElemento);

    // creacrión elemento <div class="gasto">
    let divG = document.createElement('div');
    divG.className += 'gasto';
    elemento.append(divG);

    // <div class="gasto-descripcion">
    let divGD = document.createElement('div');
    divGD.className += 'gasto-descripcion';
    divGD.textContent += `${gasto.descripcion}`; // ==>  <div class="gasto-descripcion"> ${gasto.descripcion} </div>
    // <div class="gasto-fecha"
    let divGF = document.createElement('div');
    divGF.className = 'gasto-fecha';
    divGF.textContent = `${gasto.fecha}`;
    // <div class="gasto-valor">
    let divGV = document.createElement('div');
    divGV.className = 'gasto-valor';
    divGV.textContent = `${gasto.valor}`;
    // <div class="gasto-etiquetas">
    let divGE = document.createElement('div');
    divGE.className = 'gasto-etiquetas';

    divG.append(divGD);
    divG.append(divGF);
    divG.append(divGV);
    divG.append(divGE);

    for (let eti of gasto.etiquetas){
        //Creación del objeto para Borrar Etiquetas
        let nuevoObjEtiqueta = new BorrarEtiquetasHandle(); 
        nuevoObjEtiqueta.gasto = gasto;

        //Creación de la etiqueta
        let gastoEtiqueta = document.createElement("span");
        gastoEtiqueta.className = "gasto-etiquetas-etiqueta";
        gastoEtiqueta.innerHTML = eti + "<br>";
        nuevoObjEtiqueta.etiqueta = eti;

        //Adjuntamos la etiqueta al div gasto-etiquetas
        divGE.append(gastoEtiqueta);

        //Creamos el manejador para la etiqueta
        gastoEtiqueta.addEventListener('click',nuevoObjEtiqueta);
    }

    // Botón Editar
    let btnEditar = document.createElement('button');
    btnEditar.type = 'button';
    btnEditar.className = 'gasto-editar';
    btnEditar.textContent = 'Editar';

    // nuevo objeto a partir de la función constructora
    let editar = new EditarHandle();
    // propiedad 'gasto' del ojeto = gasto pasado por parámetro
    editar.gasto = gasto;

    // Manejador del evento 'click'
    btnEditar.addEventListener('click', edit);

    // Insertar botón en el DOM
    divG.append(btnEditar); */

    let elem = document.getElementById(idElemento);
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    elem.append(divGasto);

    /* Coloco el primer bloque de código html ya que este no va a variar ----------------------------------------------------------------------------.*/

    divGasto.innerHTML += `<div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${gasto.fecha}</div> 
        <div class="gasto-valor">${gasto.valor}</div> 
    `;

    let gastoEtiquetas = document.createElement("div");
    gastoEtiquetas.className = "gasto-etiquetas";
    divGasto.append(gastoEtiquetas);

    for (let etiq of gasto.etiquetas) {
        //Creación objeto  Borrar Etiquetas
        let nuevoObjEtiqueta = new BorrarEtiquetasHandle(); 
        nuevoObjEtiqueta.gasto = gasto;

        //Creación de la etiqueta
        let gastoEtiqueta = document.createElement("span");
        gastoEtiqueta.className = "gasto-etiquetas-etiqueta";
        gastoEtiqueta.innerHTML = etiq + " ";
        nuevoObjEtiqueta.etiqueta = etiq;

        //Adjuntamos la etiqueta al div gasto-etiquetas
        gastoEtiquetas.append(gastoEtiqueta);

        //Creamos el eventoClick para la etiqueta
        gastoEtiqueta.addEventListener('click',nuevoObjEtiqueta);
    }

    //Botón editar-----------------------------------------------------------------------------------
    let botonEditar = document.createElement("button");
    botonEditar.className += 'gasto-editar'
    botonEditar.textContent = "Editar";
    botonEditar.type = 'button';

    //Botón borrar---------------------------------------------------------------------------
    let botonBorrar = document.createElement("button");
    botonBorrar.className += 'gasto-borrar'
    botonBorrar.textContent = "Borrar";
    botonBorrar.type = 'button';

    //Creamos objetos editarHandle y borrarHandle para asignarle un parametro gasto con el valor del gasto actual---------------------------------------.
    let edit = new EditarHandle();
    let delet = new BorrarHandle();
    edit.gasto = gasto;
    delet.gasto = gasto;

    //Añadimos los eventos a los botones--------------------------------------------------------------------
    botonEditar.addEventListener('click', edit);
    botonBorrar.addEventListener('click', delet);

    //Que lo añada
    if(idElemento === "listado-gastos-completo"){
        divGasto.append(botonEditar);
        divGasto.append(botonBorrar);
    }
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo) {  // agrup = { "2021-09": 5, "2021-10": 39}

    let textoHTML =                                                         
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>`;

    for (let propiedad in agrup) {
        textoHTML +=`<div class="agrupacion-dato">
                        <span class="agrupacion-dato-clave">${propiedad}</span>
                        <span class="agrupacion-dato-valor">${agrup[propiedad]}</span>
                    </div>`;
    }
    textoHTML += "</div>"
    document.getElementById(idElemento).innerHTML = textoHTML;

/*  let elemento = document.getElementById(idElemento);

    let divAg = document.createElement('div');
    divAg.className += 'agrupacion';

    let h1 = document.createElement('h1');
    h1.textContent += `Gastos agrupado por ${periodo}`;

    let divAD, span1, span2;
    for (let propiedad in agrup) {
        divAD = document.createElement('div');
        divAD.className += 'agrupacion-dato';

        span1 = document.createElement('span');
        span1.className += 'agrupacion-dato-clave';
        span1.textContent += `${propiedad}`;

        span2 = document.createElement('span');
        span2.className += 'agrupacion-dato-valor';
        span2.textContent += `${agrup[propiedad]}`;

        divAg.append(divAD);
        divAD.append(span1);
        divAD.append(span2);
    }

    elemento.append(divAg);
    divAg.append(h1); */
}

function repintar() {
    // Mostrar presupuesto
    document.getElementById('presupuesto').innerHTML = " ";
    mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto());
    // Mostrar gastos totales
    document.getElementById('gastos-totales').innerHTML = " ";
    mostrarDatoEnId('gastos-totales',gestionPresupuesto.calcularTotalGastos().toFixed(2));
    // Mostrar balance total
    document.getElementById('balance-total').innerHTML = " ";
    mostrarDatoEnId('balance-total',gestionPresupuesto.calcularBalance().toFixed(2));
    // Borrar el contenito de #listado-gastos-completo
    document.getElementById('listado-gastos-completo').innerHTML = " ";
    // Mostrar listado de gastos
    for (let list of gestionPresupuesto.listarGastos()) {
        mostrarGastoWeb("listado-gastos-completo",list);
    }
}
// función manejadora de evento click de #actualizarpresupuesto
function actualizarPresupuestoWeb(){
    let nuevoPre = parseFloat(prompt("Introduce un nuevo presupuesto"));
    gestionPresupuesto.actualizarPresupuesto(nuevoPre);
    
    repintar();
}
// manejadora del evento click del boton anyadirgasto
function nuevoGastoWeb() {
/*
    let descripcion = prompt("Escribe la descripción del gasto");
    let valor1 = parseFloat(prompt("Escribe el valor del gasto"));
    let fecha = prompt("Escribe la fecha del gasto en formato yyyy-mm-dd");
    let etiquetas = prompt("Escribe las etiquetas del gasto separadas por ,");

    // todo convertir cadena de etiquetas separadas por comas a un array
    let etiquetasArray= etiquetas.split(',');
    let gastoAnyadido = new gestionPresupuesto.CrearGasto(descripcion,valor1,fecha,...etiquetasArray);

    gestionPresupuesto.anyadirGasto(gastoAnyadido);

    repintar(); */
    //Pedir al usuario la información necesaria para crear un nuevo gasto mediante sucesivas preguntas con prompt (por orden: descripción, valor, fecha y etiquetas). 
    
    //Descirpción del gasto.
    let gastoDesc = prompt('Introduce la descripción del gasto :');

    //Convertir el valor a número (recuerda que prompt siempre devuelve un string).
    let gastoValor = parseFloat(prompt('Introduce el valor del gasto :'));

    //Fecha del gasto.
    let gastoFecha =Date.parse(prompt('Introduce la fecha del gasto :'));

    //Etiquetas del gasto.
    let gastoEtiquetas = prompt('Introduce las etiquetas del gasto separadas por comas :');
    //Convertimos la cadena de texto con las etiquetas a un array para poder pasárselo a la función constructora crearGasto.
    let arrayEtiquetas = gastoEtiquetas.split(',');

    //Crear un nuevo gasto (función crearGasto). ¡Ojo con la manera de pasar el parámetro ~etiquetas~!
    let gastoWeb = new gestionPresupuesto.CrearGasto(gastoDesc,gastoValor,gastoFecha,arrayEtiquetas);

    //Añadir el gasto a la lista (función anyadirGasto).
    gestionPresupuesto.anyadirGasto(gastoWeb);

    //Llamar a la función repintar para que se muestre la lista con el nuevo gasto.
    repintar();
}

// FUNCIONES CONSTRUCTORAS manejadoras de eventos

// Función manejadora de eventos para editar un gasto --> Función Constructora
function EditarHandle() {
    this.handleEvent = function(event){
        let desc = prompt('Escriba la descripción del nuevo gasto');
        let val = parseFloat(prompt('Escriba el valor del nuevo gasto'));
        let fech = new Date(prompt('Escriba la fecha del nuevo gasto')).toLocaleDateString();
        let etiq = prompt('Escriba las etiquetas separadas por comas del nuevo gasto');
            etiq = etiq.split(', ');
        
        this.gasto.actualizarValor(val);
        this.gasto.actualizarDescripcion(desc);
        this.gasto.actualizarFecha(fech);
        this.gasto.anyadirEtiquetas(etiq);

        repintar();
    }
}
// Func. manejadora de eventos para borrar un gasto
function BorrarHandle() {
    this.handleEvent = function (event){
        
        //Borrar el gasto asociado. Para ello utilizará la función borrarGasto y como parámetro utilizará el id del gasto seleccionado, disponible en this.gasto.
        gestionPresupuesto.borrarGasto(this.gasto.id);
        //Llamar a la función repintar para que se muestre la lista actualizada de gastos.
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function(){
        //Borrar la etiqueta seleccionada del gasto asociado. Para ello utilizará la función borrarEtiquetas del gasto asociado (this.gasto) y como parámetro
        //utilizará la etiqueta seleccionada, disponible en this.etiqueta.  
        this.gasto.borrarEtiquetas(this.etiqueta);

        //Llamar a la función repintar para que se muestre la lista actualizada de gastos.
        repintar();
   }
}
//Botones
let btnActualizar = document.getElementById('actualizarpresupuesto');
let btnAnyadirgasto = document.getElementById('anyadirgasto');
// const anyadirgastoFirmulario = document.getElementById("anyadirgasto-formulario");

//Eventos
btnActualizar.addEventListener('click', actualizarPresupuestoWeb);
btnAnyadirgasto.addEventListener('click', nuevoGastoWeb);
// anyadirgastoFirmulario.addEventListener('click', nuevoGastoWebFormulario)

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb,
    EditarHandle,
    nuevoGastoWeb,
    repintar,
    BorrarHandle,
    BorrarEtiquetasHandle
}