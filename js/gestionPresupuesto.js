'use strict'

//import { functionsIn } from "lodash";

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto=0;
var gastos=[];
var idGasto=0;

//Creación de objeto Gasto
function CrearGasto(desc, val, fec = Date.now(), ...etiq)
{
    if(parseFloat(val)<0 || isNaN(val))
    {
        val=0;
    }
    Date.parse(fec);

      this.descripcion=desc;
      this.valor= val;
      this.etiquetas= [...etiq];
      this.fecha= (typeof fec === 'string') ? Date.parse(fec) : fec;

    this.mostrarGasto=function()
      {
          return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
      };

    this.mostrarGastoCompleto=function()
      {
        let fec;
        if(typeof this.fecha === 'string')                
            fec = Date.parse(this.fecha);                  
        else
            fec = this.fecha;                    
        let aux = "";
        for(let elem of this.etiquetas) { 
            aux += `- ${elem}\n`;
        };        
        let fecN = new Date(fec);   
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(fecN.toLocaleString())}\nEtiquetas:\n`;
        return texto + aux;
      };

    this.actualizarDescripcion=function(desc)
        {
            this.descripcion=desc;
        };

    this.actualizarValor=function(val)
        {
            if(parseFloat(val)>0)
                {
                     this.valor=val;
                }
            
        };

    this.anyadirEtiquetas=function(...etiq)
        {
            for(let elem of etiq)
            {
                if(!this.etiquetas.includes(elem))
                {
                    this.etiquetas.push(elem);
                }
            }
        };

    this.actualizarFecha=function(fec)
        {
            fec=Date.parse(fec);
            if(!isNaN(fec))
            {
                this.fecha=fec;
            }
        };
    this.borrarEtiquetas=function(...etiq)
        {
            for(let elem of etiq)
            {
                {
                    if(this.etiquetas.includes(elem))
                    {
                        this.etiquetas.splice(this.etiquetas.indexOf(elem),1)
                    }
                }
            }
        };
    this.obtenerPeriodoAgrupacion=function(periodo)
        {
            let anyo=new Date(this.fecha);
            let texto="";
            switch(periodo)
            {
                //añadiremos +1 en el mes debido a que empieza a contar desde 0 (Enero)
                case "dia":{
                    let dia=anyo.getDate()<10 ? `0${anyo.getDate()}` : `${anyo.getDate()}`;
                    let mes=anyo.getMonth()<9 ? `0${anyo.getMonth()+1}` : `${anyo.getMonth()+1}`;
                    texto=anyo.getFullYear() + '-' + mes + '-' + dia; //xxxx-xx-xx
                }
                break;
                //añadiremos +1 en el mes debido a que empieza a contar desde 0 (Enero)
                case "mes":{
                    let mes=anyo.getMonth()<9 ? `0${anyo.getMonth()+1}` : `${anyo.getMonth()+1}`;
                    texto=anyo.getFullYear() + '-' + mes; //xxxx-xx
                }
                break;
                case "anyo":{
                    texto=anyo.getFullYear(); //xxxx
                }
                break;
                default:{
                    console.log("El formato de fecha no es válido.");
                }
            }
            return texto;
        }
    }

function transformarListadoEtiquetas(etiq)
{
        return etiq.match(/\w+/g);
}

//Acciones con el Array de gastos
function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id=idGasto;
    idGasto += 1;
    gastos.push(gasto);
}

function borrarGasto(iden)
{
   for(let i=0; i <gastos.length; i++)
   {
       if(iden == gastos[i].id)
       {
           gastos.splice(i,1);
       }
   }
}

function calcularTotalGastos(){
    let total=0;
    for(let i=0; i < gastos.length;i++)
    {
        total= total + gastos[i].valor;
    }
    return total;
}

function calcularBalance(){
    let balance= presupuesto- calcularTotalGastos();
    return balance;
}

function filtrarGastos(objeto){
    if(objeto != undefined || objeto!=null)
    {
        let result= gastos.filter(posicion=>{
            if(objeto.hasOwnProperty('fechaDesde'))
                if(posicion.fecha < Date.parse(objeto.fechaDesde))
                    return;
            if(objeto.hasOwnProperty("fechaHasta"))
                if(posicion.fecha > Date.parse(objeto.fechaHasta))
                    return;
            if(objeto.hasOwnProperty("valorMinimo"))
                if(posicion.valor < objeto.valorMinimo)
                    return;
            if(objeto.hasOwnProperty("valorMaximo"))
                if(posicion.valor > objeto.valorMaximo)
                    return;
            if(objeto.hasOwnProperty("descripcionContiene"))
                if(!posicion.descripcion.includes(objeto.descripcionContiene))
                    return;
            if(objeto.hasOwnProperty("etiquetasTiene")){
                if(objeto.etiquetasTiene.length != 0)
                {
                    let comp=false;
                    for(let desc of objeto.etiquetasTiene){
                        if(posicion.etiquetas.includes(desc))
                        comp=true;
                    }
                    if(!comp)
                        return;
                }
            }
            return posicion;
        });
        return result;
    }
    else
        return gastos;
}

function agruparGastos(periodo = 'mes' ,etiquetas = [],fechaD,fechaH=Date.now()) {
    let objeto={fechaDesde: fechaD, 
                fechaHasta:fechaH, 
                etiquetasTiene: etiquetas};
    let ResultadoFiltros = filtrarGastos(objeto);
    let gastosAgrupados = ResultadoFiltros.reduce(function(acumulador, item)
    {
        let periodoAgrup = item.obtenerPeriodoAgrupacion(periodo);

        if ((acumulador.hasOwnProperty(periodoAgrup))) 
        {
            if (!isNaN(acumulador[periodoAgrup]))
                acumulador[periodoAgrup] = acumulador[periodoAgrup] + item.valor;
        }
        else     
            acumulador[periodoAgrup] = item.valor;

        return acumulador;
    }, 
    {});

    return gastosAgrupados;
        
}
// Acciones con la variable global Presupuestos
function actualizarPresupuesto(presup) 
{
    if(presup>=0)
    {
        presupuesto=presup;
        return presupuesto;       
    }
    else
    {      
        console.log(`El dato introducido es erroneo.`);
        return -1;  
    } 
}

function mostrarPresupuesto() 
{
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function cargarGastos(arrayGastos){
    gastos = [];
    for (let g of arrayGastos) {
        let gastoRehidratado = new CrearGasto();
        Object.assign(gastoRehidratado, g);
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