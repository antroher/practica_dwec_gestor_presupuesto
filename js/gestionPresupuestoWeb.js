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
            let borraEt = new BorrarEtiquetasHandle();
            borraEt.gasto = gasto;
            borraEt.etiqueta = label;
            span.addEventListener('click', borraEt);
            divGastoEtiquetas.append(span);            
        }
    );
    
    divGasto.append(divGastoEtiquetas);

    if(idElemento == 'listado-gastos-completo')
    {
        let botonEditar = document.createElement('button');
        botonEditar.className = 'gasto-editar';
        botonEditar.type = 'button';
        botonEditar.textContent = 'Editar';

        let editarHa = new EditarHandle();
        editarHa.gasto = gasto;
        botonEditar.addEventListener('click', editarHa);
        divGasto.append(botonEditar);

        let botonBorrar = document.createElement('button');
        botonBorrar.className = 'gasto-borrar';
        botonBorrar.type = 'button';
        botonBorrar.textContent = 'Borrar';

        let borrarHa = new BorrarHandle();
        borrarHa.gasto = gasto;
        botonBorrar.addEventListener('click', borrarHa);
        divGasto.append(botonBorrar);
    }
    
    elem.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{    
    let elem =  document.getElementById(idElemento);
    let txt =   '<div class="agrupacion">' +
                '<h1>Gastos agrupados por '+ periodo + '</h1>';

    for (let i in agrup)
    {
        txt +=  '<div class="agrupacion-dato">' +
                '<span class="agrupacion-dato-clave">' + i + '</span>' +
                '<span class="agrupacion-dato-valor">' + agrup[i] + '</span>' +
                '</div>';
    }

    txt += '</div>';
    elem.innerHTML += txt;  
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
    gastosFilt = gestionPresupuesto.filtrarGastos({valorMinimo:50});
    gastosFilt.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-2', gastoFiltrado);});

    document.getElementById('listado-gastos-filtrado-3').innerHTML = '';
    gastosFilt = gestionPresupuesto.filtrarGastos({valorMinimo:200,etiquetasTiene:['seguros']});
    gastosFilt.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-3', gastoFiltrado);});

    document.getElementById('listado-gastos-filtrado-4').innerHTML = '';
    gastosFilt = gestionPresupuesto.filtrarGastos({valorMaximo:50,etiquetasTiene:['comida','transporte']});
    gastosFilt.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-4', gastoFiltrado);});
}

function actualizarPresupuestoWeb()
{    
    let presupuesto = parseFloat(prompt('Introduce un nuevo presupuesto'));
    gestionPresupuesto.actualizarPresupuesto(presupuesto);
    repintar();
}

function nuevoGastoWeb()
{
    let desc = prompt('Introduce la descripción del nuevo gasto:');
    let valor = parseFloat(prompt('Introduce el valor del nuevo gasto:'));
    let fecha = prompt('Introduce una fecha para el nuevo gasto con este formato(aaaa-mm-dd):');
    let etiq = prompt('Introduce las etiquetas(etiqueta1, etiqueta2, etiqueta3):');
    let etiquetas = etiq.split(',');
    let gasto = new gestionPresupuesto.CrearGasto(desc,valor,fecha);
    etiquetas.forEach(label => {gasto.anyadirEtiquetas(label);});
    gestionPresupuesto.anyadirGasto(gasto);

    repintar();
}

function EditarHandle()
{
    this.handleEvent = function()
    {
        let etiquetas = new Array();
        let desc = prompt('Introduce la descripción:');
        let valor = parseFloat(prompt('Introduce el valor:'));
        let fecha = prompt('Introduce una fecha con este formato(aaaa-mm-dd):');
        let etiq = prompt('Introduce las etiquetas(etiqueta1, etiqueta2, etiqueta3):');
        
        etiquetas = etiq.split(',');
        
        desc !== '' && this.gasto.actualizarDescripcion(desc);
        valor >= 0 && this.gasto.actualizarValor(valor);
        fecha !=='' && this.gasto.actualizarFecha(fecha);

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

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle    
}