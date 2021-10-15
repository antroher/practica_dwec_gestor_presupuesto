// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;

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

function CrearGasto(descripcion1, valor1) {  

    if (valor1 < 0 || isNaN(valor1))
    {
        valor1 = 0;
    }
    if (etiquetas == "" || etiquetas == null)
    {
        etiquetas = [];
    }
    if (fecha == null || fecha == "")
    {
        fecha = fecga.getDate();
    }
    let gasto = {
        descripcion: descripcion1,
        valor: valor1,        
        mostrarGasto(){
            console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
            return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        },    
        actualizarDescripcion(nuevaDesc) {
            this.descripcion = nuevaDesc;
        },
        actualizarValor(nuevoNum) {
            if(nuevoNum >= 0)
                {
                    this.valor = nuevoNum;
                }
        }                
    };
    return gasto;
}

//SEGUNDO EJERCICIO

var gastos = [];
var idGasto = 0;

function listarGastos()
{
    return gastos;
}

function CrearGasto 

fecha = Date.parse(fecha),
        //No sé 
        etiquetas = [],
        //timetamp + lista de parametro

        anyadirEtiquetas() {
            //NO ES SEGURO
            this.etiquetas = etiquetas.push()
        },
        borrarEtiquetas() {
            this.etiquetas = delete
        },
        actualizarFecha() {
            this.fecha = fecha.getDate();
        }



function anyadirGasto(id)
{
    //NO ENTIENDO
    id = iGasto + gastos;
}

function borrarGasto(gastos)
{
    if (id == gastos)
    {
        delete gastos;
    }
}

function calcularTotalGastos()
{
    let gastosTotal = 0;
    for (let i = 0; i < gastos.length; i++)
    {
        gastosTotal = gastoTotal + gastos[i];
    }
}

function calcularBalance()
{
    let balance = presupuesto - gastosTotal;
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
