// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
"use strict"
var presupuesto = 0;
var gastos = [];
var idgasto = 0;
function actualizarPresupuesto(valores) {

    if (parseFloat(valores) >= 0) {
        presupuesto = valores;
        return valores;
    } else {
        console.log("ha introducido un numero negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    return 'Tu presupuesto actual es de ' + presupuesto + ' €';
}

function CrearGasto(descr, val, fechaCreacion, ...etiquet) {

    let gasto = {
        descripcion: descr,
        etiquetas: [...etiquet],
        valor: val,
        fecha: fechaCreacion
    }

    if (parseFloat(val) >= 0) {
        gasto.valor = val;
    }

    else {

        gasto.valor = 0;
    }
    if (fechaCreacion == undefined || isNaN(Date.parse(fechaCreacion))) {
        gasto.fecha = new Date(Date.now()).toISOString().substring(0, 16);
    } else {
        gasto.fecha = Date.parse(fechaCreacion);
    }
    gasto.mostrarGastoCompleto = function () {
        let nfec = new Date(this.fecha).toLocaleString();
        let resp = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${nfec}
Etiquetas:\n`

        for (let i = 0; i < this.etiquetas.length; i++) {
            resp += `- ` + this.etiquetas[i] + `\n`;
        }
        return resp;
    }

    gasto.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    gasto.actualizarDescripcion = function (newDescr) {
        this.descripcion = newDescr;
    };
    gasto.actualizarValor = function (nuevovalor) {
        if (parseFloat(nuevovalor) > 0) {
            this.valor = nuevovalor;
        }
    }
    gasto.actualizarFecha = function (nuevaFecha) {
        if (Date.parse(nuevaFecha)) {
            this.fecha = Date.parse(nuevaFecha);
        }
    }
    gasto.anyadirEtiquetas = function (...nuevaEtiqueta) {
        nuevaEtiqueta.forEach(a => {
            if (!this.etiquetas.includes(a)) {
                this.etiquetas.push(a);
            }
        })
    }
    gasto.actualizarValor = function (v1) {
        if (parseFloat(v1) >= 0) {
            this.valor = v1;
        }
    };
    gasto.borrarEtiquetas = function (...etiquetList) {
        etiquetList.forEach(a => {
            if (this.etiquetas.includes(a)) {
                let indice = this.etiquetas.indexOf(a);
                this.etiquetas.splice(indice, 1);
            }
        })
    }
    gasto.obtenerPeriodoAgrupacion = function (periodoA) {
        if (periodoA !== undefined) {
            switch (periodoA) {

                case "mes":
                    return periodoA = new Date(this.fecha).toISOString().substring(0, 7);


                case "anyo":
                    return periodoA = new Date(this.fecha).toISOString().substring(0, 4);


                case "dia":
                    return periodoA = new Date(this.fecha).toISOString().substring(0, 10);

            }
        }

    }


    return gasto;
}
function listarGastos() {
    return gastos;
}

function anyadirGasto(gastoante) {
    gastoante.id = idgasto;
    gastos.push(gastoante);
    idgasto++;

}
function borrarGasto(idborrar) {
    gastos.forEach(j => {
        if (j.id == idborrar) {
            let indice = gastos.indexOf(j);
            gastos.splice(indice, 1);
        }
    });


}
function calcularTotalGastos() {
    let totalgastos = 0;
    gastos.forEach(j => {
        totalgastos += j.valor;
    });
    return totalgastos;
}
function calcularBalance() {
    let gastostotales = calcularTotalGastos();
    return (presupuesto - gastostotales);
}

function filtrarGastos(filtrarG) {

    if (filtrarG != undefined && filtrarG != null && Object.entries(filtrarG).length != 0) {
        let resFil = gastos.filter((gastFil) => {
            if (filtrarG.hasOwnProperty("fechaDesde")) {
                
                if (gastFil.fecha < Date.parse(filtrarG.fechaDesde)) {
                    return;
                }
            }
            if (filtrarG.hasOwnProperty("fechaHasta")) {
                if (gastFil.fecha > Date.parse(filtrarG.fechaHasta)) {
                    return;
                }
            }
            if (filtrarG.hasOwnProperty("valorMinimo")) {
                if (gastFil.valor < filtrarG.valorMinimo) {
                    return;
                }
            }
            if (filtrarG.hasOwnProperty("valorMaximo")) {
                if (gastFil.valor > filtrarG.valorMaximo) {
                    return;
                }
            }
            if (filtrarG.hasOwnProperty("descripcionContiene")) {
                if (!gastFil.descripcion.includes(filtrarG.descripcionContiene)) {
                    return;
                }
            }
            if(filtrarG.hasOwnProperty("etiquetasTiene")){
                if(filtrarG.etiquetasTiene.length != 0){
                    let comp = false;
                    for(let desc of filtrarG.etiquetasTiene){
                        if(gastFil.etiquetas.includes(desc)){
                            comp = true;
                        }
                    }
                    if(!comp){
                        return;
                    }
                }
            }
            return gastFil;
        });
        return resFil;
    }else{
        return gastos;
    }

}
function agruparGastos(per = "mes", etiquetas = [], fechaDD, fechS = Date.now()) {
let listRes = filtrarGastos({fechaDesde: fechaDD, fechaHasta:fechS, etiquetasTiene: etiquetas});
let gastosAgr = listRes.reduce(function(agrup, gastFil){
    let paraAgr = gastFil.obtenerPeriodoAgrupacion(per);
    if(agrup.hasOwnProperty(paraAgr)){
        agrup[paraAgr] = agrup[paraAgr] + gastFil.valor;
    }else{
        agrup[paraAgr] = gastFil.valor
    }
    return agrup
}, {});
return gastosAgr;
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
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
