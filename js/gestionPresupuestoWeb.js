"use strict"

import * as GesPresu from "./gestionPresupuesto.js";
//Botones
document.getElementById("actualizarpresupuesto").addEventListener("click",actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click",nuevoGastoWeb);

function mostrarDatoEnId(idElemento,valor){
    let datId = document.getElementById(idElemento);
    datId.innerHTML = `<p>${valor}</p>`
    
}
    function mostrarGastoWeb(idElemento,gastos){
        let element = document.getElementById(idElemento);
    
        gastos.forEach((gasto) => {
            let etiquetas = "";
            gasto.etiquetas.forEach((etiqueta) => {
                etiquetas += 
                    `<span class="gasto-etiquetas-etiqueta">
                        ${etiqueta}
                    </span>`;
            });    
            


            element.innerHTML +=
                `<div class="gasto">
                    <div class="gasto-descripcion">${gasto.descripcion}</div>
                    <div class="gasto-fecha">${gasto.fecha}</div> 
                    <div class="gasto-valor">${gasto.valor}</div> 
                    <div class="gasto-etiquetas">
                        ${etiquetas}
                    </div>
              
                <!--Creamos boton-->
                <button type="button" class="gasto-editar" id="editar-${gasto.id}">Editar</button>
                <button type="button" class="gasto-borrar" id="borrar-${gasto.id}">Eliminar</button>`;

                // let objetoDel = new BorrarHandle()

                // objetoDel.gasto = gasto;
                // document.getElementById(`borrar-${gasto.id}`).addEventListener("click",objetoDel);//boton que borra

                let objetoEdit = new EditarHandle()

                objetoEdit.gasto = gasto;
                document.getElementById(`editar-${gasto.id}`).addEventListener("click",objetoEdit);//boton que edita
        });
        
    }
    
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


        //Funcion repintar pàra actualizar la pagina
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
            let fecha = Date.parse(prompt("Introduce el valor del gasto:"));
            let etiquetas = prompt("Introduce las etiquetas:");

                //Creamos y añadimos el gasto
            GesPresu.anyadirGasto(new GesPresu.CrearGasto(descripcion,valor,fecha,etiquetas))

            //Actualizamos los datos
            repintar();
        }
        
        //Funcion editar Handle
        function EditarHandle(){

                this.handleEvent = function(event){

                    this.gasto.actualizarDescripcion(prompt("Introduce la nueva descripcion"));

                    this.gasto.actualizarFecha(Date.parse(prompt("Introduce la nueva fecha")));

                    this.gasto.actualizarValor(parseFloat(prompt("Introduce el nuevo valor")));
                    


                        let etiqueta = prompt("Introduce las etiquetas:");
                        if(typeof etiqueta != "undefined"){
                            this.gasto.anyadirEtiquetas(etiqueta.split(","))
                        }
                        repintar();
                }
        }

        //Borrar Handle

        // function BorrarHandle(){

        // }


        // //Borrar etiquetas del handle

        // function BorrarEtiquetasHandle(){

        // }

//El export de las funciones
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}