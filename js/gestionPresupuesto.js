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
        this.fecha = Date.now();
    }

	    this.descripcion = desc,
        this.valor = val,
        this.fecha = (typeof fec === 'string') ? Date.parse(fec) : fec,
        this.etiquetas = [...eti],
         
        this.mostrarGasto = function (){
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
            
        }

        this.actualizarDescripcion = function(descr) {
            this.descripcion = descr;
        }

        this.actualizarValor = function(vall) {
            if (parseFloat(vall) >= 0)
            {
                this.valor = parseFloat(vall);
            }
        }

        this.actualizarFecha = function(fech) {
            if (!isNaN(Date.parse(fech))) {
            this.fecha = Date.parse(fech);
            }
        }

        this.anyadirEtiquetas = function(...etiq) {
            const aux = etiq.filter((x) => {
                if (!this.etiquetas.includes(x)) {
                    return x;
                }
            });
            this.etiquetas.push(...aux);
        }

        this.borrarEtiquetas = function(...etiquetas) {
            etiquetas.forEach((x) => {
                for (let i = 0; i < this.etiquetas.length; i++) {
                    if (this.etiquetas[i] === x) {
                        this.etiquetas.splice(i, 1);
                    }
                }
            })
        }

        this.mostrarGastoCompleto = function() {
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

        this.obtenerPeriodoAgrupacion = function(periodo){
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
    for (let i = 0; i < gastos.length; i++) {
        total += gastos[i].valor;
    }
    return total;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}){
    let gastosFiltrados;
    gastosFiltrados = gastos.filter(function(gasto){
     let exist = true;
     if(fechaDesde){
         if(gasto.fecha < Date.parse(fechaDesde)) exist = false;
     }
     if(fechaHasta){
         if(gasto.fecha > Date.parse(fechaHasta)) exist = false;
     }
     if(valorMinimo){
         if(gasto.valor < valorMinimo) exist = false;
     }
     if(valorMaximo){
         if(gasto.valor > valorMaximo) exist = false;
     }
     if(descripcionContiene){
             if(!gasto.descripcion.includes(descripcionContiene)) exist = false;
     }
     if(etiquetasTiene){
         let inside = false;                   
             for (let i = 0; i < gasto.etiquetas.length; i++) {                   
                 for (let j= 0; j < etiquetasTiene.length; j++) {
                     if(gasto.etiquetas[i] == etiquetasTiene[j]) inside = true;                  
                 }
             }
        if(inside == false) exist = false;
     }
         return exist;
    });
return gastosFiltrados;  
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {
    let filter = {etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta}
    let aux = filtrarGastos(filter);
    let agrupar = aux.reduce((acu, item) => {
        let pred = item.obtenerPeriodoAgrupacion(periodo);
        if (acu[pred] == null) {
            acu[pred] = item.valor;
        } else {
            acu[pred] += item.valor;
        }
        return acu;
    }, {});
    return agrupar;
}

function transformarListadoEtiquetas(etiq) {
    let etiArray = etiq.match(/[a-z0-9]+/gi);
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