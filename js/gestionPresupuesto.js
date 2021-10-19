// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = []; //UN PUTO ARRAY
var idGasto = 0;



function actualizarPresupuesto(valores) {
    // TODO
    let devolvimiento = 0;
    if(valores < 0 || isNaN(valores))
    {
        console.log("Error, es un número negativo")
        devolvimiento = -1; 
    }
    else 
    {
        presupuesto = valores;
        devolvimiento = presupuesto;
    }
    return devolvimiento;
}

function mostrarPresupuesto() {
    // TODO
    console.log("Tu presupuesto actual es de " + presupuesto + " €");
    return("Tu presupuesto actual es de " + presupuesto + " €");

}

function CrearGasto(descripcion1, valor1 = 0, fechaIn = new Date(), ...etiquetas ) {
    // TODO
    if(valor1 < 0 || isNaN(valor1)) //Porque asi comprueba q no es un string
    {
        valor1 = 0;
    }

    let gasto = { //Valor1 = a lo que introduce la funcion, y lo asigna a valor, para que forme parte del objeto(pq si no salen errores en el nmp)
        descripcion: descripcion1,
        valor: valor1,
        etiquetas: [...etiquetas],// el [] es porque si no tienes ninguna etiquetas creas el array  como por defecto
        fecha: (typeof fechaIn === "string") ? Date.parse(fechaIn) : fechaIn,//si es un string lo converte en fecha en milisegundos

        mostrarGasto(){
            console.log("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €")
            return("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €");
        
        },
        actualizarDescripcion(newdescripcion){
            this.descripcion = newdescripcion;
        },
        actualizarValor(newvalor){
            if(newvalor < 0 || isNaN(newvalor))
            {
                console.log("El valor que has metido no es correcto, ponga un número positivo")
            }
            else
            {
                this.valor = newvalor;
            }
        },
        mostrarGastoCompleto (){
            let cadenavacia = "";
            let fecha = new Date(this.fecha);
            cadenavacia += `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fecha.toLocaleString()}\nEtiquetas:\n`
            for(let i = 0;i < this.etiquetas.length;i++){
                cadenavacia += `- ${this.etiquetas[i]}\n`
            }
            console.log(cadenavacia);
            return cadenavacia;            
        },
        actualizarFecha(fechaEntrada){
            if(typeof fechaEntrada === "string" && !isNaN(Date.parse(fechaEntrada)))
            {
                let fechaStamp = Date.parse(fechaEntrada);
                this.fecha = fechaStamp;
            }
        },
        anyadirEtiquetas(...nuevaEtiquetas){

            for(let i = 0; i < nuevaEtiquetas.length; i++)
            {
                if(!this.etiquetas.includes(nuevaEtiquetas[i]))
                {
                    this.etiquetas.push(nuevaEtiquetas[i]);
                }
            }
        },
        borrarEtiquetas(...borradorEtiquetas){
            borradorEtiquetas.forEach((DelEtiqueta) => {
                this.etiquetas.forEach((PropiaEtiqueta, index) => {
                    if (DelEtiqueta === PropiaEtiqueta) {
                        this.etiquetas.splice(index, 1);
                    }
                })
            })
        }    
    } 
    return gasto;
}

function listarGastos(){
    return gastos;
}
function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);/*push para añadir al array al final, y el .pop sacas la ultima posi del array*/
}
function borrarGasto(idrandom){
    for(let i = 0; i < gastos.length; i++)
    {
        if(idrandom === gastos[i].id)
        {
            gastos.splice(i,1);/*igual al remove at*/ 
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
    let TotalDeGastos = calcularTotalGastos();
    result = presupuesto - TotalDeGastos
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
