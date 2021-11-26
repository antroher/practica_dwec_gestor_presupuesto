// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
"use strict";
var presupuesto=0;
var idGasto=0;
var gastos=[];

function actualizarPresupuesto(valor) {
    if(valor>=0 ){

        presupuesto=valor;
        return presupuesto;

    }else{

        console.log("ERROR -> Valor negativo.");
        return -1;
    } 
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de "+presupuesto+" €"
}

function CrearGasto(desc  , datoValor, datoFecha, ...arrayEtiquetas) {
    
    if(datoValor<0 || isNaN(datoValor))datoValor=0;
    if(datoFecha===undefined || isNaN(Date.parse(datoFecha)))datoFecha=new Date(Date.now()).toISOString().substring(0,16);
    if(arrayEtiquetas===undefined)arrayEtiquetas=[];
    this.descripcion=desc+"";
    this.valor=parseFloat(datoValor);
    this.fecha=Date.parse(datoFecha);
    this.etiquetas=arrayEtiquetas;
    this.mostrarGasto=function(){
        return "Gasto correspondiente a "+this.descripcion+" con valor "+this.valor+" €";
    };
    this.actualizarDescripcion=function(desc){
            if(desc !=null && desc !="") this.descripcion=desc;
        };
    this.actualizarValor=function(dato){
            if(parseFloat(dato)>0)this.valor=dato;
        };
    this.mostrarGastoCompleto=function(){
            let cadenaMostrar="Gasto correspondiente a "+this.descripcion+" con valor "+this.valor+" €.\n"+
            "Fecha: "+new Date(this.fecha).toLocaleString()+"\n"+
            "Etiquetas:\n";
            if(this.etiquetas.length>0){
                this.etiquetas.forEach(cad => {
                    cadenaMostrar=cadenaMostrar+"- "+cad+"\n"
                });
            }
            return cadenaMostrar;
        };
    this.actualizarFecha=function(datoActFecha){
            if(!isNaN(Date.parse(datoActFecha))){
                this.fecha=Date.parse(datoActFecha);
            }
        };
    this.anyadirEtiquetas=function(...datosEtiquetas){
            datosEtiquetas.forEach(e => {
                if(typeof(e)=="string" && !this.etiquetas.includes(e)){
                    this.etiquetas.push(e);
                }
            });
        };
    this.borrarEtiquetas=function(...eliminarEtiquetas){
            eliminarEtiquetas.forEach(e => {
                if(this.etiquetas.includes(e)){
                    this.etiquetas.splice(this.etiquetas.indexOf(e),1);
                }
            });
        };
    this.obtenerPeriodoAgrupacion=function(periodo){
            if(periodo!==undefined){
                switch(periodo){
                    case "dia":
                        return new Date(this.fecha).toISOString().substring(0,10);
                    case "mes":
                        return new Date(this.fecha).toISOString().substring(0,7);
                    case "anyo":
                        return new Date(this.fecha).toISOString().substring(0,4);
                }
            }
        };
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gastoAnyadir){
    if(gastoAnyadir!==undefined && gastoAnyadir!==null){
        gastoAnyadir.id=idGasto;
        gastos.push(gastoAnyadir);
        idGasto++;
    }
    
}

function calcularTotalGastos(){
    let totalGastos=0;
    gastos.forEach(g => {
        totalGastos=parseFloat(totalGastos+g.valor);
    });
    return totalGastos;
}

function calcularBalance(){
    return presupuesto-calcularTotalGastos();
}

function borrarGasto(idObjeto){
    gastos.forEach(g => {
        if(g.id==idObjeto){
            gastos.splice(gastos.indexOf(g),1);
        }
    });
}

function filtrarGastos(filtro){
    let gastosFiltrados=gastos.filter(function(g){
        let fechaDesdeBool=false;
        let fechaHastaBool=false;
        let valorMaximoBool=false;
        let valorMinimoBool=false;
        let descBool=false;
        let etiquetasBool=false;
        if(filtro!==undefined){

            if(filtro.hasOwnProperty("fechaDesde") && g.fecha>=Date.parse(filtro.fechaDesde)){
                fechaDesdeBool=true;
            }else if(!filtro.hasOwnProperty("fechaDesde") || filtro.fechaDesde===undefined)fechaDesdeBool=true;

            if(filtro.hasOwnProperty("fechaHasta") && g.fecha<=Date.parse(filtro.fechaHasta)){
                fechaHastaBool=true;
            }else if(!filtro.hasOwnProperty("fechaHasta") || filtro.fechaHasta===undefined) fechaHastaBool=true;

            if(filtro.hasOwnProperty("valorMinimo") && g.valor>=filtro.valorMinimo){
                valorMinimoBool=true;
            } else if(!filtro.hasOwnProperty("valorMinimo")) valorMinimoBool=true;

            if(filtro.hasOwnProperty("valorMaximo") && g.valor<=filtro.valorMaximo){
                valorMaximoBool=true;
            } else if(!filtro.hasOwnProperty("valorMaximo") )valorMaximoBool=true;

            if(filtro.hasOwnProperty("descripcionContiene") && g.descripcion.includes(filtro.descripcionContiene)){
                descBool=true;
            } else if(!filtro.hasOwnProperty("descripcionContiene") )descBool=true;
            
            if(filtro.hasOwnProperty("etiquetasTiene")){
                if(filtro.etiquetasTiene.length!=0){
                    filtro.etiquetasTiene.forEach(et => {
                            if(g.etiquetas.includes(et) && etiquetasBool==false)etiquetasBool=true;
                    });
                }else {
                    etiquetasBool=true;
                }
            }else if(!filtro.hasOwnProperty("etiquetasTiene"))etiquetasBool=true;
            if(fechaDesdeBool && fechaHastaBool && valorMaximoBool && valorMinimoBool && etiquetasBool && descBool){
                return g;
            }
        }else return g;
    })
    return gastosFiltrados;  

}

function agruparGastos(periodoP,etiquetasP,fechaDesdeP,fechaHastaP){
    let fechaActual=new Date(Date.now());
    if(periodoP!="dia" && periodoP!="anyo") periodoP="mes";
    if(isNaN(Date.parse(fechaDesdeP)) ){
        fechaDesdeP=undefined;//Funciona->"";"1970-01-01";
    }
    if(isNaN(Date.parse(fechaHastaP)) ){
        fechaHastaP=fechaActual.getFullYear()+"-"+(fechaActual.getMonth()+1)+"-"+fechaActual.getDate();
    }
    if(etiquetasP===undefined)etiquetasP=[];
    let gastosFiltrados=[];
    let filtro={fechaDesde:fechaDesdeP,fechaHasta:fechaHastaP,etiquetasTiene:etiquetasP};
    gastosFiltrados=filtrarGastos(filtro);
    
    return gastosFiltrados.reduce(function(prev,cur){
        
        if(prev.hasOwnProperty(cur.obtenerPeriodoAgrupacion(periodoP))){
            prev[cur.obtenerPeriodoAgrupacion(periodoP)]=parseFloat(prev[cur.obtenerPeriodoAgrupacion(periodoP)])+parseFloat(cur.valor);
        }else {
            prev[cur.obtenerPeriodoAgrupacion(periodoP)]=parseFloat(cur.valor);
        }
     return prev   
    },{});

}

function transformarListadoEtiquetas(cadena){
    return cadena.split(/[ ,;:\.~]+/g);
}

function cargarGastos(gastosCargar){
    if(gastosCargar.length>=0) gastos = [...gastosCargar];
   // console.log("gastos = " + gastos);
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    borrarGasto,
    anyadirGasto,
    listarGastos,
    calcularBalance,
    calcularTotalGastos,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
    
}
