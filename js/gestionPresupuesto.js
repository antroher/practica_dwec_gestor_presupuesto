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
<<<<<<< HEAD
    console.log (`Tu presupuesto actual es de ${presupuesto} €`);
    return `Tu presupuesto actual es de ${presupuesto} €`;
=======
    console.log ("Tu presupuesto actual es de" + presupuesto + "€");
    return ("Tu presupuesto actual es de" + presupuesto + "€");
>>>>>>> 1144e4371b349b8f53b7042953a388e454b7e153
}

function CrearGasto(NewDescriptio,NewValu) {
    if(NewValu < 0 || isNaN(NewValu)){
        NewValu = 0;
    }
    let gasto = {
        descripcion: NewDescriptio,
        valor: NewValu,

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
        }
    };
    return gasto;
}


/*tres metodos internos de gastos objeto gasto definido con export{}
esa funcion devulve dicho objeto */

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
