import * as gestionPresupuesto from "./gestionPresupuesto.js";
import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";


gestionPresupuesto.actualizarPresupuesto(1500);
let mostrar = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(),"presupuesto");

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

gestionPresupuestoWeb.mostrarDatoEnId(gestionPresupuesto.calcularTotalGastos().toFixed(2),"gastos-totales");

gestionPresupuestoWeb.mostrarDatoEnId(gestionPresupuesto.calcularBalance().toFixed(2),"balance-total");

let matrizGasto = gestionPresupuesto.listarGastos();
for (const x of matrizGasto) {
  gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", x);
}

let filtro1 = gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01",fechaHasta: "2021-09-30"});
filtro1.forEach(gasto =>  gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto));


let filtro2 = gestionPresupuesto.filtrarGastos({ valorMinimo: 50,  });
filtro2.forEach(gasto => gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto));


let filtro3 = gestionPresupuesto.filtrarGastos({etiquetasTiene: ["seguros"],valorMinimo: 200});
filtro3.forEach(gasto => gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto));


let filtro4 = gestionPresupuesto.filtrarGastos({etiquetasTiene: ["comida", "transporte"],valorMaximo: 50});
filtro4.forEach(gasto => gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto));

let agrupacion1 = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",agrupacion1,"día");

let agrupacion2 = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes",agrupacion2,"mes");

let agrupacion3 = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo",agrupacion3,"año");