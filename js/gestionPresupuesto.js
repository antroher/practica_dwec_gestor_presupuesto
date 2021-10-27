// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
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
     
    let gasto = {
        descripcion: descripcion1,
        valor: valor1, 
        etiquetas: [...etiquetas1],
        fecha: (typeof fecha1 == 'string') ? Date.parse(fecha1): fecha1,  

        mostrarGasto()
        {
            console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
            return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        }, 

        actualizarDescripcion(nuevaDesc) 
        {
            this.descripcion = nuevaDesc;
        },

        actualizarValor(nuevoNum) 
        {
            if(nuevoNum >= 0)
            {
                this.valor = nuevoNum;
            }                
        },         

        actualizarFecha(fechaNueva)
        {
            let fechaNueva1 = Date.parse(fechaNueva);
            if (typeof fechaNueva === 'string' && fechaNueva1)
            {
                this.fecha = Date.parse(fechaNueva)
            }
        },

        anyadirEtiquetas(...etiquetasNuevas) 
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
        },

        borrarEtiquetas(...etiquetasOut) 
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
        }, 

        mostrarGastoCompleto()
        {            
            let fechaNew = new Date(this.fecha);            
            let comentario1 = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaNew.toLocaleString()}\nEtiquetas:\n`;            
            let comentario2 = "";
            for (let i = 0; i < this.etiquetas.length; i++)
            {
                comentario2 = comentario2 + `- ${this.etiquetas[i]}\n`;
            }
            return comentario1 + comentario2;            
        },

        obtenerPeriodoAgrupacion(periodo)
        {
            let NuevaFecha = new Date(this.fecha);
            let dd = NuevaFecha.getDate();
            let mm = NuevaFecha.getMonth();
            let yyyy = NuevaFecha.getFullYear();            

            switch (periodo)
            {
                case "dia":
                    {
                        if (dd < 10)
                        {
                            if (mm < 10)
                            {
                                return `${yyyy}-0${mm + 1}-0${dd}`;
                            }
                            else
                            {
                                return `${yyyy}-${mm + 1}-0${dd}`;
                            }
                        }
                        else
                        {
                            if (mm < 10)
                            {
                                return `${yyyy}-0${mm + 1}-${dd}`;
                            }
                            else 
                            {
                                return `${yyyy}-${mm + 1}-${dd}`;
                            }
                        }                        
                    }                                                            
                case "mes":
                    {
                        if (mm < 10)
                        {
                            return `${yyyy}-0${mm + 1}`;
                        }
                        else
                        {
                            return `${yyyy}-${mm + 1}`;
                        }
                    }
                case "anyo":
                    return `${yyyy}`;
                default:
                    return 'Error';
            }  
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
    if (objeto.hasOwnProperty('etiquetasTiene'))
    {
        etiqTiene = [...objeto.etiquetasTiene];
    }

    let ArrayGastos = gastos.filter(function(item)
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
        
        let existe;
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

function agruparGastos(periodo = 'mes', etiquetas = [], fDesde, fHasta = Date.now())
{
    let filtrar = 
    { 
        etiquetasTiene: etiquetas,
        fechaDesde: fDesde,
        fechaHasta: fHasta
    }

    let filtrarGast = filtrarGastos(filtrar);

    let agruparReduce = filtrarGast.reduce(function (acum, item) {
        
        let periodi = item.obtenerPeriodoAgrupacion(periodo);
        
        if (acum.hasOwnProperty(periodi)) 
        {
            acum[periodi] = acum[periodi] + item.valor;
        }
        else
        {
            acum[periodi] = item.valor;
        }
        return acum;
    }, {});

    return agruparReduce;

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
