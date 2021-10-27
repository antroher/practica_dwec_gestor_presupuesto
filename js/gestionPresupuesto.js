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

function CrearGasto(des, val = 0, fec = Date.now(), ...eti) {
    if (parseFloat(val) < 0 || isNaN(val)) {
        val = 0;
    }

    if (eti === "") {
        this.etiquetas = [];
    }

    if (fec === "") {
        this.fecha = getDate();
    }

    const gasto = {
        descripcion: des,
        valor: val,        
        etiquetas: [...eti],
        fecha: (typeof fec === 'string') ? Date.parse(fec) : fec,

        mostrarGasto() {
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        } ,

        actualizarDescripcion(des) {
            this.descripcion = des;
        } ,

        actualizarValor(val) {
            if (parseFloat(val) >= 0) {
                this.valor = parseFloat(val);
            }
        } ,

        actualizarFecha(fec) {
            if (!isNaN(Date.parse(fec))) {
                this.fecha = Date.parse(fec);
            }
            
        } ,

        anyadirEtiquetas(...eti) {
            const aux = eti.filter((x) => {
                if (!this.etiquetas.includes(x)) {
                    return x;
                }
            });
            this.etiquetas.push(...aux);
        }, 

        borrarEtiquetas(...eti) {
            eti.forEach((x) => {
                for (let i = 0; i < this.etiquetas.length; i++) {
                    if (this.etiquetas[i] === x) {
                        this.etiquetas.splice(i, 1);
                    }
                }
            })
        } ,

        mostrarGastoCompleto() {
            let fec1;
            if(typeof this.fecha === 'string') {
                fec1 = Date.parse(this.fecha);
            } else {
                fec1 = this.fecha;
            }
            let aux = "";
            for(let eti of this.etiquetas) {
                aux = aux + `- ${eti}\n`;
            };
            let fec2 = new Date(fec1);
            let aux2 = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(fec2.toLocaleString())}\nEtiquetas:\n`;
            return aux2 + aux;
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

function filtrarGastos(obj) {
    let result = Object.assign(gastos);
    if (typeof obj === 'object' && obj !== null && obj !== undefined && Object.entries(obj).length > 0) {
        if (obj.hasOwnProperty('fechaDesde') && typeof obj.fechaDesde === 'string') {
            result = result.filter((aux) => {
                return aux.fecha >= (Date.parse(obj.fechaDesde))
            })
        }
        if (obj.hasOwnProperty('fechaHasta') && typeof obj.fechaHasta === 'string') {
            result = result.filter((aux) => {
                return aux.fecha <= Date.parse(obj.fechaHasta);
            })
        }
        if (obj.hasOwnProperty('valorMinimo') && typeof obj.valorMinimo === 'number') {
            result = result.filter((aux) => {
                return aux.valor >= obj.valorMinimo
            })
        }
        if (obj.hasOwnProperty('valorMaximo') && typeof obj.valorMaximo === 'number') {
            result = result.filter((aux) => {                
                return aux.valor <= obj.valorMaximo
            })
        }
        if (obj.hasOwnProperty('descripcionContiene') && typeof obj.descripcionContiene === 'string') {
            result = result.filter((aux) => {
                let par1 = (aux.descripcion).toLowerCase();
                let par2 = (obj.descripcionContiene).toLowerCase();
                let arr1 = par1.split(" ");
                let arr1join = arr1.join('');
                if (arr1join.indexOf(par2) !== -1) 
                    return true;
            })
        }
        if (obj.hasOwnProperty('etiquetasTiene') && Array.isArray(obj.etiquetasTiene)) {
            result = result.filter((aux) => {
                for (let i = 0; i < obj.etiquetasTiene.length; i++) {
                    if (obj.etiquetasTiene.includes(aux.etiquetas[i])) {
                        return true;
                    }
                }
            })
        }
        return result;
    }
    return gastos;
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {
    let filter = {etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta}
    let aux = filtrarGastos(filter);
    let agrupar = aux.reduce((acc, item) => {
        let pred = item.obtenerPeriodoAgrupacion(periodo);
        if (acc[pred] == null) {
            acc[pred] = item.valor;
        } else {
            acc[pred] += item.valor;
        }
        return acc;
    }, {});
    return agrupar;
}
/*
function CrearGasto(description, valor1, fecha1 = Date.now(), ...etiquetasPasadas) 
{
	let fecha_temp = fecha1;
	if (parseFloat(valor1) <= 0 || isNaN(valor1)){
		valor1 = 0;
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
    // TODO
	let gasto  =
	{
		
		valor : valor1,
		descripcion : description,
		fecha : fecha1,
		etiquetas : [...etiquetasPasadas],


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
    }
	return gasto;
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

for (let i = 0; i < gastos.length; i++) 
	{
        let gasto = gastos[i];
		if(gasto.id === id)
		{
            gastos.splice(i,1);
        }  
    } 
 }

 function calcularTotalGastos()
 {
    let total = 0;

	for (let i = 0; i < gastos.length; i++) 
	{
		total += gastos[i].valor;
    }

    return total;
}

function calcularBalance()
{
    let gastostotales = calcularTotalGastos();
    let balance = presupuesto - gastostotales;
    return balance;

}

function filtrarGastos(objeto)
{
	if (objeto != undefined && objeto != null){

		let gastosFiltrados = gastos.filter(function(item)
		{

			if (objeto.hasOwnProperty('fechaDesde')){
				if(item.fecha < Date.parse(objeto.fechaDesde) ){
					return;
				}
				return;
			}

			if (objeto.hasOwnProperty('fechaHasta')){
				if(item.fecha > Date.parse(objeto.fechaHasta) ){
					return;
				}
				return;
			}

			if (objeto.hasOwnProperty('valorMinimo')){
				if(item.valor < objeto.valorMinimo ){
					return;
				}
				return;
			}

			if (objeto.hasOwnProperty('valorMaximo') ){
				if(item.valor > objeto.valorMaximo ) {
					return;
				}
				return;
			}

			if (objeto.hasOwnProperty('descripcionContiene')){
				if(!item.descripcion.includes(objeto.descripcionContiene)){
					return;
				}
				return;
			}

			if (objeto.hasOwnProperty('etiquetasTiene')){
				if (!item.etiquetas.includes(objeto.etiquetasTiene)){
					return;
				}
				return;
			}

		return item

		})

	return gastosFiltrados
}
else{
	return gastos;
}
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta)
{
	let fec = new Date();
	let dd = String(fec.getDate()).padStart(2,0);
	let mm = String(fec.getMonth()+1).padStart(2,0);
	let yyyy = String(fec.getFullYear());

	if ((typeof fechaDesde !== 'string') || isNaN((Date.parse(fechaDesde))) || (typeof fechaDesde === 'undefined')) 
	{
		fechaDesde = '';
	}
		
	if ((typeof fechaHasta !== 'string') || (isNaN(Date.parse(fechaHasta))) || (typeof fechaHasta === 'undefined')) 
	{
		fechaHasta = `${yyyy}-${mm}-${dd}`;
	}

	
	if (typeof etiquetas === 'undefined') 
	{
		etiquetas = [];
	}
		let objeto2 = 
	{
		fechaDesdeObj : fechaDesde,
		fechaHastaObj : fechaHasta,
		etiquetasObj : etiquetas,

	}
	let subconjG = filtrarGastos(objet);
    let reducido = subconjG.reduce(function (acumulado, item) {
        
        let per = item.obtenerPeriodoAgrupacion(periodo);

        if (!acu.hasOwnProperty(per)) {
            acumulado[per] = 0;
        }
        else {
            if (isNaN(acumulado[per])) {
                acumulado[per] = 0;
            }
        }

        acumulado[per] += item.valor;

        return acumulado;

    }, {});

    return reducido;
}
*/
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
	agruparGastos
}
