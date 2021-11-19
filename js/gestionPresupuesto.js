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

/*
¿Funciona el código de abajo? SÍ, pero si no pasa los test esta mal... así que adiós a mis horas de trabajo.
*/

// function filtrarGastos(gastosFilter) {
//     let gastosFiltrados = Object.assign(gastos);
//     if (gastosFilter != null && Object.entries(gastosFilter).length >= 0) {
//         if (Object.hasOwn(gastosFilter, 'fechaDesde') && typeof gastosFilter.fechaDesde === 'string') {
//             gastosFiltrados = gastosFiltrados.filter((x) => {
//                 return x.fecha >= (Date.parse(gastosFilter.fechaDesde))
//             })
//         }
//         if (Object.hasOwn(gastosFilter, 'fechaHasta') && typeof gastosFilter.fechaHasta === 'string') {
//             gastosFiltrados = gastosFiltrados.filter((x) => {
//                 return x.fecha <= Date.parse(gastosFilter.fechaHasta);
//             })
//         }
//         if (Object.hasOwn(gastosFilter, 'valorMinimo') && typeof gastosFilter.valorMinimo === 'number') {
//             gastosFiltrados = gastosFiltrados.filter((x) => {
//                 return x.valor > gastosFilter.valorMinimo;
//             })
//         }
//         if (Object.hasOwn(gastosFilter, 'valorMaximo') && typeof gastosFilter.valorMaximo === 'number') {
//             gastosFiltrados = gastosFiltrados.filter((x) => {
//                 return x.valor < gastosFilter.valorMaximo;
//             })
//         }
//         if (Object.hasOwn(gastosFilter, 'descripcionContiene') && typeof gastosFilter.descripcionContiene === 'string') {
//             gastosFiltrados = gastosFiltrados.filter((x) => {
//                 let param1 = (x.descripcion).toLowerCase();
//                 let param2 = (gastosFilter.descripcionContiene).toLowerCase();
//                 let param1Array = param1.split(" ");
//                 let param1ArrayJoin = param1Array.join('');
//                 if (param1ArrayJoin.indexOf(param2) !== -1) 
//                     return true;
//             })
//         }
//         if (Object.hasOwn(gastosFilter, 'etiquetasTiene') && Array.isArray(gastosFilter.etiquetasTiene)) {
//             gastosFiltrados = gastosFiltrados.filter((x) => {
//                 for (let i = 0; i <= gastosFilter.etiquetasTiene.length; i++) {
//                     if (gastosFilter.etiquetasTiene.includes(x.etiquetas[i])) {
//                         return true;
//                     }
//                 }
//             })
//         }

//         return gastosFiltrados;
//     }
//     return gastos;
// }
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
    let filtrador = {etiquetasTiene : etiquetas, fechaDesde : fechaDesde, fechaHasta : fechaHasta}
    let returnFiltrarGastos = filtrarGastos(filtrador);
    let groupBy =
            returnFiltrarGastos.reduce((acc, item) => {
                let periodoReduce = item.obtenerPeriodoAgrupacion(periodo);
                if (acc[periodoReduce] == null)
                    acc[periodoReduce] = item.valor;
                else 
                    acc[periodoReduce] += item.valor;
                return acc;
            }, {});
    return groupBy;
}

//Función constructora
function CrearGasto(descripcion, valor = 0, fecha = Date.now(), ...etiquetas) {
    valor = parseFloat(valor);
    
    if (isNaN(valor) || valor < 0) {
        valor = 0;
    }
    // if (etiquetas.length == 0) { etiquetas = [] };
    this.valor = valor
    this.descripcion = descripcion
    this.etiquetas = [...etiquetas]
    this.fecha = (typeof fecha === 'string') ? Date.parse(fecha) : fecha

    this.mostrarGasto = function() {
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.actualizarDescripcion = function(newDescripcion) {
        this.descripcion = newDescripcion;
    }

    this.actualizarValor = function(newValor) {
        if (newValor >= 0) {
            this.valor = newValor;
        }
    }

    //Falta probar si funciona
    this.mostrarGastoCompleto = function() {
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
    }

    this.actualizarFecha = function(newFecha) {
        let isValidDate = Date.parse(newFecha);
        if (!isNaN(isValidDate)) {
            this.fecha = Date.parse(newFecha);
        } 
    }

    this.anyadirEtiquetas = function(...etiquetas) {
        const valoresUnicos = etiquetas.filter((x) => {
            if (!this.etiquetas.includes(x)) {
                return x;
            }
        });
        this.etiquetas.push(...valoresUnicos);
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

    this.obtenerPeriodoAgrupacion = function(periodo) {
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

function transformarListadoEtiquetas(input) {
    let etiquetasFiltradas = input.match(/[a-z0-9]+/gi);
    return etiquetasFiltradas;
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