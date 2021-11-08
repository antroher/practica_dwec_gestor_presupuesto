
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

function CrearGasto(description, valor1, fecha1 = Date.now(), ...etiquetasPasadas) {
    let fecha_temp = fecha1;

    if (parseFloat(valor1) < 0 || isNaN(valor1)) {
        valor1 = 0;
    }

    if (etiquetasPasadas === "") {
        etiquetasPasadas = [];
    }

	if(isNaN(Date.parse(fecha1))){
		let fec = new Date();
		let dd = String(fec.getDate()).padStart(2,0);
		let mm = String(fec.getMonth()+1).padStart(2,0);
		let yyyy = String(fec.getFullYear());
		let hh = String(fec.getHours());
		let min = String(fec.getMinutes());
		fecha_temp = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
	}
	fecha1 = Date.parse(fecha_temp);

    const gasto = {
        descripcion: description,
        valor: valor1,        
        etiquetas: [...etiquetasPasadas],
        fecha: fecha1,

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

		mostrarGastoCompleto()
		{
			let fechModificada = new Date(this.fecha);
			let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechModificada.toLocaleString()}\nEtiquetas:\n- ${this.etiquetas.join('\n- ')}\n`
			return texto;
		},
		
		actualizarFecha(valor)
		{ 
			let fechaModificada = Date.parse(valor); 
			if(!isNaN(fechaModificada))
			{
				this.fecha = fechaModificada; 
			}                     
		},

		anyadirEtiquetas(...etiquetasNuevas)
		{
			for (let i = 0; i < etiquetasNuevas.length; i++) 
			{
				let etiqueta = etiquetasNuevas[i];
				if(!this.etiquetas.includes(etiqueta))
				{
					this.etiquetas.push(etiqueta);
				}
			}
		},

		borrarEtiquetas(...etiquetasBorrar)
		{
			for (let i = 0; i < etiquetasBorrar.length; i++) 
			{
				let etiqueta = etiquetasBorrar[i];
				let indice = this.etiquetas.indexOf(etiqueta);
				if(indice !== -1)
				{
					this.etiquetas.splice(indice,1);
				}
			}
		},

        obtenerPeriodoAgrupacion(per) {
            let date = new Date(this.fecha);
            if (per === "dia") {
                if (date.getMonth() + 1 < 10) {
                    if (date.getDate() < 10) {
                        return `${date.getFullYear()}-0${date.getMonth() + 1}-0${date.getDate()}`;
                    } else {
                        return `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;
                    }                    
                } else if (date.getDate() < 10) {
                    return `${date.getFullYear()}-${date.getMonth() + 1}-0${date.getDate()}`;
                } else {
                    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                }             
            }
            if (per === "mes") {
                if (date.getMonth() + 1 < 10) {
                    return `${date.getFullYear()}-0${date.getMonth() + 1}`;
                } else {
                    return `${date.getFullYear()}-${date.getMonth() + 1}`;
                }
            }
            if (per === "anyo") {
                return date.getFullYear();
            }
        }
    };
    return gasto;
}


function listarGastos() {
    return gastos;
}

function anyadirGasto(gas) {
    gas.id = idGasto;
    idGasto += 1;
    gastos.push(gas);
}

function borrarGasto(id) {
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === id) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
        total += gastos[i].valor;
    }
    return total;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}


function filtrarGastos(objeto) {
    let resultado = Object.assign(gastos);
    if (typeof objeto === 'object' && objeto !== null && objeto !== undefined && Object.entries(objeto).length > 0) 
    {
        if (objeto.hasOwnProperty('fechaDesde') && typeof objeto.fechaDesde === 'string') {
            resultado = resultado.filter(function(item) {
                if(item.fecha >= Date.parse(objeto.fechaDesde)){
                return true
            }
            })
        }
        if (objeto.hasOwnProperty('fechaHasta') && typeof objeto.fechaHasta === 'string') {
            resultado = resultado.filter(function(item) {
                if(item.fecha <= Date.parse(objeto.fechaHasta)){
                return true;
            }
            })
        }
        if (objeto.hasOwnProperty('valorMinimo') && typeof objeto.valorMinimo === 'number') {
            resultado = resultado.filter(function(item)  {
                if(item.valor > objeto.valorMinimo){
                    return true
                }               
            })
        }
        if (objeto.hasOwnProperty('valorMaximo') && typeof objeto.valorMaximo === 'number') {
            resultado = resultado.filter(function(item)  {   
                if(item.valor < objeto.valorMaximo){             
                return true
                }
            })
        }
        if (objeto.hasOwnProperty('descripcionContiene') && typeof objeto.descripcionContiene === 'string') {
            resultado = resultado.filter(function(item)  {
                let descripcion = item.descripcion.split(" ");
                let arraydescripcion = descripcion.join('');
                if (arraydescripcion.indexOf(objeto.descripcionContiene) !== -1) 
                    return true;
            })
        }
        if (objeto.hasOwnProperty('etiquetasTiene') && Array.isArray(objeto.etiquetasTiene)) {
            resultado = resultado.filter(function(item)  {
                for (let i = 0; i < objeto.etiquetasTiene.length; i++) {
                    if (item.etiquetas.includes(objeto.etiquetasTiene[i])) {
                        return true;
                    }
                }
            })
        }
        return resultado;
    }
    return gastos;
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {
    let objeto = {
        etiquetasTiene: etiquetas, 
        fechaDesde: fechaDesde, 
        fechaHasta: fechaHasta
    }
    let objfiltrado = filtrarGastos(objeto);
    let agrupar = objfiltrado.reduce(function(acumulador, item) {
        let periodo2 = item.obtenerPeriodoAgrupacion(periodo);
        if (acumulador[periodo2] == null) {
            acumulador[periodo2] = item.valor;
        } else {
            acumulador[periodo2] += item.valor;
        }
        return acumulador;
    }, {});
    return agrupar;
}



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
	CrearGasto,
	anyadirGasto,
	listarGastos,
    borrarGasto,
    calcularTotalGastos,
	calcularBalance,
	filtrarGastos,
    agruparGastos,
}