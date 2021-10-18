import { strict } from "assert";

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
'use strict'

var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(valor) {
    if (valor >= 0) {
        presupuesto = valor;
    } else {
       console.log('Error. Presupuesto negativo');
       valor = -1;
    }
    return valor;
}

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(desc, val, fec = Date.now(), ...eti) {
    if (parseFloat(val) < 0 || isNaN(val)) {
        val = 0;
    }

    if (eti === "") {
        this.etiqueta = [];
    }

    if (fec === "") {
        this.fecha = getDate();
    }

    let gasto = {
	    descripcion: desc,
        valor : val,
        fecha : (typeof fec === 'string') ? Date.parse(fec) : fec,
        etiquetas : [...eti],
         
        mostrarGasto : function (){
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
            
        },

        actualizarDescripcion : function(descr) {
            this.descripcion = descr;
        },

        actualizarValor : function(vall) {
            if (parseFloat(vall) >= 0)
            {
                this.valor = parseFloat(vall);
            }
        },

        actualizarFecha : function(fech) {
            if (!isNaN(Date.parse(fech))) {
            this.fecha = Date.parse(fech);
            }
        },

        anyadirEtiqueta : function(...etiq) {
            const aux = etiq.filter((x) => {
                if (!this.etiquetas.includes(x)) {
                    return x;
                }
            });
            this.etiq.push(...aux);
        },

        borrarEtiquetas(...etiquetas) {
            etiquetas.forEach((x) => {
                for (let i = 0; i < this.etiquetas.length; i++) {
                    if (this.etiquetas[i] === x) {
                        this.etiquetas.splice(i, 1);
                    }
                }
            })
        },

        mostrarGastoCompleto() {
            let fec1;
            if(typeof this.fecha === 'string') {
                fec1 = Date.parse(this.fecha);
            } else {
                fec1 = this.fecha;
            }
            let aux = "";
            for(let etiq of this.etiquetas) {
                aux = aux + `- ${etiq}\n`;
            };
            let fec2 = new Date(fec1);
            let aux2 = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(fec2.toLocaleString())}\nEtiquetas:\n`;
            return aux2 + aux;
        }
    };
    return gasto;
}

function listarGastos() {
   return gastos;
}

function anyadirGasto(gast) {
    gast.id = idGasto;
    idGasto += 1;
    gastos.push(gast);
}

function borrarGasto() {
    for (let i = 0; i < gastos.length; i++)
    {
        if(gastos[i].id === id) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
        total += gastos[i].valor;
    }
    return total;
}

function calcularBalance() {
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
