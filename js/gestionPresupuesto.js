"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = new Array();
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

function CrearGasto(descripcion, valor, fecha = Date.now(), ...etiquetas) {
    // TODO
    if(valor < 0 || isNaN(valor)){

        valor = 0;
    }
    //Con esto comprobamos que value1 no sea negativo ni sea un string

    if(etiquetas.length == 0){

        etiquetas = [];
    }

    let gasto = { //ESTAR ATENTO CON LOS = CUANDO SE DECLARAN CONSTRUCTORES
        valor: parseFloat(valor), 
        descripcion: descripcion, //Esto hace referencia a las propiedades que tiene el objeto y se le asignan por parametro una vez recurrimos al constructor
        fecha: (typeof fecha === "string") ? Date.parse(fecha) : fecha,
        etiquetas: [...etiquetas],

        //A continuación los métodos que van ligados al constructor

        mostrarGasto(){

            console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.`);

            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        },

        actualizarDescripcion(nuevaDesc){

            this.descripcion = nuevaDesc;
        },

        actualizarValor(nuevoValor){
            if(nuevoValor >= 0){

                this.valor = nuevoValor;
            }
        },

        mostrarGastoCompleto(){

            let listaEtiquetas = "";
            let fechaLocal = new Date(this.fecha);

            this.etiquetas.forEach((i) => {

                listaEtiquetas += `- ${i}\n`
            })

            let message = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaLocal.toLocaleString()}\nEtiquetas:\n${listaEtiquetas}`;

            console.log(message);
            return(message);
        },

        actualizarFecha(newDate){
            if (typeof newDate !== "string" || isNaN(Date.parse(newDate))) {

                return;
            }

            this.fecha = Date.parse(newDate);
        },

        anyadirEtiquetas(...incEtiqueta){
            
            incEtiqueta.forEach((i) =>{
                if(!this.etiquetas.includes(i)){

                    this.etiquetas.push(i);
                }
            })
        },
      
        borrarEtiquetas(...etiquetas){
            etiquetas.forEach((i) =>{
    
                this.etiquetas.forEach((j, position) =>{
    
                    if(j.includes(i)){
    
                        this.etiquetas.splice(position, 1);
                    }
                })
            })
        },

        obtenerPeriodoAgrupacion(periodo){
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
    return gasto;
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

            return res;
        }
    return gastos;
}


function agruparGastos(){

}

/*
function filtrarGastos(objetoFil) {
    if (objetoFil != undefined && objetoFil != null && Object.entries(objetoFil).length != 0) {
      
        let resultado = gastos.filter((gast) => {

            if (objetoFiltro.hasOwnProperty("fechaDesde")) {
                if (gast.fecha < Date.parse(objetoFiltro.fechaDesde)) {
                    return;
                }
            }
  
            if (objetoFiltro.hasOwnProperty("fechaHasta")) {
                if (gast.fecha > Date.parse(objetoFiltro.fechaHasta)) {
                    return;
                }
            }
  
            if (objetoFiltro.hasOwnProperty("valorMinimo")) {
                if (gast.valor < objetoFiltro.valorMinimo) {
                    return;
                }
            }
  
            if (objetoFiltro.hasOwnProperty("valorMaximo")) {
                if (gast.valor > objetoFiltro.valorMaximo){
                    return;
                }
            }
  
            if (objetoFiltro.hasOwnProperty("descripcionContiene")) {
                if (!gast.descripcion.includes(objetoFiltro.descripcionContiene)) {
                    return;
                }
            }

            if (objetoFiltro.hasOwnProperty("etiquetasTiene")) {
                if(objetoFiltro.etiquetasTiene.length != 0){
                    let check = false;
                    for (let descrip of objetoFiltro.etiquetasTiene) {
                        if (gast.etiquetas.includes(descrip)) {
                            check = true;
                        }
                    }
                    if(!check){
                        return;
                    }
                }
            }
            return gast;
        });  
        return resultado;

    }else{
        return gastos;
    }
}*/

/*function fechaDesde(gFiltrado){
    if('fechaDesde' in gFiltrado)
        return true;
}

function fechaHasta(gFiltrado){
    if('fechaHasta' in gFiltrado)
        return true;
}

function valorMinimo(gFiltrado){
    if('valorMinimo' in gFiltrado)
        return true;
}

function valorMaximo(gFiltrado){
    if('valorMaximo' in gFiltrado)
        return true;
}

function descripcionContain(gFiltrado){
    if('descripcionContiene' in gFiltrado)
        return true;
}*/

/*
function filtrarGastos(gFiltrado){
    function fechaDesde(gFiltrado){
        if('fechaDesde' in gFiltrado)
            return true;
    }
    
    function fechaHasta(gFiltrado){
        if('fechaHasta' in gFiltrado)
            return true;
    }
    
    function valorMinimo(gFiltrado){
        if('valorMinimo' in gFiltrado)
            return true;
    }
    
    function valorMaximo(gFiltrado){
        if('valorMaximo' in gFiltrado)
            return true;
    }
    
    function descripcionContain(gFiltrado){
        if('descripcionContiene' in gFiltrado)
            return true;
    }

    let gastoF = {};

    if(fechaDesde(gFiltrado) == false & fechaHasta(gFiltrado) == false & valorMinimo(gFiltrado) == false & valorMaximo(gFiltrado) == false & descripcionContain(gFiltrado) == false){
        return gastoF;
    }else if(fechaDesde(gFiltrado) == (true) & fechaHasta(gFiltrado) == false & valorMinimo(gFiltrado) == false & valorMaximo(gFiltrado) == false & descripcionContain(gFiltrado) == false){
        return gastoF = gFiltrado;
    }else if(fechaDesde(gFiltrado) == (true) & fechaHasta(gFiltrado) == true & valorMinimo(gFiltrado) == false & valorMaximo(gFiltrado) == false & descripcionContain(gFiltrado) == false){
        return gastoF = gFiltrado;
    }else if(fechaDesde(gFiltrado) == (false) & fechaHasta(gFiltrado) == false & valorMinimo(gFiltrado) == false & valorMaximo(gFiltrado) == false & descripcionContain(gFiltrado) == false){
        return gastoF = gFiltrado;
    }else if(fechaDesde(gFiltrado) == (false) & fechaHasta(gFiltrado) == false & valorMinimo(gFiltrado) == true & valorMaximo(gFiltrado) == false & descripcionContain(gFiltrado) == false){
        return gastoF = gFiltrado;
    }else if(fechaDesde(gFiltrado) == (false) & fechaHasta(gFiltrado) == false & valorMinimo(gFiltrado) == true & valorMaximo(gFiltrado) == true & descripcionContain(gFiltrado) == false){
        return gastoF = gFiltrado;
    }else if(fechaDesde(gFiltrado) == (true) & fechaHasta(gFiltrado) == true & valorMinimo(gFiltrado) == false & valorMaximo(gFiltrado) == true & descripcionContain(gFiltrado) == false){
        return gastoF = gFiltrado;
    }else if(fechaDesde(gFiltrado) == (false) & fechaHasta(gFiltrado) == false & valorMinimo(gFiltrado) == true & valorMaximo(gFiltrado) == true & descripcionContain(gFiltrado) == true){
        return gastoF = gFiltrado;
    }else if(fechaDesde(gFiltrado) == (false) & fechaHasta(gFiltrado) == false & valorMinimo(gFiltrado) == false & valorMaximo(gFiltrado) == false & descripcionContain(gFiltrado) == true){
        return gastoF = gFiltrado;
    }else if(fechaDesde(gFiltrado) == (false) & fechaHasta(gFiltrado) == false & valorMinimo(gFiltrado) == false & valorMaximo(gFiltrado) == true & descripcionContain(gFiltrado) == true){
        return gastoF = gFiltrado;
    }else if(fechaDesde(gFiltrado) == (true) & fechaHasta(gFiltrado) == false & valorMinimo(gFiltrado) == false & valorMaximo(gFiltrado) == false & descripcionContain(gFiltrado) == true){
        return gastoF = gFiltrado;
    }else if(fechaDesde(gFiltrado) == (false) & fechaHasta(gFiltrado) == true & valorMinimo(gFiltrado) == false & valorMaximo(gFiltrado) == true & descripcionContain(gFiltrado) == true){
        return gastoF = gFiltrado;
    }
}*/
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
