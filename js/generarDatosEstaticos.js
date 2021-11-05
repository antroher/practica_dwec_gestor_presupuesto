import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
gestionPresupuesto.anyadirGasto(gestionPresupuesto.CrearGasto('Compra carne', 23.44, '2021-10-06', 'casa', 'comida'));
gestionPresupuesto.anyadirGasto(gestionPresupuesto.CrearGasto('Compra fruta y verdura', 14.25, '2021-09-06', 'supermercado', 'comida'));
gestionPresupuesto.anyadirGasto(gestionPresupuesto.CrearGasto('Bonobús', 18.60, '2020-05-26', 'transporte'));
gestionPresupuesto.anyadirGasto(gestionPresupuesto.CrearGasto('Gasolina', 60.42, '2021-10-08', 'transporte', 'gasolina'));
gestionPresupuesto.anyadirGasto(gestionPresupuesto.CrearGasto('Seguro hogar', 206.45, '2021-09-26', 'casa', 'seguros'));
gestionPresupuesto.anyadirGasto(gestionPresupuesto.CrearGasto('Seguro coche', 195.78, '2021-10-06', 'transporte', 'seguros'));
gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
gestionPresupuestoWeb.mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());

let gastos = gestionPresupuesto.listarGastos();
gastos.forEach(exp => {gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', exp);});

let gastosFilt = gestionPresupuesto.filtrarGastos({fechaDesde: '2021-09-01', fechaHasta:'2021-09-30'});
gastosFilt.forEach(gastoFiltrado => {gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gastoFiltrado);});

gastosFilt = gestionPresupuesto.filtrarGastos({valorMinimo: 50});
gastosFilt.forEach(gastoFiltrado => {gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gastoFiltrado);});

gastosFilt = gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ['seguros']});
gastosFilt.forEach(gastoFiltrado => {gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gastoFiltrado);});

gastosFilt = gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene: ['comida','transporte']});
gastosFilt.forEach(gastoFiltrado => {gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gastoFiltrado);});

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', gestionPresupuesto.agruparGastos('dia'),'dia');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', gestionPresupuesto.agruparGastos('mes'),'mes');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', gestionPresupuesto.agruparGastos('anyo'),'anyo');