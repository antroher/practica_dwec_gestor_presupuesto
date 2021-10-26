"use strict"

import { type } from "os";

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

        borrarEtiquetas : function(...etiquetas){
            etiquetas.forEach((i) =>{
                this.etiquetas.forEach((j, posi) =>{
                    if(j.includes(i)) this.etiquetas.splice(posi, 1)
                })
            })
        },

        //*****Práctica 3*****/
        obtenerPeriodoAgrupacion : function(periodo){
            let formatoFecha = new Date(this.fecha)
            switch(periodo){
                case "anyo":
                    return formatoFecha.getFullYear();
                case "mes":
                    return (formatoFecha.getMonth() < 10) ? formatoFecha.getFullYear() +"-0"+ (formatoFecha.getMonth()+1) : formatoFecha.getFullYear() +"-"+ (formatoFecha.getMonth()+1);
                case "dia":
                    return formatoFecha.getFullYear() +"-"+ (
                        (formatoFecha.getMonth() < 10) ? "0"+(formatoFecha.getMonth()+1) : (formatoFecha.getMonth()+1)) +"-"+ (
                            (formatoFecha.getDate() < 10) ? "0"+formatoFecha.getDate() : formatoFecha.getDate());
                default:
                    break;
            }
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

    gastos.forEach((i) =>{
        resultado += i.valor;
    });

    // for(let i = 0; i < gastos.length; i++){
    //     resultado = resultado + gastos[i].valor;
    // }
    return resultado;
}

function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}

//*****Practica 3*****
function filtrarGastos(objetoFiltrante){
    let fechaD;
    let fechaH;
    let valorMin;
    let valorMax;
    let descConti;
    let listEtiq;

    //Asignamos los valores validos, los no validos pasan a ser undefined.
    if(objetoFiltrante.hasOwnProperty("fechaDesde")){ //comprueba que el objeto 'objetoFiltrante' tiene la propiedad que está definida como string.
        if(typeof objetoFiltrante.fechaDesde === 'string'){
            if(isNaN(Date.parse(objetoFiltrante.fechaDesde))){
                fechaD = undefined;
            }
            else{
                fechaD = Date.parse(objetoFiltrante.fechaDesde);
            }
        }
    } 

    if(objetoFiltrante.hasOwnProperty("fechaHasta") && typeof objetoFiltrante.fechaHasta === 'string'){
        if(isNaN(Date.parse(objetoFiltrante.fechaHasta))){
            fechaH = undefined;
        }
        else{
            fechaH = Date.parse(objetoFiltrante.FechaHasta);
        }
    }

    if(objetoFiltrante.hasOwnProperty("valorMinimo") && !isNaN(objetoFiltrante.valorMinimo)){
        valorMin = objetoFiltrante.valorMinimo;
    }
    else{
        valorMin = undefined;
    }

    if(objetoFiltrante.hasOwnProperty("valorMaximo") && !isNaN(objetoFiltrante.valorMaximo)){
        valorMax = objetoFiltrante.valorMaximo;
    }
    else{
        valorMax = undefined;
    }

    if(objetoFiltrante.hasOwnProperty("descripcionContiene") && typeof objetoFiltrante.descripcionContiene === 'string'){
        descConti = objetoFiltrante.descripcionContiene;
    }
    else{
        descConti = undefined;
    }






    //Comprobamos y filtramos
    let listaFiltrada = gastos.filter(function(item){
        let devuelve = false;
        
        if(typeof fechaD !== 'undefined' && typeof fechaH === 'undefined'){
            if(item.fecha >= fechaD){
                devuelve = true;
            }
        }

        if(typeof fechaD === 'undefined' && typeof fechaH !== 'undefined' && item.fecha <= fechaH) devuelve = true;

        if(typeof fechaD !== 'undefined' && typeof fechaH !== 'undefined'){
            console.log("entra")
            if(item.fecha >= fechaD && item.fecha <= fechaH){//No entra en fechaH
                devuelve = true;
            }
        } 

        if(typeof valorMin !== 'undefined' && item.valor > valorMin) devuelve = true;

        if(typeof valorMax !== 'undefined' && item.valor < valorMax) devuelve = true;

        if(typeof descConti !== 'undefined') devuelve = true;



        console.log(objetoFiltrante.length);
        console.log(devuelve);
        return devuelve;
    })

    if(listaFiltrada.length === 0){
        listaFiltrada = [...gastos]
    }

    console.log(listaFiltrada.length);
    return listaFiltrada;
}
//*****Practica 3*****
function agruparGastos(){

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
}
