import * as gesPres from './gestionPresupuesto';
import * as gesPresWeb from './gestionPresupuestoWeb.js';

gesPres.actualizarPresupuesto(1500);
gesPresWeb.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto);
let gas1 = gesPres.CrearGasto('Compra carne', 23.44, '2021-10-06', 'casa', 'comida');
let gas2 = gesPres.CrearGasto('Compra fruta y verdura', 14.25, '2021-09-06', 'supermercado', 'comida');
let gas3 = gesPres.CrearGasto('Bonobús', 18.60, '2020-05-26', 'transporte');
let gas4 = gesPres.CrearGasto('Gasolina', 60.42, '2021-10-08', 'transporte', 'gasolina');
let gas5 = gesPres.CrearGasto('Seguro hogar', 206.45, '2021-09-26', 'casa', 'seguros');
let gas6 = gesPres.CrearGasto('Seguro coche', 195.78, '2021-10-06', 'transporte', 'seguros');
gesPres.anyadirGasto(gas1);
gesPres.anyadirGasto(gas2);
gesPres.anyadirGasto(gas3);
gesPres.anyadirGasto(gas4);
gesPres.anyadirGasto(gas5);
gesPres.anyadirGasto(gas6);
gesPresWeb.mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
gesPresWeb.mostrarDatoEnId("balance-total", gesPres.calcularBalance());
gesPresWeb.mostrarDatoEnId("listado-gastos-completo", gesPres.listarGastos());
let filter1 = {fechaDesde : "2021-09-01", fechaHasta : "2021-09-30"}
let gasfilt1 = gestionPresupuesto.filtrarGastos(filter1);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasfilt1);
let filter2 = {valorMinimo : 50}
let gasfilt2 = gestionPresupuesto.filtrarGastos(filter2);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasfilt2);
let filter3 = {valorMinimo : 200, etiquetasTiene : ["seguros", ""]}
let gasfilt3 = gestionPresupuesto.filtrarGastos(filter3);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasfilt3);
let filter4 = {valorMaximo : 50, etiquetasTiene : ["comida", "transporte"]}
let gasfilt4 = gestionPresupuesto.filtrarGastos(filter4);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasfilt4);
let gasgrouped1 = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gasgrouped1, "día")
let gasgrouped2 = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gasgrouped2, "mes")
let gasgrouped3 = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gasgrouped3, "año")