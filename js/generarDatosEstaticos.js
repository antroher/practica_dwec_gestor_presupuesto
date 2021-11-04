'use strict'

import * as gastosG from "./gestionPresupuesto.js";
import * as gastosGW from "./gestionPresupuestoWeb.js";

gastosG.actualizarPresupuesto(1500);
gastosGW.mostrarDatoEnId("presupuesto", gastosG.mostrarPresupuesto());

gastosG.CrearGasto(gastosG.anyadirGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"));
gastosG.CrearGasto(gastosG.anyadirGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
gastosG.CrearGasto(gastosG.anyadirGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
gastosG.CrearGasto(gastosG.anyadirGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
gastosG.CrearGasto(gastosG.anyadirGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
gastosG.CrearGasto(gastosG.anyadirGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

gastosGW.mostrarDatoEnId("gastos-totales", gastosG.calcularTotalGastos());

gastosGW.mostrarDatoEnId("balance_total", gastosG.calcularBalance());

gastosGW.mostrarGastoWeb("listado-gastos-completo", gastosG.listarGastos());

gastosGW.mostrarGastoWeb("listado-gastos-filtrado-1", gastosG.filtrarGastos());
gastosGW.mostrarGastoWeb("listado-gastos-filtrado-2", gastosG.filtrarGastos());
gastosGW.mostrarGastoWeb("listado-gastos-filtrado-3", gastosG.filtrarGastos());
gastosGW.mostrarGastoWeb("listado-gastos-filtrado-4", gastosG.filtrarGastos());

gastosGW.mostrarGastosAgrupadosWeb("agrupacion-dia", gastosG.agruparGastos());
gastosGW.mostrarGastosAgrupadosWeb("agrupacion-mes", gastosG.agruparGastos());
gastosGW.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosG.agruparGastos());

