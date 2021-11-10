'use strict'

import * as gP from './gestionPresupuesto.js';
import * as gPW from './gestionPresupuestoWeb.js';

gP.actualizarPresupuesto(1500);

let texto = gP.mostrarPresupuesto();
gPW.mostrarDatoEnId('presupuesto', texto);

let gasto1 = gP.CrearGasto('Compra carne', 23.44, '2021-10-06', 'casa', 'comida');
let gasto2 = gP.CrearGasto('Compra fruta y verdura', 14.25, '2021-09-06', 'supermercado', 'comida');
let gasto3 = gP.CrearGasto('Bonobús', 18.60, '2020-05-26', 'transporte');
let gasto4 = gP.CrearGasto('Gasolina', 60.42, '2021-10-08', 'transporte', 'gasolina');
let gasto5 = gP.CrearGasto('Seguro hogar', 206.45, '2021-09-26', 'casa', 'seguros');
let gasto6 = gP.CrearGasto('Seguro coche', 195.78, '2021-10-06', 'transporte', 'seguros');

gP.anyadirGasto(gasto1);
gP.anyadirGasto(gasto2);
gP.anyadirGasto(gasto3);
gP.anyadirGasto(gasto4);
gP.anyadirGasto(gasto5);
gP.anyadirGasto(gasto6);

let total = gP.calcularTotalGastos();
gPW.mostrarDatoEnId('gastos-totales', total);

let balance = gP.calcularBalance();
gPW.mostrarDatoEnId('balance-total', balance);

let listado = gP.listarGastos();
for (let gasto of listado){
    gPW.mostrarGastoWeb('listado-gastos-completo', gasto);
}

let gastoFiltrado1 = gP.filtrarGastos({fechaDesde: '2021-09-01', fechaHasta: '2021-09-30'});
for (let filt of gastoFiltrado1){
    gPW.mostrarGastoWeb('listado-gastos-filtrado-1', filt);
}

let gastoFiltrado2 = gP.filtrarGastos({valorMinimo: 50});
for (let filt of gastoFiltrado2){
    gPW.mostrarGastoWeb('listado-gastos-filtrado-2', filt);
}

let gastoFiltrado3 = gP.filtrarGastos({valorMinimo: 200, etiquetasTiene: ['seguros']});
for (let filt of gastoFiltrado3){
    gPW.mostrarGastoWeb('listado-gastos-filtrado-3', filt);
}

let gastoFiltrado4 = gP.filtrarGastos({etiquetasTiene: ['comida', 'transporte'], valorMaximo: 50});
for (let filt of gastoFiltrado4){
    gPW.mostrarGastoWeb('listado-gastos-filtrado-4', filt);
}

let agrup1 = gP.agruparGastos('dia');
gPW.mostrarGastosAgrupadosWeb('agrupacion-dia', agrup1, 'día');

let agrup2 = gP.agruparGastos('mes');
gPW.mostrarGastosAgrupadosWeb('agrupacion-mes', agrup2, 'mes');

let agrup3 = gP.agruparGastos('anyo');
gPW.mostrarGastosAgrupadosWeb('agrupacion-anyo', agrup3, 'año');