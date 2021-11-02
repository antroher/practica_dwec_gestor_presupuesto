// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
'use strict'

var presupuesto = 0;
var gastos = [];
var  idGasto = 0; 


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

    return(`Tu presupuesto actual es de ${presupuesto} €`);

}

function CrearGasto(descripcion1, valor1, fecha1 = Date.now(), ...etiquetas1)
    {
        if(valor1 < 0 || isNaN(valor1)){
            valor1 = 0;
        }

    let gasto = {

	    descripcion: descripcion1,
        valor: valor1,
        fecha: (typeof fecha1 === "string") ? Date.parse(fecha1) : fecha1,
        etiquetas:[...etiquetas1],
       


        mostrarGasto() {

            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);

        },

        actualizarDescripcion(newDes) {

            this.descripcion = newDes;

        },

        actualizarValor(newValor) {

            let value = parseFloat(newValor);

            if (value >= 0)
            {
                this.valor = value;
            }

        },

        anyadirEtiquetas (...etiquetas3)
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
            

        },

        mostrarGastoCompleto(){
            
            let acumulador = "";
            var fechanueva = new Date(this.fecha);
            fechanueva = fechanueva.toLocaleString();

            for (var i = 0; i < this.etiquetas.length; i++)
            {
                acumulador = acumulador + `- ${this.etiquetas[i]}\n`;
            }

            
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechanueva.toLocaleString()}\nEtiquetas:\n${acumulador}`;
              
        },
      
        actualizarFecha(nuevaFecha)
        {
            let BuenaFecha = Date.parse(nuevaFecha);

            if (!isNaN(BuenaFecha)) 
            {
                this.fecha = Date.parse(nuevaFecha);
            }
        },

        borrarEtiquetas(...etiquetas2)
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
        },
        
        
        obtenerPeriodoAgrupacion(periodo)
            {
               
                //El +1 en el mes porque enero empieza en 0

                let MostrarFecha = new Date(this.fecha);
                let resultado="";
                //let dd = String (MostrarFecha.getDate()).padstart(2,'0'); ----- agregame un 0 al principio si no tiene 2 caracters
                switch(periodo) {
                    case "dia":
                        if (MostrarFecha.getDate() < 10) 
                        {
                            if (MostrarFecha.getMonth() < 9)
                                resultado =`${MostrarFecha.getFullYear()}-0${MostrarFecha.getMonth() + 1}-0${MostrarFecha.getDate()}`;
                            else
                                resultado=`${MostrarFecha.getFullYear()}-${MostrarFecha.getMonth() + 1}-0${MostrarFecha.getDate()}`;        
                        }
                        else
                        {
                            if (MostrarFecha.getMonth() <9)
                                resultado =`${MostrarFecha.getFullYear()}-0${MostrarFecha.getMonth() + 1}-${MostrarFecha.getDate()}`;
                            else
                                resultado=`${MostrarFecha.getFullYear()}-${MostrarFecha.getMonth() + 1}-${MostrarFecha.getDate()}`;
                        }
                        return resultado;

                    case "mes":

                        if (MostrarFecha.getMonth() < 9)
                            resultado =`${MostrarFecha.getFullYear()}-0${MostrarFecha.getMonth() + 1}`;
                        else
                            resultado=`${MostrarFecha.getFullYear()}-${MostrarFecha.getMonth() + 1}`;

                        return resultado;

                    case "anyo":
                        return `${MostrarFecha.getFullYear()}`;

                    default:
                        return `Has Introducido un error`;

                };
            }
        };

    return gasto;
}

function listarGastos()
{
    return gastos;
}

function anyadirGasto(gasto)
{
    gasto.id = idGasto;
    idGasto ++;
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
    let totalGastos = calcularTotalGastos();

    result = presupuesto - totalGastos;
    return result;

}

function filtrarGastos(objeto)
{
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

    if (objeto.hasOwnProperty('etiquetasTiene')) 
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
   
   
function agruparGastos (periodo = "mes", etiquetas1=[], fechaDesde1="", fechaHasta1="")
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
