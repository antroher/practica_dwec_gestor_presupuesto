"use strict"
var presupuesto = 0;
var idGasto = 0;

var gastos = [];

function actualizarPresupuesto(presupuestoNuevo) {
    let valorNuevo;

    if (presupuestoNuevo >= 0) {
        presupuesto = presupuestoNuevo;
        valorNuevo = presupuesto;
    } else {
        valorNuevo = -1;
    }
    return valorNuevo;
}

function mostrarPresupuesto() {
    return 'Tu presupuesto actual es de '+presupuesto+' €';
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
        if (gastos[i].id == id) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {
    let total = 0;
    for(let i=0; i<gastos.length; i++){
        total += gastos[i];
    }
    return total;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtro) {
    let filtrados = Object.assign(gastos);
    if (typeof filtro === 'object' && filtro != null && Object.entries(filtro).length > 0) {
        if (Object.hasOwn(filtro, 'fechaDesde') && typeof filtro.fechaDesde === 'string') {
            filtrados = filtrados.filter((x) => {
                return x.fecha >= (Date.parse(filtro.fechaDesde))
            })
        }
        if (Object.hasOwn(filtro, 'fechaHasta') && typeof filtro.fechaHasta === 'string') {
            filtrados = filtrados.filter((x) => {
                return x.fecha <= Date.parse(filtro.fechaHasta);
            })
        }
        if (Object.hasOwn(filtro, 'valorMinimo') && typeof filtro.valorMinimo === 'number') {
            filtrados = filtrados.filter((x) => {
                return x.valor >= filtro.valorMinimo
            })
        }
        if (Object.hasOwn(filtro, 'valorMaximo') && typeof filtro.valorMaximo === 'number') {
            filtrados = filtrados.filter((x) => {
                return x.valor <= filtro.valorMaximo
            })
        }
        if (Object.hasOwn(filtro, 'descripcionContiene') && typeof filtro.descripcionContiene === 'string') {
            filtrados = filtrados.filter((x) => {
                let param1 = (x.descripcion).toLowerCase();
                let param2 = (filtro.descripcionContiene).toLowerCase();
                let param1Array = param1.split(" ");
                let param1ArrayJoin = param1Array.join('');
                if (param1ArrayJoin.indexOf(param2) !== -1) 
                    return true;
            })
        }
        if (Object.hasOwn(filtro, 'etiquetasTiene') && Array.isArray(filtro.etiquetasTiene)) {
            filtrados = filtrados.filter((x) => {
                for (let i = 0; i < filtro.etiquetasTiene.length; i++) {
                    if (filtro.etiquetasTiene.includes(x.etiquetas[i])) {
                        return true;
                    }
                }
            })
        }

        return gastosFiltrados;
    }
    return gastos;
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {
    let filtrador = {etiquetasTiene : etiquetas, fechaDesde : fechaDesde, fechaHasta : fechaHasta}
    let returnFiltrarGastos = filtrarGastos(filtrador);
    let agrupar =
            returnFiltrarGastos.reduce((acc, item) => {
                let periodoReduce = item.obtenerPeriodoAgrupacion(periodo);
                if (acc[periodoReduce] == null)
                    acc[periodoReduce] = item.valor;
                else 
                    acc[periodoReduce] += item.valor;
                return acc;
            }, {});
    return agrupar;
}

function CrearGasto(descr, val = 0, fec = Date.now(), ...etiquetas) {
    valor = parseFloat(valor);
    
    if (isNaN(val) || val < 0) {
        val = 0;
    }
    if((typeof fec === 'string')){
       if ( isNaN(Date.parse(fecha)) ){
           fec = Date.now()
       }else{
        fec = Date.parse(fecha);
       }
    }

    let gasto = {
        valor : val,
        descripcion : descr,
        etiquetas : [...etiquetas],
        fecha : fec,

        mostrarGasto : function() {
            return('El valor de ${this.descripcion} es de ${this.valor} €');
        },

        actualizarDescripcion : function(newDescripcion) {
            this.descripcion = newDescripcion;
        },

        actualizarValor : function(val) {
            if (val >= 0) {
                this.valor = val;
            }
        },

        mostrarGastoCompleto : function() {
            let f = this.fecha
            if(typeof f === 'string')
            {
                f = Date.parse(f);
            }
            let aux = "";
            for(let etiqueta of this.etiquetas) {
                aux = aux + '-'+etiqueta+'\n';
            };

            f = new Date(f);

            let texto = ' El gasto de '+this.descripcion+' tiene valor '+this.valor+'€.\nFecha: '+(f.toLocaleString())+'\nEtiquetas:\n';
            return texto + aux;
        },

        actualizarFecha : function(f) {
            let valida = Date.parse(f);
            if (!isNaN(valida)) {
                this.fecha = Date.parse(f);
            } 
        },

        anyadirEtiquetas : function(etiquetas) {
            for(let i=0; i<etiquetas.length; i++){
                if(!this.etiquetas.includes(etiquetas[i])){
                    this.etiquetas.push(etiquetas[i]);
                }
            }
        }, 

        borrarEtiquetas : function(borrar) {
            borrar.forEach((x) => {
                for (let i = 0; i < this.etiquetas.length; i++) {
                    if (this.etiquetas[i] === x) {
                        this.etiquetas.splice(i, 1);
                    }
                }
            })
        },

        obtenerPeriodoAgrupacion : function(periodo="mes") {
            let f = new Date(this.fecha);
            switch(periodo) {
                case "dia": { 
                    if (validarFecha.getDate() < 10) {
                        if (validarFecha.getMonth() < 9) {
                            return `${f.getFullYear()}-0${f.getMonth()+1}-0${f.getDate()}`;
                        }
                        else {
                            return `${f.getFullYear()}-${f.getMonth()+1}-0${f.getDate()}`;
                        }
                    }
                    else {
                        if (validarFecha.getMonth() < 9) {
                            return `${f.getFullYear()}-0${f.getMonth()+1}-${f.getDate()}`;    
                        }
                        else {
                            return `${f.getFullYear()}-${f.getMonth()+1}-${f.getDate()}`;
                        }
                    }
                    break;
                }
                case "mes": {
                    if(validarFecha.getMonth() < 9) {
                        return `${f.getFullYear()}-0${f.getMonth()+1}`;
                    }
                    else {
                        return `${f.getFullYear()}-${f.getMonth()+1}`;
                    }
                    break;
                }
                case "anyo": {
                    return `${f.getFullYear()}`
                    break;
                }
                default:{
                    return 'Periodos permitidos: dia, mes y anyo';
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
<<<<<<< HEAD
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
=======
    calcularBalance
}


>>>>>>> 095e23c914882f2735d73c9cfb97a0caedb6f9e9
