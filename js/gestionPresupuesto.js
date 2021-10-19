// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
'use strict'
var presupuesto=0, idGasto=0;
var gastos=[];


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
        }
      };
    return gasto;
}

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

