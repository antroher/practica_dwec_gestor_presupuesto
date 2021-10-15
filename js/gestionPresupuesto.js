// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;

var gastos = [];/*hay que preguntar al usuario?*/ 
var idGasto = 0;

function actualizarPresupuesto(actualizar) {

    let devolverValor;

    if(actualizar>=0)
    {
        presupuesto = actualizar;
        devolverValor=presupuesto;
    }
    else
    {
        console.log("Es inferior a 0");
        devolverValor= -1;
    }
    return devolverValor; 
}

function mostrarPresupuesto() {
    console.log(`Tu presupuesto actual es de ${presupuesto} €`);
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion1, valor1, fecha1 = Date.now(),...etiquetas1) {

    if(valor1 < 0 || isNaN(valor1)){
        valor1 = 0;
    }
    //parámetro vacío etiquetas
    if((etiquetas1 == null) || (etiquetas1 == ""))
    {
        etiquetas1 = [];
    }
    let gasto = {
            descripcion: descripcion1,
            valor: valor1,
            fecha: (typeof fecha1 === "string") ? Date.parse(fecha1) : fecha1,
            etiquetas:[...etiquetas1],

            mostrarGasto(){
                console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
                return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
            },

            actualizarDescripcion(nuevaDescripcion)
            {
                this.descripcion = nuevaDescripcion; 
            },

            actualizarValor(nuevoValor){

                if (nuevoValor >= 0){
                    this.valor = nuevoValor;
                }
            },
            anyadirEtiquetas (etiquetas)/*NÚMERO INDETERMINADO DE PARAMETROS*/
            {
                G_etiquetas.push(etiquetas);
            },
            mostrarGastoCompleto(){/*no se si es dentro o fuera del obejto, return?*/
                let acumulador = "";
                for (var i = 0; i < etiquetas.length; i++)
                {
                    acumulador += etiquetas[i] + "\n";
                }
            
                return `${this.gasto} correspondiente a ${this.descripcion} con valor  €.\n Fecha: ${this.nuevaFecha.toLocaleString()} \n Etiquetas: ${acumulador}`;
            },
            actualizarFecha(nuevaFecha)
            {
                Date.parse(nuevaFecha);
                if (nuevaFecha === Date)/*DUDA*/
                {
                    this.timestamp=nuevaFecha
                }
                
            },
            borrarEtiquetas(...etiquetas2){/*hecho*/ 
                for (let i = 0; i < etiquetas.length; i++)
                {
                    if (etiquetas == etiquetas2)
                         delete etiquetas2[i];
                }
                 
            }

        };
        return gasto;
        
}


function listarGastos()
{
    return gastos;
}
function anyadirGasto(id, gasto )
{
    /*dudas en este apartado*/ 
    id=idGasto;
    idGasto++;
    gasto=gastos;
}
function borrarGasto(id)
{
    if(id == gastos)
    {
        delete gastos;
    }
}
function calcularTotalGastos()
{
    let suma = 0;
    for (var i = 0; i < gastos.length; i++)
    {
        suma += gastos[i];
    }
    return suma;
}
function calcularBalance() //hecho
{
    let result = 0;
    let totalgastos = calcularTotalGastos();

    result = presupuesto - totalgastos;

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
    calcularBalance
}