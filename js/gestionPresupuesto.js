"use strict"


var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(valor) {
    
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
    
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha = Date.now(), ...etiquetas) {
    
    if(valor < 0 || isNaN(valor)){
        valor = 0;
    }
    if(etiquetas.length == 0){
        etiquetas = [];
    }

    
        this.descripcion= descripcion;
        this.valor= valor;
        this.fecha= (typeof fecha === "string") ? Date.parse(fecha) : fecha;
        this.etiquetas= [...etiquetas];

        this.mostrarGasto = function(){
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        };

        this.actualizarDescripcion = function(nuevaDescripcion){
            this.descripcion = nuevaDescripcion;
        };

        this.actualizarValor = function(nuevoValor){
            
            if(nuevoValor >= 0){
                this.valor = nuevoValor;
            }
        };

        this.mostrarGastoCompleto = function(){
            let listaEtiquetas = "";
            let fechaLocal = new Date(this.fecha);

            this.etiquetas.forEach((i) =>{
                listaEtiquetas += `- ${i}\n`
            })

            let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaLocal.toLocaleString()}\nEtiquetas:\n${listaEtiquetas}`;

            console.log(texto);
            return texto;
        };
        
        this.actualizarFecha = function(nuevaFecha){
            if (typeof nuevaFecha !== "string") return;

            let okFecha = Date.parse(nuevaFecha) ;
            if(isNaN(okFecha)) return;

            this.fecha = Date.parse(nuevaFecha);
        };

        this.anyadirEtiquetas = function(...introEtiquetas){
            introEtiquetas.forEach((i) =>{
                if(this.etiquetas.includes(i)) return;

                this.etiquetas.push(i);
            })
        };

        this.borrarEtiquetas = function(...etiquetas){
            etiquetas.forEach((i) =>{
                this.etiquetas.forEach((j, posi) =>{
                    if(j.includes(i)) this.etiquetas.splice(posi, 1)
                })
            })
        };

        
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
        };
    

    
}

function listarGastos(){
    return gastos;
}




function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++
    gastos.push(gasto);
}



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

    
    return resultado;
}

function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}



function filtrarGastos(objetoDelGasto){
   
    if(objetoDelGasto != undefined && objetoDelGasto !=null){  
        let gastosFil = gastos.filter((gasto)=>{
            if(objetoDelGasto.hasOwnProperty("fechaDesde")){
                if(gasto.fecha < Date.parse(objetoDelGasto.fechaDesde)){
                    return;
                }
            }
            if(objetoDelGasto.hasOwnProperty("fechaHasta")){
                if(gasto.fecha > Date.parse(objetoDelGasto.fechaHasta)){
                    return;
                }
            }
            if (objetoDelGasto.hasOwnProperty("valorMaximo")) {
                if (gasto.valor > objetoDelGasto.valorMaximo) {
                  return;
                }
              }
            if(objetoDelGasto.hasOwnProperty("valorMinimo")){
                if(gasto.valor < objetoDelGasto.valorMinimo){
                    return;
                }
            }
            if (objetoDelGasto.hasOwnProperty("descripcionContiene")) {

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

function agruparGastos(periodo = "mes", etiquetas = [],fechaDes,fechaHas) {
    let resFil =  filtrarGastos({fechaDesde: fechaDes, fechaHasta: fechaHas, etiquetasTiene: etiquetas});
   
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
