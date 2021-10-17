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
            var contador = 0;
            for(var i = 0; i < Netiquetas.length; i++)
            {
                contador = this.etiquetas.indexOf(Netiquetas[i]);
                if(contador == -1)
                {
                    this.etiquetas.push(Netiquetas[i]);
                }                   
            }
        },

        borrarEtiquetas(...Netiquetas){
            var contador = 0;
            for(var i = 0; i < Netiquetas.length; i++)
            {
                contador = this.etiquetas.indexOf(Netiquetas[i]);
                if(contador != -1)
                {
                    this.etiquetas.splice(contador, 1);
                }                   
            }
        },

        mostrarGastoCompleto(){
            var fechaT = new Date(this.fecha);
            fechaT = fechaT.toLocaleString();
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaT}\nEtiquetas:\n- ${this.etiquetas[0]}\n- ${this.etiquetas[1]}\n- ${this.etiquetas[2]}\n`;
        },

        actualizarFecha(Newfecha = this.fecha){ 
            var Newfecha2 = Date.parse(Newfecha);
            if((typeof Newfecha === 'string') && Newfecha2)
                this.fecha = Newfecha2;
        }
    }

    return gasto;
}

    function listarGastos(){
        return gastos;
    }

    function anyadirGasto(gasto){
        Object.defineProperty(gasto, 'id', {value: idGasto});
        idGasto = idGasto + 1;
        gastos.push(gasto);        
    }

    function borrarGasto(id){
        for(var i = 0; i < gastos.length; i++)
        {
            if(id == gastos[i].id)
            {
                gastos.splice(i, 1);
            }
        }
    }

    function calcularTotalGastos(){
        var totalGastos = 0;
        for(var i = 0; i < gastos.length; i++)
        {
            totalGastos = totalGastos + gastos[i].valor;
        }
        return totalGastos;
    }

    function calcularBalance(){
        var balance = 0;
        balance = presupuesto - calcularTotalGastos();
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
