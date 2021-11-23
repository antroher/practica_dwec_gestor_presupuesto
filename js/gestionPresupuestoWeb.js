"use strict"

import * as GesPresu from "./gestionPresupuesto.js";
//Botones
document.getElementById("actualizarpresupuesto").addEventListener("click",actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click",nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click",nuevoGastoWebFormulario);



function mostrarDatoEnId(idElemento,valor){
    let datId = document.getElementById(idElemento);
    datId.innerHTML = `<p>${valor}</p>`
    
}
    function mostrarGastoWeb(idElemento,gastos){

        gastos.forEach((gasto) =>{
            let element = document.getElementById(idElemento);
            let elGasto = document.createElement("div");
            elGasto.className = "gasto";
            elGasto.setAttribute('id', `gasto-${gasto.id}`)
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
            divSeparador.textContent = "----------------------------------"
            
               //Formulario
            let btnEditForm = document.createElement("button");
            btnEditForm.setAttribute('id', `gasto-editar-formulario-${gasto.id}`)
            btnEditForm.className += 'gasto-editar-formulario';
            btnEditForm.textContent = "Editar (formulario)";
            btnEditForm.type = "button";
            
            let editFormulario = new EditarHandleFormulario();
            editFormulario.gasto = gasto;
               //manejador de eventps del edit del form
            btnEditForm.addEventListener('click',editFormulario);

            

            //botones
    
            let editar = new EditarHandle();
            let borrar = new BorrarHandle();
    
            editar.gasto = gasto;
            borrar.gasto = gasto;
    
            btnEdit.addEventListener('click',editar);
            btnBorrar.addEventListener('click',borrar);
            
         

            
            
            elGasto.append(btnEdit);
            elGasto.append(btnBorrar);
            elGasto.append(btnEditForm);
            elGasto.append(divSeparador);
 

           }
        
        })

       
    }
        //Funcion antigua q no funciona :(

        /*
    
        gastos.forEach((gasto) => {
            let etiquetas = "";

            let listDeEtiqueta = [];
            let etiquetaLista = [];

            gasto.etiquetas.forEach((etiqueta) => {
                etiquetas += 
                    `<span class="gasto-etiquetas-etiqueta" id="${gasto.id}-${etiqueta}">
                        ${etiqueta}
                    </span>`;

                        //Hace el push de las etiquetas
                    listDeEtiqueta.push(`${gasto.id}-${etiqueta}`);
                    etiquetaLista.push(`${etiqueta}`);

            });    
            


            element.innerHTML +=
                `<div class="gasto">
                    <div class="gasto-descripcion">${gasto.descripcion}</div>
                    <div class="gasto-fecha">${new Date(gasto.fecha).toLocaleString()}</div> 
                    <div class="gasto-valor">${gasto.valor}</div> 
                    <div class="gasto-etiquetas">
                        ${etiquetas}
                    </div>
              
                <!--Creamos boton-->
                <button type="button" class="gasto-editar" id="editar-${gasto.id}">Editar</button>
                <button type="button" class="gasto-borrar" id="borrar-${gasto.id}">Eliminar</button>`;

                let objetoDel = new BorrarHandle()

                objetoDel.gasto = gasto;
                document.getElementById(`borrar-${gasto.id}`).addEventListener("click",objetoDel);//boton que borra

                let objetoEdit = new EditarHandle()

                objetoEdit.gasto = gasto;
                document.getElementById(`editar-${gasto.id}`).addEventListener("click",objetoEdit);//boton que edita

                    
                listDeEtiqueta.forEach((tags, search) => {
                    let etiHandle = new BorrarEtiquetasHandle();
                    etiHandle.gasto = gasto;                                                     //Evento que borra etiquetas
                    etiHandle.etiqueta = etiquetaLista[search];
                    document.getElementById(tags).addEventListener('click', etiHandle);
                });
        });*/
    
        function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
            let elemento = document.getElementById(idElemento);

            //bucle tocho
          let gastos ="";
            for(let prop in agrup){
                gastos +=
                "<div class='agrupacion-dato'>" +
                "<span class='agrupacion-dato-clave'>" + prop + ": </span>" +
                "<span class='agrupacion-dato-valor'>" + agrup[prop] + "</span>"+
                "</div>";
            }

            elemento.innerHTML += 
            `<div class='agrupacion'> 
            <h1>Gastos agrupados por ${periodo} </h1>
            ${gastos}`;
        }


        //Funcion repintar para actualizar la pagina
            function repintar(){
                mostrarDatoEnId("presupuesto",GesPresu.mostrarPresupuesto());
                mostrarDatoEnId("gastos-totales",GesPresu.calcularTotalGastos());
                mostrarDatoEnId("balance-total",GesPresu.calcularBalance());

                document.getElementById("listado-gastos-completo").innerHTML = " ";      //Bora el contenido sustituyendolo por un string ("")

                mostrarGastoWeb("listado-gastos-completo",GesPresu.listarGastos());
            }

            
        //Funcion que actualiza el presupuesto WEB
        function actualizarPresupuestoWeb(){
            GesPresu.actualizarPresupuesto(parseFloat(prompt("Introduce un presupuesto:")));

            repintar();
        }

        //Funcion nuevo gasto WEB

        function nuevoGastoWeb(){
            //datos del gasto
            let descripcion = prompt("Introduce la descripcion del gasto:");
            let valor = parseFloat(prompt("Introduce el valor del gasto:"));
            let fecha = Date.parse(prompt("Introduce la fecha del gasto:"));
            let etiquetas = prompt("Introduce las etiquetas:").split(',');

                //Creamos y añadimos el gasto
            GesPresu.anyadirGasto(new GesPresu.CrearGasto(descripcion,valor,fecha,etiquetas))

            //Actualizamos los datos
            repintar();
        }
        
        //Funcion editar Handle
        function EditarHandle(){
                this.handleEvent = function(ev){

                    this.gasto.actualizarDescripcion(prompt("Introduce la nueva descripcion"));

                    this.gasto.actualizarValor(parseFloat(prompt("Introduce el nuevo valor")));

                    this.gasto.actualizarFecha(Date.parse(prompt("Introduce la nueva fecha")));
                    
                    let etiqueta = prompt("Introduce las nuevas etiquetas:");

                    if(typeof etiqueta != "undefined"){
                        this.gasto.anyadirEtiquetas(etiqueta.split(','))
                    }
                   repintar();
                } 
        }

        // Borrar Handle

        function BorrarHandle(){
            this.handleEvent = function(ev){
                    GesPresu.borrarGasto(this.gasto.id);

                    repintar();
            }
        }


        //Borrar etiquetas del handle

        function BorrarEtiquetasHandle(){
            this.handleEvent = function(ev){
                this.gasto.borrarEtiquetas(this.etiqueta)

                repintar();
            }
        }

        //Funcion Formulario PRACTICA 6


        function nuevoGastoWebFormulario(){
            //Copia formulario
            let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
            var formulario = plantillaFormulario.querySelector("form");

            //Append para los controles principales
            document.getElementById("controlesprincipales").append(formulario);

            //Boton enviar
            let enviarForm = new submitHandle ();
            formulario.addEventListener("submit", enviarForm);

            //Boton cancelar
            let cancelForm = new CancelarHandle ();
            cancelForm.formulario = formulario;
            formulario.querySelector("button[class='cancelar']").addEventListener('click', cancelForm);

            document.getElementById('anyadirgasto-formulario').disabled = true;
        }

        //selecciona los campos para crear el formulario
        function submitHandle(){
            this.handleEvent = function(event) {
                //Prevenir el efecto por defecto del formulario.
                event.preventDefault();
        
                //Datos del form
                let descripcion = event.currentTarget.descripcion.value;
                let valor = parseFloat(event.currentTarget.valor.value);
                let fecha = event.currentTarget.fecha.value;
                let etiquetas = event.currentTarget.etiquetas.value;
        
                //Separa las etiquetas
                if (typeof etiquetas !== 'undefined') {
                    etiquetas = etiquetas.split(",");
                }
        
                //Creas los gastos
                let gasto = new GesPresu.CrearGasto(descripcion, valor, fecha, etiquetas);
        
                     //añadimos el gasto 
                GesPresu.anyadirGasto(gasto);
        
                repintar();
        
                //Borramos el formulario
                event.currentTarget.remove();
        
    
                document.getElementById('anyadirgasto-formulario').disabled = false;
            }
        }


            //Cancelar formulario

        function CancelarHandle(){
            this.handleEvent = function (){
                //elimina el form
                    this.formulario.remove();

                    //Boton añadir
                document.getElementById("anyadirgasto-formulario").disabled = false;
            }
        }

        
        //De esta funcion no tenia ni idea y me la ha enseñado un compañero

        function EditarHandleFormulario()
        {
            this.handleEvent = function(event) {
                //Clonación y creación del formulario mediante el template (plantilla).
                let form = document.getElementById("formulario-template").content.cloneNode(true).querySelector("form");
                document.getElementById(`gasto-${this.gasto.id}`).append(form);
        
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
                let cancelarEvent = new CancelarEditHandle();
                cancelarEvent.formulario = form;
                cancelarEvent.gasto = this.gasto;
                form.querySelector("button[class='cancelar']").addEventListener('click', cancelarEvent);
        
                //Creación del objeto manejador de eventos del boton enviar.
                let submitEvent = new submitEditHandle();
                submitEvent.gasto = this.gasto;
                form.addEventListener('submit', submitEvent);
        }
    }

    //Funcion para el submit del editar
        function submitEditHandle(){
            this.handleEvent = function (event){
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

        //Esta funcion es para el cancelar del formulario
        function CancelarEditHandle(){
            this.handleEvent = function (){
                //elimina el form
                    this.formulario.remove();

                    //Boton añadir
                document.getElementById(`gasto-editar-formulario-${this.gasto.id}`).disabled = false;
            }
        }


//El export de las funciones
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}