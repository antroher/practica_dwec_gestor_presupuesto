"use strict";
// Variables globales   -------------------------------------------------------------------------------
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

// Funciones        -----------------------------------------------------------------------------------
function actualizarPresupuesto(value){
    
    if(isNaN(value) || value < 0){
        console.error("Error. Número no válido");
        return -1;
    }else{
        presupuesto = value;       
    }
    return presupuesto;
}

function mostrarPresupuesto(){
    
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion = "No hay descripción", valor = 0, fecha = Date.now(), ...etiquetas){
    
    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? valor : 0;
    if(isNaN(Date.parse(fecha))){
        this.fecha = Date.now();
    }else{
        this.fecha = Date.parse(fecha);
    }
    this.etiquetas = [];

    this.mostrarGasto = function(){
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    };
    this.actualizarDescripcion = function(desc){
        this.descripcion = desc;
    };
    this.actualizarValor = function(value){
        if(value >= 0){
            this.valor = value;      
        }
    };
    
    this.mostrarGastoCompleto = function(){
        let lasEtiquetas = "";
        for(let etiqueta of this.etiquetas){
            lasEtiquetas += `- ${etiqueta}\n`;
        }

        let fechaloc = new Date(this.fecha).toLocaleString();
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
            texto += `Fecha: ${fechaloc}\n`;
            texto += `Etiquetas:\n${lasEtiquetas}`;
        return texto;
    }
    this.actualizarFecha = function(fecha){
        if(!isNaN(Date.parse(fecha))){
            this.fecha = Date.parse(fecha);
        }
    };
    this.anyadirEtiquetas = function(...etiquetas){
        for(let etiqueta of etiquetas){
            if(this.etiquetas.includes(etiqueta) == false){
                this.etiquetas.push(etiqueta);
            }
        }
    }
    //anyadirEtiquetas comprueba que no se creen duplicados
    this.anyadirEtiquetas(...etiquetas);

    this.borrarEtiquetas = function(...etiquetas){
        for(let etiqueta of etiquetas){
            let index = this.etiquetas.indexOf(etiqueta);
            if(index != -1){
                this.etiquetas.splice(index,1);
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo){
        let periodoAgrupacion = "";
        if(periodo == "anyo" || periodo == "mes" || periodo == "dia"){
            const aux = new Date(this.fecha);
            periodoAgrupacion = aux.toISOString();

            if(periodo == "anyo"){
                periodoAgrupacion = periodoAgrupacion.substring(0,4);
            }else if(periodo == "mes"){
                periodoAgrupacion = periodoAgrupacion.substring(0,7);
            }else if(periodo == "dia"){
                periodoAgrupacion = periodoAgrupacion.substring(0,10);
            }
        }
        return periodoAgrupacion;
    }
    
}

//https://www.youtube.com/watch?v=eVcBFTAh0co

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    if(typeof(gasto) === "object"){
        gasto.id = idGasto;
        gastos.push(gasto);
        idGasto++;
    }
}

function borrarGasto(idBuscar){
    if(typeof idBuscar == 'number' && idBuscar >= 0){
        let index = gastos.indexOf(gastos.find(item=>item.id == idBuscar));
        if(index != -1){
            gastos.splice(index,1);
        }
    }
}

function calcularTotalGastos(){
    let total = 0;
    for(let item of gastos){
        total += item.valor;
    }
    return total;
}

function calcularBalance(){
    const balance = presupuesto - calcularTotalGastos();
    return balance;
}

function filtrarGastos(condicionesFiltrado){

    let gastosFiltrados = gastos;

    if(typeof(condicionesFiltrado) == "object"){

        if(Object.keys(condicionesFiltrado).length != 0){

            gastosFiltrados = gastos.filter(function(gasto){

                let existe = true;

                if(condicionesFiltrado.fechaDesde){
                    let fDesde = Date.parse(condicionesFiltrado.fechaDesde);
                    if(gasto.fecha < fDesde){
                        existe = false;
                    }
                }

                if(condicionesFiltrado.fechaHasta){
                    let fHasta = Date.parse(condicionesFiltrado.fechaHasta);
                    if(gasto.fecha > fHasta){
                        existe = false;
                    }
                }

                if(condicionesFiltrado.valorMinimo){
                    if(gasto.valor < condicionesFiltrado.valorMinimo){
                        existe = false;
                    }
                }

                if(condicionesFiltrado.valorMaximo){
                    if(gasto.valor > condicionesFiltrado.valorMaximo){
                        existe = false;
                    }
                }

                if(condicionesFiltrado.descripcionContiene){
                    if(!gasto.descripcion.includes(condicionesFiltrado.descripcionContiene)){
                        existe = false;
                    }
                }

                
                if(condicionesFiltrado.etiquetasTiene){
                    let etiqTiene = condicionesFiltrado.etiquetasTiene;
                    let contiene = false;
                    for(let g of gasto.etiquetas){
                        for(let t of etiqTiene){
                            if(g.toLowerCase() === t.toLowerCase()){
                                    contiene = true;
                            }
                        }
                    }
                    if(contiene === false){
                        existe = false;
                    }                                          
                }

                return existe;
       
            });

        }
    }

    return gastosFiltrados;
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta = new Date(Date.now()).toISOString().substring(0,10)){

    let condicionesFiltrado = {
        etiquetasTiene: etiquetas,
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta
    }

    let gastosFiltrados = filtrarGastos(condicionesFiltrado);

    let gastosAgrupar = gastosFiltrados.reduce((acc, gasto) => {
        acc[gasto.obtenerPeriodoAgrupacion(periodo)] = (acc[gasto.obtenerPeriodoAgrupacion(periodo)] || 0) + gasto.valor;
        return acc;
    },{});

    return gastosAgrupar;
}

function transformarListadoEtiquetas(etiquetas) {
    //Toma las palabras formadas por letras y dígitos y las mete en el array resultado
    const regexp = /[a-zA-Z0-9]+/gi;  
    const resultado = etiquetas.match(regexp);
    return resultado;
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
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
}
