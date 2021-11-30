"use strict"

//import { type } from "os";

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

    // let gasto = {
        this.descripcion = descripcion,
        this.valor = valor,
        this.fecha = (typeof fecha === "string") ? Date.parse(fecha) : fecha,
        this.etiquetas = [...etiquetas],

        this.mostrarGasto = function(){
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        },

        this.actualizarDescripcion = function(nuevaDescripcion){
            this.descripcion = nuevaDescripcion;
        },

        this.actualizarValor = function(nuevoValor){
            let valorDevuelto

            if(nuevoValor >= 0){
                this.valor = nuevoValor;
            }
        },

        this.mostrarGastoCompleto = function(){
            let listaEtiquetas = "";
            let fechaLocal = new Date(this.fecha);

            this.etiquetas.forEach((i) =>{
                listaEtiquetas += `- ${i}\n`
            })

            let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaLocal.toLocaleString()}\nEtiquetas:\n${listaEtiquetas}`;

            console.log(texto);
            return texto;
        },
        
        this.actualizarFecha = function(nuevaFecha){
            if (typeof nuevaFecha !== "string") return;

            let okFecha = Date.parse(nuevaFecha) ;
            if(isNaN(okFecha)) return;

            this.fecha = Date.parse(nuevaFecha);
        },

        this.anyadirEtiquetas = function(...introEtiquetas){
            introEtiquetas.forEach((i) =>{
                if(this.etiquetas.includes(i)) return;

                this.etiquetas.push(i);
            })
        },

        this.borrarEtiquetas = function(...etiquetas){
            etiquetas.forEach((i) =>{
                this.etiquetas.forEach((j, posi) =>{
                    if(j.includes(i)) this.etiquetas.splice(posi, 1)
                })
            })
        },

        //*****Práctica 3*****/
        this.obtenerPeriodoAgrupacion = function(periodo){
            let formatoFecha = new Date(this.fecha)
            switch(periodo){
                case "anyo":
                    return formatoFecha.getFullYear();
                case "mes":
                    return ((formatoFecha.getMonth()+1) < 10) ? formatoFecha.getFullYear() +"-0"+ (formatoFecha.getMonth()+1) : formatoFecha.getFullYear() +"-"+ (formatoFecha.getMonth()+1);
                case "dia":
                    return formatoFecha.getFullYear() +"-"+ (
                        ((formatoFecha.getMonth()+1) < 10) ? "0"+(formatoFecha.getMonth()+1) : (formatoFecha.getMonth()+1)) +"-"+ (
                            (formatoFecha.getDate() < 10) ? "0"+formatoFecha.getDate() : formatoFecha.getDate());
                default:
                    break;
            }
        }
    // };

    // return gasto;
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

//*************** El test 3 lo pasa pero luego da error en agruparGastos(), con if()******************

// function filtrarGastos(objetoFiltrante){
//     let fechaD;
//     let fechaH;
//     let valorMin;
//     let valorMax;
//     let descConti;
//     let listEtiq;

//     //Asignamos los valores validos, los no validos pasan a ser undefined.
//     if(objetoFiltrante.hasOwnProperty("fechaDesde")){ //comprueba que el objeto 'objetoFiltrante' tiene la propiedad que está definida como string.
//         if(typeof objetoFiltrante.fechaDesde === 'string'){
//             if(isNaN(Date.parse(objetoFiltrante.fechaDesde))){
//                 fechaD = undefined;
//             }
//             else{
//                 fechaD = Date.parse(objetoFiltrante.fechaDesde);
//             }
//         }
//     } 

//     if(objetoFiltrante.hasOwnProperty("fechaHasta") && typeof objetoFiltrante.fechaHasta === 'string'){
//         if(isNaN(Date.parse(objetoFiltrante.fechaHasta))){
//             fechaH = undefined;
//         }
//         else{
//             fechaH = Date.parse(objetoFiltrante.fechaHasta);
//         }
//     }

//     if(objetoFiltrante.hasOwnProperty("valorMinimo") && !isNaN(objetoFiltrante.valorMinimo)){
//         valorMin = objetoFiltrante.valorMinimo;
//     }
//     else{
//         valorMin = undefined;
//     }

//     if(objetoFiltrante.hasOwnProperty("valorMaximo") && !isNaN(objetoFiltrante.valorMaximo)){
//         valorMax = objetoFiltrante.valorMaximo;
//     }
//     else{
//         valorMax = undefined;
//     }

//     if(objetoFiltrante.hasOwnProperty("descripcionContiene") && typeof objetoFiltrante.descripcionContiene === 'string'){
//         descConti = objetoFiltrante.descripcionContiene;
//     }
//     else{
//         descConti = undefined;
//     }

//     if(objetoFiltrante.hasOwnProperty("etiquetasTiene")){
//         listEtiq = [...objetoFiltrante.etiquetasTiene];
//     }
//     else{
//         listEtiq = undefined;
//     }

//     //Comprobamos y filtramos
//     let listaFiltrada = gastos.filter(function(item){
//         let devuelve = false;
        
//         if(listEtiq === undefined && typeof fechaD !== 'undefined' && typeof fechaH === 'undefined'){
//             if(item.fecha >= fechaD){
//                 devuelve = true;
//             }
//         }

//         if(typeof fechaD === 'undefined' && typeof fechaH !== 'undefined' && item.fecha <= fechaH) devuelve = true;

//         if(typeof fechaD !== 'undefined' && typeof fechaH !== 'undefined'){
//             if(typeof valorMax === 'undefined'){
//                 if(item.fecha >= fechaD && item.fecha <= fechaH){
//                     devuelve = true;
//                 }    
//             }
//             if(typeof valorMax !== 'undefined'){
//                 if(item.fecha >= fechaD && item.fecha <= fechaH && item.valor < valorMax){
//                     devuelve = true;
//                 } 
//             }

//         } 

//         if(typeof valorMax === 'undefined' && typeof valorMin !== 'undefined' && item.valor > valorMin) devuelve = true;

//         if(listEtiq === undefined && typeof valorMin === 'undefined' && typeof valorMax !== 'undefined'){
//             if(typeof fechaD === 'undefined' || typeof fechaH == 'undefined'){
//                 if(item.valor < valorMax){
//                     devuelve = true;
//                 }
//             }
//         } 

//         if(descConti === undefined && typeof valorMin !== 'undefined' && typeof valorMax !== 'undefined' && item.valor > valorMin && item.valor < valorMax) devuelve =true;

//         if(typeof descConti !== 'undefined' && valorMin !== undefined && valorMax !== undefined){
//             if(item.descripcion.includes(descConti) && item.valor >= valorMin && item.valor <= valorMax){
//                 devuelve = true;
//             }
//         } 

//         if(listEtiq !== undefined){
//             if(valorMax !== undefined && fechaH === undefined){
//                 if(item.valor <= valorMax){
//                     for(let i = 0; i < listEtiq.length; i++){
//                         if(item.etiquetas.includes(listEtiq[i])){
//                             devuelve = true;
//                         }
//                     }        
//                 }
//             }
//             if(fechaD !== undefined){
//                 for(let i = 0; i < listEtiq.length; i++){
//                     if(item.etiquetas.includes(listEtiq[i])){
//                         if(item.fecha >= fechaD){
//                             devuelve = true;
//                         }
//                     }
//                 }
//             }
//             if(fechaH !== undefined && valorMax !== undefined){
//                 for(let i = 0; i < listEtiq.length; i++){
//                     if(item.etiquetas.includes(listEtiq[i])){
//                         if(item.fecha <= fechaH && item.valor <= valorMax){
//                             devuelve = true;
//                         }
//                     }
//                 }
//             }
//             if (valorMax === undefined && fechaD === undefined){
//                 for(let i = 0; i < listEtiq.length; i++){
//                     if(item.etiquetas.includes(listEtiq[i])){
//                         devuelve = true;
//                     }
//                 }
    
//             }

//         }
//         return devuelve;
//     })

//     if(listaFiltrada.length === 0){
//         listaFiltrada = [...gastos]
//     }
//     return listaFiltrada;
// } 

function filtrarGastos(objetoDelGasto){
    //Primera comprobacion
    if(objetoDelGasto != undefined && objetoDelGasto !=null){  //Si el objetoDelGasto esta indefinido o es nulo que entre en el if, si no se va al else
        let gastosFil = gastos.filter((gasto)=>{
            if(objetoDelGasto.hasOwnProperty("fechaDesde") && objetoDelGasto.fechaDesde !== undefined){
                if(gasto.fecha < Date.parse(objetoDelGasto.fechaDesde)){
                    return;
                }
            }
            if(objetoDelGasto.hasOwnProperty("fechaHasta") && objetoDelGasto.fechaHasta !== undefined){
                if(gasto.fecha > Date.parse(objetoDelGasto.fechaHasta)){
                    return;
                }
            }
            if (objetoDelGasto.hasOwnProperty("valorMaximo") && objetoDelGasto.valorMaximo !== undefined) {
                if (gasto.valor > objetoDelGasto.valorMaximo) {
                  return;
                }
              }
            if(objetoDelGasto.hasOwnProperty("valorMinimo") && objetoDelGasto.valorMinimo !== undefined){
                if(gasto.valor < objetoDelGasto.valorMinimo){
                    return;
                }
            }
            if (objetoDelGasto.hasOwnProperty("descripcionContiene") && objetoDelGasto.descripcionContiene !== undefined) {

                if (!gasto.descripcion.includes(objetoDelGasto.descripcionContiene))
                        return;

            }
            if(objetoDelGasto.hasOwnProperty("etiquetasTiene") && Array.isArray(objetoDelGasto.etiquetasTiene)){
                if(objetoDelGasto.etiquetasTiene.length != 0){
                    let devu =false;

                    for(let descrip of objetoDelGasto.etiquetasTiene){
                        if(gasto.etiquetas.includes(descrip)){
                            devu = true;
                        }
                    }
                    if(!devu){
                        return;
                    }
                }
            }
            return gasto;
        });
        return gastosFil;
    }
    else{
        return gastos;
    }
}

//*****Practica 3*****
function agruparGastos(periodo = "mes", etiquetas = [],fechaDes,fechaHas) {
    let resFil =  filtrarGastos({fechaDesde: fechaDes, fechaHasta: fechaHas, etiquetasTiene: etiquetas});
    //console.log(resFil)
    let gastAgrup = resFil.reduce(function(acumular,gasto){
        let obtPeriodo = gasto.obtenerPeriodoAgrupacion(periodo);

        if(acumular.hasOwnProperty(obtPeriodo))
        {
            acumular[obtPeriodo] += gasto.valor;
        }
        else{
            acumular[obtPeriodo] = gasto.valor;
        }
        return acumular;
    },{});

    return gastAgrup;
}

//7. Convertir Etiquetas en una array aceptando solo letras y números
function transformarListadoEtiquetas(etiquetas){

    //match busca los elemento que sean letras o números y /g los mete en una array, i es para que valga tanto minusculas como mayusculas
    let listaEtiquetas = etiquetas.match(/[a-z0-9]+/gi);
    return listaEtiquetas;
}

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
    transformarListadoEtiquetas
}
