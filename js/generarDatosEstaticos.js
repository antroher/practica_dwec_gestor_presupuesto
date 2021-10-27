import * as metodosGastos from "gestionPresupuesto.js"
import * as metodosGastosWeb from "gestionPresupuestoWeb.js"

metodosGastos.actualizarPresupuesto(1500);
metodosGastosWeb.mostrarDatoEnId("presupuesto", metodosGastos.mostrarPresupuesto());
let g1 = metodosGastos.crearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let g2 = metodosGastos.crearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let g3 = metodosGastos.crearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let g4 = metodosGastos.crearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let g5 = metodosGastos.crearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let g6 = metodosGastos.crearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
metodosGastos.anyadirGasto(g1);
metodosGastos.anyadirGasto(g2);
metodosGastos.anyadirGasto(g3);
metodosGastos.anyadirGasto(g4);
metodosGastos.anyadirGasto(g5);
metodosGastos.anyadirGasto(g6);
//cambiar metodos de abajo
metodosGastosWeb.mostrarDatoEnId("gastos-totales", metodosGastos.calcularTotalGastos());
metodosGastosWeb.mostrarDatoEnId("balance-total", metodosGastos.calcularBalance());
metodosGastosWeb.mostrarGastoWeb("listado-gastos-completo", metodosGastos.listarGastos());
metodosGastosWeb.mostrarGastoWeb("listado-gastos-filtrado-1", metodosGastos.filtrarGastos({fechaDesde: "01-2021", fechaHasta: "30-2021"}));
metodosGastosWeb.mostrarGastoWeb("listado-gastos-filtrado-2", metodosGastos.filtrarGastos({valorMinimo: 50}))
metodosGastosWeb.mostrarGastoWeb("listado-gastos-filtrado-3", metodosGastos.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]}));
