
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto= 0;
let gastos = [];
let idGasto= 0;


function actualizarPresupuesto(valor) {
    if(valor > 0){
        presupuesto = valor;
        return presupuesto;
    }else{
        console.log("El valor introducido es menor que 0.")
        return -1;
    }
}
function mostrarPresupuesto() {
    
    return "Tu presupuesto actual es de " + presupuesto + " €";
    
}
function CrearGasto(desc, val, fech, ...etiq) { 
    let gasto= {
        descripcion : desc, 
        etiquetas : new Array(),       
        valor : null,
        fecha : null
        
    }

    if(parseFloat(val) > 0) {
        gasto.valor = val;

    }
    else{
        gasto.valor = 0;
    }

    if(fech === undefined || isNaN(Date.parse(fech))){  

        gasto.fecha = new Date(Date.now()).toISOString().substring(0,16);
    }
    else{

        gasto.fecha = Date.parse(fech);

    }


    if(etiq !== undefined){

        gasto.etiquetas = etiq; 

    }

    gasto.mostrarGastoCompleto = function(){

        let res = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`
        for(let i = 0; i < this.etiquetas.length; i++){

            res += "- " + this.etiquetas[i]+`\n`

        }

        return res;
        }
        
    

    gasto.mostrarGasto = function() {

        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    gasto.actualizarDescripcion = function(descripcion_nueva){

        this.descripcion = descripcion_nueva;
    }

    gasto.actualizarValor = function(valor_nuevo){
        if(parseFloat(valor_nuevo) > 0){

            this.valor = valor_nuevo;
        }
    }
    gasto.actualizarFecha = function(fecha_nueva){
        if(!isNaN(Date.parse(fecha_nueva))){

            this.fecha = Date.parse(fecha_nueva);
        }
    }

    gasto.anyadirEtiquetas = function(...etiqueta_nueva){
        etiqueta_nueva.forEach(e => {
            if(!this.etiquetas.includes(e)){
                this.etiquetas.push(e);
            }
        });
    }

    gasto.borrarEtiquetas = function(...borrar_etiquetas){
        borrar_etiquetas.forEach(b => {

            if(this.etiquetas.includes(b)){

                this.etiquetas.splice(this.etiquetas.indexOf(b),1)
            }
        });
    }
    gasto.obtenerPeriodoAgrupacion = function (periodo) {
        switch(periodo){

            case "dia":
                return new Date(gasto.fecha).toISOString().substring(0, 10);
                
            case "mes":
                return new Date(gasto.fecha).toISOString().substring(0, 7);

            case "anyo":
                return new Date(gasto.fecha).toISOString().substring(0, 4);
        }
    }

    return gasto;
}
function listarGastos(){
    return gastos;
}
function anyadirGasto(gastoPasado){

    gastoPasado.id = idGasto;
    gastos.push(gastoPasado);
    idGasto++;

}
function borrarGasto(idBorrar){
    gastos.forEach(g => {
        if(g.id == idBorrar){
            gastos.splice(gastos.indexOf(g),1);
        }
    });
}
function calcularTotalGastos(){
    let total_gastos = 0;
    gastos.forEach(g => {
        total_gastos += g.valor;
    });
    return total_gastos;

}
function calcularBalance(){
    let gastos_totales = calcularTotalGastos();
    return (presupuesto - gastos_totales)

}
function filtrarGastos(gastos){

}
function agruparGastos(){
    
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