
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
'use strict';

var presupuesto = 0;
var idGasto = 0;
var gastos = [];
/*
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
                if(item.valor >= objeto.valorMinimo){
                    return true
                }               
            })
        }
        if (objeto.hasOwnProperty('valorMaximo') && typeof objeto.valorMaximo === 'number') {
            resultado = resultado.filter(function(item)  {   
                if(item.valor <= objeto.valorMaximo){             
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
function transformarListadoEtiquetas(cadena) {
    cadena = cadena.split(/[ ,;:\.~]+/g);
    return cadena;
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
        gastos.push(gastoRehidratado)

    }
}
*/
function actualizarPresupuesto(valor) {
    if(valor > 0){
        presupuesto = valor;
        return presupuesto;
    }else{
        console.log("El valor introducido es menor que 0.")
        return -1;
    }
}
function mostrarPresupuesto() {
    
    return "Tu presupuesto actual es de " + presupuesto + " €";
    
}
function CrearGasto(desc, val, fech, ...etiq) { 
    
    this.descripcion = desc;
    

    if(parseFloat(val) > 0) {
        this.valor = val;

    }
    else{
        this.valor = 0;
    }

    if(fech === undefined || isNaN(Date.parse(fech))){  

        this.fecha = new Date(Date.now()).toISOString().substring(0,16);
    }
    else{

        this.fecha = Date.parse(fech);

    }


    if(etiq !== undefined){

        this.etiquetas = etiq; 

    }

    this.mostrarGastoCompleto = function(){

        let res = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`
        for(let i = 0; i < this.etiquetas.length; i++){

            res += "- " + this.etiquetas[i]+`\n`

        }

        return res;
        }
        
    

    this.mostrarGasto = function() {

        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(descripcion_nueva){

        this.descripcion = descripcion_nueva;
    }

    this.actualizarValor = function(valor_nuevo){
        if(parseFloat(valor_nuevo) > 0){

            this.valor = valor_nuevo;
        }
    }
    this.actualizarFecha = function(fecha_nueva){
        if(!isNaN(Date.parse(fecha_nueva))){

            this.fecha = Date.parse(fecha_nueva);
        }
    }

    this.anyadirEtiquetas = function(...etiqueta_nueva){
        etiqueta_nueva.forEach(e => {
            if(!this.etiquetas.includes(e)){
                this.etiquetas.push(e);
            }
        });
    }

    this.borrarEtiquetas = function(...borrar_etiquetas){
        borrar_etiquetas.forEach(b => {

            if(this.etiquetas.includes(b)){

                this.etiquetas.splice(this.etiquetas.indexOf(b),1)
            }
        });
    }
    this.obtenerPeriodoAgrupacion = function (periodo) {
        
        if(periodo !== undefined){
            switch(periodo){
                case "dia":
                    return new Date(this.fecha).toISOString().substring(0, 10);
                case "mes":
                    return new Date(this.fecha).toISOString().substring(0, 7);
                case "anyo":
                    return new Date(this.fecha).toISOString().substring(0, 4);
            }
            
        }
    };
        
}

function transformarListadoEtiquetas(etiquetas){

    let arrayFiltrado = etiquetas.match(/[a-zA-Z0-9]+/gi);
    return arrayFiltrado;
}
function listarGastos(){
    return gastos;
}
function anyadirGasto(gastoPasado){

    gastoPasado.id = idGasto;
    gastos.push(gastoPasado);
    idGasto++;

}
function borrarGasto(idBorrar){
    gastos.forEach(g => {
        if(g.id == idBorrar){
            gastos.splice(gastos.indexOf(g),1);
        }
    });
}
function calcularTotalGastos(){
    let total_gastos = 0;
    gastos.forEach(g => {
        total_gastos += g.valor;
    });
    return total_gastos;

}
function calcularBalance(){
    let gastos_totales = calcularTotalGastos();
    return (presupuesto - gastos_totales)

}
function filtrarGastos(filt){
    if(filt !== undefined || Object.entries(filt != 0)){

        let gastosFiltrados = gastos.filter((gast) => {
            if (filt.hasOwnProperty("fechaDesde")) {

              if (gast.fecha < Date.parse(filt.fechaDesde)) {

                return;
              }
            }
      
            if (filt.hasOwnProperty("fechaHasta")) {

              if (gast.fecha > Date.parse(filt.fechaHasta) ) {

                return;
              }
            }
      
            if (filt.hasOwnProperty("valorMinimo")) {

              if (gast.valor < filt.valorMinimo) {

                return;
              }
            }
      
            if (filt.hasOwnProperty("valorMaximo")) {

              if (gast.valor > filt.valorMaximo) {

                return;
              }
            }
      
            if (filt.hasOwnProperty("descripcionContiene")) {

              if (!gast.descripcion.includes(filt.descripcionContiene)) {

                return;
              }
            }
            if (filt.hasOwnProperty("etiquetasTiene") && filt.etiquetasTiene !== undefined) {

              if ( filt.etiquetasTiene.length != 0){

              let comprobado = false;
              for (let des of filt.etiquetasTiene) {

                if (gast.etiquetas.includes(des)) {

                  comprobado = true;
                }
              }
              if (!comprobado) {

                return;
              }
            }
          }
            return gast;
          });  

          if(gastosFiltrados.length === 0){

            return gastos;
        }else{

            return gastosFiltrados;
        }
    }
}

function agruparGastos(pAgrupar, EtiAgrupar, fDesdeA, fHastaA){
    
    if(!Date.parse(fDesdeA) || typeof fDesdeA !== "string"){
        fDesdeA = undefined;
    }
    
    if(!Date.parse(fHastaA) || typeof fHastaA !== "string"){
        fHastaA = new Date(Date.now()).toISOString().substring(0,10);
    }

    
    if(pAgrupar != "dia" && pAgrupar != "anyo") pAgrupar = "mes";

    let filtroAgrupar = {
        fechaDesde : fDesdeA,
        fechaHasta : fHastaA,
        etiquetasTiene : EtiAgrupar

    }

    let gAAgrupar = new Array();

    gAAgrupar = filtrarGastos(filtroAgrupar);

    
    return gAAgrupar.reduce(function(prev, current){

        if(current.hasOwnProperty("obtenerPeriodoAgrupacion")){

            let fReduce = current.obtenerPeriodoAgrupacion(pAgrupar);

            if(prev.hasOwnProperty(fReduce))prev[fReduce] += current.valor;
            else prev[fReduce] = current.valor;
        }
        return prev;
        
    }, {})
    
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
