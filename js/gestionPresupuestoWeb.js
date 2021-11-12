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

        let divgasto=document.createElement("div");
        divgasto.className="gasto";

        let divGastoDesc=document.createElement("div");
        divGastoDesc.className="gasto-descripcion";
        divGastoDesc.textContent=gasto.descripcion;
        divgasto.append(divGastoDesc);

        let divGastoFecha=document.createElement("div");
        divGastoFecha.className="gasto-fecha";
        divGastoFecha.textContent=new Date(gasto.fecha).toLocaleDateString();
        divgasto.append(divGastoFecha);

        let divGastoValor=document.createElement("div");
        divGastoValor.className="gasto-valor";
        divGastoValor.textContent=gasto.valor+"";
        divgasto.append(divGastoValor);

        let divGastoEtiquetas=document.createElement("div");
        divGastoEtiquetas.className="gasto-etiquetas";
        /*
        let etiq="<div class='gasto'>\n"+
                "<div class='gasto-descripcion'>"+gasto.descripcion+"</div>\n"+
                "<div class='gasto-fecha'>"+new Date(gasto.fecha).toLocaleDateString()+"</div>\n"+
                "<div class='gasto-valor'>"+gasto.valor+"</div>\n"+
                "<div class='gasto-etiquetas'>\n";
                */
        gasto.etiquetas.forEach(e => {
            let span=document.createElement("span");
            span.className="gasto-etiquetas-etiqueta";
            span.textContent=e+" ";
            let borraEt=new BorrarEtiquetasHandle();
            borraEt.gasto = gasto;
            borraEt.etiqueta = e;
            span.addEventListener("click",borraEt);
            divGastoEtiquetas.append(span);
            /*
            etiq+="<span class='gasto-etiquetas-etiqueta'>\n";
            etiq+=e+"\n";
            etiq+="</span>\n";
            */
            /*elem.innerHTML+=etiq;
            etiq="";
            let borrarEtiquetasHandle=BorrarEtiquetasHandle(gasto,e);
            document.getElementById("gasto-etiquetas-etiqueta").onclick=borrarEtiquetasHandle.handleEvent;
          */  
        });
        //etiq+="</div>\n";
        divgasto.append(divGastoEtiquetas);
        if(idElemento=="listado-gastos-completo"){
            let botonEditar=document.createElement("button");
            botonEditar.className="gasto-editar";
            botonEditar.type="button";
            botonEditar.textContent="Editar";
            let editarHa= new EditarHandle();
            editarHa.gasto=gasto;
            botonEditar.addEventListener("click",editarHa);
            divgasto.append(botonEditar);

            let botonBorrar=document.createElement("button");
            botonBorrar.className="gasto-borrar";
            botonBorrar.type="button";
            botonBorrar.textContent="Borrar";
            let borrarHa = new BorrarHandle();
            borrarHa.gasto=gasto;
            botonBorrar.addEventListener("click",borrarHa);
            divgasto.append(botonBorrar);

            /*etiq+="<button class='gasto-editar' type='button'>Editar</button>\n";
            etiq+="<button class='gasto-borrar' type='button'>Borrar</button>\n";*/
        }

        //etiq+="</div>\n";
        //elem.innerHTML+=etiq;
          elem.append(divgasto);              
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

    
    document.getElementById("listado-gastos-filtrado-1").innerHTML="";
    let gastosF=gp.filtrarGastos({fechaDesde:"2021-09-01", fechaHasta:"2021-09-30"});
    gastosF.forEach(gf => {
        mostrarGastoWeb("listado-gastos-filtrado-1",gf);
    });

    document.getElementById("listado-gastos-filtrado-2").innerHTML="";
    gastosF=gp.filtrarGastos({valorMinimo:50});
    gastosF.forEach(gf => {
        mostrarGastoWeb("listado-gastos-filtrado-2",gf);
    });

    document.getElementById("listado-gastos-filtrado-3").innerHTML="";
    gastosF=gp.filtrarGastos({valorMinimo:200,etiquetasTiene:["seguros"]});
    gastosF.forEach(gf => {
        mostrarGastoWeb("listado-gastos-filtrado-3",gf);
    });

    document.getElementById("listado-gastos-filtrado-4").innerHTML="";
    gastosF=gp.filtrarGastos({valorMaximo:50,etiquetasTiene:["comida","transporte"]});
    gastosF.forEach(gf => {
        mostrarGastoWeb("listado-gastos-filtrado-4",gf);
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
    let gasto =new gp.CrearGasto(desc,valor,fecha);
    etiquetas.forEach(e => {
        gasto.anyadirEtiquetas(e);
    });
    gp.anyadirGasto(gasto);
    repintar();
}

function EditarHandle(){
        this.handleEvent=function(){
            let etiquetas=[];
            let desc=prompt("Introduce la descripción:");
            let valor=parseFloat(prompt("Introduce el valor:"));
            let fecha=prompt("Introduce una fecha con este formato(aaaa-mm-dd):");
            let etiq=prompt("Introduce las etiquetas(etiqueta1,etiqueta2,etiqueta3):");
            if(typeof etiq !== 'undefined'){
                etiquetas=etiq.split(",");
            }
            if(desc!=="") this.gasto.actualizarDescripcion(desc);
            if(valor>=0)this.gasto.actualizarValor(valor);
            if(fecha!=="")this.gasto.actualizarFecha(fecha);
            this.gasto.etiquetas=etiquetas;
            repintar();
        };
}

function BorrarHandle(){
        
        this.handleEvent=function(){
            gp.borrarGasto(this.gasto.id);
            repintar();
        };
}

function BorrarEtiquetasHandle(){
        this.handleEvent=function(){
            this.gasto.borrarEtiquetas(this.etiqueta);
            repintar();
        };
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