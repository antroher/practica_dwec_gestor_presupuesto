// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;



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

function CrearGasto(descripcion1, valor1) {
    // TODO
    if(valor1 < 0 || isNaN(valor1)) //Porque asi comprueba q no es un string
    {
        valor1 = 0;
    }
    let gasto = { //Valor1 = a lo que introduce la funcion, y lo asigna a valor, para que forme parte del objeto(pq si no salen errores en el nmp)
        descripcion: descripcion1,
        valor: valor1,
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
        }
    } ; 
    return gasto;
}




// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
