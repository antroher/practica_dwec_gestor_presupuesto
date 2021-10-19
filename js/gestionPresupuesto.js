// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = new Array();
var idGasto = 0;

function actualizarPresupuesto(nuevopresupuesto) {
    // TODO
    if(nuevopresupuesto > 0) {
        presupuesto = nuevopresupuesto;
    } else {
        console.log("Error");
        return -1;
    }
    return presupuesto;
}

function mostrarPresupuesto() {
    // TODO
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion, valor, fecha, etiquetas) {
    // TODO
    if(valor < 0 || isNaN(valor)){
       valor = 0;
    }   
    let gasto = {
        valor : valor,
        descripcion : descripcion,
        fecha : (typeof fecha === "string") ? Date.parse(fecha) : fecha,
        etiquetas : [...etiquetas],

        mostrarGasto : function() {
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        },
        actualizarDescripcion : function(descripcion) {
            this.descripcion  = descripcion;
        },
        actualizarValor : function(valor) {
            if(valor > 0){
                this.valor = valor;
            }            
        },
        mostrarGastoCompleto : function() {

        },
        actualizarFecha : function(fecha) {
            if(!isNaN(Date.parse(fecha))){
                this.fecha =Date.parse(fecha);
            }                
        },
        anyadirEtiquetas : function(...etiquetas) {
            const aux = etiquetas.lastIndexOf((x) => {
                if (!this.etiquetas.includes(x)) {
                    return x
                }
            });
            this.etiquetas.push(...aux);
            
        },
        borrarEtiquetas : function(...etiquetas) {
            
        }
 
    }
    return gasto;
}

function listarGastos(){
    return gastos;

}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto+=1;
    gastos.push(gasto);
}

function borrarGasto(id){
    for(let i = 0; i < gastos.length; i++) {
        if(id === gastos[i].id){
            gastos.splice(i, 1);
         }
    }
}

function calcularTotalGastos(){
    let total = 0;
    for(let i = 0; i < gastos.length; i++) {
        total = total + gastos[i].valor;
    }
    return total;
}

function calcularBalance(){
    let balance = presupuesto - calcularTotalGastos();
    return balance;
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
}
