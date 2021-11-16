'use strict';
import * as gestionPresupuesto from './gestionPresupuesto.js';


function mostrarDatoEnId(idElemento ,valor){
    
    /*
    let parrafo = document.createElement('p');
    parrafo.textContent = valor;
    elem.appendChild(parrafo); */

    let elem = document.getElementById(idElemento);
    elem.innerHTML += valor;

            
}

function mostrarGastoWeb(idElemento ,gasto){
 
    /* Coloco el primer bloque de código html ya que este no va a variar ----------------------------------------------------------------------------.
    let string1 = `<div class="gasto" id=${gasto.id} >
                            <div class="gasto-descripcion"> ${gasto.descripcion} </div>
                            <div class="gasto-fecha"> ${new Date(gasto.fecha).toLocaleDateString()} </div>
                            <div class="gasto-valor"> ${gasto.valor} </div>
                            <div class="gasto-etiquetas">`;


                        
    /*Recorro el array de etiquetas de cada gasto y las voy añadiendo mientras queden. -------------------------------------------
    console.log(gasto.etiquetas);
    gasto.etiquetas.forEach(etiq => {
            string1 += ` <span class="gasto-etiquetas-etiqueta"> ${etiq} </span> `;

    });
      
    string1 += `</div>
    <button class="gasto-editar" id=${gasto.id} type="button">Editar</button> 
    <button class="gasto-borrar" id=${gasto.id} type="button">Borrar</button>
    </div>`;//Añadir el botón al DOM a continuación de las etiquetas(btnEditar), Añadir el botón al DOM a continuación del botón Editar(btnBorrar).


    document.getElementById(idElemento).innerHTML += string1;
    
    let btnBorrar = document.getElementById(gasto.id);
    let objBorrar = new BorrarHandle();
    objBorrar.gasto=gasto;
    btnBorrar.addEventListener("click",objBorrar);
    let btnEditar = document.getElementById(gasto.id);
    let objEditar = new EditarHandle();
    objEditar.gasto=gasto;
    btnEditar.addEventListener("click",objEditar);
    for (let elem of gasto.etiquetas)
    {
        let btnBorrarEtiq = document.getElementById(gasto.id);
        let objBorrarEtiq = new EditarHandle();
        objBorrarEtiq.gasto=gasto;
        objBorrarEtiq.etiquetas=elem;
        btnBorrarEtiq.addEventListener("click",objBorrarEtiq);
    }
    */

    let elem = document.getElementById(idElemento);
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    elem.append(divGasto);

    /* Coloco el primer bloque de código html ya que este no va a variar ----------------------------------------------------------------------------.*/

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

    let edit = new EditarHandle();
    let delet = new BorrarHandle();
    edit.gasto = gasto;
    delet.gasto = gasto;

    botonEditar.addEventListener('click', edit);
    botonBorrar.addEventListener('click', delet);

    if(idElemento === "listado-gastos-completo"){
        divGasto.append(botonEditar);
        divGasto.append(botonBorrar);
    }


}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    /*Hago el primer bloque de html que no va a cambiar ------------------*/
    let string1 = `<div class="agrupacion">
                        <h1>Gastos agrupados por ${periodo}</h1>`
    
    for(let elem in agrup)
    {
        string1 += `<div class="agrupacion-dato">
                        <span class="agrupacion-dato-clave">${elem} </span>
                        <span class="agrupacion-dato-valor">${agrup[elem]}</span>
                        </div> `;
    }
    string1 += `</div>`;

    document.getElementById(idElemento).innerHTML += string1;
                 
}

function repintar()
{
    //Si no pongo esto de aquí bajo al añadir un gasto se me duplica la info del presupuesto
    document.getElementById("presupuesto").innerHTML = "";
    document.getElementById("gastos-totales").innerHTML = "";
    document.getElementById("balance-total").innerHTML = "";


    //1.- Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)------------------
    mostrarDatoEnId("presupuesto",gestionPresupuesto.mostrarPresupuesto());

    //2.-Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
    mostrarDatoEnId("gastos-totales",gestionPresupuesto.calcularTotalGastos());

    //3.-Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    //4.-Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información. Puedes utilizar innerHTML para borrar el contenido de dicha capa.
    document.getElementById("listado-gastos-completo").innerHTML = "";

    //5.-Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
    let gastos = gestionPresupuesto.listarGastos();
    for(let gast of gastos)   
        mostrarGastoWeb("listado-gastos-completo",gast);

    
}

function actualizarPresupuestoWeb()
{
    //Pedir al usuario un valor con prompt y convertirlo a número.
    let valorPedido = parseFloat(prompt("Introduce un presupuesto : "));

    //Actualizar presupuesto con el valor introducido convertido.
    gestionPresupuesto.actualizarPresupuesto(valorPedido);

    //Borramos lo que había antes de actualizarlo
    document.getElementById("presupuesto").innerHTML = "";
    document.getElementById("gastos-totales").innerHTML = "";
    document.getElementById("balance-total").innerHTML = "";

    //Llamar a la función repintar.
    repintar();

    
}
    //Una vez definida la función, se añadirá como manejadora del evento click del botón actualizarpresupuesto mediante addEventListener.
    //Para ello habrá que obtener el elemento botón correspondiente previamente.
    let elementoActu = document.getElementById("actualizarpresupuesto");
    elementoActu.addEventListener('click',actualizarPresupuestoWeb);

function nuevoGastoWeb ()
{
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

    //Una vez definida la función, se añadirá como manejadora del evento click del botón anyadirgasto mediante addEventListener. 
    //Para ello habrá que obtener el elemento botón correspondiente previamente.
    let elementoAnyadir = document.getElementById("anyadirgasto");
    elementoAnyadir.addEventListener('click',nuevoGastoWeb);


function EditarHandle(){
    this.handleEvent = function(e) {
        //Pedimos datos al usuario.
        let gastoDesc = prompt('Introduce la descripción del gasto :');
        let gastoValor = parseFloat(prompt('Introduce el valor del gasto :'));
        let gastoFecha =Date.parse(prompt('Introduce la fecha del gasto :'));
        let gastoEtiquetas = prompt('Introduce las etiquetas del gasto separadas por comas :');
        //Convertimos la cadena de texto con las etiquetas a un array para poder pasárselo a la función constructora crearGasto.
        let arrayEtiquetas = gastoEtiquetas.split(',');

        //Actualizar las propiedades del gasto (disponible mediante this.gasto), mediante las funciones actualizarValor, actualizarDescripcion, actualizarFecha y actualizarEtiquetas.
        this.gasto.actualizarDescripcion(gastoDesc);
        this.gasto.actualizarValor(gastoValor);
        this.gasto.actualizarFecha(gastoFecha);
        this.gasto.anyadirEtiquetas(arrayEtiquetas);
        
    }
}

function BorrarHandle(){
    this.handleEvent = function(){
        //Borrar el gasto asociado. Para ello utilizará la función borrarGasto y como parámetro utilizará el id del gasto seleccionado, disponible en this.gasto.
        gestionPresupuesto.borrarGasto(this.gasto.id);
        //Llamar a la función repintar para que se muestre la lista actualizada de gastos.
        repintar();
    }
}

function BorrarEtiquetasHandle()
{
    this.handleEvent = function(){
        //Borrar la etiqueta seleccionada del gasto asociado. Para ello utilizará la función borrarEtiquetas del gasto asociado (this.gasto) y como parámetro
        //utilizará la etiqueta seleccionada, disponible en this.etiqueta.  
        this.gasto.borrarEtiquetas(this.etiqueta);

        //Llamar a la función repintar para que se muestre la lista actualizada de gastos.
        repintar();
    }
}

/*Exportar las funciones necesarias.*/ 
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
