"use strict"

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(newPresupuesto) {
    let newValor;

    if (newPresupuesto >= 0) {
        presupuesto = newPresupuesto;
        newValor = presupuesto;
    } else {
        console.log("Error. Valor introducido no valido.");
        newValor = -1;
    }
    return newValor;
}

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

//******Práctica 2****** */
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

function filtrarGastos(gastosFilter) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    //Deep clone
    //let gastosFiltrados = JSON.parse(JSON.stringify(gastos));
    let gastosFiltrados = Object.assign(gastos);
    console.log("Miau1")
    if (typeof gastosFilter === 'object' && gastosFilter !== null && gastosFilter !== undefined && Object.entries(gastosFilter).length > 0) {
        console.log("Miau2")
        if (Object.hasOwn(gastosFilter, 'fechaDesde') && typeof gastosFilter.fechaDesde === 'string') {
            gastosFiltrados = gastosFiltrados.filter((x) => {
                return x.fecha >= (Date.parse(gastosFilter.fechaDesde))
            })
        }
        console.log("Fecha Desde " + gastosFiltrados)

        if (Object.hasOwn(gastosFilter, 'fechaHasta') && typeof gastosFilter.fechaHasta === 'string') {
            gastosFiltrados = gastosFiltrados.filter((x) => {
                return x.fecha <= Date.parse(gastosFilter.fechaHasta);
            })
        }
        console.log("Fecha Hasta " + gastosFiltrados)

        if (Object.hasOwn(gastosFilter, 'valorMinimo') && typeof gastosFilter.valorMinimo === 'number') {
            gastosFiltrados = gastosFiltrados.filter((x) => {
                return x.valor >= gastosFilter.valorMinimo
            })
        }
        console.log("Valor Minimo " + gastosFiltrados)

        if (Object.hasOwn(gastosFilter, 'valorMaximo') && typeof gastosFilter.valorMaximo === 'number') {
            gastosFiltrados = gastosFiltrados.filter((x) => {
                
                return x.valor <= gastosFilter.valorMaximo
            })
        }
        console.log("Fecha Maximo " + gastosFiltrados)

        if (Object.hasOwn(gastosFilter, 'descripcionContiene') && typeof gastosFilter.descripcionContiene === 'string') {
            gastosFiltrados = gastosFiltrados.filter((x) => {
                let param1 = (x.descripcion).toLowerCase();
                let param2 = (gastosFilter.descripcionContiene).toLowerCase();
                let param1Array = param1.split(" ");
                let param1ArrayJoin = param1Array.join('');
                if (param1ArrayJoin.indexOf(param2) !== -1) 
                    return true;
            })
        }

        if (Object.hasOwn(gastosFilter, 'etiquetasTiene') && Array.isArray(gastosFilter.etiquetasTiene)) {
            console.log("vaya, parece QUE SI ES UN ARRAY")
            gastosFiltrados = gastosFiltrados.filter((x) => {
                for (let i = 0; i < gastosFilter.etiquetasTiene.length; i++) {
                    for  (let gsFilt of gastosFilter.etiquetasTiene) {
                        console.log(gsFilt)
                        if (gsFilt === x.etiquetas[i]) {
                            return true;
                        }
                    }
                }
            })
        }
        return gastosFiltrados;
    }
    return gastos;
}
    // if (!gastosFilter === {} || !isNaN(Date.parse(gastosFilter.fechaDesde))) {
    //     gastosFiltrados = gastos.filter((x) => {
    //         let a = Date.parse(gastosFilter.fechaDesde); 
    //         return a > x.fecha;
    //     })
    //     console.log(`Gastos filtrados: ` + gastosFiltrados.length)
    //     console.log(`Gastos: ` + gastos.length)
    //     gastosFiltrados = gastosFiltrados.filter((x) => {
    //         return Date.parse(gastosFilter.fechaHasta) < x.fecha
    //     })
    //     gastosFiltrados = gastosFiltrados.filter((x) => {
    //         return gastosFilter.valorMinimo > x.valor
    //     })
    //     gastosFiltrados = gastosFiltrados.filter((x) => {
    //         return gastosFilter.valorMaximo < x.valor
    //     })
    //     gastosFiltrados = gastosFiltrados.filter((x) => {
    //         return (x.descripcion).includes(gastosFilter.descripcion)
    //     })
    //     gastosFiltrados = gastosFiltrados.filter((x) => {
    //         for (let i = 0; i < gastosFilter.length; i++) {
    //             return gastosFilter.etiquetasTiene.find(x.etiquetas[i])
    //         }
    //     })

        
    // let gastosFiltrados;
    // if (!gastosFilter === [] || !gastosFilter === undefined) {
    //     gastosFiltrados = gastos.filter((x) => {
    //         gastosFilter.fechaDesde > x.fecha
    //     })
    //     gastosFiltrados = gastosFiltrados.filter((x) => {
    //         gastosFilter.fechaHasta < x.fecha
    //     })
    //     gastosFiltrados = gastosFiltrados.filter((x) => {
    //         gastosFilter.valorMinimo > x.valor
    //     })
    //     gastosFiltrados = gastosFiltrados.filter((x) => {
    //         gastosFilter.valorMaximo < x.valor
    //     })
    //     gastosFiltrados = gastosFiltrados.filter((x) => {
    //         (x.descripcion).includes(gastosFilter.descripcion)
    //     })
    //     gastosFiltrados = gastosFiltrados.filter((x) => {
    //         for (let i = 0; i < gastosFilter.length; i++) {
    //             gastosFilter.etiquetasTiene.find(x.etiquetas[i])
    //         }
    //     })
    //     return gastosFiltrados;
    // } 
    //     return gastos;
    // if (!gastosFilter === [] || !gastosFilter === undefined) {
    //     const gastosFiltrados = gastos.filter((x) => {
    //     if (gastosFilter.fechaDesde < x.fecha) {
    //         return true;
    //     }
    //     if (gastosFilter.fechaHasta > x.fecha) {
    //         return true;
    //     }
    //     if (gastosFilter.valorMinimo < x.valor) {
    //         return true;
    //     }
    //     if (gastosFilter.valorMaximo > x.valor) {
    //         return true;
    //     }
    //     if ((gastosFilter.descripcion).includes(x.descripcionContiene)) {
    //         return true;
    //     }
    //     if ((gastosFilter.descripcion).includes(x.etiquetasTiene)) {
    //         return true;
    //     }
    // })
    //     return gastosFiltrados;
    // }

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {
    let agruparGastos = JSON.parse(JSON.stringify(gastos));
    if (periodo !== "mes" && periodo !== "dia" && periodo !== "anyo") {
        periodo = "mes";
    }
    let filtrador = {fechaDesde : fechaDesde, fechaHasta : fechaHasta, etiquetas : etiquetas}
    let returnFiltrarGastos = filtrarGastos(filtrador);
    //El último valor, el {} será el primer valor con el comenzará el reduce
    console.log("Miauuuu " + returnFiltrarGastos.length);
    let groupBy =
            returnFiltrarGastos.reduce((acc, item) => {
                console.log("Miau5")
                let periodoReduce = item.obtenerPeriodoAgrupacion(periodo);
                console.log("Miauuuu " + periodoReduce +' '+ item.valor);
                let valores = valores + item.valor;
                acc[periodoReduce] = valores ;
                return acc;
            }, {});
            console.log(JSON.stringify(groupBy));
    return groupBy;
}

//Función constructora
function CrearGasto(descripcion, valor = 0, fecha = Date.now(), ...etiquetas) {
    valor = parseFloat(valor);
    
    if (isNaN(valor) || valor < 0) {
        valor = 0;
    }
    // if (etiquetas.length == 0) { etiquetas = [] };

    const gasto = {
        valor : valor,
        descripcion : descripcion,
        etiquetas : [...etiquetas],
        fecha : (typeof fecha === 'string') ? Date.parse(fecha) : fecha,

        mostrarGasto : function() {
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        },

        actualizarDescripcion : function(newDescripcion) {
            this.descripcion = newDescripcion;
        },

        actualizarValor : function(newValor) {
            if (newValor >= 0) {
                this.valor = newValor;
            }
        },

        //Falta probar si funciona
        mostrarGastoCompleto : function() {
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
        },

        actualizarFecha : function(newFecha) {
            let isValidDate = Date.parse(newFecha);
            if (!isNaN(isValidDate)) {
                this.fecha = Date.parse(newFecha);
            } 
        },

        anyadirEtiquetas : function(...etiquetas) {
            const valoresUnicos = etiquetas.filter((x) => {
                if (!this.etiquetas.includes(x)) {
                    return x;
                }
            });
            this.etiquetas.push(...valoresUnicos);
        }, 

        borrarEtiquetas : function(...etiquetas) {
            etiquetas.forEach((x) => {
                for (let i = 0; i < this.etiquetas.length; i++) {
                    if (this.etiquetas[i] === x) {
                        this.etiquetas.splice(i, 1);
                    }
                }
            })
        },

        obtenerPeriodoAgrupacion : function(periodo) {
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
    return gasto;
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