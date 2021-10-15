// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
var presupuesto = 0;
var gastos = [];
var idGasto = 0;
// TODO: Variable global


function actualizarPresupuesto(valores) {
    let DevolverValor = 0;
    if(valores < 0 || isNaN(valores))
    {
        console.log("Error numero negativo");
        DevolverValor = -1;        
    }
    else
    {
        presupuesto = valores;
        DevolverValor = presupuesto;
    }
    return DevolverValor;
}

function mostrarPresupuesto() {  
     console.log(`Tu presupuesto actual es de ${presupuesto} €`)
     return(`Tu presupuesto actual es de ${presupuesto} €` )

}

function CrearGasto(descripcionIn,valorIn, fech = Date.now(), ...etiqueta) {
        
        if(valorIn < 0 || isNaN(valorIn)){
            valorIn = 0;
        }

        if(etiqueta.lenght === 0){
            etiqueta = [];
        }
    let gasto = {
        descripcion:descripcionIn,
        valor:parseFloat(valorIn),
        etiquetas: [...etiqueta],
        fech: (typeof fech === "string") ? Date.parse(fech) : fech,

         mostrarGasto() {
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.`);
        },

        actualizarDescripcion(NewDescripcion){
            gasto.descripcion = NewDescripcion;
        },
        actualizarValor(NewValor){
            if(NewValor >= 0)
            {
                gasto.valor= NewValor;
            }
        }
    }
    return gasto;
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto
    idGasto ++
    gastos.push(gasto);
}

function borrarGasto(Idin){
    for(let i = 0; i < gastos.length; i++){
        if(Idin === gastos[i].id)
        {
            gastos.splice(i,1);
        }
    }
}

function calcularTotalGastos(){
    let acumulado = 0;
    for(let i = 0; i < gastos.length; i++)
    {
        acumulado += gastos[i].valor;
    }
    return acumulado;
}

function calcularBalance(){
    let result = 0;
    let TotaldeGastos = calcularTotalGastos();

    result = presupuesto - TotaldeGastos;
    
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
