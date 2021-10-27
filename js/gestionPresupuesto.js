'use strict'

var presupuesto = 0;
let gastos = [];
let idgasto = 0;

//Presupuestos
function actualizarPresupuesto(valor) {
    let val = parseFloat(valor);

    if (val >= 0) {
        presupuesto = val;
    }

    else {
       console.log('Error. Presupuesto negativo');
       val = -1;
    }
    return val;
}

function mostrarPresupuesto() {

    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

//Gastos
function CrearGasto(descripcion, valor, fecha = Date.now(), ...etiquetas) {

    let valor1 = parseFloat(valor);

    if (valor1 < 0 || isNaN(valor1)) {
        valor1 = 0;
    }

    let gasto = {
	    descripcion: descripcion,
        valor : valor1,
        etiquetas : [...etiquetas],
        fecha : (typeof fecha === 'string') ? Date.parse(fecha) : fecha,
        

        mostrarGasto() {
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        },

        actualizarDescripcion(newDescripcion) {

            this.descripcion = newDescripcion;
        },

        actualizarValor(newValor) {

            let value = parseFloat(newValor);

            if (value >= 0) {
                this.valor = value;
            }
        },

        mostrarGastoCompleto() {
            let controlFecha1;

            if (typeof this.fecha === 'string') {
                controlFecha1 = Date.parse(this.fecha);
            }
            else {
                controlFecha1 = this.fecha;
            }
            let espacio = "";

            for(let etiquetas1 of this.etiquetas) {
                espacio += `- ${etiquetas1}\n`;
            }
            let fecha1 = new Date(controlFecha1);

            let aux = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(fecha1.toLocaleString())}\nEtiquetas:\n`;
            return aux + espacio;
        },

        actualizarFecha(fecha) {
            if(!isNaN(Date.parse(fecha))) {
                this.fecha = Date.parse(fecha);
            }
        },

        anyadirEtiquetas(...etiquetas) {
            const aux = etiquetas.filter((x) => {
                if (!this.etiquetas.includes(x)) {
                    return x;
                }
            });
            this.etiquetas.push(...aux);

        },

        borrarEtiquetas(...etiquetas) {
            etiquetas.forEach((x) => {
                for(let i = 0; i < this.etiquetas.length; i++) {
                    if (this.etiquetas[i] === x) {
                        this.etiquetas.splice(i, 1);
                    }
                }
            })
        },

        obtenerPeriodoAgrupacion(periodo) {
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
    };

    return gasto;
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idgasto; 

    idgasto++;

    gastos.push(gasto);
}

function borrarGasto(id) {
    for(let i = 0; i < gastos.length; i++) {
        if(gastos[i].id === id) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {
    var suma = 0;
    for(let i = 0; i < gastos.length; i++) {
        suma += gastos[i].valor;   
    }
    return suma;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(FechaGastos) {
    let fd;
    let fh;
    let vmn;
    let vmx;
    let descCon;
    let etiqTn;
    
    let gastosFiltrar = object.assign(gastos)
    if(typeof FechaGastos === 'object' && FechaGastos !== null && object.entries(FechaGastos.length) > 0)
    {
        if(FechaGastos.hasOwnProperty(`fechaDesde`) && typeof FechaGastos.fechaDesde === "string") {
            gastosFiltrar = gastosFiltrar.filter((x) =>{
                return x.fecha >= (Date.parse(FechaGastos.fechaDesde))
            })
            
        }

        if(FechaGastos.hasOwnProperty(`fechaHasta`) && typeof FechaGastos.fechaHasta === "string") {
            gastosFiltrar = gastosFiltrar.filter((x) =>{
                return x.fecha <= (Date.parse(FechaGastos.fechaHasta))
            })
        }

        if(FechaGastos.hasOwnProperty(`valorMinimo`) && typeof FechaGastos.valorMinimo === "number") {
            gastosFiltrar = gastosFiltrar.filter((x) =>{
                return x.valor >= FechaGastos.valorMinimo
            })    
        }

        if(FechaGastos.hasOwnProperty(`valorMaximo`) && typeof FechaGastos.valorMaximo === "number") {
            gastosFiltrar = gastosFiltrar.filter((x) =>{
                return x.valor <= FechaGastos.valorMaximo
            })
        }

        if(FechaGastos.hasOwnProperty(`descripcionContiene`) && typeof FechaGastos.descripcionContiene === "strimg") {
            gastosFiltrar = gastosFiltrar.filter((x) =>{
                let aux1 = (x.descripcion).toLowerCase();
                let aux2 = (FechaGastos.descripcionContiene).toLowerCase();
                let param1Array = param1.split(" ");
                let param1ArrayJoin = param1Array.join('');
                if(param1ArrayJoin.indexOf(aux2) !== -1){
                return true
                }
            })
        }

        if(FechaGastos.hasOwnProperty(`etiquetasTiene`) && Array.isArray.FechaGastos.etiquetasTiene) {
            gastosFiltrar = gastosFiltrar.filter((x) => {
                for(let i = 0; i < FechaGastos.etiquetasTiene.length; i){
                    if(FechaGastos.etiquetasTiene.includes(x.etiquetas[i])){
                        return true;
                    }
                }
            })
        }

        /*if(FechaGastos.hasOwnProperty(`fechaDesde`) && typeof FechaGastos.fechaDesde === "string") {
            if(!isNaN(Date.parse(FechaGastos.fechaDesde))) {
                fd = undefined;
            }
            else {
                fd = Date.parse(FechaGastos.fechaDesde);
            } 
        }

        if(FechaGastos.hasOwnProperty(`fechaHasta`) && typeof FechaGastos.fechaHasta === "string")
        {
            if(!isNaN(Date.parse(FechaGastos.fechaHasta))) {
                fh = undefined;
            }
            else {
                fh = Date.parse(FechaGastos.fechaHasta);
            }  
        }

        if(FechaGastos.hasOwnProperty(`valorMinimo`) && typeof FechaGastos.valorMinimo === "number")
        {
            vmn = FechaGastos.valorMinimo();
        }

        if(FechaGastos.hasOwnProperty(`valorMaximo`) && typeof FechaGastos.valorMaximo === "number")
        {
            vmx = FechaGastos.valorMaximo();
        }

        if(FechaGastos.hasOwnProperty(`descripcionContiene`) && typeof FechaGastos.descripcionContiene === "strimg")
        {
            descCon = FechaGastos.descripcionContiene();
        }

        if(FechaGastos.hasOwnProperty(`etiquetasTiene`) && Array.isArray.FechaGastos.etiquetasTiene)
        {
            etiqTn = FechaGastos.etiquetasTiene();
        }*/ 
        return gastosFiltrar;
    }
    return gastos;
    /*let results = gastos.filter(function(item) {
        let devuelve = true;

        if(typeof fd != null && item.fecha > fd) {
            devuelve = false;
        }
        if(typeof fh != null && item.fecha < fh) {
            devuelve = false;
        }
        if(typeof )

        return devuelve;
    });*/
}

function agruparGastos(etiquet) {
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
