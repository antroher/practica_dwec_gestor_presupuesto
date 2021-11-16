"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var idGasto = 0;
//COMENTARIO PARA PRIMER COMMIT Y COMPROBAR VERSIONES
function actualizarPresupuesto(valor) {
    //TODO
    let retorno;
    if(valor >= 0){
        presupuesto = parseFloat(valor);
        retorno = presupuesto;
    
    }
    else{
        console.log("Error. Valor introducido no valido.")
        retorno = -1;
    }
    return retorno;

}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcionIn, valorIn, fechaIn = Date.now(), ...etiquetasIn) {
    // TODO
    if(valorIn < 0 || isNaN(valorIn)){

        valorIn = 0;
    }
    //Con esto comprobamos que value1 no sea negativo ni sea un string

    if(typeof fechaIn === "string"){
        if(isNaN(Date.parse(fechaIn))){
            fechaIn = Date.now();
        }
        else{
            fechaIn = Date.parse(fechaIn);
        }
    }

    this.descripcion = descripcionIn,
    this.valor = parseFloat(valorIn),
    this.fecha = fechaIn,
    this.etiquetas = [...etiquetasIn],

        //A continuación los métodos que van ligados al constructor

    this.mostrarGasto = function(){

        console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.`);

        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    },

    this.mostrarGastoCompleto = function(){

        let listaEtiquetas = "";
        let fechaLocal = new Date(this.fecha).toLocaleString();

        this.etiquetas.forEach((i) => {

            listaEtiquetas += `- ${i}\n`
        })

        let message = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaLocal}\nEtiquetas:\n${listaEtiquetas}`;

        console.log(message);
        return(message);
    },


    this.actualizarDescripcion = function(nuevaDesc){

        this.descripcion = nuevaDesc;
    },

    this.actualizarValor = function(nuevoValor) {
        if(nuevoValor >= 0){

            this.valor = nuevoValor;
        }
    },

  
    this.actualizarFecha = function(newDate){
        if (typeof newDate !== "string" || isNaN(Date.parse(newDate))) {

            return;
        }

        this.fecha = Date.parse(newDate);
    },

    this.anyadirEtiquetas = function(...incEtiqueta){
            
        incEtiqueta.forEach((i) =>{
            if(!this.etiquetas.includes(i)){

                this.etiquetas.push(i);
            }
        })
    },
      
    this.borrarEtiquetas =function(...etiquetas){
        etiquetas.forEach((i) =>{
    
            this.etiquetas.forEach((j, position) =>{
    
                if(j.includes(i)){
    
                    this.etiquetas.splice(position, 1);
                }
            })
        })
    },

    this.obtenerPeriodoAgrupacion = function(periodo){
            
        let date = new Date(this.fecha);

        switch(periodo){
            case "dia":{

                if(date.getMonth() + 1 < 10){
                    if(date.getDate() < 10){
                        return `${date.getFullYear()}-0${date.getMonth() + 1}-0${date.getDate()}`;
    
                    }else{
                        return `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;
                    } 

                }else if(date.getDate() < 10) {
                    return `${date.getFullYear()}-${date.getMonth() + 1}-0${date.getDate()}`;

                }else{
                    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                }             
            }

            case "mes":{
                if(date.getMonth() + 1 < 10) {
                    return `${date.getFullYear()}-0${date.getMonth() + 1}`;
                }else{
                    return `${date.getFullYear()}-${date.getMonth() + 1}`;
                }
            }

            case "anyo":{
                if (periodo === "anyo") {
                    return date.getFullYear();
                }
            }
        }
    }
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){//CUIDADO CON LOS PARAMENTROS DE ENTRADA
    gasto.id = idGasto;

    idGasto++;

    gastos.push(gasto);

}

function borrarGasto(id){
    gastos.forEach((i, position) =>{
        
        if(i.id === id){
            gastos.splice(position,1);
        }
    })
}

function calcularTotalGastos(){
    let result = 0;

    gastos.forEach((i)=>{

        result += i.valor;
    })

    return result;
}

//REVISAR LOS FOREACH A NIVEL DE TEORIA (MUY VERDE AUN)
function calcularBalance(){

    return presupuesto - calcularTotalGastos();

}

function filtrarGastos(gastoF){

        let res = Object.assign(gastos);

        if(typeof gastoF === 'object' && gastoF !== null && gastoF !== undefined && Object.entries(gastoF).length > 0){

            if(gastoF.hasOwnProperty('fechaDesde') && typeof gastoF.fechaDesde === 'string'){
                res = res.filter((aux) => {
                    return aux.fecha >= (Date.parse(gastoF.fechaDesde));
                })//TENGO QUE SACARLO FUERA DE ESTE ENTORNO PARA VER COMO SE COMPORTA DEPURANDOLO PARA TERMINAR DE ENTENDERLO
            }

            if(gastoF.hasOwnProperty('fechaHasta') && typeof gastoF.fechaHasta === 'string'){
                res = res.filter((aux) => {
                    return aux.fecha <= (Date.parse(gastoF.fechaHasta));
                })
            }

            if(gastoF.hasOwnProperty('valorMinimo') && typeof gastoF.valorMinimo === 'number'){
                res = res.filter((aux) => {
                    return aux.valor >= gastoF.valorMinimo;
                })
            }

            if(gastoF.hasOwnProperty('valorMaximo') && typeof gastoF.valorMaximo === 'number'){
                res = res.filter((aux) => {
                    
                    return aux.valor <= gastoF.valorMaximo;
                })
            }

            if(gastoF.hasOwnProperty('descripcionContiene') && typeof gastoF.descripcionContiene === 'string'){
                res = res.filter((aux) => {
                                        
                    if(aux.descripcion.includes(gastoF.descripcionContiene))
                        return true;
                })
            }//FINALMENTE NO ES NECESARIA LA UTILIZACION DE SPLIT JOIN, UTILIZANDO EL INCLUDE Y COMPARANDO LA descripcion DEL aux CON LA DEL OBJETO Y LA PROPIEDAD etiquetaContiene se resuelve.
            
            if(gastoF.hasOwnProperty('etiquetasTiene') && Array.isArray(gastoF.etiquetasTiene)){
                res = res.filter((aux) => {
                    for(let i = 0; i < gastoF.etiquetasTiene.length; i++){
                        
                        if(aux.etiquetas.includes(gastoF.etiquetasTiene[i]))
                            return true;
                    }
                })
                //TEN CUIDADO CUANDO COMPRUEBES QUE TIENE QUE, LO TENIAS AL REVES "gastoF.etiquetasTiene.inclues(aux.etiquetas[i])"
                        //ESTO GENERABA QUE COMPROBARA LAS ETIQUETAS DEL OBJETO Y LUEGO LAS COMPARABA CON LAS DE aux
                        //AL HACER ESTO NOS GENERABA QUE LAS ETIQUETAS A FILTRAR NO FUERAN LAS COMPROBADAS, SI NO QUE FUERAN LAS ETIQUETAS DEL OBJETO LAS QUE SE COMPROBABAN
                        //ESTA SITUACION AUNQUE PASABA LOS TEST GENERABA PROBLEMAS SI NO CAMBIAMOS EL ORDEN DE LAS ETIQUETAS DEL OBJETO
                        //ESTAR ATENTO PARA FUTURAS SITUACIONES SIMILARES
            }

            return res;
        }
    return gastos;
}


function agruparGastos(periodo = "mes", etiquetasT, fechaDes , fechaHas) {
    
    let gastoA = {etiquetasTiene: etiquetasT, fechaDesde: fechaDes, fechaHasta: fechaHas};
    
    let aux = filtrarGastos(gastoA);
    
    let agrupar = aux.reduce((acc, item) => {
        let pred = item.obtenerPeriodoAgrupacion(periodo);
        if (!acc.hasOwnProperty(pred)) {
            acc[pred] = item.valor;
        }else{
            acc[pred] += item.valor;
        }
        return acc;
    },{});
    return agrupar;
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    //Practica1
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    //Practica2
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    //Practica3
    filtrarGastos,
    agruparGastos
}
