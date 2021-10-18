// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
'use strict';

var presupuesto = 0;
var idGasto = 0;
var gastos = [];

function actualizarPresupuesto(valor) {
	// TODO

	if ((valor < 0) || (isNaN(valor))) 
	{
			console.log("Error valor menor que cero ");
			valor = -1;
	}
	else
	{
		presupuesto = valor;

	}
	return valor;
}

function mostrarPresupuesto() {
    // TODO
	return `Tu presupuesto actual es de ${presupuesto} €`;
	
}


function CrearGasto(description, valor1, fecha1 = Date.now(), ...etiquetasPasadas) 
{
	if ((valor1 <= 0) || (isNaN(valor1))){
		valor1 = 0;
	}

	if(isNaN(Date.parse(fecha1))){
		fecha1 = Date.now();
	}
    // TODO
	let gasto  =
	{
		valor : valor1,
		descripcion : description,
		etiquetas : [...etiquetasPasadas],
		fecha : fecha1,

		mostrarGasto(){
			let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
			return texto;
		},

		actualizarDescripcion(descr){
			this.descripcion = descr;
		
		},

		actualizarValor(val2){
			if(val2 >= 0)
			{
				this.valor = val2;
			}

		},

		mostrarGastoCompleto = function(){

			let fechModificada = new Date(fecha);
			let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
			\nFecha: ${fechModificada.toLocaleString()}
			\nEtiquetas: ${this.etiquetas.join('\n- ')}\n`
			return texto;
		},
		
		actualizarFecha = function(valor)
		{ 
			let fechaModificada = Date.parse(valor); 
			if(isNaN(fechaModificada))
			{ 
				this.fecha = this.fecha; 
			}
			else
			{
				this.fecha = fechaModificada; 
			}                     
		},

		anyadirEtiquetas = function(...etiquetasNuevas){
            
			for (let i = 0; i < etiquetasNuevas.length; i++) 
			{
				if(this.etiquetas.includes(etiquetasNuevas[i]) == false)
				{
                    this.etiquetas.push(etiquetasNuevas[i]);
                }
            }           
		},

		borrarEtiquetas = function(...etiquetasNuevas){

			for (let i = 0; i < etiquetasNuevas.length; i++) {
	
				let indice = this.etiquetas.indexOf(etiquetasNuevas[i]);
				if(indice !== -1){
					this.etiquetas.splice(indice, 1);
				}
			}
		}
	}

	//return gasto;
}
function listarGastos(){   
    return gastos;
}

function anyadirGasto(gast){
	gast.id = idGasto;
	idGasto += 1;
	gastos.push(gast);
}

function borrarGasto(id){

	let indice = gastos.findIndex(gasto => gasto.id == id);
	if(indice !== -1){
		gastos.splice(indice, 1);
	}
 }

 function calcularTotalGastos(){

    let total = 0;

    for (let i = 0; i < gastos.length; i++) {
		total += gastos[i].valor;
    }

    return total;
}
function calcularBalance(){

    let gastostotales = calcularTotalGastos();
    let balance = presupuesto - gastostotales;
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
