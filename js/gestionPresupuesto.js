// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = new Array();
var idGasto = 0;

function actualizarPresupuesto(nuevopresupuesto) {
    // TODO
    if(nuevopresupuesto > 0) {
        presupuesto = nuevopresupuesto;
    } else {
        console.log("Error");
        return -1;
    }
    return presupuesto;
}

function mostrarPresupuesto() {
    // TODO
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion, valor = 0, fecha = new (Date), ...etiquetas) {
    // TODO
    if(valor < 0 || isNaN(valor)){
       valor = 0;
    }   
    
    this.valor = valor,
    this.descripcion = descripcion,
    this.fecha = (typeof fecha === "string") ? Date.parse(fecha) : fecha,
    this.etiquetas = [...etiquetas],

    this.mostrarGasto = function() {
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }
    this.actualizarDescripcion = function(descripcion) {
        this.descripcion  = descripcion;
    }
    this.actualizarValor = function(valor) {
        if(valor > 0){
            this.valor = valor;
        }            
    }
    this.mostrarGastoCompleto = function() {
        let fech1;

        if (typeof this.fecha === 'string') {
            fech1 = Date.parse(this.fecha);
        }
        else {
            fech1 = this.fecha;
        }
        let espacio = "";

        for(let etiq1 of this.etiquetas) {
            espacio += `- ${etiq1}\n`;
        }
        let fech2 = new Date(fech1);

        let aux = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(fech2.toLocaleString())}\nEtiquetas:\n`;
        return aux + espacio;
    }
    this.actualizarFecha = function(fecha) {
        if(!isNaN(Date.parse(fecha))){
            this.fecha =Date.parse(fecha);
        }                
    }
    this.anyadirEtiquetas = function(...etiquetas) {
        const aux = etiquetas.filter((x) => {
            if (!this.etiquetas.includes(x)) {
                return x;
            }
        });
        this.etiquetas.push(...aux);

    }
    this.borrarEtiquetas = function (...etiquetas) {
        etiquetas.forEach((x) => {
            for(let i = 0; i < this.etiquetas.length; i++) {
                if (this.etiquetas[i] === x) {
                    this.etiquetas.splice(i, 1);
                }
            }
        })
    }
    this.obtenerPeriodoAgrupacion = function (periodo) {
        let obtenerFecha = new Date(this.fecha);
        switch(periodo) {
            case "dia": { 
                if (obtenerFecha.getDate() < 10) {
                    if (obtenerFecha.getMonth() < 9) {
                        return `${obtenerFecha.getFullYear()}-0${obtenerFecha.getMonth()+1}-0${obtenerFecha.getDate()}`;
                    }
                    else {
                        return `${obtenerFecha.getFullYear()}-${obtenerFecha.getMonth()+1}-0${obtenerFecha.getDate()}`;
                    }
                }
                else {
                    if (obtenerFecha.getMonth() < 9) {
                        return `${obtenerFecha.getFullYear()}-0${obtenerFecha.getMonth()+1}-${obtenerFecha.getDate()}`;    
                    }
                    else {
                        return `${obtenerFecha.getFullYear()}-${obtenerFecha.getMonth()+1}-${obtenerFecha.getDate()}`;
                    }
                }
                break;
            }
            case "mes": {
                if(obtenerFecha.getMonth() < 9) {
                    return `${obtenerFecha.getFullYear()}-0${obtenerFecha.getMonth()+1}`;
                }
                else {
                    return `${obtenerFecha.getFullYear()}-${obtenerFecha.getMonth()+1}`;
                }
                break;
            }
            case "anyo": {
                return `${obtenerFecha.getFullYear()}`
                break;
            }
            default:{
                return `Valor no valido`;
            }
        }
    }
}

function listarGastos(){
    return gastos;

}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto+=1;
    gastos.push(gasto);
}

function borrarGasto(id){
    for(let i = 0; i < gastos.length; i++) {
        if(id === gastos[i].id){
            gastos.splice(i, 1);
         }
    }
}

function calcularTotalGastos(){
    let total = 0;
    for(let i = 0; i < gastos.length; i++) {
        total = total + gastos[i].valor;
    }
    return total;
}

function calcularBalance(){
    let balance = presupuesto - calcularTotalGastos();
    return balance;
}

function filtrarGastos(gastosFilter) {
    //Deep clone
    //let gastosFiltrados = JSON.parse(JSON.stringify(gastos));
    let gastosFiltrados = Object.assign(gastos);
    if (typeof gastosFilter === 'object' && gastosFilter != null && Object.entries(gastosFilter).length > 0) {
        if (Object.hasOwn(gastosFilter, 'fechaDesde') && typeof gastosFilter.fechaDesde === 'string') {
            gastosFiltrados = gastosFiltrados.filter((x) => {
                return x.fecha >= (Date.parse(gastosFilter.fechaDesde))
            })
        }
        if (Object.hasOwn(gastosFilter, 'fechaHasta') && typeof gastosFilter.fechaHasta === 'string') {
            gastosFiltrados = gastosFiltrados.filter((x) => {
                return x.fecha <= Date.parse(gastosFilter.fechaHasta);
            })
        }
        if (Object.hasOwn(gastosFilter, 'valorMinimo') && typeof gastosFilter.valorMinimo === 'number') {
            gastosFiltrados = gastosFiltrados.filter((x) => {
                return x.valor >= gastosFilter.valorMinimo
            })
        }
        if (Object.hasOwn(gastosFilter, 'valorMaximo') && typeof gastosFilter.valorMaximo === 'number') {
            gastosFiltrados = gastosFiltrados.filter((x) => {
                return x.valor <= gastosFilter.valorMaximo
            })
        }
        if (Object.hasOwn(gastosFilter, 'descripcionContiene') && typeof gastosFilter.descripcionContiene === 'string') {
            gastosFiltrados = gastosFiltrados.filter((x) => {
                let var1 = (x.descripcion).toLowerCase();
                let var2 = (gastosFilter.descripcionContiene).toLowerCase();
                let var1Array = var1.split(" ");
                let var1ArrayJoin = var1Array.join('');
                if (var1ArrayJoin.indexOf(var2) !== -1) 
                    return true;
            })
        }
        if (Object.hasOwn(gastosFilter, 'etiquetasTiene') && Array.isArray(gastosFilter.etiquetasTiene)) {
            gastosFiltrados = gastosFiltrados.filter((x) => {
                for (let i = 0; i <= gastosFilter.etiquetasTiene.length; i++) {
                    if (gastosFilter.etiquetasTiene.includes(x.etiquetas[i])) {
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
