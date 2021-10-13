// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
// TODO: Variable global

let presupuesto = 0;

function actualizarPresupuesto(valor)
{
    return (valor >= 0) ? presupuesto = valor : -1;
}

function mostrarPresupuesto()
{
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(discount, value)
{
    if (value < 0 || isNaN(value)) value = 0;

    let expense =
    {
        descripcion:discount + "",
        valor:parseFloat(value),

        mostrarGasto:function()
        {
            return "Gasto correspondiente a " + this.descripcion+" con valor " + this.valor + " €";
        },

        actualizarDescripcion:function(discount)
        {
            if (discount != null && discount != "") this.descripcion=discount;
        },

        actualizarValor:function(dato)
        {
            if (parseFloat(dato) > 0) this.valor = dato;
        }
    };

    return expense;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
