// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict";


var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(cant) {
    let cant2;

    if (cant >= 0) {
        presupuesto = cant;
        cant2 = presupuesto;
    }
    else {
        console.log("ERROR. El valor introducido no es válido.");
        cant2 = -1;
    }
    return cant2;
}

function mostrarPresupuesto() {

    let x = presupuesto;
    return (`Presupuesto actual: ${x} €`);
}

function CrearGasto(descrip, valor = 0, fecha = Date.now(), ...etiquetas) {
    valor = parseFloat(valor);

    if (isNaN(valor) || valor < 0) {
        valor = 0;
    }
    const gasto = {
        valor: valor,
        descrip: descrip,
        etiquetas: [...etiquetas],
        fecha: (typeof fecha === 'string') ? Date.parse(fecha) : fecha,
        mostrarGasto: function () {
            return (`Este gasto corresponde a ${this.descrip} con valor ${this.valor} €`);
        },
        actualizardescrip: function (newDescrip) {
            this.descrip = newDescrip;
        },
        actualizarValor: function (newValor) {
            if (newValor >= 0) {
                this.valor = newValor;
            }
        },
        mostrarGastoCompleto: function () {
            let fecha1;
            if (typeof this.fecha === 'string') {
                fecha1 = Date.parse(this.fecha);
            }
            else {
                fecha1 = this.fecha;
            }
            let aux = "";
            for (let etiqueta of this.etiquetas) {
                aux = aux + `- ${etiqueta}\n`;
            };
            let fecha2 = new Date(fecha1);
            let texto = `Este gasto corresponde a ${this.descrip} con valor ${this.valor} €.\nFecha: ${(fecha2.toLocaleString())}\nEtiquetas:\n`;
            return texto + aux;
        },
        actualizarFecha: function (newFecha) {
            let isValidDate = Date.parse(newFecha);
            if (!isNaN(isValidDate)) {
                this.fecha = Date.parse(newFecha);
            }
        },
        anyadirEtiquetas: function (...etiquetas) {
            const valoresUnicos = etiquetas.filter((x) => {
                if (!this.etiquetas.includes(x)) {
                    return x;
                }
            });
            this.etiquetas.push(...valoresUnicos);
        },
        borrarEtiquetas: function (...etiquetas) {
            etiquetas.forEach((x) => {
                for (let i = 0; i < this.etiquetas.length; i++) {
                    if (this.etiquetas[i] === x) {
                        this.etiquetas.splice(i, 1);
                    }
                }
            })
        },
        obtenerPeriodoAgrupacion: function (periodo) {
            let validarFech = new Date(this.fecha);
            switch (periodo) {
                case "dia": {
                    if (validarFech.getDate() < 10) {
                        if (validarFech.getMonth() < 9) {
                            return `${validarFech.getFullYear()}-0${validarFech.getMonth() + 1}-0${validarFech.getDate()}`;
                        }
                        else {
                            return `${validarFech.getFullYear()}-${validarFech.getMonth() + 1}-0${validarFech.getDate()}`;
                        }
                    }
                    else {
                        if (validarFech.getMonth() < 9) {
                            return `${validarFech.getFullYear()}-0${validarFech.getMonth() + 1}-${validarFech.getDate()}`;
                        }
                        else {
                            return `${validarFech.getFullYear()}-${validarFech.getMonth() + 1}-${validarFech.getDate()}`;
                        }
                    }
                    break;
                }
                case "mes": {
                    if (validarFech.getMonth() < 9) {
                        return `${validarFech.getFullYear()}-0${validarFech.getMonth() + 1}`;
                    }
                    else {
                        return `${validarFech.getFullYear()}-${validarFech.getMonth() + 1}`;
                    }
                    break;
                }
                case "anyo": {
                    return `${validarFech.getFullYear()}`
                    break;
                }
                default: {
                    return `EL PERIODO NO ES VÁLIDO`;
                }
            }
        }
    }
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

function borrarGasto(id) {
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === id) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {
    let resul = 0;
    gastos.forEach((x) => {
        resul = resul + x.valor;
    })
    return resul;
}

function calcularBalance() {
    let resul = calcularTotalGastos();
    let balance = presupuesto - resul;
    return balance;
}

function agruparGastos() {
    
}

function filtrarGastos(filtros) {
    let resul = gastos.filter(item => item.descrip == filtros.descripContiene);

    resul = gastos.filter(item => item.valor > filtros.valorMinimo);
    resul = gastos.filter(item => item.valor < filtros.valorMaximo);
    resul = gastos.filter(item => item.fecha.getMilliseconds() > filtros.fechaDesde.getMilliseconds());
    resul = gastos.filter(item => item.fecha.getMilliseconds() < filtros.fechaHasta.getMilliseconds());

    for (let i = 0; i < filtros.etiquetasTiene.length; i++) {
        for (let j = 0; j < gastos.length; j++) {
            if (gastos[i].etiquetas.includes(filtros.etiquetasTiene[j])) {
                resuls.push(gastos[i])
            }
        }
    }
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    crearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
}