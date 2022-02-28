import * as gestionPresupuesto from "./gestionPresupuesto.js";
import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";


let number = gestionPresupuesto.actualizarPresupuesto(1500);
let mostrar = gestionPresupuesto.mostrarPresupuesto();
let datoPresupuesto = gestionPresupuestoWeb.mostrarDatoEnId("presupuesto",mostrar);

let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne",23.44,"2021-10-06","casa","comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura",14.25,"2021-09-06","supermercado","comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús",18.6,"2020-05-26","transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina",60.42,"2021-10-08","transporte","gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar",206.45,"2021-09-26", "casa","seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78,"2021-10-06","transporte","seguros");

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

let gastoTotal = gestionPresupuesto.calcularTotalGastos().toFixed(2);
let datoTotal = gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales",gastoTotal);

let balanceTotal = gestionPresupuesto.calcularBalance().toFixed(2);
let datoBalance = gestionPresupuestoWeb.mostrarDatoEnId("balance-total",balanceTotal);

let matrizGasto = gestionPresupuesto.listarGastos();
for (const x of matrizGasto) {
  gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", x);
}

let filtro1 = gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01",fechaHasta: "2021-09-30"});

for (const gasto of filtro1) {
  gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}
let filtro2 = gestionPresupuesto.filtrarGastos({ valorMinimo: 50,  });
for (const gasto of filtro2) {
  gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

let filtro3 = gestionPresupuesto.filtrarGastos({etiquetasTiene: ["seguros"],valorMinimo: 200});
for (const gasto of filtro3) {
  gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

let filtro4 = gestionPresupuesto.filtrarGastos({etiquetasTiene: ["comida", "transporte"],valorMaximo: 50});
for (const gasto of filtro4) {
  gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

let agrupacion1 = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",agrupacion1,"día");

let agrupacion2 = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes",agrupacion2,"mes");

let agrupacion3 = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo",agrupacion3,"año");