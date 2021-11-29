import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

// Controladores
let btnActualizar = document.getElementById('actualizarpresupuesto'); 
btnActualizar.onclick = gestionPresupuestoWeb.actualizarPresupuestoWeb;

let btnAnyadir = document.getElementById('anyadirgasto');
btnAnyadir.onclick = gestionPresupuestoWeb.nuevoGastoWeb;

let btnFormulario = document.getElementById('anyadirgasto-formulario');
btnFormulario.onclick = gestionPresupuestoWeb.nuevoGastoWebFormulario;

gestionPresupuesto.actualizarPresupuesto(1500);
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());

gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto('Compra carne', 23.44, '2021-10-06', 'casa', 'comida'));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto('Compra fruta y verdura', 14.25, '2021-09-06', 'supermercado', 'comida'));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto('Bonobús', 18.60, '2020-05-26', 'transporte'));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto('Gasolina', 60.42, '2021-10-08', 'transporte', 'gasolina'));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto('Seguro hogar', 206.45, '2021-09-26', 'casa', 'seguros'));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto('Seguro coche', 195.78, '2021-10-06', 'transporte', 'seguros'));

gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
gestionPresupuestoWeb.mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());

let gastos = gestionPresupuesto.listarGastos();
gastos.forEach(exp => {gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', exp);});

let gastosFilt = gestionPresupuesto.filtrarGastos({fechaDesde: '2021-09-01', fechaHasta: '2021-09-30'});
gastosFilt.forEach(gastoFiltrado => {gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gastoFiltrado);});

gastosFilt = gestionPresupuesto.filtrarGastos({valorMinimo: 50});
gastosFilt.forEach(gastoFiltrado => {gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gastoFiltrado);});

gastosFilt = gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ['seguros']});
gastosFilt.forEach(gastoFiltrado => {gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gastoFiltrado);});

gastosFilt = gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene: ['comida','transporte']});
gastosFilt.forEach(gastoFiltrado => {gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gastoFiltrado);});

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia',gestionPresupuesto.agruparGastos('dia'), 'día');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes',gestionPresupuesto.agruparGastos('mes'), 'mes');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo',gestionPresupuesto.agruparGastos('anyo'), 'año');