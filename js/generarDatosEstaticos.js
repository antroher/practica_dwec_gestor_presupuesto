import * as GestPresWeb from './gestionPresupuestoWeb.js';
import * as GestPres from './gestionPresupuesto.js';

GestPres.actualizarPresupuesto(1500);

GestPresWeb.mostrarDatoEnId('presupuesto', GestPres.mostrarPresupuesto())


GestPres.anyadirGasto(GestPres.CrearGasto("Compra carne", 23.44, '2021-10-06', 'casa', 'comida'));
GestPres.anyadirGasto(GestPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
GestPres.anyadirGasto(GestPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
GestPres.anyadirGasto(GestPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
GestPres.anyadirGasto(GestPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
GestPres.anyadirGasto(GestPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

GestPresWeb.mostrarDatoEnId('gastos-totales', GestPres.calcularTotalGastos());
GestPresWeb.mostrarDatoEnId('balance-total', GestPres.calcularBalance());
GestPresWeb.mostrarDatoEnId('listado-gastos-completo', GestPres.listarGastos());

let fecha1 = {fechaDesde: '2021-09-01', fechaHasta: '2021-09-30'};
let Gastofiltrado1 = GestPres.filtrarGastos(fecha1);

GestPresWeb.mostrarGastoWeb('listado-gastos-filtrado-1', Gastofiltrado1);

let vgasto1 = {valorMinimo: '50€'};
let GastoFiltrado2 = GestPres.filtrarGastos(vgasto1);

GestPresWeb.mostrarGastoWeb('listado-gastos-filtrado-2', GastoFiltrado2);

let vgasto2 = {valorMinimo: '200€', etiquetasTiene: ['seguros']};
let GastoFiltrado3 = GestPres.filtrarGastos(vgasto2);

GestPresWeb.mostrarGastoWeb('listado-gastos-filtrado-3', GastoFiltrado3);

let vgasto3 = {etiquetasTiene: ['comida', 'transporte'], valorMaximo: '50'};


