"use strict"

var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(newPresupuesto) {
    let newVal;

    if (newPresupuesto >= 0) {
        presupuesto = newPresupuesto;
        newVal = presupuesto;
    } else {
        console.log("Error. Valor introducido no valido.");
        newVal = -1;
    }
    return newVal;
}

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {  
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === id) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {
    let result = 0;
    gastos.forEach((x) => {
        result = result + x.valor;
    })
    return result;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos({fechaD, fechaH, valorMin, valorMax, descripcion, etiquetas}){
    let gastosFiltrados;
    gastosFiltrados = gastos.filter(function(gasto){
     let existe = true;
     if(fechaD){
         if(gasto.fecha < Date.parse(fechaD)) existe = false;
     }
     if(fechaH){
         if(gasto.fecha > Date.parse(fechaH)) existe = false;
     }
     if(valorMin){
         if(gasto.valor < valorMin) existe = false;
     }
     if(valorMax){
         if(gasto.valor > valorMax) existe = false;
     }
     if(descripcion){
             if(!gasto.descripcion.includes(descripcion)) existe = false;
     }
     if(etiquetas){
         let inside = false;                   
             for (let i = 0; i < gasto.etiquetas.length; i++) {                   
                 for (let j= 0; j < etiquetas.length; j++) {
                     if(gasto.etiquetas[i] == etiquetas[j]) inside = true;                  
                 }
             }
        if(inside == false) existe = false;
     }
         return existe;
    });
return gastosFiltrados;  
}

function agruparGastos(periodo = "mes", etiquetas, fechaD, fechaH) {
    let filtrador = {etiquetas : etiquetas, fechaD : fechaD, fechaH : fechaH}
    let returnFiltrarGastos = filtrarGastos(filtrador);
    let groupBy =
            returnFiltrarGastos.reduce((acc, item) => {
                let periodoReduce = item.periodoAgr(periodo);
                if (acc[periodoReduce] == null)
                    acc[periodoReduce] = item.valor;
                else 
                    acc[periodoReduce] += item.valor;
                return acc;
            }, {});
    return groupBy;
}

function CrearGasto(descripcion, valor = 0, fecha = Date.now(), ...etiquetas) {
    valor = parseFloat(valor);
    
    if (isNaN(valor) || valor < 0) {
        valor = 0;
    }

    this.valor = valor
    this.descripcion = descripcion
    this.etiquetas = [...etiquetas]
    this.fecha = (typeof fecha === 'string') ? Date.parse(fecha) : fecha

    this.mostrarGasto = function() {
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.actualizarDes = function(newDescripcion) {
        this.descripcion = newDescripcion;
    }

    this.actualizarVal = function(newVal) {
        if (newVal >= 0) {
            this.valor = newVal;
        }
    }

    this.mostrarGasCom = function() {
        let fecha1;
        if(typeof this.fecha === 'string')
        {
            fecha1 = Date.parse(this.fecha);
        }
        else{
            fecha1 = this.fecha;
        }
        let aux = "";
        for(let etiqueta of this.etiquetas) {
            aux = aux + `- ${etiqueta}\n`;
        };

        let fecha2 = new Date(fecha1);

        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(fecha2.toLocaleString())}\nEtiquetas:\n`;
        return texto + aux;
    }

    this.actualizarFecha = function(newFecha) {
        let isValidDate = Date.parse(newFecha);
        if (!isNaN(isValidDate)) {
            this.fecha = Date.parse(newFecha);
        } 
    }

    this.anyadirEtiquetas = function(...etiquetas) {
        const valoresUnicos = etiquetas.filter((x) => {
            if (!this.etiquetas.includes(x)) {
                return x;
            }
        });
        this.etiquetas.push(...valoresUnicos);
    }

    this.borrarEtiquetas = function(...etiquetas) {
        etiquetas.forEach((x) => {
            for (let i = 0; i < this.etiquetas.length; i++) {
                if (this.etiquetas[i] === x) {
                    this.etiquetas.splice(i, 1);
                }
            }
        })
    }

    this.periodoAgr = function(periodo) {
        let validarFecha = new Date(this.fecha);
        switch(periodo) {
            case "dia": { 
                if (validarFecha.getDate() < 10) {
                    if (validarFecha.getMonth() < 9) {
                        return `${validarFecha.getFullYear()}-0${validarFecha.getMonth()+1}-0${validarFecha.getDate()}`;
                    }
                    else {
                        return `${validarFecha.getFullYear()}-${validarFecha.getMonth()+1}-0${validarFecha.getDate()}`;
                    }
                }
                else {
                    if (validarFecha.getMonth() < 9) {
                        return `${validarFecha.getFullYear()}-0${validarFecha.getMonth()+1}-${validarFecha.getDate()}`;    
                    }
                    else {
                        return `${validarFecha.getFullYear()}-${validarFecha.getMonth()+1}-${validarFecha.getDate()}`;
                    }
                }
                break;
            }
            case "mes": {
                if(validarFecha.getMonth() < 9) {
                    return `${validarFecha.getFullYear()}-0${validarFecha.getMonth()+1}`;
                }
                else {
                    return `${validarFecha.getFullYear()}-${validarFecha.getMonth()+1}`;
                }
                break;
            }
            case "anyo": {
                return `${validarFecha.getFullYear()}`
                break;
            }
            default:{
                return `Periodo no válido`;
            }
        }
    }
}

function transformarListadoEtiquetas(input) {
    let etiquetasFin = input.match(/[a-z0-9]+/gi);
    return etiquetasFin;
}

function cargarGastos(nuevosGastos) {
    gastos = [];

    for (let g of nuevosGastos) {
        let gastoReh = new CrearGasto();
        Object.assign(gastoReh, g);

        gastos.push(gastoReh)
    }
}

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