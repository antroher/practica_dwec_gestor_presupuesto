// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict"
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(val) {
    if (val >= 0) {
        presupuesto = val;
        return presupuesto;
    }

    else {
       console.log('¡ERROR! El presupuesto no puede ser negativo.');
       return -1;
    }
    
}

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(des, val = 0, fec = Date.now(), ...eti) {
    if (parseFloat(val) < 0 || isNaN(val)) {
        val = 0;
    }

    if (eti === "") {
        this.etiquetas = [];
    }

    if (fec === "") {
        this.fecha = Date.now();//getDate();
    }

    this.descripcion = des;
    this.valor = val;   
    this.etiquetas = [...eti];
    this.fecha = (typeof fec === 'string') ? Date.parse(fec) : fec;
    this.mostrarGasto = function() {
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.actualizarDescripcion = function(des) {
        this.descripcion = des;
    }

    this.actualizarValor = function(val) {
        if (parseFloat(val) >= 0) {
            this.valor = parseFloat(val);
        }
    }

    this.actualizarFecha = function(fec) {
        if (!isNaN(Date.parse(fec))) {
            this.fecha = Date.parse(fec);
        }
            
    }

    this.anyadirEtiquetas = function(...eti) {
        const aux = eti.filter((x) => {
            if (!this.etiquetas.includes(x)) {
                return x;
            }
        });
        this.etiquetas.push(...aux);
    }

    this.borrarEtiquetas = function(...eti) {
        eti.forEach((x) => {
            for (let i = 0; i < this.etiquetas.length; i++) {
                if (this.etiquetas[i] === x) {
                    this.etiquetas.splice(i, 1);
                }
            }
        });
    }

    this.mostrarGastoCompleto = function() {
        let fec1;
        if(typeof this.fecha === 'string') {
            fec1 = Date.parse(this.fecha);
        } else {
            fec1 = this.fecha;
        }
        let aux = "";
        for(let eti of this.etiquetas) {
            aux = aux + `- ${eti}\n`;
        };
        let fec2 = new Date(fec1);
        let aux2 = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(fec2.toLocaleString())}\nEtiquetas:\n`;
        return aux2 + aux;
    }

    this.obtenerPeriodoAgrupacion = function(per) {
        let date = new Date(this.fecha);
        if (per === "dia") {
            if (date.getMonth() + 1 < 10) {
                if (date.getDate() < 10) {
                    return `${date.getFullYear()}-0${date.getMonth() + 1}-0${date.getDate()}`;
                } else {
                    return `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;
                }                    
            } else if (date.getDate() < 10) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-0${date.getDate()}`;
            } else {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            }             
        }
        if (per === "mes") {
            if (date.getMonth() + 1 < 10) {
                return `${date.getFullYear()}-0${date.getMonth() + 1}`;
            } else {
                return `${date.getFullYear()}-${date.getMonth() + 1}`;
            }
        }
        if (per === "anyo") {
            return date.getFullYear();
        }
    }
}


function listarGastos() {
    return gastos;
}

function anyadirGasto(gas) {
    gas.id = idGasto;
    idGasto += 1;
    gastos.push(gas);
}

function borrarGasto(id) {
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === id) {
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

function filtrarGastos(obj) {
    let result = Object.assign(gastos);
    if (typeof obj === 'object' && obj !== null && obj !== undefined && Object.entries(obj).length > 0) {
        if (obj.hasOwnProperty('fechaDesde') && typeof obj.fechaDesde === 'string') {
            result = result.filter((aux) => {
                return aux.fecha >= (Date.parse(obj.fechaDesde))
            })
        }
        if (obj.hasOwnProperty('fechaHasta') && typeof obj.fechaHasta === 'string') {
            result = result.filter((aux) => {
                return aux.fecha <= Date.parse(obj.fechaHasta);
            })
        }
        if (obj.hasOwnProperty('valorMinimo') && typeof obj.valorMinimo === 'number') {
            result = result.filter((aux) => {
                return aux.valor >= obj.valorMinimo
            })
        }
        if (obj.hasOwnProperty('valorMaximo') && typeof obj.valorMaximo === 'number') {
            result = result.filter((aux) => {                
                return aux.valor <= obj.valorMaximo
            })
        }
        if (obj.hasOwnProperty('descripcionContiene') && typeof obj.descripcionContiene === 'string') {
            result = result.filter((aux) => {
                let par1 = (aux.descripcion).toLowerCase();
                let par2 = (obj.descripcionContiene).toLowerCase();
                let arr1 = par1.split(" ");
                let arr1join = arr1.join('');
                if (arr1join.indexOf(par2) !== -1) 
                    return true;
            })
        }
        if (obj.hasOwnProperty('etiquetasTiene') && Array.isArray(obj.etiquetasTiene)) {
            result = result.filter((aux) => {
                for (let i = 0; i <= obj.etiquetasTiene.length; i++) {
                    if (obj.etiquetasTiene.includes(aux.etiquetas[i])) {
                        return true;
                    }
                }
            })
        }
        return result;
    }
    return gastos;
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {
    let filter = {etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta}
    let aux = filtrarGastos(filter);
    let agrupar = aux.reduce((acc, item) => {
        let pred = item.obtenerPeriodoAgrupacion(periodo);
        if (acc[pred] == null) {
            acc[pred] = item.valor;
        } else {
            acc[pred] += item.valor;
        }
        return acc;
    }, {});
    return agrupar;    
}

function transformarListadoEtiquetas(eti) {
    let etiArray = eti.match(/[a-zA-Z0-9]+/gi);
    return etiArray;
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
    agruparGastos,
    transformarListadoEtiquetas
}