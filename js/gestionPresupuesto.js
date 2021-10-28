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

function CrearGasto(desc, val = 0, fec = Date.now(), ...eti) {
    val = parseFloat(val)
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

        anyadirEtiquetas : function(...etiq) {
            const aux = etiq.filter((x) => {
                if (!this.etiquetas.includes(x)) {
                    return x;
                }
            });
            this.etiquetas.push(...aux);
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

        mostrarGastoCompleto : function() {
            let fech1;
            if(typeof this.fecha === 'string') {
                fech1 = Date.parse(this.fecha);
            } else {
                fech1 = this.fecha;
            }
            let aux = "";
            for(let etiq of this.etiquetas) {
                aux = aux + `- ${etiq}\n`;
            };
            let fech2 = new Date(fech1);
            let aux2 = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(fech2.toLocaleString())}\nEtiquetas:\n`;
            return aux2 + aux;
        },

        obtenerPeriodoAgrupacion : function(periodo){
            let  fech = new Date(this.fecha);
            let dd = String(fech.getDate()).padStart(2, 0);
            let mm = String(fech.getMonth()+1).padStart(2, 0);
            let yyyy = String(fech.getFullYear());   
            switch(periodo) {
                case "dia": { 
                    if (fech.getDate() < 10) {
                        if (fech.getMonth() < 9) {
                            return `${fech.getFullYear()}-0${fech.getMonth()+1}-0${fech.getDate()}`;
                        }
                        else {
                            return `${fech.getFullYear()}-${fech.getMonth()+1}-0${fech.getDate()}`;
                        }
                    }
                    else {
                        if (fech.getMonth() < 9) {
                            return `${fech.getFullYear()}-0${fech.getMonth()+1}-${fech.getDate()}`;    
                        }
                        else {
                            return `${fech.getFullYear()}-${fech.getMonth()+1}-${fech.getDate()}`;
                        }
                    }
                    break;
                }
                case "mes": {
                    if(fech.getMonth() < 9) {
                        return `${fech.getFullYear()}-0${fech.getMonth()+1}`;
                    }
                    else {
                        return `${fech.getFullYear()}-${fech.getMonth()+1}`;
                    }
                    break;
                }
                case "anyo": {
                    return `${fech.getFullYear()}`
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

function listarGastos() {
   return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    for (let i = 0; i < gastos.length; i++)
    {
        if(gastos[i].id === id) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {
    let total = 0;
    gastos.forEach((x) => {
        total = total +x.valor;
    })
    return total;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(objeto){
    let objeto = Object.assign(gastos);
    let fd = "";
    let fh = "";
    let vmn = "";
    let vmx = "";
    let descCon = "";
    let etiqTn = "";

    if(Object.HasOwnProperty(`fechaDesde`) && typeof objeto.fechaDesde === string)
    {
        fd = objeto.fechaDesde();
        if(!isNaN(Date.parse(objeto.fechaDesde)))
            fd = undefined;
        
        else 
            fd = Date.parse(objeto.fechaDesde);
    }

    if(objeto.HasOwnProperty(`fechaHasta`) && typeof objeto.fechaHasta === string)
    {
        fh = objeto.fechaHasta();
        if(!isNaN(Date.parse(objeto.fechaHasta)))
            fh = undefined;
        
        else 
            fh = Date.parse(objeto.fechaHasta);
    }

    if(objeto.HasOwnProperty(`valorMinimo`))
    {
        vmn = objeto.valorMinimo();
    }

    if(objeto.HasOwnProperty(`valorMaximo`))
    {
        vmx = objeto.valorMaximo();
    }

    if(objeto.HasOwnProperty(`descripcionContiene`))
    {
        descCon = objeto.descripcionContiene();
    }

    if(objeto.HasOwnProperty(`etiquetasTiene`))
    {
        etiqTn = objeto.etiquetasTiene();
    }

    let result = gastos.filter(function(item) {
        let devuelve = true;

        if(typeof fd !== undefined && item.fecha < fh) {
            devuelve = false;
        }
        
        return devuelve;
    })
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
