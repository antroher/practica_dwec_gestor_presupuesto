// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
'use strict'
var presupuesto = 0;

var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(precio) {
    
    let devuelveValor;
    
    if (precio >= 0)
    {
        presupuesto = precio;
        devuelveValor = presupuesto;
    }
    else
    {
        console.log('Es un error');
        devuelveValor = -1;
    }
    return devuelveValor;
}

function mostrarPresupuesto() {    
    console.log(`Tu presupuesto actual es de ${presupuesto} €`);
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion1, valor1, fecha1 = Date.now(), ...etiquetas1) {  

    if (valor1 < 0 || isNaN(valor1))
    {
        valor1 = 0;
    }

    if (etiquetas1 == "" || etiquetas1 == null)
    {
        etiquetas1 = [];
    }        
    
        this.descripcion = descripcion1;
        this.valor = valor1;
        this.etiquetas = [...etiquetas1];
        this.fecha = (typeof fecha1 == 'string') ? Date.parse(fecha1): fecha1;

        this.mostrarGasto = function()
        {
            console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
            return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        };

        this.actualizarDescripcion = function(nuevaDesc) 
        {
            this.descripcion = nuevaDesc;
        };

        this.actualizarValor = function(nuevoNum) 
        {
            if(nuevoNum >= 0)
            {
                this.valor = nuevoNum;
            }                
        };         

        this.actualizarFecha = function(fechaNueva)
        {
            let fechaNueva1 = Date.parse(fechaNueva);
            if (typeof fechaNueva === 'string' && fechaNueva1)
            {
                this.fecha = Date.parse(fechaNueva)
            }
        };

        this.anyadirEtiquetas = function(...etiquetasNuevas) 
        {            
            let NoExiste = 0;
            for (let i = 0; i < etiquetasNuevas.length; i++)
            {
                NoExiste = this.etiquetas.indexOf(etiquetasNuevas[i]);
                if (NoExiste == -1)
                {
                    this.etiquetas.push(etiquetasNuevas[i]);
                }
            }
        };

        this.borrarEtiquetas = function(...etiquetasOut) 
        {
            let existe = 0;
            for (let i = 0; i < etiquetasOut.length; i++)
            {
                existe = this.etiquetas.indexOf(etiquetasOut[i]);
                if (existe != -1)
                {
                    this.etiquetas.splice(existe, 1);
                }
            }
        };

        this.mostrarGastoCompleto = function()
        {            
            let fechaNew = new Date(this.fecha);            
            let comentario1 = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaNew.toLocaleString()}\nEtiquetas:\n`;            
            let comentario2 = "";
            for (let i = 0; i < this.etiquetas.length; i++)
            {
                comentario2 = comentario2 + `- ${this.etiquetas[i]}\n`;
            }
            return comentario1 + comentario2;            
        };

        this.obtenerPeriodoAgrupacion = function(periodo)
        {
            let NuevaFecha = new Date(this.fecha);
            let dd = NuevaFecha.getDate();
            let mm = NuevaFecha.getMonth();
            let yyyy = NuevaFecha.getFullYear();            
            let devuelve = '';
            switch (periodo)
            {
                case "dia":
                    {
                        if (dd < 10)
                        {
                            if (mm < 9)
                            {
                                devuelve = `${yyyy}-0${mm + 1}-0${dd}`;
                            }
                            else
                            {
                                devuelve = `${yyyy}-${mm + 1}-0${dd}`;
                            }
                        }
                        else
                        {
                            if (mm < 9)
                            {
                                devuelve = `${yyyy}-0${mm + 1}-${dd}`;
                            }
                            else 
                            {
                                devuelve = `${yyyy}-${mm + 1}-${dd}`;
                            }
                        }  
                        break;                      
                    }                                                                                
                case "mes":
                    {
                        if (mm < 9)
                        {
                            devuelve = `${yyyy}-0${mm + 1}`;
                        }
                        else
                        {
                            devuelve =`${yyyy}-${mm + 1}`;
                        }
                    }
                    break;
                case "anyo":
                    devuelve = `${yyyy}`;
                    break;
                default:
                    devuelve = 'Error';
            }
            return devuelve;  
        }       
    
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
        if(gastos[i].id === id)
        {
            gastos.splice(i,1);
        }
    }
}

function calcularTotalGastos()
{
    let gastosTotal = 0;
    for (let i = 0; i < gastos.length; i++)
    {
        gastosTotal = gastosTotal + gastos[i].valor;
    }
    return gastosTotal;
}

function calcularBalance()
{
    let gastosTotal1 = calcularTotalGastos();
    let balance = presupuesto - gastosTotal1;
    return balance;
}

function filtrarGastos(objeto)
{
    let ArrayGastos = [];
    let fDesde;
    if (objeto.hasOwnProperty('fechaDesde'))
    {
        if (typeof objeto.fechaDesde === 'string')
        {
            if(!isNaN(Date.parse(objeto.fechaDesde)))
            {
                fDesde = Date.parse(objeto.fechaDesde);
            }
            else
            {
                fDesde = undefined;
            }
        }        
    }

    let fHasta;
    if (objeto.hasOwnProperty('fechaHasta'))
    {
        if (typeof objeto.fechaHasta === 'string')
        {
            if(!isNaN(Date.parse(objeto.fechaHasta)))
            {
                fHasta = Date.parse(objeto.fechaHasta);
            }
            else
            {
                fHasta = undefined;
            }
        }        
    }

    let vMinimo;
    if (objeto.hasOwnProperty('valorMinimo'))
    {
        vMinimo = objeto.valorMinimo;
    }

    let vMaximo;
    if (objeto.hasOwnProperty('valorMaximo'))
    {
        vMaximo = objeto.valorMaximo;
    }

    let desCont;
    if (objeto.hasOwnProperty('descripcionContiene'))
    {
        if(isNaN(objeto.descripcionContiene))
        {
            desCont = objeto.descripcionContiene;
        }        
    }

    let etiqTiene;
    if (objeto.hasOwnProperty('etiquetasTiene')&& Array.isArray(objeto.etiquetasTiene))
    {
        etiqTiene = [...objeto.etiquetasTiene];
    }

     ArrayGastos = gastos.filter(function(item)
    {
        let DevolverBool = true;       

        if (typeof fDesde !== 'undefined')
        {
            if (item.fecha < fDesde)
            {
                DevolverBool = false;
            }
        }   
        
        if (typeof fHasta !== 'undefined')
        {
            if (item.fecha > fHasta)
            {
                DevolverBool = false;
            }
        }

        if (typeof vMinimo !== 'undefined')
        {
            if (item.valor < vMinimo)
            {
                DevolverBool = false;
            }            
        }

        if (typeof vMaximo !== 'undefined')
        {
            if (item.valor > vMaximo)
            {
                DevolverBool = false;
            }
        }       
            
        if (typeof desCont !== 'undefined')
        {
            if (!item.descripcion.includes(desCont))
            {
                DevolverBool = false;
            }            
        }
        
        let existe = false;
        if (typeof etiqTiene !== 'undefined')
        {            
            if (etiqTiene.length > 0)
            {
                for (let i of etiqTiene)
                {
                    for (let j of item.etiquetas)
                    {
                        if (i === j)
                        {
                            existe = true;
                        }
                    }                    
                }  
            }                      
        }
        else 
        {
            existe = true;
        }
        
        return DevolverBool && existe; 

    });    

    return ArrayGastos;

}

function agruparGastos(periodo = 'mes', etiquetas = [], fDesde, fHasta)
{    
    let now = new Date();
    let dd = String(now.getDate()).padStart(2, '0');
    let mm = String(now.getMonth()+1).padStart(2, '0');
    let yyyy = String(now.getFullYear());
    let filtrar = new Object;
    
    if (!isNaN(Date.parse(fDesde)))
    {
        filtrar.fechaDesde = fDesde;
    }

    if (isNaN(Date.parse(fHasta)))
    {
        filtrar.fHasta = `${yyyy}-${mm}-${dd}`;
    }  
    else
    {
        filtrar.fechaHasta = fHasta;
    }  

    if (etiquetas.length>0)
    {
        filtrar.etiquetasTiene = [...etiquetas];
    } 

    let filtrarGast = filtrarGastos(filtrar);

    let agruparReduce = filtrarGast.reduce(function (acum, item)
    {
        
        let periodi = item.obtenerPeriodoAgrupacion(periodo);
        
        if (acum.hasOwnProperty(periodi)) 
        {
           if (isNaN(acum[periodi]))
           acum[periodi] = 0;
        }
        else
        {
            acum[periodi] = 0;
        }
      
        acum[periodi] = acum[periodi] + item.valor;
       
        return acum;

    }, {});    

    return agruparReduce;
}

//PRACTICA 7
function transformarListadoEtiquetas(etiquetas)
{
    let ArrayEtiquetas = etiquetas.match(/[a-zA-Z0-9]/gi);
    return ArrayEtiquetas;
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
    transformarListadoEtiquetas
}
