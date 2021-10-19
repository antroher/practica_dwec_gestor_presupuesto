// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
"use strict"
var presupuesto = 0;
var gastos = new Array();
var idGasto = 0;

function actualizarPresupuesto(newPresupuesto) {
    if(newPresupuesto >= 0){
        presupuesto = newPresupuesto;
    } 
    else {
        console.log("Error presupuesto negativo ");
        return -1;
    }
    return presupuesto;
}

function mostrarPresupuesto() {
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}

function listarGastos(){
    return gastos;
}

function CrearGasto(descripcion, valor, fecha = Date.now(), ...etiquetas){    
    if(valor < 0 || isNaN(valor)){
        valor = 0;
    }
    
    if(etiquetas == null){
        etiquetas = new Array();
    }
    let gasto = {
        valor : valor,
        descripcion : descripcion,
        etiquetas : [...etiquetas],
        fecha : (typeof fecha == `string`) ? Date.parse(fecha) : fecha,

        mostrarGasto : function() {
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        },

        actualizarDescripcion : function(descripcion) {
            this.descripcion = descripcion;
        },

        actualizarValor : function(valor) {
            if(valor > 0) {
                this.valor = valor;
            }
        },

        mostrarGastoCompleto : function() {
            let controlFecha;

            if (typeof this.fecha == 'string') {
                controlFecha = Date.parse(this.fecha);
            }
            else {
                controlFecha = this.fecha;
            }
            let space = "";

            for(let etiquetas2 of this.etiquetas) {
                space += `- ${etiquetas2}\n`;
            }
            let fechabien = new Date(controlFecha);

            let aux = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(fechabien.toLocaleString())}\nEtiquetas:\n`;
            return aux + space;
        },

        actualizarFecha : function (fecha) {
            if(!isNaN(Date.parse(fecha)))
            {
                this.fecha = Date.parse(fecha);
            }            
        },

        anyadirEtiquetas(...etiquetas)
        {
            let aux = etiquetas.filter((x) => {
                if (!this.etiquetas.includes(x)) {
                    return x;
                }
            });
            this.etiquetas.push(...aux);
        },

        borrarEtiquetas(...etiquetas) {
            etiquetas.forEach((x) => {
                for(let i = 0; i < this.etiquetas.length; i++) {
                    if (this.etiquetas[i] === x) {
                        this.etiquetas.splice(i, 1);
                    }
                }
            })
        }



    }

    return gasto;
}


function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto = idGasto +1;
    gastos.push(gasto);
}

function borrarGasto(id){
    for(let i = 0; i < gastos.length; i++)
    {
        if(gastos[i].id==id)
        {
            gastos.splice(i,1);
        }
    }
}

function calcularTotalGastos(){
    let total = 0;
    for(let i=0; i<gastos.length;i++)
    {
        total = total + gastos[i].valor;
    }
    return total;
}

function calcularBalance(){
    return presupuesto - calcularTotalGastos();
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
