"use strict";

var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(valor) {
    let valorDevuelto = 0;

    if (valor < 0 || isNaN(valor)) {
        console.log("El valor introducido es negativo e incorrecto.");
        valorDevuelto = -1;
    }
    else {
        presupuesto = valor;
        valorDevuelto = valor;
    }

    return valorDevuelto;
}

function mostrarPresupuesto() {
    console.log(`Tu presupuesto actual es de ${presupuesto} €`);
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcionEntrante, valorEntrante = 0, fechaEntrante = Date.now(), ...etiquetasEntrante) {
    if (valorEntrante < 0 || isNaN(valorEntrante)) {
        valorEntrante = 0;
    }
    if (typeof fechaEntrante === "string") {
        if (isNaN(Date.parse(fechaEntrante))) {
            fechaEntrante = Date.now();
        }
        else {
            fechaEntrante = Date.parse(fechaEntrante);
        }
    }
    let gasto = {
        descripcion: descripcionEntrante,
        valor: parseFloat(valorEntrante),
        etiquetas: [...etiquetasEntrante],
        fecha: fechaEntrante,

        mostrarGasto() {
            console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        },

        mostrarGastoCompleto() {
            let cadenaCompleta = "";
            let cadenaFecha = new Date(this.fecha).toLocaleString();
            cadenaCompleta += `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${cadenaFecha}\nEtiquetas:\n`;
            for (let i = 0; i < this.etiquetas.length; i++) {
                cadenaCompleta += `- ${this.etiquetas[i]}\n`
            }
            console.log(cadenaCompleta);
            return cadenaCompleta;
        },

        anyadirEtiquetas(...nuevasEtiquetas) {
            for (let i = 0; i < nuevasEtiquetas.length; i++) {
                if(this.etiquetas.includes(nuevasEtiquetas[i])) {
                    continue;
                }
                this.etiquetas.push(nuevasEtiquetas[i]);
            }
        },

        borrarEtiquetas(...etiquetasABorrar) {
            for (let i = 0; i < etiquetasABorrar.length; i++) {
                for (let f = 0; f < this.etiquetas.length; f++) {
                    if (etiquetasABorrar[i] === this.etiquetas[f]){
                        this.etiquetas.splice(f, 1);
                    }
                }
            }
        },

        actualizarDescripcion(nuevaDescripcion) {
            this.descripcion = nuevaDescripcion;
        },

        actualizarValor(nuevoValor) {
            if (nuevoValor >= 0) {
                this.valor = nuevoValor;
            }
        },
        
        actualizarFecha(nuevaFecha) {
            if (!isNaN(Date.parse(nuevaFecha)))
            {
                this.fecha = Date.parse(nuevaFecha);
            }
        },

        obtenerPeriodoAgrupacion(periodo) {
            let fechaGasto = new Date(this.fecha);
            let fechaCadena = "";
            let month = (fechaGasto.getMonth() < 10) ? `0${fechaGasto.getMonth() + 1}` : `${fechaGasto.getMonth() + 1}` 
            switch(periodo) {
                case "dia":
                    fechaCadena += `${fechaGasto.getFullYear()}-${month}-0${fechaGasto.getDate()}`
                    return fechaCadena;
                case "mes":
                    fechaCadena += `${fechaGasto.getFullYear()}-${month}`
                    return fechaCadena;
                case "anyo":
                    fechaCadena += `${fechaGasto.getFullYear()}`
                    return fechaCadena;
                default:
                    return "Periodo incorrecto";
            };
        }
    };

    return gasto;
} 

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(idEntrante) {
    for(let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === idEntrante) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {
    let acumulado = 0;

    for (let i = 0; i < gastos.length; i++) {
        acumulado += gastos[i].valor;
    }

    return acumulado;
}

function calcularBalance() {
    return (presupuesto - calcularTotalGastos())
}

function filtrarGastos() {

}

function agruparGastos() {

}

let gasto1 = new CrearGasto("Gasto 1", 23.55, "2021-09-06", "casa", "supermercado" );

gasto1.obtenerPeriodoAgrupacion("dia");
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
