'use strict';
import * as gestionPresupuesto from './gestionPresupuesto.js'

//Funciones para mostrar los datos
function mostrarDatoEnId(idElemento, valor){
    let elem = document.getElementById(idElemento);
    elem.innerHTML += valor;
}
function mostrarGastoWeb(idElemento, gasto){
    let elem = document.getElementById(idElemento);
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
    }
    
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

function repintar(){
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
document.getElementById('actualizarpresupuesto').addEventListener('click', actualizarPresupuestoWeb)

//Funcion boton de editar
function nuevoGastoWeb(){
    let desc = prompt('Escriba la descripción del nuevo gasto');
    let val = parseInt(prompt('Escriba el valor del nuevo gasto'));
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
    this.handleEvent = function(){
        let desc = prompt('Escriba la descripción del nuevo gasto');
        let val = parseInt(prompt('Escriba el valor del nuevo gasto'));
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
    this.handleEvent = function(){
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}
function BorrarEtiquetasHandle(){
    this.handleEvent = function(){
        this.gasto.borrarEtiquetas(this.etiquetas);
        repintar();
    }
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}