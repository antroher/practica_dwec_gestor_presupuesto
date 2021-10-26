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
function filtrarGastos(objeto) {
    if (objeto != undefined && objeto != null) 
    {
        let res = gastos.filter(item => {
            if (objeto.hasOwnProperty('fechaDesde')) 
            {
            if (item.fecha < Date.parse(objeto.fechaDesde)) 
                return;
            }
            if (objeto.hasOwnProperty("fechaHasta")) 
            {
            if (item.fecha > Date.parse(objeto.fechaHasta)) 
            {
                return;
            }
            }
            if (objeto.hasOwnProperty("valorMinimo")) 
            {
            if (item.valor < objeto.valorMinimo) 
                return;
            }
            if (objeto.hasOwnProperty("valorMaximo")) 
            {
            if (item.valor > objeto.valorMaximo)
                return;
            }
            if (objeto.hasOwnProperty("descripcionContiene")) 
            {
            if (!item.descripcion.includes(objeto.descripcionContiene))
                return;
            }
            if (objeto.hasOwnProperty("etiquetasTiene")) 
            {
                if (objeto.etiquetasTiene.length != 0)
                {
                    let ok = false;

                    for (let descripcion of objeto.etiquetasTiene) 
                        if (item.etiquetas.includes(descripcion)) 
                            ok = true;   
                    if (!ok) 
                        return;
                }
            }
            return item;
        });
            return res;
    } 
    else 
        return gastos;
};
function agruparGastos(periodo = "mes", etiquetas = [], fechaDes, fechaHas=Date.now()) {
    let ResultadoFiltros = filtrarGastos({fechaDesde: fechaDes, fechaHasta:fechaHas, etiquetasTiene: etiquetas});
    let gastosAgrupados = ResultadoFiltros.reduce(function(acumulador, item)
    {
        let periodoA = item.obtenerPeriodoAgrupacion(periodo);

        if (acumulador.hasOwnProperty(periodoA))
            acumulador[periodoA] += item.valor;
        else     
            acumulador[periodoA] = item.valor;
        
        return acumulador
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

