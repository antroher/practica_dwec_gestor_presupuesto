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
    return (`Tu presupuesto actual es de ${x} €`);
}

function CrearGasto(descrip, valor = 0, fecha = Date.now(), ...etiquetas) {
    valor = parseFloat(valor);

    if (isNaN(valor) || valor < 0) {
        valor = 0;
    }
    const gasto = {
        valor: valor,
        descripcion: descrip,
        etiquetas: [...etiquetas],
        fecha: (typeof fecha === 'string') ? Date.parse(fecha) : fecha,
        mostrarGasto: function () {
            return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        },
        actualizarDescripcion: function (newDescrip) {
            this.descripcion = newDescrip;
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
            let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(fecha2.toLocaleString())}\nEtiquetas:\n`;
            return texto + aux;
        },
        actualizarFecha: function (newFecha) {
            let isValidDate = Date.parse(newFecha);
            if (!isNaN(isValidDate)) {
                this.fecha = Date.parse(newFecha);
            }
        },
        anyadirEtiquetas: function (...etiquetas) {
            const valoresulUnicos = etiquetas.filter((x) => {
                if (!this.etiquetas.includes(x)) {
                    return x;
                }
            });
            this.etiquetas.push(...valoresulUnicos);
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

function borrarGasto(id) {
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === id) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {
    let resulul = 0;
    gastos.forEach((x) => {
        resulul = resulul + x.valor;
    })
    return resulul;
}

function calcularBalance() {
    let resulul = calcularTotalGastos();
    let balance = presupuesto - resulul;
    return balance;
}
<<<<<<< HEAD
function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}) {
    let gastosFiltrados = gastos;  

    gastosFiltrados = gastosFiltrados.filter(function (gasto) {
=======
>>>>>>> bc15a5a331ae1d51bf8171e397a26e7f3c8d5d40

function filtrarGastos(gastoFiltrad) {
    let resul = Object.assign(gastos);

    if (typeof gastoFiltrad === 'object' && gastoFiltrad !== null && gastoFiltrad !== undefined && Object.entries(gastoFiltrad).length > 0) {
        if (gastoFiltrad.hasOwnProperty('fechaDesde') && typeof gastoFiltrad.fechaDesde === 'string') {
            resul = resul.filter((aux) => {
                return aux.fecha >= (Date.parse(gastoFiltrad.fechaDesde));
            })
        }
        if (gastoFiltrad.hasOwnProperty('fechaHasta') && typeof gastoFiltrad.fechaHasta === 'string') {
            resul = resul.filter((aux) => {
                return aux.fecha <= (Date.parse(gastoFiltrad.fechaHasta));
            })
        }
        if (gastoFiltrad.hasOwnProperty('valorMinimo') && typeof gastoFiltrad.valorMinimo === 'number') {
            resul = resul.filter((aux) => {
                return aux.valor >= gastoFiltrad.valorMinimo;
            })
        }
        if (gastoFiltrad.hasOwnProperty('valorMaximo') && typeof gastoFiltrad.valorMaximo === 'number') {
            resul = resul.filter((aux) => {

                return aux.valor <= gastoFiltrad.valorMaximo;
            })
        }
        if (gastoFiltrad.hasOwnProperty('descripcionContiene') && typeof gastoFiltrad.descripcionContiene === 'string') {
            resul = resul.filter((aux) => {
                if (aux.descripcion.includes(gastoFiltrad.descripcionContiene))
                    return true;
            })
        }

        if (gastoFiltrad.hasOwnProperty('etiquetasTiene') && Array.isArray(gastoFiltrad.etiquetasTiene)) {
            resul = resul.filter((aux) => {
                for (let i = 0; i < gastoFiltrad.etiquetasTiene.length; i++) {

<<<<<<< HEAD
            if (tiene == false)
            {
                encontrado = false;
            }
        }
        return encontrado;
    })
    return gastosFiltrados;
=======
                    if (gastoFiltrad.etiquetasTiene.includes(aux.etiquetas[i]))

                        if (aux.etiquetas.includes(gastoFiltrad.etiquetasTiene[i]))
                            return true;
                }
            })
        }
        return resul;
    }
    return gastos;
>>>>>>> bc15a5a331ae1d51bf8171e397a26e7f3c8d5d40
}
// function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}) {

//     let gastosFiltrados = gastos;  

//     gastosFiltrados = gastosFiltrados.filter(function (gasto) {

//         let encontrado = true;

//         if (fechaDesde)
//         {
//             if (gasto.fecha < Date.parse(fechaDesde))
//             {
//                 encontrado = false;
//             }
//         }

//         if (fechaHasta)
//         {
//             if (gasto.fecha > Date.parse(fechaHasta))
//             {
//                 encontrado = false;
//             }
//         }

//         if (valorMinimo)
//         {
//             if (gasto.valor < valorMinimo)
//             {
//                 encontrado = false;
//             }
//         }

//         if (valorMaximo)
//         {
//             if (gasto.valor > valorMaximo)
//             {
//                 encontrado = false;
//             }
//         }
        
//         if (descripcionContiene)
//         {
//             if (!gasto.descripcion.includes(descripcionContiene))
//             {
//                 encontrado = false;
//             }
//         }

//         if (etiquetasTiene)
//         {
//             let tiene = false
//             for (let i = 0; i < gasto.etiquetas.length; i++)
//             {
//                 for (let j = 0; j < etiquetasTiene.length; j++)
//                 {
//                     if (gasto.etiquetas[i] == etiquetasTiene[j])
//                     {
//                         tiene = true;
//                     }
//                 }
//             }

//             if (tiene == false)
//             {
//                 encontrado = false;
//             }
//         }
//         return encontrado;
//     })

//     return gastosFiltrados;
// }

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta) {
    let etiquetasTiene = etiquetas;

    if (!fechaDesde)
    {
        fechaDesde = "2000-01-01";
    }

    if (!fechaHasta)
    {
        fechaHasta = new Date(Date.now()).toISOString().substr(0,10);
    }

    let grupoGastos = filtrarGastos({fechaDesde, fechaHasta, etiquetasTiene})
    let resulul = grupoGastos.reduce((acc, grupo) => { 
        
        acc[grupo.obtenerPeriodoAgrupacion(periodo)] = (acc[grupo.obtenerPeriodoAgrupacion(periodo)] || 0) + grupo.valor; 
        return acc;
    
    } , {});
    return resulul;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombresul que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
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