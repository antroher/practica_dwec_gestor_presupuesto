'use strict';
import * as gestionPresupuesto from './gestionPresupuesto.js'

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

    cad += '<div><button class="gasto-editar" type="button">Editar</button>' + 
    '<button class="gasto-borrar" type="button">Borrar</button></div>'
    
    elem.innerHTML += cad;
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
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo',elem);
    }
}
function actualizarPresupuestoWeb(){
    let presu = parseInt(prompt('Introduce un presupuesto nuevo.'));
    gestionPresupuesto.actualizarPresupuesto(presu);
    repintar();
    document.getElementById('actualizarpresupuesto').addEventListener("click",);//aun no esta terminado
}
function nuevoGastoWeb(){
    let desc = prompt('Escriba la descripción del nuevo gasto');
    let val = prompt('Escriba el valor del nuevo gasto');
    let fech = new Date(prompt('Escriba la fecha del nuevo gasto')).toLocaleDateString();//arreglar?
    let etiq = prompt('Escriba las etiquetas (seguidas por coma) del nuevo gasto');
    etiq = etiq.split(', ');
    let gasto = gestionPresupuesto.CrearGasto(desc, val, fech, etiq);
    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
    document.getElementById('anyadirgasto').addEventListener("click",);//aun no esta terminado
}
function EditarHandle (){

}
function BorrarHandle (){

}
    

/*
function mostrarDatoEnId(idElemento, valor){
    let elem = document.getElementById(idElemento);
    let p=document.createElement('p');
    p.textContent=valor;
    elem.append(p);

}*/
/*function mostrarGastoWeb(idElemento, gasto){
    let elem = document.getElementById(idElemento);

    //div class=gasto
    let divg = document.createElement('div'), 
    divg2 = document.createElement('div');
    divg.className="gasto";

        //div class=gasto-descripcion
        divg2.className="gasto-descripcion";
        divg2.textContent=gasto.descripcion;
        divg.append(divg2);

        //div class=gasto-fecha

        divg2.className="gasto-fecha";
        divg2.textContent=new Date(gasto.fecha).toLocaleDateString();
        divg.append(divg2);

        //div class=gasto-valor
        divg2.className="gasto-valor";
        divg2.textContent=gasto.valor;
        divg.append(divg2);

        //div class=gasto-etiquetas
        let span=document.createElement('span');
        span.className="gasto-etiquetas-etiqueta";
        divg2.className="gasto-etiqueta";
            //span
            gasto.etiquetas.forEach(etiq => {
                span.textContent=etiq;
                divg2.append(span);
            });
    
    elem.append(divg);
}*/


/*function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elem = document.getElementById(idElemento);

    //div class="agrupacion"
    let div=document.createElement('div');
    div.className="agrupacion";

        //h1 Gastos agrupados por PERIODO
        let h1=document.createElement('h1');
        h1.textContent=`Gastos agrupados por ${periodo}`;
    div.append(h1);

    for (let i in agrup){
      
            //div class="agrupacion-dato"
            let divAD=document.createElement('div'),span=document.createElement('span');
            divAD.className="agrupacion-dato";
                //span class="agrupacion-dato-clave"
                span.className="agrupacion-dato-clave";
                span.textContent=i;
                divAD.append(span);
                //span class="agrupacion-dato-valor"
                span.className="agrupacion-dato-valor";
                span.textContent=agrup[i];
                divAD.append(span);
            div.append(divAD);
    }
}
*/

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}