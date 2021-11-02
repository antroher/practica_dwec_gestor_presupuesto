// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
"use strict";
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    let valorfinal;
    if(valor < 0 || isNaN(valor))
    {
        console.log("Error, el presupuesto no puede ser menor que 0");
        valorfinal = -1;
    }
    else
    {
        presupuesto = valor;
        valorfinal = presupuesto;
    }
    return valorfinal;
}

function listarGastos(){
    return gastos;
}

function mostrarPresupuesto() {
    console.log("Tu presupuesto actual es de " + presupuesto + " €");
    return ("Tu presupuesto actual es de " + presupuesto + " €");
}

function anyadirGasto(gasto)
{
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id)
{
    for(let i = 0 ; i < gastos.length; i++)
    {
        if(gastos[i].id == id)
        {
            gastos.splice(i , 1);
        }
    }
}

function calcularTotalGastos()
{
    let aux = 0;
    for(let i = 0; i < gastos.length; i++)
    {
        aux = gastos[i].valor + aux
    }
    return aux;
}

function calcularBalance()
{
    return (presupuesto - calcularTotalGastos());
}

function filtrarGastos(objeto)
{
    let fd;
    let fh;
    let valormin;
    let valormax;
    let descContiene;
    let etiTiene;
    if(objeto.hasOwnProperty("fechaDesde"))
    {
        if(typeof objeto.fechaDesde === "string")
        {
            if(!isNan(Date.parse(objeto.fechaDesde)))
            {
                fd = Date.parse(objeto.fechaDesde);
            }
            else
            {
                fd = undefined;
            }
        }
    }
    if(objeto.hasOwnProperty("fechaHasta"))
    {
        if(typeof objeto.fechaHasta === "string")
        {
            if(!isNan(Date.parse(objeto.fechaHasta)))
            {
                fh = Date.parse(objeto.fechaHasta);
            }
            else
            {
                fh = undefined;
            }
        }
    }
    if(objeto.hasOwnProperty("valorMinimo"))
    {
        if(typeof objeto.valorMinimo === "number")
        {
           
                valormin = objeto.valorMinimo;
        }
            else
            {
                valormin = undefined;
            }
    }
    
    if(objeto.hasOwnProperty("valorMaximo"))
    {
        if(typeof objeto.valorMaximo === "number")
        {
           
                valormax = objeto.valorMaximo;
        }
            else
            {
                valormax = undefined;
            }
    }
    if(objeto.hasOwnProperty("descripcionContiene"))
    {
        if(typeof objeto.descripcionContiene === "string")
        {
           
                descContiene = objeto.descripcionContiene;
        }
            else
            {
                descContiene = undefined;
            }
    }
    if(objeto.hasOwnProperty("etiquetasTiene"))
    {
        etiTiene = [...gasto.etiquetasTiene];
    }

    let results = gastos.filter(function(item){
        let devuelve = true;
        let latiene = false;
        if(typeof fd !== "undefined")
        {
            if(item.fecha < fd)
            {
                devuelve = false;
            }
        }

        if(typeof fh !== "undefined")
        {
            if(item.fecha > fh)
            {
                devuelve = false;
            }
        }
        if(typeof valormin !== "undefined")
        {
            if(item.valor < valormin)
            {
                devuelve = false;
            }
        }
        if(typeof valormax !== "undefined")
        {
            if(item.valor > valormax)
            {
                devuelve = false;
            }
        }
        if(typeof descripcionContiene !== "undefined")
        {
            if(item.descripcionContiene.includes(descContiene) == false)
            {
                devuelve = false;
            }
        }
        if(typeof etiTiene !== "undefined")
        {
            for(let i = 0; i < etiTiene.length; i++)
            {
                if(item.etiquetasTiene.includes(etiTiene[i]))
                {
                    devuelve = false;
                }
            }
        }


        console.log(devuelve);
        return devuelve;
    });
    return results;
}

function agruparGastos(periodo = "mes", etiquetas = [],fechaDesde, fechaHasta){
    

}

function CrearGasto(midescripcion, mivalor, mifecha = Date.now(), ...misetiquetas) {
    if(mivalor < 0 || isNaN(mivalor))
    {
        mivalor = 0;
    }
    if(misetiquetas.length == 0)
    {
        misetiquetas = []
    }
    if(typeof mifecha == "string")
    {
        if(isNan(Date.parse(mifecha)))
        {
            mifecha = Date.Now()
        }
        else
        {
            mifecha = Date.parse(mifecha);
        }
    }
    
    let gasto = {
    descripcion: midescripcion,
    valor: parseFloat(mivalor),
    fecha: mifecha,
    etiquetas: [...misetiquetas],
    
    mostrarGasto() {
        console.log("Gasto correspondiente a "+ gasto.descripcion + " con valor " + gasto.valor + " €")
        return ("Gasto correspondiente a "+ gasto.descripcion + " con valor " + gasto.valor + " €");
    },

    actualizarDescripcion(ladescripcion) {
        this.descripcion = ladescripcion;
    },
    actualizarValor(elvalor) 
    {
        if(elvalor >= 0)
        {
         this.valor = elvalor;
        }
    },
    actualizarFecha: function (lafecha) {
        let isValidDate = Date.parse(lafecha);
        if (!isNaN(isValidDate)) {
            this.fecha = Date.parse(lafecha);
        }
    },
    anyadirEtiquetas(...lasetiquetas)
    {
        for(let i = 0; i < lasetiquetas.length; i++)
        {
            if(this.etiquetas.includes(misetiquetas[i]))
            continue;
            else
            this.etiquetas.push(lasetiquetas[i])
        }
    },
    borrarEtiquetas(...lasetiquetas)
    {
        for(let i = 0; i < lasetiquetas.length; i++)
        {
            for(let j = 0; i < lasetiquetas.length; j++)
            {
                if(lasetiquetas[i] == this.etiquetas[f])
                {
                    this.etiquetas.splice(f , 1);
                }
            }
        }
       
    },
    mostrarGastoCompleto(){
        let final = "";
        let lafecha = new Date(this.fecha);
         final = ("Gasto correspondiente a "+ this.descripcion + " con valor " + this.valor + " €");
         for(let i = 0; i < lasetiquetas.length; i++)
         {
             for (let j = 0; i < this.etiquetas.length; j++)
                 final = "- " + this.etiquetas[i] /n;
         }
         console.log(final);
         return final;

    },
    obtenerPeriodoAgrupacion(PAgrup)
    {
        let fec = new Date(this.fecha);
        let dd = String(fec.getDate()).padstart(2,'0');
        let mm = String(fec.getMonth()+1).padstart(2,'0');
        let yyyy = String(fec.getFullYear());
        let resultado = "";
       if(PAgrup == "año")
       {
            resultado = yyyy;
            
       }
       else if(PAgrup == "mes")
       {
            resultado = (yyyy+ "-" + mm);
            
       }
       else if(PAgrup == "dia")
       {
            resultado = (yyyy + "-" + mm + "-" + dd);
            
       }
       return resultado;
    }
    };
    
   
    return gasto;

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
