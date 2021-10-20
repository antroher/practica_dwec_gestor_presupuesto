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
            for(let i = 0; i < incEtiqueta.length; i++){

                continue;
            }

                this.etiquetas.push(i);
            }
            
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
    };
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
}

//REVISAR LOS FOREACH A NIVEL DE TEORIA (MUY VERDE AUN)
function calcularBalance(){

    return presupuesto - calcularTotalGastos();

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
