// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

var presupuesto = 0;
var gastos = new Array();
var idGasto = 0;

function actualizarPresupuesto(numero) {
    if(numero >= 0)
        presupuesto = numero;
    else
    {
        console.log("ERROR. Valor no valido");
        return -1;
    }
    return presupuesto;
}

function mostrarPresupuesto() {
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion, valor, fecha = Date.now(), ...etiquetas) {
    if(valor <= 0 || isNaN(valor))
    {
        valor = 0;
    }   

    let gasto = {
        valor: valor,
        descripcion: descripcion,
        etiquetas: [...etiquetas],
        fecha: (typeof fecha === 'string') ? Date.parse(fecha) : fecha,
        mostrarGasto() {
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        },

        actualizarDescripcion(NDescripcion) {
            this.descripcion = NDescripcion;
        },

        actualizarValor(NValor) {
            if(NValor > 0)
                this.valor = NValor;
        },

        anyadirEtiquetas(...Netiquetas){
            for(var i = 0; i < this.etiquetas.length; i++)
            {
                if(Netiquetas != this.etiquetas[i])
                    this.etiquetas = [...Netiquetas];
            }
        },

        mostrarGastoCompleto(){
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} € 
            Fecha: ${this.fecha}
            Etiquetas: 
            - ${this.etiquetas[1]} 
            - ${this.etiquetas[2]} 
            - ${this.etiquetas[3]}`;
        },

        actualizarFecha(Nfecha){
            fecha = (typeof Nfecha == 'string') ? Date.parse(Nfecha) : Nfecha;
        }
    }

    return gasto;
}

    function listarGastos(){
        return gastos;
    }

    function anyadirGasto(gasto){
        gasto = {
            id: idGasto
        }  
    }

    function borrarGasto(id){

    }

    function calcularTotalGastos(){

    }

    function calcularBalance(){

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
