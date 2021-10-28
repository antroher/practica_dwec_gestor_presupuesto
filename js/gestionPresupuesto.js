// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
"use strict"
var presupuesto = 0;
var gastos = new Array();
var idGasto = 0;

function actualizarPresupuesto(newPresupuesto) {
    if(newPresupuesto >= 0){
        presupuesto = newPresupuesto;
    } 
    else {
        console.log("Error presupuesto negativo ");
        return -1;
    }
    return presupuesto;
}

function mostrarPresupuesto() {
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}

function listarGastos(){
    return gastos;
}

function CrearGasto(descripcion, valor, fecha = Date.now(), ...etiquetas){    
    if(valor < 0 || isNaN(valor)){
        valor = 0;
    }
    
    if(etiquetas == null){
        etiquetas = new Array();
    }
    let gasto = {
        valor : valor,
        descripcion : descripcion,
        etiquetas : [...etiquetas],
        fecha : (typeof fecha == `string`) ? Date.parse(fecha) : fecha,

        mostrarGasto : function() {
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        },

        actualizarDescripcion : function(descripcion) {
            this.descripcion = descripcion;
        },

        actualizarValor : function(valor) {
            if(valor > 0) {
                this.valor = valor;
            }
        },

        mostrarGastoCompleto : function() {
            let controlFecha;

            if (typeof this.fecha == 'string') {
                controlFecha = Date.parse(this.fecha);
            }
            else {
                controlFecha = this.fecha;
            }
            let space = "";

            for(let etiquetas2 of this.etiquetas) {
                space += `- ${etiquetas2}\n`;
            }
            let fechabien = new Date(controlFecha);

            let aux = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(fechabien.toLocaleString())}\nEtiquetas:\n`;
            return aux + space;
        },

        actualizarFecha : function (fecha) {
            if(!isNaN(Date.parse(fecha)))
            {
                this.fecha = Date.parse(fecha);
            }            
        },

        anyadirEtiquetas(...etiquetas)
        {
            let aux = etiquetas.filter((x) => {
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

        /*obtenerPeriodoAgrupacion(periodo){
            let fecha = new Date(this.fecha);
            let dd = string(fecha.getDate()).padstart(2, `0`);
            let mm = string(fecha.getMonth()+1).padstart(2,`0`);
            let yyyy = string (fecha.getFullYear());

        }*/

        obtenerPeriodoAgrupacion(periodo){
            let validarFecha= new Date(this.fecha);
            switch(periodo){
                case "dia":{
                    if(validarFecha.getDay()<10){
                        if(validarFecha.getMonth() < 9){
                            return `${validarFecha.getFullYear()}-0${validarFecha.getMonth()}-0${validarFecha.getDate()}`
                        }
                        else{
                            return `${validarFecha.getFullYear()}-0${validarFecha.getMonth()}-${validarFecha.getDate()}`
                        }
                    }

                    else{
                        if(validarFecha.getMonth() < 9){
                            return `${validarFecha.getFullYear()}-0${validarFecha.getMonth()+1}-${validarFecha.getDate()}`
                        }
                        else{
                            return `${validarFecha.getFullYear()}-${validarFecha.getMonth()+1}-${validarFecha.getDate()}`
                        }
                    }
                }

                case "mes":{
                    if(validarFecha.getMonth() < 9){
                        return `${validarFecha.getFullYear()}-0${validarFecha.getMonth()+1}`
                    }
                    else{
                        return `${validarFecha.getFullYear()}-0${validarFecha.getMonth()+1}`
                    }
                }

                case "año":{
                    return `${validarFecha.getFullYear()}`
                }

                default:{
                    return `Debe introducir como valor dia, mes o año`
                }
            }
        }



    }

    return gasto;
}


function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto = idGasto +1;
    gastos.push(gasto);
}

function borrarGasto(id){
    for(let i = 0; i < gastos.length; i++)
    {
        if(gastos[i].id==id)
        {
            gastos.splice(i,1);
        }
    }
}

function calcularTotalGastos(){
    let total = 0;
    for(let i=0; i<gastos.length;i++)
    {
        total = total + gastos[i].valor;
    }
    return total;
}

function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}

/*function filtrarGastos(gasto){
    if(gasto.hasOwnProperty(`fechaDesde`))
    {
        let fechaDesde=gasto.fechaDesde
        if(isNaN(Date.parse(fechaDesde))){
            fechaDesde=date.parse(fechaDesde)
        }
    }
    let gastosFiltrados = gastos.filter(function(gasto){
        let devuelve = true;
        let laTiene = falsa;

        if((typeof fechaDesde !== `undefined`)&&(gasto.fecha < fechaDesde)){
            devuelve = false;
        }

        if((typeof fechaHasta !== `undefined`) && (gasto.fecha > fechaH)){
            devuelve = false;
        }

        if((typeof win !== `undefined`) && ())

    });

};*/

/*function filtrarGastos(gasto){
    let fechD
    if(gasto.hasOwnProperty(`fechaDesde`) && typeof gasto.fechaDesde ===`string` && isNaN(Date.parse(fechaDesde))){
            fechD = undefined;
    }
    else{
        fechD = Date.parse(gasto.fechaDesde)
    }
}*/

function filtrarGastos(gastosFilter){
    let gastosFiltrados = Object.assign(gastos);
    if(typeof gastosFilter === `object` && gastosFilter !== null && gastosFilter !== undefined && Object.defineProperties(gastosFilter).length > 0){
        if (Object.hasOwn(gastosFilter, `fechaDesdee`) && typeof gastosFilter.fechaDesde === `string`){
            gastosFiltrados = gastosFiltrados.filter(x) => {
                return x.fecha >= (Date.parse(gastosFilter.fechaDesde))
            }
        }
        if (Object.hasOwn(gastosFilter, `fechaHasta`) && typeof gastosFilter.fechaHasta === `string`){
            gastosFiltrados = gastosFiltrados.filter(x) => {
                return x.fecha <= Date.parse(gastosFilter.fechaHasta);
            }
        }

        if(Object.hasOwn(gastosFilter `valorMinimo`) && typeof gastosFilter.valorMinimo === `string`)
        {
            gastosFiltrados = gastosFiltrados.filter(x) => {
                return x.valor >= gastosFilter.valorMinimo;
            }
        }

        if(Object.hasOwn(gastosFilter, `valorMaximo`) && typeof gastosFilter.valorMaximo === `string`){
            gastosFilter = gastosFiltrados.filter(x) =>{
                return x.valor <= gastosFilter.valorMaximo;
            }
        }

        if(Object.hasOwn(gastosFilter, `descripcionContiene`) && typeof gastosFilter.descripcionContiene === `string`){

        }
    
    }
}


function agruparGastos(gasto){
    
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
