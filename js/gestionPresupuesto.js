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

    
    this.descripcion= descripcion;
    this.valor = valor1;
    this.etiquetas = [...etiquetas];
    this.fecha = (typeof fecha === 'string') ? Date.parse(fecha) : fecha;
        

    this.mostrarGasto = function() {
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    };

    this.actualizarDescripcion = function(newDescripcion) {
        this.descripcion = newDescripcion;
    };

    this.actualizarValor = function(newValor) {
        let value = parseFloat(newValor);

        if (value >= 0) {
            this.valor = value;
        }
    };

    this.mostrarGastoCompleto = function() {
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
    };

    this.actualizarFecha = function(fecha) {
        if(!isNaN(Date.parse(fecha))) {
            this.fecha = Date.parse(fecha);
        }
    };

    this.anyadirEtiquetas = function(...etiquetas) {
        const aux = etiquetas.filter((x) => {
            if (!this.etiquetas.includes(x)) {
                return x;
            }
        });
        this.etiquetas.push(...aux);
    };

    this.borrarEtiquetas = function(...etiquetas) {
        etiquetas.forEach((x) => {
            for(let i = 0; i < this.etiquetas.length; i++) {
                if (this.etiquetas[i] === x) {
                    this.etiquetas.splice(i, 1);
                }
            }
        });
    };

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
        
    };
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
    /*function filtrarGastos(parametro) {
            var fd;
            var fh;
            var vmn;
            var vmx;
            var descCon;
            var etiqTn;


        if(FechaGastos.hasOwnProperty(`fechaDesde`) && typeof FechaGastos.fechaDesde === "string") {
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
        }
    

    /*let results = gastos.filter(function(item) {
        let devuelve = true;
        let tiene = true;

        if(typeof fd != null && item.fecha > fd) {
            devuelve = false;
        }
        if(typeof fh != null && item.fecha < fh) {
            devuelve = false;
        }
        if(typeof vnm != null && item.valor < vnm) {
            devuelve = false;
        }
        if(typeof vnx != null && item.valor > vnx) {
            devuelve = false;
        }
        if(typeof descCon != null && item.descripcion.includes(descripcion)){
            devuelve = false;
        }
        if(typeof etiqTn != null && etiquetas.legnth > 0) {
            tiene = false;

            for(let i = 0; i < rtiquetas.legth; i++) {
                if(item.etiquetas.includes(etiquetas[i])) {
                    tiene = true;
                }
            }
        }
        if(devuelve && tiene) {
            return item;
        }
    });
    return gastosFiltrar;
}*/


function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {
    let filtrador = {etiquetasTiene : etiquetas, fechaDesde : fechaDesde, fechaHasta : fechaHasta}
    let returnFiltrarGastos = filtrarGastos(filtrador);
    let Agrupador =
            returnFiltrarGastos.reduce((acc, item) => {
                let periodoReduce = item.obtenerPeriodoAgrupacion(periodo);
                if (acc[periodoReduce] == null)
                    acc[periodoReduce] = item.valor;
                else 
                    acc[periodoReduce] += item.valor;
                return acc;
            }, {});
    return Agrupador;

}

/*function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {

    var filtro = {etiquetasTiene : etiquetas, fechaDesde, fechaHasta}

  var returnFiltrarGastos = filtrarGastos(filtro);
  
  var agrupacion =
          returnFiltrarGastos.reduce((acc, item, index, returnFiltrarGastos) => {
             
              var reduce = item.obtenerPeriodoAgrupacion(periodo);
              if (acc[reduce] == null)
              {
                acc[reduce] = item.valor;
              }else 
              {
                acc[reduce] += item.valor;
              }
              return acc;
          }, {});
  return agrupacion;
}*/

function transformarListadoEtiquetas(etiqueta){
    let transformacion = etiqueta.match(/[a-zA-Z0-9]+/gi);
    return transformacion;
}

function cargarGastos(gastosArray){
    gastos = gastosArray;
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
    transformarListadoEtiquetas,
    cargarGastos
}
