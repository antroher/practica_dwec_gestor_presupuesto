// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;


function actualizarPresupuesto(NewValu) {
    
    if(NewValu >= 0)
    {
        presupuesto = NewValu;
    }
    else
    {
        console.log(`Error, ${NewValu} negativo invalido`);
        NewValu = -1;
       
    }
    return NewValu;
}

function mostrarPresupuesto() {
    console.log (`Tu presupuesto actual es de ${presupuesto} €`);
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(NewDescriptio,NewValu,fec = Date.now(),...etiq) {
    if(NewValu < 0 || isNaN(NewValu)){
        NewValu = 0;
    }
    let gasto = {
        descripcion: NewDescriptio,
        valor: NewValu,
        etiquetas: [...etiq],
        fecha: (typeof fec === 'string') ? Date.parse(fec) : fec,
        gastos:[],
        idGasto = 0,
        mostrarGasto(){
            console.log("Gasto correspondiente a "+ this.descripcion + " con valor " + this.valor +" €");
            return ("Gasto correspondiente a "+ this.descripcion + " con valor " + this.valor +" €")
        },
        actualizarDescripcion(NewDescript){
            this.descripcion = NewDescript;
        },
        actualizarValor(NewVal){

            if(NewVal >= 0)
            {
                this.valor = NewVal;
            }
        },
        anyadirEtiquetas(id,gasto){
            id = idGasto;
            idGasto++;
            gastos.push(gasto);
        },
        borrarGasto();
    };
    return gasto;


    //práctica 2
    let gastos = new gastos();
    let gastos = [];
    let idGasto = 0;

    /*
    - no sabría si la funcion va fuera o dentro del onjeto gasto
    
    function listarGastos(){
        return gastos;
    }
    function anyadirGasto(){

    }
    function borrarGasto(){

    }
    function calcularTotalGastos(){

    }
    function calcularBalance(){

    }*/
}

    
//las funciones y objetos deben tener los nombres que indican en el enunciado
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
