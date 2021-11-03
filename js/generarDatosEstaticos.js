import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);

let mostPresupuesto = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', mostPresupuesto);

let gasto1 = gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

let calcularTotalGastos = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", calcularTotalGastos);

let calcularBalance = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", calcularBalance);

let listaGastos = gestionPresupuesto.listarGastos();
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", listaGastos);

let filtrador1 = {fechaDesde : "2021-09-01", fechaHasta : "2021-09-30"}
let gastosFiltrados1 = gestionPresupuesto.filtrarGastos(filtrador1);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gastosFiltrados1);

let filtrador2 = {valorMinimo : 50}
let gastosFiltrados2 = gestionPresupuesto.filtrarGastos(filtrador2);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gastosFiltrados2);

let filtrador3 = {valorMinimo : 200, etiquetasTiene : ["seguros", ""]}
let gastosFiltrados3 = gestionPresupuesto.filtrarGastos(filtrador3);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gastosFiltrados3);

let filtrador4 = {valorMaximo : 50, etiquetasTiene : ["comida", "transporte"]}
let gastosFiltrados4 = gestionPresupuesto.filtrarGastos(filtrador4);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gastosFiltrados4);    

let gastosAgrupados1 = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gastosAgrupados1, "día")

let gastosAgrupados2 = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gastosAgrupados2, "mes")

let gastosAgrupados3 = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAgrupados3, "año")