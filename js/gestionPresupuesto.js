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

        mostrarGastoCompleto ()
        {

        },

        actualizarFecha(FechaNueva)
        {
            //this.fecha = fecha1; 
        },

        anyadirEtiquetas(...etiquetasNuevas) 
        {            
            this.etiquetas.push(etiquetasNuevas); 
        },

        borrarEtiquetas(...etiquetasOut) 
        {
            //this.etiquetas.splice; 
        }, 

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
