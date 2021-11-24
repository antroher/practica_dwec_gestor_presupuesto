"use strict";
// Variables globales   -------------------------------------------------------------------------------
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

// Funciones        -----------------------------------------------------------------------------------
function actualizarPresupuesto(value){
    
    if(isNaN(value) || value < 0){
        console.error("Error. Número no válido");
        return -1;
    }else{
        presupuesto = value;       
    }
    return presupuesto;
}

function mostrarPresupuesto(){
    
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion = "No hay descripción", valor = 0, fecha = Date.now(), ...etiquetas){
    
    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? valor : 0;
    if(isNaN(Date.parse(fecha))){
        this.fecha = Date.now();
    }else{
        this.fecha = Date.parse(fecha);
    }
    this.etiquetas = [];

    this.mostrarGasto = function(){
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    };
    this.actualizarDescripcion = function(desc){
        this.descripcion = desc;
    };
    this.actualizarValor = function(value){
        if(value >= 0){
            this.valor = value;      
        }
    };
    
    this.mostrarGastoCompleto = function(){
        let lasEtiquetas = "";
        for(let etiqueta of this.etiquetas){
            lasEtiquetas += `- ${etiqueta}\n`;
        }

        let fechaloc = new Date(this.fecha).toLocaleString();
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
            texto += `Fecha: ${fechaloc}\n`;
            texto += `Etiquetas:\n${lasEtiquetas}`;
        return texto;
    }
    this.actualizarFecha = function(fecha){
        if(!isNaN(Date.parse(fecha))){
            this.fecha = Date.parse(fecha);
        }
    };
    this.anyadirEtiquetas = function(...etiquetas){
        for(let etiqueta of etiquetas){
            if(this.etiquetas.includes(etiqueta) == false){
                this.etiquetas.push(etiqueta);
            }
        }
    }
    //anyadirEtiquetas comprueba que no se creen duplicados
    this.anyadirEtiquetas(...etiquetas);

    this.borrarEtiquetas = function(...etiquetas){
        for(let etiqueta of etiquetas){
            let index = this.etiquetas.indexOf(etiqueta);
            if(index != -1){
                this.etiquetas.splice(index,1);
            }
        }
    }
    
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    if(typeof(gasto) === "object"){
        gasto.id = idGasto;
        gastos.push(gasto);
        idGasto++;
    }
}

function borrarGasto(idBuscar){
    if(typeof idBuscar == 'number' && idBuscar >= 0){
        let index = gastos.indexOf(gastos.find(item=>item.id == idBuscar));
        if(index != -1){
            gastos.splice(index,1);
        }
    }
}

function calcularTotalGastos(){
    let total = 0;
    for(let item of gastos){
        total += item.valor;
    }
    return total;
}

function calcularBalance(){
    const balance = presupuesto - calcularTotalGastos();
    return balance;
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
    calcularBalance
}
