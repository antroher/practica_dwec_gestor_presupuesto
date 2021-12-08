"use strict";

import * as gestionP from "./gestionPresupuesto.js";
import * as gestionPW from "./gestionPresupuestoWeb.js";

// Actualizar el presupuesto a 1500€
gestionP.actualizarPresupuesto(1500);

// Mostrar el presupuesto en el div#presupuesto
gestionPW.mostrarDatoEnId("presupuesto", gestionP.mostrarPresupuesto());

// Crear los siguientes gastos
const gasto1 = new gestionP.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
const gasto2 = new gestionP.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
const gasto3 = new gestionP.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
const gasto4 = new gestionP.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
const gasto5 = new gestionP.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
const gasto6 = new gestionP.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

// Añadir los gastos creados
gestionP.anyadirGasto(gasto1);
gestionP.anyadirGasto(gasto2);
gestionP.anyadirGasto(gasto3);
gestionP.anyadirGasto(gasto4);
gestionP.anyadirGasto(gasto5);
gestionP.anyadirGasto(gasto6);

// Mostrar gastos totales en div#gastos-totales
gestionPW.mostrarDatoEnId("gastos-totales", gestionP.calcularTotalGastos());

// Mostrar el balance total en div#balance-total
gestionPW.mostrarDatoEnId("balance-total", gestionP.calcularBalance());

// Mostrar el listado completo de gastos en div#listado-gastos-completo
for (let gasto of gestionP.listarGastos()) {
    gestionPW.mostrarGastoWeb('listado-gastos-completo', gasto);
}

// Mostrar el listado de gastos realizados en Septiembre de 2021 en div#listado-gastos-filtrado-1
for (let gasto of gestionP.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" })) {
    gestionPW.mostrarGastoWeb('listado-gastos-filtrado-1', gasto);
}

// Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2
for (let gasto of gestionP.filtrarGastos({ valorMinimo: 50 })) {
    gestionPW.mostrarGastoWeb('listado-gastos-filtrado-2', gasto);
}

// Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3
for (let gasto of gestionP.filtrarGastos({ valorMinimo: 200, etiquetasTiene: ["seguros"] })) {
    gestionPW.mostrarGastoWeb('listado-gastos-filtrado-3', gasto);
}

// Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4
for (let gasto of gestionP.filtrarGastos({ valorMaximo: 50, etiquetasTiene: ["comida", "transporte"] })) {
    gestionPW.mostrarGastoWeb('listado-gastos-filtrado-4', gasto);
}

// Mostrar el total de gastos agrupados por día en div#agrupacion-dia
gestionPW.mostrarGastosAgrupadosWeb("agrupacion-dia", gestionP.agruparGastos("dia"), "dia");

// Mostrar el total de gastos agrupados por día en div#agrupacion-mes
gestionPW.mostrarGastosAgrupadosWeb("agrupacion-mes", gestionP.agruparGastos("mes"), "mes");

// Mostrar el total de gastos agrupados por día en div#agrupacion-anyo 
gestionPW.mostrarGastosAgrupadosWeb("agrupacion-anyo", gestionP.agruparGastos("anyo"), "anyo");
