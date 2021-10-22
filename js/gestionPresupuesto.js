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

            switch(periodo) {
                case "dia":
                    return `${
                        fechaGasto.getFullYear()}-${
                            (fechaGasto.getMonth() < 10) ? `0${fechaGasto.getMonth() + 1}` : `${fechaGasto.getMonth() + 1}`}-${
                                (fechaGasto.getDate() < 10) ? `0${fechaGasto.getDate()}` : `${fechaGasto.getDate()}`}`;
                case "mes":
                    return `${
                        fechaGasto.getFullYear()}-${
                            (fechaGasto.getMonth() < 10) ? `0${fechaGasto.getMonth() + 1}` : `${fechaGasto.getMonth() + 1}`}`
                case "anyo":
                    return `${
                        fechaGasto.getFullYear()}`
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

function filtrarGastos({fechaDesde, fechaHasta, valorMinimo,
                        valorMaxima, descripcionContiene, ...etiquetasTiene}) {
    
    //Creación de objeto filtro para los subsiguientes filter.                            
    let filtro = {
        fFechaDesde: (!isNaN(Date.parse(fechaDesde))) ? Date.parse(fechaDesde) : undefined,
        fFechaHasta: (!isNaN(Date.parse(fechaHasta))) ? Date.parse(fechaHasta) : undefined,
        fValorMinimo: valorMinimo,
        fValorMaximo: valorMaxima,
        fDescripcionContiene: descripcionContiene,
        fEtiquetasTiene: [...etiquetasTiene]
    }

    //Comprobación de si el objeto esta "vacío".
    let isEmpty = false;
    let valoresFiltro = Object.values(filtro);
    valoresFiltro.forEach((value)=> {
        if (typeof value === undefined){
            isEmpty = true;
        }
    });

    //Empiezan los filtros.
    if (isEmpty === true) { //Si esta vacío se devuelve un array vacío.
        return filtroDevuelto = [];
    }
    else {
        let arrayFechas = gastos.filter((gasto) => {
            return filtro.fFechaDesde <= gasto.fecha;
        });
    }
    
    
}

function agruparGastos() {

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
