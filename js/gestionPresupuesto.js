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
    return 'Tu presupuesto actual es de ' + presupuesto + ' €';
}

function CrearGasto(desc, value, fechaGasto = Date.now(), ...ArrayLabels)
{
    if (value < 0 || isNaN(value)) value = 0;
    if (ArrayLabels == undefined) ArrayLabels = new Array();
    if (fechaGasto == undefined || isNaN(Date.parse(fechaGasto))) fechaGasto = new Date(Date.now());

    this.descripcion = desc + '';
    this.valor = parseFloat(value);
    this.fecha = Date.parse(fechaGasto);
    this.etiquetas = [...ArrayLabels];
    
    this.mostrarGasto = function()
    {
        return 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €';
    };

    this.actualizarDescripcion = function(desc)
    {
        desc != null && desc != '' && (this.descripcion = desc);
    };

    this.actualizarValor = function(data)
    {
        parseFloat(data) > 0 && (this.valor = data);
    };
    
    this.mostrarGastoCompleto = function()
    {
        let txt = 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €.\n' + 'Fecha: ' + new Date(this.fecha).toLocaleString() + '\n' + 'Etiquetas:\n';
        this.etiquetas.length > 0 && this.etiquetas.forEach(show => {txt = txt + '- ' + show + '\n'});

        return txt;           
    };

    this.actualizarFecha = function(updateDate)
    {
        !isNaN(Date.parse(updateDate)) && (this.fecha = Date.parse(updateDate));
    };

    this.anyadirEtiquetas = function(...datosEtiquetas)
    {
        datosEtiquetas.forEach(label => typeof(label) == 'string' && !this.etiquetas.includes(label) && this.etiquetas.push(label));
    };

    this.borrarEtiquetas = function(...datosEtiquetas)
    {
        datosEtiquetas.forEach(label => {this.etiquetas.includes(label) && this.etiquetas.splice(this.etiquetas.indexOf(label), 1)});
    };

    this.obtenerPeriodoAgrupacion = function(periodo)
    {
        if (periodo != undefined)
        {
            switch (periodo)
            {
                case 'dia':
                    return new Date(this.fecha).toISOString().substring(0, 10);

                case 'mes':
                    return new Date(this.fecha).toISOString().substring(0, 7);

                case 'anyo':
                    return new Date(this.fecha).toISOString().substring(0, 4);
            }
        }        
    }
}

function listarGastos()
{
    return gastos;
}

function anyadirGasto(addExpense)
{
    if (addExpense != undefined && addExpense != null)
    {
        addExpense.id = idGasto;
        gastos.push(addExpense);
        idGasto++;
    }
}

function borrarGasto(idExpense)
{
    gastos.forEach(exp => {exp.id == idExpense && gastos.splice(gastos.indexOf(exp), 1)});
}

function calcularTotalGastos()
{
    let totalExp = 0;
    gastos.forEach(exp => {totalExp = parseFloat(totalExp + exp.valor);})

    return totalExp;
}

function calcularBalance()
{
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtro)
{
    let gastosFiltrados = gastos.filter(function(exp)
    {
        let fechaDesde = false;
        let fechaHasta = false;
        let valorMaximo = false;
        let valorMinimo = false;
        let descBool = false;
        let etiquetas = false;

        if (filtro != undefined)
        {
            filtro.hasOwnProperty('fechaDesde') && exp.fecha >= Date.parse(filtro.fechaDesde) ? fechaDesde = true :
            !filtro.hasOwnProperty('fechaDesde') || filtro.fechaDesde == undefined ? fechaDesde = true : exp;

            filtro.hasOwnProperty('fechaHasta') && exp.fecha <= Date.parse(filtro.fechaHasta) ? fechaHasta = true :
            !filtro.hasOwnProperty('fechaHasta') ? fechaHasta = true : exp;

            filtro.hasOwnProperty('valorMinimo') && exp.valor >= filtro.valorMinimo ? valorMinimo = true :
            !filtro.hasOwnProperty('valorMinimo') ? valorMinimo = true : exp;

            filtro.hasOwnProperty('valorMaximo') && exp.valor <= filtro.valorMaximo ? valorMaximo = true :
            !filtro.hasOwnProperty('valorMaximo') ? valorMaximo = true : exp;

            filtro.hasOwnProperty('descripcionContiene') && exp.descripcion.includes(filtro.descripcionContiene) ? descBool = true :
            !filtro.hasOwnProperty('descripcionContiene') ? descBool = true : exp;
            
            if (filtro.hasOwnProperty('etiquetasTiene'))
            {
                filtro.etiquetasTiene.length != 0 ? filtro.etiquetasTiene.forEach(label =>{exp.etiquetas.includes(label) && etiquetas == false && (etiquetas = true);}) :
                etiquetas = true;
            }

            else if (!filtro.hasOwnProperty('etiquetasTiene')) etiquetas = true;

            if (fechaDesde && fechaHasta && valorMaximo && valorMinimo && etiquetas && descBool) return exp;
        }
    })

    return gastosFiltrados;
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta)
{
    let currentDate = new Date(Date.now());
    let gastosFiltrados = new Array();
    let txt = '';

    periodo != 'dia' && periodo != 'anyo' && (periodo = 'mes');
    etiquetas == undefined && (etiquetas = new Array());
    isNaN(Date.parse(fechaDesde)) && (fechaDesde = undefined);   
    isNaN(Date.parse(fechaHasta)) && (fechaHasta = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate());
    
    let filtro =
    {
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta,
        etiquetasTiene: etiquetas
    };

    gastosFiltrados = filtrarGastos(filtro);
    gastosFiltrados.forEach(exp => {txt += '\n '+ new Date(exp.fecha).toLocaleDateString() + ' - ' + exp.etiquetas;});

    return gastosFiltrados.reduce(function(previousValue, currentValue)
    {
        previousValue.hasOwnProperty(currentValue.obtenerPeriodoAgrupacion(periodo)) ? 
        previousValue[currentValue.obtenerPeriodoAgrupacion(periodo)] = parseFloat(previousValue[currentValue.obtenerPeriodoAgrupacion(periodo)]) + parseFloat(currentValue.valor) :
        previousValue[currentValue.obtenerPeriodoAgrupacion(periodo)] = parseFloat(currentValue.valor);

        return previousValue;
    },  {}
    );   
}

function transformarListadoEtiquetas(txt)
{
    return txt.split(/[ ,;:\.~]+/g);
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
    agruparGastos,
    transformarListadoEtiquetas
}