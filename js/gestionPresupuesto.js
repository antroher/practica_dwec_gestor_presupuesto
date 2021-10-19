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
    let gasto={
        descripcion : desc,
        etiquetas : new Array(),
        valor : null,
        fecha : null
    }

    if(parseFloat(val) > 0){
        gasto.valor = val;

    }else{
        gasto.valor = 0;

    }

    if(fechaCreacion === undefined || isNaN(Date.parse(fechaCreacion))){
        gasto.fecha = new Date(Date.now()).toISOString().substring(0,16);
    }else{
        gasto.fecha = Date.parse(fechaCreacion);
    }


    if(etiqueta !== undefined){
        gasto.etiquetas = etiqueta;
    }

    gasto.mostrarGastoCompleto = function(){
        let respuesta = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`
        for(let i = 0; i < this.etiquetas.length; i++){
            respuesta += "- " + this.etiquetas[i]+`\n`
        }

        return respuesta;
    }

    gasto.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    gasto.actualizarDescripcion = function(nuevaDesc){
        this.descripcion = nuevaDesc;
    }

    gasto.actualizarValor = function(nuevoValor){
        if(parseFloat(nuevoValor) > 0){
            this.valor = nuevoValor;
        }
    }

    gasto.actualizarFecha = function(nuevaFecha){
        if(!isNaN(Date.parse(nuevaFecha))){
            this.fecha = Date.parse(nuevaFecha);
        }
    }

    gasto.anyadirEtiquetas = function(...nuevasEtiquetas){
        nuevasEtiquetas.forEach(e => {
            if(!this.etiquetas.includes(e)){
                this.etiquetas.push(e);
            }
        });
    }

    gasto.borrarEtiquetas = function(...etiquetasABorrar){
        etiquetasABorrar.forEach(b => {
            if(this.etiquetas.includes(b)){
                this.etiquetas.splice(this.etiquetas.indexOf(b),1)
            }
        });
    }

    gasto.obtenerPeriodoAgrupacion = function(periodo){
        if(periodo !== undefined){
            switch(periodo){
                case "dia":
                    return new Date(gasto.fecha).toISOString().substring(0, 10);
                case "mes":
                    return new Date(gasto.fecha).toISOString().substring(0, 7);
                case "anyo":
                    return new Date(gasto.fecha).toISOString().substring(0, 4);
            }
            
        }
    }

    return gasto;
    
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
    if(filtro !== undefined){
        let gastosFiltrados = gastos.filter(function(g){
            let fechaCorrecta = false, valorCorrecto = false, contieneDesc = false, tieneEtiq = false;
            if(filtro.hasOwnProperty('fechaDesde') && filtro.hasOwnProperty('fechaHasta')){
                if(Date.parse(filtro.fechaDesde) <= g.fecha && g.fecha <= Date.parse(filtro.fechaHasta)){
                    fechaCorrecta = true;
                }
            }else if(filtro.hasOwnProperty('fechaDesde')){
                if(Date.parse(filtro.fechaDesde) <= g.fecha){
                    fechaCorrecta = true;
                }
            }else if(filtro.hasOwnProperty('fechaHasta')){
                if(Date.parse(filtro.fechaHasta) >= g.fecha){
                    fechaCorrecta = true;
                }
            }else fechaCorrecta = true;

            if(filtro.hasOwnProperty('valorMinimo') && filtro.hasOwnProperty('valorMaximo')){
                if(filtro.valorMinimo < g.valor && g.valor < filtro.valorMaximo){
                    valorCorrecto = true;
                }
            }else if(filtro.hasOwnProperty('valorMinimo')){
                if(filtro.valorMinimo < g.valor){
                    valorCorrecto = true;
                }
            }else if(filtro.hasOwnProperty('valorMaximo')){
                if(filtro.valorMaximo > g.valor){
                    valorCorrecto = true;
                }
            }else valorCorrecto = true;

            if(filtro.hasOwnProperty('descripcionContiene')){
                if(g.descripcion.includes(filtro.descripcionContiene)){
                    contieneDesc = true;
                }
            }else contieneDesc = true;

            if(filtro.hasOwnProperty('etiquetasTiene')){
                let todas = false;
                filtro.etiquetasTiene.forEach(e => {
                    if(g.etiquetas.includes(e)){
                        todas = true;
                    }
                });

                tieneEtiq = todas;
            }else tieneEtiq = true;

            if(fechaCorrecta && valorCorrecto && contieneDesc && tieneEtiq){
                return g;
            }

        });

        if(gastosFiltrados.length == 0){
            return gastos;
        }else{
            return gastosFiltrados;
        }
    }
}

function agruparGastos(){

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
    agruparGastos
}
