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

function CrearGasto(descripcionEntrante, valorEntrante, fechaEntrante, ...etiquetasEntrante) {
    if (valorEntrante < 0 || isNaN(valorEntrante)) {
        valorEntrante = 0;
    }
    if (etiquetasEntrante === "") {
        etiquetasEntrante = []
    }
    if (fechaEntrante === "" || typeof fechaEntrante !== "string") {
        let fechaObjeto = new Date();
        let fechaActual = fechaObjeto.getDate() + "/" + (fechaObjeto.getMonth() + 1) + "/" + fechaObjeto.getFullYear() + "T" + 
            fechaObjeto.getHours() + ":" + fechaObjeto.getMinutes();
        fechaEntrante = Date.parse(fechaActual);
    }
    else if (isNaN(Date.parse(fechaEntrante))){
        let fechaObjeto = new Date();
        let fechaActual = fechaObjeto.getDate() + "/" + (fechaObjeto.getMonth() + 1) + "/" + fechaObjeto.getFullYear() + "T" + 
            fechaObjeto.getHours() + ":" + fechaObjeto.getMinutes();
        fechaEntrante = Date.parse(fechaActual);
    }
    else {
        fechaEntrante = Date.parse(fechaEntrante);
    }
    
    let gasto = {
        descripcion: descripcionEntrante,
        valor: parseFloat(valorEntrante),
        etiquetas: etiquetasEntrante.toLocaleString(),
        fecha: fechaEntrante,

        mostrarGastoCompleto() {
            console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n
                Fecha: ${this.fecha}\n
                Etiquetas: `);
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €\n
                Fecha: ${this.fecha}`;
        },
        
        actualizarFecha(nuevaFecha) {
            if (!isNaN(Date.parse(nuevaFecha)))
            {
                this.fecha = nuevaFecha;
            }
        },

        anyadirEtiquetas(...nuevasEtiquetas) {
            for (let i = 0; i < nuevasEtiquetas.length; i++) {
                if(this.etiquetas.includes(nuevasEtiquetas[i])) {
                    break;
                }
                this.etiquetas.push(nuevasEtiquetas[i]);
            }
        },

        borrarEtiquetas(...etiquetasABorrar) {
            for (let i = 0; i < nuevasEtiquetas.length; i++) {
                if(etiquetasABorrar.includes(this.etiquetas[i])) {
                    this.etiquetas.splice(i, 1);
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
