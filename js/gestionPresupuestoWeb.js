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
        });
        etiq+="</div>\n"+
            "</div>\n";
        elem.innerHTML+=etiq;
                        
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

function EditarHandle(){
    let handleEvent=function(){};
}

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle
    
}