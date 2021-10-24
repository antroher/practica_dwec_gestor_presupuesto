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
                        this.etiquetas.push(etiquetas3[i]);
                    }
                }      
            },

            mostrarGastoCompleto(){

                let acumulador = "";
                var fechanueva = new Date(this.fecha);
                fechanueva = fechanueva.toLocaleString();

                for (var i = 0; i < this.etiquetas.length; i++)
                {
                    acumulador = acumulador + `- ${this.etiquetas[i]}\n`;
                } 
                return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechanueva.toLocaleString()}\nEtiquetas:\n${acumulador}`;
            },

            actualizarFecha(nuevaFecha)
            {
                let BuenaFecha = Date.parse(nuevaFecha);

                if (!isNaN(BuenaFecha)) 
                {
                    this.fecha = Date.parse(nuevaFecha);
                }
            },
    
            borrarEtiquetas(...etiquetas2)
            {
                let eliminarEtiqueta = 0;
                for (let i = 0; i < etiquetas2.length; i++)
                {
                    eliminarEtiqueta = this.etiquetas.indexOf(etiquetas2[i]);
                    if(eliminarEtiqueta != -1)
                    {
                        this.etiquetas.splice(eliminarEtiqueta, 1);
                    }
                } 
            },

            obtenerPeriodoAgrupacion: function(periodo)
            {
                /*let MostrarFecha = new Date(this.fecha);
                let resultado="";
                let dd = String (MostrarFecha.getDate()).padstart(2,'0');  //----- agregame un 0 al principio si no tiene 2 caracters
                let mm = String (MostrarFecha.getMonth() + 1).padstart(2,'0'); 
                let yyyy = String (MostrarFecha.getFullYear()); 
                switch (periodo) {
                    case "dia":
                            resultado = `${yyyy}-${mm}-${dd}`;
                        return resultado;

                    case "mes":
                                resultado = `${yyyy}-${mm}`;
                            return resultado;

                    case "anyo":
                        return `${yyyy}`;

                    default:
                        return `Has Introducido un error`;
                };*/


                //El +1 en el mes porque enero empieza en 0
                let MostarFecha = new Date(this.fecha);
                let resultado="";
                //let dd = String (MostrarFecha.getDate()).padstart(2,'0'); ----- agregame un 0 al principio si no tiene 2 caracters
                switch(periodo) {
                    case "dia":
                        if (MostarFecha.getDate() < 10) 
                        {
                            if (MostarFecha.getMonth() < 10)
                                resultado =`${MostarFecha.getFullYear()}-0${MostarFecha.getMonth() + 1}-0${MostarFecha.getDate()}`;
                            else
                                resultado=`${MostarFecha.getFullYear()}-${MostarFecha.getMonth() + 1}-0${MostarFecha.getDate()}`;        
                        }
                        else
                        {
                            if (MostarFecha.getMonth() <10)
                                resultado =`${MostarFecha.getFullYear()}-0${MostarFecha.getMonth() + 1}-${MostarFecha.getDate()}`;
                            else
                                resultado=`${MostarFecha.getFullYear()}-${MostarFecha.getMonth() + 1}-${MostarFecha.getDate()}`;
                        }
                        return resultado;

                    case "mes":
                        
                        if (MostarFecha.getMonth() <10)
                            resultado =`${MostarFecha.getFullYear()}-0${MostarFecha.getMonth() + 1}`;
                        else
                            resultado=`${MostarFecha.getFullYear()}-${MostarFecha.getMonth() + 1}`;

                        return resultado;

                    case "anyo":
                        return `${MostarFecha.getFullYear()}`;

                    default:
                        return `Has Introducido un error`;

                };
            }
        };
    return gasto;       
}


function listarGastos()
{
    return gastos;
}

function anyadirGasto(gasto)
{
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id)
{
    for (let i = 0; i < gastos.length; i++) 
    {
        if (gastos[i].id === id) 
        {
            gastos.splice(i, 1);
        }
    }
}
function calcularTotalGastos()
{
    let suma = 0;
    for (let i = 0; i < gastos.length; i++)
    {
        suma += gastos[i].valor;
    }
    return suma;
}
function calcularBalance() 
{
    let result = 0;
    let totalgastos = calcularTotalGastos();

    result = presupuesto - totalgastos;

    return result;
}
function filtrarGastos(objeto) {

    let fechaDesde1, fecha_desde;
    let fechaHasta1, fecha_hasta;
    let valorMin;
    let valorMax;
    let descripcion;
    let etiqueta;
    let gastosFiltrados = [];


    if (objeto.hasOwnProperty('fechaDesde')) {
        fecha_desde = Date.parse(objeto.fechaDesde);
        if (typeof objeto.fechaDesde === 'string') {
            if (!isNaN(fecha_desde)) {
                fechaDesde1 = fecha_desde;
            }
            else
                fechaDesde1 = undefined;
        }
    }

    if (objeto.hasOwnProperty('fechaHasta')) {
        fecha_hasta = Date.parse(objeto.fechaHasta);
        if (typeof objeto.fechaHasta === 'string') {
            if (!isNaN(fecha_hasta)) {
                fechaHasta1 = fecha_hasta;
            }
            else
                fechaDesde1 = undefined;
        }
    }

    if (objeto.hasOwnProperty('valorMinimo')) {
        valorMin = objeto.valorMinimo;
    }

    if (objeto.hasOwnProperty('valorMaximo')) {
        valorMax = objeto.valorMaximo;
    }

    if (objeto.hasOwnProperty('descripcionContiene')) {
        descripcion = objeto.descripcionContiene;
    }

    if (objeto.hasOwnProperty('etiquetasTiene')) {

        etiqueta = [...objeto.etiquetasTiene];
    }

    gastosFiltrados = gastos.filter(function (item) {

        let devuelve = true;
        let latiene = false;

        if (typeof fechaD !== 'undefined') {

            if (item.fecha < fechaD) {
                devuelve = false;
            }
        }

        return devuelve && latiene;

    });

    return gastosFiltrados;
}

function agruparGastos(){}

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