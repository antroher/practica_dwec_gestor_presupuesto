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
    return `Tu presupuesto actual es de ${presupuesto} €`;
}
function CrearGasto(des, v, fec=Date.now(), ...etiq=[]){
    if((parseFloat(v)<0) || isNaN(v))
        v=0;
        
    fec = Date.parse(fec);

    let gasto = {
        descripcion:des,
        valor:v,
        fecha:(typeof fec==='string') ? Date.parse(fec) : fec,
        etiquetas : [...etiq],

        mostrarGasto(){
            return 'Gasto correspondiente a '+gasto.descripcion+' con valor '+gasto.valor+' €';
        },
        actualizarDescripcion(des){
            gasto.descripcion=des;
        },
        actualizarValor(val){
            if(parseFloat(val)>0)
                gasto.valor=val;  
        },
        mostrarGastoCompleto(){
            let i=0, text = 'Gasto correspondiente a '+gasto.descripcion+' con valor '+gasto.valor+' €\n';
            text += 'Fecha: ' + gasto.fecha;
            if((gasto.etiquetas).length>0)
            {
                text+="Etiquetas: \n";
                while(i<(gasto.etiquetas).length)
                {
                text+=gasto.etiquetas[i] + "\n";
                }
            }
            else
            {
                text+="No hay etiquetas.";
            }
            return text;
        },
        actualizarFecha(fec)
        {
            fec = Date.parse(fec);
            if(!isNaN(fec))
                gasto.fecha=fec;
        },
        añadirEtiquetas(...etiq)
        {
            let i=0,j=0, ok=true, etiqN;
            while(i<=gasto.etiquetas.length)
            {
                while(j<=[...etiq].length)
                {
                    if(gasto.etiquetas[i]==[...etiq[j]])
                    {
                        ok=false;
                    }
                    j++;
                }
                etiqN=[...etiq[j-1]];
                if(ok)
                {
                    (gasto.etiquetas).push(etiqN);
                }
                i++;
            }
                
        },
        borrarEtiquetas(){
            let i=0,j=0;
            while(i<=gasto.etiquetas.length)
            {
                while(j<=[...etiq].length)
                {
                    if(gasto.etiquetas[i]==[...etiq[j]])
                    {
                        gasto.etiquetas.splice(i,1);
                        i--;
                    }
                    j++;
                }
                i++;
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
    let i=0;
    while(gastos.length>i)
        if(gastos[i]==id)
            delete gastos[i];
    
}
function calcularTotalGastos(){
    let i=0, res=0;
    while (i<gastos.length)
        res += gastos[i].valor;
    return res;
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

