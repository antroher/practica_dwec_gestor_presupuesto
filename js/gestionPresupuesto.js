"Use strict"
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = new Array();
var idGasto = 0;

function actualizarPresupuesto(valor) {
    if(parseFloat(valor) > 0){
        presupuesto = valor;
        return presupuesto;
    }else{
        console.log("El valor introducido es un n\xfamero negativo.")
        return -1;
    }
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " +presupuesto + " €";
}

function CrearGasto(desc, val, fechaCreacion , ...etiqueta) {

    this.descripcion = desc;

    if(parseFloat(val) > 0){
        this.valor = val;

    }else{
        this.valor = 0;

    }

    if(fechaCreacion === undefined || isNaN(Date.parse(fechaCreacion))){
        this.fecha = new Date(Date.now()).toISOString().substring(0,16);
    }else{
        this.fecha = Date.parse(fechaCreacion);
    }


    if(etiqueta !== undefined){
        this.etiquetas = etiqueta;
    }

    this.mostrarGastoCompleto = function(){
        let respuesta = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`
        for(let i = 0; i < this.etiquetas.length; i++){
            respuesta += "- " + this.etiquetas[i]+`\n`
        }

        return respuesta;
    };

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(nuevaDesc){
        this.descripcion = nuevaDesc;
    };

    this.actualizarValor = function(nuevoValor){
        if(parseFloat(nuevoValor) > 0){
            this.valor = nuevoValor;
        }
    };

    this.actualizarFecha = function(nuevaFecha){
        if(!isNaN(Date.parse(nuevaFecha))){
            this.fecha = Date.parse(nuevaFecha);
        }
    };

    this.anyadirEtiquetas = function(...nuevasEtiquetas){
        nuevasEtiquetas.forEach(e => {
            if(!this.etiquetas.includes(e)){
                this.etiquetas.push(e);
            }
        });
    };

    this.borrarEtiquetas = function(...etiquetasABorrar){
        etiquetasABorrar.forEach(b => {
            if(this.etiquetas.includes(b)){
                this.etiquetas.splice(this.etiquetas.indexOf(b),1)
            }
        });
    };

    this.obtenerPeriodoAgrupacion = function(periodo){
        if(periodo !== undefined){
            switch(periodo){
                case "dia":
                    return new Date(this.fecha).toISOString().substring(0, 10);
                case "mes":
                    return new Date(this.fecha).toISOString().substring(0, 7);
                case "anyo":
                    return new Date(this.fecha).toISOString().substring(0, 4);
            }
            
        }
    };

    
}

function listarGastos(){
    return gastos;
}



function anyadirGasto(gastoPasado){
    gastoPasado.id = idGasto;
    gastos.push(gastoPasado);
    idGasto++;
}

function borrarGasto(idBorrar){
    gastos.forEach(g => {
        if(g.id == idBorrar){
            gastos.splice(gastos.indexOf(g),1);
        }
    });

}

function calcularTotalGastos(){
    let totalGastos = 0;
    gastos.forEach(g => {
        totalGastos += g.valor;
    });
    return totalGastos;
}

function calcularBalance(){
    let gastosTotales = calcularTotalGastos();
    return (presupuesto - gastosTotales)
}

function filtrarGastos(filtro){
    if(filtro !== undefined || Object.entries(filtro != 0)){
        let gastosFiltrados = gastos.filter((gast) => {
            if (filtro.hasOwnProperty("fechaDesde")) {
              if (gast.fecha < Date.parse(filtro.fechaDesde)) {
                return;
              }
            }
      
            if (filtro.hasOwnProperty("fechaHasta")) {
              if (gast.fecha > Date.parse(filtro.fechaHasta) ) {
                return;
              }
            }
      
            if (filtro.hasOwnProperty("valorMinimo")) {
              if (gast.valor < filtro.valorMinimo) {
                return;
              }
            }
      
            if (filtro.hasOwnProperty("valorMaximo")) {
              if (gast.valor > filtro.valorMaximo) {
                return;
              }
            }
      
            if (filtro.hasOwnProperty("descripcionContiene")) {
              if (!gast.descripcion.includes(filtro.descripcionContiene)) {
                return;
              }
            }
            if (filtro.hasOwnProperty("etiquetasTiene") && filtro.etiquetasTiene !== undefined) {
              if ( filtro.etiquetasTiene.length != 0){
              let check = false;
              for (let des of filtro.etiquetasTiene) {
                if (gast.etiquetas.includes(des)) {
                  check = true;
                }
              }
              if (!check) {
                return;
              }
            }
          }
            return gast;
          });

        if(gastosFiltrados.length === 0){
            return gastos;
        }else{
            return gastosFiltrados;
        }
    }
}



function agruparGastos(periodoAgrupar, etiquetasArupar, fechaDesdeAgrupar, fechaHastaArupar){
    
    if(!Date.parse(fechaDesdeAgrupar) || typeof fechaDesdeAgrupar !== "string"){
        fechaDesdeAgrupar = undefined;
    }
    if(!Date.parse(fechaHastaArupar) || typeof fechaHastaArupar !== "string"){
        fechaHastaArupar = new Date(Date.now()).toISOString().substring(0,10);
    }
    
    if(periodoAgrupar != "dia" && periodoAgrupar != "anyo") periodoAgrupar = "mes";

    let filtroAgrupar = {
        fechaDesde : fechaDesdeAgrupar,
        fechaHasta : fechaHastaArupar,
        etiquetasTiene : etiquetasArupar
    }

    let gastosAAgrupar = new Array();

    gastosAAgrupar = filtrarGastos(filtroAgrupar);

    
    return gastosAAgrupar.reduce(function(prev, current){

        let fechaReduce = current.obtenerPeriodoAgrupacion(periodoAgrupar);

        if(prev.hasOwnProperty(fechaReduce))prev[fechaReduce] += current.valor;
        else prev[fechaReduce] = current.valor;
        
        return prev;
    }, {})
    
}

function transformarListadoEtiquetas(cadena){
    return cadena.split(/[ ,;:\.~]+/g); //la g = busca todas las coincidencias i = case insensitive (indierenia entre mayusc y minusc)
}


function cargarGastos(gastosCargar){
    if(gastosCargar.length >= 0){
        gastos = [...gastosCargar];
    }
    console.log(gastosCargar);
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
}
