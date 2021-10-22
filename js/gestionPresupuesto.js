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
        this.fecha = getDate();
    }

    const gasto = {
        descripcion: des,
        valor: val,        
        etiquetas: [...eti],
        fecha: (typeof fec === 'string') ? Date.parse(fec) : fec,

        mostrarGasto() {
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        } ,

        actualizarDescripcion(des) {
            this.descripcion = des;
        } ,

        actualizarValor(val) {
            if (parseFloat(val) >= 0) {
                this.valor = parseFloat(val);
            }
        } ,

        actualizarFecha(fec) {
            if (!isNaN(Date.parse(fec))) {
                this.fecha = Date.parse(fec);
            }
            
        } ,

        anyadirEtiquetas(...eti) {
            const aux = eti.filter((x) => {
                if (!this.etiquetas.includes(x)) {
                    return x;
                }
            });
            this.etiquetas.push(...aux);
        }, 

        borrarEtiquetas(...eti) {
            eti.forEach((x) => {
                for (let i = 0; i < this.etiquetas.length; i++) {
                    if (this.etiquetas[i] === x) {
                        this.etiquetas.splice(i, 1);
                    }
                }
            })
        } ,

        mostrarGastoCompleto() {
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
        },

        obtenerPeriodoAgrupacion(per) {
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
    };
    return gasto;
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
    if (obj.hasOwnProperty('fechaDesde')) {
        let fDes = obj.fechaDesde;
        if (!isNaN(Date.parse(fDes))) {
            fDes = Date.parse(fDes);
        }
    }
    if (obj.hasOwnProperty('fechaHasta')) {
        let fHas = obj.fechaHasta;
        if (!isNaN(Date.parse(fHas))) {
            fHas = Date.parse(fHas);
        }
    }
    if (obj.hasOwnProperty('valorMinimo')) {
        let vMin = obj.valorMinimo;
    }
    if (obj.hasOwnProperty('valorMaximo')) {
        let vMax = obj.valorMaximo;
    }
    if (obj.hasOwnProperty('descripcionContiene')) {
        let des = obj.descripcionContiene;
    }
    if (obj.hasOwnProperty('etiquetasTiene')) {
        let eti = obj.etiquetasTiene;
    }
    

}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde = getDate().getYear, fechaHasta = getDate()) {

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