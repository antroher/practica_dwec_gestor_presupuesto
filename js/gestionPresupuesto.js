// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gasto = [];
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

function CrearGasto(desintro, valorintro, fecha, etiquetas) {
    // TODO
    if(valorintro < 0 || isNaN(valorintro))
    {
        valorintro = 0;
    }
    if(etiquetas == null)
    {
        etiquetas = new Array();
    }
    if(fecha == null)
    {
        fecha = Date.now();
    }

    let gasto =
    {
        descripcion : desintro,
        valor : valorintro,
        mostrarGasto : function(){
            return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        },
        actualizarDescripcion : function(description2){ 
            this.descripcion = description2;
        },
        actualizarValor : function(valor2){ 
            if(valor2 > 0)
            {
                this.valor = valor2;
            }
        }
    
    };

    return gasto;
}

// Ejercicio 2

function listarGastos(){

    return gasto;

}

function anyadirGasto(){



}

function borrarGasto(){



}

function calcularTotalGastos(){

    for(let i = 0; i <= gasto.length(); i++)
    {
        let total = gasto[i].valor + total;
    }

}

function calcularBalance(){

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
