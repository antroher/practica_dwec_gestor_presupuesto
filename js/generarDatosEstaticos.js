import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);
let mostPresupuesto = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', mostPresupuesto);

let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
export let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

let calcularTotalGastos = gestionPresupuesto.calcularTotalGastos().toFixed(2);
let datoTotal = gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales",calcularTotalGastos);

let calcularBalance = gestionPresupuesto.calcularBalance().toFixed(2);
let bal = gestionPresupuestoWeb.mostrarDatoEnId("balance-total",calcularBalance);

let listaGastos = gestionPresupuesto.listarGastos();
for (const x of listaGastos) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", x);
  }

let filter1 = gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01",fechaHasta: "2021-09-30"});
for (const gasto of filter1) {
  gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}
let filter2 = gestionPresupuesto.filtrarGastos({ valorMinimo: 50,  });
for (const gasto of filter2) {
  gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

let filter3 = gestionPresupuesto.filtrarGastos({etiquetasTiene: ["seguros"],valorMinimo: 200});
for (const gasto of filter3) {
  gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

let filter4 = gestionPresupuesto.filtrarGastos({etiquetasTiene: ["comida", "transporte"],valorMaximo: 50});
for (const gasto of filter4) {
  gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}   
//https://www.google.es/maps/@43.3352095,-4.5964557,3a,75y,347.75h,64.61t/data=!3m6!1e1!3m4!1s5nAjwN_uFIEf7cBStuShRQ!2e0!7i13312!8i6656?hl=es
let gastosAgrupados1 = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gastosAgrupados1, "día")

let gastosAgrupados2 = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gastosAgrupados2, "mes")

let gastosAgrupados3 = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAgrupados3, "año")

