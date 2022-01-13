// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
"use strict";
var presupuesto = 0;

var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(actualizar) {

    let devolverValor;

    if(actualizar >= 0)
    {
        presupuesto = actualizar;
        devolverValor = presupuesto;
    }
    else
    {
        console.log("Es inferior a 0");
        devolverValor= -1;
    }
    return devolverValor; 
}

function mostrarPresupuesto() {
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion1, valor1, fecha1 = Date.now(), ...etiquetas1) {

    if(valor1 < 0 || isNaN(valor1)){
        valor1 = 0;
    }

    this.descripcion = descripcion1;
    this.valor = valor1;
    this.fecha = (typeof fecha1 === "string") ? Date.parse(fecha1) : fecha1;
    this.etiquetas = [...etiquetas1];

    this.mostrarGasto = function (){
        console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    };

    this.actualizarDescripcion= function(nuevaDescripcion)
    {
        this.descripcion = nuevaDescripcion; 
    };

    this.actualizarValor= function(nuevoValor){

        if (nuevoValor >= 0){
            this.valor = nuevoValor;
        }
    };

    this.anyadirEtiquetas = function (...etiquetas3)
    {
        let nuevaEtiqueta = 0;
        for(let i = 0; i < etiquetas3.length; i++)
        {
            nuevaEtiqueta = this.etiquetas.indexOf(etiquetas3[i]);
            if (nuevaEtiqueta == -1)
            {
                this.etiquetas.push(etiquetas3[i]);
            }
        }      
    };

    this.mostrarGastoCompleto = function(){

        let acumulador = "";
        var fechanueva = new Date(this.fecha);
        fechanueva = fechanueva.toLocaleString();

        for (var i = 0; i < this.etiquetas.length; i++)
        {
            acumulador = acumulador + `- ${this.etiquetas[i]}\n`;
        } 
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechanueva.toLocaleString()}\nEtiquetas:\n${acumulador}`;
    };

    this.actualizarFecha= function(nuevaFecha)
    {
        let BuenaFecha = Date.parse(nuevaFecha);

        if (!isNaN(BuenaFecha)) 
        {
            this.fecha = Date.parse(nuevaFecha);
        }
    };

    this.borrarEtiquetas= function(...etiquetas2)
    {
        let eliminarEtiqueta = 0;
        for (let i = 0; i < etiquetas2.length; i++)
        {
            eliminarEtiqueta = this.etiquetas.indexOf(etiquetas2[i]);
            if(eliminarEtiqueta != -1)
            {
                this.etiquetas.splice(eliminarEtiqueta, 1);
            }
        } 
    };

    this.obtenerPeriodoAgrupacion= function(periodo)
    {
        /*let MostrarFecha = new Date(this.fecha);
        let resultado="";
        let dd = String (MostrarFecha.getDate()).padstart(2,'0');  //----- agregame un 0 al principio si no tiene 2 caracters
        let mm = String (MostrarFecha.getMonth() + 1).padstart(2,'0'); 
        let yyyy = String (MostrarFecha.getFullYear()); 
        switch (periodo) {
            case "dia":
                    resultado = `${yyyy}-${mm}-${dd}`;
                return resultado;

            case "mes":
                        resultado = `${yyyy}-${mm}`;
                    return resultado;

            case "anyo":
                return `${yyyy}`;

            default:
                return `Has Introducido un error`;
        };*/


        //El +1 en el mes porque enero empieza en 0
        let MostarFecha = new Date(this.fecha);
        let resultado="";
        //let dd = String (MostrarFecha.getDate()).padstart(2,'0'); ----- agregame un 0 al principio si no tiene 2 caracters
        switch(periodo) {
            case "dia":
                if (MostarFecha.getDate() < 10) 
                {
                    if (MostarFecha.getMonth() < 9)
                        resultado =`${MostarFecha.getFullYear()}-0${MostarFecha.getMonth() + 1}-0${MostarFecha.getDate()}`;
                    else
                        resultado=`${MostarFecha.getFullYear()}-${MostarFecha.getMonth() + 1}-0${MostarFecha.getDate()}`;        
                }
                else
                {
                    if (MostarFecha.getMonth() <9)
                        resultado =`${MostarFecha.getFullYear()}-0${MostarFecha.getMonth() + 1}-${MostarFecha.getDate()}`;
                    else
                        resultado=`${MostarFecha.getFullYear()}-${MostarFecha.getMonth() + 1}-${MostarFecha.getDate()}`;
                }
                return resultado;

            case "mes":
                
                if (MostarFecha.getMonth() < 9)
                    resultado =`${MostarFecha.getFullYear()}-0${MostarFecha.getMonth() + 1}`;
                else
                    resultado=`${MostarFecha.getFullYear()}-${MostarFecha.getMonth() + 1}`;

                return resultado;

            case "anyo":
                return `${MostarFecha.getFullYear()}`;

            default:
                return `Has Introducido un error`;

        };
    };
}


function listarGastos()
{
    return gastos;
}

function anyadirGasto(gasto)
{
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id)
{
    for (let i = 0; i < gastos.length; i++) 
    {
        if (gastos[i].id === id) 
        {
            gastos.splice(i, 1);
        }
    }
}
function calcularTotalGastos()
{
    let suma = 0;
    for (let i = 0; i < gastos.length; i++)
    {
        suma += gastos[i].valor;
    }
    return suma;
}
function calcularBalance() 
{
    let result = 0;
    let totalgastos = calcularTotalGastos();

    result = presupuesto - totalgastos;

    return result;
}

function filtrarGastos(objeto) {

    let fechaDesde1, fecha_desde;
    let fechaHasta1, fecha_hasta;
    let valorMin;
    let valorMax;
    let descripcion;
    let etiqueta;
    let result = [];


    if (objeto.hasOwnProperty('fechaDesde')) 
    {
        fecha_desde = Date.parse(objeto.fechaDesde);
        if (typeof objeto.fechaDesde === 'string') 
        {
            if (!isNaN(fecha_desde)) 
                fechaDesde1 = fecha_desde;
            else
                fechaDesde1 = undefined;
        }
    }

    if (objeto.hasOwnProperty('fechaHasta')) 
    {
        fecha_hasta = Date.parse(objeto.fechaHasta);
        if (typeof objeto.fechaHasta === 'string') 
        {
            if (!isNaN(fecha_hasta)) 
                fechaHasta1 = fecha_hasta;
            else
                fechaDesde1 = undefined;
        }
    }

    if (objeto.hasOwnProperty('valorMinimo')) 
    {
        valorMin = objeto.valorMinimo;
    }

    if (objeto.hasOwnProperty('valorMaximo')) 
    {
        valorMax = objeto.valorMaximo;
    }

    if (objeto.hasOwnProperty('descripcionContiene')) 
    {
        descripcion = objeto.descripcionContiene;
    }

    if (objeto.hasOwnProperty('etiquetasTiene') && Array.isArray(objeto.etiquetasTiene)) 
    {
        etiqueta = [...objeto.etiquetasTiene];
    }

    result = gastos.filter(function (item) 
    {
        let devuelve = true;
        let devuelve2 = false;

        if (typeof fechaDesde1 !== 'undefined') 
        {
            if (item.fecha < fechaDesde1)
                devuelve = false;
        }

        if (typeof fechaHasta1 !== 'undefined') 
        {
            if (item.fecha > fechaHasta1) 
                devuelve = false;
        }

        if (typeof valorMin !== 'undefined')
        {
            if (item.valor < valorMin)
                devuelve = false;
        }

        if (typeof valorMax !== 'undefined')
        {
            if(item.valor > valorMax)
                devuelve = false;
        }

        if (typeof descripcion !== 'undefined')  
        {
            if (!item.descripcion.includes(descripcion))
                devuelve = false;
        }

        if ((typeof etiqueta !== 'undefined') && (etiqueta.length > 0))
        {          
            for (let i of etiqueta)
            {
                for (let j of item.etiquetas)
                {
                    if (i === j)
                    {
                        devuelve2 = true;
                    }
                }                    
            }                      
        }
        else 
        {
            devuelve2 = true;
        }
        
        return devuelve && devuelve2; 

    });    

    return result;
}

function agruparGastos(periodo = "mes", etiquetas1=[], fechaDesde1="", fechaHasta1="") 
{
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();

     //creación del objeto filtrar
    let filtrar = {};

    if ((typeof fechaDesde1 !== 'string') || isNaN((Date.parse(fechaDesde1))) || (typeof fechaDesde1 === 'undefined')) 
    {
        fechaDesde1 = '';
    }
    else
    {
        filtrar.fechaDesde = fechaDesde1;
    }

    if ((typeof fechaHasta1 !== 'string') || (isNaN(Date.parse(fechaHasta1))) || (typeof fechaHasta1 === 'undefined')) 
    {
        fechaHasta1 = `${yyyy}-${mm}-${dd}`;
        filtrar.fechaHasta = fechaHasta1;
    }
    else
    {
        filtrar.fechaHasta = fechaHasta1;
    }

    if (typeof etiquetas1 === 'undefined') 
    {
        etiquetas1 = [];
        filtrar.etiquetasTiene = [];
    }
    else
    {
        filtrar.etiquetasTiene = etiquetas1;
    }
       
    let filtrarGastos2 = filtrarGastos(filtrar);
   
    let result = filtrarGastos2.reduce(function (acumulador, item)
    {
        let periodo1 = item.obtenerPeriodoAgrupacion(periodo);
    
        if (!acumulador.hasOwnProperty(periodo1))
        {
            acumulador[periodo1] = 0;
        }
        else 
        {
            if (isNaN(acumulador[periodo1]))
            {
                acumulador[periodo1] = 0;
            }
        }
        acumulador[periodo1] = acumulador[periodo1] + item.valor;
    
        return acumulador;
    }, {});
    
    return result;
}

function transformarListadoEtiquetas(etiqueta){

    let etiquetas = etiqueta.match(/[a-zA-Z0-9]+/gi);
    return etiquetas;

}

//Practica 8
function cargarGastos(Arraygastos){
    gastos = Arraygastos;
    // gastosAlmacenamiento es un array de objetos "planos"
        // No tienen acceso a los métodos creados con "CrearGasto":
        // "anyadirEtiquetas", "actualizarValor",...
        // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
      
        // Reseteamos la variable global "gastos"
        gastos = [];
        // Procesamos cada gasto del listado pasado a la función
        for (let g of Arraygastos) {
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
            gastos.push(gastoRehidratado)
        }
   
        
}


/*function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {
    let filter = {etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta}
    let aux = filtrarGastos(filter);
    let agrupar = aux.reduce((acu, item) => {
        let pred = item.obtenerPeriodoAgrupacion(periodo);
        if (acu[pred] == null) {
            acu[pred] = item.valor;
        } else {
            acu[pred] += item.valor;
        }
        return acu;
    }, {});
    return agrupar;
}*/

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
