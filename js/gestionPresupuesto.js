
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
'use strict';

var presupuesto = 0;
var idGasto = 0;
var gastos = [];

function actualizarPresupuesto(valor) {
	// TODO

	if ((valor < 0) || (isNaN(valor))) 
	{
			console.log("Error valor menor que cero ");
			valor = -1;
	}
	else
	{
		presupuesto = valor;

	}
	return valor;
}
function mostrarPresupuesto() {
    
    return "Tu presupuesto actual es de " + presupuesto + " €";
    
}
function CrearGasto(descripcion, valor = 0, fecha = Date.now(), ...etiquetas) {
    valor = parseFloat(valor);
    
    if (isNaN(valor) || valor < 0) {
        valor = 0;
    }

    this.valor = valor
    this.descripcion = descripcion
    this.etiquetas = [...etiquetas]
    this.fecha = (typeof fecha === 'string') ? Date.parse(fecha) : fecha

    this.mostrarGasto = function() 
    {
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.actualizarDescripcion =function (actdescrip)
    {
        this.descripcion=actdescrip;
    }

    this.actualizarValor = function(d1) 
    {
        if (d1 >= 0) 
        {
            this.valor = d1;
        }
    }

    this.mostrarGastoCompleto = function() 
    {
        let fec1;
        if(typeof this.fecha === 'string')
        {
            fec1 = Date.parse(this.fecha);
        }
        else
        {
            fec1 = this.fecha;
        }
        let aux = "";
        for(let etiqueta of this.etiquetas) 
        {
            aux = aux + `- ${etiqueta}\n`;
        };

        let fec2 = new Date(fec1);

        let txt = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(fec2.toLocaleString())}\nEtiquetas:\n`;
        return txt + aux;
    }

    this.actualizarFecha=function(fecstr)
    {
		let fecnew=Date.parse(fecstr);
		if ( !isNaN(fecnew) )
        {
			this.fecha=fecnew;
        }
	}

    this.anyadirEtiquetas = function(...etiquetas) 
    {
        const valoresUnicos = etiquetas.filter((x) => {
            if (!this.etiquetas.includes(x)) 
            {
                return x;
            }
        });
        this.etiquetas.push(...valoresUnicos);
    }

    this.borrarEtiquetas = function(...etiquetas) 
    {
        etiquetas.forEach((x) => {
            for (let i = 0; i < this.etiquetas.length; i++) {
                if (this.etiquetas[i] === x) 
                {
                    this.etiquetas.splice(i, 1);
                }
            }
        })
    }

    this.obtenerPeriodoAgrupacion = function(periodo) 
    {
        let validarFecha = new Date(this.fecha);
        switch(periodo) 
        {
            case "dia": { 
                if (validarFecha.getDate() < 10) 
                {
                    if (validarFecha.getMonth() < 9) 
                    {
                        return `${validarFecha.getFullYear()}-0${validarFecha.getMonth()+1}-0${validarFecha.getDate()}`;
                    }
                    else 
                    {
                        return `${validarFecha.getFullYear()}-${validarFecha.getMonth()+1}-0${validarFecha.getDate()}`;
                    }
                }
                else 
                {
                    if (validarFecha.getMonth() < 9) 
                    {
                        return `${validarFecha.getFullYear()}-0${validarFecha.getMonth()+1}-${validarFecha.getDate()}`;    
                    }
                    else 
                    {
                        return `${validarFecha.getFullYear()}-${validarFecha.getMonth()+1}-${validarFecha.getDate()}`;
                    }
                }
                break;
            }
            case "mes": {
                if(validarFecha.getMonth() < 9) 
                {
                    return `${validarFecha.getFullYear()}-0${validarFecha.getMonth()+1}`;
                }
                else 
                {
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

function transformarListadoEtiquetas(etiquetas){

    let arrayFiltrado = etiquetas.match(/[a-zA-Z0-9]+/gi);
    return arrayFiltrado;
}
function listarGastos() {
    return gastos;
}
function anyadirGasto(gas) {
    gas.id = idGasto;
    gastos.push(gas);
    idGasto += 1;
}

function borrarGasto(id) {
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === id) {
            gastos.splice(i, 1);
        }
    }
}
function calcularTotalGastos() {
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
        total += gastos[i].valor;
    }
    return total;
}
function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}
function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}){
    let gastosFil;
    gastosFil = gastos.filter(function(gasto)
    {
     let exist = true;
     if(fechaDesde)
     {
         if(gasto.fecha < Date.parse(fechaDesde)) exist = false;
     }
     if(fechaHasta)
     {
         if(gasto.fecha > Date.parse(fechaHasta)) exist = false;
     }
     if(valorMinimo)
     {
         if(gasto.valor < valorMinimo) exist = false;
     }
     if(valorMaximo)
     {
         if(gasto.valor > valorMaximo) exist = false;
     }
     if(descripcionContiene)
     {
             if(!gasto.descripcion.includes(descripcionContiene)) exist = false;
     }
     if(etiquetasTiene)
     {
         let inside = false;                   
             for (let i = 0; i < gasto.etiquetas.length; i++) 
             {                   
                 for (let p= 0; p < etiquetasTiene.length; p++) 
                 {
                     if(gasto.etiquetas[i] == etiquetasTiene[p]) inside = true;                  
                 }
             }
        if(inside == false) exist = false;
     }
         return exist;
    });
return gastosFil;  
}
function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) 
{
    let funfil = {etiquetasTiene : etiquetas, fechaDesde : fechaDesde, fechaHasta : fechaHasta}
    let rtnFiltrarGastos = filtrarGastos(funfil);
    let agrupar =
            rtnFiltrarGastos.reduce((acc, item) => {
                let periRed = item.obtenerPeriodoAgrupacion(periodo);
                if (acc[periRed] == null)
                    acc[periRed] = item.valor;
                else 
                    acc[periRed] += item.valor;
                return acc;
            }, {});
    return agrupar;
}
function cargarGastos(gastosAlmacenamiento) {
    // gastosAlmacenamiento es un array de objetos "planos"
    // No tienen acceso a los métodos creados con "CrearGasto":
    // "anyadirEtiquetas", "actualizarValor",...
    // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
  
    // Reseteamos la variable global "gastos"
    gastos = [];
    // Procesamos cada gasto del listado pasado a la función
    for (let g of gastosAlmacenamiento) {
        // Creamos un nuevo objeto mediante el constructor
        // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
        // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
        let gastoRehidratado = new CrearGasto();
        // Copiamos los datos del objeto guardado en el almacenamiento
        // al gasto rehidratado
        // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
        Object.assign(gastoRehidratado, g);
        // Ahora "gastoRehidratado" tiene las propiedades del gasto
        // almacenado y además tiene acceso a los métodos de "CrearGasto"
          
        // Añadimos el gasto rehidratado a "gastos"
        gastos.push(gastoRehidratado);
    }
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
	CrearGasto,
	anyadirGasto,
	listarGastos,
    borrarGasto,
    calcularTotalGastos,
	calcularBalance,
	filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
}
