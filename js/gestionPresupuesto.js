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

function filtrarGastos(newFiltro)
{
    
    let fechaDesde = Date.parse(newFiltro.fechaDesde);
    if (newFiltro.hasOwnPropery('fechaDesde'))
    {
        if(!isNaN(fechaDesde))
        {
            fechaDesde = Date.parse(newFiltro.fechaDesde);
        }
    }

    let fechaHasta = Date.parse(newFiltro.fechaHasta);
    if (newFiltro.hasOwnPropery('fechaHasta'))
    {
        if(!isNaN(fechaHasta))
        {
            fechaHasta = Date.parse(newFiltro.fechaHasta);
        }
    }

    let valorMinimo;
    if (newFiltro.hasOwnPropery('valorMinimo'))
    {
        valorMinimo = newFiltro.valorMinimo;
    }

    let valorMaximo;
    if (newFiltro.hasOwnPropery('valorMaximo'))
    {
        valorMaximo = newFiltro.valorMaximo;
    }

    let descripcionContiene;
    if (newFiltro.hasOwnPropery('descripcionContiene'))
    {
        descripcionContiene = newFiltro.descripcionContiene;
    }

    let etiquetasTiene;
    if (newFiltro.hasOwnPropery('etiquetasTiene'))
    {
        etiquetasTiene = newFiltro.etiquetasTiene;
    }

    //BOOL TRUE Y FALSE
}

function agruparGastos()
{

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
