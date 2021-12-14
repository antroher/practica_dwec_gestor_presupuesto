"use strict"

//Este me convencio mas
import * as gesPre from "./gestionPresupuesto.js";
import * as gesPreWeb from "./gestionPresupuestoWeb.js";

gesPre.actualizarPresupuesto(1500);
gesPreWeb.mostrarDatoEnId("presupuesto",gesPre.mostrarPresupuesto());

 gesPre.anyadirGasto(new gesPre.CrearGasto("Compra carne",23.44, "2021-10-06", "casa", "comida"));
 gesPre.anyadirGasto(new gesPre.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
 gesPre.anyadirGasto(new gesPre.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
 gesPre.anyadirGasto(new gesPre.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
 gesPre.anyadirGasto(new gesPre.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
 gesPre.anyadirGasto(new gesPre.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

gesPreWeb.mostrarDatoEnId("gastos-totales", gesPre.calcularTotalGastos());
gesPreWeb.mostrarDatoEnId("balance-total",gesPre.calcularBalance());

gesPreWeb.mostrarGastoWeb("listado-gastos-completo", gesPre.listarGastos())

gesPreWeb.mostrarGastoWeb("listado-gastos-filtrado-1",gesPre.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}))
gesPreWeb.mostrarGastoWeb("listado-gastos-filtrado-2",gesPre.filtrarGastos({valorMinimo:50}))
gesPreWeb.mostrarGastoWeb("listado-gastos-filtrado-3",gesPre.filtrarGastos({valorMinimo: 200, etiquetasTiene:["seguros"]}))
gesPreWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gesPre.filtrarGastos({valorMaximo: 50, etiquetasTiene:["comida","transporte"]}));

let gastoAgrup1 = gesPre.agruparGastos("dia")
gesPreWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",gastoAgrup1,"día")

let gastoAgrup2 = gesPre.agruparGastos("mes")
gesPreWeb.mostrarGastosAgrupadosWeb("agrupacion-mes",gastoAgrup2,"mes")

let gastoAgrup3 = gesPre.agruparGastos("anyo")

gesPreWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo",gastoAgrup3,"año")
