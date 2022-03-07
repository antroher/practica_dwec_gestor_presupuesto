'use strict';
//Variables globales
var presupuesto=0, idGasto=0;
var gastos=[];

//Creacion del objeto "Gasto"
function CrearGasto(des, v, fec=Date.now(), ...etiq){
    if((parseFloat(v)<0) || isNaN(v))
        v=0;

        this.descripcion=des;
        this.valor=v;
        this.fecha=(typeof fec==='string') ? Date.parse(fec) : fec;
        this.etiquetas=etiq;

        this.mostrarGasto=function(){
            return 'Gasto correspondiente a '+this.descripcion+' con valor '+this.valor+' €';
        };
        this.actualizarDescripcion=function(des){
            this.descripcion=des;
        };
        this.actualizarValor=function(val){
            if(parseFloat(val)>0)
            this.valor=val;  
        };
        this.mostrarGastoCompleto=function(){
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
        this.actualizarFecha=function(fec){
            fec=Date.parse(fec);
            if(!isNaN(fec))
            this.fecha=fec;
        };
        this.anyadirEtiquetas=function(...etiq){
            for(let elem of etiq)
            {
                if(!this.etiquetas.includes(elem))
                this.etiquetas.push(elem);
            }
        };
        this.borrarEtiquetas=function(...etiq){
            for(let elem of etiq)
            {
                if(this.etiquetas.includes(elem))
                {
                    this.etiquetas.splice(this.etiquetas.indexOf(elem),1);
                }
            }
        };
        this.obtenerPeriodoAgrupacion=function(periodo){
            let a = new Date(this.fecha), texto="";
            switch(periodo){
                case "dia":{
                    let m=a.getMonth()+1<10 ? `0${a.getMonth()+1}` : `${a.getMonth()+1}`;
                    let d=a.getDate()<10 ? `0${a.getDate()}` : `${a.getDate()}`;
                        texto=a.getFullYear() + '-' + m + '-' + d; //aaaa-mm-dd
                        break;
                }
                case "mes":{
                    let m=a.getMonth()+1<10 ? `0${a.getMonth()+1}` : `${a.getMonth()+1}`;
                        texto=a.getFullYear() + '-' + m; //aaaa-mm
                        break;
                }
                case "anyo":{
                        texto=a.getFullYear(); //aaaa
                        break;
                }
                default:{
                    console.log("Error, el formato de la cadena introducida no es valido.");
                }
            }
            return texto;
        };
}
//Funcion Formulario Filtrar
function transformarListadoEtiquetas(etiq){
    return etiq.match(/\w+/g);//.split(/[,\.;~:]+/g);
}
//Funciones
    //Acciones con el array "gastos"
function listarGastos(){
    return gastos;
}
function anyadirGasto(gasto){
    gasto.id=idGasto;
    idGasto++;
    gastos.push(gasto);
}
function borrarGasto(id){
    gastos.forEach(elem => {
        if(elem.id == id )           
        gastos.splice(gastos.indexOf(elem),1);
    })
    
}
function calcularTotalGastos(){
    let sum = 0;
    gastos.forEach((elem) => sum += elem.valor); 
    return sum;    

}
function calcularBalance(){
    let res=presupuesto-calcularTotalGastos();
    return res;
}
function filtrarGastos(objeto){

    let fd, fh, vmin, vmax, dc, et, fechaD, fechaH;

    if (objeto.hasOwnProperty('fechaDesde')){
        fd = Date.parse(objeto.fechaDesde);
        if (typeof objeto.fechaDesde === 'string'){
            if (!isNaN(fd)){
                fechaD = fd;
            }
            else{
                fechaD = undefined;
            }
        }
    }
    if (objeto.hasOwnProperty('fechaHasta')){
        fh = Date.parse(objeto.fechaHasta);
        if (typeof objeto.fechaHasta === 'string'){
            if (!isNaN(fh)){
                fechaH = fh;
            }
            else{
                fechaH = undefined;
            }
        }
    }
    if (objeto.hasOwnProperty('valorMinimo')){
        vmin = objeto.valorMinimo;
    }
    if (objeto.hasOwnProperty('valorMaximo')){
        vmax = objeto.valorMaximo;
    }
    if (objeto.hasOwnProperty('descripcionContiene')){
        dc = objeto.descripcionContiene;
        dc.toLowerCase();
    }
    if (objeto.hasOwnProperty('etiquetasTiene')){
        et = [...objeto.etiquetasTiene];
    }

    let results = gastos.filter(function(gasto){
        let devuelve = true;
        let latiene = false;

        if (typeof fechaD !== 'undefined'){
            if (gasto.fecha < fechaD){
                devuelve = false;   
            }  
        }
        if (typeof fechaH !== 'undefined'){
            if (gasto.fecha > fechaH){
                devuelve = false;
            }
        }
        if (typeof vmin !== 'undefined'){
            if (gasto.valor < vmin){
                devuelve = false;
            }
        }
        if (typeof vmax !== 'undefined'){
            if (gasto.valor > vmax){
                devuelve = false;
            }
        }
        if (typeof dc !== 'undefined'){
            if (!gasto.descripcion.includes(dc)){
                devuelve = false;
            }
        }
        if (typeof et !== 'undefined' && (et.length > 0)){
            for (let it of et){
                it.toLowerCase();
                for (let ot of gasto.etiquetas){
                    ot.toLowerCase();
                    if (it == ot){
                        latiene ||= true;
                    }
                }
            }
        }
        else{
            latiene = true;
        }
        return devuelve && latiene;
    })
    return results;
}
function agruparGastos(periodo = "mes", etiquetas = [], fechaDes, fechaHas=Date.now()) {
    let ResultadoFiltros = filtrarGastos({fechaDesde: fechaDes, fechaHasta:fechaHas, etiquetasTiene: etiquetas});
    let gastosAgrupados = ResultadoFiltros.reduce(function(acumulador, item)
    {
        let periodoA = item.obtenerPeriodoAgrupacion(periodo);

        if ((acumulador.hasOwnProperty(periodoA))) 
        {
            if (!isNaN(acumulador[periodoA]))
                acumulador[periodoA] += item.valor;
        }
        else     
            acumulador[periodoA] = item.valor;
        
        return acumulador;
    }, 
    {});

    return gastosAgrupados;
}
    //Acciones con la variable global "presupuesto"
function actualizarPresupuesto(pre){
    if(pre>=0)
    {
        presupuesto= pre;
        return presupuesto;
    }
    else
    {
        console.log("El presupuesto introducido no es válido.");
        return -1;
    }
}
function mostrarPresupuesto() {
    return "Tu presupuesto actual es de "+ presupuesto + " €";
}

//CargarGastos
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

