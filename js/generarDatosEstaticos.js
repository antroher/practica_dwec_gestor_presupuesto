
//Este me convencio mas
import * as GastosGen from "./gestionPresupuesto.js";
import * as GastosGenWeb from "./gestionPresupuestoWeb.js";

GastosGen.actualizarPresupuesto(1500);
GastosGenWeb.mostrarDatoEnId("presupuesto",GastosGen.mostrarPresupuesto());

 GastosGen.anyadirGasto(GastosGen.CrearGasto("Compra carne",23.44, "2021-10-06", "casa", "comida"));
 GastosGen.anyadirGasto(GastosGen.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
 GastosGen.anyadirGasto(GastosGen.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
 GastosGen.anyadirGasto(GastosGen.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
 GastosGen.anyadirGasto(GastosGen.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
 GastosGen.anyadirGasto(GastosGen.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

GastosGenWeb.mostrarDatoEnId("gastos-totales", GastosGen.calcularTotalGastos());
GastosGenWeb.mostrarDatoEnId("balance-total",GastosGen.calcularBalance());

//Listado de Gastos
GastosGenWeb.mostrarGastoWeb("listado-gastos-completo", GastosGen.listarGastos())

//Listado de gastos filtrados
GastosGenWeb.mostrarGastoWeb("listado-gastos-filtrado-1",GastosGen.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}))
GastosGenWeb.mostrarGastoWeb("listado-gastos-filtrado-2",GastosGen.filtrarGastos({valorMinimo:50}))
GastosGenWeb.mostrarGastoWeb("listado-gastos-filtrado-3",GastosGen.filtrarGastos({valorMinimo: 200, etiquetasTiene:["seguros"]}))
GastosGenWeb.mostrarGastoWeb("listado-gastos-filtrado-4", GastosGen.filtrarGastos({valorMaximo: 50, etiquetasTiene:["comida","transporte"]}));
//Listado de gastos por año,mes,dia
GastosGen.agruparGastos("agrupacion-dia",GastosGenWeb.mostrarGastosAgrupadosWeb("dia"))
GastosGen.agruparGastos("agrupacion-mes",GastosGenWeb.mostrarGastosAgrupadosWeb("mes"))
GastosGen.agruparGastos("agrupacion-mes",GastosGenWeb.mostrarGastosAgrupadosWeb("anyo"))