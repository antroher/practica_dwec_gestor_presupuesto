import * as gestionPresupuesto from './gestionPresupuesto.js'

function mostrarDatoEnId(idElemento, valor)
{
   document.getElementById(idElemento).innerHTML = `<p>${valor}<\p>`;
}

function mostrarGastoWeb(idElemento, gasto)
{    
    let elem = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.className = 'gasto';

    let divGastoDesc = document.createElement('div');
    divGastoDesc.className = 'gasto-descripcion';
    divGastoDesc.textContent = gasto.descripcion;
    divGasto.append(divGastoDesc);

    let divGastoFecha = document.createElement('div');
    divGastoFecha.className = 'gasto-fecha';
    divGastoFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.append(divGastoFecha);

    let divGastoValor = document.createElement('div');
    divGastoValor.className = 'gasto-valor';
    divGastoValor.textContent = gasto.valor + '';
    divGasto.append(divGastoValor);

    let divGastoEtiquetas = document.createElement('div');
    divGastoEtiquetas.className = 'gasto-etiquetas';
    
    gasto.etiquetas.forEach(label =>
        {
            let span = document.createElement('span');
            span.className = 'gasto-etiquetas-etiqueta';
            span.textContent = label + ' ';

            let removeLabels = new BorrarEtiquetasHandle();
            removeLabels.gasto = gasto;
            removeLabels.etiqueta = label;
            span.addEventListener('click', removeLabels);
            divGastoEtiquetas.append(span);            
        }
    );
    
    divGasto.append(divGastoEtiquetas);

    if (idElemento == 'listado-gastos-completo')
    {
        let btnEdit = document.createElement('button');
        btnEdit.className = 'gasto-editar';
        btnEdit.type = 'button';
        btnEdit.textContent = 'Editar';

        let editHandle = new EditarHandle();
        editHandle.gasto = gasto;
        btnEdit.addEventListener('click', editHandle);
        divGasto.append(btnEdit);

        let btnRemove = document.createElement('button');
        btnRemove.className = 'gasto-borrar';
        btnRemove.type = 'button';
        btnRemove.textContent = 'Borrar';

        let removeHandle = new BorrarHandle();
        removeHandle.gasto = gasto;
        btnRemove.addEventListener('click', removeHandle);
        divGasto.append(btnRemove);

        let btnEditForm = document.createElement('button');
        btnEditForm.className = 'gasto-editar-formulario';
        btnEditForm.type = 'button';
        btnEditForm.textContent = 'Editar Form';

        let editFormHandle = new EditarHandleFormulario();
        editFormHandle.gasto = gasto;
        editFormHandle.btnEditGasto = btnEditForm;
        editFormHandle.divGasto = divGasto;
        btnEditForm.addEventListener('click',editFormHandle);
        divGasto.append(btnEditForm);
        
        let btnRemoveApi = document.createElement("button");
        btnRemoveApi.className = "gasto-borrar-api";
        btnRemoveApi.type = "button";
        btnRemoveApi.textContent = "Borrar (API)";

        let removeApi = new BorrarApiHandle();
        removeApi.gasto = gasto;
        btnRemoveApi.addEventListener("click", removeApi);
        divGasto.append(btnRemoveApi);        
    }
    
    elem.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{    
    let divP =  document.getElementById(idElemento);
    divP.innerHTML = '';

    let txt  =  '<div class="agrupacion">' +
                '<h1>Gastos agrupados por '+ periodo + '</h1>';

    for (let i in agrup)
    {
        txt +=  '<div class= "agrupacion-dato">' +
                '<span class= "agrupacion-dato-clave">' + i + '</span>' +
                '<span class= "agrupacion-dato-valor">' + ' ' + agrup[i] + '</span>' +
                '</div>';
    }

    txt += '</div>';
    divP.innerHTML += txt;

    // Estilos
    divP.style.width = "33%";
    divP.style.display = "inline-block";
    // Crear elemento <canvas> necesario para crear la gráfica
    // https://www.chartjs.org/docs/latest/getting-started/
    let chart = document.createElement("canvas");
    // Variable para indicar a la gráfica el período temporal del eje X
    // En función de la variable "periodo" se creará la variable "unit" (anyo -> year; mes -> month; dia -> day)
    let unit = "";
    switch (periodo) {
    case "anyo":
        unit = "year";
        break;
    case "mes":
        unit = "month";
        break;
    case "dia":
    default:
        unit = "day";
        break;
    }

    // Creación de la gráfica
    // La función "Chart" está disponible porque hemos incluido las etiquetas <script> correspondientes en el fichero HTML
    const myChart = new Chart(chart.getContext("2d"), {
        // Tipo de gráfica: barras. Puedes cambiar el tipo si quieres hacer pruebas: https://www.chartjs.org/docs/latest/charts/line.html
        type: 'line',
        data: {
            datasets: [
                {
                    // Título de la gráfica
                    label: `Gastos por ${periodo}`,
                    // Color de fondo
                    backgroundColor: "#FD1300",
                    // Datos de la gráfica
                    // "agrup" contiene los datos a representar. Es uno de los parámetros de la función "mostrarGastosAgrupadosWeb".
                    data: agrup
                }
            ],
        },
        options: {
            scales: {
                x: {
                    // El eje X es de tipo temporal
                    type: 'time',
                    time: {
                        // Indicamos la unidad correspondiente en función de si utilizamos días, meses o años
                        unit: unit
                    }
                },
                y: {
                    // Para que el eje Y empieza en 0
                    beginAtZero: true
                }
            }
        }
    });
    // Añadimos la gráfica a la capa
    divP.append(chart);
}

function repintar()
{
    document.getElementById('presupuesto').innerHTML = '';
    document.getElementById('balance-total').innerHTML = '';
    document.getElementById('gastos-totales').innerHTML = '';
    mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());

    document.getElementById('listado-gastos-completo').innerHTML = '';
    let gastos = gestionPresupuesto.listarGastos();
    gastos.forEach(exp => {mostrarGastoWeb('listado-gastos-completo', exp);});
    
    document.getElementById('listado-gastos-filtrado-1').innerHTML = '';
    let gastosFilt = gestionPresupuesto.filtrarGastos({fechaDesde:'2021-09-01', fechaHasta:'2021-09-30'});
    gastosFilt.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-1', gastoFiltrado);});

    document.getElementById('listado-gastos-filtrado-2').innerHTML = '';
    gastosFilt = gestionPresupuesto.filtrarGastos({valorMin:50});
    gastosFilt.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-2', gastoFiltrado);});

    document.getElementById('listado-gastos-filtrado-3').innerHTML = '';
    gastosFilt = gestionPresupuesto.filtrarGastos({valorMin:200, etiquetasTiene:['seguros']});
    gastosFilt.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-3', gastoFiltrado);});

    document.getElementById('listado-gastos-filtrado-4').innerHTML = '';
    gastosFilt = gestionPresupuesto.filtrarGastos({valorMaximo:50, etiquetasTiene:['comida', 'transporte']});
    gastosFilt.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-4', gastoFiltrado);});

    document.getElementById('agrupacion-dia').innerHTML='';
    mostrarGastosAgrupadosWeb('agrupacion-dia', gestionPresupuesto.agruparGastos('dia'), 'día');

    document.getElementById('agrupacion-mes').innerHTML='';
    mostrarGastosAgrupadosWeb('agrupacion-mes', gestionPresupuesto.agruparGastos('mes'), 'mes');

    document.getElementById('agrupacion-anyo').innerHTML='';
    mostrarGastosAgrupadosWeb('agrupacion-anyo', gestionPresupuesto.agruparGastos('anyo'), 'año');
}

function actualizarPresupuestoWeb()
{     
    gestionPresupuesto.actualizarPresupuesto(parseFloat(prompt('Introduce un nuevo presupuesto: ')));
    repintar();
}

function nuevoGastoWeb()
{
    let desc = prompt('Introduce la descripción del nuevo gasto:');
    let valor = parseFloat(prompt('Introduce el valor del nuevo gasto:'));
    let fecha = prompt('Introduce una fecha para el nuevo gasto con este formato(aaaa-mm-dd):');
    let etiquetasTiene = prompt('Introduce las etiquetas(etiqueta1, etiqueta2, etiqueta3):');
    let etiquetas = etiquetasTiene.split(',');
    let gasto = new gestionPresupuesto.CrearGasto(desc, valor, fecha);

    etiquetas.forEach(label => {gasto.anyadirEtiquetas(label);});
    gestionPresupuesto.anyadirGasto(gasto);

    repintar();
}

// Handle Functions
function EditarHandle()
{
    this.handleEvent = function()
    {
        let etiquetas = new Array();
        let desc = prompt('Introduce la descripción:');
        let valor = parseFloat(prompt('Introduce el valor:'));
        let fecha = prompt('Introduce una fecha con este formato (aaaa-mm-dd):');
        let etiquetasTiene = prompt('Introduce las etiquetas(etiqueta1, etiqueta2, etiqueta3):');
        
        etiquetas = etiquetasTiene.split(',');
        
        desc != '' && this.gasto.actualizarDescripcion(desc);
        valor >= 0 && this.gasto.actualizarValor(valor);
        fecha !='' && this.gasto.actualizarFecha(fecha);

        this.gasto.etiquetas = etiquetas;
        repintar();
    };
}

function BorrarHandle()
{    
    this.handleEvent = function()
    {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    };
}

function BorrarEtiquetasHandle()
{
    this.handleEvent = function()
    {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
}

function BorrarApiHandle()
{
    this.handleEvent = async function()
    {
        if (this.gasto.hasOwnProperty("gastoId"))
        {
            let nombre_usuario = document.getElementById("nombre_usuario").value;
            let expApi = await fetch("https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + nombre_usuario + "/" + this.gasto.gastoId, {method:'DELETE'});

            (expApi.ok) ? cargarGastosApi() : alert("Error: " + expApi.status);
        }
        
        else
        {
            alert("Gasto no encontrado en la API.")
        }
    }
}

function nuevoGastoWebFormulario()
{
    document.getElementById('anyadirgasto-formulario').disabled = true;

    let formTemplate = document.getElementById('formulario-template').content.cloneNode(true);;
    let formulario = formTemplate.querySelector('form');

    formulario.addEventListener('submit', this.handleEvent = function(event)
    {
        event.preventDefault();
        let desc = formulario.elements.descripcion;
        let valor = formulario.elements.valor;
        let fecha = formulario.elements.fecha;
        let etiquetas = formulario.elements.etiquetas;
        etiquetas = etiquetas.value.split(',');
        let gasto = new gestionPresupuesto.CrearGasto(desc.value, parseFloat(valor.value), fecha.value, ...etiquetas);        
        gestionPresupuesto.anyadirGasto(gasto);
        
        document.getElementById('anyadirgasto-formulario').disabled = false;
        document.getElementById('controlesprincipales').removeChild(formulario);
        repintar();
    });

    document.getElementById('controlesprincipales').append(formulario);    
    formulario.querySelector('button.cancelar').addEventListener('click', this.handleEvent = function()
    {
        document.getElementById('anyadirgasto-formulario').disabled = false;
        document.getElementById('controlesprincipales').removeChild(formulario);
        repintar();
    });

    formulario.querySelector("button.gasto-enviar-api").addEventListener("click",this.handleEvent= async function()
    {
        let desc = formulario.elements.descripcion;
        let valor = formulario.elements.valor;
        let fecha = formulario.elements.fecha;
        let etiquetas = formulario.elements.etiquetas;
        etiquetas = etiquetas.value.split(",");
        let gasto = new gestionPresupuesto.CrearGasto(desc.value, parseFloat(valor.value), fecha.value, ...etiquetas);
        let nombre_usuario = document.getElementById("nombre_usuario").value;
        let newExpApi = await fetch("https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + nombre_usuario, {method:'POST',headers:
        {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(gasto)});

        if (newExpApi.ok)
        {
            document.getElementById("anyadirgasto-formulario").disabled = false;
            document.getElementById("controlesprincipales").removeChild(formulario);
            cargarGastosApi();
        }
        
        else
        {
            alert("Error: " + newExpApi.status);
        }
    });
}

function EditarHandleFormulario()
{    
    this.handleEvent = function()
    {
        let expense = this.gasto;
        let btnEditExpense = this.btnEditGasto;
        let divExpense = this.divGasto;

        this.btnEditGasto.disabled = true;
        let formTemplate = document.getElementById('formulario-template').content.cloneNode(true);;
        let formulario = formTemplate.querySelector('form');

        formulario.elements.descripcion.value = expense.descripcion;
        formulario.elements.valor.value = expense.valor;
        formulario.elements.fecha.value = new Date(expense.fecha).toISOString().substring(0,10);
        formulario.elements.etiquetas.value = expense.etiquetas.toString();
        divExpense.appendChild(formulario);
        
        formulario.addEventListener('submit', this.handleEvent = function(event)
        {
            let etiquetasFormulario = formulario.elements.etiquetas;          

            event.preventDefault();
            expense.actualizarDescripcion(formulario.elements.descripcion.value);
            expense.actualizarValor(parseFloat(formulario.elements.valor.value));
            expense.actualizarFecha(formulario.elements.fecha.value);   

            etiquetasFormulario = etiquetasFormulario.value.split(',');
            expense.borrarEtiquetas(...expense.etiquetas);
            expense.anyadirEtiquetas(...etiquetasFormulario);

            btnEditExpense.disabled = false;
            divExpense.removeChild(formulario);

            repintar();
        });

        formulario.querySelector('button.cancelar').addEventListener('click', this.handleEvent = function()
        {
            btnEditExpense.disabled = false;
            divExpense.removeChild(formulario);
            repintar();
        });

        formulario.querySelector("button.gasto-enviar-api").addEventListener("click", this.handleEvent = async function()
        {
            exp.actualizarDescripcion(formulario.elements.descripcion.value);
            exp.actualizarValor(parseFloat(formulario.elements.valor.value));
            exp.actualizarFecha(formulario.elements.fecha.value);
            let etiquetasForm = formulario.elements.etiquetas;
            etiquetasForm = etiquetasForm.value.split(",");
            exp.borrarEtiquetas(...exp.etiquetas);
            exp.anyadirEtiquetas(...etiquetasForm);
            btnEditExpense.disabled = false;
            divExpense.removeChild(formulario);
            let nombre_usuario = document.getElementById("nombre_usuario").value;
            let expApi = await fetch("https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + nombre_usuario + "/" + exp.gastoId, {method:'PUT',headers:
            {
                'Content-Type': 'application/json;charset=utf-8'
            },            
            body:JSON.stringify(exp)});

            if (expApi.ok)
            {
                cargarGastosApi();
            }
            
            else
            {
                alert("Error: "+ expApi.status);
            }
        });
    }
}

function FiltrarGastosWeb()
{
    this.handleEvent = function(event)
    {
        event.preventDefault();

        let desc = document.getElementById('formulario-filtrado-descripcion').value;
        let valorMin = parseFloat(document.getElementById('formulario-filtrado-valor-minimo').value);
        let valorMax = parseFloat(document.getElementById('formulario-filtrado-valor-maximo').value);
        let dateSince = document.getElementById('formulario-filtrado-fecha-desde').value;
        let dateUntill = document.getElementById('formulario-filtrado-fecha-hasta').value;
        let etiquetasTiene = document.getElementById('formulario-filtrado-etiquetas-tiene').value;
        let etiquetasBuscar = new Array();

        etiquetasTiene != '' && typeof etiquetasTiene != 'undefined' && (etiquetasBuscar = gestionPresupuesto.transformarListadoEtiquetas(etiquetasTiene));
        let filtro = {};

        (desc != '' && typeof desc != 'undefined') && (filtro.descripcionContiene = desc);        
        (valorMin != '' && typeof valorMin != 'undefined' && !isNaN(valorMin)) && (filtro.valorMinimo = valorMin);
        (valorMax!= '' && typeof valorMax != 'undefined'&& !isNaN(valorMax)) && (filtro.valorMaximo = valorMax);        
        (dateSince != '' && typeof dateSince != 'undefined') && (filtro.fechaDesde = dateSince);
        (dateUntill !='' && typeof dateUntill != 'undefined') && (filtro.fechaHasta = dateUntill);
        (etiquetasBuscar.length > 0) && (filtro.etiquetasTiene = etiquetasBuscar);       
        
        let filteredExpense = gestionPresupuesto.filtrarGastos(filtro);
        document.getElementById('listado-gastos-completo').innerHTML = '<hr>';
        filteredExpense.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-completo', gastoFiltrado);});
        document.getElementById('listado-gastos-completo').innerHTML += '<hr>';
    };
}

function guardarGastosWeb()
{
    localStorage.GestorGastosDWEC=JSON.stringify(gestionPresupuesto.listarGastos());
}

function CargarGastosWeb()
{
    this.handleEvent = function()
    {
        let chargeExpenses = JSON.parse(localStorage.getItem('GestorGastosDWEC'));
        (chargeExpenses != null) && ((chargeExpenses.length >=0 ) && (gestionPresupuesto.cargarGastos(chargeExpenses)));
        repintar();
    }
}

function cargarGastosWeb()
{
    let chargeExpenses = JSON.parse(localStorage.getItem('GestorGastosDWEC'));
    chargeExpenses != null ? (chargeExpenses.length >= 0) && (gestionPresupuesto.cargarGastos(chargeExpenses)) : gestionPresupuesto.cargarGastos([]);
    repintar();
}

async function cargarGastosApi()
{
    let nombre_usuario = document.getElementById("nombre_usuario").value;
    let expApi = await fetch("https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + nombre_usuario);

    if (expApi.ok)
    {
        let json = await expApi.json(); 
        gestionPresupuesto.cargarGastos(json);
        
        console.log(json);
        repintar();
    }
    
    else
    {
        alert("Error: " + expApi.status);
    }
}

let btnActualizar = document.getElementById('actualizarpresupuesto'); 
btnActualizar.onclick = actualizarPresupuestoWeb;

let btnAnyadir = document.getElementById('anyadirgasto');
btnAnyadir.onclick = nuevoGastoWeb;

let btnAddForm = document.getElementById('anyadirgasto-formulario');
btnAddForm.onclick = nuevoGastoWebFormulario;

let FormHandler = new FiltrarGastosWeb();

let form = document.getElementById('formulario-filtrado');
form.addEventListener('submit', FormHandler);

let btnSave = document.getElementById('guardar-gastos');
btnSave.onclick = guardarGastosWeb;

let btnCharge = document.getElementById('cargar-gastos');
btnCharge.onclick = cargarGastosWeb;

let btnChargeApi = document.getElementById("cargar-gastos-api");
btnChargeApi.onclick = cargarGastosApi;

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
//  BorrarApiHandle
    nuevoGastoWebFormulario,
    EditarHandleFormulario,
    FiltrarGastosWeb,
    guardarGastosWeb,
    CargarGastosWeb,
    cargarGastosWeb,
//  cargarGastosApi,
}