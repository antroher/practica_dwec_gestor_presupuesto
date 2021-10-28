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
        return filtrados;
    }
    return filtrados;
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

function CrearGasto(descr, valor = 0, fec = Date.now(), ...etiquetas) {
    valor = parseFloat(valor);
    
    if (isNaN(valor) || valor < 0) {
        valor = 0;
    }
    if((typeof fec === 'string')){
       if ( isNaN(Date.parse(fec)) ){
           fec = Date.now()
       }else{
        fec = Date.parse(fec);
       }
    }

    let gasto = {
        valor : valor,
        descripcion : descr,
        etiquetas : [...etiquetas],
        fecha : fec,

        mostrarGasto : function() {
            return('El valor de ${this.descripcion} es de ${this.valor} €');
        },

        actualizarDescripcion : function(newDescripcion) {
            this.descripcion = newDescripcion;
        },

        actualizarValor : function(valor) {
            if (valor >= 0) {
                this.valor = valor;
            }
        },

        mostrarGastoCompleto : function() {
            let validarFecha = this.fecha
            if(typeof validarFecha === 'string')
            {
                validarFecha = Date.parse(validarFecha);
            }
            let aux = "";
            for(let etiqueta of this.etiquetas) {
                aux = aux + '-'+etiqueta+'\n';
            };

            validarFecha = new Date(validarFecha);

            let texto = ' El gasto de '+this.descripcion+' tiene valor '+this.valor+'€.\nFecha: '+(validarFecha.toLocaleString())+'\nEtiquetas:\n';
            return texto + aux;
        },

        actualizarFecha : function(validarFecha) {
            let valida = Date.parse(validarFecha);
            if (!isNaN(valida)) {
                this.fecha = Date.parse(validarFecha);
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
    calcularBalance,
    filtrarGastos,
    agruparGastos
}