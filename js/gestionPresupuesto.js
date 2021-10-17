// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;

var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(actualizar) {

    let devolverValor;

    if(actualizar >= 0)
    {
        presupuesto = actualizar;
        devolverValor = presupuesto;
    }
    else
    {
        console.log("Es inferior a 0");
        devolverValor= -1;
    }
    return devolverValor; 
}

function mostrarPresupuesto() {
    console.log(`Tu presupuesto actual es de ${presupuesto} €`);
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion1, valor1, fecha1 = Date.now(), ...etiquetas1) {

    if(valor1 < 0 || isNaN(valor1)){
        valor1 = 0;
    }

    let gasto = {
            descripcion: descripcion1,
            valor: valor1,
            fecha: (typeof fecha1 === "string") ? Date.parse(fecha1) : fecha1,
            etiquetas:[...etiquetas1],

            mostrarGasto(){
                console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
                return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
            },

            actualizarDescripcion(nuevaDescripcion)
            {
                this.descripcion = nuevaDescripcion; 
            },

            actualizarValor(nuevoValor){

                if (nuevoValor >= 0){
                    this.valor = nuevoValor;
                }
            },

            anyadirEtiquetas (...etiquetas3)
            {
                let nuevaEtiqueta = 0;
                for(let i = 0; i < etiquetas3.length; i++)
                {
                    nuevaEtiqueta = this.etiquetas.indexOf(etiquetas3[i]);
                    if (nuevaEtiqueta == -1)
                    {
                        this.etiquetas.push(etiquetas3[i]);//¿funciona?
                    }
                }
                
            },

            mostrarGastoCompleto(){

                let acumulador;
                var fechanueva = new Date(this.fecha);
                fechanueva = fechanueva.toLocaleString();

                for (var i = 0; i < this.etiquetas.length; i++)
                {
                    acumulador +=" - "+this.etiquetas[i] + "\n";
                }
                
                return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechanueva}\nEtiquetas:\n ${this.etiquetas}`;
            },
            actualizarFecha(nuevaFecha)//ok
            {
                let BuenaFecha = Date.parse(nuevaFecha);

                if (!isNaN(BuenaFecha)) 
                {
                    this.fecha = Date.parse(nuevaFecha);
                }
            },
            borrarEtiquetas(...etiquetas2){
                for (let i = 0; i < this.etiquetas.length; i++)
                {
                    for(let j = 0; j < etiquetas2.length; j++)
                    {
                        if (this.etiquetas[i].valor === etiquetas2[j].valor)
                        {
                            this.etiquetas.splice(i, 1);
                        }
                        
                    }
                } 
            }
        };
        return gasto;       
}


function listarGastos()/*OK*/
{
    return gastos;
}

function anyadirGasto(gasto)/*OK*/
{
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id)/*OK*/
{
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === id) {
            gastos.splice(i, 1);
        }
    }
}
function calcularTotalGastos()/*OK*/
{
    let suma = 0;
    for (let i = 0; i < gastos.length; i++)
    {
        suma += gastos[i].valor;
    }
    return suma;
}
function calcularBalance() /*OK*/
{
    let result = 0;
    let totalgastos = calcularTotalGastos();

    result = presupuesto - totalgastos;

    return result;
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