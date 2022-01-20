// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
'use strict'

var presupuesto = 0;
var gastos = new Array();
var  idGasto = 0; 


function actualizarPresupuesto(numero) {
    if(numero >= 0)
        presupuesto = numero;
    else
    {
        console.log("ERROR. Valor no valido");
        return -1;
    }
    return presupuesto;
}

function mostrarPresupuesto() {

    return(`Tu presupuesto actual es de ${presupuesto} €`);

}

function CrearGasto(descripcion, valor, fecha = Date.now(), ...etiquetas) {
    if(valor <= 0 || isNaN(valor))
    {
        valor = 0;
    }   

    
        this.valor = valor,
        this.descripcion = descripcion,
        this.etiquetas = [...etiquetas],
        this.fecha = (typeof fecha === 'string') ? Date.parse(fecha) : fecha,
        this.mostrarGasto = function() {
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        },

        this.actualizarDescripcion = function(NDescripcion) {
            this.descripcion = NDescripcion;
        },

        this.actualizarValor = function(NValor) {
            if(NValor > 0)
                this.valor = NValor;
        },

        this.anyadirEtiquetas = function(...Netiquetas){
            var contador = 0;
            for(var i = 0; i < Netiquetas.length; i++)
            {
                contador = this.etiquetas.indexOf(Netiquetas[i]);
                if(contador == -1)
                {
                    this.etiquetas.push(Netiquetas[i]);
                }                   
            }
        },

        this.borrarEtiquetas = function(...Netiquetas){
            var contador = 0;
            for(var i = 0; i < Netiquetas.length; i++)
            {
                contador = this.etiquetas.indexOf(Netiquetas[i]);
                if(contador != -1)
                {
                    this.etiquetas.splice(contador, 1);
                }                   
            }
        },

        this.mostrarGastoCompleto = function(){
            var fechaT = new Date(this.fecha);
            fechaT = fechaT.toLocaleString();
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaT}\nEtiquetas:\n- ${this.etiquetas[0]}\n- ${this.etiquetas[1]}\n- ${this.etiquetas[2]}\n`;
        },

        this.actualizarFecha = function(Newfecha = this.fecha){ 
            var Newfecha2 = Date.parse(Newfecha);
            if((typeof Newfecha === 'string') && Newfecha2)
                this.fecha = Newfecha2;
        },
        this.obtenerPeriodoAgrupacion = function(periodo){
            let fechaT = new Date(this.fecha);

            switch(periodo){
                case 'dia':{
                    if(fechaT.getDate() < 10)
                    {
                        if(fechaT.getMonth()+1 < 10)
                            return `${fechaT.getFullYear()}-0${fechaT.getMonth()+1}-0${fechaT.getDate()}`;
                        else
                            return `${fechaT.getFullYear()}-${fechaT.getMonth()+1}-0${fechaT.getDate()}`;
                    }                 
                    else 
                    {
                        if(fechaT.getMonth()+1 < 10)
                            return `${fechaT.getFullYear()}-0${fechaT.getMonth()+1}-${fechaT.getDate()}`;
                        else
                            return `${fechaT.getFullYear()}-${fechaT.getMonth()+1}-${fechaT.getDate()}`;
                    }
                    break;
                }               
                case 'mes':{
                    if(fechaT.getMonth()+1 < 10)
                        return `${fechaT.getFullYear()}-0${fechaT.getMonth()+1}`;
                    else
                        return `${fechaT.getFullYear()}-${fechaT.getMonth()+1}`;
                    break;
                }                  
                case 'anyo':{
                    return `${fechaT.getFullYear()}`;
                    break;
                }                
                default:{
                    return `Periodo no valido`;
                }                  
            }
        
    }

}

function listarGastos()
{
    return gastos;
}

function anyadirGasto(gasto){
    Object.defineProperty(gasto, 'id', {value: idGasto});
    idGasto = idGasto + 1;
    gastos.push(gasto);        
}

function borrarGasto(id)
{
    for (let i = 0; i < gastos.length; i++) 
    {
        if (gastos[i].id === id) 
        {
            gastos.splice(i, 1);
        }
    }
}


function calcularTotalGastos(){
    var totalGastos = 0;
    for(var i = 0; i < gastos.length; i++)
    {
        totalGastos = totalGastos + gastos[i].valor;
    }
    return totalGastos;
}

function calcularBalance()
{
    var balance = 0;
    balance = presupuesto - calcularTotalGastos();
    return balance;

}

function filtrarGastos(param){

    if(param != undefined && param !=null){  
        let resultado = gastos.filter((gasto)=>{
            if(param.hasOwnProperty("fechaDesde") && typeof param.fechaDesde !== "undefined"){
                if(gasto.fecha < Date.parse(param.fechaDesde)){
                    return;
                }
            }
            if(param.hasOwnProperty("fechaHasta") && typeof param.fechaHasta !== "undefined"){
                if(gasto.fecha > Date.parse(param.fechaHasta)){
                    return;
                }
            }
            if (param.hasOwnProperty("valorMaximo") && typeof param.valorMaximo !== "undefined") {
                if (gasto.valor > param.valorMaximo) {
                  return;
                }
              }
            if(param.hasOwnProperty("valorMinimo") && typeof param.valorMinimo !== "undefined"){
                if(gasto.valor < param.valorMinimo){
                    return;
                }
            }
            if (param.hasOwnProperty("descripcionContiene") && typeof param.descripcionContiene !== "undefined") {

                if (!gasto.descripcion.includes(param.descripcionContiene))
                        return;
    
            }
            if(param.hasOwnProperty("etiquetasTiene") && Array.isArray(param.etiquetasTiene) && param.etiquetasTiene.length !== 0){
                if(param.etiquetasTiene.length != 0){

                    let valorDevuelto = false;
                    for(let descrip of param.etiquetasTiene){
                        if(gasto.etiquetas.includes(descrip)){
                            valorDevuelto = true;
                        }
                    }
                    if(!valorDevuelto){
                        return;
                    }
                }
            }
            return gasto;
        });
        return resultado;
    }
    else{
        return gastos;
    }
}
   
function agruparGastos(periodo = 'mes', etiquetas, fd, fh){
    let filtrar = {etiquetasTiene: etiquetas, fechaDesde: fd, fechaHasta:fh};
    let subconj = filtrarGastos(filtrar);

    let reducido = subconj.reduce(function(acu, item){
        let per = item.obtenerPeriodoAgrupacion(periodo);
        if(!acu.hasOwnProperty(per)){
            acu[per] = 0;
        }
        else{
            if (isNaN(acu[per])){
                acu[per] = 0;
            }
        }

        acu[per] = acu[per] + item.valor;

        return acu;
    }, {});

    return reducido;
}

// Práctica 7
    function transformarListadoEtiquetas(etiqueta)
    {
        let Netiquetas = etiqueta.match(/[a-zA-Z0-9]+/gi);
        return Netiquetas;
    }
// Práctica 8 
 
function cargarGastos(gatosarray){

    arraygastos = gatosarray;
   
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
