"use strict"

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    let valorDevolver;

    if(valor >= 0){
        presupuesto = parseFloat(valor);
        valorDevolver = presupuesto;
    }
    else{
        console.log("Error. Valor introducido no valido.")
        valorDevolver = -1;
    }
return valorDevolver;
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
    if(etiquetas.length == 0){
        etiquetas = [];
    }

    let gasto = {
        descripcion: descripcion,
        valor: valor,
        fecha: (typeof fecha === "string") ? Date.parse(fecha) : fecha,
        etiquetas: [...etiquetas],

        mostrarGasto : function(){
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        },

        actualizarDescripcion : function(nuevaDescripcion){
            this.descripcion = nuevaDescripcion;
        },

        actualizarValor : function(nuevoValor){
            let valorDevuelto

            if(nuevoValor >= 0){
                this.valor = nuevoValor;
            }
        },

        mostrarGastoCompleto : function(){
            let listaEtiquetas = "";
            let fechaLocal = new Date(this.fecha);

            this.etiquetas.forEach((i) =>{
                listaEtiquetas += `- ${i}\n`
            })

            let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaLocal.toLocaleString()}\nEtiquetas:\n${listaEtiquetas}`;

            console.log(texto);
            return texto;
        },
        
        actualizarFecha : function(nuevaFecha){
            if (typeof nuevaFecha !== "string") return;

            let okFecha = Date.parse(nuevaFecha) ;
            if(isNaN(okFecha)) return;

            this.fecha = Date.parse(nuevaFecha);
        },

        anyadirEtiquetas : function(...introEtiquetas){
            introEtiquetas.forEach((i) =>{
                if(this.etiquetas.includes(i)) return;

                this.etiquetas.push(i);
            })
        },
    };

    return gasto;
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++
    gastos.push(gasto);
}

// function borrarGasto(id){
//     for(let i = 0; i < gastos.length; i++){
//         if(gastos[i].id === id){
//             gastos.splice(i, 1);
//         }
//     }
// }

function borrarGasto(id){
    gastos.forEach((i, posi) =>{
        if(i.id === id) gastos.splice(posi, 1);
    })
}

function calcularTotalGastos(){
    let resultado = 0;

    for(let i = 0; i < gastos.length; i++){
        resultado = resultado + gastos[i].valor;
    }
    return resultado;
}

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
