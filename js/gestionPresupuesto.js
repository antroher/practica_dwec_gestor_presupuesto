let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(cantidad) {
    if (cantidad >= 0) {
        presupuesto = cantidad;
    } else {
        cantidad = -1;
        console.log("Error al introducir el valor");
    }
    return cantidad;
}

function mostrarPresupuesto() {

    let x = presupuesto;
    return `Tu presupuesto actual es de ${x} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    this.descripcion = descripcion;
    if (valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }


    if (fecha) {
        fecha = Date.parse(fecha);
        this.fecha = fecha;
    } else {
        fecha = Date.now();
        this.fecha = fecha;
    }

    this.etiquetas = [];
    
    this.anyadirEtiquetas = function (...etiquetas) {
        let pos;
        for (let etiqueta of etiquetas) {
            pos = this.etiquetas.lastIndexOf(etiqueta);
            if (pos == -1) {
                this.etiquetas.push(etiqueta);
            }
        }
    }
    this.anyadirEtiquetas(...etiquetas);
    

    this.mostrarGasto = function () {
        
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    }

    this.mostrarGastoCompleto = function () {

        let date = new Date(this.fecha);
        let textoFecha = date.toLocaleString();

        let textoEtiquetas = "";
        for (let i = 0; i < this.etiquetas.length; i++) {
            textoEtiquetas += `- ${this.etiquetas[i]}\n`;
        }
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${textoFecha}\nEtiquetas:\n${textoEtiquetas}`;
    }
    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }
    this.actualizarValor = function (nuevoValor) {
        if (nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    }
    this.actualizarFecha = function (fecha) {
        fecha = Date.parse(fecha);
        if (fecha) {
            this.fecha = fecha;
        }
    }

    

    this.borrarEtiquetas = function (...etiquetas) {
        let pos;
        for (let etiqueta of etiquetas) {
            pos = this.etiquetas.lastIndexOf(etiqueta);
            if (pos != -1) {
                this.etiquetas.splice(pos, 1);
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
    let pos = gastos.findIndex(item => item.id === id);
    if (pos != -1) {
        gastos.splice(pos, 1);
    }
}

function calcularTotalGastos() {
    let sumaGastos = 0;
    for (let i = 0; i < gastos.length; i++) {
        sumaGastos += gastos[i].valor;
    }
    return sumaGastos;

}

function calcularBalance() {
    let sumaGastos = calcularTotalGastos();
    let balance = presupuesto - sumaGastos;
    return balance;
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}


