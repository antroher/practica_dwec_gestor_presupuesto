// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
// TODO: Variable global

let presupuesto = 0;
let gastos = new Array();
let idGasto = 0;

function actualizarPresupuesto(valor)
{
    return (valor >= 0) ? presupuesto = valor : -1;
}

function mostrarPresupuesto()
{
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(desc, value, fechaGasto = Date.now(), ...ArrayLabels)
{
    if (value < 0 || isNaN(value)) value = 0;
    if (ArrayLabels == undefined) ArrayLabels = new Array();
    if (fechaGasto == undefined || isNaN(Date.parse(fechaGasto))) fechaGasto = new Date(Date.now());
    
    let expense =
    {
        descripcion: desc + "",
        valor: parseFloat(value),
        fecha: Date.parse(fechaGasto),
        etiquetas: [...ArrayLabels],

        mostrarGasto: function()
        {
            return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
        },

        actualizarDescripcion: function(desc)
        {
            if (desc != null && desc != "") this.descripcion = desc;
        },

        actualizarValor: function(data)
        {
            if (parseFloat(data) > 0) this.valor = data;
        },

        mostrarGastoCompleto()
        {
            let txt = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.\n" + "Fecha: " + new Date(this.fecha).toLocaleString() + "\n" + "Etiquetas:\n";

            if (this.etiquetas.length > 0) this.etiquetas.forEach(show => {txt = txt + "- " + show + "\n"});

            return txt;
        },

        actualizarFecha(updateDate)
        {
            if (!isNaN(Date.parse(updateDate))) this.fecha = Date.parse(updateDate);
        },

        anyadirEtiquetas(...etiquetas)
        {
            etiquetas.forEach(label =>
            {
                if (typeof(label) == "string" && !this.etiquetas.includes(label)) this.etiquetas.push(label);
            });
        },

        borrarEtiquetas(...etiquetas)
        {
            etiquetas.forEach(label =>
            {
                if (this.etiquetas.includes(label)) this.etiquetas.splice(this.etiquetas.indexOf(label), 1);
            });
        },

        obtenerPeriodoAgrupacion(periodo)
    {
        if (periodo !== undefined)
        {
            switch (periodo)
            {
                case "dia":
                    return new Date(this.fecha).toISOString().substring(0,10);

                case "mes":

                    return new Date(this.fecha).toISOString().substring(0,7);

                case "anyo":
                    return new Date(this.fecha).toISOString().substring(0,4);
            }
        }
    }
    };

    

    return expense;
}

function listarGastos()
{
    return gastos;
}

function anyadirGasto(addExpense)
{
    if (addExpense !== undefined && addExpense !== null)
    {
        addExpense.id = idGasto;
        gastos.push(addExpense);
        idGasto++;
    }
}

function borrarGasto(idExpense)
{
    gastos.forEach (exp =>
    {
        if (exp.id == idExpense) gastos.splice(gastos.indexOf(exp), 1);
    });
}

function calcularTotalGastos()
{
    let totalExp = 0;

    gastos.forEach (exp => {totalExp = parseFloat(totalExp + exp.valor);});

    return totalExp;
}

function calcularBalance()
{
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos()
{
       
}

function agruparGastos()
{

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
