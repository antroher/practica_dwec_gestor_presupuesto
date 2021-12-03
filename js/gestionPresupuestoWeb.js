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

   //div.class gasto
   let divG = document.createElement("div");
   divG.className += "gasto";
   elem.append(divG);

   //div.class gasto-descripcion
   let divGD = document.createElement("div");
   divGD.className += "gasto-descripcion";
   divGD.textContent = gasto.descripcion;
   divG.append(divGD);

   //div.class gasto-fecha
   let divGF = document.createElement("div");
   divGF.className += "gasto-fecha";
   divGF.textContent = new Date(gasto.fecha).toLocaleDateString();
   divG.append(divGF);

   //div.class gasto-valor
   let divGV = document.createElement("div");
   divGV.className += "gasto-valor";
   divGV.textContent = gasto.valor;
   divG.append(divGV)

   //div.class gasto-etiquetas
   let divGE = document.createElement("div");
   divGE.className += "gasto-etiquetas";


   gasto.etiquetas.forEach(item => {
       let borrarEtiquetas = new BorrarEtiquetasHandle();
       borrarEtiquetas.gasto = gasto;
       borrarEtiquetas.etiqueta = item;

       let span = document.createElement("span");
       span.className += "gasto-etiquetas-etiqueta";
       span.textContent = item + " ";
       if(idElemento === "listado-gastos-completo"){
           //evento click borrarEtiquetas
           span.addEventListener("click", borrarEtiquetas);
       }
       divGE.append(span);
   });  
   divG.append(divGE);

   //botones formulario
       //btn.class gasto-editar
   let btnEditar2 = document.createElement("button");
   btnEditar2.className = "gasto-editar";
   btnEditar2.textContent = "Editar";
       //btn.class gasto-borrar
   let btnBorrar2 = document.createElement("button");
   btnBorrar2.className = "gasto-borrar";
   btnBorrar2.textContent = "Borrar";


   //botones gasto-editar , gasto-borrar y gasto-editar-formulario

       //obj editarHandler
   let editarHandler = new EditarHandle();
   editarHandler.gasto = gasto;
       //btn.class gasto-editar
   let btnEditar = document.createElement("button");
   btnEditar.className = "gasto-editar";
   btnEditar.textContent = "Editar";
   btnEditar.addEventListener("click", editarHandler);//evento

       //obj borrarHandler
   let borrarHandler = new BorrarHandle();
   borrarHandler.gasto = gasto;
       //btn.class gasto-borrar
   let btnBorrar = document.createElement("button");
   btnBorrar.className = "gasto-borrar";
   btnBorrar.textContent = "Borrar";
   btnBorrar.addEventListener("click", borrarHandler);//evento

       //obj editarHandler
   let editarHandlerForm = new EditarFormHandle();
   editarHandlerForm.gasto = gasto;
       //boton.class gasto-editar-formulario
   let btnEditarF = document.createElement('button');
   btnEditarF.className = 'gasto-editar-formulario';
   btnEditarF.textContent = 'Editar (formulario)';
   btnEditarF.addEventListener('click',editarHandlerForm);

   if(idElemento === "listado-gastos-completo"){
       divG.append(btnEditar);
       divG.append(btnBorrar);
       divG.append(btnEditarF);
   } 


}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    /*Hago el primer bloque de html que no va a cambiar ------------------*/
    let string1 = `<div class="agrupacion">
                        <h1>Gastos agrupados por ${periodo}</h1>`
    
    //Sacamos cada gasto agrupado y lo añadimos a la cadena de texto.
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

    //Ejercicio Formulario----------------------------------------------------

    function nuevoGastoWebFormulario(){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true); //clonar plantilla (template)
        let formulario = plantillaFormulario.querySelector("form"); //extraer el form de la plantilla (template) a una variable
        //Desacivar btn
        document.getElementById('anyadirgasto-formulario').setAttribute('disabled', '');
    
        //Añadir plantilla como ultimo hijo
        document.getElementById('controlesprincipales').append(formulario);
    
        //evento btn enviar
        formulario.addEventListener('submit', new EnviarFormHandle());
    
        //evento btn cancelar
        formulario.querySelector("button.cancelar").addEventListener('click',new CancelarFormHandle());
    
    
    }

    document.getElementById('anyadirgasto-formulario').addEventListener('click', nuevoGastoWebFormulario)

    
    function CancelarFormHandle(){
        this.handleEvent = function(event){
    //ELIMINAR EL FORMULARIO QUE HEMOS SACADO PARA EDITAR UN GASTO.-----------------------------------
            event.currentTarget.parentNode.remove();
            //DESHABLITAR EL BOTÓN PARA AÑADIR FORMULARIOS.---------------------------
            document.getElementById("anyadirgasto-formulario").removeAttribute('disabled');
    //ACTUALIZAMOS LA INFORMACIÓN CON REPINTAR------------------------------------------
            repintar();
        }
    }

    function EditarFormHandle(){
        this.handleEvent=function(event){
            let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true); //clonar plantilla (template)
            let formulario = plantillaFormulario.querySelector("form"); //extraer el form de la plantilla (template) a una variable
    
            formulario.descripcion.value = this.gasto.descripcion;
            formulario.valor.value = parseFloat(this.gasto.valor);
            formulario.fecha.value = new Date(this.gasto.fecha).toString().substr(0,10);//.toISOString?
            formulario.etiquetas.value = this.gasto.etiquetas;
    
            event.currentTarget.append(formulario);
            event.currentTarget.setAttribute('disabled', '');
    
            //evento btn enviar
            let objBtnEnviar = new EnviarHandle();
            objBtnEnviar.gasto = this.gasto;
            formulario.addEventListener('submit',objBtnEnviar);
    
            //evento btn cancelar
            let objBtnCancelar = new CancelarFormHandle();
            formulario.querySelector("button.cancelar").addEventListener('click',objBtnCancelar);
        }
    }
    
    function EnviarFormHandle(){

        this.handleEvent = function(event){
    
            event.preventDefault();
    
            let form = event.currentTarget;
            
            let desc = form.descripcion.value;
            let val = parseFloat(form.valor.value);
            let fech = form.fecha.value;
            let etiq = form.etiquetas.value;
                etiq = etiq.split(', ');
    
            let gasto = new gestionPresupuesto.CrearGasto(desc, val, fech, etiq);
    
            gestionPresupuesto.anyadirGasto(gasto);
    
            document.getElementById('anyadirgasto-formulario').removeAttribute('disabled');
            form.remove();
    
            repintar();
        }
    }


    //HANDLE PARA EL BOTÓN DE ARRIBA AÑADIR GASTO (FORMULARIO).
    function EnviarHandle(){
        this.handleEvent=function(event){
            event.preventDefault();
    //SLECCIONO EL FORMULARIO
            let form = event.currentTarget;
    //ASIGNO CADA PROPIEDAD DEL FORMULARIO CON FORM.NOMBREPROPIEDAD  Y LO VOY ACTUALIZANDO EL GASTO SELECCIONADO
            this.gasto.actualizarDescripcion(form.descripcion.value);
            this.gasto.actualizarValor(parseFloat(form.valor.value));
            this.gasto.actualizarFecha(form.fecha.value);
            this.gasto.anyadirEtiquetas(form.etiquetas.value.split(', '));
    //REPINTO EL GASTO CON LOS NUEVOS DATOS
            repintar();
        }
    }


    function EditarHandle (){
        this.handleEvent = function(event){
            let desc = prompt('Escriba la descripción del nuevo gasto');
            let val = parseFloat(prompt('Escriba el valor del nuevo gasto'));
            let fech = new Date(prompt('Escriba la fecha del nuevo gasto')).toLocaleDateString();
            let etiq = prompt('Escriba las etiquetas (seguidas por coma) del nuevo gasto');
                etiq = etiq.split(', ');
            
            this.gasto.actualizarValor(val);
            this.gasto.actualizarDescripcion(desc);
            this.gasto.actualizarFecha(fech);
            this.gasto.anyadirEtiquetas(etiq);
    
            repintar();
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

//Ejercicio 7----------
function filtrarGastosWeb(){

    this.handleEvent = function(event){

        event.preventDefault();

        let des = document.getElementById("formulario-filtrado-descripcion").value;
        let vMin = parseFloat(document.getElementById("formulario-filtrado-valor-minimo").value);
        let vMax = parseFloat(document.getElementById("formulario-filtrado-valor-maximo").value);
        let fecDes = document.getElementById("formulario-filtrado-fecha-desde").value;
        let fecHas = document.getElementById("formulario-filtrado-fecha-hasta").value;
        let etiTiene = document.getElementById("formulario-filtrado-etiquetas-tiene").value;
        let filtro = {};

        if (etiTiene.length > 0){
            filtro.etiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(etiTiene);
        }
        filtro.fechaDesde = fecDes;
        filtro.fechaHasta = fecHas;
        filtro.valorMinimo = vMin;
        filtro.valorMaximo = vMax;
        filtro.descripcionContiene = des;

        document.getElementById("listado-gastos-completo").innerHTML="";
        let objsFiltrGastos = gestionPresupuesto.filtrarGastos(filtro);

        for (let gasto of objsFiltrGastos){
            mostrarGastoWeb('listado-gastos-completo', gasto);
        }

    }

}
document.getElementById('formulario-filtrado').addEventListener("submit", new filtrarGastosWeb());

function guardarGastosWeb(){

    this.handleEvent = function(event){

        localStorage.setItem('GestorGastosDWEC', JSON.stringify(gestionPresupuesto.listarGastos()));
        //localStorage.GestorGastosDWEC = JSON.stringify(gestionPresupuesto.listarGastos());

    }

}

document.getElementById('guardar-gastos').addEventListener('click', new guardarGastosWeb);

function cargarGastosWeb(){

    this.handleEvent = function(event){

        let txt = JSON.parse(localStorage.getItem('GestorGastosDWEC'));
        if (txt !== null){
            if (txt.length >= 0)
            gestionPresupuesto.cargarGastos(txt);
        }
        else{
            gestionPresupuesto.cargarGastos([]);
        }
        repintar();
    }
}

document.getElementById('cargar-gastos').addEventListener('click', new cargarGastosWeb);


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
    BorrarEtiquetasHandle,
    filtrarGastosWeb
}
