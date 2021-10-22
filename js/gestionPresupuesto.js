//Variables global
'use strict'
var presupuesto=0, idGasto=0;
var gastos=[];

//Creacion del objeto "Gasto"
function CrearGasto(des, v, fec=Date.now(), ...etiq){
    if((parseFloat(v)<0) || isNaN(v))
        v=0;

    let gasto = {
        descripcion:des,
        valor:v,
        fecha:(typeof fec==='string') ? Date.parse(fec) : fec,
        etiquetas:[...etiq],

        mostrarGasto(){
            return 'Gasto correspondiente a '+this.descripcion+' con valor '+this.valor+' €';
        },
        actualizarDescripcion(des){
            this.descripcion=des;
        },
        actualizarValor(val){
            if(parseFloat(val)>0)
            this.valor=val;  
        },
        mostrarGastoCompleto() {
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
        },
        actualizarFecha(fec)
        {
            fec=Date.parse(fec);
            if(!isNaN(fec))
            this.fecha=fec;
        },
        anyadirEtiquetas(...etiq)
        {
            for(let elem of etiq)
            {
                if(!this.etiquetas.includes(elem))
                this.etiquetas.push(elem);
            }
        },
        borrarEtiquetas(...etiq){
            for(let elem of etiq)
            {
                if(this.etiquetas.includes(elem))
                {
                    this.etiquetas.splice(this.etiquetas.indexOf(elem),1);
                }
            }
        },
        obtenerPeriodoAgrupacion(periodo){
            let a = new Date(this.fecha), texto="";
            switch(periodo){
                case "dia":{
                    let m=a.getMonth()<10 ? `0${a.getMonth()+1}` : `${a.getMonth()+1}`;
                    let d=a.getDate()<10 ? `0${a.getDate()}` : `${a.getDate()}`;
                        texto=a.getFullYear() + '-' + m + '-' + d; //aaaa-mm-dd
                        break;
                }
                case "mes":{
                    let m=a.getMonth()<10 ? `0${a.getMonth()+1}` : `${a.getMonth()+1}`;
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
        }
      };
    return gasto;
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
    let fecD, fecH, vMax, vMin, descrip, etiq;
    if('fechaDesde' in objeto)
        fecD=objeto.fechaDesde;
    if('fechaHasta' in objeto)
        fecH=objeto.fechaHasta;
    if('valorMinimo' in objeto)
        vMax=objeto.valorMinimo;
    if('valorMaximo' in objeto)
        vMin=objeto.valorMaximo;
    if('descripcionContiene' in objeto)
        descrip=objeto.descripcionContiene;
    if('etiquetasTiene' in objeto)
        etiq=objeto.etiquetasTiene;
    
    let res = gastos.filter(funtion(item))
    {
        let ok = true;
        if(fecD!==undefined)
            if(item.fecha<fecD)
                ok=false;
        if(fecH!==undefined)
            if(item.fecha>fecH)
                ok=false;
        if(vMax!==undefined)
            if(item.valor>vMax)
                ok=false;
        if(vMin!==undefined)
            if(item.valor<vMin)
                ok=false;
        if(etiq!==undefined)
            if(!item.etiquetas.includes(etiq))
                ok=false;
        return ok;
    }
    return res;
}
function agruparGastos(periodo, etiquetas, fechaDes="2021-01-01", fechaHas=String(Date.now())){
    if(periodo=="dia" || periodo=="anyo")
        periodo=periodo;
    else
        periodo="mes";

    let arrayFelGastos = filtrarGastos({});
    let arrayGastos = arrayFelGastos.filter(funtion(item))
    {
        let ok = true;
        if(item.fecha<fechaDesde)
            ok=false;
        if(item.fecha>fechaHas)
            ok=false;
        if(!item.etiquetas.includes(etiquetas))
            ok=false;
        return ok;
    }
    
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
    agruparGastos
}

