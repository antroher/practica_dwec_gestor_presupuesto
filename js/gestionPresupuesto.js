"use strict";

var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(x) {

    if (x >= 0)
    { 
        presupuesto = x;
        return x;
    }
    else
    {
        x = -1
        return x;
    }
}

function mostrarPresupuesto() {
    
    let x = presupuesto;
    return `Tu presupuesto actual es de ${x} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
   
    this.descripcion = descripcion;

    if (valor >= 0)
    {
        this.valor = valor;
    } 
    else
    {
        this.valor = 0;
    }

    if (fecha)
    {
        fecha = Date.parse(fecha);
        this.fecha = fecha;
    }
    else
    {
        fecha = Date.now(fecha);
        this.fecha = fecha;
    }

    this.etiquetas = (etiquetas.length === 0) ? etiquetas = [] : etiquetas;

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €`
    };

    this.mostrarGastoCompleto = function() {
        let fecha2 = new Date(fecha)

        let texto= `Gasto correspondiente a ${descripcion} con valor ${valor} €.\nFecha: ${fecha2.toLocaleString()}\nEtiquetas:\n- ${etiquetas.join("\n- ")}\n`;

        return texto;
    };

    this.actualizarDescripcion = function(nuevadesc) {
        this.descripcion = nuevadesc;
    }

    this.actualizarValor = function(nuevovalor) {
        if (nuevovalor >= 0)
        {
            this.valor = nuevovalor;
        }
    }
    this.actualizarFecha = function(nuevafecha) {
        if (Date.parse(nuevafecha))
        {
            fecha = Date.parse(nuevafecha)
            this.fecha = fecha;
        }
    }
    this.anyadirEtiquetas = function(...nuevaetiqueta) {

        for (let i = 0; i < nuevaetiqueta.length; i++)
        {
            let encontrado = this.etiquetas.includes(nuevaetiqueta[i]) 

            if(encontrado == false)
            {
                this.etiquetas.push(nuevaetiqueta[i]);
            }
        }
    }
    this.borrarEtiquetas = function(...borraretiqueta)
    {
        for (let i = 0; i < borraretiqueta.length; i++)
        {
            let pos = this.etiquetas.indexOf(borraretiqueta[i])
            
            if (pos >= 0) 
            {
                this.etiquetas.splice(pos, 1)
            }
        }
    }
    this.obtenerPeriodoAgrupacion = function(periodo)
    {
        let periodofecha = new Date(fecha)
        periodofecha = periodofecha.toISOString();

        if (periodo == "mes")
        {
           periodofecha = periodofecha.slice(0,7);
        }

        else if (periodo == "anyo")
        {
            periodofecha = periodofecha.slice(0,4)
        }

        else if (periodo == "dia")
        {
            periodofecha = periodofecha.slice(0,10)
        }

        return periodofecha;
    }
}
function listarGastos() {
        return gastos;
}
function anyadirGasto(nuevogasto) {
    nuevogasto.id = idGasto;

    idGasto = idGasto + 1;

    gastos.push(nuevogasto);
}
function borrarGasto(id) {

    let pos = gastos.findIndex(gasto => gasto.id == id)
    
    if (pos >= 0)
    {
        gastos.splice(pos, 1)
    }
}
function calcularTotalGastos() {
    let totalgastos = 0;
    
    for (let i = 0; i < gastos.length; i++)
    {
        totalgastos = totalgastos + gastos[i].valor;
    }

    return totalgastos;
}
function calcularBalance() {
    let balance;

    balance = presupuesto - calcularTotalGastos();

    return balance;
}
function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}) {

    let gastosFiltrados = gastos;  

    gastosFiltrados = gastosFiltrados.filter(function (gasto) {

        let encontrado = true;

        if (fechaDesde)
        {
            if (gasto.fecha < Date.parse(fechaDesde))
            {
                encontrado = false;
            }
        }

        if (fechaHasta)
        {
            if (gasto.fecha > Date.parse(fechaHasta))
            {
                encontrado = false;
            }
        }

        if (valorMinimo)
        {
            if (gasto.valor < valorMinimo)
            {
                encontrado = false;
            }
        }

        if (valorMaximo)
        {
            if (gasto.valor > valorMaximo)
            {
                encontrado = false;
            }
        }
        
        if (descripcionContiene)
        {
            if (!gasto.descripcion.includes(descripcionContiene))
            {
                encontrado = false;
            }
        }

        if (etiquetasTiene)
        {
            let tiene = false
            for (let i = 0; i < gasto.etiquetas.length; i++)
            {
                for (let j = 0; j < etiquetasTiene.length; j++)
                {
                    if (gasto.etiquetas[i] == etiquetasTiene[j])
                    {
                        tiene = true;
                    }
                }
            }

            if (tiene == false)
            {
                encontrado = false;
            }
        }
        return encontrado;
    })

    return gastosFiltrados;
}
function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta) {

    let etiquetasTiene = etiquetas;

    if (!fechaDesde)
    {
        fechaDesde = "2000-01-01";
    }

    if (!fechaHasta)
    {
        fechaHasta = new Date(Date.now()).toISOString().substr(0,10);
    }

    let grupoGastos = filtrarGastos({fechaDesde, fechaHasta, etiquetasTiene})


    let resultado = grupoGastos.reduce((acc, grupo) => { 
        
        acc[grupo.obtenerPeriodoAgrupacion(periodo)] = (acc[grupo.obtenerPeriodoAgrupacion(periodo)] || 0) + grupo.valor; 
        
        return acc;
    
    } , {});
        
    
    return resultado;
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