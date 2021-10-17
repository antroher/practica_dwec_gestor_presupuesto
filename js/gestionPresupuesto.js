'use strict'

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function comprobarNumNegativo(num){
    let negativo = false;

    if (num >= 0)
    {
        negativo = false;
    }
    else
    {
        negativo = true;
    }   
    return negativo;
}
function actualizarPresupuesto(num) {
    // TODO
    let valor;

    if (comprobarNumNegativo(num))
    {
        console.log('Error. No se puede introducir valores negativos.');
        valor = -1;
    }
    else
    {
        presupuesto = num;
        valor = presupuesto;
    }
    return valor;
}

function mostrarPresupuesto() {
    // TODO
    let texto = 'Tu presupuesto actual es de ' + presupuesto + ' €';
    return texto;
}

    function CrearGasto(des, v, fec = Date.now(), ...etiq) {
    // TODO

    if (comprobarNumNegativo(v)){
        v = 0;
    }
    
    let gasto = {

        descripcion: des,

        valor: v,
  
        etiquetas: [...etiq],

        fecha: (typeof fec == 'string') ? Date.parse(fec) : fec,

        mostrarGasto(){

            let texto = 'Gasto correspondiente a ' + this.descripcion + 
            ' con valor ' + this.valor + ' €';
            return texto;
        },


        mostrarGastoCompleto(){
              
            let fechaDate = new Date(this.fecha);
            let texto = this.mostrarGasto() + '.' + '\nFecha: ' + fechaDate.toLocaleString() + 
            '\nEtiquetas:';

            for (let eti of this.etiquetas){
                texto += '\n- ' + eti;
            }
            texto += '\n';
            return texto;
        },

        actualizarDescripcion(newDes){
            this.descripcion = newDes;
        },

        actualizarValor(newV){
            if (!comprobarNumNegativo(newV)){
                this.valor = newV;
            }
        },

        actualizarFecha(newFec){
            if (isNaN(Date.parse(newFec))){ 
            }
            else{
                this.fecha = Date.parse(newFec);
            }
        },

        buscarElemento(ele){
            let repetido = false;
            for (let i = 0; i < this.etiquetas.length && repetido == false; i++){
                if (this.etiquetas[i] === ele){
                    repetido = true;
                }
            }
            return repetido;
        },

        anyadirEtiquetas(...eti){
            for (let i = 0; i < eti.length; i++){
                if (this.buscarElemento(eti[0]) == false){
                    this.etiquetas.push(eti[i]);
                }
            }
        },

        borrarEtiquetas(...nombres){
            for (let i = 0; i < nombres.length; i++){
                for (let j = 0; j < this.etiquetas.length; j++){
                    if (this.etiquetas[j] === nombres[i]){
                        this.etiquetas.splice(i,1);
                    }
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
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id){
    for (let i = 0; i < gastos.length; i++){
        if (id == gastos[i].id){
            gastos.splice(i,1);
        }
    }
}

function calcularTotalGastos(){
    let total = 0;
    for (let gasto of gastos){
        total += gasto.valor;
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
    calcularBalance
}
