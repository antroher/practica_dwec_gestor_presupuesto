// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;

    function actualizarPresupuesto(valorIntroducido) {
    // TODO
        
        if(valorIntroducido >= 0)
        {
            presupuesto = valorIntroducido;
            return presupuesto;
        }      
        else{
            console.log(`Error : -1. \n El valor introducido es negativo, pon uno positivo.`);
            return -1;
        }

    }

    function mostrarPresupuesto() {
        // TODO
        return`Tu presupuesto actual es de ${presupuesto} €`;
    }

    function CrearGasto(desc,numIntroducido) {
        
        // TODO
        if(numIntroducido <= 0 || isNaN(numIntroducido)){
            numIntroducido = 0;
        }
            let gasto = {
                descripcion:desc,
                valor:numIntroducido,
            mostrarGasto(){
                console.log(`Gasto correspondiente a Ejemplo de gast ${gasto.descripcion} y con Valor ${gasto.valor}`);
                return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
            },
            actualizarDescripcion(desc){
                this.descripcion = desc;
            },
            actualizarValor(numIntroducido){
                if(numIntroducido >= 0)
                    this.valor = parseFloat(numIntroducido); 
            }
        }

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
