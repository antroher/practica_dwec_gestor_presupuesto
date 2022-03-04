
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
    
    return "Tu presupuesto actual es de " + presupuesto + " €";
    
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

    
        this.descripcion = description;
        this.valor =  valor1;
        this.etiquetas = [...etiquetasPasadas];
        this.fecha = fecha1;

        this.mostrarGasto = function(){
			let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
			return texto;
		};

		this.actualizarDescripcion= function(descr){
			this.descripcion = descr;
		
		};

		this.actualizarValor= function(val2){
			if(val2 >= 0)
			{
				this.valor = val2;
			}
		};

		this.mostrarGastoCompleto= function()
		{
			let fechModificada = new Date(this.fecha);
			let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechModificada.toLocaleString()}\nEtiquetas:\n- ${this.etiquetas.join('\n- ')}\n`
			return texto;
		};
		
		this.actualizarFecha= function(valor)
		{ 
			let fechaModificada = Date.parse(valor); 
			if(!isNaN(fechaModificada))
			{
				this.fecha = fechaModificada; 
			}                     
		};

		this.anyadirEtiquetas= function(...etiquetasNuevas)
		{
			for (let i = 0; i < etiquetasNuevas.length; i++) 
			{
				let etiqueta = etiquetasNuevas[i];
				if(!this.etiquetas.includes(etiqueta))
				{
					this.etiquetas.push(etiqueta);
				}
			}
		};

		this.borrarEtiquetas= function(...etiquetasBorrar)
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
		};

        this.obtenerPeriodoAgrupacion= function(per) {
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

function transformarListadoEtiquetas(etiquetas){

    let arrayFiltrado = etiquetas.match(/[a-zA-Z0-9]+/gi);
    return arrayFiltrado;
}
function listarGastos() {
    return gastos;
}
function anyadirGasto(gas) {
    gas.id = idGasto;
    gastos.push(gas);
    idGasto += 1;
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
function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}){
    let gastosFil;
    gastosFil = gastos.filter(function(gasto)
    {
     let exist = true;
     if(fechaDesde)
     {
         if(gasto.fecha < Date.parse(fechaDesde)) exist = false;
     }
     if(fechaHasta)
     {
         if(gasto.fecha > Date.parse(fechaHasta)) exist = false;
     }
     if(valorMinimo)
     {
         if(gasto.valor < valorMinimo) exist = false;
     }
     if(valorMaximo)
     {
         if(gasto.valor > valorMaximo) exist = false;
     }
     if(descripcionContiene)
     {
             if(!gasto.descripcion.includes(descripcionContiene)) exist = false;
     }
     if(etiquetasTiene)
     {
         let inside = false;                   
             for (let i = 0; i < gasto.etiquetas.length; i++) 
             {                   
                 for (let p= 0; p < etiquetasTiene.length; p++) 
                 {
                     if(gasto.etiquetas[i] == etiquetasTiene[p]) inside = true;                  
                 }
             }
        if(inside == false) exist = false;
     }
         return exist;
    });
return gastosFil;  
}
function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) 
{
    let funfil = {etiquetasTiene : etiquetas, fechaDesde : fechaDesde, fechaHasta : fechaHasta}
    let rtnFiltrarGastos = filtrarGastos(funfil);
    let agrupar =
            rtnFiltrarGastos.reduce((acc, item) => {
                let periRed = item.obtenerPeriodoAgrupacion(periodo);
                if (acc[periRed] == null)
                    acc[periRed] = item.valor;
                else 
                    acc[periRed] += item.valor;
                return acc;
            }, {});
    return agrupar;
}
function cargarGastos(gastosAlmacenamiento) {
    // gastosAlmacenamiento es un array de objetos "planos"
    // No tienen acceso a los métodos creados con "CrearGasto":
    // "anyadirEtiquetas", "actualizarValor",...
    // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
  
    // Reseteamos la variable global "gastos"
    gastos = [];
    // Procesamos cada gasto del listado pasado a la función
    for (let g of gastosAlmacenamiento) {
        // Creamos un nuevo objeto mediante el constructor
        // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
        // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
        let gastoRehidratado = new CrearGasto();
        // Copiamos los datos del objeto guardado en el almacenamiento
        // al gasto rehidratado
        // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
        Object.assign(gastoRehidratado, g);
        // Ahora "gastoRehidratado" tiene las propiedades del gasto
        // almacenado y además tiene acceso a los métodos de "CrearGasto"
          
        // Añadimos el gasto rehidratado a "gastos"
        gastos.push(gastoRehidratado);
    }
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
    transformarListadoEtiquetas,
    cargarGastos
}
