// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

var presupuesto = 0;
function actualizarPresupuesto(valor) {
    // TODO
	if (valor > 0)
	{
			presupuesto= valor;
	}
	else
	{
		console.log("Error valor menor que cero ")
		presupuesto = -1;

	}
	return presupuesto;
}

function mostrarPresupuesto() {
    // TODO
	var respuesta ="Tu presupuesto actual es de " + presupuesto + " \u20AC"
	return respuesta;
}

function CrearGasto(valor1, description) 
{
	if (valor1 < 0){
		valor1 = 0;
	}
    // TODO
	let gasto = 
	{
		valor : valor1,
		description : "Descripcion del gasto: "+ description + "." ,
		mostrarGasto(){
			var texto = this.description + this.valor + "€";
			return texto;
		},
		actualizarDescripcion(descripcion){
			this.description = descripcion;
		
		},
		actualizarValor(valor2){
			if(valor2 > 0)
			{
				this.valor = valor2;
			}

		}
	}

	return gasto
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
