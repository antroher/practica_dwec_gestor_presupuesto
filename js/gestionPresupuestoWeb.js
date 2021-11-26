import * as gp from './gestionPresupuesto.js'

/*Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
*/
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
            
            if(idElemento=="listado-gastos-completo"){
                let borraEt=new BorrarEtiquetasHandle();
                borraEt.gasto = gasto;
                borraEt.etiqueta = e;
                span.addEventListener("click",borraEt);
            }
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

            let botonEditarF=document.createElement("button");
            botonEditarF.className="gasto-editar-formulario";
            botonEditarF.type="button";
            botonEditarF.textContent="Editar Form";

            let editHaForm = new EditarHandleFormulario();
            editHaForm.gasto=gasto;
            editHaForm.botonEditarGasto=botonEditarF;
            editHaForm.divGasto=divgasto;
            botonEditarF.addEventListener("click",editHaForm);
            divgasto.append(botonEditarF);

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

function nuevoGastoWebFormulario(){
    document.getElementById("anyadirgasto-formulario").disabled=true;

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    let formulario = plantillaFormulario.querySelector("form");
    formulario.addEventListener("submit",this.handleEvent=function(event){
        event.preventDefault();
        let desc = formulario.elements.descripcion;
        let valor = formulario.elements.valor;
        let fecha = formulario.elements.fecha;
        let etiquetas=formulario.elements.etiquetas;
        etiquetas=etiquetas.value.split(",");
        let gasto = new gp.CrearGasto(desc.value,parseFloat(valor.value),fecha.value,...etiquetas);
        gp.anyadirGasto(gasto);
        document.getElementById("anyadirgasto-formulario").disabled=false;
        document.getElementById("controlesprincipales").removeChild(formulario);
        repintar();

    });
    document.getElementById("controlesprincipales").append(formulario);
    
    let botonCancelar=formulario.querySelector("button.cancelar");
    botonCancelar.addEventListener("click",this.handleEvent=function(){

        document.getElementById("anyadirgasto-formulario").disabled=false;
        document.getElementById("controlesprincipales").removeChild(formulario);
        repintar();

    });
}

function EditarHandleFormulario(){
    this.handleEvent=function(){
        let g=this.gasto;
        let botonEditG=this.botonEditarGasto;
        let divG=this.divGasto;

        this.botonEditarGasto.disabled=true;
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
        let formulario = plantillaFormulario.querySelector("form");

        formulario.elements.descripcion.value=g.descripcion;
        formulario.elements.valor.value=g.valor;
        formulario.elements.fecha.value=new Date(g.fecha).toISOString().substring(0,10);
        formulario.elements.etiquetas.value=g.etiquetas.toString();
        divG.appendChild(formulario);
        

        formulario.addEventListener("submit",this.handleEvent=function(event){
            event.preventDefault();
            g.actualizarDescripcion(formulario.elements.descripcion.value);
            g.actualizarValor(parseFloat(formulario.elements.valor.value));
            g.actualizarFecha(formulario.elements.fecha.value);
            let etiquetasForm=formulario.elements.etiquetas;
            etiquetasForm=etiquetasForm.value.split(",");
            g.borrarEtiquetas(...g.etiquetas);
            g.anyadirEtiquetas(...etiquetasForm);
            botonEditG.disabled=false;
            divG.removeChild(formulario);
            repintar();
    
        });

        let botonCancelar=formulario.querySelector("button.cancelar");
        botonCancelar.addEventListener("click",this.handleEvent=function(){

            botonEditG.disabled=false;
            divG.removeChild(formulario);
            repintar();

        });
    }
}

function FiltrarGastosWeb(){
    this.handleEvent=function(event){
            event.preventDefault();
            let desc=document.getElementById("formulario-filtrado-descripcion").value;
            let vmin = parseFloat(document.getElementById("formulario-filtrado-valor-minimo").value);
            let vmax = parseFloat(document.getElementById("formulario-filtrado-valor-maximo").value);
            let fini = document.getElementById("formulario-filtrado-fecha-desde").value;
            let ffin=document.getElementById("formulario-filtrado-fecha-hasta").value;
            let etiq=document.getElementById("formulario-filtrado-etiquetas-tiene").value;
            let etiquetasBuscar=[];
            if(etiq!=="" && typeof etiq !== 'undefined'){
                etiquetasBuscar=gp.transformarListadoEtiquetas(etiq);
            }
            //let filtro ={fechaDesde:fini,fechaHasta:ffin,valorMinimo:vmin,valorMaximo:vmax,descripcionContiene:desc,etiquetasTiene:etiquetasBuscar};
            let filtro={};
            if(desc!=="" && typeof desc !== 'undefined'){
                filtro.descripcionContiene=desc;
            }
            if(vmin!=="" && typeof vmin !== 'undefined' && !isNaN(vmin)){
                filtro.valorMinimo=vmin;
            }
            if(vmax!=="" && typeof vmax !== 'undefined'&& !isNaN(vmax)){
                filtro.valorMaximo=vmax;
            }
            if(fini!=="" && typeof fini !== 'undefined'){
                filtro.fechaDesde=fini;
            }
            if(ffin!=="" && typeof ffin !== 'undefined'){
                filtro.fechaHasta=ffin;
            }if(etiquetasBuscar.length>0){
                filtro.etiquetasTiene=etiquetasBuscar;
            }
            
            console.log(filtro);
            let gfiltrados=gp.filtrarGastos(filtro);
            document.getElementById("listado-gastos-completo").innerHTML="<hr>";
            gfiltrados.forEach(gf => {
                mostrarGastoWeb("listado-gastos-completo",gf);
            });
            document.getElementById("listado-gastos-completo").innerHTML+="<hr>";
        };

    
}

function guardarGastosWeb(){
    localStorage.GestorGastosDWEC=JSON.stringify(gp.listarGastos());
}

function CargarGastosWeb(){
    this.handleEvent=function(){
        let gastosCargar=JSON.parse(localStorage.getItem("GestorGastosDWEC"));
        if(gastosCargar!==null){
            if(gastosCargar.length>=0){
                gp.cargarGastos(gastosCargar);
            }

        }
        console.log(gastosCargar);
        repintar();
    }
}

function cargarGastosWeb(){
    let gastosCargar=JSON.parse(localStorage.getItem("GestorGastosDWEC"));
        if(gastosCargar!==null){
            if(gastosCargar.length>=0){
                gp.cargarGastos(gastosCargar);
            }

        }else{
            gp.cargarGastos([]);
        }
        console.log(gastosCargar);
        repintar();
}


let boton=document.getElementById("actualizarpresupuesto");
boton.onclick=actualizarPresupuestoWeb;
let boton2=document.getElementById("anyadirgasto");
boton2.onclick=nuevoGastoWeb;
let botonAnyadirForm=document.getElementById("anyadirgasto-formulario");
botonAnyadirForm.onclick=nuevoGastoWebFormulario;
let fhandler= new FiltrarGastosWeb();
let formulario = document.getElementById("formulario-filtrado");
formulario.addEventListener("submit",fhandler);
let botonGuardar = document.getElementById("guardar-gastos");
botonGuardar.onclick=guardarGastosWeb;
let botonCargar = document.getElementById("cargar-gastos");
/*let fCargar= new CargarGastosWeb();
botonCargar.addEventListener('click',fCargar);*/
botonCargar.onclick=cargarGastosWeb;
//localStorage.clear()


export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb
   // nuevoGastoWeb,
   // EditarHandle,
  //  BorrarHandle,
  //  BorrarEtiquetasHandle//,
   // nuevoGastoWebFormulario
    
}