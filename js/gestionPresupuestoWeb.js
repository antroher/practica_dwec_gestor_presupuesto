'use strict';
import * as gestionPresupuesto from './gestionPresupuesto.js'

//Funciones para mostrar los datos
function mostrarDatoEnId(idElemento, valor){
    let elem = document.getElementById(idElemento);
    elem.innerHTML += valor;
}
function mostrarGastoWeb(idElemento, gasto){
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

    //botones gasto-editar y gasto-borrar
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

    if(idElemento === "listado-gastos-completo"){
        divG.append(btnEditar);
        divG.append(btnBorrar);
    }

    
    /*let elem = document.getElementById(idElemento);
    let cad = "<div class='gasto'>\n" +
                "<div class='gasto-descripcion'>" + gasto.descripcion + "</div>\n" +
                "<div class='gasto-fecha'>" + new Date(gasto.fecha).toLocaleDateString() + "</div>\n" + 
                "<div class='gasto-valor'>" + gasto.valor + "</div>\n" + 
                "<div class='gasto-etiquetas'>\n";
    
    gasto.etiquetas.forEach(item => {
        cad += "<span class='gasto-etiquetas-etiqueta'>\n" + item + "\n</span>\n"
    });
    cad += "</div>\n</div>\n";

    cad += `<button class="gasto-editar" id=${gasto.id} type="button">Editar</button>` + 
    `<button class="gasto-borrar" id=${gasto.id} type="button">Borrar</button>`;
    
    elem.innerHTML += cad;

    //eventos
        //borrar
    let btnBorrar = document.getElementById(gasto.id);
    let objBorrar = new BorrarHandle();
    objBorrar.gasto=gasto;
    btnBorrar.addEventListener("click",objBorrar);
        //editar
    let btnEditar = document.getElementById(gasto.id);
    let objEditar = new EditarHandle();
    objEditar.gasto=gasto;
    btnEditar.addEventListener("click",objEditar);
        //span
    for (let elem of gasto.etiquetas){
        let btnBorrarEtiq = document.getElementById(gasto.id);
        let objBorrarEtiq = new EditarHandle();
        objBorrarEtiq.gasto=gasto;
        objBorrarEtiq.etiquetas=elem;
        btnBorrarEtiq.addEventListener("click",objBorrarEtiq);
    }*/
    
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elem = document.getElementById(idElemento);
    let cad = "<div class='agrupacion'>\n" + 
    "<h1>Gastos agrupados por " + periodo + "</h1>\n";
    
    for (let res in agrup){
      
        cad += 
        "<div class='agrupacion-dato'>\n" +
        "<span class='agrupacion-dato-clave'>" + res + "</span>\n" +
        "<span class='agrupacion-dato-valor'>" + agrup[res] + "</span>\n"+
        "</div>\n";
}

    cad += "</div>\n";
    elem.innerHTML += cad;
    
}

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
}

function repintar(){
    document.getElementById('presupuesto').innerHTML='';
    document.getElementById('gastos-totales').innerHTML="";
    document.getElementById('balance-total').innerHTML="";
    mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales',gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId('balance-total',gestionPresupuesto.calcularBalance());
    document.getElementById('listado-gastos-completo').innerHTML="";


    let listadoGastoCompletos = gestionPresupuesto.listarGastos();
    for (let elem of listadoGastoCompletos){
        mostrarGastoWeb('listado-gastos-completo',elem);
    }
}
//Funcion boton de actulizar
function actualizarPresupuestoWeb(){
    let presu = parseInt(prompt('Introduce un presupuesto nuevo.'));
    gestionPresupuesto.actualizarPresupuesto(presu);
    document.getElementById('presupuesto').innerHTML="";
    document.getElementById('gastos-totales').innerHTML="";
    document.getElementById('balance-total').innerHTML="";
    repintar();
}
    //Evento
document.getElementById('actualizarpresupuesto').addEventListener('click', actualizarPresupuestoWeb);

//Funcion boton de editar
function nuevoGastoWeb(){
    let desc = prompt('Escriba la descripción del nuevo gasto');
    let val = parseFloat(prompt('Escriba el valor del nuevo gasto'));
    let fech = new Date(prompt('Escriba la fecha del nuevo gasto')).toLocaleDateString();//arreglar?
    let etiq = prompt('Escriba las etiquetas (seguidas por coma) del nuevo gasto');
    etiq = etiq.split(', ');
    let gasto = new gestionPresupuesto.CrearGasto(desc, val, fech, etiq);
    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}
    //Evento
document.getElementById('anyadirgasto').addEventListener('click', nuevoGastoWeb);

//Funciones handle
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
function BorrarHandle (){
    this.handleEvent = function(event){
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}
function BorrarEtiquetasHandle(){
    this.handleEvent = function(event){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
    
}
function EditarHandleFormulario(){
    this.handleEvent = function(event){

    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}