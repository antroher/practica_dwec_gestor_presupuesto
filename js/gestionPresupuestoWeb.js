import * as gp from './gestionPresupuesto.js'

function mostrarDatoEnId(valor, idElemento){
    if(idElemento!==undefined){
        let elem= document.getElementById(idElemento);
        elem.innerHTML+=''+valor;
    }
    
}

function mostrarGastoWeb(idElemento, gasto){
    if(idElemento!==undefined){
        let elem = document.getElementById(idElemento);
        let etiq="<div class='gasto'>\n"+
                "<div class='gasto-descripcion'>"+gasto.descripcion+"</div>\n"+
                "<div class='gasto-fecha'>"+new Date(gasto.fecha).toLocaleDateString()+"</div>\n"+
                "<div class='gasto-valor'>"+gasto.valor+"</div>\n"+
                "<div class='gasto-etiquetas'>\n";
        gasto.etiquetas.forEach(e => {
            etiq+="<span class='gasto-etiquetas-etiqueta'>\n";
            etiq+=e+"\n";
            etiq+="</span>\n";
            /*elem.innerHTML+=etiq;
            etiq="";
            let borrarEtiquetasHandle=BorrarEtiquetasHandle(gasto,e);
            document.getElementById("gasto-etiquetas-etiqueta").onclick=borrarEtiquetasHandle.handleEvent;
          */  
        });
        etiq+="</div>\n"+
            "</div>\n";
        etiq+="<button class='gasto-editar' type='button'>Editar</button>\n";
        etiq+="<button class='gasto-borrar' type='button'>Borrar</button>\n";

        /*let editarHandle=EditarHandle(gasto);
        let borrarHandle=BorrarHandle(gasto);
*/
        elem.innerHTML+=etiq;
/*
        document.getElementById("gasto-editar").onclick=editarHandle.handleEvent;
        document.getElementById("gasto-borrar").onclick=borrarHandle.handleEvent;
*/
                        
    }

}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    
    if(idElemento!==undefined){
        let elem=document.getElementById(idElemento);
        let cad="<div class='agrupacion'>\n"+
                "<h1>Gastos agrupados por "+periodo+"</h1>\n";
        for(let prop in agrup){
            cad+="<div class='agrupacion-dato'>\n"+
                "<span class='agrupacion-dato-clave'>"+prop+"</span>\n"+
                "<span class='agrupacion-dato-valor'>"+agrup[prop]+"</span>\n"+
                "</div>\n";
        }  
        cad+="</div>\n";
        elem.innerHTML+=cad;
    }
}

function repintar(){
    document.getElementById("presupuesto").innerHTML="";
    document.getElementById("balance-total").innerHTML="";
    document.getElementById("gastos-totales").innerHTML="";
    mostrarDatoEnId(gp.mostrarPresupuesto(),"presupuesto");
    mostrarDatoEnId(gp.calcularTotalGastos(),"gastos-totales");
    mostrarDatoEnId(gp.calcularBalance(),"balance-total");
    document.getElementById("listado-gastos-completo").innerHTML="";
    let gastos = gp.listarGastos();
    gastos.forEach(g => {
        mostrarGastoWeb("listado-gastos-completo",g);
    });
}

function actualizarPresupuestoWeb(){
    
    let presupuesto=parseFloat(prompt("Introduce un nuevo presupuesto"));
    gp.actualizarPresupuesto(presupuesto);
    repintar();
}

function nuevoGastoWeb(){
    let desc=prompt("Introduce la descripción del nuevo gasto:");
    let valor=parseFloat(prompt("Introduce el valor del nuevo gasto:"));
    let fecha=prompt("Introduce una fecha para el nuevo gasto con este formato(aaaa-mm-dd):");
    let etiq=prompt("Introduce las etiquetas(etiqueta1,etiqueta2,etiqueta3):");
    let etiquetas=etiq.split(",");
    let gasto = gp.CrearGasto(desc,valor,fecha);
    etiquetas.forEach(e => {
        gasto.anyadirEtiquetas(e);
    });
    gp.anyadirGasto(gasto);
    repintar();
}

function EditarHandle(g){
    let editarHandle={
        gasto:g,
        handleEvent:function(){
            let etiquetas=[];
            let desc=prompt("Introduce la descripción:");
            let valor=parseFloat(prompt("Introduce el valor:"));
            let fecha=prompt("Introduce una fecha con este formato(aaaa-mm-dd):");
            let etiq=prompt("Introduce las etiquetas(etiqueta1,etiqueta2,etiqueta3):");
            if(typeof etiq !== 'undefined'){
                etiquetas=etiq.split(",");
            }
            if(desc!=="") editarHandle.gasto.actualizarDescripcion(desc);
            if(valor>=0)editarHandle.gasto.actualizarValor(valor);
            if(fecha!=="")editarHandle.gasto.actualizarFecha(fecha);
            editarHandle.gasto.etiquetas=etiquetas;
            repintar();
        }
    }  
    return editarHandle; 
}

function BorrarHandle(g){
    let borrarHandle={
        gasto:g,
        handleEvent:function(){
            gp.borrarGasto(borrarHandle.gasto.id);
            repintar();
        }
    }  
    return borrarHandle; 
}

function BorrarEtiquetasHandle(g,etiq){
    let borrarEtiquetasHandle={
        gasto:g,
        etiqueta:etiq,
        handleEvent:function(){
            this.gasto.borrarEtiquetas(borrarEtiquetasHandle.etiqueta);
            repintar();
        }
    }  
    return borrarEtiquetasHandle; 
}

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
    
}