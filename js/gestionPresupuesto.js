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
    if(etiquetas == null)
    {
        etiquetas = new Array();
    }

    if(typeof fecha === 'string')
    {
        fecha = date.parse(fecha);
    }

    let gasto =
    {
        descripcion : desintro,
        valor : valorintro,
        etiquetas : [...etiquetas],
        fecha: fecha,

        mostrarGastoCompleto : function() {
            let texto = (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €. \n
                          Fecha: ${this.fecha} \n
                          Etiquetas: \n`);
            let texto2 = "";
            for(let etiqueta of this.etiquetas){

                texto2 = texto2 + ` - ${this.etiquetas} \n`;

            }

            let textoFin = texto + texto2;

            return textoFin;
            
        },

        actualizarFecha : function(nFecha) {

            nFecha = Date.parse(nfecha);

            if(!isNaN(nFecha))
            {
                this.fecha = nFecha;
            }

        },
        
        actualizarDescripcion : function(description2) { 
            this.descripcion = description2;
        },
        
        actualizarValor : function(valor2){ 
            if(valor2 > 0)
            {
                this.valor = valor2;
            }
        },

        anyadirEtiquetas : function(...etiquetas) {

            let nEtiquetas = this.etiquetas.filter((aux) =>{

                if(this.etiquetas.includes(aux)){
                    return aux;
                }
            });

            this.etiquetas.push(...etiquetas)
        },

        borrarEtiquetas : function() {



        } 
    };

    return gasto;
}

// Ejercicio 2

function listarGastos() {

    return gastos;

}

function anyadirGasto(gasto) {

    gasto.id = idGasto;
    idGasto = idGasto + 1;
    gastos.push(gasto);

}

function borrarGasto(id) {

    for(let i = 0; i <= gastos.length(); i++) {

        if(gastos[i].gasto.id == id)
        {
            gastos.splice(i);
        }

    }

}

function calcularTotalGastos() {

    for(let i = 0; i <= gastos.length(); i++) {
        let num = gastos[i].gasto.valor() + num;
    }

    return num;
}

function calcularBalance() {
    
    let totalGastos = calcularTotalGastos();
    let balance = presupuesto - totalGastos;
    return balance;

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
    calcularBalance
}
