// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = new Array();
var idGasto = 0;

// Ejercicio 1

function actualizarPresupuesto(num) {
    // TODO
    let retorno ;

    if(isNaN(num)){
        retorno = -1;
    } else {    
        if(num < 0)
        {
            console.log('El dato introducido tiene que ser positivo');
            retorno = -1;
        }
        else
        {
            presupuesto = num;
            retorno = presupuesto;
        }
    }

    return retorno;
}

function mostrarPresupuesto() {
    // TODO
    let texto = 'Tu presupuesto actual es de ' + presupuesto + ' €';
    return texto;
}

//constructor

function CrearGasto(desintro, valorintro, fecha = Date.now(), ...etiquetas) {
    // TODO
    if(valorintro < 0 || isNaN(valorintro))
    {
        valorintro = 0;
    }
    /*if(etiquetas == null)
    {
        etiquetas = new Array();
    }*/

    const gasto = {
        valor : valorintro,
        descripcion : desintro,
        etiquetas : [...etiquetas],
        fecha : (typeof fecha === 'string') ? Date.parse(fecha) : fecha,

        mostrarGastoCompleto : function() {

            let Afecha;
            if(typeof this.fecha === 'string')
            {
                Afecha = Date.parse(this.fecha);
            }
            else
            {
                Afecha = this.fecha;
            }
            
            let Bfecha = new Date(Afecha);
            let texto2 = "";

            for(let etiqueta of this.etiquetas) {
                texto2 = texto2 + `- ${etiqueta}\n`;
            };

            let textoFin = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(Bfecha.toLocaleString())}\nEtiquetas:\n`;
            textoFin = textoFin + texto2;

            return textoFin;
            
        },

        actualizarFecha : function(nFecha) {

            let iFecha = Date.parse(nFecha);

            if(!isNaN(iFecha))
            {
                this.fecha = Date.parse(nFecha);
            }

        },
        
        actualizarDescripcion : function(description2) { 
            this.descripcion = description2;
        },
        
        actualizarValor : function(valor2) { 
            if(valor2 > 0)
            {
                this.valor = valor2;
            }
        },

        anyadirEtiquetas : function(...etiquetas) {

            const nEtiquetas = etiquetas.filter((aux) => {
                if (!this.etiquetas.includes(aux)) {
                    return aux;
                }
            });

            this.etiquetas.push(...nEtiquetas)
        },

        borrarEtiquetas : function(...etiquetas) {
            etiquetas.forEach((aux) => {
                for (let i = 0; i < this.etiquetas.length; i++) {
                    if (this.etiquetas[i] === aux) {
                        this.etiquetas.splice(i, 1);
                    }
                }
            })
        }, 

        obtenerPeriodoAgrupacion : function(intro) {
 
            //let str = "";
            //let result = "";

            let fechaA = new Date(this.fecha);
            //fechaA.toISOString().split('T')[0];
            //fechaA.toISOString().slice(0, 10);
            //let offset = fechaA.getTimezoneOffset();
            //let dateofftime = new Date(fechaA.getTime() - (offset*60*1000));
            let dateofftime = fechaA.toISOString();
            dateofftime = dateofftime.slice(0,10);
            
            switch(intro) {
                case "dia": {
                    let result = dateofftime;
                    return result;
                    break;
                }

                case "mes": {
                    let str = dateofftime;
                    let result = str.substring(0,7);
                    return result;   
                    break;
                }
                
                case "anyo": {
                    let str = dateofftime;
                    let result = str.substring(0,4);
                    return result;
                    break;
                }
                
                default:{
                    return 'Error';
                }
            }

        }
    };

    return gasto;
}

// Ejercicio 2 funciones

function listarGastos() {

    return gastos;

}

function anyadirGasto(gasto) {

    gasto.id = idGasto;
    idGasto = idGasto + 1;
    gastos.push(gasto);

}

function borrarGasto(id) {

    for(let i = 0; i < gastos.length; i++) {

        if(gastos[i].id == id)
        {
            gastos.splice(i, 1);
        }

    }

}

function calcularTotalGastos() {

    let num = 0;

    for(let i = 0; i < gastos.length; i++) {
        num = gastos[i].valor + num;
    }

    return num;
}

function calcularBalance() {
    
    let totalGastos = calcularTotalGastos();
    let balance = presupuesto - totalGastos;
    return balance;

}

// ejercicio 3 funciones

function filtrarGastos(filtro) {
    let gastosB = Object.assign(gastos);
    if(typeof filtro === 'object' && filtro != null) {

        //fechaDesde
        if(typeof filtro.fechaDesde === 'string' && filtro.fechaDesde != null) { 


            
        }

        //fechaHasta
        /*if() {

        }

        //valorMinimo
        if() {

        }

        //valorMaximo
        if() {

        }

        //descripcionContiene
        if() {

        }

        //etiquetasTiene
        if() {

        }*/
    }

    return gastos;
}

function agruparGastos() {

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
