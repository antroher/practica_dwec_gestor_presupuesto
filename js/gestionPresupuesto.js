// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

var presupuesto='0';
var gastos=[];
var idGasto='0';


function actualizarPresupuesto(canti) {
    // TODO
    if (canti > -1)
    {
        return presupuesto = canti;
    }
    else
    {
        console.log("Error: ha introducido un valor negativo")
         return -1;
    }
}
function mostrarPresupuesto() {
    // TODO
    let x = "Tu presupuesto actual es de " + presupuesto + " €";
    return x;
}


function CrearGasto(descri, v1) {
    // TODO
    v1 = parseFloat(v1)
    if (v1 < 0 || isNaN(v1)){
    v1 = 0;
    }
     let gasto = {
        descripcion: descri + "" ,
        valor: v1
    };

    //METODOS OBJETO GASTO
    gasto.mostrarGasto = function(){
       return "Gasto correspondiente a " + gasto.descripcion + " con valor " + gasto.valor +" €";
    };
    gasto.mostrarGastoCompleto = function () 
    {
        let textoEtiquetas = "";
        for(let i=0;i<gasto.etiquetas.length;i++){
            textoEtiquetas = textoEtiquetas + `- ` + gasto.etiquetas[i] + `\n`;
        }
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €\n Fecha: ${this.fecha.toLocaleString('es-ES')}\n Etiquetas: - ${textoEtiquetas}`;
    }
    gasto.actualizarDescripcion = function(description){
        gasto.descripcion = description;
    }; 
    gasto.actualizarValor = function(v2){
        if (v2 >= 0){
        gasto.valor = v2;
        }
    }; 

   return gasto;
}
function listarGastos() 
{
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);


}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
    listarGastos
    anyadirGasto
    borrarGasto
    calcularTotalGastos
    calcularBalance
}
